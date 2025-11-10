"use client";
import { HoverEffect } from '@/components/ui/cardHoverEffect'
import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext';

function ForthSection() {
  const { t, language } = useLanguage();

  return (
    <section className='w-full h-full flex flex-col items-center justify-center pb-10 lg:pb-[100px] pt-28 md:pt-32 '>
      <div className=' relative h-full w-full lg:w-[90%] xl:w-[79%] flex flex-col items-center justify-center px-2 sm:px-0' >
        <div className={`flex ${language == 'en' ? 'flex-col sm:flex-row ' : 'flex-col '} items-center  text-center gap-2 justify-center mb-0 lg:mb-5 font-lato text-xl sm:text-[28px] md:text-[32px] lg:text-4xl xl:text-5xl font-semibold sm:font-bold xl:font-extrabold text-[#1c1f48]`}>
          <div className='flex flex-row gap-0 md:gap-1 lg:gap-2'>
            {t('forthSection.discover')}
            <div className="bg-gradient-to-r text-nowrap from-[#08ac86] via-[#136369] to-[#193351] bg-clip-text text-transparent mx-1">
              {t('forthSection.exclusiveFeatures')}
            </div>
          </div>
          {t('forthSection.unmatchedQuality')}
        </div>


        <div className="w-full sm:mx-auto sm:px-4 md:px-0">
          <HoverEffect items={getProjects(t)} />
        </div>
      </div>
    </section>
  )
}

export const getProjects = (t: (key: string) => string) => [
  {
    icon: '/technical.svg',
    title: t('forthSection.projects.airConditioning.title'),
    description: t('forthSection.projects.airConditioning.description'),
  },
  {
    icon: '/service-tool1.svg',
    title: t('forthSection.projects.acInstallation.title'),
    description: t('forthSection.projects.acInstallation.description'),
  },
  {
    icon: '/fix1.svg',
    title: t('forthSection.projects.hvacMaintenance.title'),
    description: t('forthSection.projects.hvacMaintenance.description'),
  },
  {
    icon: '/settings.svg',
    title: t('forthSection.projects.furnaceInstallation.title'),
    description: t('forthSection.projects.furnaceInstallation.description'),
  },
  {
    icon: '/service.svg',
    title: t('forthSection.projects.furnaceRepair.title'),
    description: t('forthSection.projects.furnaceRepair.description'),
  },
  {
    icon: '/form.svg',
    title: t('forthSection.projects.indoorAirQuality.title'),
    description: t('forthSection.projects.indoorAirQuality.description'),
  },
];

export default ForthSection;