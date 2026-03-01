"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  IconLock,
  IconPalette,
  IconPackage,
  IconTargetArrow,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { BackgroundLines } from "@/components/ui/background-lines";

type Highlight = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tone: "prototype" | "lock" | "pantone" | "logistics";
};

const highlights: Highlight[] = [
  {
    id: "01",
    title: "Precision Prototyping",
    description: "Zero-cost design assistance and physical samples.",
    icon: <IconTargetArrow size={18} />,
    tone: "prototype",
  },
  {
    id: "02",
    title: "Secure NDA Protocols",
    description:
      "Your intellectual property, Guarded with Non-Disclosure Protocols.",
    icon: <IconLock size={18} />,
    tone: "lock",
  },
  {
    id: "03",
    title: "Pantone Accuracy",
    description:
      "We maintain brand consistency utilizing pantone matching systems.",
    icon: <IconPalette size={18} />,
    tone: "pantone",
  },
  {
    id: "04",
    title: "Express Logistics",
    description: "Streamlined bulk handling for rapid turnaround.",
    icon: <IconPackage size={18} />,
    tone: "logistics",
  },
];

const cardToneClasses: Record<Highlight["tone"], string> = {
  prototype:
    "from-emerald-100/70 via-teal-100/60 to-cyan-100/70 dark:from-emerald-500/15 dark:via-teal-500/10 dark:to-cyan-500/20",
  lock: "from-zinc-100/80 via-slate-100/60 to-neutral-100/70 dark:from-zinc-800/40 dark:via-zinc-900/60 dark:to-slate-800/40",
  pantone:
    "from-cyan-200/70 via-pink-200/70 to-yellow-200/70 dark:from-cyan-500/20 dark:via-fuchsia-500/20 dark:to-amber-500/20",
  logistics:
    "from-blue-100/70 via-indigo-100/50 to-violet-100/70 dark:from-sky-500/20 dark:via-indigo-500/15 dark:to-violet-500/20",
};

