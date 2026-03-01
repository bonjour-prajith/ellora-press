"use client";

import Link from "next/link";
import Lottie from "lottie-react";
import logoAnimation from "@/public/Logos/hourglasslogo-animate.json";

export default function MiniFooter() {
  return (
    <section className="px-6 pb-10 md:px-14">
      <div className="mx-auto max-w-6xl rounded-[1.5rem] border border-black/10 bg-white/60 px-5 py-4 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-black/50 md:px-7 md:py-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-neutral-900 dark:text-white">
            <span className="relative h-9 w-9 overflow-hidden">
              <Lottie animationData={logoAnimation} loop className="absolute inset-0 scale-[1.45]" />
            </span>
            <span className="text-xl font-bold tracking-tighter">Ellora</span>
            <span className="text-xl tracking-tighter">Press</span>
          </Link>
          <div className="flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
            <Link href="/about" className="transition hover:text-neutral-900 dark:hover:text-white">
              About
            </Link>
            <Link href="/products" className="transition hover:text-neutral-900 dark:hover:text-white">
              Products
            </Link>
            <Link href="/contact" className="transition hover:text-neutral-900 dark:hover:text-white">
              Contact
            </Link>
          </div>
        </div>
        <div className="mt-3 border-t border-black/10 pt-3 dark:border-white/10">
          <p className="text-xs text-neutral-500">© 2026 Ellora Press. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}
