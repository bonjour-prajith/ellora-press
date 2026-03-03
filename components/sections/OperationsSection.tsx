"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpenCheck,
  ChevronDown,
  ChevronUp,
  Factory,
  Maximize2,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";

type Capability = {
  label: string;
  title: string;
  description: string;
  points: string[];
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  imagePosition: string;
};

const CAPABILITIES: Capability[] = [
  {
    label: "IN-HOUSE",
    title: "In-House",
    description:
      "Own machinery and all-in-house facilities keep quality and timelines under direct operational control.",
    points: ["Press to finishing", "Single-facility workflow"],
    icon: Factory,
    image: "/mitsubishi-for-website.webp",
    imagePosition: "52% 54%",
  },
  {
    label: "INNOVATION LAB",
    title: "Innovation Lab",
    description:
      "Out-of-the-box development for luxury and premium requirements with practical manufacturability.",
    points: ["Unique concepts", "Premium product builds"],
    icon: Sparkles,
    image: "/operations-section/1.webp",
    imagePosition: "56% 50%",
  },
  {
    label: "QUALITY CONTROL",
    title: "Quality Control",
    description:
      "Manual inspection checkpoints verify color, registration, and finishing consistency before dispatch.",
    points: ["Manual checks", "Dispatch gate"],
    icon: ShieldCheck,
    image: "/operations-section/2.webp",
    imagePosition: "54% 60%",
  },
  {
    label: "TECH PUBLISHING",
    title: "Tech Publishing",
    description:
      "Technical publication execution with modern software workflows and strong automobile industry experience.",
    points: ["Latest software", "Automobile documentation"],
    icon: BookOpenCheck,
    image: "/operations-section/3.webp",
    imagePosition: "54% 50%",
  },
];

export default function OperationsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);

  const active = CAPABILITIES[activeIndex];

  useEffect(() => {
    CAPABILITIES.forEach(({ image }) => {
      const img = new window.Image();
      img.src = image;
    });
  }, []);

  useEffect(() => {
    if (!previewOpen) return;

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreviewOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEsc);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onEsc);
    };
  }, [previewOpen]);

  return (
    <section className="snap-start border-t border-white/5 bg-background py-25 md:h-auto md:py-28">
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col px-4 md:px-6">
        <header className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.36em] text-foreground/45">Core Strengths</p>
          <h2 className="mt-2 text-[2.45rem] font-bold leading-[0.95] tracking-tighter text-foreground md:mt-3 md:text-7xl">
            Inside Our Print Engine
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-[13px] leading-snug text-foreground/78 md:mt-4 md:text-[22px]">
            Infrastructure, expertise, innovation, capability depth, quality control, and technical publication mastery.
          </p>
        </header>

        <div className="mt-8 grid min-h-0 items-start gap-5 md:mt-12 md:flex-1 md:gap-10 lg:mt-14 lg:grid-cols-[1.05fr_1fr]">
          <div className="min-h-0 lg:pt-1">
            <div className="hidden">
              <p className="text-sm leading-relaxed text-neutral-400">{active.description}</p>
            </div>
            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-foreground/[0.03] text-left"
              aria-label="Open facility image preview"
            >
              <div className="relative h-[180px] w-full md:h-[420px]">
                {CAPABILITIES.map((item, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <div
                      key={item.label}
                      className={`absolute inset-0 transition-opacity duration-300 ease-out will-change-[opacity] ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                      aria-hidden={!isActive}
                    >
                      <Image
                        src={item.image}
                        alt={`${item.title} visual`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 720px"
                        className="object-cover object-center md:[object-position:var(--desktop-object-position)]"
                        style={{ "--desktop-object-position": item.imagePosition } as CSSProperties}
                        quality={80}
                        priority
                        loading="eager"
                      />
                    </div>
                  );
                })}
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-transparent" />
              <span className="pointer-events-none absolute bottom-3 left-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/45 text-white/90 backdrop-blur-sm">
                <Maximize2 className="h-4 w-4" />
              </span>
            </button>
          </div>

          <div className="border-y border-white/10">
            {CAPABILITIES.map((item, index) => {
              const isActive = index === activeIndex;
              const Icon = item.icon;

              return (
                <div key={item.label} className="border-b border-white/10 last:border-b-0">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="flex w-full items-center justify-between gap-3 py-3 text-left md:py-7"
                    aria-expanded={isActive}
                    aria-controls={`capability-panel-${index}`}
                  >
                    <span className="inline-flex items-center gap-4">
                      <Icon className="h-5 w-5 text-foreground/85" />
                      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/88 md:text-sm md:tracking-[0.24em]">
                        {item.label}
                      </span>
                    </span>
                    {isActive ? (
                      <ChevronUp className="h-5 w-5 text-foreground/80" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-foreground/70" />
                    )}
                  </button>

                  <div
                    id={`capability-panel-${index}`}
                    className={`overflow-hidden transition-[max-height,opacity,margin,padding] duration-300 ease-out ${
                      isActive ? "max-h-64 opacity-100 pb-4" : "max-h-0 opacity-0 pb-0"
                    }`}
                  >
                    <p className="max-w-[95%] text-base leading-relaxed text-neutral-400 md:text-[18px]">
                      {item.description}
                    </p>
                    <div className="mt-3 space-y-1.5">
                      {item.points.map((point) => (
                        <p key={point} className="text-sm text-neutral-400 md:text-[15px]">
                          {point}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {previewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewOpen(false)}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-black/50"
            >
              <div className="relative h-[85vh] w-full">
                <Image
                  src={active.image}
                  alt={`${active.title} enlarged visual`}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-contain"
                  quality={84}
                />
              </div>
              <button
                type="button"
                onClick={() => setPreviewOpen(false)}
                className="absolute right-3 top-3 rounded-full bg-black/55 p-1.5 text-white/85 transition hover:bg-black/75"
                aria-label="Close image preview"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
