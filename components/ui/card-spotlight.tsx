"use client";

import { useMotionValue, motion, useMotionTemplate } from "motion/react";
import React, { MouseEvent as ReactMouseEvent, useState } from "react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { cn } from "@/lib/utils";

export const CardSpotlight = ({
  children,
  radius = 350,
  color = "#262626",
  lightColor = "rgba(148, 163, 184, 0.32)",
  showCanvas = true,
  lightModeTuned = false,
  lightModeVeil = false,
  dotSize = 3,
  pixelRefresh = 5,
  pixelGrid = 4,
  active = false,
  hoverTracking = true,
  fullActive = false,
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  lightColor?: string;
  showCanvas?: boolean;
  lightModeTuned?: boolean;
  lightModeVeil?: boolean;
  dotSize?: number;
  pixelRefresh?: number;
  pixelGrid?: number;
  active?: boolean;
  hoverTracking?: boolean;
  fullActive?: boolean;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  const isActive = (hoverTracking ? isHovering : false) || active;
  const spotlightMask = useMotionTemplate`
    radial-gradient(
      ${radius}px circle at ${mouseX}px ${mouseY}px,
      white,
      transparent 80%
    )
  `;

  return (
    <div
      className={cn(
        "group/spotlight p-10 rounded-md relative border border-neutral-800 bg-black dark:border-neutral-800",
        className
      )}
      onMouseMove={hoverTracking ? handleMouseMove : undefined}
      onMouseEnter={hoverTracking ? handleMouseEnter : undefined}
      onMouseLeave={hoverTracking ? handleMouseLeave : undefined}
      {...props}
    >
      <motion.div
        className={cn(
          "pointer-events-none absolute z-0 -inset-px rounded-[inherit] opacity-0 transition duration-300",
          hoverTracking && "group-hover/spotlight:opacity-100",
          isActive && "opacity-100"
        )}
        style={{
          backgroundColor: lightModeTuned ? undefined : color,
          maskImage:
            fullActive && active
              ? undefined
              : active && !isHovering
              ? `radial-gradient(${radius}px circle at 50% 50%, white, transparent 80%)`
              : spotlightMask,
        }}
      >
        {!lightModeTuned ? (
          <div
            className="absolute inset-0 hidden dark:block"
            style={{ backgroundColor: color }}
          />
        ) : null}
        {!lightModeTuned ? (
          <div
            className="absolute inset-0 dark:hidden"
            style={{ backgroundColor: lightColor }}
          />
        ) : null}
        {showCanvas && isActive ? (
          lightModeTuned ? (
            <>
              <div className="absolute inset-0 hidden dark:block" style={{ backgroundColor: color }} />
              <div className="absolute inset-0 dark:hidden">
                <CanvasRevealEffect
                  animationSpeed={5}
                  containerClassName="bg-transparent absolute inset-0 pointer-events-none [filter:saturate(1.1)_brightness(1.02)_contrast(1.02)]"
                  colors={[
                    [59, 130, 246],
                    [139, 92, 246],
                  ]}
                  dotSize={dotSize}
                  showGradient={false}
                  refreshRate={pixelRefresh}
                  totalSize={pixelGrid}
                />
              </div>
              <div className="absolute inset-0 hidden dark:block">
                <CanvasRevealEffect
                  animationSpeed={5}
                  containerClassName="bg-transparent absolute inset-0 pointer-events-none [filter:saturate(1.1)_brightness(1.02)_contrast(1.02)]"
                  colors={[
                    [59, 130, 246],
                    [139, 92, 246],
                  ]}
                  dotSize={dotSize}
                  refreshRate={pixelRefresh}
                  totalSize={pixelGrid}
                  showGradient={false}
                />
              </div>
            </>
          ) : (
            <CanvasRevealEffect
              animationSpeed={5}
              containerClassName="bg-transparent absolute inset-0 pointer-events-none [filter:saturate(1.1)_brightness(1.02)_contrast(1.02)]"
              colors={[
                [59, 130, 246],
                [139, 92, 246],
              ]}
              dotSize={dotSize}
              refreshRate={pixelRefresh}
              totalSize={pixelGrid}
              showGradient={false}
            />
          )
        ) : null}
        {lightModeVeil ? (
          <div className="pointer-events-none absolute inset-0 bg-white/55 dark:bg-transparent" />
        ) : null}
      </motion.div>
      {children}
    </div>
  );
};
