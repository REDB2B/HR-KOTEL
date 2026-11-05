/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  cleanedValue: string;
}

/**
 * Validates a Telegram username according to strict @username format
 */
export function validateTelegramUsername(value: string): ValidationResult {
  const trimmed = value.trim();

  if (!trimmed) {
    return {
      isValid: false,
      error: 'Пожалуйста, укажите ваш Telegram',
      cleanedValue: trimmed,
    };
  }

  // Reject URLs explicitly
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('t.me/') ||
    trimmed.includes('t.me')
  ) {
    // Attempt clean-up for quick fix suggestion
    const extracted = trimmed.replace(/^(https?:\/\/)?(www\.)?t\.me\//i, '').replace(/[/?#].*$/, '');
    const suggested = extracted ? `@${extracted.replace(/^@/, '')}` : '@username';

    return {
      isValid: false,
      error: `Не используйте ссылки t.me. Введите юзернейм через @ (например, ${suggested})`,
      cleanedValue: suggested,
    };
  }

  // Must start with @
  if (!trimmed.startsWith('@')) {
    return {
      isValid: false,
      error: `Юзернейм должен начинаться со знака @ (например, @${trimmed})`,
      cleanedValue: `@${trimmed}`,
    };
  }

  // Check valid telegram username format: @ followed by 3-32 alphanumeric or underscores
  const usernameWithoutAt = trimmed.slice(1);
  if (usernameWithoutAt.length < 3) {
    return {
      isValid: false,
      error: 'Юзернейм в Telegram должен содержать минимум 3 символа после @',
      cleanedValue: trimmed,
    };
  }

  const validRegex = /^[a-zA-Z0-9_]{3,32}$/;
  if (!validRegex.test(usernameWithoutAt)) {
    return {
      isValid: false,
      error: 'Юзернейм может содержать только латинские буквы, цифры и символ подчеркивания',
      cleanedValue: trimmed,
    };
  }

  return {
    isValid: true,
    cleanedValue: trimmed,
  };
}
