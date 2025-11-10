"use client";
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2 min-w-fit">
      <button
        onClick={() => setLanguage('en')}
        className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-lato font-semibold transition-all duration-200 border ${language === 'en'
          ? 'bg-[#04cf9c] text-white border-[#04cf9c]'
          : 'bg-transparent text-white border-white/30 hover:bg-white/10 hover:border-white/50'
          }`}
        aria-label="Switch to English"
        type="button"
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('fr')}
        className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-lato font-semibold transition-all duration-200 border ${language === 'fr'
          ? 'bg-[#04cf9c] text-white border-[#04cf9c]'
          : 'bg-transparent text-white border-white/30 hover:bg-white/10 hover:border-white/50'
          }`}
        aria-label="Switch to French"
        type="button"
      >
        FR
      </button>
    </div>
  );
}
