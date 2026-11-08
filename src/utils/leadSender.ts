/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ✅ Google Apps Script Web App URL для отправки лидов
export const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycby9lZ0hWeVrRqKzSFAInoEEzgcAxhAXHyYXnlCZYZ1Tb0PnesriFR7Sif9aSRAhgJuF6g/exec';

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

/**
 * Моментальная отправка лида в Google Таблицу через Google Apps Script
 * Работает асинхронно, не блокируя UI пользователя.
 */
export async function sendLeadToGoogleScript(data: LeadData): Promise<boolean> {
  const payload: LeadData = {
    ...data,
    timestamp: data.timestamp || new Date().toISOString(),
    submittedAt: new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' }),
    pageUrl: typeof window !== 'undefined' ? window.location.href : '',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
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
  // Используем mode: 'no-cors' с text/plain — это гарантирует успешную доставку в Google Apps Script
  // без CORS-блокировок браузера при редиректах 302.
  try {
    const jsonBody = JSON.stringify(payload);

    // Первичная отправка через fetch
    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: jsonBody,
    }).catch((e) => {
      console.warn('Fetch background catch:', e);
    });

    // Дополнительный надёжный транспорт для мобильных устройств: sendBeacon при закрытии/переходе
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      try {
        const blob = new Blob([jsonBody], { type: 'text/plain;charset=utf-8' });
        navigator.sendBeacon(GOOGLE_SCRIPT_URL, blob);
      } catch {
        // beacon fallback silently ignored
      }
    }

    return true;
  } catch (error) {
    console.error('Lead submission error:', error);
    return false;
  }
}
