/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { validateTelegramUsername } from '../utils/telegramValidation';

interface CandidateCookerProps {
  onSuccessSubmit: (tg: string, email: string) => void;
}

export const CandidateCooker: React.FC<CandidateCookerProps> = ({ onSuccessSubmit }) => {
  const [selectedRole, setSelectedRole] = useState('Solo Media Buyer');
  const [verticalType, setVerticalType] = useState('Любая / Тяжелая серая вертикаль');
  const [urgency, setUrgency] = useState('Горит: первые кандидаты за 48 часов!');
  const [telegram, setTelegram] = useState('');
  const [email, setEmail] = useState('');
  const [tgError, setTgError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateTelegramUsername(telegram);
    if (!validation.isValid) {
      setTgError(validation.error || 'Укажите юзернейм через @');
      return;
    }
    setTgError(null);

    if (!email.trim()) return;

    try {
      const existing = JSON.parse(localStorage.getItem('kotel_leads') || '[]');
      existing.push({
        role: selectedRole,
        vertical: verticalType,
        urgency,
        telegram: validation.cleanedValue,
        email: email.trim(),
        source: 'candidate_cooker',
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('kotel_leads', JSON.stringify(existing));
    } catch {
      // ignore
    }

    setSubmitted(true);
    onSuccessSubmit(validation.cleanedValue, email);
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
    <section id="candidate-cooker" className="py-20 md:py-28 bg-[#0B0813] border-b border-[#8B5CF6]/20 relative">
      
      {/* Mystic back aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#8B5CF6]/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A142E] border border-[#8B5CF6]/40 text-[#F7CED7] text-xs font-mono font-bold uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#97D700]" />
            <span>ИНТЕРАКТИВНЫЙ КОНФИГУРАТОР</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            Собрать идеального кандидата в Котел
          </h2>
          <p className="text-sm text-[#E5E0F5]/85 mt-3 leading-relaxed max-w-xl mx-auto">
            Выберите ключевые ингредиенты под вашу задачу. Мы подключим закрытую базу и свяжемся с вами для согласования профиля.
          </p>
        </div>

        {/* Cooker Card */}
        <div className="p-7 sm:p-10 rounded-3xl bg-[#141022] border border-[#8B5CF6]/30 shadow-2xl">
          
          {submitted ? (
            <div className="py-10 text-center">
              <div className="w-16 h-16 rounded-full bg-[#1A142E] border-2 border-[#97D700] text-[#97D700] mx-auto flex items-center justify-center mb-4 shadow-lg shadow-[#97D700]/25">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">Котел запущен в работу!</h3>
              <p className="text-sm text-[#E5E0F5] max-w-md mx-auto mb-6 leading-relaxed">
                Мы скоро свяжемся с вами в Telegram <b className="text-[#97D700]">{telegram}</b> или по почте <b className="text-[#F7CED7]">{email}</b> для уточнения стека и условий.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-[#1A142E] text-xs font-bold text-[#F7CED7] hover:text-white border border-[#8B5CF6]/30 transition-colors"
              >
                Собрать еще одного специалиста
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Step 1: Role */}
              <div>
                <label className="block text-xs font-mono font-bold text-[#F7CED7] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#97D700]" />
                  <span>1. ИНГРЕДИЕНТ: Какая роль вам требуется?</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    'Solo Media Buyer (FB/Google/ASO)',
                    'Team Lead сквада байеров',
                    'Сборка целого сквада под ключ',
                    'iOS / Android Webview Dev',
                    'Affiliate / BizDev Manager',
                    'C-Level (CMO, COO, CBDO)',
                  ].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      className={`p-3 text-xs font-bold rounded-xl transition-all text-left border cursor-pointer ${
                        selectedRole === role
                          ? 'bg-[#1A142E] text-[#97D700] border-[#97D700] shadow-md shadow-[#97D700]/15'
                          : 'bg-[#0B0813] text-[#E5E0F5] border-[#8B5CF6]/20 hover:border-[#8B5CF6]/50'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Vertical */}
              <div>
                <label className="block text-xs font-mono font-bold text-[#F7CED7] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                  <span>2. ИНГРЕДИЕНТ: Специфика вертикали</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    'Любая / Классическая (iGaming, Gambling, Betting, Nutra)',
                    'Тяжелая серая со сложной модерацией и банами',
                    'Специфические ГЕО (США, LatAm, Азия) и редкий стек',
                  ].map((vert) => (
                    <button
                      key={vert}
                      type="button"
                      onClick={() => setVerticalType(vert)}
                      className={`p-3 text-xs font-bold rounded-xl transition-all text-left border cursor-pointer ${
                        verticalType === vert
                          ? 'bg-[#1A142E] text-[#F7CED7] border-[#F7CED7] shadow-md shadow-[#F7CED7]/15'
                          : 'bg-[#0B0813] text-[#E5E0F5] border-[#8B5CF6]/20 hover:border-[#8B5CF6]/50'
                      }`}
                    >
                      {vert}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Urgency */}
              <div>
                <label className="block text-xs font-mono font-bold text-[#F7CED7] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F7CED7]" />
                  <span>3. ИНГРЕДИЕНТ: Сроки запуска</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    'Горит: показать первые проверенные резюме за 48 часов',
                    'Плановый найм: закрыть в течение 1–2 недель',
                  ].map((urg) => (
                    <button
                      key={urg}
                      type="button"
                      onClick={() => setUrgency(urg)}
                      className={`p-3 text-xs font-bold rounded-xl transition-all text-left border cursor-pointer ${
                        urgency === urg
                          ? 'bg-[#1A142E] text-[#97D700] border-[#97D700] shadow-md shadow-[#97D700]/15'
                          : 'bg-[#0B0813] text-[#E5E0F5] border-[#8B5CF6]/20 hover:border-[#8B5CF6]/50'
                      }`}
                    >
                      {urg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Instant Contact Submission */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#0B0813] border border-[#8B5CF6]/30 pt-5">
                <div className="flex items-center justify-between mb-3 text-xs font-mono font-bold text-[#F7CED7]">
                  <span>КУДА ПРИСЛАТЬ РЕЗУЛЬТАТ:</span>
                  <span className="text-[#97D700]">ОТВЕТИМ ЗА 15–30 МИНУТ</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Ваш Telegram (@username)*"
                      value={telegram}
                      onChange={handleTelegramChange}
                      className={`w-full px-4 py-3 rounded-xl bg-[#141022] text-white border ${
                        tgError ? 'border-rose-400 focus:border-rose-400' : 'border-[#8B5CF6]/30 focus:border-[#97D700]'
                      } focus:ring-1 focus:outline-none text-sm placeholder:text-[#A39AB8]/60`}
                    />
                    {tgError && (
                      <div className="flex items-center gap-1.5 text-[11px] text-rose-400 mt-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
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
                      className="w-full px-4 py-3 rounded-xl bg-[#141022] text-white border border-[#8B5CF6]/30 focus:border-[#97D700] focus:ring-1 focus:ring-[#97D700] focus:outline-none text-sm placeholder:text-[#A39AB8]/60"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-[#97D700] hover:bg-[#85be00] text-[#0B0813] font-black text-sm sm:text-base transition-all shadow-lg shadow-[#97D700]/25 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
                >
                  <Sparkles className="w-5 h-5 text-[#0B0813]" />
                  <span>Сварить команду · Скоро свяжемся</span>
                  <ArrowRight className="w-5 h-5 text-[#0B0813]" />
                </button>

                {/* Confidentiality Notice */}
                <div className="p-3 rounded-xl bg-[#141022] border border-[#8B5CF6]/20 mt-3">
                  <div className="flex items-start gap-2 text-[11px] text-[#A39AB8] leading-tight">
                    <ShieldCheck className="w-4 h-4 text-[#97D700] shrink-0 mt-0.5" />
                    <span>
                      <b className="text-white">100% конфиденциально:</b> ваша заявка идет только напрямую к нам. Ни у кого не будет ваших персональных данных.
                    </span>
                  </div>
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
