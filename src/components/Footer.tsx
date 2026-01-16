"use client";
import { Clock, Phone } from 'lucide-react';
import logo from "../../public/logo-horizontal.png";
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCallback } from 'react';

export default function Footer() {
  const { t } = useLanguage();

  const scrollToSection = useCallback((id: string) => {
    if (typeof window === "undefined") return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const element = document.getElementById(id);
        if (!element) {
          console.warn(`Element with id "${id}" not found`);
          return;
        }

        const yOffset = -80;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const targetPosition = elementPosition + yOffset;

        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: "smooth",
        });
      });
    });
  }, []);

  const handleNavClick = useCallback(
    (event: React.MouseEvent<HTMLElement>, id: string) => {
      event.preventDefault();
      event.stopPropagation();
      scrollToSection(id);
    },
    [scrollToSection]
  );

  return (
    <footer className="bg-[#1c1f48] w-full">
      <div className="max-w-[1140px] mx-auto px-8 sm:px-6 md:px-8 lg:px-4 pt-12 sm:pt-16 md:pt-20 lg:pt-[100px] pb-8 sm:pb-10 md:pb-12 lg:pb-[50px]">
        {/* Main Footer Content */}
        <div className="flex flex-col sm:flex-row flex-wrap mb-6 sm:mb-8">
          {/* Brand Section */}
          <div className="w-full sm:max-w-[290px] md:max-w-[350px] lg:max-w-[431px] flex-1  flex flex-row sm:flex-col items-start justify-between sm:justify-center pb-8 sm:pb-0">
            {/* Logo */}
            <div >
              <Image
                src={logo}
                alt="Air Repair Logo"
                width={200}
                height={88}
                className="h-auto w-auto max-w-[80%] sm:max-w-[200px]"
              />
            </div>

            {/* Description */}
            <div className="mb-[14.4px]">
              <p className="font-['Roboto',sans-serif] text-[#e8e8e8] text-sm sm:text-base leading-[24px] mb-0 whitespace-pre-line">
                {t('footer.description')}
              </p>
            </div>
          </div>

          <div className='w-full flex-1 flex flex-row items-start md:items-center justify-between gap-4'>
            {/* Navigation Section */}
            <div className="w-fit ">
              <h2 className="font-['Lato',sans-serif] font-extrabold text-white text-sm sm:text-base leading-[24px] mb-4 sm:mb-5">
                {t('footer.navigation.title')}
              </h2>
              <div className="space-y-[2.5px] flex flex-col gap-2">
                <p
                  onClick={(event) => handleNavClick(event, "hero")}
                  className="w-fit font-['Roboto',sans-serif] text-[#e8e8e8] text-sm sm:text-base leading-[24px] hover:text-[#04cf9c] transition-colors cursor-pointer inline-block"
                >
                  {t('footer.navigation.home')}
                </p>

                <p
                  onClick={(event) => handleNavClick(event, "about-us")}
                  className="w-fit font-['Roboto',sans-serif] text-[#e8e8e8] text-sm sm:text-base leading-[24px] hover:text-[#04cf9c] transition-colors cursor-pointer inline-block"
                >
                  {t('footer.navigation.aboutUs')}
                </p>

                <p
                  onClick={(event) => handleNavClick(event, "repair")}
                  className="w-fit font-['Roboto',sans-serif] text-[#e8e8e8] text-sm sm:text-base leading-[24px] hover:text-[#04cf9c] transition-colors cursor-pointer inline-block"
                >
                  {t('footer.navigation.services')}
                </p>
              </div>
            </div>

            {/* Work Hours Section */}
            <div className="w-full max-w-[170px] sm:w-[60%] md:w-auto md:flex-1 sm:max-w-[243px]">
              <h2 className="font-['Lato',sans-serif] font-extrabold text-white text-sm sm:text-base leading-[24px] mb-4 sm:mb-5">
                {t('footer.workHours.title')}
              </h2>

              <div className="flex items-center gap-[5px] mb-4 sm:mb-5">
                <Clock className="w-[14px] h-[14px] text-[#04cf9c] flex-shrink-0" />
                <span className="font-['Roboto',sans-serif] text-[#e8e8e8] text-sm sm:text-base leading-[24px]">
                  {t('footer.workHours.hours')}
                </span>
              </div>

              <a
                href="tel:+212670687954"
                className="bg-[#1c1f48] border border-[#04cf9c] rounded-[10px] px-6 sm:px-[40.8px] py-3 sm:py-[20px] flex items-center justify-center gap-2 hover:bg-[#04cf9c] transition-colors group w-full h-12 sm:h-14"
              >
                <Phone className="w-[15px] h-[15px] text-white" />
                <span className="font-['Roboto',sans-serif] text-white text-sm sm:text-[15px] leading-[15px]">
                  {t('footer.callUs')}
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[rgba(255,255,255,0.33)] my-3 sm:my-[15px]" />

        {/* Copyright */}
        <div className="text-center">
          <p className="font-['Roboto',sans-serif] text-white text-sm sm:text-base leading-[24px] mb-0">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
