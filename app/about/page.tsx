"use client";
import React from "react";
import { motion } from "framer-motion";
import MiniFooter from "@/components/MiniFooter";
import Image from "next/image";

const PHILOSOPHY = [
  {
    title: "Substrate",
    tag: "Materiality",
    desc: "37 years of understanding how fiber reacts to force. We source the finest boards and papers globally to ensure every fold is structural perfection.",
    detail: "GSM Range: 60 — 600"
  },
  {
    title: "Pigment",
    tag: "Chemistry",
    desc: "Color is a science. Our G7-certified ink management systems ensure that brand identity is never compromised, from the first sheet to the millionth.",
    detail: "Delta-E Tolerance: < 1.0"
  },
  {
    title: "Pressure",
    tag: "Engineering",
    desc: "Our heritage is built on the weight of Japanese-engineered presses. Controlled pressure creates the tactile depth only true offset can provide.",
    detail: "Impression Force: Variable"
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500 selection:bg-foreground selection:text-background">
      
      {/* 1. THE HERO: THE '89 MARK */}
      <section className="relative flex min-h-[72svh] flex-col justify-center overflow-hidden px-6 pt-16 pb-10 md:min-h-screen md:px-20 md:pt-24 md:pb-16">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none">
          {/* Only changed opacity slightly to ensure it shows in light mode */}
          <h1 className="text-[26vw] font-black leading-none opacity-[0.06] dark:opacity-[0.05] tracking-tighter md:text-[25vw]">
            EST.1989
          </h1>
        </div>
        
        <div className="relative z-10 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-4 md:mb-12 md:gap-6"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-neutral-500 dark:text-neutral-500">Identity // Ellora Press</span>
            <div className="h-px w-20 bg-black/15 dark:bg-white/15 md:w-24" />
          </motion.div>
          
          <h2 className="text-5xl font-bold leading-[0.92] tracking-tighter uppercase text-neutral-900 dark:text-white md:text-[8vw]">
            Artistry <br /> <span className="text-neutral-500 italic font-serif lowercase">meets</span> <br /> Industry.
          </h2>
        </div>
      </section>

      {/* 2. THE LEGACY STATEMENT */}
      <section className="border-y border-black/10 bg-black/[0.02] px-6 py-14 dark:border-white/5 dark:bg-white/[0.01] md:px-20 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <h3 className="mb-5 text-[11px] font-mono uppercase tracking-[0.32em] text-neutral-500 md:mb-8 md:text-sm md:tracking-[0.4em]">The 37-Year Narrative</h3>
            <p className="text-2xl font-light leading-tight tracking-tight text-neutral-900 dark:text-white md:text-5xl">
              We started in 1989 with a single objective: to prove that 
              <span className="text-neutral-500 italic"> industrial printing </span> 
              can be as precise as fine art.
            </p>
          </div>
          
        </div>
      </section>

      {/* 2.5 CERTIFICATIONS + IN-HOUSE */}
      <section className="border-b border-black/10 px-6 py-14 dark:border-white/5 md:px-20 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex items-center gap-4 md:mb-10 md:gap-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-neutral-500">
              Compliance // Trust Marks
            </span>
            <div className="h-px w-20 bg-black/15 dark:bg-white/15 md:w-24" />
          </div>

          <div className="grid grid-cols-1 gap-8">
            <div>
              <h4 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-5xl">
                Certified, Compliant, Export-Ready
              </h4>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 md:mt-4 md:text-lg">
                We maintain process discipline through recognized certifications and industry affiliations, supporting reliable quality for domestic and export print programs.
              </p>
            </div>

            <div className="border-y border-black/10 py-5 dark:border-white/10 md:py-6">
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {[
                  { name: "GIC", label: "Guardian Independent Certification", src: "/about page/gic.png" },
                  { name: "MSME", label: "Micro, Small & Medium Enterprises", src: "/about page/msme.png" },
                  { name: "ISO 9001:2015", label: "ISO Certification", src: "/about page/iso.png" },
                  { name: "FIEO", label: "Federation of Indian Export Organisations", src: "/about page/fieo.png" },
                ].map((item) => (
                  <div key={item.name}>
                    <div className="grid h-24 place-items-center">
                      <Image
                        src={item.src}
                        alt={`${item.name} certification logo`}
                        width={240}
                        height={120}
                        className="max-h-24 w-auto object-contain"
                      />
                    </div>
                    <p className="mt-2 text-center text-[10px] font-mono uppercase tracking-[0.14em] text-neutral-600 dark:text-neutral-300 md:text-[11px]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-neutral-500">In-House</p>
              <h5 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white md:mt-3 md:text-3xl">
                Own Machinery. Direct Accountability.
              </h5>
              <p className="mt-3 max-w-4xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 md:mt-4 md:text-base">
                Own machinery and all-in-house facilities keep quality and timelines under direct operational control.
              </p>
            </div>
            <div className="flex flex-col justify-end">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30">
              <Image
                src="/mitsubishi-for-website.png"
                alt="In-house offset press machinery"
                width={1200}
                height={800}
                className="h-[210px] w-full object-cover md:h-[820px]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* 3. THE MACRO PILLARS (The "Something Else" interaction) */}
      <section className="py-10 md:py-20">
        {PHILOSOPHY.map((item, idx) => (
          <div key={item.title} className="group border-b border-black/10 px-6 py-12 transition-colors hover:bg-black/[0.02] dark:border-white/5 dark:hover:bg-white/[0.02] md:px-20 md:py-24">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 items-start md:grid-cols-12 md:gap-10">
              <div className="font-mono text-[11px] text-neutral-500 md:col-span-1 md:text-xs">0{idx + 1}</div>
              <div className="md:col-span-5">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500 md:mb-4">{item.tag}</p>
                <h4 className="text-3xl font-bold uppercase tracking-tighter text-neutral-900 transition-all duration-500 group-hover:pl-2 dark:text-white md:text-7xl md:group-hover:pl-4">
                    {item.title}
                </h4>
              </div>
              <div className="space-y-4 md:col-span-4 md:space-y-8">
                <p className="text-sm leading-relaxed italic text-neutral-600 dark:text-neutral-300 md:text-lg">"{item.desc}"</p>
                <div className="inline-block rounded-full border border-black/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-neutral-500 dark:border-white/10 dark:text-neutral-400 md:px-4 md:py-2">
                    Tech Spec: {item.detail}
                </div>
              </div>
              <div className="hidden md:col-span-2 md:flex md:justify-end">
                 <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 transition-all group-hover:bg-black group-hover:text-white dark:border-white/10 dark:group-hover:bg-white dark:group-hover:text-black">
                    <div className="h-2 w-2 rounded-full bg-current" />
                 </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 4. TECHNICAL RECOGNITION */}
      <section className="px-6 py-16 md:py-32">
        <div className="mx-auto max-w-3xl space-y-8 text-center md:space-y-16">
          <div className="inline-flex flex-col items-center">
             {/* THE METEOR DROP LINE IS KEPT HERE */}
             <div className="mb-5 h-12 w-[1px] bg-gradient-to-b from-transparent to-neutral-500 md:mb-8 md:h-20" />
             <p className="font-mono text-[10px] uppercase tracking-[0.6em] text-neutral-500">Certified Precision</p>
          </div>
          <h5 className="text-3xl font-black uppercase tracking-tighter italic leading-none text-neutral-900 dark:text-white md:text-6xl">
            Trusted by Clients <br /> Since <span className="opacity-20 text-outline-1">Nineteen Eighty Nine.</span>
          </h5>
        </div>
      </section>

      <MiniFooter />
    </main>
  );
}
