import React from 'react'
import Image from 'next/image'
import { Roboto } from 'next/font/google';
import Divider from '@mui/material/Divider';
import { Skeleton } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import FeaturesSectionDemo from '@/components/ui/Features';



function FirstSection() {
  return (

    <section id='about-us' className='w-full  flex flex-col items-center justify-center  '>
      <FeaturesSectionDemo />

    </section>

  )
}

export default FirstSection