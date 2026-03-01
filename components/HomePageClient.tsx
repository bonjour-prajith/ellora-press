"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/moving-border";
import { BookCard } from "@/components/ui/book-card";
import { Cover } from "@/components/ui/cover"; 
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { QuoteModal } from "@/components/QuoteModal";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useScroll, useTransform, animate } from "framer-motion";
import { Terminal, Tag, UploadCloud, Eye, Zap } from "lucide-react";
import { X, ChevronRight, ChevronLeft, Package, BookOpen, Layers, Send } from "lucide-react";

import { PRODUCT_DATA, bentoItems, partners } from "@/data/site-data";

const WebcamPixelGrid = dynamic(
  () => import("@/components/ui/webcam-pixel-grid").then((module) => module.WebcamPixelGrid),
  { ssr: false }
);
const WhyUsSection = dynamic(
  () => import("@/components/WhyUsSection").then((module) => module.WhyUsSection)
);
const CredibilityStatsSection = dynamic(
  () =>
    import("@/components/sections/CredibilityStatsSection").then(
      (module) => module.CredibilityStatsSection
    )
);
const ProductGallery = dynamic(
  () => import("@/components/sections/ProductGallery").then((module) => module.ProductGallery)
);
const OperationsSection = dynamic(() => import("@/components/sections/OperationsSection"));
const RoadmapSection = dynamic(() => import("@/components/sections/RoadmapSection"));
const Footer = dynamic(() => import("@/components/Footer"));



