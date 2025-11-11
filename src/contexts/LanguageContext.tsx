"use client";
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react';
import enTranslations from '../../locales/en/common.json';
import frTranslations from '../../locales/fr/common.json';


type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: enTranslations,
  fr: frTranslations,
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load saved language from localStorage
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language') as Language;
      if (savedLang && (savedLang === 'en' || savedLang === 'fr')) {
        setLanguageState(savedLang);
      }
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  }, []);

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    const currentTranslations = translations[language];

    if (!currentTranslations) {
      return key;
    }
    let value: string | Record<string, unknown> = currentTranslations;
    for (const k of keys) {
      if (typeof value === 'object' && value !== null && k in value) {
        value = value[k] as string | Record<string, unknown>;
      } else {
        return key;
      }
      if (value === undefined) {
        return key;
      }
    }
    return (typeof value === 'string' ? value : key) || key;
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t,
  }), [language, setLanguage, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

