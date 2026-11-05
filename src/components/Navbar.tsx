/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { LOGO_IMAGE_SRC } from '../assets/logoBase64';

interface NavbarProps {
  onOpenInstantModal: (direction?: string, title?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInstantModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#8B5CF6]/20 bg-[#0B0813]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        
        {/* Zone 1: Official Logo provided by user + Brand Wordmark */}
        <a 
          href="#" 
          className="flex items-center gap-3 group whitespace-nowrap shrink-0 text-decoration-none"
        >
          <img 
            src={LOGO_IMAGE_SRC} 
            alt="KOTEL HR Logo" 
            className="w-10 h-10 rounded-xl object-cover shadow-md shadow-[#97D700]/25 border border-[#97D700]/40 group-hover:scale-105 transition-transform shrink-0" 
          />

          <div className="flex flex-col">
            <div className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <span>KOTEL</span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#97D700] text-[#0B0813] font-black tracking-wider uppercase font-mono">
                HR
              </span>
            </div>
            <span className="text-[11px] font-medium text-[#F7CED7] tracking-wide">
              Рекрутинг для арбитража трафика
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-[#E5E0F5]">
          <a 
            href="#directions" 
            className="hover:text-[#97D700] transition-colors whitespace-nowrap shrink-0"
          >
            Направления
          </a>
          <a 
            href="#candidate-cooker" 
            className="hover:text-[#97D700] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 text-[#F7CED7]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#97D700]" />
            <span>Сварить команду</span>
          </a>
          <a 
            href="#cases" 
            className="hover:text-[#97D700] transition-colors whitespace-nowrap shrink-0"
          >
            Кейсы
          </a>
          <a 
            href="#workflow" 
            className="hover:text-[#97D700] transition-colors whitespace-nowrap shrink-0"
          >
            Как работаем
          </a>
          <a 
            href="#faq" 
            className="hover:text-[#97D700] transition-colors whitespace-nowrap shrink-0"
          >
            FAQ
          </a>
        </nav>

        {/* Zone 3: Fast Action Button */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={() => onOpenInstantModal(undefined, 'Заявка на подбор')}
            className="px-5 py-2.5 text-xs font-extrabold text-[#0B0813] bg-[#97D700] hover:bg-[#85be00] rounded-xl transition-all shadow-lg shadow-[#97D700]/20 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0B0813]" />
            <span>Оставить заявку</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => onOpenInstantModal(undefined, 'Быстрая заявка')}
            className="px-3.5 py-1.5 text-xs font-bold text-[#0B0813] bg-[#97D700] rounded-lg whitespace-nowrap shrink-0"
          >
            Заявка
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#E5E0F5] hover:bg-[#1A142E] rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#8B5CF6]/20 bg-[#0B0813] px-4 py-4 space-y-3">
          <div className="flex flex-col gap-3 text-sm font-semibold text-[#E5E0F5]">
            <a 
              href="#directions" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#97D700]"
            >
              Направления и вертикали
            </a>
            <a 
              href="#candidate-cooker" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#97D700] text-[#F7CED7] flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#97D700]" />
              <span>Конфигуратор «Сварить команду»</span>
            </a>
            <a 
              href="#cases" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#97D700]"
            >
              Кейсы и цифры
            </a>
            <a 
              href="#workflow" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#97D700]"
            >
              Схема работы
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#97D700]"
            >
              Вопросы и ответы
            </a>
          </div>

          <div className="pt-3 border-t border-[#8B5CF6]/20">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInstantModal(undefined, 'Мобильная заявка');
              }}
              className="w-full py-3 text-xs font-bold text-[#0B0813] bg-[#97D700] rounded-xl flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Оставить заявку (Telegram + Email)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