function CoverArt({
  tone,
  isHovered = false,
}: {
  tone: Highlight["tone"];
  isHovered?: boolean;
}) {
  if (tone === "prototype") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-black/5 bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 dark:border-white/10 dark:from-emerald-600/20 dark:via-teal-600/20 dark:to-cyan-600/20">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(rgba(15,23,42,0.08)_1px,transparent_1px)] bg-[size:18px_18px] dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)]" />
        <div className="absolute left-5 top-1 rounded-full border border-emerald-900/25 bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-900/80 dark:border-emerald-100/20 dark:bg-black/20 dark:text-emerald-100/80 sm:top-5">
          Free Design Assist
        </div>
        <div className="absolute right-[102px] top-[42px] h-16 w-22 sm:right-[86px] sm:top-6 sm:h-20 sm:w-26">
          <div className="absolute inset-x-0 top-0 h-11 rounded-lg border border-teal-900/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(224,242,242,0.78))] shadow-sm dark:border-teal-100/20 dark:bg-[linear-gradient(180deg,rgba(17,24,39,0.82),rgba(18,35,38,0.72))] sm:h-14">
            <div className="absolute inset-[2px] rounded-[6px] border border-teal-900/15 bg-gradient-to-br from-emerald-50 to-cyan-50 dark:border-teal-100/15 dark:from-emerald-900/20 dark:to-cyan-900/20" />
          </div>
          <div className="absolute left-1/2 top-[45px] h-4 w-px -translate-x-1/2 bg-teal-900/35 dark:bg-teal-100/35 sm:top-[57px] sm:h-5" />
          <div className="absolute left-1/2 top-[56px] h-2 w-14 -translate-x-1/2 rounded-full bg-teal-900/35 dark:bg-teal-100/40 sm:top-[71px] sm:w-16" />
        </div>
        <div className="absolute right-[206px] top-[42px] h-12 w-10 rotate-[-8deg] rounded-md border border-emerald-900/25 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(215,236,236,0.74))] shadow-sm dark:border-emerald-100/25 dark:bg-[linear-gradient(180deg,rgba(17,24,39,0.82),rgba(18,35,38,0.72))] sm:right-[212px] sm:top-[24px] sm:h-14 sm:w-12">
          <div className="absolute inset-[2px] rounded-[4px] border border-emerald-900/15 bg-gradient-to-br from-emerald-50 to-cyan-50 dark:border-emerald-100/15 dark:from-emerald-900/20 dark:to-cyan-900/20" />
          <div className="absolute left-1/2 top-[4px] h-[2px] w-4 -translate-x-1/2 rounded-full bg-emerald-900/30 dark:bg-emerald-100/35 sm:w-5" />
        </div>
        <div className="absolute right-[198px] top-[32px] h-[22px] w-[2px] rotate-[28deg] rounded-full bg-emerald-900/35 dark:bg-emerald-100/40 sm:right-[205px] sm:top-[14px] sm:h-6" />
        <div className="absolute bottom-5 left-6 right-6 h-1.5 rounded-full bg-emerald-900/20 dark:bg-emerald-100/20" />
      </div>
    );
  }

  if (tone === "lock") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-700/30 via-zinc-800/50 to-slate-700/30 dark:border-white/10 dark:from-zinc-700/30 dark:via-zinc-800/50 dark:to-slate-700/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14),transparent_42%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14),transparent_42%)]" />
        <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-zinc-100/20 bg-zinc-900/70 dark:border-zinc-100/20 dark:bg-black/15">
          <svg
            className="h-14 w-14 text-zinc-100 dark:text-zinc-100"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M7.5 10V8a4.5 4.5 0 119 0v2"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="5.5"
              y="10"
              width="13"
              height="10"
              rx="2.5"
              stroke="currentColor"
              strokeWidth="1.9"
            />
            <circle cx="12" cy="14.5" r="1.35" fill="currentColor" />
            <path
              d="M12 15.8v2.1"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    );
  }

  if (tone === "pantone") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-[linear-gradient(125deg,#f2d16b_0%,#7ecbd6_30%,#c78bc4_60%,#e97294_100%)]">
        <div className="absolute inset-0 z-[1] bg-black/5 dark:bg-black/20" />
        <div className="absolute left-1/2 top-[48%] z-[2] h-[78%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-md border border-white/65 shadow-[0_14px_32px_rgba(0,0,0,0.22)]">
          <div className="h-[78%] w-full rounded-t-md bg-[linear-gradient(135deg,#f39b33_0%,#ea5e58_100%)]" />
          <div className="flex h-[22%] w-full items-center justify-center rounded-b-md bg-zinc-100 text-zinc-900">
            <div className="text-center leading-none">
              <div className="text-lg font-black tracking-tight">PANTONE</div>
              
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-black/5 bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100 dark:border-white/10 dark:from-sky-600/20 dark:via-blue-600/20 dark:to-indigo-600/20">
      <div className="absolute inset-y-0 left-0 w-[55%] bg-[linear-gradient(90deg,rgba(255,255,255,0.7),transparent)] dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.14),transparent)]" />
      <div className="absolute left-1/2 top-1/2 z-10 h-[62%] w-[86%] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={
            isHovered
              ? { x: [0, -30], opacity: 1 }
              : { x: 0, opacity: 0 }
          }
          transition={
            isHovered
              ? { duration: 0.62, repeat: Infinity, ease: "linear" }
              : { duration: 0.15, ease: "easeOut" }
          }
        >
          <div className="absolute left-[16%] top-[38%] h-0.5 w-24 bg-indigo-700/40 dark:bg-indigo-100/45" />
          <div className="absolute left-[20%] top-[48%] h-0.5 w-30 bg-indigo-700/55 dark:bg-indigo-100/60" />
          <div className="absolute left-[14%] top-[58%] h-0.5 w-20 bg-indigo-700/40 dark:bg-indigo-100/45" />
        </motion.div>
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={
            isHovered
              ? { x: [0, -18], opacity: 1 }
              : { x: 0, opacity: 0 }
          }
          transition={
            isHovered
              ? { duration: 0.92, repeat: Infinity, ease: "linear" }
              : { duration: 0.15, ease: "easeOut" }
          }
        >
          <div className="absolute left-[24%] top-[43%] h-px w-14 bg-indigo-700/30 dark:bg-indigo-100/35" />
          <div className="absolute left-[26%] top-[53%] h-px w-12 bg-indigo-700/30 dark:bg-indigo-100/35" />
        </motion.div>

        <motion.div
          className="absolute left-1/2 top-1/2 z-20 h-11 w-16 -translate-x-1/2 -translate-y-1/2 rounded-md border-2 border-indigo-700/75 bg-white/92 shadow-[0_10px_24px_rgba(37,99,235,0.28)] dark:border-indigo-100/85 dark:bg-indigo-900/40"
          initial={false}
          animate={
            isHovered
              ? { x: [0, 8, 0], rotate: [0, 0.7, 0] }
              : { x: 0, rotate: 0 }
          }
          transition={
            isHovered
              ? { duration: 0.2, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.15, ease: "easeOut" }
          }
        >
          <motion.div
            className="absolute right-[100%] top-1/2 h-4 -translate-y-1/2 rounded-l-full bg-[linear-gradient(90deg,rgba(37,99,235,0.0),rgba(37,99,235,0.22),rgba(37,99,235,0.4))] dark:bg-[linear-gradient(90deg,rgba(191,219,254,0.0),rgba(191,219,254,0.24),rgba(191,219,254,0.45))]"
            initial={false}
            animate={
              isHovered
                ? { width: [20, 34, 20], opacity: [0.45, 0.85, 0.45] }
                : { width: 0, opacity: 0 }
            }
            transition={
              isHovered
                ? { duration: 0.28, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.12, ease: "easeOut" }
            }
          />
          <div className="absolute left-1/2 top-[36%] h-3 w-9 -translate-x-1/2 -translate-y-1/2 rounded-sm border-2 border-indigo-700/65 bg-white/80 dark:border-indigo-100/75 dark:bg-indigo-900/25" />
        </motion.div>
      </div>
    </div>
  );
}

