import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
// import WordRotate from "./text/word-rotate";

interface Props {
  max: number;
  value: number;
  min: number;
  gaugePrimaryColor: string;
  gaugeSecondaryColor: string;
  className?: string;
}

export default function AnimatedCircularProgressBar({
  max = 100,
  min = 0,
  value = 0,
  gaugePrimaryColor,
  gaugeSecondaryColor,
  className,
}: Props) {
  const circumference = 2 * Math.PI * 45;
  const percentPx = circumference / 100;
  const currentPercent = Math.round(((value - min) / (max - min)) * 100);

  const [delay, setDelay] = useState(false)

  useEffect(() => {
    setTimeout(() => setDelay(true), 500)
  }, [])

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const handleIncrement = (prev: number) => {
      if (prev >= 100) {
        return 100; // Stop at 100% instead of resetting to 0 
      }
      return prev + 1; // Increment by 1% for smooth progression 
    };
    const interval = setInterval(() => setPercentage(handleIncrement), 50); // Adjust interval for desired speed 
    return () => clearInterval(interval); // Clean up the interval on component unmount 
  }, []);

  return (
    <div>
      <div
        className={cn("relative size-40 items-center justify-center text-[#0aa186] text-2xl font-semibold", className)}
        style={
          {
            "--circle-size": "100px",
            "--circumference": circumference,
            "--percent-to-px": `${percentPx}px`,
            "--gap-percent": "5",
            "--offset-factor": "0",
            "--transition-length": "1.5s", // Augmenter la durée de transition
            "--transition-step": "0ms", // Enlever les étapes de transition
            "--delay": "0s",
            "--percent-to-deg": "3.6deg",
            transform: "translateZ(0)",
          } as React.CSSProperties
        }
      >
        <div></div>
        <svg
          fill="none"
          className="size-full"
          strokeWidth="2"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            strokeWidth="5"
            strokeDashoffset="0"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-100"
            style={
              {
                stroke: gaugeSecondaryColor,
                "--stroke-percent": 100,
                strokeDasharray:
                  "calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)",
                transform: "rotate(0deg) scaleY(-1)",
                transition: "all var(--transition-length) linear",
                transformOrigin: "calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)",
              } as React.CSSProperties
            }
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            strokeWidth="5"
            strokeDashoffset="0"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-100"
            style={
              {
                stroke: gaugePrimaryColor,
                "--stroke-percent": currentPercent,
                strokeDasharray:
                  "calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)",
                transition: "stroke-dasharray var(--transition-length) linear",
                transform: "rotate(-90deg)",
                transformOrigin: "calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)",
              } as React.CSSProperties
            }
          />
        </svg>
        <span
          data-current-value={currentPercent}
          className="absolute inset-0 m-auto ml-8 mt-9 size-fit ease-linear animate-in fade-in"
          style={{
            transitionDuration: "var(--transition-length)",
            transitionDelay: "var(--delay)",
          }}
        >
          {delay && <Image className="" src="/loader.svg" alt="My SVG Animation" width={120} height={120} />}

        </span>
        <div className="ml-[58px] w-full flex-col">
          {percentage}%
        </div>
        <div className="text-nowrap absolute text-sm left-[-15px] ">
          Don&apos;t Replace, Repair and Save!
        </div>
      </div>

    </div>
  );
}
