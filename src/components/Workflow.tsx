/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

interface WorkflowProps {
  onOpenInstantModal: () => void;
}

export const Workflow: React.FC<WorkflowProps> = ({ onOpenInstantModal }) => {
  const steps = [
    {
      num: '01',
      title: 'Моментальная заявка за 1 минуту',
      time: '15 минут',
      desc: 'Вы оставляете Telegram и Email, фиксируем требования к специалисту, стек, вертикали и формат работы (удаленно/офис).',
    },
    {
      num: '02',
      title: 'Скрининг и проверка статов',
      time: '48–72 часа',
      desc: 'Подключаем базу из 12 000+ специалистов. Проверяем выгрузки трекеров (Keitaro, Binom), реальные спенды и отсекаем пустые резюме.',
    },
    {
      num: '03',
      title: 'Шорт-лист целевых кандидатов',
      time: '3–5 дней',
      desc: 'Вы получаете 3–5 кандидатов, готовых к вашим условиям. Координируем интервью и помогаем составить конкурентный оффер.',
    },
    {
      num: '04',
      title: 'Выход на работу и гарантия 90 дней',
      time: 'Success Fee',
      desc: 'Кандидат выходит в команду. Оплата только по факту выхода. В случае сложностей — бесплатная замена по договору.',
    },
  ];

  return (
    <section id="workflow" className="py-20 md:py-28 bg-[#0B0813] border-b border-[#8B5CF6]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#F7CED7] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#97D700]" />
            <span>РЕГЛАМЕНТ РАБОТЫ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            Как устроен найм в KOTEL HR от заявки до выхода
          </h2>
          <p className="text-sm text-[#A39AB8] mt-3 font-normal leading-relaxed max-w-xl mx-auto">
            Без потери времени и бесконечных согласований. Мы ценим скорость арбитражных связок.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((st, idx) => (
            <div
              key={st.num}
              className="p-7 rounded-2xl bg-[#141022] border border-[#8B5CF6]/25 shadow-lg flex flex-col justify-between"
            >
              <div>
                
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl font-black font-mono text-[#97D700]">
                    {st.num}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#F7CED7] bg-[#1A142E] px-2.5 py-1 rounded border border-[#8B5CF6]/30">
                    {st.time}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {st.title}
                </h3>

                <p className="text-xs text-[#E5E0F5]/85 leading-relaxed font-normal">
                  {st.desc}
                </p>

              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-semibold text-[#A39AB8]">
                <span>Шаг {idx + 1} из 4</span>
                <CheckCircle2 className="w-4 h-4 text-[#97D700]" />
              </div>

            </div>
          ))}
        </div>

        {/* Banner CTA */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#1A142E] via-[#1F1738] to-[#141022] border border-[#8B5CF6]/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              Готовы запустить поиск под вашу команду?
            </h3>
            <p className="text-xs sm:text-sm text-[#E5E0F5]">
              Оставьте Telegram и Email — покажем 2–3 проверенных профиля уже через 48 часов.
            </p>
          </div>

          <button
            onClick={onOpenInstantModal}
            className="px-8 py-4 text-xs sm:text-sm font-black text-[#0B0813] bg-[#97D700] hover:bg-[#85be00] rounded-xl transition-all shadow-lg shadow-[#97D700]/25 whitespace-nowrap cursor-pointer flex items-center gap-2 hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4" />
            <span>Оставить моментальную заявку</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
