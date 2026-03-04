"use client";
import React, { useEffect, useRef, useState } from "react";
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
  const loopPauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRestartRef = useRef(false);
  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Marketing", href: "/digital-marketing" },
    { name: "Contact", href: "/contact" },
  ];
  const mobileNavLinks = [
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Marketing", href: "/digital-marketing" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const mountTimer = window.setTimeout(() => setMounted(true), 0);
    const hideThreshold = pathname === "/" ? 1000 : 60;

    const handleScroll = () => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      if (isMobile) {
        setIsVisible(true);
        return;
      }

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
    return () => {
      window.clearTimeout(mountTimer);
      window.removeEventListener("scroll", handleScroll, true);
    };
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

  useEffect(() => {
    return () => {
      if (loopPauseTimeoutRef.current) {
        clearTimeout(loopPauseTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Re-sync logo animation after route changes.
    lottieRef.current?.goToAndPlay(0, true);
    pendingRestartRef.current = false;
  }, [pathname]);

  useEffect(() => {
    const restartAnimation = () => {
      lottieRef.current?.stop();
      lottieRef.current?.goToAndPlay(0, true);
      pendingRestartRef.current = false;
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        if (loopPauseTimeoutRef.current) {
          clearTimeout(loopPauseTimeoutRef.current);
          loopPauseTimeoutRef.current = null;
        }
        restartAnimation();
      }
    };

    const handlePageShow = () => {
      if (document.visibilityState === "visible") {
        if (loopPauseTimeoutRef.current) {
          clearTimeout(loopPauseTimeoutRef.current);
          loopPauseTimeoutRef.current = null;
        }
        restartAnimation();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("focus", handleVisibility);
    window.addEventListener("pageshow", handlePageShow);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("focus", handleVisibility);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  const handleAnimationComplete = () => {
    if (loopPauseTimeoutRef.current) {
      clearTimeout(loopPauseTimeoutRef.current);
    }

    if (document.visibilityState !== "visible") {
      pendingRestartRef.current = true;
      return;
    }

    loopPauseTimeoutRef.current = setTimeout(() => {
      if (document.visibilityState === "visible") {
        lottieRef.current?.goToAndPlay(0, true);
        pendingRestartRef.current = false;
      } else {
        pendingRestartRef.current = true;
      }
    }, 3000);
  };

  if (!mounted) return null;
  return (
    <> {/* FIX 1: Fragment wrapper allows two top-level elements (Navbar + Overlay) */}
      <div className={cn(
        "fixed inset-x-2 md:inset-x-0 md:max-w-5xl mx-auto z-[9000] px-4 transition-all duration-500 ease-in-out pointer-events-none",
        isVisible ? "top-4 md:top-8 opacity-100 translate-y-0" 
          : "-top-32 opacity-0 -translate-y-full pointer-events-none",
        className
      )}>
        <nav className="relative pointer-events-auto rounded-full border border-white/[0.2] bg-black/40 backdrop-blur-md shadow-[0_10px_32px_rgba(0,0,0,0.45)] supports-[backdrop-filter]:bg-black/70 flex items-center justify-between px-6 py-2">
          
          {/* BRANDING SECTION */}
          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/" className="flex items-center gap-1.5 md:gap-3 shrink-0 group">
              <div className="w-13 h-13 md:w-15 md:h-15 overflow-hidden flex items-center justify-center pointer-events-none">
                <Lottie 
                  lottieRef={lottieRef}
                  animationData={logoAnimation}
                  loop={false}
                  onComplete={handleAnimationComplete}
                  className="absolute w-full h-full transform scale-[1.3] origin-center"
                />
              </div>
              
              <div className="flex items-center gap-0.5 ml-1 h-[38px]">
                <span className="text-2xl md:text-3xl font-bold tracking-tight leading-none text-white">
                  Ellora
                </span>
                <span className="text-2xl md:text-3xl font-normal tracking-tight text-white">
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
                prefetch={false}
                className="text-sm font-medium text-neutral-300 transition-colors hover:text-white"
              >
                {link.name}
              </Link>
            ))}
            <div className="h-5 w-[1px] bg-white/20 mx-2" />
            <ModeToggle />
          </div>

          {/* MAGNETIC PULSE TRIGGER */}
          <div className="flex md:hidden items-center gap-2">
            <ModeToggle />
            <div className="relative z-[8000] flex flex-col items-center justify-center">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                // z-[11001] ensures it stays above the z-[11000] black overlay
                className="relative flex h-10 w-12 items-center justify-center focus:outline-none"
              >
                <motion.span
                  initial={false}
                  animate={{ opacity: isOpen ? 0 : 1 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold uppercase tracking-[0.14em] text-white"
                >
                  Menu
                </motion.span>
                <motion.div
                  initial={false}
                  animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.9 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="absolute h-[1.5px] w-5 rounded-full bg-white rotate-45" />
                  <span className="absolute h-[1.5px] w-5 rounded-full bg-white -rotate-45" />
                </motion.div>
              </button>
            </div>
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
            {mobileNavLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
              >
                <Link
                  href={link.href}
                  prefetch={false}
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
