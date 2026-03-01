"use client";
import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";
import logoAnimation from "@/public/Logos/hourglasslogo-animate.json";
import { LottieRefCurrentProps } from "lottie-react";
import Lottie from "lottie-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export const Navbar = ({ className }: { className?: string }) => {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    setMounted(true);
    const hideThreshold = pathname === "/" ? 1000 : 60;

    const handleScroll = () => {
      const scrollPos = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
      if (scrollPos > hideThreshold) { 
        setIsVisible(false);
        setIsOpen(false);
      } else {
        setIsVisible(true);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { capture: true, passive: true });
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [pathname]);

// New effect to force the Camera Toggle below the Navbar
  useEffect(() => {
    if (!mounted) return;

    const forceReposition = () => {
      // 1. Find the Vercel custom element
      const widget = document.querySelector('vercel-live-feedback');
      
      if (widget) {
        // 2. Force the container down (150px clears your navbar + safe area)
        widget.setAttribute('style', `
          top: 150px !important; 
          bottom: auto !important; 
          z-index: 2147483647 !important; 
          position: fixed !important;
          display: block !important;
        `);

        // 3. Pierce the Shadow DOM to find the actual icon button
        const shadowRoot = widget.shadowRoot;
        if (shadowRoot) {
          const innerButton = shadowRoot.querySelector('#vercel-live-feedback-widget');
          if (innerButton) {
            (innerButton as HTMLElement).style.top = '150px';
            (innerButton as HTMLElement).style.position = 'fixed';
          }
        }
      }
    };

    // Run immediately and then every 1 second for 5 seconds (to catch lazy loading)
    forceReposition();
    const interval = setInterval(forceReposition, 1000);
    
    return () => clearInterval(interval);
  }, [mounted]);

  const handleLoopComplete = () => {
    lottieRef.current?.pause();
    setTimeout(() => { lottieRef.current?.play(); }, 3000);
  };

  if (!mounted) return null;
  // Framer Motion variants for the hamburger lines
  const variantUpper = {
    closed: { rotate: 0, y: 0 },
    opened: { rotate: 45, y: 6 },
  };
  const variantMiddle = {
    closed: { opacity: 1 },
    opened: { opacity: 0 },
  };
  const variantLower = {
    closed: { rotate: 0, y: 0 },
    opened: { rotate: -45, y: -6 },
  };

  return (
    <> {/* FIX 1: Fragment wrapper allows two top-level elements (Navbar + Overlay) */}
      <div className={cn(
        "fixed inset-x-2 md:inset-x-0 md:max-w-4xl mx-auto z-[9000] px-4 transition-all duration-500 ease-in-out pointer-events-none",
        isVisible ? "top-4 md:top-10 opacity-100 translate-y-0" 
          : "-top-32 opacity-0 -translate-y-full pointer-events-none",
        className
      )}>
        <nav className="relative pointer-events-auto rounded-full border border-white/[0.2] bg-black/40 backdrop-blur-md shadow-[0_10px_32px_rgba(0,0,0,0.45)] supports-[backdrop-filter]:bg-black/70 flex items-center justify-between px-6 py-2">
          
          {/* BRANDING SECTION */}
          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/" className="flex items-center gap-1.5 md:gap-3 shrink-0 group">
              <div className="w-10 h-10 md:w-15 md:h-15 overflow-hidden flex items-center justify-center pointer-events-none">
                <Lottie 
                  lottieRef={lottieRef}
                  animationData={logoAnimation}
                  loop={true}
                  onLoopComplete={handleLoopComplete}
                  className="absolute w-full h-full transform scale-[1.3] origin-center"
                />
              </div>
              
              <div className="flex items-center gap-0.5 ml-1 h-[38px]">
                <span className="text-lg md:text-3xl font-bold tracking-tight leading-none text-white">
                  Ellora
                </span>
                <span className="text-lg md:text-3xl font-normal tracking-tight text-white">
                  Press
                </span>
              </div>
            </Link> {/* FIX 2: Branding Link ends HERE, not inside the Badge */}

            {/* EST 1989 BADGE */}
            <div className="hidden sm:flex items-center gap-3 h-[34px] border-l border-white/20 pl-3 md:pl-5">
              <span className="relative -bottom-[1.5px] text-[8px] md:text-[13px] font-light uppercase tracking-[0.15em] whitespace-nowrap text-neutral-400">
                Est. 1989
              </span>
            </div>
          </div>

          {/* RIGHT: DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-neutral-300 transition-colors hover:text-white"
              >
                {link.name}
              </Link>
            ))}
            <div className="h-5 w-[1px] bg-white/20 mx-2" />
            <ModeToggle />
          </div>

          {/* MAGNETIC PULSE TRIGGER */}
          <div className="flex md:hidden items-center gap-4">
            <ModeToggle />
            <button 
              onClick={() => setIsOpen(!isOpen)}
              // z-[11001] ensures it stays above the z-[11000] black overlay
              className="relative z-[8000] flex h-10 w-10 items-center justify-center group focus:outline-none"
            >
              {/* The Pulse Rings (Only visible when CLOSED) */}
              <AnimatePresence>
                {!isOpen && (
                  <>
                    <motion.div 
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                      className="absolute h-6 w-6 rounded-full border border-white/40 blur-[1px]"
                    />
                    <motion.div 
                      animate={isOpen ? { scale: 0 } : { scale: 1, backgroundColor: "rgba(255,255,255,0.6)" }}
                      className="absolute z-50 h-3 w-3 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                    />
                  </>
                )}
              </AnimatePresence>

              {/* The Close Icon (Only visible when OPENED) */}
              <AnimatePresence mode="wait">
    {!isOpen ? (
      /* The Pulse Core (Closed State) */
      <motion.div 
        key="pulse"
        className="h-3 w-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      />
    ) : (
      /* The High-Visibility X (Open State) */
      <motion.div 
        key="close"
        initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
        className="relative flex items-center justify-center h-6 w-6"
      >
        {/* These spans create a thick white X that pops on black bg */}
        <span className="absolute h-[2px] w-full bg-white rotate-45 rounded-full" />
        <span className="absolute h-[2px] w-full bg-white -rotate-45 rounded-full" />
      </motion.div>
    )}
  </AnimatePresence>
            </button>
          </div>
        </nav>
      </div>

      {/* OVERLAY: Liquid Expansion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 90% 5%)" }}
            animate={{ clipPath: "circle(150% at 90% 5%)" }}
            exit={{ clipPath: "circle(0% at 90% 5%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[8000] bg-black flex flex-col items-center justify-center gap-12 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-semibold tracking-tight text-white transition-all duration-300 hover:text-white/80"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}; // FIX 4: The Component ends here. No code should follow this brace.
