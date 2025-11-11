import { MotionDiv } from "@/lib/framer-motion";
import { cn } from "@/lib/utils";
import { AnimationControls } from "framer-motion";
import Image, { StaticImageData } from "next/image";

export const BentoGrid = ({
  ref,
  className,
  children,
}: {
  ref: React.RefObject<HTMLDivElement>;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      ref={ref}
      className={cn(
        "h-full lg:w-full xl:w-[90%] grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-x-0 gap-y-12 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  index,
  control,
  className,
  title,
  description,
  header,
}: {
  index: number;
  control: AnimationControls;
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header: string | StaticImageData;
  icon?: React.ReactNode;
}) => {

  const altText = typeof title === "string" ? title : "Image";

  return (
    <MotionDiv
      className={cn(
        "row-span-1.5 lg:w-[95%] xl:w-80 h-[340px] rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white hover:bg-[#f6f6f6] border hover:border-[#04cf9c] border-neutral-200 justify-between flex flex-col space-y-4 dark:border-neutral-800",
        className
      )}
      initial={{ opacity: 0, y: '20vh' }}
      animate={control}
      transition={{ duration: 0.7, delay: (index === 3 || index === 4 || index === 5) ? 1 : (index === 6 || index === 7 || index === 8) ? 1.7 : 0 }}
    >
      <div className="relative flex-1 lg:flex-initial w-full h-full rounded-xl">
        <Image
          src={header}
          alt={altText}
          fill
          className="rounded-lg object-cover object-top h-20 w-full md:h-40 lg:h-full md:w-full  flex-shrink-0"
        />
      </div>
      <div className="group-hover/bento:translate-x-2 lg:h-full transition  duration-200 text-lg flex items-start justify-center flex-col">
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs leading-5 dark:text-neutral-300">
          {description}
        </div>
      </div>
    </MotionDiv >
  );
};
