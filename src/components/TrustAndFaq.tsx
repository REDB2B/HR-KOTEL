/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles, ShieldCheck } from 'lucide-react';

interface TrustAndFaqProps {
  onOpenInstantModal: (direction?: string, title?: string) => void;
}

export const TrustAndFaq: React.FC<TrustAndFaqProps> = ({ onOpenInstantModal }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const faqs = [
    {
      question: 'Как именно вы проверяете байеров и команды на фейковые статы?',
      answer: 'Мы проводим технический скрининг силами рекрутеров с бэкграундом в арбитраже: просим включить демонстрацию экрана с заходом в трекер (Keitaro, Binom) и рекламные кабинеты, сопоставляем даты заливов, домены, связки и фактический ROI. Фейковые скриншоты отсекаются еще до попадания к вам.',
    },
    {
      question: 'Сколько времени занимает предоставление первых кандидатов?',
      answer: 'Первых 2–4 проверенных кандидатов из нашей закрытой базы мы показываем уже через 48–72 часа после получения вашей заявки. В среднем позиция закрывается за 7–12 рабочих дней.',
    },
    {
      question: 'Работаете ли вы с тяжелыми и нестандартными вертикалями?',
      answer: 'Да. Мы закрываем как классические вертикали (iGaming, Gambling, Betting, Nutra, Crypto, FinTech, E-com), так и тяжелые серые направления со сложной модерацией, обходом банов, специфическими клоаками и нестандартными ГЕО (Tier-1, Латам, Азия).',
    },
    {
      question: 'Что происходит, если специалист не подошел в период испытательного срока?',
      answer: 'Мы предоставляем официальную гарантию бесплатной замены до 90 дней (в зависимости от роли). Если сотрудник не справляется с задачами или уходит, мы оперативно находим равноценную замену без дополнительных оплат.',
    },
    {
      question: 'Какова схема оплаты и нужно ли платить вперед?',
      answer: 'Мы работаем по модели Success Fee — вы не платите никаких авансов. Оплата наших услуг происходит исключительно по факту успешного выхода проверенного кандидата на работу в вашу команду.',
    },
    {
      question: 'Кому передаются мои данные и контакты из заявки?',
      answer: 'Ваша заявка поступает строго и исключительно руководству KOTEL HR. Мы гарантируем 100% конфиденциальность: ваши контакты и параметры поиска никогда не передаются третьим лицам.',
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#0D0A17] border-b border-[#8B5CF6]/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#F7CED7] uppercase mb-2">
            <HelpCircle className="w-4 h-4 text-[#97D700]" />
            <span>ОТВЕТЫ НА ВОПРОСЫ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            Часто задаваемые вопросы о найме в KOTEL HR
          </h2>
          <p className="text-sm text-[#A39AB8] mt-3 font-normal leading-relaxed max-w-lg mx-auto">
            Прозрачные правила сотрудничества, верификации кандидатов и конфиденциальности.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4 mb-12">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#141022] border border-[#8B5CF6]/25 overflow-hidden transition-all shadow-md"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold text-white hover:text-[#97D700] transition-colors leading-snug">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-[#1A142E] text-[#F7CED7] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-[#97D700]' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-[#E5E0F5]/85 leading-relaxed border-t border-white/10 pt-4 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Instant Form Prompt */}
        <div className="p-7 rounded-2xl bg-[#141022] border border-[#8B5CF6]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="text-base font-bold text-white">Остались вопросы по подбору?</div>
            <div className="text-xs text-[#A39AB8]">Оставьте ваш контакт — свяжемся и ответим на все вопросы за 15–30 минут</div>
          </div>
          <button
            onClick={() => onOpenInstantModal(undefined, 'Задать вопрос')}
            className="px-6 py-3 text-xs font-black text-[#0B0813] bg-[#97D700] hover:bg-[#85be00] rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4" />
            <span>Задать вопрос</span>
          </button>
        </div>

      </div>
    </section>
  );
};
