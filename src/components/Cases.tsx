/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CASE_STUDIES } from '../data/recruitingData';
import { Clock, ShieldCheck, ArrowRight, Sparkles, TrendingUp, Users } from 'lucide-react';

interface CasesProps {
  onOpenInstantModal: (caseTitle?: string) => void;
}

export const Cases: React.FC<CasesProps> = ({ onOpenInstantModal }) => {
  return (
    <section id="cases" className="py-20 md:py-28 bg-[#0D0A17] border-b border-[#8B5CF6]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#97D700] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ОЦИФРОВАННЫЙ ОПЫТ KOTEL HR</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              Фактические результаты закрытия позиций
            </h2>
          </div>
          <p className="text-sm text-[#A39AB8] max-w-md font-normal leading-relaxed">
            Показываем реальные кейсы: сроки от заявки до выхода, число кандидатов до первого оффера и бизнес-результаты заказчиков.
          </p>
        </div>

        {/* 3 Prominent Glowing Case Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Case 1: Media Buying Squad */}
          <div className="p-8 rounded-3xl bg-[#141022] border-2 border-[#97D700]/30 hover:border-[#97D700] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl shadow-xl flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#97D700]/10 blur-3xl pointer-events-none rounded-full" />
            
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs font-mono">
                <span className="text-[#F7CED7] font-bold">Media Buying Команда (Tier-1 FB)</span>
                <span className="px-2.5 py-0.5 rounded bg-[#97D700] text-[#0B0813] font-black">КЕЙС 01</span>
              </div>

              <div className="text-xs font-mono font-bold text-[#97D700] uppercase tracking-wider mb-1">
                СБОРКА СКВАДА ПОД КЛЮЧ
              </div>
              
              <h3 className="text-xl font-extrabold text-white mb-2 leading-snug">
                6 Senior FB-байеров + Тимлид с подтвержденным ROI 115%
              </h3>

              <p className="text-xs text-[#E5E0F5]/85 leading-relaxed mb-6 font-normal">
                Заказчику требовалось оперативно занять связку на гемблинг в Австралии до выгорания подхода. Мы проверили 28 кандидатов через Keitaro и собрали готовую сработанную команду за 14 дней.
              </p>

              {/* Big Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-[#0B0813] border border-[#8B5CF6]/30 mb-6">
                <div className="text-center">
                  <div className="text-base sm:text-lg font-black font-mono text-[#97D700]">14 дней</div>
                  <div className="text-[10px] text-[#A39AB8] mt-0.5">Срок сборки</div>
                </div>
                <div className="text-center border-x border-white/10">
                  <div className="text-base sm:text-lg font-black font-mono text-white">$85k/мес</div>
                  <div className="text-[10px] text-[#A39AB8] mt-0.5">Старт спенда</div>
                </div>
                <div className="text-center">
                  <div className="text-base sm:text-lg font-black font-mono text-[#F7CED7]">100%</div>
                  <div className="text-[10px] text-[#A39AB8] mt-0.5">Probation пройден</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenInstantModal('Сборка медиабаинг-сквада под ключ')}
              className="w-full py-3 px-4 rounded-xl bg-[#97D700] hover:bg-[#85be00] text-[#0B0813] font-extrabold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group-hover:scale-[1.01]"
            >
              <span>Собрать такой же сквад</span>
              <ArrowRight className="w-4 h-4 text-[#0B0813]" />
            </button>
          </div>

          {/* Case 2: C-Level CMO */}
          <div className="p-8 rounded-3xl bg-[#141022] border-2 border-[#8B5CF6]/30 hover:border-[#8B5CF6] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl shadow-xl flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B5CF6]/15 blur-3xl pointer-events-none rounded-full" />
            
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs font-mono">
                <span className="text-[#F7CED7] font-bold">iGaming холдинг (Европа &amp; LatAm)</span>
                <span className="px-2.5 py-0.5 rounded bg-[#8B5CF6] text-white font-black">КЕЙС 02</span>
              </div>

              <div className="text-xs font-mono font-bold text-[#8B5CF6] uppercase tracking-wider mb-1">
                EXECUTIVE SEARCH
              </div>
              
              <h3 className="text-xl font-extrabold text-white mb-2 leading-snug">
                Хедхантинг Chief Marketing Officer (CMO) в казино-продукт
              </h3>

              <p className="text-xs text-[#E5E0F5]/85 leading-relaxed mb-6 font-normal">
                Переманили топ-менеджера из топ-3 холдинга ниши. Кандидат перестроил систему привлечения игроков, синхронизировал байинг и снизил стоимость FTD на 28%.
              </p>

              {/* Big Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-[#0B0813] border border-[#8B5CF6]/30 mb-6">
                <div className="text-center">
                  <div className="text-base sm:text-lg font-black font-mono text-[#8B5CF6]">72 часа</div>
                  <div className="text-[10px] text-[#A39AB8] mt-0.5">Шорт-лист</div>
                </div>
                <div className="text-center border-x border-white/10">
                  <div className="text-base sm:text-lg font-black font-mono text-white">9 дней</div>
                  <div className="text-[10px] text-[#A39AB8] mt-0.5">До оффера</div>
                </div>
                <div className="text-center">
                  <div className="text-base sm:text-lg font-black font-mono text-[#97D700]">+34%</div>
                  <div className="text-[10px] text-[#A39AB8] mt-0.5">Рост депозитов</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenInstantModal('Хедхантинг C-Level / Топ-менеджмента')}
              className="w-full py-3 px-4 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-extrabold text-xs transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98] shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Подобрать C-Level лидера</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          {/* Case 3: Mobile Dev */}
          <div className="p-8 rounded-3xl bg-[#141022] border-2 border-[#F7CED7]/30 hover:border-[#F7CED7] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl shadow-xl flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F7CED7]/10 blur-3xl pointer-events-none rounded-full" />
            
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs font-mono">
                <span className="text-[#F7CED7] font-bold">CPA-Сеть (Multi-Vertical)</span>
                <span className="px-2.5 py-0.5 rounded bg-[#F7CED7] text-[#0B0813] font-black">КЕЙС 03</span>
              </div>

              <div className="text-xs font-mono font-bold text-[#F7CED7] uppercase tracking-wider mb-1">
                ТЕХНИЧЕСКИЙ РАЗДЕЛ DEV
              </div>
              
              <h3 className="text-xl font-extrabold text-white mb-2 leading-snug">
                3 Senior iOS разработчика под Webview и обход банов
              </h3>

              <p className="text-xs text-[#E5E0F5]/85 leading-relaxed mb-6 font-normal">
                Нашли редких инженеров со знанием недокументированных механизмов ревью Apple. Среднее время жизни приложений клиента в сторе выросло с 4 до 26 дней.
              </p>

              {/* Big Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-[#0B0813] border border-[#8B5CF6]/30 mb-6">
                <div className="text-center">
                  <div className="text-base sm:text-lg font-black font-mono text-[#F7CED7]">x6.5</div>
                  <div className="text-[10px] text-[#A39AB8] mt-0.5">Жизнь прил</div>
                </div>
                <div className="text-center border-x border-white/10">
                  <div className="text-base sm:text-lg font-black font-mono text-white">8 дней</div>
                  <div className="text-[10px] text-[#A39AB8] mt-0.5">Срок закрытия</div>
                </div>
                <div className="text-center">
                  <div className="text-base sm:text-lg font-black font-mono text-[#97D700]">3 оффера</div>
                  <div className="text-[10px] text-[#A39AB8] mt-0.5">Все закрыты</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenInstantModal('Подбор разработчиков под арбитраж')}
              className="w-full py-3 px-4 rounded-xl bg-[#F7CED7] hover:bg-[#f3b5c3] text-[#0B0813] font-extrabold text-xs transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98] shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Найти сильных разработчиков</span>
              <ArrowRight className="w-4 h-4 text-[#0B0813] group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