// --- SUB-COMPONENTS ---
const ProductStack = ({ images, items }: { images: string[], items: string[] }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="relative w-full h-[450px] flex items-center justify-center cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {images.map((src, index) => (
        <motion.div
          key={index}
          className="absolute w-64 h-80 bg-zinc-100 dark:bg-zinc-900 rounded-xl shadow-2xl overflow-hidden border border-black/5 dark:border-white/10"
          animate={{
            x: hovered ? (index - (images.length - 1) / 2) * 100 : index * 4,
            y: hovered ? -30 : index * 4,
            rotate: hovered ? (index - (images.length - 1) / 2) * 8 : 0,
            zIndex: hovered ? 50 : 10 - index,
            scale: hovered ? 1.05 : 1 - index * 0.05,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <div className="w-full h-full p-4 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm">
             <div className="relative h-48 w-full overflow-hidden rounded-lg shadow-lg">
               <Image
                 src={src}
                 alt={items[index]}
                 fill
                 sizes="256px"
                 className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
               />
             </div>
             <p className="mt-4 font-mono text-[9px] uppercase tracking-widest text-foreground/60 text-center">
               {items[index]}
             </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

interface WorkflowStep {
  title: string;
  desc: string;
  icon: React.ReactNode;
  btn?: boolean;
  highlight?: boolean;
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [webcamError, setWebcamError] = useState<string | null>("initial"); // Set a string to trigger the popup
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showCameraPromptIcon, setShowCameraPromptIcon] = useState(false);
  const [cameraKnobActive, setCameraKnobActive] = useState(false);
  const [cameraRequestPending, setCameraRequestPending] = useState(false);
  const [isMobilePopupView, setIsMobilePopupView] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeKit, setActiveKit] = useState(PRODUCT_DATA[0]);
  const [hoveredProductIndex, setHoveredProductIndex] = useState(0);
  const [isTeaserCardRevealed, setIsTeaserCardRevealed] = useState(false);
  const currentYear = new Date().getFullYear();
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroPointerEvents = useTransform(scrollY, [0, 300], ["auto", "none"]);
  


  const steps = [
    { title: "Input Specs", desc: "Hit 'Get Quote' and type your requirements. They are pulled directly into our system.", icon: <Terminal size={20} />, btn: true },
    { title: "Get Pricing", desc: "Receive your quotation via email along with a quality checklist for your design files.", icon: <Tag size={20} /> },
    { title: "Send Files", desc: "Send files to solutions@ellorapress.com. No design? We can help you with that.", icon: <UploadCloud size={20} /> },
    { title: "Free Proof", desc: "Review a free physical sample of your product before the press rolls.", icon: <Eye size={20} /> },
    { title: "Warp Speed", desc: "Your amazing products are printed, finished, and delivered at Ellora Press speed.", icon: <Zap size={20} />, highlight: true }
  ];
  

  useEffect(() => {
    // ALL OBSERVER LOGIC MUST BE INSIDE USEEFFECT
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0% -20% 0%',
        threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const index = entry.target.getAttribute('data-index');
                if (index !== null) setActiveTab(parseInt(index));
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const targets = document.querySelectorAll('.why-us-content-block');
    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (webcamError !== "initial") return;

    let timer: number | null = null;
    const handleIntroComplete = () => {
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        setShowErrorPopup(true);
      }, 1500);
    };

    window.addEventListener("opening-intro:complete", handleIntroComplete);
    return () => {
      if (timer) window.clearTimeout(timer);
      window.removeEventListener("opening-intro:complete", handleIntroComplete);
    };
  }, [webcamError]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px), (hover: none)");
    const update = () => setIsMobilePopupView(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  


  // --- LOGIC FUNCTIONS ---

  const getCameraErrorMessage = (err: unknown) => {
    const error = err as DOMException | Error | undefined;
    const name = error?.name;

    if (name === "NotAllowedError" || name === "PermissionDeniedError") {
      if (!window.isSecureContext && location.hostname !== "localhost") {
        return "Camera requires HTTPS (or localhost). Open the site on a secure origin and try again.";
      }
      return "Camera permission was denied. Please allow camera access for this site in your browser settings.";
    }
    if (name === "NotFoundError" || name === "DevicesNotFoundError") {
      return "No camera was detected on this device.";
    }
    if (name === "NotReadableError" || name === "TrackStartError") {
      return "Your camera is busy in another app/tab. Close other camera apps and try again.";
    }
    if (name === "OverconstrainedError" || name === "ConstraintNotSatisfiedError") {
      return "Current camera constraints are not supported on this device.";
    }
    if (name === "AbortError") {
      return "Camera initialization was interrupted. Please try again.";
    }
    return "Unable to access the camera right now. Please try again.";
  };

  const disableCamera = () => {
    setIsWebcamActive(false);
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setWebcamError("initial"); 
    setShowErrorPopup(false);
    setShowCameraPromptIcon(true);
    setCameraKnobActive(false);
  };

  const requestCameraAccess = async (): Promise<boolean> => {
    if (!navigator?.mediaDevices?.getUserMedia) {
      const message = "Your browser does not support webcam access.";
      setWebcamError(message);
      setShowErrorPopup(true);
      alert(message);
      return false;
    }

    try {
      // 1. Physically request the stream to get permission
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
      });
      
      // 2. Update state to trigger component swap
      setCameraStream(stream);
      setIsWebcamActive(true);
      setWebcamError(null);
      setShowErrorPopup(false);
      setShowCameraPromptIcon(false);
      return true;
      
    } catch (err) {
      const message = getCameraErrorMessage(err);
      console.error("Camera access failed:", err);
      setWebcamError(message);
      setShowErrorPopup(true);
      setShowCameraPromptIcon(false);
      alert(message);
      return false;
    }
  };

  const triggerCameraEnable = async () => {
    if (cameraRequestPending) return;

    setCameraRequestPending(true);
    setCameraKnobActive(true);

    // Let the knob reach active position before requesting camera.
    await new Promise((resolve) => setTimeout(resolve, 320));
    const granted = await requestCameraAccess();

    if (granted) {
      setTimeout(() => setCameraKnobActive(false), 320);
    } else {
      setCameraKnobActive(false);
    }
    setCameraRequestPending(false);
  };

  const openCameraPrompt = () => {
    setCameraKnobActive(false);
    setShowCameraPromptIcon(false);
    setShowErrorPopup(true);
  };

  const closeCameraPrompt = () => {
    setCameraKnobActive(false);
    setShowErrorPopup(false);
  };

  

  

    
  
  return (
   <main className="snap-y snap-proximity scroll-smooth bg-background text-foreground antialiased relative transition-colors duration-500 hide-scrollbar"> 
      {/* Quote Modal Component */}
      <QuoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      
{/* Section 1: Hero */}
<section className="h-screen w-full flex flex-col items-center justify-center relative bg-background">
  
  {/* LAYER 1: THE BACKGROUND */}
<div className="absolute inset-0 z-0 bg-zinc-50 dark:bg-black">
  
  {/* Standard Theme Grid - Fades out when camera is live */}
          <div 
            className={cn(
              "absolute inset-0 h-full w-full bg-zinc-50 dark:bg-black [background-image:radial-gradient(rgba(15,23,42,0.42)_1.5px,transparent_1.5px)] dark:[background-image:radial-gradient(rgba(148,163,184,0.4)_1.4px,transparent_1.4px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_52%,transparent_88%)] transition-all duration-1000",
              isWebcamActive ? "opacity-0 scale-110" : "opacity-100 scale-100"
            )} 
          />
          {!isWebcamActive && (
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.08)_0%,transparent_45%)] dark:bg-[radial-gradient(circle_at_center,rgba(148,163,184,0.12)_0%,transparent_45%)] blur-xl" />
          )}

  {/* Webcam Pixel Grid - Only renders when active */}
  {isWebcamActive && (
    <div className="absolute inset-0 z-0 animate-in fade-in zoom-in-95 duration-1000">
      <WebcamPixelGrid
        initialStream={cameraStream}
        gridCols={50}
        gridRows={30}
        maxElevation={50}
        motionSensitivity={0.25}
        elevationSmoothing={0.2}
        colorMode="webcam"
        backgroundColor="#000000"
        mirror={true}
        gapRatio={0.05}
        darken={0.6}
        borderColor="#ffffff"
        borderOpacity={0.06}
        className="w-full h-full"
        onWebcamError={(err) => {
          const message = getCameraErrorMessage(err);
          setIsWebcamActive(false);
          setCameraStream(null);
          setWebcamError(message);
          setShowErrorPopup(true);
        }}
        onWebcamReady={() => console.log("Grid Initialized")}
      />
      
      {/* Visual Overlay to blend Webcam Grid with Theme */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20 pointer-events-none" />
    </div>
  )}

      {/* Edge Vignette (dot-grid mode only) */}
      {!isWebcamActive && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_34%,rgba(250,250,250,0.9)_80%,#fafafa_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_34%,rgba(0,0,0,0.88)_80%,#000_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-transparent to-zinc-50/20 dark:from-black dark:via-transparent dark:to-black/5 pointer-events-none" />
        </>
      )}
    </div>

