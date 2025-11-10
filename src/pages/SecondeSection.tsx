"use client";
import { BentoGridDemo } from '@/components/ui/BentoGridDemo'
import { DotPattern } from "@/components/ui/dot-pattern";
import TextGeneration from '@/components/ui/text/generation-text';
import { MotionDiv } from '@/lib/framer-motion';
import { cn } from '@/lib/utils';
import { useAnimation, useInView } from 'framer-motion';
import React, { useEffect, useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext';

function SecondeSection() {
  const { t } = useLanguage();
  
  let reftitle = useRef(null);
  let refContent = useRef(null);
  const isInViewTitle = useInView(reftitle, { once: true });
  const isInViewContent = useInView(refContent, { once: true });

  const TitleControl = useAnimation();
  const ContentControl = useAnimation();

  useEffect(() => {
    if (isInViewTitle) {
      TitleControl.start({
        opacity: 1, y: 0
      })
    }
    if (isInViewContent) {
      ContentControl.start({
        opacity: 1, y: 0
      })
    }
  }, [isInViewTitle, isInViewContent])
  return (
    <section id='repair' className='w-full h-full flex flex-col items-center justify-center py-8 sm:py-10 md:py-16 lg:py-20 xl:pb-40 bg-dotted-spacing-[9px]'>
      <div className='relative h-full w-[95%] lg:w-[90%] xl:w-[79%] flex flex-col items-center justify-center'>
        <div
          ref={reftitle}
          className="px-4 lg:px-8 w-full"
        >
          <MotionDiv
            className="font-lato font-extrabold text-[#1c1f48] text-3xl md:text-[30px] lg:text-[33px] xl:text-4xl leading-tight lg:leading-snug xl:leading-tight max-w-5xl mx-auto text-center tracking-tight"
            initial={{ opacity: 0, y: '20vh' }}
            animate={TitleControl}
            transition={{ duration: 0.7 }}
          >
            {t('secondSection.title')}
          </MotionDiv>
          <TextGeneration
            className="text-sm sm:text-base md:text-lg max-w-4xl mt-3 mb-8 lg:my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300 px-2 lg:px-0"
            paragraph={t('secondSection.description')}
            controls={TitleControl}
          />
        </div>

        <BentoGridDemo />
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
            "md:[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "lg:[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
          )}
        />
      </div>
    </section>
  )
}

export default SecondeSection