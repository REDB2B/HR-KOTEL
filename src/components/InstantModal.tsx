/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { validateTelegramUsername } from '../utils/telegramValidation';
import { sendLeadToGoogleScript } from '../utils/leadSender';

interface InstantModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetTitle?: string;
  presetDirection?: string;
}

export const InstantModal: React.FC<InstantModalProps> = ({
  isOpen,
  onClose,
  presetTitle,
  presetDirection,
}) => {
  const [telegram, setTelegram] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [comment, setComment] = useState('');
  const [tgError, setTgError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const isQuestionMode =
    presetTitle?.toLowerCase().includes('вопрос') ||
    presetDirection?.toLowerCase().includes('вопрос');

  useEffect(() => {
    if (presetDirection) {
      setRole(presetDirection);
    }
    if (presetTitle) {
      setComment(presetTitle);
    }
    setTgError(null);
  }, [presetDirection, presetTitle, isOpen]);

  // Lock body scroll when modal is open to prevent background wobble
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Strict Telegram validation
    const validation = validateTelegramUsername(telegram);
    if (!validation.isValid) {
      setTgError(validation.error || 'Укажите юзернейм через @');
      return;
    }
    setTgError(null);

    if (!email.trim()) return;

    // Определяем точное название источника заявки
    let modalSource = 'Модалка (Быстрая заявка)';
    if (isQuestionMode) {
      modalSource = '❓ Модалка: Задать вопрос (FAQ)';
    } else if (presetDirection) {
      modalSource = `🎯 Модалка: ${presetDirection}`;
    } else if (presetTitle) {
      modalSource = `📊 Модалка: ${presetTitle}`;
    }

    setLoading(true);

    // Моментальная отправка лида в Google Apps Script + резерв в localStorage
    await sendLeadToGoogleScript({
      telegram: validation.cleanedValue,
      email: email.trim(),
      role: role.trim() || presetDirection || 'Запрос на подбор',
      comment: comment.trim() || presetTitle || '',
      mode: isQuestionMode ? 'question' : 'hiring_request',
      source: modalSource,
    });

    setLoading(false);
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setTelegram('');
    setEmail('');
    setRole('');
    setComment('');
    setTgError(null);
    onClose();
  };

  const handleTelegramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTelegram(val);
    if (tgError) {
      const validation = validateTelegramUsername(val);
      if (validation.isValid) {
        setTgError(null);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={handleResetAndClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-lg bg-[#141022] border border-[#8B5CF6]/30 rounded-2xl p-5 sm:p-8 shadow-2xl my-auto text-white max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Удобная крупная кнопка закрытия (44x44px) для пальцев на смартфонах */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 w-11 h-11 rounded-xl bg-[#1A142E] border border-[#8B5CF6]/40 text-[#E5E0F5] hover:text-[#97D700] hover:border-[#97D700] transition-colors cursor-pointer flex items-center justify-center z-30 active:scale-95"
          aria-label="Закрыть модальное окно"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {submitted ? (
          <div className="py-6 sm:py-8 text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#1A142E] border-2 border-[#97D700] text-[#97D700] mx-auto flex items-center justify-center mb-4 shadow-lg shadow-[#97D700]/20">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
              {isQuestionMode ? 'Вопрос успешно отправлен!' : 'Заявка принята в Котел!'}
            </h3>

            <p className="text-xs sm:text-sm text-[#E5E0F5] max-w-sm mx-auto mb-6 leading-relaxed">
              Мы скоро свяжемся с вами в Telegram <b className="text-[#97D700]">{telegram}</b> или по почте <b className="text-[#F7CED7]">{email}</b> в течение 15–30 минут.
            </p>

            <div className="p-3.5 rounded-xl bg-[#1A142E] border border-[#8B5CF6]/30 text-xs text-[#E5E0F5] mb-6">
              🔒 Ваша заявка находится напрямую у нас. Все данные строго конфиденциальны.
            </div>

            <button
              onClick={handleResetAndClose}
              className="px-6 py-3 rounded-xl bg-[#97D700] text-[#0B0813] font-bold text-xs sm:text-sm hover:bg-[#85be00] transition-colors cursor-pointer min-h-[44px]"
            >
              Отлично, понятно
            </button>
          </div>
        ) : (
          <div>
            {/* Header Tag */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1A142E] border border-[#97D700]/30 text-[#97D700] text-[10px] sm:text-[11px] font-mono font-bold uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#97D700]" />
              <span>{isQuestionMode ? 'КОНСУЛЬТАЦИЯ' : 'БЫСТРАЯ ЗАЯВКА'}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-2 pr-10">
              {isQuestionMode ? 'Задать вопрос KOTEL HR' : 'Оставить заявку на подбор'}
            </h2>

            <p className="text-xs text-[#A39AB8] mb-5 leading-relaxed">
              Укажите ваш Telegram и почту. Мы скоро свяжемся с вами для ответа на все вопросы и обсуждения задачи.
            </p>

            {/* Quick Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4" data-block-name={isQuestionMode ? "Модалка: Задать вопрос (FAQ)" : presetDirection ? `Модалка: ${presetDirection}` : "Модальное окно заявки"}>
              <div>
                <label className="block text-xs font-mono font-bold text-[#F7CED7] uppercase mb-1.5">
                  Telegram для связи (@username)*
                </label>
                <input
                  type="text"
                  name="telegram"
                  autoComplete="off"
                  inputMode="text"
                  required
                  placeholder="@username"
                  value={telegram}
                  onChange={handleTelegramChange}
                  className={`w-full px-4 py-3 rounded-xl bg-[#0B0813] text-white border ${
                    tgError ? 'border-rose-400 focus:border-rose-400' : 'border-[#8B5CF6]/30 focus:border-[#97D700]'
                  } focus:ring-1 focus:outline-none text-base sm:text-sm placeholder:text-[#A39AB8]/60`}
                />
                {tgError && (
                  <div className="flex items-center gap-1.5 text-[11px] text-rose-400 mt-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{tgError}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#F7CED7] uppercase mb-1.5">
                  Рабочий Email*
                </label>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  placeholder="partner@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0B0813] text-white border border-[#8B5CF6]/30 focus:border-[#97D700] focus:ring-1 focus:ring-[#97D700] focus:outline-none text-base sm:text-sm placeholder:text-[#A39AB8]/60"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#A39AB8] uppercase mb-1.5">
                  Направление или тема (необязательно)
                </label>
                <input
                  type="text"
                  name="direction"
                  placeholder="Например: Media Buyer, Dev, Команда или вопрос"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0813] text-white border border-[#8B5CF6]/20 focus:border-[#97D700] focus:outline-none text-base sm:text-xs placeholder:text-[#A39AB8]/50"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#A39AB8] uppercase mb-1.5">
                  Детали или вопрос
                </label>
                <textarea
                  rows={2}
                  placeholder="Напишите ваш вопрос или требования к специалисту..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0813] text-white border border-[#8B5CF6]/20 focus:border-[#97D700] focus:outline-none text-base sm:text-xs placeholder:text-[#A39AB8]/50 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#97D700] hover:bg-[#85be00] text-[#0B0813] font-black text-sm transition-all shadow-lg shadow-[#97D700]/25 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] min-h-[48px]"
                >
                  <span>
                    {loading
                      ? 'Отправляем...'
                      : isQuestionMode
                      ? 'Отправить вопрос · Скоро свяжемся'
                      : 'Отправить заявку · Скоро свяжемся'}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#0B0813]" />
                </button>
              </div>

              {/* Confidentiality Guarantee */}
              <div className="p-3 rounded-xl bg-[#0B0813] border border-[#8B5CF6]/20">
                <div className="flex items-start gap-2 text-[11px] text-[#A39AB8] leading-tight">
                  <ShieldCheck className="w-4 h-4 text-[#97D700] shrink-0 mt-0.5" />
                  <span>
                    <b className="text-white">100% конфиденциально:</b> ваша заявка идет только к нам. Никаких передач третьим лицам или публичной огласки.
                  </span>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
