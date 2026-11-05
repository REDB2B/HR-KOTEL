/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, MapPin, DollarSign, Briefcase, Send, CheckCircle2 } from 'lucide-react';
import { Vacancy } from '../types';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!telegram.trim()) return;

    setSubmitted(true);
    setTimeout(() => {
      onApplySuccess();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#0c241a] border border-[rgba(247,206,215,0.25)] rounded-2xl p-6 sm:p-8 shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#e2ede8] hover:text-[#97D700] rounded-lg transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center">
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

            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-3">
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

              <div>
                <h4 className="text-xs font-mono font-bold text-[#97D700] uppercase tracking-wider mb-2">
                  Обязанности:
                </h4>
                <ul className="space-y-1.5">
                  {vacancy.responsibilities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#97D700] mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold text-[#F7CED7] uppercase tracking-wider mb-2">
                  Требования:
                </h4>
                <ul className="space-y-1.5">
                  {vacancy.requirements.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#F7CED7] mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold text-[#97D700] uppercase tracking-wider mb-2">
                  Условия и бенефиты:
                </h4>
                <ul className="space-y-1.5">
                  {vacancy.conditions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#97D700] mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Fast Apply Form */}
            <form onSubmit={handleSubmit} className="p-4 rounded-xl bg-[#103325] border border-[rgba(247,206,215,0.18)] space-y-3">
              <div className="text-xs font-bold text-white flex items-center justify-between">
                <span>Быстрый конфиденциальный отклик:</span>
                <span className="text-[10px] font-mono text-[#F7CED7]">СТРОГИЙ NDA</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Ваш Telegram (@username)*"
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  className="px-3.5 py-2 text-xs rounded-lg bg-[#091c14] text-white border border-[rgba(247,206,215,0.2)] focus:border-[#97D700] focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Имя / Никнейм"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-3.5 py-2 text-xs rounded-lg bg-[#091c14] text-white border border-[rgba(247,206,215,0.2)] focus:border-[#97D700] focus:outline-none"
                />
              </div>

              <input
                type="text"
                placeholder="Ссылка на статы / кейсы / LinkedIn / CV (Google Drive, Notion...)"
                value={portfolioLink}
                onChange={(e) => setPortfolioLink(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-lg bg-[#091c14] text-white border border-[rgba(247,206,215,0.2)] focus:border-[#97D700] focus:outline-none"
              />

              <div className="flex items-center justify-between pt-1">
                <a
                  href={`https://t.me/hrkotel?text=${encodeURIComponent(`Здравствуйте! Хочу откликнуться на вакансию: ${vacancy.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#F7CED7] hover:underline flex items-center gap-1"
                >
                  <Send className="w-3 h-3 text-[#97D700]" />
                  <span>Или откликнуться сразу в TG</span>
                </a>

                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-[#0c241a] bg-[#97D700] hover:bg-[#85be00] rounded-lg transition-colors cursor-pointer"
                >
                  Отправить отклик
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
