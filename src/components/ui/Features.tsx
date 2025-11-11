"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { AnimationControls, motion, useAnimation, useInView } from "framer-motion";
import { BorderBeam } from "@/components/ui/border-beam";
import { Roboto } from "next/font/google";
import StyledButton from "./button-1";
import { MotionDiv, MotionH2, MotionP } from "@/lib/framer-motion";
import TextGeneration from "./text/generation-text";
import { useLanguage } from "@/contexts/LanguageContext";



const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

function FeaturesSectionDemo() {
  const { t } = useLanguage();

  const reftitle = useRef(null);
  const refContent = useRef(null);
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
  }, [isInViewTitle, isInViewContent, TitleControl, ContentControl])

  const features = [
    {
      title: t('features.trackIssues.title'),
      description: t('features.trackIssues.description'),
      skeleton: <SkeletonTwo controls={ContentControl} />,
      className:
        " border-b col-span-1 lg:col-span-4 flex flex-col items-center justify-center dark:border-neutral-800",
    },
    {
      title: "",
      description:
        "",
      skeleton: <SkeletonOne controls={ContentControl} />,
      className: "p-1 sm:p-8 col-span-1 lg:col-span-6 border-b lg:border-l dark:border-neutral-800",
    },
    {
      title: "",
      description:
        "",
      skeleton: <SkeletonThree />,
      className: "p-2 sm:p-8 col-span-1 w-fit lg:col-span-5 lg:border-r  ",
    },
    {
      title: "",
      description:
        "",
      skeleton: <SkeletonFour />,
      className: "p-2 sm:p-8 lg:p-2 xl:p-4 xl:pr-6 flex lg:justify-center lg:items-center xl:justify-start col-span-1 lg:col-span-5 lg:pl-0 dark:border-neutral-800",
    }

  ];
  return (
    <div
      className="relative w-full lg:w-[90%] xl:w-[79%] flex flex-col items-center justify-center  z-20 px-2 sm:px-8 lg:px-0 py-32 lg:py-36 xl:py-40  mx-auto"
    >
      <div
        ref={reftitle}
        className="px-2 sm:px-8"
      >
        <MotionH2
          className="font-lato sm:text-nowrap font-extrabold text-[#1c1f48] text-4xl  lg:text-[42px] xl:text-5xl lg:leading-tight lg:max-w-5xl mx-auto text-center tracking-tight"
          initial={{ opacity: 0, y: '20vh' }}
          animate={TitleControl}
          transition={{ duration: 0.7 }}
        >
          {t('features.title')}
        </MotionH2>

        <TextGeneration
          className="hidden lg:block text-sm lg:text-sm xl:text-base  max-w-4xl  my-4 mx-auto text-neutral-500 text-center font-normal"
          paragraph={t('features.description')}
          controls={TitleControl}
        />
        <TextGeneration
          className="lg:hidden block text-sm lg:text-sm xl:text-base  max-w-4xl px-9 sm:px-10 leading-4  my-4 mx-auto text-neutral-500 text-center font-normal"
          paragraph={t('features.mobileDescription')}
          controls={TitleControl}
        />
      </div>

      <div
        ref={refContent}
        className="relative mt-6 lg:mt-12"
      >
        <MotionDiv
          className="grid grid-cols-1 lg:grid-cols-10 border rounded-md "
          initial={{ opacity: 0, y: '50vh' }}
          animate={ContentControl}
          transition={{ duration: 0.7, delay: 2 }}
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} className={feature.className}>
              <FeatureTitle controls={ContentControl}>{feature.title}</FeatureTitle>
              <FeatureDescription controls={ContentControl}>{feature.description}</FeatureDescription>
              <div className=" h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
          <BorderBeam size={250} duration={12} delay={9} />
        </MotionDiv>
      </div>
    </div>
  );
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children, controls }: { children?: React.ReactNode, controls: AnimationControls }) => {
  return (
    <MotionP
      className=" max-w-5xl mx-auto text-center tracking-tight font-lato font-bold text-[#1c1f48] text-2xl leading-snug"
      initial={{ opacity: 0, y: '20vh' }}
      animate={controls}
      transition={{ duration: 0.7, delay: 2.7 }}
    >
      {children}
    </MotionP>
  );
};

