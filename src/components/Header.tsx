"use client";
import React from 'react'
import CallIcon from '@mui/icons-material/Call';
import DraftsIcon from '@mui/icons-material/Drafts';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { NavbarDemo } from './Navbar';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';




function Header() {
  const { t, language } = useLanguage();

  return (
    <div className='w-full h-fit flex flex-col items-center justify-start'> {/**h-36 */}
      <div className='w-full h-[54px] bg-[#1c1f48] flex items-center justify-center px-5 lg:px-7 xl:px-4' >
        <div className='hidden lg:flex lg:w-full xl:w-[79%] h-full items-center justify-center md:justify-between'>
          <div className=' h-full flex items-center justify-center lg:gap-10 xl:gap-20'>
            <div className='w-auto flex items-center justify-center flex-row font-lato'>
              <CallIcon sx={{ width: '20px', height: '20px', color: "#04cf9c" }} />
              <div className='text-base text-white font-lato tracking-normal font-extrabold ml-3'>{t('header.phone')}</div>
            </div>
            <div className='hidden w-auto lg:flex items-center justify-center flex-row'>
              <DraftsIcon sx={{ width: '20px', height: '20px', color: "#04cf9c" }} />
              <div className='text-base text-white font-lato tracking-normal font-extrabold ml-3'>{t('header.email')}</div>
            </div>
            <div className='hidden w-auto lg:flex items-center justify-center flex-row'>
              <LocationOnIcon sx={{ width: '20px', height: '20px', color: "#04cf9c" }} />
              <div className='text-base text-white font-lato tracking-normal font-extrabold ml-3'>{t('header.location')}</div>
            </div>
          </div>
          <div className='w-auto h-full flex items-center justify-end gap-2 sm:gap-3 flex-shrink-0'>
            <div className="flex-shrink-0">
              <LanguageSwitcher />
            </div>
            {/** 
            <div className='w-8 h-8 flex rounded-sm bg-[#04cf9c] justify-center items-center flex-shrink-0'>
              <FaFacebook className='text-white w-4 h-4' />
            </div>
            <div className='w-8 h-8 flex rounded-sm bg-[#04cf9c] justify-center items-center flex-shrink-0'>
              <BsTwitterX className='text-white w-4 h-4' />
            </div>
            <div className='w-8 h-8 flex rounded-sm bg-[#04cf9c] justify-center items-center flex-shrink-0'>
              <FaYoutube className='text-white w-4 h-4' />
            </div>
            */}
          </div>
        </div>
        <div className='flex lg:hidden w-full h-full items-center justify-between '>
          <div className=' h-full flex items-center justify-center md:gap-5'>
            <div className='w-auto flex items-center justify-center flex-row font-lato'>
              <CallIcon sx={{ width: '20px', height: '20px', color: "#04cf9c" }} />
              <div className='text-base text-white font-lato tracking-normal font-extrabold ml-3'>{t('header.phone')}</div>
            </div>
            <div className='hidden md:flex w-auto items-center justify-center flex-row'>
              <DraftsIcon sx={{ width: '20px', height: '20px', color: "#04cf9c" }} />
              <div className='text-base text-white font-lato tracking-normal font-extrabold ml-3'>{t('header.email')}</div>
            </div>
            <div className='hidden md:flex w-auto items-center justify-center flex-row'>
              <LocationOnIcon sx={{ width: '20px', height: '20px', color: "#04cf9c" }} />
              <div className='text-base text-white font-lato tracking-normal font-extrabold ml-3'>{t('header.location')}</div>
            </div>
          </div>
          <div className='md:w-auto lg:w-60 h-full flex items-center justify-end gap-1 sm:gap-2 flex-shrink-0'>
            <div className="flex-shrink-0">
              <LanguageSwitcher />
            </div>
            {/** 
            <div className='w-8 h-8 flex rounded-sm bg-[#04cf9c] justify-center items-center flex-shrink-0'>
              <FaFacebook className='text-white w-4 h-4' />
            </div>
            <div className='w-8 h-8 flex rounded-sm bg-[#04cf9c] justify-center items-center flex-shrink-0'>
              <BsTwitterX className='text-white w-4 h-4' />
            </div>
            <div className='w-8 h-8 flex rounded-sm bg-[#04cf9c] justify-center items-center flex-shrink-0'>
              <FaYoutube className='text-white w-4 h-4' />
            </div>
            */}
          </div>
        </div>
      </div>
      <div className='max-w-7xl h-14 flex items-center justify-center my-3'>
        <NavbarDemo />
      </div>
    </div>
  )
}

export default Header