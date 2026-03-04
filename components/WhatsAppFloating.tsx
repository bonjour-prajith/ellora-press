"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const QUICK_QUOTE_WHATSAPP_URL =
  "https://wa.me/918939000230?text=Hi%20Ellora%20Press%2C%20I%20need%20a%20quick%20quote.";
const QUICK_QUOTE_QR_SRC = "/QR-WA.jpg?v=2";

export function WhatsAppFloating() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMobilePopupView, setIsMobilePopupView] = useState(false);
  const dockRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px), (hover: none)");
    const update = () => setIsMobilePopupView(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isPopupOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const targetNode = event.target as Node | null;
      if (!targetNode) return;
      if (dockRef.current?.contains(targetNode) || popupRef.current?.contains(targetNode)) return;
      setIsPopupOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isPopupOpen]);

  return (
    <div
      ref={dockRef}
      className={cn(
        "fixed right-4 z-[10050]",
        isMobilePopupView
          ? "bottom-[calc(env(safe-area-inset-bottom)+5.4rem)]"
          : "right-12 top-[calc(env(safe-area-inset-top)+1.75rem)]"
      )}
    >
      {typeof window !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {isPopupOpen ? (
                <motion.div
                  key="whatsapp-page-tint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="fixed inset-0 z-[10055] bg-black/25"
                />
              ) : null}
              {isPopupOpen ? (
                <motion.div
                  ref={popupRef}
                  key="whatsapp-qr-popover"
                  initial={isMobilePopupView ? { opacity: 0, y: 10 } : { opacity: 0, x: 10 }}
                  animate={isMobilePopupView ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
                  exit={isMobilePopupView ? { opacity: 0, y: 10 } : { opacity: 0, x: 10 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "fixed z-[10060] overflow-hidden rounded-2xl border border-white/20 bg-black/82 p-3 shadow-[0_10px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl",
                    isMobilePopupView
                      ? "bottom-[calc(env(safe-area-inset-bottom)+9rem)] right-4 w-[10.6rem]"
                      : "right-24 top-[calc(env(safe-area-inset-top)+3.75rem)] w-[11.2rem]"
                  )}
                >
                  <p className="mb-2 text-center text-[9px] font-semibold uppercase tracking-[0.22em] text-white/70">
                    Quick Quote
                  </p>
                  {isMobilePopupView ? (
                    <>
                      <a
                        href={QUICK_QUOTE_WHATSAPP_URL}
                        aria-label="Open WhatsApp quick quote"
                        className="block rounded-xl border border-white/10 bg-white p-2"
                      >
                        <Image
                          src={QUICK_QUOTE_QR_SRC}
                          alt="Tap for a Quick Quote QR"
                          width={140}
                          height={140}
                          unoptimized
                          className="h-full w-full object-contain"
                        />
                      </a>
                      <p className="mt-2 text-center text-[10px] font-medium tracking-[0.08em] text-white">
                        Tap QR to open WA
                      </p>
                    </>
                  ) : (
                    <>
                      <a
                        href={QUICK_QUOTE_WHATSAPP_URL}
                        aria-label="Open WhatsApp quick quote"
                        className="block rounded-xl border border-white/10 bg-white p-2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={QUICK_QUOTE_QR_SRC}
                          alt="Tap for a Quick Quote QR"
                          width={140}
                          height={140}
                          unoptimized
                          className="h-full w-full object-contain"
                        />
                      </a>
                      <p className="mt-2 text-center text-[10px] font-medium tracking-[0.08em] text-white">
                        Tap QR to open WA
                      </p>
                    </>
                  )}
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}

      <button
        onClick={() => setIsPopupOpen((previous) => !previous)}
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-black/72 text-white/65 shadow-lg transition-opacity duration-150 hover:border-green-400/45 hover:bg-black/88 hover:text-white hover:shadow-[0_0_18px_rgba(34,197,94,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400",
          isPopupOpen && "border-green-400/70 bg-black/90 text-white shadow-[0_0_18px_rgba(34,197,94,0.38)]"
        )}
        title="Open WhatsApp quick quote QR"
        aria-label="Open WhatsApp quick quote QR"
        type="button"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2.004a9.92 9.92 0 0 0-8.607 14.9L2 22l5.24-1.37a9.96 9.96 0 0 0 4.8 1.225h.004a9.96 9.96 0 0 0 9.955-9.925 9.87 9.87 0 0 0-2.914-7.037 9.93 9.93 0 0 0-7.045-2.89Zm0 18.193h-.003a8.29 8.29 0 0 1-4.233-1.16l-.304-.18-3.11.813.83-3.032-.198-.311a8.24 8.24 0 0 1-1.273-4.39 8.3 8.3 0 0 1 8.297-8.286 8.24 8.24 0 0 1 5.89 2.417 8.2 8.2 0 0 1 2.43 5.86 8.3 8.3 0 0 1-8.326 8.269Zm4.55-6.241c-.248-.124-1.465-.722-1.692-.804-.228-.083-.393-.124-.56.124-.166.247-.642.804-.787.97-.145.165-.29.186-.538.062-.248-.124-1.047-.384-1.994-1.224-.737-.652-1.236-1.458-1.38-1.705-.145-.248-.016-.382.109-.505.112-.111.248-.289.373-.434.124-.145.166-.247.249-.412.082-.166.041-.31-.021-.434-.063-.124-.56-1.345-.767-1.84-.202-.484-.408-.418-.56-.426l-.476-.008c-.165 0-.434.062-.662.31-.228.247-.87.85-.87 2.073s.89 2.404 1.014 2.57c.124.165 1.754 2.673 4.248 3.748.594.257 1.057.411 1.418.526.596.19 1.14.163 1.569.099.478-.071 1.465-.598 1.673-1.176.207-.578.207-1.074.145-1.176-.062-.103-.228-.165-.476-.289Z" />
        </svg>
      </button>
    </div>
  );
}
