"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  {
    target: 480000,
    formatter: (value: number) => Intl.NumberFormat("en-IN").format(value),
    label: "Sheet Capacity per Day",
  },
  {
    target: 1000,
    formatter: (value: number) => `${Intl.NumberFormat("en-IN").format(value)}+`,
    label: "Brand Programs Delivered",
  },
  {
    target: 2,
    formatter: (value: number) => `${value} Crore+`,
    label: "Products delivered and counting",
  },
];

function CountUp({
  target,
  formatter,
  start,
  delay = 0,
  duration = 1200,
}: {
  target: number;
  formatter: (value: number) => string;
  start: boolean;
  delay?: number;
  duration?: number;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let rafId = 0;
    let timeoutId = 0;
    let startTime: number | null = null;

    const tick = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    timeoutId = window.setTimeout(() => {
      rafId = window.requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      window.cancelAnimationFrame(rafId);
    };
  }, [delay, duration, start, target]);

  return <>{formatter(value)}</>;
}

export function CredibilityStatsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasEntered = useInView(sectionRef, { once: true, amount: 0.35 });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-background py-36 md:py-52">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 divide-y divide-black/10 dark:divide-white/10 md:grid-cols-3 md:divide-y-0 md:divide-x">
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="py-10 text-center md:px-10 md:py-0"
            >
              <p className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-6xl">
                <CountUp
                  target={item.target}
                  formatter={item.formatter}
                  start={hasEntered}
                  delay={index * 120}
                />
              </p>
              <p className="mt-6 text-sm leading-7 md:leading-8 font-normal tracking-[0.02em] text-zinc-700 dark:text-zinc-300 md:text-lg">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <div className="absolute inset-x-0 bottom-0 h-12 bg-[linear-gradient(to_top,rgba(245,158,11,0.08),transparent)] dark:bg-[linear-gradient(to_top,rgba(217,119,6,0.1),transparent)]" />
        <div className="relative h-12 w-full">
          <div className="absolute inset-x-0 bottom-0 h-px bg-black/20 dark:bg-white/20" />
          <div className="absolute inset-x-0 bottom-0 h-3 bg-[repeating-linear-gradient(to_right,rgba(0,0,0,0.22)_0px,rgba(0,0,0,0.22)_1px,transparent_1px,transparent_24px)] dark:bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.24)_0px,rgba(255,255,255,0.24)_1px,transparent_1px,transparent_24px)] [mask-image:linear-gradient(to_top,black_0%,black_60%,transparent_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-5 bg-[repeating-linear-gradient(to_right,rgba(0,0,0,0.3)_0px,rgba(0,0,0,0.3)_1px,transparent_1px,transparent_96px)] dark:bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.34)_0px,rgba(255,255,255,0.34)_1px,transparent_1px,transparent_96px)] [mask-image:linear-gradient(to_top,black_0%,black_40%,transparent_100%)]" />
          <div className="absolute inset-x-0 bottom-6 flex justify-between px-3 text-[10px] font-mono tracking-[0.08em] text-zinc-600/70 dark:text-zinc-300/70">
            <span>0 in</span>
            <span>4 in</span>
            <span>8 in</span>
            <span>12 in</span>
          </div>
        </div>
      </div>
    </section>
  );
}
