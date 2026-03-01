"use client";
import React from "react";
import { motion } from "framer-motion";
import { Terminal, Tag, UploadCloud, Eye, Zap, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { title: "Input Specs", desc: "Hit 'Get Quote' and type your requirements. They are pulled directly into our system.", icon: <Terminal size={20} />, btn: true },
  { title: "Get Pricing", desc: "Receive your quotation via email along with a quality checklist for your design files.", icon: <Tag size={20} /> },
  { title: "Send Files", desc: "Send files to solutions@ellorapress.com. No design? We can help you with that.", icon: <UploadCloud size={20} /> },
  { title: "Free Proof", desc: "Review a free physical sample of your product before the press rolls.", icon: <Eye size={20} /> },
  { title: "Warp Speed", desc: "Your amazing products are printed, finished, and delivered at Ellora Press speed.", icon: <Zap size={20} />, highlight: true }
];



export default function RoadmapSection({ setIsModalOpen }: { setIsModalOpen: (val: boolean) => void }) {
{/* 5. THE ROADMAP - WHAT'S NEXT */}
return (
      <section className="py-10 md:py-24 bg-background relative overflow-hidden border-t border-white/5">
        <div className="max-w-4xl lg:max-w-6xl mx-auto px-7 sm:px-8 md:px-16 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-7 md:mb-20"
          >
            <span className="font-mono text-[9px] md:text-[10px] tracking-[0.34em] md:tracking-[0.4em] uppercase opacity-50">Workflow // 02</span>
            <h2 className="text-[2.45rem] sm:text-5xl md:text-7xl font-bold tracking-tighter mt-2 md:mt-4 text-foreground">What's Next.</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-6 md:gap-12 relative">
            {steps.map((currentStep, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="flex flex-col gap-2.5 md:gap-6 relative"
              >
                <div className="relative self-start">
                  <div className={cn(
                    "w-8 h-8 md:w-12 md:h-12 rounded-full border flex items-center justify-center z-10 relative [&_svg]:h-4 [&_svg]:w-4 md:[&_svg]:h-5 md:[&_svg]:w-5",
                    currentStep.highlight ? "bg-foreground text-background border-foreground" : "border-foreground/20 text-foreground"
                  )}>
                    {currentStep.icon}
                  </div>
                  {currentStep.highlight && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute w-full h-full bg-foreground/40 rounded-full blur-xl"
                      />
                    </div>
                    )}
                </div>
                <div className="space-y-1.5 md:space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] md:text-[10px] text-foreground opacity-40">0{idx + 1}</span>
                    <h3 className="font-bold uppercase tracking-tight text-[1.02rem] md:text-lg text-foreground">{currentStep.title}</h3>
                  </div>
                  <p className="text-[12px] md:text-sm text-foreground opacity-60 leading-5 md:leading-relaxed">{currentStep.desc}</p>
                  {currentStep.btn && (
  <div className="relative isolate mt-2 mb-0 md:mt-8 md:mb-4 self-start">
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute -inset-4 rounded-full blur-xl transform-gpu",
        "bg-[radial-gradient(circle,rgba(34,211,238,0.35)_0%,rgba(34,211,238,0.14)_45%,transparent_72%)]",
        "dark:bg-[radial-gradient(circle,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.08)_45%,transparent_72%)]"
      )}
    />
    
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setIsModalOpen(true)}
      className={cn(
        "relative group flex items-center justify-center gap-4",
        "min-w-[132px] md:min-w-[180px] px-4 md:px-8 py-1.5 md:py-2 rounded-full", // Solid sizing
        "text-xs font-black uppercase tracking-[0.1em]",
        "transition-all duration-300 shadow-lg",
        
        /* THE BACKGROUND HIGHLIGHT */
        // Light Mode: Solid Black Button
        // Dark Mode: Solid White Button
        "bg-neutral-900 text-white dark:bg-white dark:text-black",
        "border border-cyan-400/25 dark:border-white/20",
        
        /* HOVER EFFECTS */
        "hover:shadow-[0_0_28px_-8px_rgba(34,211,238,0.55)] dark:hover:shadow-[0_0_28px_-8px_rgba(255,255,255,0.45)]"
      )}
    >
      <span className="relative z-10">Get Quote</span>
      
      <motion.div
        animate={{ x: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 stroke-[3px]" />
      </motion.div>

      {/* 2. THE SHIMMER: A liquid light effect that runs across the button */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-black/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
    </motion.button>

    
  </div>
)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      );
    }