export const WhyUsSection = () => {
  const [activeCardId, setActiveCardId] = useState<string | null>(
    null
  );
  const [isMobileInteraction, setIsMobileInteraction] = useState(false);
  const hoverEnabled = !isMobileInteraction;
  const cardRefs = React.useRef<Record<string, HTMLElement | null>>({});
  const visibleRatiosRef = React.useRef<Record<string, number>>({});
  const badgeRef = React.useRef<HTMLDivElement | null>(null);
  const badgeInView = useInView(badgeRef, { amount: 0.35, once: false });

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    const updateMode = () => setIsMobileInteraction(media.matches);
    updateMode();
    media.addEventListener("change", updateMode);
    return () => media.removeEventListener("change", updateMode);
  }, []);

  useEffect(() => {
    visibleRatiosRef.current = {};
    if (!isMobileInteraction) {
      setActiveCardId(null);
    }
  }, [isMobileInteraction]);

  useEffect(() => {
    if (!isMobileInteraction) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-card-id");
          if (!id) return;
          if (entry.isIntersecting) {
            visibleRatiosRef.current[id] = entry.intersectionRatio;
          } else {
            delete visibleRatiosRef.current[id];
          }
        });

        const ratios = visibleRatiosRef.current;
        const ranked = Object.entries(ratios).sort((a, b) => b[1] - a[1]);
        const top = ranked[0];
        if (!top) {
          setActiveCardId(null);
          return;
        }

        const [nextId, nextRatio] = top;
        setActiveCardId((current) => {
          if (!current) return nextId;
          if (current === nextId) return current;
          const currentRatio = ratios[current] ?? 0;
          if (nextRatio < currentRatio + 0.12) return current;
          return nextId;
        });
      },
      {
        root: null,
        threshold: [0.2, 0.35, 0.5, 0.65, 0.8, 0.92],
        rootMargin: "-24% 0px -24% 0px",
      }
    );

    Object.values(cardRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isMobileInteraction]);

  return (
    <section className="relative overflow-hidden bg-zinc-50 py-24 dark:bg-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(245,158,11,0.18),transparent_28%),radial-gradient(circle_at_86%_22%,rgba(219,39,119,0.15),transparent_30%),radial-gradient(circle_at_78%_82%,rgba(14,165,233,0.16),transparent_34%)] dark:bg-[radial-gradient(circle_at_12%_10%,rgba(245,158,11,0.08),transparent_28%),radial-gradient(circle_at_86%_22%,rgba(219,39,119,0.08),transparent_30%),radial-gradient(circle_at_78%_82%,rgba(14,165,233,0.08),transparent_34%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-7"
          >
            <p className="mb-3 inline-flex rounded-full border border-black/10 px-4 py-1.5 text-[14px] font-bold uppercase tracking-[0.2em] text-zinc-700 dark:border-white/15 dark:text-zinc-300">
              Why Us?
            </p>
            <h2 className="max-w-4xl text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-100 md:text-6xl">
              Crafted precision with enterprise-grade trust.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-base">
              A production partner built for brands that care about color,
              confidentiality, and turnaround without compromise.
            </p>
          </motion.div>

          <motion.div
            ref={badgeRef}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="self-start w-full lg:col-span-5 lg:origin-top-right lg:scale-[0.86] lg:-translate-x-4 lg:translate-y-6"
          >
            <div className="relative overflow-hidden rounded-3xl border border-zinc-300/30 bg-[linear-gradient(132deg,#0b0e13,#222a35_54%,#566170)] px-3 py-2 shadow-[0_36px_95px_-56px_rgba(0,0,0,0.85)] dark:border-zinc-200/25 sm:p-6">
              <div className="pointer-events-none absolute inset-[1px] rounded-[22px] border border-white/10" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_16%,rgba(255,255,255,0.24),transparent_34%),radial-gradient(circle_at_90%_84%,rgba(212,212,216,0.16),transparent_34%)]" />
              <div className="pointer-events-none absolute inset-0 opacity-35 bg-[repeating-linear-gradient(110deg,rgba(255,255,255,0.045)_0px,rgba(255,255,255,0.045)_1px,transparent_1px,transparent_9px)]" />
              <motion.div
                initial={{ x: "-160%", skewX: -20 }}
                animate={
                  badgeInView
                    ? { x: ["-160%", "300%"], skewX: -20 }
                    : { x: "-160%", skewX: -20 }
                }
                transition={
                  badgeInView
                    ? {
                        duration: 1.5,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "loop",
                        repeatDelay: 1,
                      }
                    : { duration: 0.2, ease: "linear" }
                }
                className="pointer-events-none absolute inset-0 z-[1] w-[52%] bg-gradient-to-r from-transparent via-white/25 to-transparent dark:via-white/15"
              />
              <div className="pointer-events-none absolute left-0 top-0 h-full w-[2px] bg-zinc-200/30" />
              <div className="relative z-[2] grid grid-cols-[64px_1fr] items-center gap-2.5 sm:grid-cols-[96px_1fr] sm:items-stretch sm:gap-5">
                <div className="relative flex h-30 w-16 justify-self-center flex-col justify-center rounded-2xl border border-zinc-100/40 bg-[linear-gradient(180deg,#d4d4d8_0%,#b8c0cb_26%,#8b929e_54%,#474b53_100%)] px-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-10px_18px_rgba(0,0,0,0.24),0_12px_24px_rgba(0,0,0,0.35)] sm:h-40 sm:w-24 sm:self-auto sm:px-3">
                  <div className="pointer-events-none absolute inset-[2px] rounded-xl border border-white/35" />
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(110deg,rgba(255,255,255,0.2)_0%,transparent_35%,rgba(255,255,255,0.08)_70%,transparent_100%)]" />
                  <div className="text-center leading-none text-zinc-700 [text-shadow:0_1px_0_rgba(255,255,255,0.18),0_-1px_0_rgba(0,0,0,0.34),0_-2px_2px_rgba(0,0,0,0.18)]">
                    <div className="text-[1.8rem] font-black tracking-tight leading-none sm:text-[3rem]">
                      37
                      <span className="ml-0.5 align-top text-[1.2rem] leading-none sm:text-[2.1rem]">+</span>
                    </div>
                    <div className="mt-1 text-[8px] font-bold uppercase tracking-[0.18em] text-zinc-700/95 sm:text-[11px] sm:tracking-[0.24em]">
                      Years
                    </div>
                  </div>
                </div>
                <div className="min-w-0 w-full p-2 sm:p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[.6em] text-zinc-300 sm:text-[13px] sm:tracking-[0.5em]">
                    TRUSTED TECH PUB
                  </p>
                  <h3 className="mt-1.5 text-[2rem] font-black leading-[1.02] tracking-tight text-white sm:text-[2.35rem]">
                    Print Mastery
                  </h3>
                  <div className="mt-2 flex items-center gap-2 text-zinc-100 sm:mt-3 sm:gap-3">
                    <span className="h-px w-5 bg-zinc-200/55 sm:w-8" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-[12px] sm:tracking-[0.24em]">Since 1989</span>
                  </div>
                  <p className="mt-2 text-[10.5px] leading-[1.45] text-zinc-200/90 sm:mt-3 sm:text-sm sm:leading-relaxed">
                    <span className="block sm:inline">Consistent output, color reliability, and press-floor discipline built over generations. </span>
                  
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {highlights.map((item, index) => {
            const isActive = activeCardId === item.id;
            const cardBody = (
              <>
                {item.tone !== "lock" ? (
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 z-[1] transition-opacity duration-300 bg-gradient-to-br",
                      cardToneClasses[item.tone],
                      isActive
                        ? "opacity-100"
                        : cn(
                            "opacity-0",
                            hoverEnabled &&
                              "md:group-hover:opacity-100 md:group-hover/spotlight:opacity-100"
                          )
                    )}
                  />
                ) : null}

                <div className="relative z-[2] h-36 w-full overflow-hidden rounded-2xl">
                  <CoverArt
                    tone={item.tone}
                    isHovered={item.tone === "logistics" && isActive}
                  />
                </div>

                <div className="relative z-[2] mt-5">
                  <div className="mb-3 flex items-center gap-3">
                    <div
                      className={cn(
                        "inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-black/10 px-2 text-[10px] font-bold tracking-[0.16em] text-zinc-700 dark:border-white/15 dark:text-zinc-300",
                        hoverEnabled && "md:group-hover/spotlight:border-white/20 md:group-hover/spotlight:text-zinc-300",
                        isActive && "border-white/20 text-zinc-300"
                      )}
                    >
                      {item.id}
                    </div>
                    <div
                      className={cn(
                        "grid h-7 w-7 place-items-center rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900",
                        hoverEnabled && "md:group-hover/spotlight:bg-zinc-100 md:group-hover/spotlight:text-zinc-900",
                        isActive && "bg-zinc-100 text-zinc-900"
                      )}
                    >
                      {item.icon}
                    </div>
                  </div>

                  <h3
                    className={cn(
                      "text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100",
                      hoverEnabled && "md:group-hover/spotlight:text-zinc-100",
                      isActive && "text-zinc-100"
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400",
                      hoverEnabled && "md:group-hover/spotlight:text-zinc-400",
                      isActive && "text-zinc-400"
                    )}
                  >
                    {item.description}
                  </p>
                </div>
              </>
            );

            return (
              <motion.article
                key={item.id}
                data-card-id={item.id}
                ref={(node) => {
                  cardRefs.current[item.id] = node;
                }}
                onMouseEnter={
                  hoverEnabled ? () => setActiveCardId(item.id) : undefined
                }
                onMouseLeave={
                  hoverEnabled ? () => setActiveCardId(null) : undefined
                }
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={cn(
                  item.tone === "lock"
                    ? "rounded-3xl"
                    : item.tone === "pantone"
                      ? "group relative overflow-visible rounded-3xl"
                      : item.tone === "prototype"
                        ? "group relative overflow-visible rounded-3xl border border-black/10 bg-neutral-500/25 p-5 shadow-[0_20px_60px_-42px_rgba(0,0,0,0.5)] backdrop-blur-lg transition-all duration-300 dark:border-white/10 dark:bg-zinc-900/45"
                      : "group relative overflow-hidden rounded-3xl border border-black/10 bg-neutral-500/25 p-5 shadow-[0_20px_60px_-42px_rgba(0,0,0,0.5)] backdrop-blur-lg transition-all duration-300 dark:border-white/10 dark:bg-zinc-900/45"
                )}
              >
                {item.tone === "prototype" ? (
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 z-[4] opacity-0 transition-opacity duration-200",
                      hoverEnabled && "md:group-hover:opacity-100",
                      isActive && "opacity-100"
                    )}
                  >
                    <span className="absolute -left-2.5 -top-2.5 h-5 w-5">
                      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-zinc-700/80 dark:bg-zinc-200/80" />
                      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-zinc-700/80 dark:bg-zinc-200/80" />
                    </span>
                    <span className="absolute -right-2.5 -top-2.5 h-5 w-5">
                      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-zinc-700/80 dark:bg-zinc-200/80" />
                      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-zinc-700/80 dark:bg-zinc-200/80" />
                    </span>
                    <span className="absolute -bottom-2.5 -left-2.5 h-5 w-5">
                      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-zinc-700/80 dark:bg-zinc-200/80" />
                      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-zinc-700/80 dark:bg-zinc-200/80" />
                    </span>
                    <span className="absolute -bottom-2.5 -right-2.5 h-5 w-5">
                      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-zinc-700/80 dark:bg-zinc-200/80" />
                      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-zinc-700/80 dark:bg-zinc-200/80" />
                    </span>
                  </div>
                ) : null}

                {item.tone === "lock" ? (
                  <CardSpotlight
                    active={isMobileInteraction ? isActive : false}
                    radius={400}
                    color="#262626"
                    lightColor="rgba(24, 24, 27, 0.72)"
                    lightModeTuned
                    dotSize={4}
                    pixelRefresh={5}
                    pixelGrid={4}
                    hoverTracking={hoverEnabled}
                    fullActive={isMobileInteraction}
                    className={cn(
                      "group !overflow-hidden !rounded-3xl !border !border-black/10 !bg-neutral-500/40 !p-5 !shadow-[0_20px_60px_-42px_rgba(0,0,0,0.5)] !backdrop-blur-lg !transition-colors !duration-300 dark:!border-white/10 dark:!bg-zinc-900/45",
                      hoverEnabled && "hover:!bg-black/90 hover:!border-white/10"
                    )}
                  >
                    {cardBody}
                  </CardSpotlight>
                ) : item.tone === "pantone" ? (
                  <>
                    {isActive ? (
                      <>
                        <BackgroundLines
                          className="pointer-events-none absolute -inset-12 z-[0] !h-[calc(100%+6rem)] !w-[calc(100%+6rem)] !bg-transparent opacity-100 [filter:saturate(1.9)_brightness(1.35)] dark:hidden"
                          svgOptions={{
                            duration: 3.2,
                            immediate: true,
                            colors: ["#00e5ff", "#5b8cff", "#8b5cf6", "#ff2fb3", "#ff6a00", "#00d084"],
                            strokeWidth: 3.2,
                          }}
                        >
                          <div />
                        </BackgroundLines>
                        <BackgroundLines
                          className="pointer-events-none absolute -inset-12 z-[0] hidden !h-[calc(100%+6rem)] !w-[calc(100%+6rem)] !bg-transparent opacity-75 dark:block"
                          svgOptions={{ duration: 3.2, immediate: true }}
                        >
                          <div />
                        </BackgroundLines>
                      </>
                    ) : null}
                    <div className="relative z-[1] overflow-hidden rounded-3xl border border-black/10 bg-neutral-500/25 p-5 shadow-[0_20px_60px_-42px_rgba(0,0,0,0.5)] backdrop-blur-lg transition-all duration-300 dark:border-white/10 dark:bg-zinc-900/45">
                      {cardBody}
                    </div>
                  </>
                ) : (
                  cardBody
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
