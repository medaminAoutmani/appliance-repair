"use client";
import React, { useEffect, useRef } from "react";
import { BentoGrid, BentoGridItem } from "./bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { useAnimation, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function BentoGridDemo() {
  const { t } = useLanguage();

  const refContent = useRef<HTMLDivElement>(null);
  const isInViewContent = useInView(refContent, { once: true });

  const ContentControl = useAnimation();

  useEffect(() => {
    if (isInViewContent) {
      ContentControl.start({
        opacity: 1, y: 0
      })
    }
  }, [isInViewContent, ContentControl])

  const items = [
    {
      title: t('bentoGrid.refrigeratorRepair.title'),
      description: t('bentoGrid.refrigeratorRepair.description'),
      header: "/Refrigerator.jpeg",
      icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: t('bentoGrid.stoveRangeRepair.title'),
      description: t('bentoGrid.stoveRangeRepair.description'),
      header: "/Electric-Range.jpg",
      icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: t('bentoGrid.ovenRepair.title'),
      description: t('bentoGrid.ovenRepair.description'),
      header: "/oven.webp",
      icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: t('bentoGrid.dishwasherRepair.title'),
      description: t('bentoGrid.dishwasherRepair.description'),
      header: "/Dishwasher.jpg",
      icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: t('bentoGrid.washerRepair.title'),
      description: t('bentoGrid.washerRepair.description'),
      header: "/Washer.jpeg",
      icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: t('bentoGrid.dryerRepair.title'),
      description: t('bentoGrid.dryerRepair.description'),
      header: "/Dryer.jpg",
      icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: t('bentoGrid.microwaveRepair.title'),
      description: t('bentoGrid.microwaveRepair.description'),
      header: "/Microwave.avif",
      icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: t('bentoGrid.freezerRepair.title'),
      description: t('bentoGrid.freezerRepair.description'),
      header: "/Freezer.webp",
      icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: t('bentoGrid.airConditionerRepair.title'),
      description: t('bentoGrid.airConditionerRepair.description'),
      header: "/appliance3.jpg",
      icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    },
  ];

  return (
    <BentoGrid
      ref={refContent as React.RefObject<HTMLDivElement>}
      className="w-[90%] px-2 sm:px-4 md:px-0 md:w-[95%] lg:w-full md:mx-auto lg:ml-5 xl:w-[90%] xl:mx-auto h-full z-10 gap-y-8 sm:gap-y-10 md:gap-y-12 md:gap-x-6"
    >
      {items.map((item, i) => (
        <BentoGridItem
          control={ContentControl}
          key={i}
          index={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className="h-[400px] md:h-[320px] lg:h-[340px]"

        />
      ))}
    </BentoGrid>
  );
}
