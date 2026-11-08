/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Shield, Building2, UserCheck, ArrowRight } from 'lucide-react';
import { sendLeadToGoogleScript } from '../utils/leadSender';

export interface ModalInitialParams {
  category?: string;
  position?: string;
  seniority?: string;
  teamSize?: number;
  estimatedSalary?: string;
}

interface LeadModalProps {
  isOpen: boolean;
  initialType: 'employer' | 'candidate';
  initialParams?: ModalInitialParams | null;
  onClose: () => void;
}

export const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  initialType,
  initialParams,
  onClose,
}) => {
  const [modalType, setModalType] = useState<'employer' | 'candidate'>(initialType);

  const [telegram, setTelegram] = useState('');
  const [name, setName] = useState('');
  const [companyOrRole, setCompanyOrRole] = useState('');
  const [notes, setNotes] = useState('');
  const [salaryBudget, setSalaryBudget] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setModalType(initialType);
    if (initialParams) {
      if (initialParams.position) {
        setCompanyOrRole(`${initialParams.position} (${initialParams.seniority || ''})`);
      }
      if (initialParams.estimatedSalary) {
        setSalaryBudget(initialParams.estimatedSalary);
      }
    }
  }, [initialType, initialParams, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!telegram.trim()) return;

    await sendLeadToGoogleScript({
      telegram: telegram.trim(),
      email: name.trim() || 'Заявка через расширенную форму',
      role: companyOrRole,
      comment: `Бюджет/ЗП: ${salaryBudget}. Детали: ${notes}`,
      source: `Форма: ${modalType === 'employer' ? 'Работодатель' : 'Кандидат'}`,
    });

    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setTelegram('');
    setName('');
    setCompanyOrRole('');
    setNotes('');
    setSalaryBudget('');
    onClose();
  };

  const telegramDraft = encodeURIComponent(
    `Привет, KOTEL HR! Пишу с сайта. Мне интересен подбор: ${companyOrRole || 'Специалисты в арбитраж'}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl p-5 sm:p-8 shadow-2xl my-auto text-[#154734] max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Крупная удобная кнопка закрытия для пальцев (44x44px) */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 w-11 h-11 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-[#154734] transition-colors flex items-center justify-center z-20 active:scale-95"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#F7CED7] text-[#154734] mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-xl font-bold text-[#154734] mb-2">
              Заявка успешно принята!
            </h3>

            <p className="text-sm text-[#527163] max-w-sm mx-auto mb-6">
              Мы передали информацию ведущему рекрутеру. Напишем вам в Telegram <b className="text-[#154734]">{telegram}</b> в течение 2 часов.
            </p>

            <div className="p-4 rounded-xl bg-[#F8FAF9] border border-[#154734]/15 mb-6 text-xs text-[#243E33]">
              Хотите ускорить процесс и сразу обсудить детали?
              <div className="mt-2.5">
                <a
                  href={`https://t.me/hrkotel?text=${telegramDraft}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 font-extrabold text-[#154734] bg-[#F7CED7] hover:bg-[#f3b5c3] rounded-xl transition-colors shadow-sm min-h-[44px]"
                >
                  <Send className="w-4 h-4 text-[#154734]" />
                  <span>Открыть диалог в Telegram @hrkotel</span>
                </a>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="px-6 py-2.5 rounded-xl bg-[#154734] text-white font-bold text-xs hover:bg-[#243E33] transition-colors min-h-[44px]"
            >
              Закрыть окно
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6 pr-10">
              <div className="inline-flex p-1 bg-[#F8FAF9] rounded-xl border border-[#154734]/10 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setModalType('employer')}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 min-h-[38px] ${
                    modalType === 'employer'
                      ? 'bg-[#154734] text-white shadow-sm'
                      : 'text-[#527163] hover:text-[#154734]'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Я работодатель</span>
                </button>
                <button
                  type="button"
                  onClick={() => setModalType('candidate')}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 min-h-[38px] ${
                    modalType === 'candidate'
                      ? 'bg-[#154734] text-white shadow-sm'
                      : 'text-[#527163] hover:text-[#154734]'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Я кандидат</span>
                </button>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-[#154734] tracking-tight mb-2 pr-10">
              {modalType === 'employer' ? 'Заявка на подбор специалистов' : 'Попасть в закрытую базу талантов'}
            </h2>
            <p className="text-xs sm:text-sm text-[#527163] mb-6">
              {modalType === 'employer'
                ? 'Оставьте контакт. Мы свяжемся с вами в течение 15 минут для уточнения профиля.'
                : 'Заполните краткую информацию. Мы предлагаем только проверенные команды с рыночными условиями.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-[#527163] uppercase mb-1">
                  Telegram для связи (@username)*
                </label>
                <input
                  type="text"
                  required
                  placeholder="@username"
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#154734]/20 focus:border-[#154734] focus:ring-1 focus:ring-[#154734] focus:outline-none text-base sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#527163] uppercase mb-1">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    placeholder="Александр"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#154734]/20 focus:border-[#154734] focus:outline-none text-base sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-[#527163] uppercase mb-1">
                    {modalType === 'employer' ? 'Компания / Команда' : 'Специализация'}
                  </label>
                  <input
                    type="text"
                    placeholder={modalType === 'employer' ? 'CPA Network / Media Team' : 'Senior Media Buyer FB'}
                    value={companyOrRole}
                    onChange={(e) => setCompanyOrRole(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#154734]/20 focus:border-[#154734] focus:outline-none text-base sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#527163] uppercase mb-1">
                  {modalType === 'employer' ? 'Бюджет на позицию / Формат' : 'Ожидания по ЗП ($)'}
                </label>
                <input
                  type="text"
                  placeholder={modalType === 'employer' ? '$3,000–$5,000 / Удаленно' : '$4,000+ net + % от профита'}
                  value={salaryBudget}
                  onChange={(e) => setSalaryBudget(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#154734]/20 focus:border-[#154734] focus:outline-none text-base sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#527163] uppercase mb-1">
                  Комментарий или стек
                </label>
                <textarea
                  rows={2}
                  placeholder="Дополнительные детали..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#154734]/20 focus:border-[#154734] focus:outline-none text-base sm:text-xs resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-[#154734] hover:bg-[#243E33] text-white font-extrabold text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
                >
                  <span>{modalType === 'employer' ? 'Отправить бриф рекрутеру' : 'Отправить анкету в базу'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-[#527163]">
                <Shield className="w-4 h-4 text-[#97D700]" />
                <span>Гарантия конфиденциальности по NDA</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
