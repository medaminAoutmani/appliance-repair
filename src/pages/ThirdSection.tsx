"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import Counter from '@/components/ui/text/counter'
import { FaPlus } from "react-icons/fa";
import FormCard from '@/components/ui/formCard';
import { Roboto } from 'next/font/google';
import { useLanguage } from '@/contexts/LanguageContext';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});


function ThirdSection() {
  const { t } = useLanguage();

  const [isHoveredArrow1, setIsHoveredArrow1] = useState(false);
  const [isHoveredArrow2, setIsHoveredArrow2] = useState(false);
  const [isHoveredLike, setIsHoveredLike] = useState(false);
  const [isHoveredClients, setIsHoveredClients] = useState(false);
  const [isHoveredSuccess, setIsHoveredSuccess] = useState(false);

  return (
    <section id="air-conditioning" className="relative w-full h-full bg-gradient-to-t from-[#08ac86] via-[#1c7872] to-[#3b3e61] flex flex-col items-center justify-center mt-20 sm:mt-40 md:mt-0 py-12 md:py-0" >
      <Image
        src="/appliance5.jpg"
        alt='background1'
        fill
        className='w-full h-full object-cover absolute mix-blend-overlay opacity-20'
      />
      <div className="relative h-full w-[95%] md:w-[92%] lg:w-[90%] xl:w-[79%] flex flex-col items-center justify-center py-4 md:py-14 lg:py-16 xl:py-24">
        <div className='relative w-full flex items-center justify-center'>
          <div className='relative w-full pb-8 md:pb-10 lg:pb-16 border-b flex flex-col sm:flex-row items-stretch md:items-center justify-center gap-6 md:gap-0'>
            <div className='relative w-full md:w-1/3 h-fit flex items-center justify-center gap-5'>
              <div
                className='w-[50px] h-[50px] sm:w-[40px] sm:h-[40px] md:w-[60px] md:h-[60px] lg:w-[75px] lg:h-[75px] bg-white hover:bg-[#04cf9c] transition-all duration-300 rounded-[10px] flex items-center justify-center'
                onMouseEnter={() => setIsHoveredLike(true)}
                onMouseLeave={() => setIsHoveredLike(false)}
              >
                <Image
                  src={isHoveredLike ? "/like-white.png" : "/like.png"}
                  alt='like'
                  width={36}
                  height={36}
                  className='w-[35px] h-[35px] sm:w-[30px] sm:h-[30px] md:w-[36px] md:h-[36px] lg:w-[40px] lg:h-[40px] z-20'
                />
              </div>
              <div className='relative flex items-center justify-center flex-col'>
                <div className='relative flex items-center justify-center gap-2'>
                  <Counter targetValue={1000} className="text-white text-[23px] sm:text-[20px] md:text-[32px] lg:text-[40px]" />
                  <FaPlus className='text-white w-4 h-4 sm:w-3 sm:h-3 md:w-5 md:h-5 lg:w-6 lg:h-6 mt-1' />
                </div>
                <div className='text-sm sm:text-xs md:text-sm text-[#e8e8e8]'>
                  {t('thirdSection.successfulProject')}
                </div>
              </div>
            </div>
            <div className='relative w-full md:w-1/3 md:border-x h-fit flex items-center justify-center gap-5'>
              <div className='w-[50px] h-[50px] sm:w-[40px] sm:h-[40px] md:w-[60px] md:h-[60px] lg:w-[75px] lg:h-[75px] bg-white hover:bg-[#04cf9c] transition-all duration-300 rounded-[10px] flex items-center justify-center'
                onMouseEnter={() => setIsHoveredClients(true)}
                onMouseLeave={() => setIsHoveredClients(false)}
              >
                <Image
                  src={isHoveredClients ? "/group-white.png" : "/group.png"}
                  alt='happy clients'
                  width={36}
                  height={36}
                  className='w-[35px] h-[35px] sm:w-[30px] sm:h-[30px] md:w-[36px] md:h-[36px] lg:w-[40px] lg:h-[40px] z-20'
                />
              </div>
              <div className='relative flex items-center justify-center flex-col'>
                <div className='relative flex items-center justify-center gap-2'>
                  <Counter targetValue={1000} className="text-white text-[23px] sm:text-[20px] md:text-[32px] lg:text-[40px]" />
                  <FaPlus className='text-white w-3 h-3 md:w-5 md:h-5 lg:w-6 lg:h-6 mt-1' />
                </div>
                <div className='text-sm sm:text-xs md:text-sm text-[#e8e8e8]'>
                  {t('thirdSection.happyClients')}
                </div>
              </div>
            </div>
            <div className='relative w-full md:w-1/3 h-fit flex items-center justify-center gap-5'>
              <div
                className='w-[50px] h-[50px] sm:w-[40px] sm:h-[40px] md:w-[60px] md:h-[60px] lg:w-[75px] lg:h-[75px] bg-white hover:bg-[#04cf9c] transition-all duration-300 rounded-[10px] flex items-center justify-center'
                onMouseEnter={() => setIsHoveredSuccess(true)}
                onMouseLeave={() => setIsHoveredSuccess(false)}
              >
                <Image
                  src={isHoveredSuccess ? "/like-white.png" : "/like.png"}
                  alt='like'
                  width={36}
                  height={36}
                  className='w-[35px] h-[35px] sm:w-[30px] sm:h-[30px] md:w-[36px] md:h-[36px] lg:w-[40px] lg:h-[40px] z-20'
                />
              </div>
              <div className='relative flex items-center justify-center flex-col'>
                <div className='relative flex items-center justify-center gap-2'>
                  <Counter targetValue={1000} className="text-white text-[23px] sm:text-[20px] md:text-[32px] lg:text-[40px]" />
                  <FaPlus className='text-white w-3 h-3 md:w-5 md:h-5 lg:w-6 lg:h-6 mt-1' />
                </div>
                <div className='text-sm sm:text-xs md:text-sm text-[#e8e8e8]'>
                  {t('thirdSection.successfulProject')}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='relative w-full flex flex-col-reverse md:flex-row items-center justify-center mt-14 md:mt-12 gap-14 md:gap-10 xl:gap-14'>
          <FormCard />
          <div className='relative w-full px-2 sm:px-8 md:px-0 md:w-[55%] lg:w-[550px] xl:w-[620px] flex-col flex items-center justify-center sm:items-start sm:justify-start'>
            <h4 className="w-full lg:w-full xl:w-[90%] text-4xl md:text-3xl lg:text-[42px] xl:text-5xl font-lato font-extrabold text-white leading-tight lg:leading-tight max-w-5xl text-center sm:text-left tracking-tight  ">
              {t('thirdSection.mainTitle')}
            </h4>

            <p className="w-full text-base md:text-sm lg:text-base xl:text-lg max-w-4xl  mt-4 mb-8 text-white sm:text-left text-center font-normal">
              {t('thirdSection.description')}
            </p>

            <div className='relative w-full h-full flex flex-col items-center justify-center pb-4 border-b border-[#b6bcc8]'>
              <div className='relative w-full h-auto md:h-24 flex items-start md:items-center justify-center gap-6 md:gap-8 mb-4'>
                <div
                  className='w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px] flex items-center justify-center transition-all duration-300 bg-[#1c1f48] hover:bg-white rounded-[10px] '
                  onMouseEnter={() => setIsHoveredArrow1(true)}
                  onMouseLeave={() => setIsHoveredArrow1(false)}
                >
                  <Image
                    src={isHoveredArrow1 ? "/arrow-blue.png" : "/arrow.png"}
                    alt="arrow"
                    width={24}
                    height={24}
                  />
                </div>
                <div className='relative w-[calc(100%-84px)] md:w-[calc(100%-100px)] flex flex-col items-start justify-center gap-1'>
                  <div className='relative w-fit h-9 leading-9 font-lato text-left text-xl sm:text-2xl md:text-xl lg:text-2xl text-white font-extrabold'>
                    {t('thirdSection.professionalInstallation.title')}
                  </div>
                  <div className={`relative ${roboto.className} f text-left text-sm text-[#e8e8e8] font-thin leading-5 `}>
                    {t('thirdSection.professionalInstallation.description')}
                  </div>
                </div>
              </div>

              <div className='relative w-full h-auto md:h-24 flex items-start md:items-center justify-center gap-6 md:gap-8'>
                <div
                  className='w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px] flex items-center justify-center transition-all duration-300 bg-[#1c1f48] hover:bg-white rounded-[10px] '
                  onMouseEnter={() => setIsHoveredArrow2(true)}
                  onMouseLeave={() => setIsHoveredArrow2(false)}
                >
                  <Image
                    src={isHoveredArrow2 ? "/arrow-blue.png" : "/arrow.png"}
                    alt="arrow"
                    width={24}
                    height={24}
                  />
                </div>
                <div className='relative w-[calc(100%-84px)] md:w-[calc(100%-100px)] flex flex-col items-start justify-center gap-1'>
                  <div className='relative w-fit h-9 leading-9 font-lato text-left text-xl sm:text-2xl md:text-xl lg:text-2xl text-white font-extrabold'>
                    {t('thirdSection.customerSatisfaction.title')}
                  </div>
                  <div className={`relative ${roboto.className} f text-left text-sm text-[#e8e8e8] font-thin leading-5 `}>
                    {t('thirdSection.customerSatisfaction.description')}
                  </div>
                </div>
              </div>
            </div>
            <div className='relative w-fit sm:leading-8 leading-6 font-lato text-left text-base md:text-base lg:text-xl xl:text-2xl text-white font-semibold mt-1 md:mt-4'>
              {t('thirdSection.locations')}
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}

export default ThirdSection