{/* Webcam Interface: Left Status & Right Control */}
<AnimatePresence>
{isWebcamActive && (

<motion.div 
style={{ 
        opacity: heroOpacity, 
        pointerEvents: heroPointerEvents as any 
      }}
className="fixed bottom-15 md:bottom-10 inset-x-4 md:inset-x-10 z-40 flex flex-col md: flex-row items-center justfy-center md:justify-between gap-3 md:gap-0 pointer-events-auto animate-in fade-in slide-in-from-bottom-4 duration-500">


{/* Status Label (Left Side) */}

<div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/10 backdrop-blur-md pointer-events-auto">

<span className="relative flex h-2 w-2">

<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>

<span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>

</span>

<span className="text-[10px] font-bold tracking-widest uppercase text-white/70">

Interactive Grid Active

</span>

</div>



{/* Disable Button (Right Side) */}

<button

onClick={disableCamera}


className="group flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 transition-all active:scale-95 backdrop-blur-md pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
aria-label="Disable camera"

>

<svg className="w-3.5 h-3.5 text-white/70 group-hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">

<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636" />

</svg>

<span className="text-[10px] font-bold uppercase tracking-wider text-white">

Disable Camera

</span>

</button>

</motion.div>


)}
</AnimatePresence>


    

  {/* LAYER 2: THE CONTENT (Centered by the parent Flexbox) */}
  <div className="p-4 max-w-7xl mx-auto text-center relative z-20 flex flex-col items-center justify-center">
    <h1 
      className="text-6xl sm:text-6xl md:text-8xl lg:text-8xl font-bold max-w-7xl mx-auto text-center mt-6 relative z-10 py-10 px-3 leading-[1.05] sm:leading-tight tracking-tighter text-white dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-b dark:from-neutral-200 dark:to-white drop-shadow-[0_8px_20px_rgba(0,0,0,0.3)]"
    >
      <span className="block md:hidden text-[1.5em] leading-[0.95]">Print</span>
      <span className="mt-1 block md:hidden text-[1.02em] leading-[0.98]">amazing</span>
      <span className="mt-2 block md:hidden text-[0.9em] leading-[1]">
        <span
          className="animate-shimmer-text bg-clip-text text-transparent px-[0.05em] -mr-[0.05em]"
          style={{
            display: "inline-block",
            backgroundImage: "linear-gradient(to right, #22d3ee, #a855f7, #ec4899, #22d3ee)",
            backgroundSize: "300% auto",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Colours
        </span>{" "}
        at
      </span>
      <span className="mt-2 block md:hidden leading-[1]">
        <Cover className="text-[0.84em]">warp speed</Cover>
      </span>

      <span className="hidden md:inline">
        Print amazing{" "}
        <span
          className="animate-shimmer-text bg-clip-text text-transparent px-[0.05em] -mr-[0.05em]"
          style={{
            display: "inline-block",
            backgroundImage: "linear-gradient(to right, #22d3ee, #a855f7, #ec4899, #22d3ee)",
            backgroundSize: "300% auto",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Colours
        </span>
        <br />
        at <Cover>warp speed</Cover>
      </span>
    </h1>
    
    <div className="relative z-20 mt-10">
  <Button 
    onClick={() => setIsModalOpen(true)}
    borderRadius="1.75rem"
    className={cn(
      "backdrop-blur-2xl transition-all duration-300 text-xl md:text-1xl font-bold tracking-tight shadow-2xl",
      
      /* TEXT COLOR LOGIC */
      // If camera is ON -> Always white
      // If camera is OFF -> Black in light mode, White in dark mode
      isWebcamActive 
        ? "text-white" 
        : "text-neutral-700 dark:text-white",

      /* BACKGROUND LOGIC (Your preferred settings) */
      isWebcamActive 
        ? "bg-white/10 dark:bg-black/10 border-white/20" // Dynamic camera background
        : "bg-neutral-200/50 dark:bg-black/40 border-black/10 dark:border-white/10" // Dynamic standard background
    )}
    duration={2000} 
      >
        <span className="relative z-10">Get Quote</span>
      </Button>
      {/* Phone Number Link */}
  <motion.a
    href="tel:+918939000230"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5 }}
    className="mt-6 font-mono text-xs tracking-[0.2em] md:translate-y-20 text-neutral-500 hover:text-neutral-400 transition-colors flex items-center gap-2 group"
  >
    <span className="h-1 w-1 rounded-full bg-neutral-500 group-hover:bg-cyan-500 transition-colors" />
    +91 8939000230
  </motion.a>

    </div>
  </div>
</section>

      {/* Section 2: Infinite Scroller with Glass Background */}
<section className="snap-start pt-16 md:pt-28 pb-24 relative z-0 bg-background flex-shrink-0">
    <div className="max-w-6xl mx-auto px-4">
      {/* Glass Container - mirroring your Footer style */}
      <div className="rounded-[2.1rem] md:rounded-[2.5rem] border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-xl px-5 py-5 md:p-12 shadow-2xl">
        <div className="flex flex-row items-center gap-4 md:flex-row md:gap-12">
          
          {/* Label Section */}
          <div className="shrink-0 min-w-fit">
            <h2 className="text-neutral-900 dark:text-neutral-400 text-[10px] md:text-[12px] font-bold tracking-[0.26em] md:tracking-[0.4em] uppercase text-left whitespace-nowrap">
              Trusted by
              <span className="block pt-1 normal-case tracking-normal font-normal opacity-60">
                Industry Leaders
              </span>
            </h2>
          </div>
          
          {/* Scroller Section */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <InfiniteMovingCards
              items={partners}
              direction="left"
              speed="fast" 
              className="py-0"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  
<WhyUsSection />

<CredibilityStatsSection />

<ProductGallery products={PRODUCT_DATA} />

<section className="snap-start bg-background px-6 py-20 md:px-10 md:py-28">
  <div className="relative left-1/2 w-screen -translate-x-1/2 border-t border-white/5" />
  <div className="mx-auto max-w-6xl pb-10 pt-32 md:pb-14 md:pt-44">
    <div className="overflow-hidden rounded-[2rem] border border-black/15 bg-[#040507] text-white dark:border-white/15">
      <div className="relative grid grid-cols-1 gap-8 px-6 py-12 md:px-12 md:py-14 lg:grid-cols-12 lg:items-center">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.2),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(217,70,239,0.25),transparent_52%)]" />
        <div className="absolute inset-0 opacity-30 [background:repeating-linear-gradient(120deg,rgba(255,255,255,0.08)_0px,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_16px)]" />
      </div>

      <div className="relative lg:col-span-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/65">
          Signature // Products
        </p>
        <h3 className="mt-3 text-4xl font-black uppercase leading-[0.9] tracking-tight md:text-6xl">
          Want something more ?
          <span className="block whitespace-nowrap text-[0.66em] sm:text-[0.74em] md:text-[.9em] bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-yellow-200 bg-clip-text text-transparent">
            Not-Usual Products
          </span>
        </h3>
        <p className="mt-5 max-w-[68ch] translate-y-2 text-sm leading-relaxed text-white/80 md:text-md">
          Shhh! A private catalog of unusual <span className="text-[1.14em] font-bold text-white">Promotional Products</span>, collector-grade finishes,
          <br className="hidden md:block" />
          and conversion-focused concepts made for brands that want attention.
        </p>
      </div>

      <div className="relative flex justify-center lg:col-span-5">
        <Link
          href="/products#mystery-products"
          onMouseLeave={() => setIsTeaserCardRevealed(false)}
          onClick={(e) => {
            if (
              typeof window !== "undefined" &&
              window.matchMedia("(hover: none)").matches &&
              !isTeaserCardRevealed
            ) {
              e.preventDefault();
              setIsTeaserCardRevealed(true);
            }
          }}
          className={cn(
            "group relative block h-[270px] w-[210px] rotate-[-7deg] md:h-[320px] md:w-[240px]",
            isTeaserCardRevealed && "is-revealed"
          )}
        >
          <div className="relative h-full w-full rounded-3xl border border-white/25 bg-gradient-to-b from-white/12 to-white/[0.02] p-3 shadow-[0_0_80px_rgba(14,165,233,0.25)] backdrop-blur-xl transition-transform duration-500 group-hover:rotate-[1deg] group-hover:scale-[1.02]">
            <div className="absolute inset-3 overflow-hidden rounded-2xl border border-white/20 bg-black/65 p-5 transition-opacity duration-300 group-hover:opacity-0 group-[.is-revealed]:opacity-0">
              <div className="absolute inset-0 opacity-50 [background:radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.25),transparent_35%),radial-gradient(circle_at_80%_75%,rgba(250,204,21,0.22),transparent_32%),radial-gradient(circle_at_65%_25%,rgba(217,70,239,0.28),transparent_34%)]" />
              <p className="relative text-[10px] font-bold uppercase tracking-[0.38em] text-white/65">
                Secret Code
              </p>
              <p className="relative mt-8 text-6xl font-black leading-none text-white md:text-7xl">
                ?
              </p>
              <p className="relative mt-3 text-xs uppercase tracking-[0.3em] text-white/80">
                Not-Usual
              </p>
              <p className="relative mt-8 text-sm font-semibold text-white/90">
                Hover to unlock
              </p>
            </div>
            <div className="absolute inset-3 flex flex-col justify-between overflow-hidden rounded-2xl border border-white/20 bg-black/85 p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-[.is-revealed]:opacity-100">
              <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-white/65">
                Private Access
              </p>
              <div>
                <p className="text-2xl font-black uppercase leading-tight text-white">
                  Contact
                  <br />
                  To Unlock
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  Shhh! Mention secret code <span className="font-bold text-cyan-200">Not-Usual</span>.
                </p>
              </div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/55">
                Tap to open products
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  </div>
  </div>
