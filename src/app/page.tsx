"use client"
import React, { useState, useEffect } from "react";
import Hero from "@/pages/Hero";
import Header from "../components/Header";
import Preloader from "../components/Preloader";
import { Suspense } from 'react'
import { CarouselDemo } from "@/components/PartnerBar";
import FirstSection from "@/pages/FirstSection";
import SecondeSection from "@/pages/SecondeSection";
import ThirdSection from "@/pages/ThirdSection";
import ForthSection from "@/pages/ForthSection";
import FifthSection from "@/pages/FifthSection";
import SixthSection from "@/pages/SixthSection";
import SeventhSection from "@/pages/SeventhSection";
import { MotionDiv } from "@/lib/framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";


export default function Home() {
  const [loading, setLoading] = useState(true)
  const { language, t } = useLanguage();

  useEffect(() => {
    setTimeout(() => setLoading(false), 7000)
  }, [])

  return (
    <>
      {!loading ? (
        <main key={language} className="relative w-full  bg-white flex justify-center items-center flex-col  overflow-hidden mx-auto ">
          <div className="w-full h-full">
            <Header />
            <Hero />
            <MotionDiv
              className='lg:w-[90%] xl:w-[79%] h-24 lg:h-28 xl:h-32 px-0 lg:px-12 lg:pl-8 py-7 lg:gap-3 xl:gap-0 relative flex flex-col-reverse lg:flex-row items-center justify-center bg-[#1c1f48] rounded-none lg:rounded-xl top-[-50px] mx-auto '
              initial={{ opacity: 0, y: '100vh' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <CarouselDemo />
              <div className="hidden lg:flex items-center justify-end xl:w-auto lg:w-52 xl:flex-grow ">
                <div className="flex items-center justify-center lg:w-[95%] xl:w-[80%] text-center font-semibold text-white lg:text-[22px] xl:text-2xl">
                  {t('page.repairingBrands')}
                </div>
              </div>
            </MotionDiv>
            <FirstSection />
            <SecondeSection />
            <ThirdSection />
            <ForthSection />
            <FifthSection />
            <SeventhSection />
            <SixthSection />
          </div>
        </main>
      ) : (
        <Preloader />
      )}
    </>

  );
}
