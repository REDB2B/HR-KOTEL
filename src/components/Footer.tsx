/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { validateTelegramUsername } from '../utils/telegramValidation';
import { sendLeadToGoogleScript } from '../utils/leadSender';
import { LOGO_IMAGE_SRC } from '../assets/logoBase64';

interface FooterProps {
  onOpenInstantModal: (direction?: string, title?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInstantModal }) => {
  const [telegram, setTelegram] = useState('');
  const [email, setEmail] = useState('');
  const [tgError, setTgError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFooterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateTelegramUsername(telegram);
    if (!validation.isValid) {
      setTgError(validation.error || 'Укажите юзернейм через @');
      return;
    }
    setTgError(null);

    if (!email.trim()) return;

    setLoading(true);

    // Моментальная отправка лида в Google Apps Script + резерв в localStorage
    await sendLeadToGoogleScript({
      telegram: validation.cleanedValue,
      email: email.trim(),
      source: 'Форма в подвале (Footer)',
    });

    setLoading(false);
    setSubmitted(true);
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
    <footer className="bg-[#0B0813] text-white pt-14 pb-12 border-t border-[#8B5CF6]/20 overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 pb-12 border-b border-white/10">
          {/* Brand Info with Official Logo */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={LOGO_IMAGE_SRC}
                alt="KOTEL HR Logo"
                className="w-10 h-10 rounded-xl object-cover border border-[#97D700]/40 shadow-md shadow-[#97D700]/20 shrink-0"
              />
              <div className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
                <span>KOTEL</span>
                <span className="text-xs px-2 py-0.5 rounded bg-[#97D700] text-[#0B0813] font-black font-mono">
                  HR
                </span>
              </div>
            </div>

            <p className="text-xs text-[#A39AB8] leading-relaxed max-w-sm font-normal">
              Специализированное рекрутинговое агентство для арбитража трафика и digital-проектов. Варим идеальные кадры под любые вертикали, проверяем реальные статы и закрываем позиции от 5 дней.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onOpenInstantModal(undefined, 'Заявка на подбор')}
                className="px-5 py-3 rounded-xl bg-[#1A142E] hover:bg-[#231A3F] border border-[#8B5CF6]/40 text-xs font-bold text-[#F7CED7] hover:text-white transition-colors cursor-pointer flex items-center gap-2 min-h-[44px]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#97D700]" />
                <span>Оставить заявку на подбор</span>
              </button>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono font-bold text-[#F7CED7] uppercase tracking-wider">
              Навигация
            </div>
            <ul className="space-y-2 text-xs text-[#E5E0F5]">
              <li>
                <a href="#directions" className="hover:text-[#97D700] transition-colors py-1 inline-block">
                  Направления и вертикали
                </a>
              </li>
              <li>
                <a href="#candidate-cooker" className="hover:text-[#97D700] transition-colors py-1 inline-block">
                  Конфигуратор «Сварить команду»
                </a>
              </li>
              <li>
                <a href="#cases" className="hover:text-[#97D700] transition-colors py-1 inline-block">
                  Фактические кейсы
                </a>
              </li>
              <li>
                <a href="#workflow" className="hover:text-[#97D700] transition-colors py-1 inline-block">
                  Схема работы
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#97D700] transition-colors py-1 inline-block">
                  Вопросы и ответы
                </a>
              </li>
            </ul>
          </div>

          {/* Fast Instant Form inside Footer */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono font-bold text-[#F7CED7] uppercase tracking-wider">
              Быстрый запрос на подбор
            </div>

            {submitted ? (
              <div className="p-4 rounded-xl bg-[#141022] border border-[#97D700]/40 text-center">
                <CheckCircle2 className="w-6 h-6 text-[#97D700] mx-auto mb-1.5" />
                <span className="text-xs font-bold text-white block">Заявка принята в Котел!</span>
                <span className="text-[11px] text-[#A39AB8]">Мы скоро свяжемся с вами в Telegram или по почте</span>
              </div>
            ) : (
              <form onSubmit={handleFooterSubmit} className="space-y-2.5">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Ваш Telegram (@username)*"
                    value={telegram}
                    onChange={handleTelegramChange}
                    className={`w-full px-3.5 py-3 text-base sm:text-xs rounded-xl bg-[#141022] text-white border ${
                      tgError ? 'border-rose-400 focus:border-rose-400' : 'border-[#8B5CF6]/30 focus:border-[#97D700]'
                    } focus:outline-none placeholder:text-[#A39AB8]/60`}
                  />
                  {tgError && (
                    <div className="flex items-center gap-1.5 text-[10px] text-rose-400 mt-1 font-medium">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{tgError}</span>
                    </div>
                  )}
                </div>

                <input
                  type="email"
                  required
                  placeholder="Рабочий Email*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-3 text-base sm:text-xs rounded-xl bg-[#141022] text-white border border-[#8B5CF6]/30 focus:border-[#97D700] focus:outline-none placeholder:text-[#A39AB8]/60"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 text-xs font-bold text-[#0B0813] bg-[#97D700] hover:bg-[#85be00] rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 min-h-[44px]"
                >
                  <span>{loading ? 'Отправляем...' : 'Отправить заявку · Скоро свяжемся'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            {/* Confidentiality Notice */}
            <div className="flex items-start gap-1.5 text-[10px] text-[#A39AB8] leading-tight pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#97D700] shrink-0 mt-0.5" />
              <span>
                100% конфиденциально: данные идут только к нам и не передаются третьим лицам.
              </span>
            </div>
          </div>
        </div>

        {/* Legal & copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A39AB8]">
          <div>
            © {new Date().getFullYear()} KOTEL HR AGENCY. Все права защищены.
          </div>
          <div className="flex items-center gap-2 text-[#F7CED7]">
            <Sparkles className="w-3.5 h-3.5 text-[#97D700]" />
            <span>Варим кадры с подтвержденным ROI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
