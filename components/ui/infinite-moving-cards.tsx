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

      const duration = speed === "fast" ? "30s" : speed === "normal" ? "60s" : "100s";
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
            className="relative flex h-12 w-[92px] flex-shrink-0 items-center justify-center px-0 group sm:h-12 sm:w-[102px] md:h-auto md:w-auto md:px-4"
          >
            <Image
              src={item.src}
              alt={item.name}
              width={200}
              height={100}
              sizes="(max-width: 768px) 92px, 200px"
              className="block h-11 w-auto max-w-full scale-[1.16] object-contain transition-all duration-500 opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 sm:h-11 sm:scale-[1.14] md:h-25 md:max-w-none md:scale-100"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