const FeatureDescription = ({ children, controls }: { children?: React.ReactNode, controls: AnimationControls }) => {
  return (
    <MotionP
      className={cn(
        "text-sm md:text-base max-w-4xl text-center mx-auto",
        "text-neutral-500 text-center font-normal dark:text-neutral-300",
        "text-center max-w-sm mx-0 text-sm my-2"
      )}
      initial={{ opacity: 0, y: '20vh' }}
      animate={controls}
      transition={{ duration: 0.7, delay: 3 }}
    >
      {children}
    </MotionP>
  );
};

const SkeletonOne = ({ controls }: { controls: AnimationControls }) => {
  const { t, language } = useLanguage();

  return (
    <div className={`relative flex py-8 px-2 gap-10 ${language == 'en' ? 'h-[110%] lg:h-[85%]' : 'h-[110%] lg:h-[97%]'}`}>
      <MotionDiv
        className="w-full px-8 p-5 lg:p-5  mx-auto bg-white dark:bg-neutral-900 shadow-2xl group "
        initial={{ opacity: 0, y: '20vh' }}
        animate={controls}
        transition={{ duration: 0.7, delay: 4 }}
      >
        <div className='w-full flex flex-col items-center lg:items-start justify-center lg:pl-7'>
          <div className='mb-5 font-lato text-center lg:text-left text-3xl lg:text-4xl xl:text-5xl font-extrabold text-[#1c1f48] ' >
            {t('features.skeletonOne.title')} {` `}
            <span className='bg-gradient-to-t from-[#08ac86] via-[#1c7872] to-[#3b3e61] bg-clip-text text-transparent'>
              {t('features.skeletonOne.titleHighlight')}
            </span> {` `}
            {t('features.skeletonOne.titleEnd')}
          </div>
          <div className='mb-5'>
            <div className={`text-base text-center lg:text-left lg:text-sm xl:text-base leading-6 ${roboto.className} text-[#7a7a7a] mb-[14px]`}>
              {t('features.skeletonOne.description')}
            </div>
          </div>
          <div className=' flex flex-col sm:flex-row items-center justify-center'>
            <div className=' w-56 pr-5 lg:pr-0 lg:w-20 xl:w-32 mb-4 lg:mb-6 xl:mb-0 border-b sm:border-b-0 sm:border-r border-[#bababa] sm:mb-0 pb-4 sm:pb-0'>
              <Image className='rounded-full drop-shadow-lg lg:w-16 xl:w-20 ' src="/repair-man.jpg" alt='repair-man' width={400} height={400} />
            </div>
            <div className={`lg:w-80 xl:w-96 flex items-center justify-center pl-5 lg:pl-12 text-[#04cf9c] text-base ${roboto.className} italic-text`}>
              &quot;{t('features.skeletonOne.quote')}&quot; 😊
            </div>
            <div>
              <Image className='absolute right-12 sm:right-0 top-[600px] sm:top-[290px]' src="/quote-left.png" alt='quote-left' width={20} height={20} />
            </div>
          </div>

        </div>
      </MotionDiv>

      <div className="absolute bottom-0 z-40 inset-x-0 h-40 bg-gradient-to-t from-white dark:from-black via-white dark:via-black to-transparent w-full pointer-events-none" />
      <div className="absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-white dark:from-black via-transparent to-transparent w-full pointer-events-none" />
    </div>
  );
};

