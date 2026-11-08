# KOTEL HR AGENCY — Landing Page

Лендинг рекрутингового агентства KOTEL HR для ниши iGaming, Affiliate Marketing и Media Buying.

## 🗂 Структура проекта

```
kotel-hr-landing/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← Авто-деплой на GitHub Pages
├── public/
│   ├── .nojekyll               ← Отключает Jekyll на GitHub Pages
│   ├── favicon.ico             ← Добавь свою иконку (необязательно)
│   └── og-image.png            ← Превью для соцсетей (необязательно)
├── src/
│   ├── assets/
│   │   └── logoBase64.ts       ← Логотип в Base64
│   ├── components/             ← Все секции лендинга
│   │   ├── Navbar.tsx          ← Навигация
│   │   ├── Hero.tsx            ← Герой-секция с формой
│   │   ├── Directions.tsx      ← Направления
│   │   ├── CandidateCooker.tsx ← Конфигуратор «Сварить команду»
│   │   ├── Cases.tsx           ← Кейсы
│   │   ├── Workflow.tsx        ← Схема работы
│   │   ├── TrustAndFaq.tsx     ← FAQ
│   │   ├── Footer.tsx          ← Футер
│   │   ├── InstantModal.tsx    ← Быстрая модалка
│   │   ├── LeadModal.tsx       ← Расширенная модалка
│   │   ├── Vacancies.tsx       ← Вакансии
│   │   ├── VacancyModal.tsx    ← Модалка вакансии
│   │   ├── WhyUs.tsx           ← Почему мы
│   │   ├── Specializations.tsx ← Специализации
│   │   ├── Calculator.tsx      ← Калькулятор
│   │   ├── AudienceSwitch.tsx  ← Переключатель аудитории
│   │   └── CauldronAnimation.tsx ← Анимация котла
│   ├── data/
│   │   └── recruitingData.ts   ← ВСЕ ТЕКСТЫ, вакансии, кейсы — редактируй здесь
│   ├── styles/
│   │   └── index.css           ← Глобальные стили и анимации
│   ├── utils/
│   │   └── telegramValidation.ts ← Валидация Telegram username
│   ├── types.ts                ← TypeScript типы
│   ├── App.tsx                 ← Корневой компонент
│   └── main.tsx                ← Точка входа
├── index.html                  ← HTML-шаблон (SEO мета-теги тут)
├── vite.config.ts              ← Настройки сборщика
├── tsconfig.json               ← TypeScript конфиг
├── package.json                ← Зависимости
└── .gitignore
```

## 🚀 Быстрый старт

```bash
# 1. Установить зависимости
npm install

# 2. Запустить локально
npm run dev

# 3. Собрать для продакшн
npm run build

# 4. Превью сборки
npm run preview
```

## 📝 Как редактировать контент

| Что менять | Файл |
|---|---|
| Вакансии | `src/data/recruitingData.ts` → `VACANCIES` |
| Кейсы | `src/data/recruitingData.ts` → `CASE_STUDIES` |
| Специализации | `src/data/recruitingData.ts` → `SPECIALIZATIONS` |
| Шаги работы | `src/data/recruitingData.ts` → `WORKFLOW_STEPS` |
| FAQ | `src/data/recruitingData.ts` → `FAQS` |
| Цвета темы | `src/styles/index.css` → блок `:root` |
| SEO-теги | `index.html` |
| Логотип | `src/assets/logoBase64.ts` |

## 🌐 Деплой на GitHub Pages

### Шаг 1: Загрузи проект в GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/ТВО_ИМЯ/ИМЯ_РЕПО.git
git push -u origin main
```

### Шаг 2: Включи GitHub Pages
В репозитории: **Settings → Pages → Source → GitHub Actions**

После этого каждый `git push` в `main` автоматически деплоит сайт.

### Шаг 3: Подключение кастомного домена
1. В репозитории: **Settings → Pages → Custom domain** — введи свой домен
2. У регистратора домена добавь DNS-записи:
   - **Если apex-домен** (yourdomain.com):
     ```
     A    @    185.199.108.153
     A    @    185.199.109.153
     A    @    185.199.110.153
     A    @    185.199.111.153
     ```
   - **Если www** (www.yourdomain.com):
     ```
     CNAME  www  ТВО_ИМЯ.github.io
     ```
3. В файле `index.html` замени `YOUR_DOMAIN` на свой настоящий домен
4. `vite.config.ts` уже настроен с `base: '/'` для кастомного домена ✅

> **Важно:** После добавления домена GitHub автоматически создаст файл `CNAME` в корне `gh-pages` ветки. Не удаляй его.

## ⚙️ Настройка `base` в vite.config.ts

| Ситуация | Значение `base` |
|---|---|
| Кастомный домен (yourdomain.com) | `'/'` ✅ уже стоит |
| GitHub Pages без домена (user.github.io/repo) | `'/имя-репозитория/'` |
