/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, MapPin, DollarSign, ArrowUpRight, Flame, Send } from 'lucide-react';
import { VACANCIES } from '../data/recruitingData';
import { Vacancy, RoleCategory } from '../types';
import { VacancyModal } from './VacancyModal';

interface VacanciesProps {
  onOpenCandidateModal: () => void;
}

export const Vacancies: React.FC<VacanciesProps> = ({ onOpenCandidateModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<RoleCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVacancy, setActiveVacancy] = useState<Vacancy | null>(null);
  const [successToast, setSuccessToast] = useState(false);

  const filteredVacancies = useMemo(() => {
    return VACANCIES.filter((vac) => {
      const matchCategory = selectedCategory === 'all' || vac.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        vac.title.toLowerCase().includes(query) ||
        vac.description.toLowerCase().includes(query) ||
        (vac.trafficSources && vac.trafficSources.some((s) => s.toLowerCase().includes(query))) ||
        (vac.techStack && vac.techStack.some((t) => t.toLowerCase().includes(query)));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="vacancies" className="py-20 md:py-28 border-t border-[rgba(247,206,215,0.12)] bg-[#091c14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="text-xs font-mono font-semibold text-[#97D700] uppercase tracking-wider mb-2">
              ГОРЯЧИЕ ПОЗИЦИИ В РАБОТЕ
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              Актуальные вакансии в iGaming, Арбитраже и Tech
            </h2>
          </div>
          <button
            onClick={onOpenCandidateModal}
            className="px-4 py-2.5 text-xs font-bold text-[#F7CED7] hover:text-white bg-[#154734] border border-[#F7CED7]/30 hover:border-[#F7CED7] rounded-lg transition-colors flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-[#97D700]" />
            <span>Добавить резюме в закрытую базу</span>
          </button>
        </div>

        {/* Filter Bar (Search + Segmented Tabs) */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#103325] border border-[rgba(247,206,215,0.15)] rounded-xl overflow-x-auto">
            {[
              { id: 'all', label: 'Все позиции' },
              { id: 'media_buying', label: 'Media Buying' },
              { id: 'development', label: 'Dev & IT' },
              { id: 'affiliate_bd', label: 'Affiliate & BD' },
              { id: 'management', label: 'C-Level' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as RoleCategory | 'all')}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-[#154734] text-[#97D700] font-bold shadow-sm'
                    : 'text-[#e2ede8] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px] max-w-sm">
            <Search className="w-4 h-4 text-[#95b3a6] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Поиск по стеку, сорсу, роли..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-[#103325] text-white border border-[rgba(247,206,215,0.18)] focus:border-[#97D700] focus:outline-none"
            />
          </div>

        </div>

        {/* Vacancies Grid */}
        {filteredVacancies.length === 0 ? (
          <div className="py-16 text-center rounded-xl bg-[#103325] border border-[rgba(247,206,215,0.15)]">
            <p className="text-sm text-[#e2ede8] mb-3">По вашему запросу вакансий не найдено.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-xs text-[#97D700] font-bold underline cursor-pointer"
            >
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredVacancies.map((vac) => (
              <div
                key={vac.id}
                onClick={() => setActiveVacancy(vac)}
                className="p-6 rounded-xl bg-[#103325] border border-[rgba(247,206,215,0.18)] hover:border-[#97D700]/50 transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-md"
              >
                <div>
                  
                  {/* Top unboxed metadata */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <div className="flex items-center gap-2 text-[#95b3a6]">
                      <span className="text-[#97D700] font-semibold font-mono">{vac.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{vac.formatLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{vac.publishedDate}</span>
                    </div>

                    {vac.hot && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-[#F7CED7] uppercase font-mono">
                        <Flame className="w-3.5 h-3.5 text-[#F7CED7]" />
                        <span>HOT</span>
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-[#97D700] transition-colors leading-snug">
                    {vac.title}
                  </h3>

                  {/* Salary unboxed */}
                  <div className="flex items-center gap-1.5 text-sm font-mono font-bold text-white mb-3">
                    <DollarSign className="w-4 h-4 text-[#97D700] shrink-0" />
                    <span>{vac.salaryRange}</span>
                  </div>

                  {/* Short excerpt */}
                  <p className="text-xs text-[#e2ede8]/80 line-clamp-2 leading-relaxed mb-4">
                    {vac.description}
                  </p>

                  {/* Sources / Tech tags as quiet text inline */}
                  {(vac.trafficSources || vac.techStack) && (
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#95b3a6] mb-4">
                      <span className="text-[#F7CED7] font-mono">Стек/Сорсы:</span>
                      {(vac.trafficSources || vac.techStack)?.map((item, idx) => (
                        <span key={idx} className="bg-[#154734] text-[#e2ede8] px-2 py-0.5 rounded border border-[rgba(247,206,215,0.1)]">
                          {item}
                        </span>
                      ))}
                    </div>
                  )}

                </div>

                {/* Card bottom */}
                <div className="pt-4 border-t border-[rgba(247,206,215,0.12)] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-[#95b3a6]">
                    <MapPin className="w-3.5 h-3.5 text-[#F7CED7]" />
                    <span>{vac.location}</span>
                  </div>

                  <span className="text-[#97D700] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Подробнее и отклик</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Modal for detailed view */}
        <VacancyModal
          vacancy={activeVacancy}
          onClose={() => setActiveVacancy(null)}
          onApplySuccess={() => setSuccessToast(true)}
        />

        {/* Success toast notification */}
        {successToast && (
          <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-[#154734] border border-[#97D700] text-white shadow-2xl flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#97D700]" />
            <span className="text-xs font-semibold">Ваш отклик передан рекрутеру KOTEL HR!</span>
            <button
              onClick={() => setSuccessToast(false)}
              className="text-xs text-[#F7CED7] hover:underline ml-2"
            >
              Закрыть
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