const SkeletonThree = () => {
  const { t } = useLanguage();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const Control = useAnimation();

  useEffect(() => {
    if (isInView) {
      Control.start({
        opacity: 1, y: 0
      })
    }
  }, [isInView, Control])

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
    <div ref={ref}>
      <MotionDiv
        className="w-full p-4 lg:p-8 mx-auto bg-white dark:bg-neutral-900 shadow-2xl group"
        initial={{ opacity: 0, y: '20vh' }}
        animate={Control}
        transition={{ duration: 0.7, delay: 0.7 }}
      >
        <div className="w-full lg:w-[400px] mb-4 lg:mb-5 flex flex-col items-center lg:items-start justify-center">
          <div className="flex flex-row lg:flex-col items-center lg:items-start gap-2 justify-center mb-5 lg:mb-5 font-lato text-3xl lg:text-4xl xl:text-5xl font-extrabold text-[#1c1f48]">
            <div className="bg-gradient-to-r from-[#08ac86] via-[#136369] to-[#193351] bg-clip-text text-transparent text-center lg:text-left">
              {t('features.skeletonThree.titleHighlight')}
            </div>
            <div className="text-center lg:text-left">{t('features.skeletonThree.titleEnd')}</div>
          </div>
          <div className={`text-sm lg:text-base leading-6 ${roboto.className} text-[#7a7a7a] mb-8 lg:mb-7 text-center lg:text-left px-4 lg:px-0`}>
            {t('features.skeletonThree.description')}
          </div>
          <div className="w-full flex justify-center lg:justify-start">
            <StyledButton content={t('features.skeletonThree.button')} onClick={scrollToContact} />
          </div>
        </div>
        <div className="absolute bottom-0 z-40 inset-x-0 h-28 sm:h-32 bg-gradient-to-t from-white dark:from-black via-white dark:via-black to-transparent w-full pointer-events-none" />
      </MotionDiv>
    </div>
  );
};

