"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProductItem {
  name: string;
  img: string;
}

interface ProductKit {
  id: string;
  label: string;
  category: string;
  tagline: string;
  items: ProductItem[];
}

interface ProductGalleryProps {
  products: ProductKit[];
}

export const ProductGallery = ({ products }: ProductGalleryProps) => {
  if (!products?.length) return null;

  const [activeKit, setActiveKit] = useState(products[0]);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const labels = ["Publications", "Packaging", "Branding", "Promotional"];
  const cmykPalette = ["#a2ffff", "#ff94ff", "#fbfb92", "#ffffff"];
  const activeItem = activeKit.items[activeItemIndex] ?? activeKit.items[0];

  const prevItem = () => {
    setActiveItemIndex((prev) => (prev - 1 + activeKit.items.length) % activeKit.items.length);
  };

  const nextItem = () => {
    setActiveItemIndex((prev) => (prev + 1) % activeKit.items.length);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? touchStartX) - touchStartX;
    if (Math.abs(delta) > 30) {
      if (delta < 0) nextItem();
      if (delta > 0) prevItem();
    }
    setTouchStartX(null);
  };

  return (
    <section
      id="products"
      className="relative overflow-hidden bg-background py-8 text-foreground transition-colors duration-500 md:pb-20 md:pt-28"
    >
      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-4 md:px-6">
        <div className="mb-5 border-b border-foreground/10 pb-6 pt-25 md:mb-12 md:pb-10 md:pt-10 lg:w-1/2 lg:max-w-none">
          <h2 className="mb-1 font-mono text-[10px] uppercase tracking-[0.4em] opacity-40 md:mb-4">
            Collection // 01
          </h2>
          <h3 className="text-[3.25rem] font-bold leading-[0.92] tracking-tighter md:text-[5.5rem]">
            What we do?
          </h3>
        </div>

        <div className="relative mb-5 grid grid-cols-2 gap-x-8 gap-y-4 pb-3 md:mb-16 md:pb-0 lg:w-1/2 lg:max-w-none lg:grid-cols-4 lg:gap-x-0 lg:gap-y-0">
          <div className="pointer-events-none absolute left-1/2 top-1 -bottom-1 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-foreground/14 to-transparent md:hidden" />
          <div className="pointer-events-none absolute left-3 right-3 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-foreground/14 to-transparent md:hidden" />
          {products.map((kit, index) => {
            const isActive = activeKit.id === kit.id;

            return (
              <button
                key={kit.id}
                onClick={() => {
                  setActiveKit(kit);
                  setActiveItemIndex(0);
                }}
                className="relative w-full overflow-visible px-1 py-2.5 text-center md:px-2 md:py-4 md:text-center lg:px-2"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeKitPill"
                    className="absolute left-1/2 top-[2px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-foreground/70 md:left-0 md:top-1/2 md:h-2 md:w-2 md:-translate-x-0 md:-translate-y-1/2"
                    transition={{ type: "spring", stiffness: 360, damping: 32 }}
                  />
                )}

                <span
                  className={cn(
                    "relative z-10 pt-1 font-mono text-[11px] uppercase tracking-[0.32em] transition-all duration-300 md:pt-0 md:pl-0 md:text-[13px] md:tracking-[0.22em]",
                    isActive
                      ? "text-foreground opacity-100"
                      : "text-foreground/35 hover:text-foreground/70"
                  )}
                >
                  {labels[index]}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="cmykUnderline"
                    className={cn(
                      "absolute bottom-0 left-1/2 h-[2px] w-[72%] -translate-x-1/2 rounded-full md:left-0 md:w-full md:translate-x-0 md:h-[5px]",
                      index === 3 && "bg-black dark:bg-white"
                    )}
                    style={index === 3 ? undefined : { backgroundColor: cmykPalette[index] }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-12">
          <div className="hidden lg:col-span-6 lg:flex lg:flex-col lg:pr-8">
            <div className="space-y-2">
              {activeKit.items.map((item, idx) => {
                const isActive = activeItemIndex === idx;
                return (
                  <button
                    key={item.name}
                    onMouseEnter={() => setActiveItemIndex(idx)}
                    onClick={() => setActiveItemIndex(idx)}
                    className={cn(
                      "w-full border-l-2 px-4 py-4 text-left transition-all duration-300",
                      isActive
                        ? "border-foreground bg-foreground/5 opacity-100"
                        : "border-foreground/10 opacity-35 hover:opacity-70"
                    )}
                  >
                    <span className="block truncate text-[22px] font-bold uppercase tracking-tight">
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-10 opacity-45">
              <p className="max-w-[320px] text-lg italic leading-relaxed font-light">"{activeKit.tagline}"</p>
            </div>
          </div>

          <div
            className="relative -mt-12 col-span-1 flex min-h-[47svh] items-center justify-center overflow-hidden rounded-[30px] bg-gradient-to-b from-foreground/[0.035] via-transparent to-foreground/[0.02] md:-mt-20 md:col-span-12 md:min-h-[560px] md:rounded-[34px] lg:absolute lg:right-0 lg:top-52 lg:w-1/2 lg:min-h-[600px] lg:items-start lg:justify-end"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_45%,rgba(255,255,255,0.07),transparent_58%)]" />
            <div className="pointer-events-none absolute inset-x-4 top-4 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />

            <AnimatePresence mode="wait">
              {activeKit.items.map((item, index) => {
                const isFront = activeItemIndex === index;
                const moveToIndex =
                  (index - activeItemIndex + activeKit.items.length) % activeKit.items.length;
                const isSvgAsset = item.img.toLowerCase().endsWith(".svg");

                return (
                  <motion.div
                    key={`${activeKit.id}-${item.name}`}
                    style={{ zIndex: activeKit.items.length - moveToIndex }}
                    animate={{
                      scale: isFront ? 1 : 0.9 - moveToIndex * 0.04,
                      y: isFront ? -8 : moveToIndex * 14,
                      x: isFront ? 0 : moveToIndex * 12,
                      opacity: isFront ? 1 : 0.15 - moveToIndex * 0.08,
                      rotate: isFront ? 0 : moveToIndex * 1.3,
                    }}
                    transition={{ type: "spring", stiffness: 220, damping: 20 }}
                    className="absolute flex aspect-square w-full max-w-[72vw] items-center justify-center sm:max-w-[70vw] md:max-w-[560px] lg:top-0 lg:right-0"
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={item.img}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 72vw, (max-width: 768px) 70vw, (max-width: 1280px) 560px, 620px"
                        className="object-contain drop-shadow-[0_20px_5px_rgba(0,0,0,0.7)]"
                        unoptimized={isSvgAsset}
                        quality={isSvgAsset ? undefined : 78}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            <motion.span
              key={activeItem.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.36 }}
              className="absolute bottom-22 hidden font-mono text-[10px] uppercase tracking-[0.36em] text-foreground/60 md:bottom-7 md:block"
            >
              REF // {activeItem.name.replace(/\s+/g, "_")}
            </motion.span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center lg:hidden">
          <div className="flex items-center gap-4">
            <motion.span
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="font-mono text-[17px] text-foreground/45"
            >
              ‹
            </motion.span>
            <div className="min-w-[220px] text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeItem.name}
                  initial={{ opacity: 0, filter: "blur(9px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(9px)" }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="truncate text-[12px] font-semibold uppercase tracking-[0.24em] text-foreground/92"
                >
                  {activeItem.name}
                </motion.p>
              </AnimatePresence>
              <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.26em] text-foreground/55">
                {activeItemIndex + 1} / {activeKit.items.length}
              </p>
            </div>
            <motion.span
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.25 }}
              className="font-mono text-[17px] text-foreground/45"
            >
              ›
            </motion.span>
          </div>
        </div>

        <div className="mt-6 pt-2 text-center lg:hidden">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/40">(swipe)</p>
        </div>
      </div>
    </section>
  );
};
