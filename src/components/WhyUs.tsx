/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Laptop, Clock, FileCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface WhyUsProps {
  onOpenLeadModal: (type: 'employer' | 'candidate') => void;
}

export const WhyUs: React.FC<WhyUsProps> = ({ onOpenLeadModal }) => {
  return (
    <section id="why-us" className="py-20 md:py-28 bg-white border-b border-[#154734]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono font-bold text-[#154734] uppercase tracking-wider mb-2 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#97D700]" />
            <span>СТАНДАРТЫ НАДЕЖНОСТИ И БЕЗОПАСНОСТИ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#154734] tracking-tight [text-wrap:balance]">
            Почему овнеры команд и HR-директора доверяют найм KOTEL HR
          </h2>
          <p className="text-sm text-[#527163] mt-3 font-medium leading-relaxed">
            Мы глубоко понимаем внутреннюю кухню арбитража трафика. Вы не тратите время на собеседования со случайными людьми.
          </p>
        </div>

        {/* 4 Core Pillars Grid with Pantone 706 C and 3435 C */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          <div className="p-8 rounded-2xl bg-[#F8FAF9] border border-[#154734]/12 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#F7CED7] text-[#154734] flex items-center justify-center font-bold mb-5">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#154734] mb-3">
                1. Технический скрининг практиками арбитража
              </h3>
              <p className="text-sm text-[#243E33] leading-relaxed mb-4">
                Наши рекрутеры сами работали в медиабаинге. Мы просим кандидата включить демонстрацию экрана, зайти в Keitaro/Binom и рекламный кабинет. Проверяем соответствие дат, холдов, сорсов и фактического ROI. 
              </p>
            </div>
            <div className="pt-4 border-t border-[#154734]/10 flex items-center gap-2 text-xs font-bold text-[#154734] font-mono">
              <CheckCircle2 className="w-4 h-4 text-[#97D700]" />
              <span>Отсекаем 92% кандидатов с нарисованными кейсами</span>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#F8FAF9] border border-[#154734]/12 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#F7CED7] text-[#154734] flex items-center justify-center font-bold mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#154734] mb-3">
                2. Гарантия бесплатной замены до 90 дней
              </h3>
              <p className="text-sm text-[#243E33] leading-relaxed mb-4">
                Мы берем финансовую ответственность за качество найма. Если специалист не справляется с задачами или уходит в течение гарантийного периода (до 3 месяцев) — мы оперативно находим замену без дополнительных оплат.
              </p>
            </div>
            <div className="pt-4 border-t border-[#154734]/10 flex items-center gap-2 text-xs font-bold text-[#154734] font-mono">
              <CheckCircle2 className="w-4 h-4 text-[#97D700]" />
              <span>Условия замены зафиксированы в официальном договоре</span>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#F8FAF9] border border-[#154734]/12 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#F7CED7] text-[#154734] flex items-center justify-center font-bold mb-5">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#154734] mb-3">
                3. Строгий NDA и защита ваших связок
              </h3>
              <p className="text-sm text-[#243E33] leading-relaxed mb-4">
                В арбитраже конфиденциальность — главный актив. Ваши источники трафика, используемые офферы, технические сетапы и бюджеты никогда не станут достоянием рынка. Мы подписываем жесткий двусторонний NDA до начала работы.
              </p>
            </div>
            <div className="pt-4 border-t border-[#154734]/10 flex items-center gap-2 text-xs font-bold text-[#154734] font-mono">
              <CheckCircle2 className="w-4 h-4 text-[#97D700]" />
              <span>100% защита репутации и бизнес-тайн</span>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#F8FAF9] border border-[#154734]/12 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#F7CED7] text-[#154734] flex items-center justify-center font-bold mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#154734] mb-3">
                4. Модель Success Fee: оплата только за результат
              </h3>
              <p className="text-sm text-[#243E33] leading-relaxed mb-4">
                Вы не рискуете бюджетом. Никаких авансов за «доступ к резюме» или часов работы рекрутера. Оплата производится исключительно по факту успешного выхода согласованного кандидата в вашу команду.
              </p>
            </div>
            <div className="pt-4 border-t border-[#154734]/10 flex items-center gap-2 text-xs font-bold text-[#154734] font-mono">
              <CheckCircle2 className="w-4 h-4 text-[#97D700]" />
              <span>Прозрачная фиксированная или процентная ставка</span>
            </div>
          </div>

        </div>

        {/* Big Banner CTA in Pantone 3435 C & 706 C */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#154734] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-xs font-mono font-bold text-[#F7CED7] uppercase tracking-wider block mb-1">
              БЕСПЛАТНЫЙ ПЕРВИЧНЫЙ СКРИНИНГ
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
              Нужно закрыть позицию или собрать команду?
            </h3>
            <p className="text-xs sm:text-sm text-[#e2ede8]">
              Заполните бриф за 2 минуты — покажем 2–3 проверенных кандидата с подтвержденными статами уже через 48 часов.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenLeadModal('employer')}
              className="px-6 py-3.5 text-xs sm:text-sm font-extrabold text-[#154734] bg-[#F7CED7] hover:bg-[#f3b5c3] rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>Оставить заявку на подбор</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
