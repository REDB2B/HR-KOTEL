/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Target, Code2, TrendingUp, ShieldCheck, Users, Sparkles, ArrowRight, Check } from 'lucide-react';

interface DirectionsProps {
  onOpenInstantModal: (directionName?: string) => void;
}

export const Directions: React.FC<DirectionsProps> = ({ onOpenInstantModal }) => {
  return (
    <section id="directions" className="py-20 md:py-28 bg-[#0D0A17] border-b border-[#8B5CF6]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner about verticals */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#1A142E] border border-[#8B5CF6]/30 mb-14 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl transition-all duration-300 hover:border-[#8B5CF6]/50">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#97D700] uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ОПЫТ В ЛЮБОЙ ВЕРТИКАЛИ</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Работаем с любыми вертикалями — включая самые тяжелые и нестандартные
            </h3>
            <p className="text-xs sm:text-sm text-[#E5E0F5]/85 mt-1.5 leading-relaxed">
              У каждой команды свои связки и специфика: iGaming, Gambling, Betting, Nutra, Crypto, FinTech, E-com, подписки, серые и белые темы со сложной модерацией. У нас есть база специалистов под любые требования.
            </p>
          </div>
          <button
            onClick={() => onOpenInstantModal('Любая сложная вертикаль')}
            className="px-6 py-3 text-xs font-black text-[#0B0813] bg-[#97D700] hover:bg-[#85be00] rounded-xl transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0 shadow-lg shadow-[#97D700]/20 cursor-pointer"
          >
            Сварить команду под мою вертикаль
          </button>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-mono font-bold text-[#F7CED7] uppercase tracking-wider mb-2">
              НАПРАВЛЕНИЯ ПОДБОРА
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              Поможем с любым направлением в арбитраже и digital
            </h2>
          </div>
          <p className="text-sm text-[#A39AB8] max-w-md font-normal leading-relaxed">
            Вам не нужно искать разных рекрутеров под сорсы, код или менеджмент. KOTEL HR закрывает потребности команды комплексно.
          </p>
        </div>

        {/* Directions 6-Card Grid in exact user-requested order */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Media Buying & Залив трафика */}
          <div className="p-7 rounded-2xl bg-[#141022] border border-[#8B5CF6]/25 hover:border-[#97D700]/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl shadow-lg flex flex-col justify-between group">
            <div>
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#1A142E] border border-[#8B5CF6]/30 text-[#97D700] flex items-center justify-center font-bold transition-transform duration-300 group-hover:scale-105">
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono font-bold text-[#97D700] bg-[#1A142E] px-2.5 py-1 rounded border border-[#97D700]/30">
                  5–9 дней
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-[#97D700] transition-colors duration-200">
                Media Buying &amp; Залив трафика
              </h3>

              <div className="text-xs font-semibold text-[#F7CED7] mb-3">
                Соло-байеры, тимлиды и сквады под любые источники
              </div>

              <p className="text-xs text-[#E5E0F5]/85 leading-relaxed mb-6 font-normal">
                Подбираем специалистов под FB, Google Ads (Search/UAC), TikTok, In-App, ASO, SEO и PPC. Проверяем реальные выгрузки из Keitaro/Binom, опыт со спендами и соответствие вашим гео.
              </p>

              <div className="space-y-1.5 pt-4 border-t border-white/10 mb-6">
                <div className="text-[11px] font-mono font-bold text-[#A39AB8] uppercase tracking-wider mb-2">
                  Кого закрываем:
                </div>
                {['Senior FB / TikTok Buyer', 'Google Ads & Search Lead', 'ASO / In-App Specialist', 'Team Lead Media Buying Squad', 'Head of Media Buying'].map((role, rIdx) => (
                  <div key={rIdx} className="flex items-center gap-2 text-xs text-[#E5E0F5]">
                    <Check className="w-3.5 h-3.5 text-[#97D700] shrink-0" />
                    <span>{role}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onOpenInstantModal('Media Buying & Залив трафика')}
              className="w-full py-3 px-4 rounded-xl bg-[#1A142E] hover:bg-[#231A3F] border border-[#8B5CF6]/40 text-xs font-bold text-[#F7CED7] hover:text-white transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
            >
              <span>Подобрать в это направление</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#97D700] group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          {/* Card 2: Сборка готовых сквадов & Фарминг (ПОСЛЕ Media Buying) */}
          <div className="p-7 rounded-2xl bg-[#141022] border border-[#8B5CF6]/25 hover:border-[#97D700]/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl shadow-lg flex flex-col justify-between group">
            <div>
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#1A142E] border border-[#8B5CF6]/30 text-[#97D700] flex items-center justify-center font-bold transition-transform duration-300 group-hover:scale-105">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono font-bold text-[#97D700] bg-[#1A142E] px-2.5 py-1 rounded border border-[#97D700]/30">
                  14–21 день
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-[#97D700] transition-colors duration-200">
                Сборка готовых сквадов &amp; Фарминг
              </h3>

              <div className="text-xs font-semibold text-[#F7CED7] mb-3">
                Формирование полноценных отделов с нуля под ключ
              </div>

              <p className="text-xs text-[#E5E0F5]/85 leading-relaxed mb-6 font-normal">
                Когда нужно быстро зайти в новую вертикаль или масштабировать связку: формируем слаженную команду с тимлидом, байерами, фарм-отделом и саппортом.
              </p>

              <div className="space-y-1.5 pt-4 border-t border-white/10 mb-6">
                <div className="text-[11px] font-mono font-bold text-[#A39AB8] uppercase tracking-wider mb-2">
                  Кого закрываем:
                </div>
                {['Готовый байерский сквад (Тимлид + 3-6 байеров)', 'Тимлид фарминга аккаунтов', 'Технический саппорт и заливщики', 'Креативный моушн-отдел'].map((role, rIdx) => (
                  <div key={rIdx} className="flex items-center gap-2 text-xs text-[#E5E0F5]">
                    <Check className="w-3.5 h-3.5 text-[#97D700] shrink-0" />
                    <span>{role}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onOpenInstantModal('Сборка готовых сквадов & Фарминг')}
              className="w-full py-3 px-4 rounded-xl bg-[#1A142E] hover:bg-[#231A3F] border border-[#8B5CF6]/40 text-xs font-bold text-[#F7CED7] hover:text-white transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
            >
              <span>Подобрать в это направление</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#97D700] group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          {/* Card 3: Технический Dev под арбитраж */}
          <div className="p-7 rounded-2xl bg-[#141022] border border-[#8B5CF6]/25 hover:border-[#97D700]/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl shadow-lg flex flex-col justify-between group">
            <div>
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#1A142E] border border-[#8B5CF6]/30 text-[#97D700] flex items-center justify-center font-bold transition-transform duration-300 group-hover:scale-105">
                  <Code2 className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono font-bold text-[#97D700] bg-[#1A142E] px-2.5 py-1 rounded border border-[#97D700]/30">
                  7–14 дней
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-[#97D700] transition-colors duration-200">
                Технический Dev под арбитраж
              </h3>

              <div className="text-xs font-semibold text-[#F7CED7] mb-3">
                Инженеры со знанием специфики модерации сторов и клоакинга
              </div>

              <p className="text-xs text-[#E5E0F5]/85 leading-relaxed mb-6 font-normal">
                Разработчики мобильных прил под арбитраж (Webview, PWA), обход банов Apple и Google, Unity-слоты/мини-игры, интеграция платежных решений и крипто-шлюзов.
              </p>

              <div className="space-y-1.5 pt-4 border-t border-white/10 mb-6">
                <div className="text-[11px] font-mono font-bold text-[#A39AB8] uppercase tracking-wider mb-2">
                  Кого закрываем:
                </div>
                {['iOS / Android Webview Dev', 'Инженер клоакинга & PWA', 'Unity Slots / Crash Dev', 'Full-Stack (Node / React / Crypto)', 'DevOps инфраструктуры'].map((role, rIdx) => (
                  <div key={rIdx} className="flex items-center gap-2 text-xs text-[#E5E0F5]">
                    <Check className="w-3.5 h-3.5 text-[#97D700] shrink-0" />
                    <span>{role}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onOpenInstantModal('Технический Dev под арбитраж')}
              className="w-full py-3 px-4 rounded-xl bg-[#1A142E] hover:bg-[#231A3F] border border-[#8B5CF6]/40 text-xs font-bold text-[#F7CED7] hover:text-white transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
            >
              <span>Подобрать в это направление</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#97D700] group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          {/* Card 4: Affiliate & Business Development */}
          <div className="p-7 rounded-2xl bg-[#141022] border border-[#8B5CF6]/25 hover:border-[#97D700]/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl shadow-lg flex flex-col justify-between group">
            <div>
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#1A142E] border border-[#8B5CF6]/30 text-[#97D700] flex items-center justify-center font-bold transition-transform duration-300 group-hover:scale-105">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono font-bold text-[#97D700] bg-[#1A142E] px-2.5 py-1 rounded border border-[#97D700]/30">
                  5–8 дней
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-[#97D700] transition-colors duration-200">
                Affiliate &amp; Business Development
              </h3>

              <div className="text-xs font-semibold text-[#F7CED7] mb-3">
                Менеджеры с теплой базой вебмастеров и рекламодателей
              </div>

              <p className="text-xs text-[#E5E0F5]/85 leading-relaxed mb-6 font-normal">
                Люди, умеющие привлекать качественный трафик, выбивать эксклюзивные ставки у прямых рекламодателей и выстраивать VIP-ретеншн игроков.
              </p>

              <div className="space-y-1.5 pt-4 border-t border-white/10 mb-6">
                <div className="text-[11px] font-mono font-bold text-[#A39AB8] uppercase tracking-wider mb-2">
                  Кого закрываем:
                </div>
                {['Senior Affiliate Manager', 'Head of Affiliate Department', 'Business Development Manager', 'VIP Retention Lead', 'Account & Traffic Manager'].map((role, rIdx) => (
                  <div key={rIdx} className="flex items-center gap-2 text-xs text-[#E5E0F5]">
                    <Check className="w-3.5 h-3.5 text-[#97D700] shrink-0" />
                    <span>{role}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onOpenInstantModal('Affiliate & Business Development')}
              className="w-full py-3 px-4 rounded-xl bg-[#1A142E] hover:bg-[#231A3F] border border-[#8B5CF6]/40 text-xs font-bold text-[#F7CED7] hover:text-white transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
            >
              <span>Подобрать в это направление</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#97D700] group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          {/* Card 5: Тяжелые и серые вертикали? (ПОСЛЕ Affiliate & Business Development) */}
          <div className="p-7 rounded-2xl bg-gradient-to-br from-[#1F143B] via-[#1A1033] to-[#120D24] border-2 border-[#8B5CF6]/50 hover:border-[#97D700] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl shadow-xl flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#97D700]/10 blur-3xl pointer-events-none rounded-full" />
            
            <div>
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#97D700] text-[#0B0813] flex items-center justify-center font-black shadow-lg shadow-[#97D700]/25 transition-transform duration-300 group-hover:scale-105">
                  <Sparkles className="w-6 h-6 text-[#0B0813]" />
                </div>
                <span className="text-[11px] font-mono font-bold text-[#0B0813] bg-[#97D700] px-2.5 py-1 rounded shadow-sm">
                  Индивидуально
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-[#97D700] transition-colors duration-200">
                Тяжелые и серые вертикали?
              </h3>

              <div className="text-xs font-semibold text-[#97D700] mb-3">
                Индивидуальный поиск под жесткие требования
              </div>

              <p className="text-xs text-[#E5E0F5] leading-relaxed mb-6 font-normal">
                Хедхантинг байеров с редкими сорсами, поиск команд под сложные схемы залива или закрытые продукты. Знаем, как найти тех, кого нет на HeadHunter и в открытых чатах.
              </p>

              <div className="p-3.5 rounded-xl bg-[#0B0813]/85 border border-[#8B5CF6]/30 text-xs text-[#F7CED7] mb-6 font-mono space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#97D700]" />
                  <span>Проверка опыта работы с банами</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#97D700]" />
                  <span>Кандидаты только с живыми пруфами</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#97D700]" />
                  <span>Гарантия бесплатной замены до 90 дней</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenInstantModal('Тяжелая / нестандартная вертикаль')}
              className="w-full py-3.5 px-4 rounded-xl bg-[#97D700] hover:bg-[#85be00] text-[#0B0813] font-black text-xs transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#97D700]/25"
            >
              <span>Обсудить задачу лично</span>
              <ArrowRight className="w-4 h-4 text-[#0B0813] group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          {/* Card 6: Executive Search & C-Level */}
          <div className="p-7 rounded-2xl bg-[#141022] border border-[#8B5CF6]/25 hover:border-[#97D700]/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl shadow-lg flex flex-col justify-between group">
            <div>
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#1A142E] border border-[#8B5CF6]/30 text-[#97D700] flex items-center justify-center font-bold transition-transform duration-300 group-hover:scale-105">
                  <ShieldCheck className="w-6 h-6 text-[#F7CED7]" />
                </div>
                <span className="text-[11px] font-mono font-bold text-[#F7CED7] bg-[#1A142E] px-2.5 py-1 rounded border border-[#8B5CF6]/30">
                  10–16 дней
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-[#97D700] transition-colors duration-200">
                Executive Search &amp; C-Level
              </h3>

              <div className="text-xs font-semibold text-[#F7CED7] mb-3">
                Топ-менеджмент для холдингов, продуктов и CPA-сетей
              </div>

              <p className="text-xs text-[#E5E0F5]/85 leading-relaxed mb-6 font-normal">
                Точечный подбор лидеров рынка. Оцениваем управленческий трек-рекорд, финансовую эффективность и соответствие культуре компании.
              </p>

              <div className="space-y-1.5 pt-4 border-t border-white/10 mb-6">
                <div className="text-[11px] font-mono font-bold text-[#A39AB8] uppercase tracking-wider mb-2">
                  Кого закрываем:
                </div>
                {['Chief Marketing Officer (CMO)', 'Chief Operating Officer (COO)', 'Chief Business Development Officer', 'Head of Product', 'Head of Talent'].map((role, rIdx) => (
                  <div key={rIdx} className="flex items-center gap-2 text-xs text-[#E5E0F5]">
                    <Check className="w-3.5 h-3.5 text-[#97D700] shrink-0" />
                    <span>{role}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onOpenInstantModal('Executive Search & C-Level')}
              className="w-full py-3 px-4 rounded-xl bg-[#1A142E] hover:bg-[#231A3F] border border-[#8B5CF6]/40 text-xs font-bold text-[#F7CED7] hover:text-white transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
            >
              <span>Подобрать в это направление</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#97D700] group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
