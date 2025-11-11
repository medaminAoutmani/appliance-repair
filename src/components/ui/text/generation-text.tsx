import { cn } from '@/lib/utils'
import { AnimationControls, motion, useAnimation, useInView } from 'framer-motion'
import React, { useEffect, useRef } from 'react'

function TextGeneration({ paragraph, className, controls }: { paragraph: string, className?: string, controls: AnimationControls }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start({
        filter: "blur(0px)",
        opacity: 1,
        y: 0,
      })
    }
  }, [isInView, mainControls])

  return (
    <motion.p
      className={cn(
        'text-sm lg:text-base  max-w-[890px]  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300',
        className,
      )}
      ref={ref}
      initial={{ opacity: 0, y: '20vh' }}
      animate={controls}
      transition={{ duration: 0.7 }}
    >
      {paragraph.split("").map((word, index) => (
        <motion.span
          key={index}
          initial={{
            filter: "blur(10px)",
            opacity: 0,
            y: 5,
          }}
          animate={mainControls}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
            delay: 0.01 * index, // Delay only when entering view
          }}

          className="inline-block"
        >
          {word === " " ? "\u00A0" : word}
        </motion.span>
      ))}
    </motion.p>
  )
}

export default TextGeneration