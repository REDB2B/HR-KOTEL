# KOTEL HR AGENCY — Landing Page

Лендинг специализированного рекрутингового агентства **KOTEL HR** для ниш iGaming, Affiliate Marketing и Media Buying.

🌐 **Рабочий домен:** [https://hrkotel.sbs/](https://hrkotel.sbs/)

---

## 🎯 Meta Pixel & Динамический пиксель + CAPI (Conversions API)

В проект встроен профессиональный медиабаинговый трекинг Facebook/Meta:

### 1. Базовый пиксель
- **Pixel ID:** `4630588717200106`
- **Conversions API Access Token:** подключен напрямую для серверного отбива.

### 2. Динамический пиксель (для залива трафика с разных аккаунтов)
Сайт автоматически подхватывает ID пикселя из параметров ссылки:
- `https://hrkotel.sbs/?pixel=1234567890`
- `https://hrkotel.sbs/?fb_pixel=1234567890`
- `https://hrkotel.sbs/?pixel_id=1234567890`
- `https://hrkotel.sbs/?fbpixel=1234567890`
- `https://hrkotel.sbs/?fb=1234567890`

Если параметр передан в URL, то:
1. `fbq('init', dynamicPixelId)` инициализирует именно этот переданный пиксель.
2. Он сохраняется в `localStorage`, чтобы при переходах по сайту отбив не терялся.
3. События `PageView` и `Lead` уходят в этот активный пиксель.
4. Если параметр не передан — работает основной дефолтный пиксель `4630588717200106`.

### 3. Двойной отбив события `Lead` (Browser + Server CAPI)
При любой отправке формы:
- **Client-Side:** вызывается `fbq('track', 'Lead', {...}, { eventID: eventId })`
- **Server-Side (CAPI):** отправляется прямой POST-запрос в Meta Graph API (`https://graph.facebook.com/v19.0/{pixelId}/events`) с SHA-256 хешированием email и передачей уникального `event_id` для дедупликации (10/10 качество матчинга событий).
- **Google Таблица:** данные заявки моментально улетают в Google Apps Script (`https://script.google.com/macros/s/AKfycby9lZ0hWeVrRqKzSFAInoEEzgcAxhAXHyYXnlCZYZ1Tb0PnesriFR7Sif9aSRAhgJuF6g/exec`).

---

## 🗂 Структура проекта

```
kotel-hr-landing/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← Авто-деплой GitHub Actions (Node 22)
├── public/
│   ├── .nojekyll               ← Отключает Jekyll на GitHub Pages
│   ├── CNAME                   ← hrkotel.sbs (защита от сброса домена)
│   └── [изображения]           ← Иконки и графика
├── src/
│   ├── assets/
│   │   └── logoBase64.ts       ← Векторный логотип в Base64
│   ├── components/             ← Модульные секции лендинга
│   ├── data/
│   │   └── recruitingData.ts   ← Вакансии, кейсы, тексты
│   ├── styles/
│   │   └── index.css           ← Стили, Pantone цвета, GPU-анимации 60-120fps
│   ├── utils/
│   │   ├── leadSender.ts       ← Отправка лидов + Meta Pixel & CAPI
│   │   └── telegramValidation.ts ← Валидация Telegram
│   ├── types.ts
│   ├── vite-env.d.ts
│   ├── App.tsx
│   └── main.tsx
├── CNAME                       ← Домен в корне репозитория
├── index.html                  ← Главный HTML: Pixel + CAPI + перехватчик форм
├── vite.config.ts
├── tsconfig.json
├── package.json
└── .gitignore
```

---

## 🚀 Деплой

Загрузи файлы из архива в свой репозиторий GitHub — через 1 минуту сборка автоматически обновит сайт на [https://hrkotel.sbs/](https://hrkotel.sbs/).
