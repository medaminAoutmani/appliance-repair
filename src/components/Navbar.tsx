"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { HiOutlineMenu } from "react-icons/hi";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { MotionDiv, MotionP } from "@/lib/framer-motion";
import Image from 'next/image';
import logo from "../../public/logo-horizontal.png"
import MagicButton from "./ui/MagicButton";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function NavbarDemo() {
  const [isAtTop, setIsAtTop] = useState<boolean>(true);
  const { scrollYProgress } = useScroll();
  // set true for the initial state so that nav bar is visible in the hero section
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        // also set true for the initial state
        setVisible(true);
      } else {
        if (direction < 0 || window.scrollY < 200) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  useEffect(() => {
    // Scroll event handler
    const handleScroll = () => {
      // Check if the scroll position is at the top
      setIsAtTop(window.scrollY < 50);
    };

    // Add event listener for scroll
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative h-14 w-[100vw] flex items-center justify-center">
      <Navbar className={` h-14 ${!isAtTop ? 'fixed max-w-[92%] lg:max-w-4xl top-5 translate-y-5 mt-0 rounded-none' : 'fixed max-w-full lg:max-w-[81%] transform-none '}`} isAtTop={isAtTop} visible={visible} />
    </div>
  );
}

function Navbar({ className, isAtTop, visible }: { className?: string; isAtTop: boolean; visible: boolean }) {
  const [active, setActive] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const { t, language } = useLanguage();

  const scrollToSection = useCallback((id: string) => {
    if (typeof window === "undefined") return;
    const element = document.getElementById(id);
    if (!element) return;

    const yOffset = -80;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const targetPosition = elementPosition + yOffset;

    window.scrollTo({
      top: targetPosition < 0 ? 0 : targetPosition,
      behavior: "smooth",
    });
  }, []);

  const closeMenuAndScroll = useCallback(
    (id: string) => {
      setIsMobileMenuOpen(false);
      requestAnimationFrame(() => {
        scrollToSection(id);
      });
    },
    [scrollToSection]
  );

  const handleNavClick = useCallback(
    (event: React.MouseEvent<HTMLElement>, id: string) => {
      event.preventDefault();
      setActive(null);
      closeMenuAndScroll(id);
    },
    [closeMenuAndScroll]
  );

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!navRef.current || (target && navRef.current.contains(target))) {
        return;
      }
      setIsMobileMenuOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <AnimatePresence mode="wait">
      <MotionDiv
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn("flex items-center justify-center inset-x-0 z-50 mx-auto filter transition-all duration-500", className)}
        layout
      >
        <Menu
          ref={navRef}
          setActive={setActive}
          isAtTop={isAtTop}
          isExpanded={isMobileMenuOpen}
        >
          <div className="flex w-full items-center justify-between gap-3">
            <Image
              src={logo}
              alt="image"
              width={100}
              height={100}
            />
            <MotionDiv
              className={`hidden lg:flex max-w-full items-center justify-center transition-all duration-700 ${!isAtTop ? 'gap-7' : 'gap-10'}`}
            >
              <MotionP
                transition={{ duration: 0.3 }}
                className=" cursor-pointer text-[#1c1f48] text-base font-bold transition-all duration-200 hover:text-[#04cf9c] dark:text-white"
                onClick={(event) => handleNavClick(event, "hero")}
              >
                {t('navbar.home')}
              </MotionP>
              <MotionP
                transition={{ duration: 0.3 }}
                className="cursor-pointer text-[#1c1f48] text-base font-bold transition-all duration-200 hover:text-[#04cf9c] dark:text-white"
                onClick={(event) => handleNavClick(event, "about-us")}
              >
                {t('navbar.aboutUs')}
              </MotionP>
              <MenuItem setActive={setActive} active={active} item={t('navbar.services')}>
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink
                    href="#repair"
                    onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                      event.preventDefault();
                      setActive(null);
                      closeMenuAndScroll("repair");
                    }}
                  >
                    {t('navbar.repair')}
                  </HoveredLink>
                  <HoveredLink
                    href="#air-conditioning"
                    onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                      event.preventDefault();
                      setActive(null);
                      closeMenuAndScroll("air-conditioning");
                    }}
                  >
                    {t('navbar.airConditioningInstallation')}
                  </HoveredLink>
                </div>
              </MenuItem>
              <MotionP
                transition={{ duration: 0.3 }}
                className="cursor-pointer text-[#1c1f48] text-base font-bold transition-all duration-200 hover:text-[#04cf9c] dark:text-white"
                onClick={(event) => handleNavClick(event, "reviews")}
              >
                {t('navbar.reviews')}
              </MotionP>
            </MotionDiv>
            <MagicButton
              button="hidden lg:felx xl:flex h-8 hover:scale-110"
              border="bg-[conic-gradient(from_90deg_at_50%_50%,#FFFFFF_0%,#04cf9c_50%,#FFFFFF_100%)] "
              content="bg-white text-[#1c1f48] hover:bg-[#04cf9c] "
              title={t('navbar.orderNow')}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleNavClick(event as React.MouseEvent<HTMLElement>, "contact")}
            />
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="flex lg:hidden items-center justify-center w-10 h-10 rounded-md border border-transparent transition-colors duration-200 hover:border-[#04cf9c]"
              aria-label="Toggle navigation menu"
            >
              <HiOutlineMenu className="cursor-pointer text-[#1c1f48] hover:text-[#04cf9c] w-6 h-6 transition-all duration-100" />
            </button>
          </div>
          <AnimatePresence>
            {isMobileMenuOpen && (
              <MotionDiv
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col lg:hidden w-full pt-2 pb-1 space-y-3"
              >
                <MotionP
                  transition={{ duration: 0.3 }}
                  className="text-left text-[#1c1f48] text-base font-bold cursor-pointer hover:text-[#04cf9c]"
                  onClick={(event) => handleNavClick(event, "hero")}
                >
                  {t('navbar.home')}
                </MotionP>
                <MotionP
                  transition={{ duration: 0.3 }}
                  className="text-left text-[#1c1f48] text-base font-bold cursor-pointer hover:text-[#04cf9c]"
                  onClick={(event) => handleNavClick(event, "about-us")}
                >
                  {t('navbar.aboutUs')}
                </MotionP>
                <div className="flex flex-col space-y-2">
                  <MotionP className="text-left text-[#1c1f48] text-base font-bold">
                    {t('navbar.services')}
                  </MotionP>
                  <button
                    type="button"
                    className="text-left text-sm font-semibold text-[#485075] hover:text-[#04cf9c]"
                    onClick={(event) => {
                      event.preventDefault();
                      setActive(null);
                      closeMenuAndScroll("repair");
                    }}
                  >
                    {t('navbar.repair')}
                  </button>
                  <button
                    type="button"
                    className="text-left text-sm font-semibold text-[#485075] hover:text-[#04cf9c]"
                    onClick={(event) => {
                      event.preventDefault();
                      setActive(null);
                      closeMenuAndScroll("air-conditioning");
                    }}
                  >
                    {t('navbar.airConditioningInstallation')}
                  </button>
                </div>
                <MotionP
                  transition={{ duration: 0.3 }}
                  className="text-left text-[#1c1f48] text-base font-bold cursor-pointer hover:text-[#04cf9c]"
                  onClick={(event) => handleNavClick(event, "reviews")}
                >
                  {t('navbar.reviews')}
                </MotionP>
              </MotionDiv>
            )}
          </AnimatePresence>
        </Menu>
      </MotionDiv>
    </AnimatePresence>
  );
}





