"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import logoAnimation from "@/public/Logos/hourglasslogo-animate.json";

type IntroPhase = "play" | "exit";
const LOGO_SPEED = 1.6;
const END_FRAME = Math.floor((logoAnimation as { op?: number }).op ?? 168);
const START_FRAME = Math.floor((logoAnimation as { ip?: number }).ip ?? 0);
const MID_FRAME = Math.floor((START_FRAME + END_FRAME) / 2);
const FRAME_RATE = Number((logoAnimation as { fr?: number }).fr ?? 30);
const SINGLE_SEGMENT_MS = Math.max(
  180,
  (((END_FRAME - MID_FRAME) / FRAME_RATE) / LOGO_SPEED) * 1000,
);
const END_FRAME_BUFFER_MS = 40;
const REVEAL_START_RATIO = 0.46;
const TEXT_DELAY_MS = Math.max(0, SINGLE_SEGMENT_MS * REVEAL_START_RATIO);
const TEXT_REVEAL_MS = Math.max(
  120,
  SINGLE_SEGMENT_MS - TEXT_DELAY_MS - END_FRAME_BUFFER_MS,
);
const LOGO_ENTRANCE_DELAY_MS = 90;

export default function OpeningIntro() {
  const [phase, setPhase] = useState<IntroPhase>("play");
  const [visible, setVisible] = useState(true);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const htmlOverflowRef = useRef<string>("");
  const bodyOverflowRef = useRef<string>("");
  const phaseRef = useRef<IntroPhase>("play");
  const startTimerRef = useRef<number | null>(null);
  const exitTimerRef = useRef<number | null>(null);
  const doneTimerRef = useRef<number | null>(null);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    htmlOverflowRef.current = document.documentElement.style.overflow;
    bodyOverflowRef.current = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    lottieRef.current?.setSpeed(LOGO_SPEED);
    // Play only the second half flip to keep intro duration short.
    startTimerRef.current = window.setTimeout(() => {
      lottieRef.current?.playSegments([MID_FRAME, END_FRAME], true);
    }, LOGO_ENTRANCE_DELAY_MS);

    return () => {
      if (startTimerRef.current) window.clearTimeout(startTimerRef.current);
      if (exitTimerRef.current) window.clearTimeout(exitTimerRef.current);
      if (doneTimerRef.current) window.clearTimeout(doneTimerRef.current);
      document.documentElement.style.overflow = htmlOverflowRef.current;
      document.body.style.overflow = bodyOverflowRef.current;
    };
  }, []);

  useEffect(() => {
    if (phase === "exit") {
      doneTimerRef.current = window.setTimeout(() => {
        setVisible(false);
        document.documentElement.style.overflow = htmlOverflowRef.current;
        document.body.style.overflow = bodyOverflowRef.current;
        window.dispatchEvent(new Event("opening-intro:complete"));
      }, 650);
    }
  }, [phase]);

  const handleFlipComplete = () => {
    if (phaseRef.current === "play") {
      setPhase("exit");
    }
  };

  const elloraVisible = phase === "play" || phase === "exit";
  const estdVisible = phase === "play" || phase === "exit";

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="opening-intro"
          className="fixed inset-0 z-[20000] flex items-center justify-center"
          initial={{ opacity: 1, clipPath: "circle(150% at 50% 50%)" }}
          animate={
            phase === "exit"
              ? { opacity: 1, clipPath: "circle(0% at 50% 50%)" }
              : { opacity: 1, clipPath: "circle(150% at 50% 50%)" }
          }
          transition={{
            duration: phase === "exit" ? 0.75 : 0.35,
            ease: phase === "exit" ? [0.65, 0, 0.35, 1] : [0.22, 1, 0.36, 1],
          }}
        >
          <div className="absolute inset-0 bg-black" />
          <div className="relative z-10 flex -translate-x-5 items-center justify-center md:-translate-x-13 -translate-y-8">
            <motion.div
              className="relative flex items-center"
              initial={false}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="relative z-10 h-40 w-40 md:h-52 md:w-52"
                initial={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
                animate={{ x: 0, scale: 1, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                <Lottie
                  lottieRef={lottieRef}
                  animationData={logoAnimation}
                  loop={false}
                  autoplay={false}
                  onComplete={handleFlipComplete}
                  className="h-full w-full"
                />
              </motion.div>

              <motion.div
                className="ml-[-14px] flex flex-col items-center overflow-hidden md:ml-[-20px]"
                initial={false}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="relative overflow-hidden"
                  initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                  animate={
                    elloraVisible
                      ? { clipPath: "inset(0 0% 0 0)", opacity: 1 }
                      : { clipPath: "inset(0 100% 0 0)", opacity: 0 }
                  }
                  transition={{
                    duration: TEXT_REVEAL_MS / 1000,
                    delay: TEXT_DELAY_MS / 1000,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="flex items-end gap-0.5">
                    <motion.span
                      className="block whitespace-nowrap text-5xl font-bold tracking-tight text-white md:text-7xl"
                      initial={{ x: -10, y: 3, opacity: 0, filter: "blur(12px) brightness(0.7)" }}
                      animate={
                        elloraVisible
                          ? { x: 0, y: 0, opacity: 1, filter: "blur(0px) brightness(1)" }
                          : { x: -10, y: 3, opacity: 0, filter: "blur(12px) brightness(0.7)" }
                      }
                      transition={{
                        duration: TEXT_REVEAL_MS / 1000,
                        delay: TEXT_DELAY_MS / 1000,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      Ellora
                    </motion.span>
                    <motion.span
                      className="block whitespace-nowrap text-5xl font-normal tracking-tight text-white md:text-7xl"
                      initial={{ x: -10, y: 3, opacity: 0, filter: "blur(12px) brightness(0.7)" }}
                      animate={
                        elloraVisible
                          ? { x: 0, y: 0, opacity: 1, filter: "blur(0px) brightness(1)" }
                          : { x: -10, y: 3, opacity: 0, filter: "blur(12px) brightness(0.7)" }
                      }
                      transition={{
                        duration: TEXT_REVEAL_MS / 1000,
                        delay: TEXT_DELAY_MS / 1000,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      Press
                    </motion.span>
                  </div>
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/62 to-transparent mix-blend-screen"
                    initial={{ x: "-130%", opacity: 0 }}
                    animate={
                      elloraVisible
                        ? { x: "135%", opacity: [0, 0.92, 0] }
                        : { x: "-130%", opacity: 0 }
                    }
                    transition={{
                      duration: Math.max(0.2, TEXT_REVEAL_MS / 1000),
                      delay: TEXT_DELAY_MS / 1000,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </motion.div>
                <motion.div
                  className="relative mt-0.5 overflow-hidden md:mt-1"
                  initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                  animate={
                    estdVisible
                      ? { clipPath: "inset(0 0% 0 0)", opacity: 1 }
                      : { clipPath: "inset(0 100% 0 0)", opacity: 0 }
                  }
                  transition={{
                    duration: TEXT_REVEAL_MS / 1000,
                    delay: TEXT_DELAY_MS / 1000,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <motion.span
                    className="block text-[10px] font-mono uppercase tracking-[0.34em] text-white/65 md:text-xs md:tracking-[0.42em]"
                    initial={{ x: -8, y: 2, opacity: 0, filter: "blur(8px) brightness(0.75)" }}
                    animate={
                      estdVisible
                        ? { x: 0, y: 0, opacity: 1, filter: "blur(0px) brightness(1)" }
                        : { x: -8, y: 2, opacity: 0, filter: "blur(8px) brightness(0.75)" }
                    }
                    transition={{
                      duration: TEXT_REVEAL_MS / 1000,
                      delay: TEXT_DELAY_MS / 1000,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    Estd. 1989
                  </motion.span>
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/55 to-transparent mix-blend-screen"
                    initial={{ x: "-130%", opacity: 0 }}
                    animate={
                      estdVisible
                        ? { x: "135%", opacity: [0, 0.85, 0] }
                        : { x: "-130%", opacity: 0 }
                    }
                    transition={{
                      duration: Math.max(0.2, TEXT_REVEAL_MS / 1000),
                      delay: TEXT_DELAY_MS / 1000,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
