"use client";
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials'
import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext';

function SixthSection() {
  const { t } = useLanguage();
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "/person1.avif",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "/person2.avif",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "/person3.avif",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "/person4.avif",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "/person5.avif",
    },
  ];
  return (
    <section id='reviews' className='w-full h-full flex flex-col items-center justify-center pb-10 px-2 sm:px-0 py-28 sm:py-36 lg:py-40 bg-dotted-spacing-[9px]'>
      <div className='relative h-full sm:w-[90%] md:w-full lg:w-[90%] xl:w-[79%] flex flex-col items-center justify-center '>
        <h4 className="text-4xl sm:text-5xl font-lato text-wrap font-extrabold text-[#1c1f48] lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight  ">
          {t('sixthSection.title')}
        </h4>

        <p className="text-xs sm:text-sm lg:text-base  max-w-4xl px-4 sm:px-6 md:px-0  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
          {t('sixthSection.description')}
        </p>
        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </section>
  )
}

export default SixthSection