import type { Metadata } from "next";
import "./globals.css";
import { LanguageProviderWrapper } from "@/components/providers/LanguageProviderWrapper";
import Script from "next/script";



export const metadata: Metadata = {
  title: {
    default: "Tabrid Rraha | Appliance & AC Repair Services",
    template: "%s | Tabrid Rraha",
  },
  description:
    "Tabrid Rraha provides professional appliance repair services including air conditioner, refrigerator, washing machine, and oven repair. Fast, reliable service you can trust.",
  keywords: [
    "Tabrid Rraha",
    "appliance repair",
    "AC repair",
    "refrigerator repair",
    "washing machine repair",
    "home appliance service",
  ],
  authors: [{ name: "Tabrid Rraha" }],
  creator: "Tabrid Rraha",
  metadataBase: new URL("https://tabrid-rraha.vercel.app"), // change if you add custom domain
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Script
          src="https://elfsightcdn.com/platform.js"
          strategy="lazyOnload"
          async
        />
        <LanguageProviderWrapper>
          {children}
        </LanguageProviderWrapper>
      </body>
    </html>
  );
}
