/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Target, Code2, TrendingUp, ShieldCheck, Users, ArrowRight, Check } from 'lucide-react';

interface SpecializationsProps {
  onOpenLeadModal: (type: 'employer' | 'candidate') => void;
  onSelectDirection: (directionName: string) => void;
}

export const Specializations: React.FC<SpecializationsProps> = ({ onOpenLeadModal, onSelectDirection }) => {
  const directions = [
    {
      id: 'media_buying',
      title: '01. Media Buying & Залив трафика',
      tagline: 'Соло-байеры, тимлиды и сквады под любые источники',
      description: 'Подбираем специалистов под FB, Google Ads (Search & UAC), TikTok, In-App, ASO, SEO и PPC. Проверяем реальные выгрузки из Keitaro/Binom, опыт работы с большими спендами и соответствие вашим гео.',
      roles: ['Senior FB / TikTok Media Buyer', 'Google Ads & UAC Lead', 'ASO / In-App Specialist', 'Team Lead Media Buying Squad', 'Head of Buying (C-Level)'],
      metrics: 'Первый шорт-лист: 48–72 часа',
      speed: '5–10 дней до оффера',
      icon: Target,
    },
    {
      id: 'development',
      title: '02. Техническая разработка под арбитраж',
      tagline: 'Инженеры, понимающие специфику модерации сторов и клоакинга',
      description: 'Разработчики мобильных прил под гемблинг и беттинг (Webview, PWA), обход банов Apple/Google, Unity-слоты, DevOps инфраструктуры и интеграция платежных решений.',
      roles: ['iOS / Android Webview Dev', 'Инженер клоакинга & PWA', 'Unity Slots / Mini-Games Dev', 'Full-Stack (Node / React / Crypto)', 'DevOps инфраструктуры'],
      metrics: 'Проверка реального GitHub и кейсов',
      speed: '7–14 дней до оффера',
      icon: Code2,
    },
    {
      id: 'affiliate_bd',
      title: '03. Affiliate & Business Development',
      tagline: 'Менеджеры с теплой базой вебмастеров и рекламодателей',
      description: 'Специалисты, умеющие привлекать качественный трафик, выбивать эксклюзивные ставки у прямых рекламодателей и выстраивать VIP-ретеншн игроков.',
      roles: ['Senior Affiliate Manager (iGaming)', 'Head of Affiliate Department', 'Business Development Manager', 'VIP Retention Lead', 'Account & Traffic Manager'],
      metrics: 'База 3 400+ проверенных аффов',
      speed: '5–9 дней до оффера',
      icon: TrendingUp,
    },
    {
      id: 'management',
      title: '04. Executive Search & C-Level',
      tagline: 'Топ-менеджмент для холдингов, продуктов и CPA-сетей',
      description: 'Конфиденциальный хедхантинг лидеров рынка. Оцениваем управленческий трек-рекорд, финансовую эффективность и соответствие культуре компании под строгим NDA.',
      roles: ['Chief Marketing Officer (CMO)', 'Chief Operating Officer (COO)', 'Chief Business Development Officer (CBDO)', 'Head of Product (iGaming / Sportsbook)', 'Head of HR'],
      metrics: '100% конфиденциальность по NDA',
      speed: '10–18 дней до оффера',
      icon: ShieldCheck,
    },
    {
      id: 'squads',
      title: '05. Сборка готовых сквадов & Фарминг',
      tagline: 'Формирование полноценных отделов с нуля под ключ',
      description: 'Когда нужно быстро зайти в новую вертикаль или масштабировать связку: формируем готовую команду с тимлидом, байерами, фарм-отделом и технической поддержкой.',
      roles: ['Готовый байерский сквад (Тимлид + 3-6 байеров)', 'Тимлид фарминга аккаунтов', 'Технический саппорт и заливщики', 'Креативный отдел / Моушн-дизайнеры'],
      metrics: 'Слаженная команда под ключ',
      speed: '14–21 день до запуска',
      icon: Users,
    },
  ];

  return (
    <section id="directions" className="py-20 md:py-28 bg-[#F8FAF9] border-b border-[#154734]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-3xl">
            <div className="text-xs font-mono font-bold text-[#154734] uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#97D700]" />
              <span>ЗАКРЫВАЕМ ЛЮБЫЕ ПОТРЕБНОСТИ В КАДРАХ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#154734] tracking-tight [text-wrap:balance]">
              Поможем с любым направлением в арбитраже трафика и iGaming
            </h2>
          </div>
          <p className="text-sm text-[#527163] max-w-md font-medium leading-relaxed">
            Вам не нужно искать разных рекрутеров под разные задачи. Мы закрываем весь спектр: от поиска редкого iOS-разработчика до сборки целого медиабаинг-отдела.
          </p>
        </div>

        {/* 5 Directions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {directions.map((dir, idx) => {
            const Icon = dir.icon;
            const isWide = idx === 0 || idx === 1;
            return (
              <div
                key={dir.id}
                className="p-7 rounded-2xl bg-white border border-[#154734]/12 hover:border-[#154734]/30 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  
                  {/* Card top */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#F7CED7] text-[#154734] flex items-center justify-center font-bold">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-[#154734] bg-[#F7CED7]/40 px-2.5 py-1 rounded">
                      {dir.speed}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#154734] mb-2 leading-snug">
                    {dir.title}
                  </h3>

                  <div className="text-xs font-semibold text-[#527163] mb-3">
                    {dir.tagline}
                  </div>

                  <p className="text-xs text-[#243E33] leading-relaxed mb-5 font-normal">
                    {dir.description}
                  </p>

                  {/* Roles list */}
                  <div className="space-y-1.5 pt-4 border-t border-[#154734]/10 mb-6">
                    <div className="text-[11px] font-mono font-bold text-[#527163] uppercase tracking-wider mb-2">
                      Кого закрываем:
                    </div>
                    {dir.roles.map((role, rIdx) => (
                      <div key={rIdx} className="flex items-center gap-2 text-xs text-[#243E33]">
                        <Check className="w-3.5 h-3.5 text-[#154734] shrink-0" />
                        <span className="font-medium">{role}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Card footer CTA */}
                <div className="pt-4 border-t border-[#154734]/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-[#154734]">
                    {dir.metrics}
                  </span>
                  <button
                    onClick={() => onSelectDirection(dir.title)}
                    className="text-xs font-bold text-[#154734] hover:text-[#97D700] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Заказать подбор</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}

          {/* 6th Card: Custom Request Banner in Pantone 3435 C */}
          <div className="p-7 rounded-2xl bg-[#154734] text-white flex flex-col justify-between shadow-md">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#F7CED7] text-[#154734] flex items-center justify-center font-bold mb-5">
                <Target className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                Нестандартная задача или редкий стек?
              </h3>

              <p className="text-xs text-[#e2ede8] leading-relaxed mb-6">
                Хедхантинг ключевого тимлида у конкурентов, поиск специалистов под специфические ГЕО (Азия, Латам, Tier-1) или индивидуальный аудит команды.
              </p>

              <div className="p-3.5 rounded-xl bg-[#0D2E21] border border-white/10 text-xs text-[#F7CED7] mb-6 font-mono">
                • Прямой выход на топ-лидеров рынка<br />
                • Индивидуальный договор и условия<br />
                • Полный NDA без публичной огласки
              </div>
            </div>

            <button
              onClick={() => onOpenLeadModal('employer')}
              className="w-full py-3 px-4 rounded-xl bg-[#F7CED7] hover:bg-[#f3b5c3] text-[#154734] font-extrabold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Обсудить индивидуальную задачу</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
