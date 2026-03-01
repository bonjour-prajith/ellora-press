"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Logic to catch scroll regardless of container
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollPos > 400);
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          // REMOVED: fixed, bottom, right, transition-all
          className="fixed bottom-6 right-5 z-[9100] p-4 rounded-full border border-black/10 dark:border-white/20 bg-white/50 dark:bg-black/50 backdrop-blur-xl shadow-2xl group flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6 text-black dark:text-white transition-transform group-hover:-translate-y-1" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
