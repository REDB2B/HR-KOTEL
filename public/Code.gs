/**
 * ============================================================================
 * KOTEL HR — ОБНОВЛЕННЫЙ GOOGLE APPS SCRIPT (v5.0 BULLETPROOF)
 * Интеграция: Google Таблица (13 колонок) + Telegram Bot + Facebook CAPI
 * ============================================================================
 */

// 1. НАСТРОЙКИ TELEGRAM И FACEBOOK CAPI
const BOT_TOKEN = "9225764593:AAE5UsIkHSwa0v--ZEhy6SChBwLavHrWleY";
const CHAT_ID = "-1004465900255";

const DEFAULT_PIXEL_ID = "4630588717200106";
const FB_ACCESS_TOKEN = "EAGUJi76ztAoBS2JnQIGWWp1s70jVEOfbmK3l9U0LwS4KXEjtqvoWy8FoPLuBCZBC0VTPMl3Go6qjpZB3dq6I1RbXq61YoZCQaUgBMVTQJDDjfZCLzKd9rFpQUWHfV9XhyGEs2eSX4fTJv3BBz2ifN6fee4ngoM44gLKFbxP5BqDQHT65X9jW1jC8LedI8QZDZD";

/**
 * Безопасное экранирование HTML для Telegram API
 */
function escapeHtml(text) {
  if (!text) return "";
  return text.toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * SHA-256 хеширование для Facebook Conversions API
 */
function sha256Hash(value) {
  if (!value) return null;
  const clean = value.toString().trim().toLowerCase();
  if (!clean || clean === "—" || clean.startsWith("—")) return null;
  const rawHash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, clean, Utilities.Charset.UTF_8);
  return rawHash.map(function(b) {
    const v = (b < 0) ? b + 256 : b;
    return ("0" + v.toString(16)).slice(-2);
  }).join("");
}

/**
 * Умная фильтрация и разделение Telegram и Email:
 * Защищает от автозаполнения браузера, когда почта попадает в оба поля
 */
