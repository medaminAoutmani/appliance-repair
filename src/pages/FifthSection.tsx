"use client";
import React from 'react'
import Image from 'next/image'
import GithubCardSkew from '@/components/ui/GithubCardSkew'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageProviderWrapper } from '@/components/providers/LanguageProviderWrapper';

function FifthSection() {
  const { t } = useLanguage();

  return (
    <section className="w-full h-full bg-[#353b60] flex flex-col items-center justify-center " >
      <Image
        src="/appliance6.jpg"
        alt='background1'
        width={500}
        height={500}
        className='w-full h-full object-contain absolute mix-blend-overlay opacity-20'
      />
      <div className="relative h-full w-full lg:w-[90%] xl:w-[79%] flex flex-col items-center justify-center py-16 sm:py-24 gap-8 md:gap-10 xl:gap-20">
        <div className='text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-lato text-wrap font-extrabold text-white lg:leading-tight max-w-5xl mx-auto text-center tracking-normal  '>
          {t('fifthSection.title')}
        </div>
        <div className='relative w-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-2 lg:gap-10 xl:gap-24'>

          <GithubCardSkew className='relative w-[95%] sm:w-[70%] md:w-[48%] h-full md:h-[420px] lg:w-[500px] lg:h-[488px] flex flex-col items-center justify-center bg-[rgba(255,255,255,0.2)] p-2 sm:p-8 md:p-2 lg:p-8 rounded-[30px] '>
            <div className='relative flex items-center justify-center font-lato text-2xl sm:text-xl md:text-2xl xl:text-3xl text-white font-extrabold'>
              {t('fifthSection.howWeWork')}
            </div>
            <div className='relative flex items-center justify-center'>
              <div className='relative flex items-center justify-center gap-5'>
                <div className='relative flex-col flex items-center justify-center mb-4'>
                  <motion.div
                    className='w-[40px] h-[40px] sm:w-[70px] sm:h-[70px] md:w-[40px] md:h-[40px] lg:w-[70px] lg:h-[70px] flex items-center justify-center transition-all duration-300 bg-[#04cf9c] hover:bg-[#1c1f48] rounded-[10px] '
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                      className='flex items-center justify-center'
                    >
                      <Image
                        src="/list.svg"
                        alt="arrow"
                        width={30}
                        height={30}
                        className='w-[70%] h-[70%] sm:w-full sm:h-full md:w-[70%] md:h-[70%] lg:w-full lg:h-full'
                      />
                    </motion.div>
                  </motion.div>
                  <motion.div
                    className="flex items-center justify-center w-[2px] bg-[#04cf9c] h-[70px] sm:h-10 md:h-[70px] lg:h-10 origin-bottom"
                    initial={{ scaleY: 0 }} // Start with 0 scale
                    whileInView={{ scaleY: 1 }} // Scale to 1 when visible
                    transition={{ type: 'spring', stiffness: 100, delay: 3 }} // Spring transition

                  />
                  <motion.div
                    className='w-[40px] h-[40px] sm:w-[70px] sm:h-[70px] md:w-[40px] md:h-[40px] lg:w-[70px] lg:h-[70px] flex items-center justify-center transition-all duration-300 bg-[#04cf9c] hover:bg-[#1c1f48] rounded-[10px] '
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 100, delay: 3 }}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 5 }}
                      className='flex items-center justify-center'
                    >
                      <Image
                        src="/check.svg"
                        alt="arrow"
                        width={30}
                        height={30}
                        className='w-[70%] h-[70%] sm:w-full sm:h-full md:w-[70%] md:h-[70%] lg:w-full lg:h-full'
                      />
                    </motion.div>
                  </motion.div>
                  <motion.div
                    className="flex items-center justify-center w-[2px] bg-[#04cf9c] h-[70px] sm:h-10 md:h-[70px] lg:h-10 origin-bottom"
                    initial={{ scaleY: 0 }} // Start with 0 scale
                    whileInView={{ scaleY: 1 }} // Scale to 1 when visible
                    transition={{ type: 'spring', stiffness: 100, delay: 6 }} // Spring transition


                  />
                  <motion.div
                    className='w-[40px] h-[40px] sm:w-[70px] sm:h-[70px] md:w-[40px] md:h-[40px] lg:w-[70px] lg:h-[70px] flex items-center justify-center transition-all duration-300 bg-[#04cf9c] hover:bg-[#1c1f48] rounded-[10px] '
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 100, delay: 6 }}
                  >
                    <motion.div
                      className='flex items-center justify-center'
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 8 }}
                    >
                      <Image
                        src="/tool.svg"
                        alt="arrow"
                        width={30}
                        height={30}
                        className='w-[70%] h-[70%] sm:w-full sm:h-full md:w-[70%] md:h-[70%] lg:w-full lg:h-full'
                      />
                    </motion.div>
                  </motion.div>
                </div>


                <div className='relative w-full flex-col flex items-center justify-center gap-4 mb-4'>
                  <div className='relative h-auto sm:h-24 w-full flex flex-col items-start justify-center lg:gap-0 xl:gap-1'>
                    <div className='relative w-fit font-lato text-left text-xl xl:text-2xl text-white font-extrabold'>
                      {t('fifthSection.scheduleAppointment.title')}
                    </div>
                    <div className={`relative font-roboto f text-left text-sm text-[#e8e8e8] font-thin leading-5 `}>
                      {t('fifthSection.scheduleAppointment.description')}
                    </div>
                  </div>

                  <div className='relative h-auto sm:h-24 w-full flex flex-col items-start justify-center gap-0 xl:gap-1'>
                    <div className='relative w-fit font-lato text-xl xl:text-2xl text-white font-extrabold'>
                      {t('fifthSection.getConfirmation.title')}
                    </div>
                    <div className={`relative font-roboto f text-left text-sm text-[#e8e8e8] font-thin leading-5 `}>
                      {t('fifthSection.getConfirmation.description')}
                    </div>
                  </div>

                  <div className='relative h-auto sm:h-24 w-full flex flex-col items-start justify-center gap-0 xl:gap-1'>
                    <div className='relative w-fit font-lato text-left text-xl xl:text-2xl text-white font-extrabold'>
                      {t('fifthSection.weRepair.title')}
                    </div>
                    <div className={`relative font-roboto f text-left text-sm text-[#e8e8e8] font-thin leading-5 `}>
                      {t('fifthSection.weRepair.description')}
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </GithubCardSkew>
          <GithubCardSkew className='w-[95%] h-full sm:w-[70%] md:w-[48%] md:h-[420px] lg:w-[500px] lg:h-[488px] flex flex-col items-center justify-center bg-[rgba(255,255,255,0.2)] p-2 sm:p-8 md:p-2 lg:p-8 rounded-[30px] '>
            <div className='relative flex items-center justify-center font-lato text-2xl xl:text-3xl text-white text-center font-extrabold px-8'>
              {t('fifthSection.qualityService.title')}
            </div>
            <div className={`relative font-roboto text-center text-sm text-[#e8e8e8] font-thin leading-5 lg:px-1 xl:px-4 lg:pb-4 xl:pb-8`}>
              {t('fifthSection.qualityService.description')}
            </div>

            <div className='relative flex items-start justify-center flex-col'>
              <div className='relative flex items-center justify-start pb-4'>
                <Image
                  src="/arrow-green-fill.png"
                  alt="arrow"
                  width={25}
                  height={25}
                />
                <div className='relative font-roboto f text-center text-sm text-[#e8e8e8] font-thin leading-5 px-4 '>{t('fifthSection.qualityService.point1')}</div>
              </div>
              <div className='relative flex items-center justify-center pb-4'>
                <Image
                  src="/arrow-green-fill.png"
                  alt="arrow"
                  width={25}
                  height={25}
                />
                <div className='relative font-roboto f text-center text-sm text-[#e8e8e8] font-thin leading-5 px-4 '>{t('fifthSection.qualityService.point2')}</div>
              </div>

              <div className='relative flex items-center justify-center pb-4'>
                <Image
                  src="/arrow-green-fill.png"
                  alt="arrow"
                  width={25}
                  height={25}
                />
                <div className='relative font-roboto f text-center text-sm text-[#e8e8e8] font-thin leading-5 px-4 '>{t('fifthSection.qualityService.point3')}</div>
              </div>

              <div className='relative flex items-center justify-center pb-2'>
                <Image
                  src="/arrow-green-fill.png"
                  alt="arrow"
                  width={25}
                  height={25}
                />
                <div className='relative font-roboto f text-center text-sm text-[#e8e8e8] font-thin leading-5 px-4 '>{t('fifthSection.qualityService.point4')}</div>
              </div>
            </div>
          </GithubCardSkew>
        </div>
      </div>
    </section>
  )
}

export default function FifthSectionPage() {
  return (
    <LanguageProviderWrapper>
      <FifthSection />
    </LanguageProviderWrapper>
  );
}