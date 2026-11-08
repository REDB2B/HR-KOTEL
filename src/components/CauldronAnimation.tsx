/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Flame, Zap } from 'lucide-react';
import { LOGO_IMAGE_SRC } from '../assets/logoBase64';

export const CauldronAnimation: React.FC = () => {
  const [stirringFast, setStirringFast] = useState(false);

  const toggleStirring = () => {
    setStirringFast((prev) => !prev);
  };

  return (
    <div
      className="relative w-full max-w-[310px] sm:max-w-[390px] md:max-w-[420px] mx-auto aspect-square flex items-center justify-center select-none cursor-pointer group transition-transform duration-300 active:scale-[0.98]"
      onClick={toggleStirring}
      role="button"
      tabIndex={0}
      aria-label="Интерактивный котел KOTEL HR: нажмите, чтобы переключить режим варки"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleStirring();
        }
      }}
    >
      {/* Mystic radial ambient aura — GPU composited */}
      <div
        className="absolute inset-0 rounded-full blur-[50px] sm:blur-[70px] pointer-events-none transition-opacity duration-500"
        style={{
          opacity: stirringFast ? 0.9 : 0.5,
          background: stirringFast
            ? 'radial-gradient(circle, rgba(151,215,0,0.4) 0%, rgba(139,92,246,0.35) 45%, transparent 75%)'
            : 'radial-gradient(circle, rgba(151,215,0,0.2) 0%, rgba(139,92,246,0.18) 40%, transparent 70%)',
        }}
      />

      {/* Floating Recipe Runes (Badges) with mobile-safe positioning */}

      {/* 1. KEY BADGE: + ROI 120%+ */}
      <div className="absolute top-1 sm:top-2 left-1 sm:left-3 z-30 animate-float-slow pointer-events-none">
        <div
          className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full font-mono text-[10px] sm:text-[11px] font-bold transition-all duration-300 flex items-center gap-1 sm:gap-1.5 backdrop-blur-md ${
            stirringFast
              ? 'bg-[#97D700] text-[#0B0813] font-black border-2 border-white shadow-[0_0_20px_rgba(151,215,0,0.8)] scale-105 ring-2 ring-[#97D700]'
              : 'bg-[#1A142E]/95 text-[#97D700] border border-[#97D700]/50 shadow-md shadow-[#97D700]/10'
          }`}
        >
          {stirringFast ? (
            <Zap className="w-3 h-3 text-[#0B0813] animate-bounce" />
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-[#97D700] animate-pulse" />
          )}
          <span className="tracking-tight whitespace-nowrap">
            {stirringFast ? '🔥 + ROI 120%+ АКТИВНО' : '+ ROI 120%+'}
          </span>
        </div>
      </div>

      {/* 2. BADGE: + Senior FB Buyer */}
      <div className="absolute top-8 sm:top-12 right-1 sm:right-2 z-20 animate-float-delayed pointer-events-none">
        <div
          className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full font-mono text-[10px] sm:text-[11px] font-bold transition-all duration-300 flex items-center gap-1 sm:gap-1.5 backdrop-blur-md ${
            stirringFast
              ? 'bg-[#8B5CF6] text-white border border-white shadow-[0_0_16px_rgba(139,92,246,0.7)] scale-105'
              : 'bg-[#1A142E]/95 text-[#F7CED7] border border-[#8B5CF6]/50 shadow-md shadow-[#8B5CF6]/20'
          }`}
        >
          <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#F7CED7]" />
          <span className="whitespace-nowrap">+ Senior FB Buyer</span>
        </div>
      </div>

      {/* 3. BADGE: + Команда под ключ */}
      <div
        className="absolute bottom-7 sm:bottom-9 left-1 sm:left-2 z-20 animate-float-slow pointer-events-none"
        style={{ animationDelay: '2.2s' }}
      >
        <div
          className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full font-mono text-[10px] sm:text-[11px] font-bold transition-all duration-300 shadow-md backdrop-blur-md ${
            stirringFast
              ? 'bg-[#1A142E] text-[#F7CED7] border-2 border-[#F7CED7] shadow-[0_0_14px_rgba(247,206,215,0.5)] scale-105'
              : 'bg-[#1A142E]/95 text-white border border-[#F7CED7]/40'
          }`}
        >
          <span className="whitespace-nowrap">+ Команда под ключ</span>
        </div>
      </div>

      {/* 4. BADGE: + Webview Dev */}
      <div
        className="absolute bottom-14 sm:bottom-16 right-1 sm:right-0 z-20 animate-float-delayed pointer-events-none"
        style={{ animationDelay: '1s' }}
      >
        <div
          className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full font-mono text-[10px] sm:text-[11px] font-bold transition-all duration-300 shadow-md backdrop-blur-md ${
            stirringFast
              ? 'bg-[#1A142E] text-[#97D700] border-2 border-[#97D700] shadow-[0_0_14px_rgba(151,215,0,0.5)] scale-105'
              : 'bg-[#1A142E]/95 text-[#97D700] border border-[#97D700]/40'
          }`}
        >
          <span className="whitespace-nowrap">+ Webview Dev</span>
        </div>
      </div>

      {/* Main SVG Vector Artwork */}
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full relative z-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Potion glow gradient */}
          <linearGradient id="potionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#97D700" />
            <stop offset="50%" stopColor="#85BE00" />
            <stop offset="100%" stopColor="#154734" />
          </linearGradient>

          {/* Cauldron metallic texture */}
          <linearGradient id="cauldronGrad" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#2E2447" />
            <stop offset="40%" stopColor="#1B152B" />
            <stop offset="100%" stopColor="#0E0A1A" />
          </linearGradient>

          {/* Witch Hat gradient */}
          <linearGradient id="witchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4C1D95" />
            <stop offset="60%" stopColor="#2E1065" />
            <stop offset="100%" stopColor="#180A30" />
          </linearGradient>

          {/* Logo round clip on cauldron belly */}
          <clipPath id="logoRoundClip">
            <rect x="178" y="252" width="44" height="44" rx="10" />
          </clipPath>
        </defs>

        {/* 1. Mystic Steam & Vapors (Hardware accelerated, no heavy SVG raster blur) */}
        <g>
          {/* Soft back-glow vapor paths */}
          <path
            d="M175 190 Q150 140 180 110 Q210 80 190 50"
            stroke="#97D700"
            strokeWidth={stirringFast ? '14' : '10'}
            strokeLinecap="round"
            fill="none"
            opacity="0.25"
            className="animate-steam-1"
          />
          <path
            d="M175 190 Q150 140 180 110 Q210 80 190 50"
            stroke="#97D700"
            strokeWidth={stirringFast ? '7' : '4.5'}
            strokeLinecap="round"
            fill="none"
            className="animate-steam-1 opacity-80"
          />

          <path
            d="M205 185 Q230 140 210 100 Q190 70 215 40"
            stroke="#8B5CF6"
            strokeWidth={stirringFast ? '12' : '8'}
            strokeLinecap="round"
            fill="none"
            opacity="0.25"
            className="animate-steam-2"
          />
          <path
            d="M205 185 Q230 140 210 100 Q190 70 215 40"
            stroke="#8B5CF6"
            strokeWidth={stirringFast ? '6' : '4'}
            strokeLinecap="round"
            fill="none"
            className="animate-steam-2 opacity-75"
          />

          <path
            d="M190 190 Q170 150 200 120 Q225 90 200 65"
            stroke="#F7CED7"
            strokeWidth={stirringFast ? '10' : '7'}
            strokeLinecap="round"
            fill="none"
            opacity="0.2"
            className="animate-steam-3"
          />
          <path
            d="M190 190 Q170 150 200 120 Q225 90 200 65"
            stroke="#F7CED7"
            strokeWidth={stirringFast ? '5' : '3'}
            strokeLinecap="round"
            fill="none"
            className="animate-steam-3 opacity-75"
          />
        </g>

        {/* 2. Witch Silhouette / Hat */}
        <g id="witch-silhouette" className="opacity-95">
          {/* Flowing hair */}
          <path
            d="M125 140 Q105 180 115 220 C120 195 135 180 135 155 Z"
            fill="#8B5CF6"
            opacity="0.85"
          />
          <path
            d="M165 140 Q180 180 170 215 C165 190 155 175 155 155 Z"
            fill="#8B5CF6"
            opacity="0.85"
          />

          {/* Witch Face / Silhouette */}
          <circle cx="145" cy="148" r="18" fill="#F7CED7" opacity="0.9" />

          {/* Witch Hat Brim */}
          <ellipse cx="145" cy="140" rx="46" ry="12" fill="url(#witchGrad)" transform="rotate(-10 145 140)" />
          {/* Hat Ribbon in Pantone 375 C Lime */}
          <ellipse cx="145" cy="138" rx="26" ry="7" fill="#97D700" transform="rotate(-10 145 138)" />
          {/* Hat Cone */}
          <path
            d="M122 136 Q138 90 155 60 Q175 55 160 85 L168 132 Z"
            fill="url(#witchGrad)"
          />
          {/* Hat Tip curved */}
          <path
            d="M155 60 Q170 52 182 58 Q174 68 160 85 Z"
            fill="#4C1D95"
          />
          {/* Star brooch on hat in Pink 706 C */}
          <circle cx="142" cy="137" r="3.5" fill="#F7CED7" />
        </g>

        {/* 3. Wooden Ladle / Stirring Wand */}
        <g
          id="ladle"
          className="animate-stir"
          style={{ animationDuration: stirringFast ? '1.3s' : '3.8s' }}
        >
          {/* Ladle Handle */}
          <line x1="255" y1="95" x2="195" y2="215" stroke="#C88E52" strokeWidth="6" strokeLinecap="round" />
          <line x1="257" y1="92" x2="270" y2="65" stroke="#E2A669" strokeWidth="5" strokeLinecap="round" />
          {/* Ladle Head with glowing brew */}
          <circle cx="192" cy="220" r="14" fill="#97D700" opacity="0.9" />
          <circle cx="192" cy="220" r="10" fill="#154734" />
        </g>

        {/* 4. The Cauldron ("Котел") matching official logo profile */}
        <g id="cauldron-body" className="animate-potion-pulse">
          {/* Back rim of cauldron */}
          <ellipse cx="200" cy="215" rx="88" ry="24" fill="#0E0A1A" stroke="#4C1D95" strokeWidth="3" />

          {/* Bubbling green potion liquid surface */}
          <ellipse cx="200" cy="217" rx="80" ry="20" fill="url(#potionGrad)" />

          {/* Potion swirl lines */}
          <path d="M140 217 Q170 224 200 217 T260 217" stroke="#97D700" strokeWidth="3" opacity="0.85" />
          <path d="M155 220 Q190 227 220 220 T245 220" stroke="#F7CED7" strokeWidth="2" opacity="0.7" />

          {/* Bubbles in brew */}
          <circle
            cx="165"
            cy="214"
            r={stirringFast ? '9' : '7'}
            fill="#97D700"
            className="animate-bubble-1"
            style={{ animationDuration: stirringFast ? '1.1s' : '2.4s' }}
          />
          <circle
            cx="215"
            cy="212"
            r={stirringFast ? '11' : '9'}
            fill="#97D700"
            className="animate-bubble-2"
            style={{ animationDuration: stirringFast ? '1.3s' : '2.8s' }}
          />
          <circle
            cx="190"
            cy="218"
            r={stirringFast ? '7' : '5'}
            fill="#F7CED7"
            className="animate-bubble-3"
            style={{ animationDuration: stirringFast ? '1.5s' : '3.2s' }}
          />
          <circle
            cx="235"
            cy="215"
            r="6"
            fill="#8B5CF6"
            className="animate-bubble-1"
            style={{ animationDelay: '0.6s', animationDuration: stirringFast ? '1.2s' : '2.4s' }}
          />

          {/* Cauldron Belly / Bowl matching logo geometry */}
          <path
            d="M112 215 C108 280 140 335 200 335 C260 335 292 280 288 215 Z"
            fill="url(#cauldronGrad)"
            stroke="#4C1D95"
            strokeWidth="3.5"
          />

          {/* Front Rim Lip */}
          <ellipse cx="200" cy="215" rx="88" ry="12" fill="none" stroke="#6D28D9" strokeWidth="5" />

          {/* Cauldron Handles */}
          <path d="M112 235 C95 235 95 260 112 260" stroke="#6D28D9" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M288 235 C305 235 305 260 288 260" stroke="#6D28D9" strokeWidth="5" strokeLinecap="round" fill="none" />

          {/* Cauldron Feet */}
          <path d="M140 325 L125 358 L142 356 Z" fill="#0E0A1A" stroke="#2E1065" strokeWidth="2" />
          <path d="M260 325 L275 358 L258 356 Z" fill="#0E0A1A" stroke="#2E1065" strokeWidth="2" />
          <path d="M200 335 L200 365 L210 362 Z" fill="#0A0714" />

          {/* Official Logo on the Cauldron's belly */}
          <g id="cauldron-official-logo">
            <rect
              x="176"
              y="250"
              width="48"
              height="48"
              rx="12"
              fill="#1A142E"
              stroke="#97D700"
              strokeWidth={stirringFast ? '2.5' : '1.5'}
              className="transition-all duration-300"
            />
            <image
              href={LOGO_IMAGE_SRC}
              x="178"
              y="252"
              width="44"
              height="44"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#logoRoundClip)"
            />
          </g>
        </g>

        {/* Small rising sparks */}
        <circle cx="150" cy="170" r={stirringFast ? '3' : '2'} fill="#97D700" className="animate-bubble-2" />
        <circle cx="250" cy="160" r={stirringFast ? '3.5' : '2.5'} fill="#F7CED7" className="animate-bubble-3" />
        <circle cx="210" cy="130" r={stirringFast ? '3' : '2'} fill="#8B5CF6" className="animate-bubble-1" />
      </svg>

      {/* Interactive prompt label with safe mobile sizing */}
      <div className="absolute -bottom-2 sm:-bottom-3 text-center w-full z-30 px-2 flex justify-center">
        <div
          className={`text-[10px] sm:text-[11px] font-mono px-3 sm:px-4 py-1.5 rounded-full border transition-all duration-300 inline-flex items-center gap-1.5 sm:gap-2 shadow-lg backdrop-blur-md max-w-full truncate ${
            stirringFast
              ? 'bg-[#97D700] text-[#0B0813] font-black border-[#97D700] shadow-[#97D700]/30 scale-102'
              : 'bg-[#141022]/95 text-[#E5E0F5] border-[#8B5CF6]/40 hover:border-[#97D700]/60'
          }`}
        >
          {stirringFast ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0B0813] animate-ping shrink-0" />
              <Flame className="w-3 h-3 text-[#0B0813] animate-pulse shrink-0" />
              <span className="truncate">Режим: ТУРБО (ROI 120%+)</span>
            </>
          ) : (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-[#97D700] shrink-0" />
              <Sparkles className="w-3 h-3 text-[#97D700] shrink-0" />
              <span className="truncate">Режим: Минимальный · Кликните для Турбо</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
