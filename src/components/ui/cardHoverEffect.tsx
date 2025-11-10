import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Image from 'next/image'

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    icon: string;
    title: string;
    description: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 py-10 gap-y-8 gap-x-5",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item.title}
          className={`relative group  block p-2 h-full w-full `}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.5 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.5, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <CardIcon className={`${hoveredIndex == idx && "bg-[#1c1f48] transition-all duration-300"}`}>
            <Image
              src={item.icon}
              alt={item.title}
              width={40}
              height={40}
            />
          </CardIcon>
          <Card className={`${idx == 0 && 'bg-gradient-to-t from-[#08ac86] via-[#1c7872] to-[#3b3e61]'}`}>
            {idx == 0 &&
              <Image
                src="/appliance3.jpg"
                alt='background1'
                width={500}
                height={500}
                className='w-full top-0 left-0 object-contain absolute mix-blend-overlay opacity-20'
              />
            }
            <CardTitle className={`${idx == 0 && 'text-white'}`}>{item.title}</CardTitle>
            <CardDescription className={`${idx == 0 && 'text-white'}`}>{item.description}</CardDescription>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-[20px] h-full w-full overflow-hidden  bg-[#f3f2f6] border border-neutral-200 border-transparent dark:border-white/[0.2] group-hover:border-[#04cf9c] relative z-20 dark:border-neutral-800",
        className
      )}
    >
      <div className="relative z-10 p-4">
        <div className="p-4 pb-3">{children}</div>
      </div>
    </div>
  );
};

export const CardIcon = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn("absolute top-[-30px] ml-8 z-30 flex items-center justify-center rounded-xl w-20 h-20 bg-white transition-all duration-300 ", className)}>
      {children}
    </div>
  );
};


export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-[#1c1f48] text-2xl font-lato font-extrabold z-50 tracking-wide mt-8", className)}>
      {children}
    </h4>
  );
};


export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-5 text-[#7a7a7a] tracking-wide font-roboto leading-relaxed text-base font-normal",
        className
      )}
    >
      {children}
    </p>
  );
};