function sanitizeContacts(rawTgInput, rawEmailInput) {
  let tg = (rawTgInput || "").toString().trim();
  let email = (rawEmailInput || "").toString().trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = function(str) {
    return emailRegex.test((str || "").toString().trim());
  };

  // 1. Если в поле Telegram введен Email, а Email пуст или наоборот перепутаны
  if (!isEmail(email) && isEmail(tg)) {
    if (!email || email.startsWith("@") || email.includes("t.me")) {
      const temp = tg;
      tg = email;
      email = temp;
    } else {
      email = tg;
      tg = "";
    }
  }

  // 2. Если оба поля содержат один и тот же Email (автозаполнение браузера)
  if (isEmail(tg) && tg.toLowerCase() === email.toLowerCase()) {
    tg = "";
  }

  // 3. Валидация и извлечение корректного Email
  if (!isEmail(email)) {
    const emailMatch = email.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch) {
      email = emailMatch[0];
    } else if (isEmail(tg)) {
      email = tg;
      tg = "";
    }
  }

  // 4. Очистка Telegram (никогда не добавит @ к Email)
  let phone = "";
  if (tg) {
    // Если в Telegram остался Email
    if (isEmail(tg) || (tg.includes("@") && tg.includes("."))) {
      if (!email || !isEmail(email)) {
        email = tg;
      }
      tg = "— (указан Email)";
    } else {
      // Убираем ссылки t.me/ и web.telegram.org
      tg = tg.replace(/^(https?:\/\/)?(www\.)?t\.me\//i, "")
             .replace(/^https?:\/\/web\.telegram\.org\/(k|a)\/#@?/i, "")
             .replace(/[/?#].*$/, "")
             .trim();

      // Проверка на телефонный номер
      const digitsOnly = tg.replace(/[\s()\-+]/g, "");
      if (/^\d{10,15}$/.test(digitsOnly)) {
        phone = tg.startsWith("+") ? tg : "+" + digitsOnly;
        tg = phone;
      } else if (!tg.startsWith("@") && /^[a-zA-Z0-9_]{3,32}$/.test(tg)) {
        tg = "@" + tg;
      } else if (tg.startsWith("@")) {
        const handle = tg.slice(1).replace(/[^a-zA-Z0-9_]/g, "");
        tg = handle ? "@" + handle : "—";
      }
    }
  }

  return {
    tg: tg || "—",
    email: email || "—",
    phone: phone || ""
  };
}

/**
 * Точное определение блока, кнопки и параметров рецепта
 */
function resolveBlockAndTopic(data) {
  const rawSource = (data.source || data.block_source || data.form_type || "").toString().trim();
  const rawRole = (data.role || data.direction || data.topic || data.subject || "").toString().trim();
  const rawComment = (data.comment || data.details || data.message || data.question || data.custom_text || data.text || "").toString().trim();
  const rawRecipe = (data.recipe || data.config || data.result || data.selected_options || "").toString().trim();

  let confRole = (data.role || data.ingredient1 || "").toString().trim();
  let confVert = (data.vertical || data.ingredient2 || data.spec || "").toString().trim();
  let confTime = (data.urgency || data.ingredient3 || data.timing || "").toString().trim();

  // Проверка на Интерактивный Конфигуратор (Котел)
  const isCooker = (
    (confRole && confVert) ||
    rawSource.toLowerCase().includes("конфигуратор") ||
    rawSource.toLowerCase().includes("котел") ||
    rawSource.toLowerCase().includes("сварить команду") ||
    rawRecipe.toLowerCase().includes("рецепт:")
  );

  if (isCooker) {
    if (rawRecipe && (!confRole || !confVert || !confTime)) {
      const cleanRecipe = rawRecipe.replace(/.*РЕЦЕПТ:\s*/i, "").replace("🔥 Готово к варке", "").trim();
      const parts = cleanRecipe.split(/·|•|\s-\s/);
      if (parts.length >= 2) {
        confRole = confRole || (parts[0] ? parts[0].trim() : "");
        confVert = confVert || (parts[1] ? parts[1].trim() : "");
        confTime = confTime || (parts[2] ? parts[2].trim() : "");
      }
    }
    return {
      blockName: "🧪 Интерактивный Конфигуратор (Котел)",
      topic: [confRole, confVert, confTime].filter(Boolean).join(" · ") || "Сборка команды в котле",
      comment: rawComment || "—",
      isCooker: true,
      confRole: confRole || "—",
      confVert: confVert || "—",
      confTime: confTime || "—"
    };
  }

  // Определение других блоков лендинга
  const combined = (rawSource + " " + rawRole + " " + rawComment).toLowerCase();

  let blockName = "⚡ Шапка сайта / Общая заявка";
  let topic = rawRole || "Общий запрос на подбор";

  if (combined.includes("главный экран") || combined.includes("hero") || combined.includes("подбор специалистов и сборка")) {
    blockName = "⚡ Главный экран (Hero) — Быстрая заявка";
    topic = "Общий запрос на подбор специалистов";
  } else if (combined.includes("подвал") || combined.includes("footer")) {
    blockName = "🔻 Подвал (Footer) — Быстрая заявка";
    topic = "Быстрый запрос из подвала";
  } else if (combined.includes("шапка") || combined.includes("navbar") || combined.includes("header")) {
    blockName = "🔝 Шапка (Navbar) — Заявка на подбор";
    topic = "Общий запрос на подбор специалистов";
  } else if (combined.includes("вопрос") || combined.includes("faq") || combined.includes("консультация") || data.mode === "question") {
    blockName = "❓ Блок FAQ — Задать вопрос KOTEL HR";
    topic = "Консультация / Вопрос по условиям";
  } else if (combined.includes("регламент") || combined.includes("workflow") || combined.includes("как работаем")) {
    blockName = "⚙️ Регламент работы (Workflow)";
    topic = "Запуск подбора по регламенту";
  } else if (combined.includes("кейс") || combined.includes("case")) {
    if (combined.includes("01") || combined.includes("media buying squad") || combined.includes("tier-1")) {
      blockName = "📊 Кейс 01: Media Buying Команда (Tier-1 FB)";
      topic = "Сборка команды под ключ (6 Senior FB + Тимлид)";
    } else if (combined.includes("02") || combined.includes("igaming") || combined.includes("cmo") || combined.includes("executive")) {
      blockName = "📊 Кейс 02: iGaming холдинг (C-Level CMO)";
      topic = "Executive Search: Хедхантинг CMO";
    } else if (combined.includes("03") || combined.includes("in-house") || combined.includes("масштабирование")) {
      blockName = "📊 Кейс 03: Масштабирование In-house байинга";
      topic = "Масштабирование отдела байинга";
    } else {
      blockName = "📊 Блок кейсов — Собрать такую же команду";
      topic = rawComment || "Запрос по кейсу";
    }
  } else if (combined.includes("media buying") || combined.includes("залив трафика")) {
    blockName = "🎯 Направление: Media Buying & Залив трафика";
    topic = "Media Buying & Залив трафика";
  } else if (combined.includes("сборка готовых команд") || combined.includes("фарминг")) {
    blockName = "👥 Направление: Сборка команд & Фарминг";
    topic = "Сборка готовых команд & Фарминг";
  } else if (combined.includes("технический dev") || combined.includes("dev под арбитраж") || combined.includes("разработчик")) {
    blockName = "💻 Направление: Технический Dev под арбитраж";
    topic = "Технический Dev под арбитраж";
  } else if (combined.includes("affiliate") || combined.includes("business development") || combined.includes("bizdev")) {
    blockName = "📈 Направление: Affiliate & Business Development";
    topic = "Affiliate & Business Development";
  } else if (combined.includes("тяжелые") || combined.includes("серые вертикали") || combined.includes("сложная вертикаль")) {
    blockName = "⚡ Направление: Тяжелые и серые вертикали";
    topic = "Тяжелые и серые вертикали со сложной модерацией";
  } else if (combined.includes("c-level") || combined.includes("руководство") || combined.includes("хедхантинг")) {
    blockName = "🛡 Направление: Хедхантинг C-Level & Руководство";
    topic = "Executive Search & C-Level";
  } else if (rawSource) {
    blockName = rawSource.startsWith("Модалка") || rawSource.startsWith("Форма") ? rawSource : "📌 " + rawSource;
  }

  let comment = rawComment;
  if (!comment || comment === topic || comment === blockName) {
    comment = "—";
  }

  return {
    blockName: blockName,
    topic: topic,
    comment: comment,
    isCooker: false,
    confRole: "—",
    confVert: "—",
    confTime: "—"
  };
}

/**
 * Извлечение UTM-меток и параметров Facebook
 */
function extractTrafficParams(data, pageUrl, rawUtm) {
  function getParam(names, urlStr, utmStr) {
    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      const regex = new RegExp('[?&]' + name + '=([^&#]*)', 'i');
      const match = urlStr.match(regex) || utmStr.match(regex);
      if (match && match[1]) {
        return decodeURIComponent(match[1]).trim();
      }
    }
    return "";
  }

  const pixelId = (
    data.pixel_id ||
    data.px ||
    data.pixel ||
    getParam(['px', 'pixel', 'fb_pixel', 'pixel_id'], pageUrl, rawUtm) ||
    DEFAULT_PIXEL_ID
  ).toString().trim();

  const campaignId = (
    data.campaign_id ||
    data.utm_campaign ||
    data.cid ||
    getParam(['campaign_id', 'utm_campaign', 'cid', 'campaign'], pageUrl, rawUtm) ||
    "—"
  ).toString().trim();

  const adsetId = (
    data.adset_id ||
    data.utm_term ||
    data.adset ||
    data.aid ||
    getParam(['adset_id', 'utm_term', 'adset', 'aid'], pageUrl, rawUtm) ||
    "—"
  ).toString().trim();

  const adId = (
    data.ad_id ||
    data.utm_content ||
    data.ad ||
    getParam(['ad_id', 'utm_content', 'ad'], pageUrl, rawUtm) ||
    "—"
  ).toString().trim();

  const fbclid = (
    data.fbclid ||
    getParam(['fbclid'], pageUrl, rawUtm) ||
    ""
  ).toString().trim();

  return {
    pixelId: pixelId || DEFAULT_PIXEL_ID,
    campaignId: campaignId || "—",
    adsetId: adsetId || "—",
    adId: adId || "—",
    fbclid: fbclid
  };
}

/**
 * ГЛАВНЫЙ ОБРАБОТЧИК ЗАПРОСОВ (doPost)
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    let data = {};
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      data = { raw_text: e.postData.contents };
    }

    const timestamp = Utilities.formatDate(new Date(), "GMT+3", "dd.MM.yyyy HH:mm:ss");

    // 1. Очистка и валидация контактов (Telegram vs Email)
    const rawTg = (data.tg || data.telegram || data.username || data.contact || data.phone || "").toString().trim();
    const rawEmail = (data.email || data.mail || data.user_email || "").toString().trim();
    const contacts = sanitizeContacts(rawTg, rawEmail);

    // 2. Определение блока и темы
    const resolved = resolveBlockAndTopic(data);

    // 3. Защита от случайных повторных кликов на 20 секунд
    const cache = CacheService.getScriptCache();
    const dedupKey = "kotel_lock_" +
      contacts.tg.toLowerCase().replace(/[^a-z0-9]/g, "") + "_" +
      contacts.email.toLowerCase().replace(/[^a-z0-9]/g, "") + "_" +
      resolved.blockName.slice(0, 10).toLowerCase().replace(/[^a-z0-9]/g, "");

    if (cache.get(dedupKey)) {
      return ContentService.createTextOutput(JSON.stringify({ status: "duplicate_skipped" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    cache.put(dedupKey, "1", 20);

    // 4. Параметры трафика и UTM-метки
    const pageUrl = (data.pageUrl || data.url || data.referrer || "").toString();
    const rawUtm = (data.utm || "").toString();
    const traffic = extractTrafficParams(data, pageUrl, rawUtm);

    // 5. Запись в таблицу строго по 13 колонкам (A-M)
    sheet.appendRow([
      timestamp,                                    // A: Дата и время
      resolved.blockName,                           // B: Блок / Кнопка
      contacts.tg,                                  // C: Telegram
      contacts.email,                               // D: Email
      resolved.topic,                               // E: Направление / Рецепт
      resolved.comment,                             // F: Комментарий клиента
      traffic.pixelId,                              // G: Pixel ID
      traffic.campaignId,                           // H: Campaign ID
      traffic.adsetId,                              // I: Adset ID
      traffic.adId,                                 // J: Ad ID
      resolved.isCooker ? resolved.confRole : "—",  // K: Конфигуратор: Роль
      resolved.isCooker ? resolved.confVert : "—",  // L: Конфигуратор: Вертикаль
      resolved.isCooker ? resolved.confTime : "—"   // M: Конфигуратор: Сроки
    ]);

    // 6. Отправка события Lead в Facebook Conversions API (CAPI)
    try {
      const eventTime = Math.floor(new Date().getTime() / 1000);
      const userData = {
        client_user_agent: (data.userAgent || "").toString()
      };

      const emailHash = sha256Hash(contacts.email);
      if (emailHash) userData.em = [emailHash];

      if (contacts.phone) {
        const phoneHash = sha256Hash(contacts.phone.replace(/[^0-9]/g, ""));
        if (phoneHash) userData.ph = [phoneHash];
      }

      if (traffic.fbclid) {
        userData.fbc = "fb.1." + eventTime + "." + traffic.fbclid;
      }

      const fbEventId = (data.event_id || ("lead_" + eventTime + "_" + Math.floor(Math.random() * 100000))).toString();

      const fbPayload = {
        data: [{
          event_name: "Lead",
          event_time: eventTime,
          action_source: "website",
          event_source_url: pageUrl || "https://hrkotel.sbs/",
          event_id: fbEventId,
          user_data: userData,
          custom_data: {
            content_name: resolved.blockName,
            content_category: resolved.topic
          }
        }]
      };

      UrlFetchApp.fetch("https://graph.facebook.com/v19.0/" + traffic.pixelId + "/events?access_token=" + FB_ACCESS_TOKEN, {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify(fbPayload),
        muteHttpExceptions: true
      });
    } catch (fbErr) {
      // Ошибка FB CAPI не должна ломать отправку в Telegram
    }

    // 7. Отправка отбива в Telegram (с красивым и безопасным HTML)
    let msg = "🟢 <b>НОВАЯ ЗАЯВКА — HR KOTEL</b>\n";
    msg += "───────────────────\n";
    msg += "📍 <b>Откуда:</b> " + escapeHtml(resolved.blockName) + "\n";

    if (resolved.isCooker) {
      msg += "🧪 <b>Рецепт из котла:</b>\n";
      msg += "• Роль: <b>" + escapeHtml(resolved.confRole) + "</b>\n";
      msg += "• Вертикаль: <b>" + escapeHtml(resolved.confVert) + "</b>\n";
      msg += "• Сроки: <b>" + escapeHtml(resolved.confTime) + "</b>\n";
    } else {
      msg += "🎯 <b>Запрос:</b>\n<b>" + escapeHtml(resolved.topic) + "</b>\n";
    }

    if (resolved.comment && resolved.comment !== "—" && resolved.comment !== resolved.topic) {
      msg += "\n💬 <b>Комментарий:</b>\n<i>" + escapeHtml(resolved.comment) + "</i>\n";
    }

    msg += "───────────────────\n";
    msg += "✈️ <b>Telegram:</b> " + escapeHtml(contacts.tg) + "\n";
    msg += "📧 <b>Email:</b> <code>" + escapeHtml(contacts.email) + "</code>\n";
    msg += "───────────────────\n";
    msg += "📊 <b>Трафик из FB:</b>\n";
    msg += "• Pixel: <code>" + escapeHtml(traffic.pixelId) + "</code>\n";
    msg += "• Campaign ID: <code>" + escapeHtml(traffic.campaignId) + "</code>\n";
    msg += "• AdSet ID: <code>" + escapeHtml(traffic.adsetId) + "</code>\n";
    msg += "• Ad ID: <code>" + escapeHtml(traffic.adId) + "</code>\n";
    msg += "───────────────────\n";
    msg += "🕒 <b>Время:</b> " + timestamp;

    UrlFetchApp.fetch("https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage", {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify({
        chat_id: CHAT_ID,
        text: msg,
        parse_mode: "HTML",
        disable_web_page_preview: true
      }),
      muteHttpExceptions: true
    });

    return ContentService.createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    try {
      SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().appendRow(["ERROR", err.toString()]);
    } catch (e) {}

    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
