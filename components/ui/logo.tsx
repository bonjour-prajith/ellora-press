"use client";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useRef } from "react";
import logoData from "@/public/Logos/hourglasslogo-animate.json";

export const NavbarLogo = () => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const handleLoop = () => {
    // 1. Pause the animation when it reaches the end of the AE timeline
    lottieRef.current?.pause();
    
    // 2. Wait exactly 3 seconds before playing again
    setTimeout(() => {
      lottieRef.current?.play();
    }, 3000);
  };

  return (
    <div className="flex items-center gap-3 cursor-pointer group">
      <div className="w-12 h-12 md:w-14 md:h-14 transition-transform group-hover:scale-110">
        <Lottie 
          lottieRef={lottieRef}
          animationData={logoData}
          loop={true}
          onLoopComplete={handleLoop}
          className="w-full h-full"
        />
      </div>
      <span className="hidden sm:block font-bold text-xl tracking-tighter text-black dark:text-white uppercase">
        Ellora Press
      </span>
    </div>
  );
};