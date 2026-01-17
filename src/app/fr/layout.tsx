import type { Metadata } from "next";
import "../globals.css";
import { LanguageProviderWrapper } from "@/components/providers/LanguageProviderWrapper";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "Tabrid Rraha | Services de Réparation d'Appareils et Climatisation",
    template: "%s | Tabrid Rraha",
  },
  description:
    "Tabrid Rraha fournit des services professionnels de réparation d'appareils incluant la réparation de climatiseurs, réfrigérateurs, machines à laver et fours. Service rapide et fiable auquel vous pouvez faire confiance.",
  keywords: [
    "Tabrid Rraha",
    "réparation d'appareils",
    "réparation climatisation",
    "réparation réfrigérateur",
    "réparation machine à laver",
    "service électroménager",
    "réparation four",
    "réparation lave-vaisselle",
  ],
  authors: [{ name: "Tabrid Rraha" }],
  creator: "Tabrid Rraha",
  metadataBase: new URL("https://tabrid-rraha.vercel.app"),
  alternates: {
    canonical: "/fr",
    languages: {
      "fr": "/fr",
      "en": "/",
    },
  },
  verification: {
    google: "tpA-ym_S_vOs04rG90S47y3fA5cvOqIXQT5jlBpTGfc",
  },
  openGraph: {
    title: "Tabrid Rraha | Services de Réparation d'Appareils et Climatisation",
    description:
      "Tabrid Rraha fournit des services professionnels de réparation d'appareils incluant la réparation de climatiseurs, réfrigérateurs, machines à laver et fours.",
    url: "https://tabrid-rraha.vercel.app/fr",
    siteName: "Tabrid Rraha",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tabrid Rraha | Services de Réparation d'Appareils",
    description:
      "Services professionnels de réparation d'appareils et climatisation à Rabat, Maroc.",
  },
};

export default function FrenchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <Script
          src="https://elfsightcdn.com/platform.js"
          strategy="lazyOnload"
          async
        />
        <LanguageProviderWrapper defaultLanguage="fr">
          {children}
        </LanguageProviderWrapper>
      </body>
    </html>
  );
}

