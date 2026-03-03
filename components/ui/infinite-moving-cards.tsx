"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";

export const InfiniteMovingCards = ({
  items,
  direction = "right",
  speed = "slow",
  className,
}: {
  items: { src: string; name: string; }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const activeLogoRef = React.useRef<HTMLImageElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [start, setStart] = useState(false);

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      
      // Duplicate items for the infinite loop
      if (scrollerRef.current.children.length === items.length) {
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          scrollerRef.current?.appendChild(duplicatedItem);
        });
      }

      const duration = speed === "fast" ? "24s" : speed === "normal" ? "50s" : "85s";
      containerRef.current.style.setProperty("--animation-duration", duration);
      containerRef.current.style.setProperty("--animation-direction", direction === "left" ? "forwards" : "reverse");
      
      setStart(true);
    }
  }, [direction, speed, items.length]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      // Small delay to ensure DOM is ready for the animation properties
      const timer = setTimeout(() => addAnimation(), 100);
      return () => clearTimeout(timer);
    }
  }, [mounted, addAnimation]);

  useEffect(() => {
    const container = containerRef.current;
    const scroller = scrollerRef.current;
    if (!container || !scroller || !mounted || !start || typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width: 767px) and (hover: none)");
    let rafId: number | null = null;
    const switchThresholdPx = 12;

    const clearActive = () => {
      if (activeLogoRef.current) {
        delete activeLogoRef.current.dataset.centerActive;
        activeLogoRef.current = null;
      }
    };

    const tick = () => {
      if (!mediaQuery.matches) {
        clearActive();
        rafId = requestAnimationFrame(tick);
        return;
      }

      const logos = scroller.querySelectorAll<HTMLImageElement>(".mobile-logo-highlight");
      if (!logos.length) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;
      let closestLogo: HTMLImageElement | null = null;
      let closestDistance = Number.POSITIVE_INFINITY;

      logos.forEach((logo) => {
        const rect = logo.getBoundingClientRect();
        const logoCenterX = rect.left + rect.width / 2;
        const distance = Math.abs(centerX - logoCenterX);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestLogo = logo;
        }
      });

      const currentActiveLogo = activeLogoRef.current;
      const currentDistance = currentActiveLogo
        ? Math.abs(
            centerX -
              (currentActiveLogo.getBoundingClientRect().left +
                currentActiveLogo.getBoundingClientRect().width / 2)
          )
        : Number.POSITIVE_INFINITY;

      const shouldSwitch =
        !currentActiveLogo ||
        (closestLogo !== currentActiveLogo && closestDistance + switchThresholdPx < currentDistance);

      if (shouldSwitch) {
        if (currentActiveLogo) {
          delete currentActiveLogo.dataset.centerActive;
        }

        if (closestLogo) {
          closestLogo.dataset.centerActive = "true";
        }

        activeLogoRef.current = closestLogo;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      clearActive();
    };
  }, [mounted, start]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 items-center flex-nowrap gap-0 py-0.5 md:gap-1 md:py-4",
          start && "animate-scroll",
        )}
      >
        {items.map((item, idx) => (
          <li
            key={`${item.name}-${idx}`}
            className="relative flex h-16 w-[116px] flex-shrink-0 items-center justify-center px-0 group sm:h-16 sm:w-[124px] md:h-auto md:w-auto md:px-4"
          >
            <Image
              src={item.src}
              alt={item.name}
              width={280}
              height={140}
              sizes="(max-width: 768px) 160px, 280px"
              className="mobile-logo-highlight block h-[3.75rem] w-auto max-w-full object-contain transition-all duration-500 opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 sm:h-[3.75rem] md:h-25 md:max-w-none"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
