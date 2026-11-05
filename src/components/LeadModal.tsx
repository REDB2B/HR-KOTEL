/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Shield, Building2, UserCheck, ArrowRight } from 'lucide-react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!telegram.trim()) return;
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

  const telegramDraft = modalType === 'employer'
    ? `Здравствуйте! Заявка на подбор из сайта KOTEL HR:%0A• Роль: ${encodeURIComponent(companyOrRole || 'Специалист')}%0A• Бюджет: ${encodeURIComponent(salaryBudget || 'Рыночный')}%0A• Контакт: ${encodeURIComponent(telegram || '')}`
    : `Здравствуйте! Хочу отправить резюме в базу KOTEL HR:%0A• Профиль: ${encodeURIComponent(companyOrRole || 'Специалист')}%0A• Контакт: ${encodeURIComponent(telegram || '')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-white border border-[#154734]/20 rounded-2xl p-6 sm:p-8 shadow-2xl my-8 text-[#243E33]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 text-[#527163] hover:text-[#154734] rounded-lg transition-colors cursor-pointer"
          aria-label="Close modal"
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 font-extrabold text-[#154734] bg-[#F7CED7] hover:bg-[#f3b5c3] rounded-xl transition-colors shadow-sm"
                >
                  <Send className="w-4 h-4 text-[#154734]" />
                  <span>Открыть диалог в Telegram @hrkotel</span>
                </a>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="text-xs text-[#527163] hover:text-[#154734] underline cursor-pointer"
            >
              Вернуться на сайт
            </button>
          </div>
        ) : (
          <div>
            
            {/* Mode Switcher */}
            <div className="flex items-center gap-2 mb-5">
              <button
                type="button"
                onClick={() => setModalType('employer')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  modalType === 'employer'
                    ? 'bg-[#154734] text-white border-[#154734] shadow-sm'
                    : 'bg-[#F8FAF9] text-[#243E33] border-[#154734]/10 hover:border-[#154734]/30'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Работодателям (Бриф)</span>
              </button>
              <button
                type="button"
                onClick={() => setModalType('candidate')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  modalType === 'candidate'
                    ? 'bg-[#F7CED7] text-[#154734] border-[#154734]/20 shadow-sm'
                    : 'bg-[#F8FAF9] text-[#243E33] border-[#154734]/10 hover:border-[#154734]/30'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Кандидатам (Резюме)</span>
              </button>
            </div>

            <h2 className="text-xl font-extrabold text-[#154734] tracking-tight mb-1">
              {modalType === 'employer'
                ? 'Бриф на подбор специалистов'
                : 'Конфиденциальная анкета соискателя'}
            </h2>
            
            <p className="text-xs text-[#527163] mb-5">
              {modalType === 'employer'
                ? 'Опишите вакансию — покажем первых проверенных кандидатов через 48 часов.'
                : 'Добавьте свой профиль в закрытую базу без риска огласки текущему работодателю.'}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              <div>
                <label className="block text-xs font-mono font-bold text-[#154734] uppercase mb-1">
                  Telegram для связи (@username)*
                </label>
                <input
                  type="text"
                  required
                  placeholder="@username или номер"
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-[#F8FAF9] text-[#154734] font-medium border border-[#154734]/20 focus:border-[#154734] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#527163] uppercase mb-1">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    placeholder="Александр"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-[#F8FAF9] text-[#154734] font-medium border border-[#154734]/20 focus:border-[#154734] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#527163] uppercase mb-1">
                    {modalType === 'employer' ? 'Команда / Компания' : 'Текущая роль'}
                  </label>
                  <input
                    type="text"
                    placeholder={modalType === 'employer' ? 'Media Buying Team' : 'Senior FB Buyer'}
                    value={companyOrRole}
                    onChange={(e) => setCompanyOrRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-[#F8FAF9] text-[#154734] font-medium border border-[#154734]/20 focus:border-[#154734] focus:outline-none"
                  />
                </div>
              </div>

              {modalType === 'employer' ? (
                <div>
                  <label className="block text-xs font-mono font-bold text-[#527163] uppercase mb-1">
                    Ориентировочная вилка / Бюджет
                  </label>
                  <input
                    type="text"
                    placeholder="Например: $3,500 – $5,000 + % от ROI"
                    value={salaryBudget}
                    onChange={(e) => setSalaryBudget(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-[#F8FAF9] text-[#154734] font-medium border border-[#154734]/20 focus:border-[#154734] focus:outline-none"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-mono font-bold text-[#527163] uppercase mb-1">
                    Ссылка на резюме / статы (Google Drive / Notion)
                  </label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={salaryBudget}
                    onChange={(e) => setSalaryBudget(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-[#F8FAF9] text-[#154734] font-medium border border-[#154734]/20 focus:border-[#154734] focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-mono font-bold text-[#527163] uppercase mb-1">
                  Комментарии к задаче
                </label>
                <textarea
                  rows={3}
                  placeholder={modalType === 'employer' ? 'Гео заливов, источники, требования...' : 'Опыт заливов, желаемые условия...'}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F8FAF9] text-[#154734] font-medium border border-[#154734]/20 focus:border-[#154734] focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#527163]">
                <Shield className="w-3.5 h-3.5 text-[#154734] shrink-0" />
                <span>Данные защищены строгим NDA и не передаются третьим лицам.</span>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3 px-4 text-xs font-extrabold text-[#154734] bg-[#F7CED7] hover:bg-[#f3b5c3] rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Отправить заявку</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={`https://t.me/hrkotel?text=${telegramDraft}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-3 px-4 text-xs font-bold text-white bg-[#154734] hover:bg-[#0D2E21] rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-[#97D700]" />
                  <span>Написать в TG @hrkotel</span>
                </a>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
