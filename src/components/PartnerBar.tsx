import * as React from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";



export function CarouselDemo() {
  return (
    <Carousel className="lg:pl-3 w-full lg:w-[75%] xl:w-[70%] ">

      <CarouselContent className="">
        <CarouselItem className="flex items-center justify-center lg:justify-end w-56 lg:w-28 xl:w-36 mt-5 pl-10 md:mt-5 lg:mr-8 xl:mr-14 ">
          <div className="p-1 pb-5">
            <Image key="logo1" src="/LG.svg" className="w-[80px] lg:w-[80px] xl:w-[100px]" width={100} height={100} alt="Logo" />
          </div>
        </CarouselItem>
        <CarouselItem className="flex items-center justify-center w-56 mr-2 mt-6  ">
          <div className="p-1 ml-6 pb-5">
            <Image key="logo2" src="/samsung.svg" className="w-[150px] lg:w-[150px] xl:w-[190px]" width={190} height={100} alt="Logo" />
          </div>
        </CarouselItem>
        <CarouselItem className="flex items-center justify-center w-56 xl:mx-0 ">
          <div className="p-1">
            <Image key="logo3" src="/carrier.svg" className="w-[150px] lg:w-[150px] xl:w-[190px]" width={190} height={100} alt="Logo" />
          </div>
        </CarouselItem>
        <CarouselItem className="flex items-center justify-center w-56 mr-0  ">
          <div className="p-1">
            <Image key="logo4" src="/whirlpool.svg" className="w-[150px] lg:w-[150px] xl:w-[180px]" width={180} height={100} alt="Logo" />
          </div>
        </CarouselItem>
        <CarouselItem className="flex items-center justify-end w-56 mr-0 lg:mr-4 xl:mr-0 ">
          <div className="p-1 mr-0 lg:mr-6">
            <Image key="logo5" src="/bosch.svg" className="lg:mr-2 w-[150px] lg:w-[150px] xl:w-[200px]" width={200} height={120} alt="Logo" />
          </div>
        </CarouselItem>
      </CarouselContent>

    </Carousel>
  );
}