</section>

<OperationsSection />

<RoadmapSection setIsModalOpen={setIsModalOpen} />

<section className="snap-start bg-background py-60 md:py-100 border-t border-white/5">
  <div className="mx-auto max-w-6xl px-6 text-center">
    <p className="text-6xl font-bold tracking-tight text-foreground md:text-7xl">
      " Judge a Book by it's Cover "
    </p>
    <div className="mt-6 flex flex-col items-center gap-3">
      <p className="text-sm font-light tracking-wide text-neutral-500 md:text-lg">
        -Prajith Ellora
      </p>
      <Image
        src="/md-signature.png"
        alt="Prajith Ellora signature"
        width={220}
        height={70}
        className="h-auto w-[170px] opacity-85 md:w-[220px]"
      />
    </div>
  </div>
</section>



      <div className="snap-start bg-background">
  <div className="h-[0vh]" />
        <Footer />
      </div>
     {/* Error/Enable Popup */}
      {webcamError ? (
        <>
          <AnimatePresence
            onExitComplete={() => {
              if (!showErrorPopup) {
                setShowCameraPromptIcon(true);
              }
            }}
          >
            {showErrorPopup ? (
              <motion.div
                key="webcam-panel-open"
                initial={isMobilePopupView ? { opacity: 0 } : { opacity: 0, x: 20, y: -8 }}
                animate={isMobilePopupView ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }}
                exit={isMobilePopupView ? { opacity: 0 } : { opacity: 0, x: 26, y: -10 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                onMouseLeave={closeCameraPrompt}
                className="fixed right-2 top-[calc(env(safe-area-inset-top)+5.15rem)] z-[7000] md:right-4 md:top-[calc(env(safe-area-inset-top)+0.6rem)]"
              >
                <div
                  style={{
                    WebkitBackdropFilter: "blur(18px)",
                    backdropFilter: "blur(18px)",
                    backgroundColor: "rgba(0,0,0,0.56)",
                    willChange: "backdrop-filter, opacity",
                  }}
                  className="relative mr-8 flex w-[min(92vw,13.5rem)] min-h-[14rem] max-h-[calc(100vh-1rem)] flex-col overflow-hidden rounded-[22px] border border-white/20 px-3.5 py-3.5 shadow-[0_10px_32px_rgba(0,0,0,0.45)] md:mr-10 md:w-[15.75rem] md:min-h-[13rem] md:px-4 md:py-4"
                >
                  <div className="my-auto mx-auto w-full max-w-[14.75rem] px-2 md:max-w-[14.5rem] md:px-2.5">
                    <p className="text-[25px] font-black uppercase tracking-[0.12em] leading-[1.08] text-white/90 md:text-[27px] md:leading-[1.12] md:tracking-[0.11em]">
                      Enter The Matrix
                    </p>
                    <p className="mt-2 max-w-[22ch] text-[11px] leading-[1.36] text-white/66 md:max-w-[24ch] md:text-[13px] md:leading-[1.45]">
                      Enable camera for the interactive background effect
                    </p>
                  </div>

                  <div className="mt-2 flex w-full justify-center pb-0.5">
                    <button
                      onClick={triggerCameraEnable}
                      disabled={cameraRequestPending}
                      className="relative isolate h-9 w-[5.2rem] shrink-0 overflow-hidden rounded-full border border-violet-500/70 p-[1px] shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all duration-300 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:cursor-not-allowed md:h-10 md:w-[5.6rem] dark:border-violet-500/75"
                      type="button"
                    >
                      <div className="pointer-events-none absolute inset-[1px] rounded-full bg-[linear-gradient(115deg,rgba(244,114,182,0.9)_0%,rgba(196,181,253,0.92)_45%,rgba(167,243,208,0.92)_100%)]" />
                      <div className="pointer-events-none absolute inset-[1px] rounded-full opacity-10 [background-image:radial-gradient(rgba(0,0,0,0.35)_1px,transparent_1px)] [background-size:3px_3px]" />

                      <span className="pointer-events-none absolute left-[72%] top-1/2 z-[5] -translate-x-1/2 -translate-y-1/2 text-white/72">
                        <svg className="h-4 w-4 md:h-4.5 md:w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </span>

                      <span
                        className={cn(
                          "pointer-events-none absolute left-[4px] top-[4px] z-10 flex h-[calc(100%-8px)] w-[1.95rem] items-center justify-center rounded-full border border-white/15 bg-black/92 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_8px_16px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:w-[2.2rem]",
                          cameraKnobActive ? "translate-x-[2.65rem] md:translate-x-[2.95rem]" : "translate-x-0"
                        )}
                      >
                        <svg className="h-3.5 w-3.5 md:h-4 md:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M4 12h14" strokeWidth="2.2" strokeLinecap="round" />
                          <path d="m12 6 6 6-6 6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                  </div>

                </div>
                <button
                  onClick={closeCameraPrompt}
                  className="absolute right-0 top-0 rounded-full p-1 text-white/40 transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  aria-label="Dismiss camera prompt"
                  type="button"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <button
            onMouseEnter={openCameraPrompt}
            onClick={openCameraPrompt}
            className={cn(
              "fixed right-2 top-[calc(env(safe-area-inset-top)+5.15rem)] z-[7000] flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-black/72 text-white/65 shadow-lg backdrop-blur-xl transition-opacity duration-150 hover:border-cyan-300/35 hover:bg-black/88 hover:text-white hover:shadow-[0_0_18px_rgba(56,189,248,0.22)] md:right-4 md:top-[calc(env(safe-area-inset-top)+0.6rem)]",
              showCameraPromptIcon ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
            )}
            title="Open camera access prompt"
            aria-label="Open camera access prompt"
            type="button"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" className="text-red-400" stroke="currentColor" />
            </svg>
          </button>
        </>
      ) : null}

    </main>
  );
}
