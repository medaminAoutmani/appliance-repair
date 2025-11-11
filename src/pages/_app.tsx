import type { AppProps } from 'next/app';
import { LanguageProviderWrapper } from '@/components/providers/LanguageProviderWrapper';
import '@/app/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LanguageProviderWrapper>
      <Component {...pageProps} />
    </LanguageProviderWrapper>
  );
}

