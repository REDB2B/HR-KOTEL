/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Building2, UserCheck, Shield, Award, Users, DollarSign, Send } from 'lucide-react';

interface AudienceSwitchProps {
  onOpenLeadModal: (type: 'employer' | 'candidate') => void;
}

export const AudienceSwitch: React.FC<AudienceSwitchProps> = ({ onOpenLeadModal }) => {
  const [activeTab, setActiveTab] = useState<'employer' | 'candidate'>('employer');

  return (
    <section className="py-16 md:py-20 border-t border-[rgba(247,206,215,0.12)] bg-[#0c241a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title & unboxed subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs font-mono font-semibold text-[#97D700] uppercase tracking-wider mb-2">
            ДВА ФОКУСА KOTEL HR AGENCY
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            Решаем задачи работодателей и открываем скрытые офферы для талантов
          </h2>
        </div>

        {/* Interactive Segmented Switch (Clean buttons, NOT static pills) */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-xl bg-[#103325] border border-[rgba(247,206,215,0.2)]">
            <button
              onClick={() => setActiveTab('employer')}
              className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'employer'
                  ? 'bg-[#97D700] text-[#0c241a] shadow-md shadow-[#97D700]/20'
                  : 'text-[#e2ede8] hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Компаниям и Овнерам (B2B)</span>
            </button>
            <button
              onClick={() => setActiveTab('candidate')}
              className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'candidate'
                  ? 'bg-[#F7CED7] text-[#0c241a] shadow-md shadow-[#F7CED7]/20'
                  : 'text-[#e2ede8] hover:text-white'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Кандидатам и Командам</span>
            </button>
          </div>
        </div>

        {/* Tab Content 1: Employer */}
        {activeTab === 'employer' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-xl bg-[#154734] border border-[rgba(247,206,215,0.18)] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#103325] border border-[#97D700]/40 flex items-center justify-center text-[#97D700] mb-4">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Техническая верификация</h3>
                <p className="text-sm text-[#e2ede8]/85 leading-relaxed">
                  Проверяем реальный ROI и спенды кандидатов через лайв-шаринг трекеров (Keitaro, Binom) и рекомендации овнеров. Вы не тратите время на «теоретиков».
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[rgba(247,206,215,0.15)] text-xs text-[#97D700] font-mono">
                0% фейковых резюме
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#154734] border border-[rgba(247,206,215,0.18)] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#103325] border border-[#97D700]/40 flex items-center justify-center text-[#97D700] mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Сборка готовых сквадов</h3>
                <p className="text-sm text-[#e2ede8]/85 leading-relaxed">
                  Подбираем не просто одиночных специалистов, а слаженные отделы: Тимлид + 3-6 Senior-байеров + технический саппорт (прилы, клоака) под ваш гео-фокус.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[rgba(247,206,215,0.15)] text-xs text-[#97D700] font-mono">
                Готовый отдел за 14–21 день
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#154734] border border-[rgba(247,206,215,0.18)] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#103325] border border-[#F7CED7]/40 flex items-center justify-center text-[#F7CED7] mb-4">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Гарантия замены до 90 дней</h3>
                <p className="text-sm text-[#e2ede8]/85 leading-relaxed">
                  Если сотрудник не проходит испытательный срок или покидает команду — мы бесплатно и без лишних согласований находим равноценную замену по договору.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[rgba(247,206,215,0.15)] text-xs text-[#F7CED7] font-mono">
                100% юридическая защита
              </div>
            </div>

          </div>
        )}

        {/* Tab Content 2: Candidate */}
        {activeTab === 'candidate' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-xl bg-[#154734] border border-[rgba(247,206,215,0.18)] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#103325] border border-[#F7CED7]/40 flex items-center justify-center text-[#F7CED7] mb-4">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Полная анонимность</h3>
                <p className="text-sm text-[#e2ede8]/85 leading-relaxed">
                  Ваш текущий работодатель никогда не узнает о поиске. Ваше имя и контакты передаются клиенту только после вашего личного согласия на конкретный оффер.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[rgba(247,206,215,0.15)] text-xs text-[#F7CED7] font-mono">
                Строгий персональный NDA
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#154734] border border-[rgba(247,206,215,0.18)] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#103325] border border-[#97D700]/40 flex items-center justify-center text-[#97D700] mb-4">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Топовые условия рынка</h3>
                <p className="text-sm text-[#e2ede8]/85 leading-relaxed">
                  Мы работаем напрямую с фаундерами и C-level: анлим бюджеты на тесты, инфраструктура, агентские аккаунты, релокация (Кипр/Дубай) и высокий % от net profit.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[rgba(247,206,215,0.15)] text-xs text-[#97D700] font-mono">
                Вилки от $3k до $15k+ в USDT
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#154734] border border-[rgba(247,206,215,0.18)] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#103325] border border-[#97D700]/40 flex items-center justify-center text-[#97D700] mb-4">
                  <Send className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Карьерное менторство</h3>
                <p className="text-sm text-[#e2ede8]/85 leading-relaxed">
                  Помогаем правильно упаковать статы, готовим к техническому собеседованию и отстаиваем ваши финансовые ожидания на финале переговоров.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[rgba(247,206,215,0.15)] text-xs text-[#97D700] font-mono">
                Сопровождение до первого бонуса
              </div>
            </div>

          </div>
        )}

        {/* Bottom CTA bar */}
        <div className="mt-10 p-6 rounded-xl bg-[#103325] border border-[rgba(247,206,215,0.2)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="text-sm font-bold text-white">
              {activeTab === 'employer' 
                ? 'Ищете редкого специалиста или хотите усилить команду?'
                : 'Хотите узнать о закрытых вакансиях под ваш опыт?'
              }
            </div>
            <div className="text-xs text-[#95b3a6]">
              {activeTab === 'employer'
                ? 'Оставьте бриф, и мы пришлем 2-3 кандидата из базы в течение 48 часов'
                : 'Отправьте ваш профиль / контакты в Telegram для приватной консультации'
              }
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenLeadModal(activeTab)}
              className="px-5 py-2.5 text-xs font-bold text-[#0c241a] bg-[#97D700] hover:bg-[#85be00] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {activeTab === 'employer' ? 'Оставить заявку на подбор' : 'Отправить резюме конфиденциально'}
            </button>
            <a
              href="https://t.me/hrkotel"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-xs font-semibold text-[#F7CED7] bg-[#154734] border border-[#F7CED7]/30 hover:border-[#F7CED7] rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <Send className="w-3.5 h-3.5 text-[#97D700]" />
              <span>@hrkotel</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
