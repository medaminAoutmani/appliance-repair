"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MotionDiv, MotionP } from "@/lib/framer-motion";
import { cn } from "@/lib/utils";
import styles from "./navbar-menu.module.css";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative ">
      <MotionP
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-[#1c1f48] text-base font-bold transition-all duration-200 hover:text-[#04cf9c] dark:text-white"
      >
        {item}
      </MotionP>
      {active !== null && (
        <MotionDiv
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <MotionDiv
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-[#04cf9c] dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
              >
                <MotionDiv
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </MotionDiv>
              </MotionDiv>
            </div>
          )}
        </MotionDiv>
      )}
    </div>
  );
};

type MenuProps = {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
  isAtTop: boolean;
  isExpanded?: boolean;
  className?: string;
};

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  ({ setActive, children, isAtTop, isExpanded = false, className }, ref) => {
    return (
      <nav
        ref={ref}
        onMouseLeave={() => setActive(null)}
        className={cn(
          "relative w-full ease-in-out duration-700",
          "transition-[background-color,height,transform,box-shadow]",
          !isExpanded && "h-14 flex items-center justify-between space-x-4 px-4 lg:px-8 py-4 rounded-full dark:bg-black bg-transparent backdrop-blur-md",
          isExpanded && "flex flex-col items-start justify-start space-y-4 px-4 py-5 rounded-2xl bg-white",
          isAtTop ? styles.menuAtTopShadow : styles.menuScrolledShadow,
          className
        )}
      >
        {children}
      </nav>
    );
  }
);

Menu.displayName = "Menu";

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }: React.ComponentProps<typeof Link> & { children: React.ReactNode }) => {
  return (
    <Link
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black "
    >
      {children}
    </Link>
  );
};
