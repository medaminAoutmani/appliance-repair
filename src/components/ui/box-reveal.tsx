"use client";

import { JSX, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "motion/react";
import styles from "./box-reveal.module.css";

interface BoxRevealProps {
  children: JSX.Element;
  width?: string | "100%";
  boxColor?: string;
  duration?: number;
  delay?: number;
}

export const BoxReveal = ({
  children,
  width = "100%",
  boxColor,
  duration,
  delay,
}: BoxRevealProps) => {
  const mainControls = useAnimation();
  const slideControls = useAnimation();

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      slideControls.start("visible");
      mainControls.start("visible");
    } else {
      slideControls.start("hidden");
      mainControls.start("hidden");
    }
  }, [isInView, mainControls, slideControls]);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.setProperty('--box-width', width);
      ref.current.style.setProperty('--box-color', boxColor || '#5046e6');
    }
  }, [width, boxColor]);

  return (
    <div
      ref={ref}
      className={styles.boxReveal}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: duration ? duration : 0.5, delay: delay ? delay : 0.25 }}

      >
        {children}
      </motion.div>

      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: duration ? duration : 0.5, ease: "easeIn" }}
        className={styles.slideBox}
      />
    </div>
  );
};

export default BoxReveal;
