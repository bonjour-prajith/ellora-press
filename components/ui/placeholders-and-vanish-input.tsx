"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  onSubmit,
}: {
  placeholders: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAnimation = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
  }, [placeholders.length]);

  useEffect(() => {
    startAnimation();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAnimation]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  type ParticleFrame = { x: number; y: number; r: number; color: string };
  const newDataRef = useRef<ParticleFrame[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [animating, setAnimating] = useState(false);

  const draw = useCallback(() => {
    if (!inputRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const rect = inputRef.current.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    ctx.clearRect(0, 0, rect.width, rect.height);
    const computedStyles = getComputedStyle(inputRef.current);
    const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));
    ctx.font = `${fontSize}px ${computedStyles.getPropertyValue("font-family")}`;
    ctx.fillStyle = "#FFF";

    // Center text vertically in the canvas
    ctx.fillText(value, 16, rect.height / 2 + fontSize / 3);

    const imageData = ctx.getImageData(0, 0, rect.width, rect.height);
    const pixelData = imageData.data;
    const frames: ParticleFrame[] = [];

    // loop through pixels based on actual canvas dimensions
    for (let t = 0; t < rect.height; t += 1) {
      for (let i = 0; i < rect.width; i += 1) {
        const pixelIndex = (t * Math.floor(rect.width) + i) * 4;
        if (pixelData[pixelIndex + 3] > 0) { // Check alpha channel
          frames.push({
            x: i,
            y: t,
            r: 1,
            color: `rgba(${pixelData[pixelIndex]}, ${pixelData[pixelIndex + 1]}, ${pixelData[pixelIndex + 2]}, ${pixelData[pixelIndex + 3] / 255})`,
          });
        }
      }
    }
    newDataRef.current = frames;
  }, [value]);

  useEffect(() => {
    draw();
  }, [value, draw]);

  const vanishAndSubmit = () => {
    setAnimating(true);
    const canvas = canvasRef.current;
    if (!canvas || !inputRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = inputRef.current.getBoundingClientRect();
    const maxX = newDataRef.current.reduce(
      (prev, current) => (current.x > prev ? current.x : prev),
      0
    );

    const animateFrame = (pos: number) => {
      requestAnimationFrame(() => {
        const newArr = [];
        ctx.clearRect(0, 0, rect.width, rect.height);

        for (let i = 0; i < newDataRef.current.length; i++) {
          const current = newDataRef.current[i];

          if (current.x < pos) {
            // Static text part
            newArr.push(current);
            ctx.fillStyle = current.color;
            ctx.fillRect(current.x, current.y, current.r, current.r);
          } else {
            // Particle part
            if (current.r <= 0) continue;

            current.x += Math.random() * 2 + 1; // Move right
            current.y += (Math.random() - 0.5) * 1.5;
            current.r -= 0.03 * Math.random();

            newArr.push(current);
            ctx.beginPath();
            ctx.fillStyle = current.color;
            ctx.fillRect(current.x, current.y, current.r, current.r);
          }
        }

        newDataRef.current = newArr;

        if (newDataRef.current.length > 0) {
          animateFrame(pos - 4); // Speed of the sweep
        } else {
          setValue("");
          setAnimating(false);
        }
      });
    };

    animateFrame(maxX);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value || animating) return;
    vanishAndSubmit();
    if (onSubmit) onSubmit(e);
  };

  return (
    <form
      className={cn(
        "w-full relative max-w-xl mx-auto bg-white dark:bg-zinc-800 h-12 rounded-full overflow-hidden shadow-lg transition duration-200",
        value && "bg-gray-50"
      )}
      onSubmit={handleSubmit}
    >
      <canvas
        className={cn(
          "absolute pointer-events-none transform top-0 left-0 filter invert dark:invert-0",
          !animating ? "opacity-0" : "opacity-100"
        )}
        ref={canvasRef}
      />
      <input
        onChange={(e) => {
          if (!animating) {
            setValue(e.target.value);
            if (onChange) onChange(e);
          }
        }}
        ref={inputRef}
        value={value}
        type="text"
        className={cn(
          "w-full relative text-[16px] sm:text-base z-50 border-none dark:text-white bg-transparent text-black h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-10 pr-20",
          animating && "opacity-0"
        )}
      />
      {/* ... Button and Placeholder div remains same as your code ... */}
      <button
        disabled={!value}
        type="submit"
        className="absolute right-2 top-1/2 z-50 -translate-y-1/2 h-8 w-8 rounded-full disabled:bg-gray-100 bg-black dark:bg-zinc-900 transition duration-200 flex items-center justify-center"
      >
        <motion.svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-300 h-4 w-4">
          <path d="m5 12 7-7 7 7" /><path d="M12 19V5" />
        </motion.svg>
      </button>

      <div className="absolute inset-0 flex items-center rounded-full pointer-events-none">
        <AnimatePresence mode="wait">
          {!value && (
            <motion.p
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -5, opacity: 0 }}
              className="dark:text-zinc-500 text-sm sm:text-base font-normal text-neutral-500 pl-4 sm:pl-10"
            >
              {placeholders[currentPlaceholder]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
