"use client";
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ReactNode } from 'react';

export function LanguageProviderWrapper({ children, defaultLanguage }: { children: ReactNode; defaultLanguage?: 'en' | 'fr' }) {
  return <LanguageProvider defaultLanguage={defaultLanguage}>{children}</LanguageProvider>;
}