const SkeletonTwo = ({ controls }: { controls: AnimationControls }) => {
  const images1 = [
    "/appliance3.jpg",
    "/appliance2.jpg",
    "/appliance1.webp",

  ];

  const images2 = [
    "/appliance1.webp",
    "/appliance4.jpg",
  ];

  const imageVariants = {
    whileHover: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
    whileTap: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
  };
  return (
    <div className="relative flex flex-col items-center lg:items-start p-4 lg:p-8 gap-10  overflow-hidden">
      {/* TODO */}
      <MotionDiv
        className="flex flex-row lg:-ml-20"
        initial={{ opacity: 0, y: '20vh' }}
        animate={controls}
        transition={{ duration: 0.7, delay: 3.5 }}
      >
        {images1.map((image, idx) => (
          <motion.div
            variants={imageVariants}
            key={"images-first" + idx}
            style={{
              rotate: Math.random() * 20 - 10,
            }}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
          >
            <Image
              src={image}
              alt="bali images"
              width="500"
              height="500"
              className="rounded-lg h-40 w-40 object-cover flex-shrink-0"
            />
          </motion.div>
        ))}
      </MotionDiv>
      <MotionDiv
        className="flex flex-row"
        initial={{ opacity: 0, y: '20vh' }}
        animate={controls}
        transition={{ duration: 0.7, delay: 3.7 }}
      >
        {images2.map((image, idx) => (
          <motion.div
            key={"images-second" + idx}
            style={{
              rotate: Math.random() * 20 - 10,
            }}
            variants={imageVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
          >
            <Image
              src={image}
              alt="bali images"
              width="500"
              height="500"
              className="rounded-lg h-40 w-40 object-cover flex-shrink-0"
            />
          </motion.div>
        ))}
      </MotionDiv>

      <div className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent  h-full pointer-events-none" />
      <div className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-white dark:from-black  to-transparent h-full pointer-events-none" />
    </div>
  );
};

const SkeletonFour = () => {
  const { t, language } = useLanguage();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const Control = useAnimation();

  useEffect(() => {
    if (isInView) {
      Control.start({
        opacity: 1, y: 0
      })
    }
  }, [isInView, Control])
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  return (

    <div ref={ref}>
      <MotionDiv
        initial={{ opacity: 0, y: '20vh' }}
        animate={Control}
        transition={{ duration: 0.7, delay: 1.4 }}
        className="flex items-center justify-center lg:justify-end w-[100%]"
      >
        <motion.div
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="lg:w-[90%] xl:w-full h-fit sm:h-[330px] flex flex-col items-center justify-center rounded-[20px] bg-[#f0eff4] px-0 sm:px-2 xl:px-7 pt-7 pb-0 mt-8 transition-all duration-300 hover:mt-6 hover:shadow-lg"
        >
          <div className={`lg:text-sm xl:text-base text-center leading-6 ${roboto.className} text-[#7a7a7a] mb-5 px-2 sm:px-0`}>
            {t('features.skeletonFour.description')}
          </div>
          <div className="w-full sm:w-fit lg:h-48 xl:h-72 flex items-start justify-center">
            <div className="w-full sm:w-fit h-full flex justify-center items-start gap-2">
              <motion.div
                variants={first}
                className="h-full flex justify-center items-start "
              >
                <div className="lg:w-[140px] xl:w-[160px] lg:h-[200px] xl:h-[210px] flex flex-col items-center justify-start pt-5 px-0 border border-neutral-200 rounded-2xl bg-[#f6f5f9]">
                  <div className="lg:w-[50px] xl:w-[60px] lg:h-[50px] xl:h-[60px] p-[14.5px] bg-[#1c1f48] rounded-[10px] mb-5">
                    <Image src="/mony.png" alt="mony" width={29} height={29} />
                  </div>
                  <div className={`text-xl xl:text-2xl text-center font-extrabold leading-6 font-lato text-[#1c1f48] mb-2`}>
                    {t('features.skeletonFour.affordable.title')}
                  </div>
                  <div className={`lg:text-sm xl:text-base text-center leading-6 ${roboto.className} text-[#7a7a7a] mb-5`}>
                    {t('features.skeletonFour.affordable.description')}
                  </div>

                </div>
              </motion.div>

              <div className="lg:w-[150px] xl:w-[220px] lg:h-[220px] xl:h-[250px] z-10 flex flex-col items-center justify-start bg-white rounded-xl shadow-xl pt-5 px-2 xl:px-5 pb-[30px]">
                <div className="lg:w-[50px] xl:w-[60px] lg:h-[50px] xl:h-[60px] p-[14.5px] bg-[#04cf9c] rounded-[10px] mb-5">
                  <Image src="/person.png" alt="mony" width={29} height={29} />
                </div>
                <div className={`text-xl xl:text-2xl text-center font-extrabold leading-6 font-lato text-[#1c1f48] mb-2`}>
                  {t('features.skeletonFour.professional.title')}
                </div>
                <div className={`lg:text-sm xl:text-base text-center text-wrap leading-6 ${roboto.className} text-[#7a7a7a] mb-5`}>
                  {t('features.skeletonFour.professional.description')}
                </div>
              </div>

              <motion.div
                variants={second}
                className="h-full flex justify-center items-start "
              >
                <div className="lg:w-[150px] lg:h-[200px] xl:w-[170px] xl:h-[220px] flex flex-col items-center justify-start pt-5 px-2 border border-neutral-200 rounded-2xl bg-[#f6f5f9]">
                  <div className="lg:w-[50px] xl:w-[60px] lg:h-[50px] xl:h-[60px] p-[14.5px] bg-[#1c1f48] rounded-[10px] mb-5 ">
                    <Image src="/quality.png" alt="mony" width={29} height={29} />
                  </div>
                  <div className={`text-xl text-center font-extrabold leading-6 font-lato text-[#1c1f48] mb-2 ${language == 'en' ? 'lg:text-xl xl:text-2xl' : 'lg:text-xl '}`}>
                    {t('features.skeletonFour.highQuality.title')}
                  </div>
                  <div className={`lg:text-sm xl:text-base text-center leading-6 ${roboto.className} text-[#7a7a7a] mb-5`}>
                    {t('features.skeletonFour.highQuality.description')}
                  </div>

                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </MotionDiv>
    </div>
  );
};


export default FeaturesSectionDemo;