/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CauldronAnimation } from './CauldronAnimation';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Zap, AlertCircle } from 'lucide-react';
import { validateTelegramUsername } from '../utils/telegramValidation';
import { LOGO_IMAGE_SRC } from '../assets/logoBase64';

interface HeroProps {
  onOpenInstantModal: (direction?: string, title?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenInstantModal }) => {
  const [telegram, setTelegram] = useState('');
  const [email, setEmail] = useState('');
  const [tgError, setTgError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate telegram format strictly with @
    const validation = validateTelegramUsername(telegram);
    if (!validation.isValid) {
      setTgError(validation.error || 'Введите юзернейм через @');
      return;
    }
    setTgError(null);

    if (!email.trim()) return;

    try {
      const existing = JSON.parse(localStorage.getItem('kotel_leads') || '[]');
      existing.push({
        telegram: validation.cleanedValue,
        email: email.trim(),
        source: 'hero_fast_form',
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('kotel_leads', JSON.stringify(existing));
    } catch {
      // ignore
    }

    setSent(true);
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
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden border-b border-[#8B5CF6]/20 bg-[#0B0813]">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#8B5CF6]/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-[#97D700]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tagline with official logo mark */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full bg-[#1A142E] border border-[#8B5CF6]/40 text-[#F7CED7] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-6 shadow-sm max-w-full">
          <img 
            src={LOGO_IMAGE_SRC} 
            alt="Logo" 
            className="w-4 h-4 rounded-md object-cover shrink-0"
          />
          <span className="truncate">KOTEL HR · ВАРИМ ИДЕАЛЬНЫЕ КАДРЫ ДЛЯ АРБИТРАЖА</span>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column (7 cols): Copy & Instant Form */}
          <div className="lg:col-span-7">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] font-extrabold text-white leading-[1.12] tracking-tight mb-6 [text-wrap:balance]">
              Подбор специалистов и сборка команд{' '}
              <span className="text-[#97D700] underline decoration-[#8B5CF6]/60 decoration-wavy decoration-2">
                для арбитража трафика
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#E5E0F5]/90 leading-relaxed mb-8 max-w-2xl font-normal">
              Закрываем любые направления и тяжелые вертикали. Проверяем реальные статы и заливы кандидатов через Keitaro и Binom.
            </p>

            {/* Instant Fast Form */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#141022] border border-[#8B5CF6]/30 shadow-2xl mb-8 max-w-xl">
              {sent ? (
                <div className="py-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#1A142E] border border-[#97D700] text-[#97D700] mx-auto flex items-center justify-center mb-2">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">Заявка принята в Котел!</h4>
                  <p className="text-xs text-[#E5E0F5] leading-relaxed">
                    Мы скоро свяжемся с вами в Telegram <b className="text-[#97D700]">{telegram}</b> или по почте <b className="text-[#F7CED7]">{email}</b> для уточнения задачи.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleHeroSubmit} className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-[#F7CED7] mb-1">
                    <span>Быстрый запрос на подбор:</span>
                    <span className="text-[#97D700]">ОТВЕТИМ ЗА 15–30 МИНУТ</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Telegram (@username)*"
                        value={telegram}
                        onChange={handleTelegramChange}
                        className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-[#0B0813] text-white border ${
                          tgError ? 'border-rose-400 focus:border-rose-400' : 'border-[#8B5CF6]/30 focus:border-[#97D700]'
                        } focus:ring-1 focus:outline-none placeholder:text-[#A39AB8]/60`}
                      />
                      {tgError && (
                        <div className="flex items-center gap-1 text-[11px] text-rose-400 mt-1 font-medium">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{tgError}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Рабочий Email*"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-[#0B0813] text-white border border-[#8B5CF6]/30 focus:border-[#97D700] focus:ring-1 focus:ring-[#97D700] focus:outline-none placeholder:text-[#A39AB8]/60"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-[#97D700] hover:bg-[#85be00] text-[#0B0813] font-black text-xs sm:text-sm transition-all shadow-lg shadow-[#97D700]/25 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <Sparkles className="w-4 h-4 text-[#0B0813]" />
                    <span>Отправить заявку · Скоро свяжемся</span>
                    <ArrowRight className="w-4 h-4 text-[#0B0813]" />
                  </button>

                  {/* 100% Confidentiality Guarantee Notice */}
                  <div className="p-2.5 rounded-xl bg-[#0B0813] border border-[#8B5CF6]/20 mt-2">
                    <div className="flex items-start gap-2 text-[11px] text-[#A39AB8] leading-tight">
                      <ShieldCheck className="w-4 h-4 text-[#97D700] shrink-0 mt-0.5" />
                      <span>
                        <b className="text-white">100% конфиденциально:</b> ваша заявка идет только напрямую к нам. Ваши контакты и данные никогда не попадут третьим лицам.
                      </span>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-[#8B5CF6]/20 max-w-xl">
              <div>
                <span className="text-lg sm:text-2xl font-black font-mono text-[#97D700] block">
                  3–5 дней
                </span>
                <span className="text-[11px] sm:text-xs text-[#E5E0F5] font-medium block leading-tight">Первые кандидаты</span>
                <span className="text-[9px] sm:text-[10px] text-[#A39AB8] block mt-0.5">Скрининг статов</span>
              </div>

              <div>
                <span className="text-lg sm:text-2xl font-black font-mono text-white block">
                  12 000+
                </span>
                <span className="text-[11px] sm:text-xs text-[#E5E0F5] font-medium block leading-tight">База специалистов</span>
                <span className="text-[9px] sm:text-[10px] text-[#A39AB8] block mt-0.5">Арбитраж и digital</span>
              </div>

              <div>
                <span className="text-lg sm:text-2xl font-black font-mono text-[#F7CED7] block">
                  31 день
                </span>
                <span className="text-[11px] sm:text-xs text-[#E5E0F5] font-medium block leading-tight">Гарантия замены</span>
                <span className="text-[9px] sm:text-[10px] text-[#A39AB8] block mt-0.5">1 месяц по договору</span>
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): Interactive Witch & Cauldron Graphic (Click & Touch Enabled) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <CauldronAnimation />
          </div>

        </div>

      </div>
    </section>
  );
};
