# KOTEL HR AGENCY — Landing Page

Лендинг специализированного рекрутингового агентства **KOTEL HR** для ниш iGaming, Affiliate Marketing и Media Buying.

🌐 **Рабочий домен:** [https://hrkotel.sbs/](https://hrkotel.sbs/)

---

## 🗂 Чистая и масштабируемая структура проекта

```
kotel-hr-landing/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← Авто-деплой GitHub Actions (Node 22)
├── public/
│   ├── .nojekyll               ← Отключает Jekyll на GitHub Pages
│   ├── CNAME                   ← Привязка домена hrkotel.sbs (защита от сброса)
│   └── [изображения]           ← Иконки и иллюстрации
├── src/
│   ├── assets/
│   │   └── logoBase64.ts       ← Векторный/растровый логотип в Base64
│   ├── components/             ← Модульные секции лендинга
│   │   ├── Navbar.tsx          ← Шапка с удобным мобильным меню
│   │   ├── Hero.tsx            ← Главный экран с быстрой формой
│   │   ├── Directions.tsx      ← Направления и вертикали
│   │   ├── CandidateCooker.tsx ← Конфигуратор «Сварить команду в Котел»
│   │   ├── Cases.tsx           ← Оцифрованные кейсы
│   │   ├── Workflow.tsx        ← 4-шаговый прозрачный процесс
│   │   ├── TrustAndFaq.tsx     ← Вопросы и ответы (FAQ)
│   │   ├── Footer.tsx          ← Подвал с формой
│   │   ├── InstantModal.tsx    ← Модальное окно (крупные тач-кнопки 44px)
│   │   ├── CauldronAnimation.tsx ← Аппаратно-ускоренный интерактивный котел
│   │   └── ...
│   ├── data/
│   │   └── recruitingData.ts   ← Все тексты, вакансии, кейсы и FAQ
│   ├── styles/
│   │   └── index.css           ← Глобальные стили, Pantone цвета, анимации
│   ├── utils/
│   │   ├── leadSender.ts       ← Моментальная отправка лидов в Google Таблицу
│   │   └── telegramValidation.ts ← Строгая валидация Telegram (@username)
│   ├── types.ts                ← TypeScript интерфейсы
│   ├── vite-env.d.ts           ← Типы Vite и CSS-модулей
│   ├── App.tsx                 ← Корневой компонент (защита от перекосов)
│   └── main.tsx                ← Точка входа React
├── CNAME                       ← Домен hrkotel.sbs в корне репозитория
├── index.html                  ← SEO-оптимизированный HTML (viewport-fit=cover)
├── vite.config.ts              ← Конфигурация Vite для кастомного домена
├── tsconfig.json               ← Безопасный конфиг TypeScript
├── package.json                ← Публичные стабильные версии библиотек
└── .gitignore                  ← Исключение системных файлов и dist
```

---

## 📊 Интеграция с Google Таблицей (Google Apps Script)

Все формы на сайте (Hero, Конфигуратор, Футер, Модалка) автоматически и моментально отправляют данные в твой Google Apps Script:

```ts
// src/utils/leadSender.ts
export const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycby9lZ0hWeVrRqKzSFAInoEEzgcAxhAXHyYXnlCZYZ1Tb0PnesriFR7Sif9aSRAhgJuF6g/exec';
```

### Какие данные уходят при каждой заявке:
- `telegram` — ник пользователя через `@`
- `email` — контактный email
- `source` — с какой именно формы оставлена заявка
- `role` / `vertical` / `urgency` — выбранные ингредиенты в конфигураторе
- `comment` — детали или вопрос
- `timestamp` / `submittedAt` — точное время по МСК

*В качестве резерва копия каждой заявки всегда сохраняется в `localStorage` браузера.*

---

## 📱 Мобильная адаптация и производительность

- **Без горизонтального скролла:** контейнеры жестко зафиксированы (`overflow-x: hidden`, `width: 100%`, `max-width: 100vw`). Никаких дерганий вправо-влево при свайпах.
- **Удобные кнопки закрытия:** кнопки «Закрыть» (крестики) и кнопки меню увеличены до стандарта 44×44px с контрастной подложкой для удобного нажатия пальцем.
- **Предотвращение автозума на iOS:** размеры шрифта инпутов на смартфонах настроены так, чтобы Safari не приближал экран при фокусе.
- **Плавные 60-120 FPS анимации:** анимация котла и пара переведена на чистые GPU-трансформации (`translate3d`, `opacity`), убран тяжелый процессорный блюр-фильтр.

---

## 🚀 Публикация на GitHub Pages

Просто залей файлы из этого архива в корень репозитория GitHub:
1. GitHub Actions автоматически подхватит workflow и запустит `npm install && npm run build`.
2. Через 1 минуту обновленная версия моментально появится на [https://hrkotel.sbs/](https://hrkotel.sbs/).
