"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

export const QuoteModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [details, setDetails] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
        setSubmitError("");
        setIsSubmitting(false);
      }, 300); 
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  
  const handleVanishSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (isSubmitting) return;
  setSubmitError("");

  // 1. Validation
  if (!email.includes("@")) {
    setSubmitError("Please enter a valid email.");
    return;
  }
  if (details.length < 5) {
    setSubmitError("Please provide a bit more detail about your project.");
    return;
  }

  setIsSubmitting(true);
  try {
    // 2. Perform the API call directly
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, details }),
    });

    if (response.ok) {
      // 3. Success state triggered immediately after successful response
      setIsSubmitted(true);
      
      // 4. Close the modal after a delay
      setTimeout(() => {
        onClose();
      }, 3000);
    } else {
      const errorData = await response.json().catch(() => null);
      const message =
        errorData && typeof errorData.error === "string"
          ? errorData.error
          : "Unable to send your request right now.";
      setSubmitError(message);
    }
  } catch (error) {
    // 6. Handle network/connection issues
    console.error("Network error:", error);
    setSubmitError("Something went wrong. Please check your connection.");
  } finally {
    setIsSubmitting(false);
  }
};

  const placeholders = [
    "500 Hardcover books with gold foil...",
    "170gsm Calendars, MultiColor...",
    "Custom magazines, 100gsm paper...",
    "Large format banners for an event...",
  ];

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-[12000] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/5 dark:bg-black/20 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-xl overflow-hidden rounded-[3.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)]
                       bg-white/30 dark:bg-neutral-900/30 
                       backdrop-blur-3xl 
                       border border-white/60 dark:border-white/20"
          >
            {/* --- SHINE ANIMATION LAYER --- */}
            <motion.div 
              initial={{ x: "-150%", skewX: -20 }}
              animate={{ x: "150%" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
              className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent w-[50%]"
            />

            <button 
              onClick={onClose} 
              type="button"
              aria-label="Close quote request modal"
              className="absolute right-4 top-4 z-50 rounded-full p-2 text-neutral-500 transition-colors hover:bg-black/5 dark:hover:bg-white/5 sm:right-8 sm:top-8"
            >
              <X size={20} />
            </button>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  className="relative z-10"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6 pr-12 text-left sm:mb-10 sm:pr-0 sm:text-center">
                    <h2 className="mb-2 text-2xl font-bold tracking-tighter text-neutral-900 dark:text-white md:text-4xl">Request a Quote</h2>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                      Our team will get back to you with pricing details.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 sm:gap-6">
                    <div className="flex flex-col gap-1.5 sm:gap-2">
                      <label className="ml-3 text-[9px] font-bold uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400 sm:ml-5 sm:text-[10px] sm:tracking-[0.2em]">
                        Contact Email
                      </label>
                      <input 
                        type="email" 
                        placeholder="hello@yourbrand.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        inputMode="email"
                        aria-describedby={submitError ? "quote-modal-feedback" : undefined}
                        className="h-12 w-full rounded-full border border-white/40 bg-white/40 px-5 text-sm text-neutral-900 outline-none transition-all placeholder:text-neutral-500 focus:ring-2 focus:ring-purple-500/30 dark:border-white/10 dark:bg-black/20 dark:text-white sm:h-14 sm:px-8"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 sm:gap-2">
                      <label className="ml-3 text-[9px] font-bold uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400 sm:ml-5 sm:text-[10px] sm:tracking-[0.2em]">
                        Project Details
                      </label>
                      <PlaceholdersAndVanishInput
                        placeholders={placeholders}
                        onChange={(e) => setDetails(e.target.value)}
                        onSubmit={handleVanishSubmit}
                      />
                    </div>
                    {submitError ? (
                      <p
                        id="quote-modal-feedback"
                        role="alert"
                        aria-live="assertive"
                        className="text-sm text-rose-600 dark:text-rose-400"
                      >
                        {submitError}
                      </p>
                    ) : null}
                    {isSubmitting ? (
                      <p className="sr-only" role="status" aria-live="polite">
                        Sending your request.
                      </p>
                    ) : null}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-10 text-center relative z-10"
                >
                  <div className="h-24 w-24 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6 shadow-inner backdrop-blur-xl">
                     <Check size={48} strokeWidth={3} />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight mb-2 text-neutral-900 dark:text-white">Request Received!</h2>
                  <p className="text-neutral-600 dark:text-neutral-300 max-w-[250px]">
                    We've received your details and will contact you shortly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
