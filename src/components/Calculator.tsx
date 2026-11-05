/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Calculator as CalcIcon, Shield, Clock, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { RoleCategory, SeniorityLevel, WorkFormat } from '../types';

interface CalculatorProps {
  onOpenLeadModalWithParams: (details: {
    category: string;
    position: string;
    seniority: string;
    teamSize: number;
    estimatedSalary: string;
  }) => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ onOpenLeadModalWithParams }) => {
  const [category, setCategory] = useState<RoleCategory>('media_buying');
  const [position, setPosition] = useState<string>('fb_buyer');
  const [seniority, setSeniority] = useState<SeniorityLevel>('senior');
  const [teamSize, setTeamSize] = useState<number>(1);
  const [format, setFormat] = useState<WorkFormat>('remote');

  const positionsByCategory = useMemo(() => {
    switch (category) {
      case 'media_buying':
        return [
          { id: 'fb_buyer', label: 'FB / TikTok Media Buyer (Gambling / Betting)' },
          { id: 'google_buyer', label: 'Google Ads & Search / UAC Buyer' },
          { id: 'aso_spec', label: 'ASO / In-App Specialist' },
          { id: 'squad_lead', label: 'Team Lead Media Buying Squad' },
          { id: 'head_buying', label: 'Head of Media Buying (C-Level)' },
        ];
      case 'development':
        return [
          { id: 'ios_webview', label: 'Senior iOS Developer (Webview, Apps & Cloaking)' },
          { id: 'android_webview', label: 'Senior Android Developer (Apps & Native Wrappers)' },
          { id: 'fullstack_crypto', label: 'Full-Stack Developer (Payments / Node / React)' },
          { id: 'unity_dev', label: 'Unity Slots / Crash-Games Developer' },
          { id: 'devops_infra', label: 'DevOps & Server Infrastructure Engineer' },
        ];
      case 'affiliate_bd':
        return [
          { id: 'aff_manager', label: 'Senior Affiliate Manager (iGaming/Betting)' },
          { id: 'head_aff', label: 'Head of Affiliate Department' },
          { id: 'bizdev', label: 'Business Development Manager (Global / CPA)' },
          { id: 'retention_lead', label: 'VIP Retention & Account Manager' },
        ];
      case 'management':
        return [
          { id: 'cmo', label: 'Chief Marketing Officer (CMO)' },
          { id: 'coo', label: 'Chief Operating Officer (COO)' },
          { id: 'cbdo', label: 'Chief Business Development Officer (CBDO)' },
          { id: 'product_head', label: 'Head of Product (iGaming / Sportsbook)' },
        ];
    }
  }, [category]);

  const handleCategoryChange = (newCat: RoleCategory) => {
    setCategory(newCat);
    if (newCat === 'media_buying') setPosition('fb_buyer');
    if (newCat === 'development') setPosition('ios_webview');
    if (newCat === 'affiliate_bd') setPosition('aff_manager');
    if (newCat === 'management') setPosition('cmo');
  };

  const calculation = useMemo(() => {
    let baseSalaryMin = 2500;
    let baseSalaryMax = 4500;
    let bonusNote = '+ % от чистой прибыли';
    let daysToClose = '5 – 10 дней';
    let guaranteeDays = 60;
    let candidatesPool = 180;

    if (category === 'media_buying') {
      if (seniority === 'middle') {
        baseSalaryMin = 2000;
        baseSalaryMax = 3500;
        daysToClose = '4 – 7 дней';
        guaranteeDays = 30;
        candidatesPool = 320;
      } else if (seniority === 'senior') {
        baseSalaryMin = 3500;
        baseSalaryMax = 6000;
        daysToClose = '6 – 10 дней';
        guaranteeDays = 60;
        candidatesPool = 180;
      } else {
        baseSalaryMin = 5000;
        baseSalaryMax = 9000;
        daysToClose = '8 – 14 дней';
        guaranteeDays = 90;
        candidatesPool = 65;
      }
    } else if (category === 'development') {
      bonusNote = 'чистый оклад в USDT';
      if (seniority === 'middle') {
        baseSalaryMin = 2800;
        baseSalaryMax = 4000;
        daysToClose = '7 – 10 дней';
        guaranteeDays = 30;
      } else if (seniority === 'senior') {
        baseSalaryMin = 4500;
        baseSalaryMax = 7000;
        daysToClose = '8 – 14 дней';
        guaranteeDays = 60;
      } else {
        baseSalaryMin = 6000;
        baseSalaryMax = 9500;
        daysToClose = '10 – 16 дней';
        guaranteeDays = 90;
      }
      candidatesPool = 95;
    } else if (category === 'affiliate_bd') {
      bonusNote = '+ бонусы за FTD и оборот';
      if (seniority === 'middle') {
        baseSalaryMin = 2000;
        baseSalaryMax = 3200;
        guaranteeDays = 30;
        daysToClose = '5 – 8 дней';
      } else if (seniority === 'senior') {
        baseSalaryMin = 3000;
        baseSalaryMax = 5500;
        guaranteeDays = 60;
        daysToClose = '7 – 12 дней';
      } else {
        baseSalaryMin = 5500;
        baseSalaryMax = 9000;
        guaranteeDays = 90;
        daysToClose = '10 – 15 дней';
      }
      candidatesPool = 210;
    } else if (category === 'management') {
      bonusNote = '+ % от EBITDA / опцион';
      baseSalaryMin = 8000;
      baseSalaryMax = 16000;
      daysToClose = '10 – 18 дней';
      guaranteeDays = 90;
      candidatesPool = 35;
    }

    if (teamSize > 1) {
      daysToClose = '14 – 21 день (сквад)';
      candidatesPool = Math.round(candidatesPool * 0.8);
    }

    const currentPositionObj = positionsByCategory.find((p) => p.id === position);
    const positionLabel = currentPositionObj ? currentPositionObj.label : 'Специалист';

    return {
      salaryRange: `$${baseSalaryMin.toLocaleString()} – $${baseSalaryMax.toLocaleString()} ${bonusNote}`,
      daysToClose,
      guaranteeDays,
      candidatesPool,
      positionLabel,
    };
  }, [category, seniority, teamSize, position, positionsByCategory]);

  const handleApply = () => {
    onOpenLeadModalWithParams({
      category: category === 'media_buying' ? 'Media Buying' : category === 'development' ? 'Dev' : category === 'affiliate_bd' ? 'Affiliate' : 'C-Level',
      position: calculation.positionLabel,
      seniority: seniority.toUpperCase(),
      teamSize,
      estimatedSalary: calculation.salaryRange,
    });
  };

  return (
    <section id="calculator" className="py-20 md:py-28 bg-[#F8FAF9] border-b border-[#154734]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono font-bold text-[#154734] uppercase tracking-wider mb-2 flex items-center gap-2">
            <CalcIcon className="w-4 h-4 text-[#154734]" />
            <span>ОНЛАЙН-РАСЧЕТ УСЛОВИЙ НАЙМА</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#154734] tracking-tight [text-wrap:balance]">
            Рассчитайте ориентировочные сроки закрытия и рыночную вилку
          </h2>
          <p className="text-sm text-[#527163] mt-3 font-medium leading-relaxed">
            Выберите направление, уровень специалиста и формат работы. Данные откалиброваны по реальным закрытым вакансиям KOTEL HR в 2026 году.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (7 cols) on crisp white card */}
          <div className="lg:col-span-7 space-y-6 p-7 sm:p-8 rounded-2xl bg-white border border-[#154734]/12 shadow-sm">
            
            {/* 1. Category */}
            <div>
              <label className="block text-xs font-mono font-bold text-[#154734] uppercase tracking-wider mb-2.5">
                1. Направление / Вертикаль
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => handleCategoryChange('media_buying')}
                  className={`p-3 text-xs font-bold rounded-xl transition-all text-center cursor-pointer border ${
                    category === 'media_buying'
                      ? 'bg-[#154734] text-white border-[#154734] shadow-sm'
                      : 'bg-[#F8FAF9] text-[#243E33] border-[#154734]/10 hover:border-[#154734]/30'
                  }`}
                >
                  Media Buying
                </button>
                <button
                  type="button"
                  onClick={() => handleCategoryChange('development')}
                  className={`p-3 text-xs font-bold rounded-xl transition-all text-center cursor-pointer border ${
                    category === 'development'
                      ? 'bg-[#154734] text-white border-[#154734] shadow-sm'
                      : 'bg-[#F8FAF9] text-[#243E33] border-[#154734]/10 hover:border-[#154734]/30'
                  }`}
                >
                  Разработка &amp; IT
                </button>
                <button
                  type="button"
                  onClick={() => handleCategoryChange('affiliate_bd')}
                  className={`p-3 text-xs font-bold rounded-xl transition-all text-center cursor-pointer border ${
                    category === 'affiliate_bd'
                      ? 'bg-[#154734] text-white border-[#154734] shadow-sm'
                      : 'bg-[#F8FAF9] text-[#243E33] border-[#154734]/10 hover:border-[#154734]/30'
                  }`}
                >
                  Affiliate &amp; BD
                </button>
                <button
                  type="button"
                  onClick={() => handleCategoryChange('management')}
                  className={`p-3 text-xs font-bold rounded-xl transition-all text-center cursor-pointer border ${
                    category === 'management'
                      ? 'bg-[#154734] text-white border-[#154734] shadow-sm'
                      : 'bg-[#F8FAF9] text-[#243E33] border-[#154734]/10 hover:border-[#154734]/30'
                  }`}
                >
                  C-Level / Top
                </button>
              </div>
            </div>

            {/* 2. Position Select */}
            <div>
              <label className="block text-xs font-mono font-bold text-[#154734] uppercase tracking-wider mb-2">
                2. Конкретная роль
              </label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#F8FAF9] text-[#154734] font-semibold border border-[#154734]/15 focus:border-[#154734] focus:outline-none text-xs sm:text-sm cursor-pointer"
              >
                {positionsByCategory.map((pos) => (
                  <option key={pos.id} value={pos.id} className="bg-white text-[#154734]">
                    {pos.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Seniority */}
            <div>
              <label className="block text-xs font-mono font-bold text-[#154734] uppercase tracking-wider mb-2.5">
                3. Грейд и опыт
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['middle', 'senior', 'lead', 'c_level'] as SeniorityLevel[]).map((lvl) => {
                  const labels: Record<SeniorityLevel, string> = {
                    middle: 'Middle+ (1-2 года)',
                    senior: 'Senior (3+ года)',
                    lead: 'Team Lead (управление)',
                    c_level: 'Head / C-Level',
                  };
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSeniority(lvl)}
                      className={`p-3 text-xs font-bold rounded-xl transition-all text-center cursor-pointer border ${
                        seniority === lvl
                          ? 'bg-[#F7CED7] text-[#154734] border-[#154734]/30 shadow-sm'
                          : 'bg-[#F8FAF9] text-[#243E33] border-[#154734]/10 hover:border-[#154734]/30'
                      }`}
                    >
                      {labels[lvl]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Team size & format */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono font-bold text-[#154734] uppercase tracking-wider">
                    4. Количество человек
                  </label>
                  <span className="text-xs font-mono font-bold text-[#154734]">
                    {teamSize === 1 ? '1 специалист' : `Сквад из ${teamSize} человек`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 5].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setTeamSize(count)}
                      className={`flex-1 py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        teamSize === count
                          ? 'bg-[#154734] text-white border-[#154734]'
                          : 'bg-[#F8FAF9] text-[#243E33] border-[#154734]/10 hover:border-[#154734]/30'
                      }`}
                    >
                      {count === 1 ? '1' : `${count}+`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#154734] uppercase tracking-wider mb-2">
                  5. Локация / Формат
                </label>
                <div className="flex items-center gap-2">
                  {(['remote', 'office', 'relocation'] as WorkFormat[]).map((fmt) => {
                    const fmtLabels: Record<string, string> = {
                      remote: 'Удаленно',
                      office: 'Офис',
                      relocation: 'Релокация',
                    };
                    return (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => setFormat(fmt)}
                        className={`flex-1 py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          format === fmt
                            ? 'bg-[#154734] text-white border-[#154734]'
                            : 'bg-[#F8FAF9] text-[#243E33] border-[#154734]/10 hover:border-[#154734]/30'
                        }`}
                      >
                        {fmtLabels[fmt]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

          {/* Results Column (5 cols) in Pantone 3435 C & 706 C */}
          <div className="lg:col-span-5 p-7 sm:p-8 rounded-2xl bg-[#154734] text-white shadow-xl border border-[#154734] relative">
            
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/15">
              <span className="text-xs font-mono font-bold text-[#F7CED7] uppercase tracking-wider">
                ОРИЕНТИР РАСЧЕТА
              </span>
              <span className="text-[11px] font-mono font-bold text-[#154734] bg-[#F7CED7] px-2.5 py-0.5 rounded">
                SUCCESS FEE
              </span>
            </div>

            {/* Selected position title */}
            <div className="mb-6">
              <div className="text-xs text-[#F7CED7] uppercase tracking-wider font-mono">
                Выбранная роль:
              </div>
              <div className="text-lg font-extrabold text-white mt-1 leading-snug">
                {calculation.positionLabel}
              </div>
              <div className="text-xs text-[#e2ede8] mt-1 font-medium">
                Грейд: {seniority.toUpperCase()} · Формат: {format === 'remote' ? 'Удаленно' : format === 'office' ? 'Офис' : 'Релокация'}
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-3.5 mb-6">
              
              <div className="p-3.5 rounded-xl bg-[#0D2E21] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#97D700]" />
                  <span className="text-xs text-[#e2ede8]">Срок закрытия роли:</span>
                </div>
                <span className="text-xs sm:text-sm font-bold font-mono text-[#97D700]">
                  {calculation.daysToClose}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0D2E21] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#F7CED7]" />
                  <span className="text-xs text-[#e2ede8]">Гарантия бесплатной замены:</span>
                </div>
                <span className="text-xs sm:text-sm font-bold font-mono text-[#F7CED7]">
                  {calculation.guaranteeDays} дней
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0D2E21] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#97D700]" />
                  <span className="text-xs text-[#e2ede8]">Пул в базе KOTEL:</span>
                </div>
                <span className="text-xs sm:text-sm font-bold font-mono text-white">
                  ~{calculation.candidatesPool} кандидатов
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white text-[#154734]">
                <div className="text-[11px] font-mono font-bold text-[#527163] uppercase tracking-wider mb-1">
                  Рыночная зарплатная вилка:
                </div>
                <div className="text-base sm:text-lg font-extrabold text-[#154734] font-mono leading-tight">
                  {calculation.salaryRange}
                </div>
              </div>

            </div>

            {/* Guarantees */}
            <div className="space-y-1.5 mb-6 text-xs text-[#e2ede8]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#97D700] shrink-0" />
                <span>Оплата только по факту успешного выхода специалиста</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#97D700] shrink-0" />
                <span>Первые проверенные кандидаты через 48 часов</span>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleApply}
              className="w-full py-3.5 px-4 rounded-xl bg-[#F7CED7] hover:bg-[#f3b5c3] text-[#154734] font-extrabold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Зафиксировать расчет и оставить бриф</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
