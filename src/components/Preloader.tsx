"use client";

import { useEffect, useState } from "react";
import AnimatedCircularProgressBar from "@/components/ui/animated-circular-progress-bar";

export default function Preloader() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const handleIncrement = (prev: number) => {
      if (prev === 100) {
        return 0;
      }
      return prev + 10;
    };
    setValue(handleIncrement);
    const interval = setInterval(() => setValue(handleIncrement), 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[100vh] w-full flex items-center justify-center bg-black ">
      <AnimatedCircularProgressBar
        max={40}
        min={0}
        value={value}
        gaugePrimaryColor="#0aa186"
        gaugeSecondaryColor="rgba(255, 255, 255, 0.1)"
      />

    </div>
  );
}
