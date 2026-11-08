/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, MapPin, DollarSign, Briefcase, Send, CheckCircle2 } from 'lucide-react';
import { Vacancy } from '../types';
import { sendLeadToGoogleScript } from '../utils/leadSender';

interface VacancyModalProps {
  vacancy: Vacancy | null;
  onClose: () => void;
  onApplySuccess: () => void;
}

export const VacancyModal: React.FC<VacancyModalProps> = ({ vacancy, onClose, onApplySuccess }) => {
  if (!vacancy) return null;

  const [telegram, setTelegram] = useState('');
  const [name, setName] = useState('');
  const [experience, setExperience] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!telegram.trim()) return;

    await sendLeadToGoogleScript({
      telegram: telegram.trim(),
      email: name.trim() || 'Отклик на вакансию',
      role: vacancy.title,
      comment: `Опыт: ${experience}. Ссылка: ${portfolioLink}`,
      source: `Отклик на вакансию: ${vacancy.title}`,
    });

    setSubmitted(true);
    setTimeout(() => {
      onApplySuccess();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#0c241a] border border-[rgba(247,206,215,0.25)] rounded-2xl p-5 sm:p-8 shadow-2xl my-auto max-h-[92vh] overflow-y-auto text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Крупная удобная кнопка закрытия для пальцев (44x44px) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 w-11 h-11 rounded-xl bg-[#1A142E] border border-[#8B5CF6]/30 text-[#e2ede8] hover:text-[#97D700] hover:border-[#97D700] transition-colors flex items-center justify-center z-20 active:scale-95"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 sm:py-12 text-center">
            <div className="w-14 h-14 rounded-full bg-[#154734] border border-[#97D700] text-[#97D700] mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Отклик успешно отправлен!</h3>
            <p className="text-sm text-[#e2ede8]/85 max-w-md mx-auto mb-4">
              Рекрутер KOTEL HR свяжется с вами в Telegram в течение нескольких часов для закрытого скрининга.
            </p>
            <div className="text-xs text-[#95b3a6]">
              Или напишите нам напрямую: <a href="https://t.me/hrkotel" target="_blank" rel="noopener noreferrer" className="text-[#97D700] font-bold underline">@hrkotel</a>
            </div>
          </div>
        ) : (
          <div>
            {/* Header info */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#97D700] uppercase mb-2">
              <span>{vacancy.categoryLabel}</span>
              <span className="text-[#F7CED7]/40">·</span>
              <span className="text-[#F7CED7]">{vacancy.experienceYears}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-3 pr-10">
              {vacancy.title}
            </h2>

            {/* Quick meta strip */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#e2ede8] pb-4 mb-6 border-b border-[rgba(247,206,215,0.15)]">
              <div className="flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-[#97D700]" />
                <span className="font-mono font-bold text-white">{vacancy.salaryRange}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#F7CED7]" />
                <span>{vacancy.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-[#97D700]" />
                <span>{vacancy.formatLabel}</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-5 text-sm text-[#e2ede8]/90 max-h-[360px] overflow-y-auto pr-2 mb-6">
              <div>
                <h4 className="text-xs font-mono font-bold text-[#F7CED7] uppercase tracking-wider mb-2">
                  О позиции:
                </h4>
                <p className="leading-relaxed">{vacancy.description}</p>
              </div>

              {vacancy.responsibilities && (
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#F7CED7] uppercase tracking-wider mb-2">
                    Задачи:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-[#e2ede8]">
                    {vacancy.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              {vacancy.requirements && (
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#F7CED7] uppercase tracking-wider mb-2">
                    Требования:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-[#e2ede8]">
                    {vacancy.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Application form */}
            <form onSubmit={handleSubmit} className="p-4 sm:p-5 rounded-xl bg-[#091811] border border-[#154734] space-y-3">
              <h4 className="text-xs font-mono font-bold text-[#97D700] uppercase tracking-wider">
                Быстрый отклик на эту позицию:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Telegram (@username)*"
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-lg bg-[#0c241a] text-white border border-[#154734] focus:border-[#97D700] focus:outline-none text-base sm:text-sm placeholder:text-[#95b3a6]/50"
                />
                <input
                  type="text"
                  placeholder="Ваше имя / позывной"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-lg bg-[#0c241a] text-white border border-[#154734] focus:border-[#97D700] focus:outline-none text-base sm:text-sm placeholder:text-[#95b3a6]/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Текущий опыт / сорсы / гео"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-lg bg-[#0c241a] text-white border border-[#154734] focus:border-[#97D700] focus:outline-none text-base sm:text-sm placeholder:text-[#95b3a6]/50"
                />
                <input
                  type="text"
                  placeholder="Ссылка на резюме / статы (если есть)"
                  value={portfolioLink}
                  onChange={(e) => setPortfolioLink(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-lg bg-[#0c241a] text-white border border-[#154734] focus:border-[#97D700] focus:outline-none text-base sm:text-sm placeholder:text-[#95b3a6]/50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-[#97D700] hover:bg-[#85be00] text-[#0c241a] font-black text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
              >
                <Send className="w-4 h-4" />
                <span>Откликнуться на вакансию</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
