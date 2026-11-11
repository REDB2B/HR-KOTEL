/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ✅ Google Apps Script Web App URL для отправки лидов
export const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycby9lZ0hWeVrRqKzSFAInoEEzgcAxhAXHyYXnlCZYZ1Tb0PnesriFR7Sif9aSRAhgJuF6g/exec';

// Объявляем глобальные переменные для TypeScript
declare global {
  interface Window {
    FB_PIXEL_ID?: string;
    FB_ACCESS_TOKEN?: string;
    fbq?: (...args: unknown[]) => void;
    sendMetaCAPI?: (
      eventName: string,
      eventId: string,
      email?: string,
      customData?: Record<string, unknown>
    ) => Promise<void>;
  }
}

export interface LeadData {
  telegram: string;
  email: string;
  source?: string;
  role?: string;
  vertical?: string;
  urgency?: string;
  comment?: string;
  title?: string;
  mode?: string;
  timestamp?: string;
  [key: string]: unknown;
}

let lastSentSignature = '';
let lastSentTime = 0;

/**
 * Моментальная отправка лида в Google Таблицу через Google Apps Script
 * + отбив в Meta Pixel и Conversions API (CAPI)
 */
export async function sendLeadToGoogleScript(data: LeadData): Promise<boolean> {
  const now = Date.now();
  const signature = `${data.telegram}|${data.email}|${data.source || ''}`;

  // Защита от дублирования отправки, если форму уже перехватил глобальный listener
  if (signature === lastSentSignature && now - lastSentTime < 3000) {
    return true;
  }
  lastSentSignature = signature;
  lastSentTime = now;

  const eventId = `lead_${now}_${Math.floor(Math.random() * 100000)}`;
  const pixelId =
    (typeof window !== 'undefined' && window.FB_PIXEL_ID) || '4630588717200106';

  const optionsList: string[] = [];
  if (data.role) optionsList.push(`Роль: ${data.role}`);
  if (data.vertical) optionsList.push(`Вертикаль: ${data.vertical}`);
  if (data.urgency) optionsList.push(`Сроки: ${data.urgency}`);

  const customTextList: string[] = [];
  if (data.comment) customTextList.push(`Комментарий: ${data.comment}`);
  if (data.title) customTextList.push(`Тема: ${data.title}`);

  const payload = {
    block_source: data.source || 'Форма на сайте KOTEL HR',
    tg: data.telegram,
    email: data.email,
    selected_options: optionsList.join(' | '),
    custom_text: customTextList.join('\n'),
    utm:
      typeof window !== 'undefined' && window.location.search
        ? decodeURIComponent(window.location.search.substring(1))
        : 'Прямой заход',
    url: typeof window !== 'undefined' ? window.location.href : '',
    pixel_id: pixelId,
    event_id: eventId,
    timestamp: data.timestamp || new Date().toISOString(),
    submittedAt: new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' }),
  };

  // 1. Всегда сохраняем в localStorage как резервную копию
  try {
    const existing = JSON.parse(localStorage.getItem('kotel_leads') || '[]');
    existing.push(payload);
    localStorage.setItem('kotel_leads', JSON.stringify(existing));
  } catch (err) {
    console.warn('LocalStorage save warning:', err);
  }

  // 2. Моментальная отправка в Google Apps Script
  try {
    const jsonBody = JSON.stringify(payload);

    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: jsonBody,
    }).catch(() => {});

    // Резервный beacon для мобильных
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      try {
        const blob = new Blob([jsonBody], { type: 'text/plain;charset=utf-8' });
        navigator.sendBeacon(GOOGLE_SCRIPT_URL, blob);
      } catch {}
    }

    // 3. Отбив в Meta Pixel (Client-Side)
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq(
        'track',
        'Lead',
        {
          content_name: payload.block_source,
          currency: 'USD',
          value: 0,
        },
        { eventID: eventId }
      );
    }

    // 4. Отбив в Meta Conversions API (CAPI)
    if (typeof window !== 'undefined' && typeof window.sendMetaCAPI === 'function') {
      window.sendMetaCAPI('Lead', eventId, data.email, {
        content_name: payload.block_source,
        telegram: data.telegram,
        selected_options: payload.selected_options,
      });
    }

    return true;
  } catch (error) {
    console.error('Lead submission error:', error);
    return false;
  }
}
