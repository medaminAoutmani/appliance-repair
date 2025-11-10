"use client";
import Image from 'next/image'
import React from 'react'
import background1 from '../../public/Background-1.png'
import repairMan from '../../public/repair-man2.png'
import repairManMobile from '../../public/repair-man-mobile.png'
import Typewriter from '@/lib/Typewriter'
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import WordRotate from '@/components/ui/text/word-rotate'
import MagicButton from '@/components/ui/MagicButton'
import BoxReveal from '@/components/ui/box-reveal'
import { MotionDiv } from '@/lib/framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'



function Hero() {
  const { t, language } = useLanguage();

  const scrollToContact = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const element = document.getElementById('contact');
    if (!element) return;

    const yOffset = -80;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const targetPosition = elementPosition + yOffset;

    window.scrollTo({
      top: targetPosition < 0 ? 0 : targetPosition,
      behavior: 'smooth',
    });
  };

  return (

    <MotionDiv
      id="hero"
      className="relative w-full md:h-fit lg:h-[85vh] xl:h-[90vh] bg-[url('/white-bg.png')] bg-cover bg-center bg-[#e5ebf5] flex justify-center items-center flex-col overflow-hidden mx-auto "
      initial={{ opacity: 0, y: '100vh' }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}

    >
      <BackgroundBeamsWithCollision className="h-full">
        <div className='relative w-full lg:w-[90%] xl:w-[79%] h-full flex items-center justify-center  lg:flex-row flex-col'>
          <div className='relative w-[90%] sm:w-[95%] md:w-[80%] h-fit lg:h-full flex flex-col items-center lg:items-start justify-center lg:justify-start pt-[70px] xl:pt-[100px] gap-5 text-left text-6xl xl:text-[72px] text-[#1c1f48] leading-[72px]  font-bold  font-lato'>
            <BoxReveal boxColor={"#04cf9c"} duration={0.7} delay={0.5}>
              <div className={`relative text-wrap items-center lg:items-start justify-center flex flex-col`}>
                <div className={`relative flex flex-row items-center justify-start ${language == 'en' ? 'w-[400px] sm:w-[575px] xl:w-[690px]' : 'w-[380px] sm:w-[590px] lg:w-[680px]'}`}>
                  <span className='left-0 text-4xl sm:text-6xl lg:text-6xl xl:text-7xl'>{t('hero.trusted')} </span>
                  <WordRotate
                    className={` ml-3 bg-gradient-to-t from-[#08ac86] via-[#1c7872] to-[#3b3e61] bg-clip-text text-transparent dark:text-white ${language == 'en' ? 'text-4xl sm:text-6xl py-1' : 'text-4xl sm:text-6xl lg:text-[66px] lg:leading-[1] py-0'}`}
                    words={[t('hero.experts'), t('hero.specialists'), t('hero.professionals')]}
                  />
                </div>
                <h4 className={`flex ${language == 'en' ? 'text-3xl sm:text-[42px] xl:text-[43px] leading-[45px] flex-row' : 'text-3xl sm:text-4xl flex-col text-center'}`}> {t('hero.forAllYour')} <span className={`hidden lg:flex ${language == 'en' ? 'px-2' : ''}`}>{t('hero.repair')}</span> {language == 'en' ? t('hero.needs') : null}</h4>
              </div>
            </BoxReveal>
            <BoxReveal boxColor={"#04cf9c"} duration={0.7} delay={0.5}>
              <div className='w-full flex items-center justify-center lg:justify-start mb-6 lg:mb-8 gap-3'>
                <div className='w-16 h-14 hidden lg:flex items-center justify-start border-r border-[#bababa]'>
                  <Image
                    src="/technical.svg"
                    alt='technical'
                    className=''
                    width={50}
                    height={50}
                  />
                </div>
                <div className='flex w-full lg:w-[60%] flex-col items-start justify-center leading-6 text-base font-normal text-[#7a7a7a]'>
                  <p className={`hidden lg:flex items-center justify-center `}>
                    {t('hero.description')}
                  </p>
                  <p className='hidden lg:flex items-center justify-center'>
                    {t('hero.description2')}
                  </p>
                  <p className='lg:hidden flex w-full items-center justify-center text-center '>
                    {t('hero.mobileDescription')}
                  </p>
                </div>
              </div>
            </BoxReveal>
            <BoxReveal boxColor={"#04cf9c"} duration={0.7} delay={0.5}>
              <div className='flex items-start lg:items-start justify-center lg:justify-start h-24 lg:h-20'>
                <MagicButton
                  button="felx h-16 lg:h-14 w-52 lg:w-44 z-10 "
                  border="bg-[conic-gradient(from_90deg_at_50%_50%,#FFFFFF_0%,#04cf9c_50%,#FFFFFF_100%)] "
                  content="bg-[#f2f2f2] text-[#1c1f48] hover:bg-[#04cf9c] text-2xl font-extrabold lg:text-lg"
                  title={t('hero.orderNow')}
                  onClick={scrollToContact}
                />
              </div>

            </BoxReveal>
          </div>
          <MotionDiv
            className='relative w-[320px] lg:w-[320px] xl:w-[470px] mr-7 h-[50%] lg:h-full flex items-center justify-start  lg:bg-gradient-to-t from-[#08ac86] via-[#1c7872] to-[#3b3e61]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.5 }}
          >
            <Image
              src={background1}
              alt='background1'
              className='hidden lg:w-[320px] xl:w-full h-full object-cover absolute mix-blend-overlay opacity-20'
            />
            <MotionDiv
              className='lg:left-[-80px] xl:left-0 w-[420px] xl:w-[440px] 2xl:w-[460px] lg:bottom-[-100px] lg:absolute '
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.7, duration: 0.5 }}
            >
              <Image
                src={repairMan}
                alt='repair-man'

                className='hidden lg:flex w-full  object-contain '
              />
              <Image
                src={repairManMobile}
                alt='repair-man-mobile'

                className=' w-full lg:hidden  object-contain '
              />
            </MotionDiv>
          </MotionDiv>
        </div>
      </BackgroundBeamsWithCollision>
    </MotionDiv>
  )
}

export default Hero