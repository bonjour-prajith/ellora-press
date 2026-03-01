"use client";

import { useState } from "react";
import { ProductGallery } from "@/components/sections/ProductGallery";
import { PRODUCT_DATA } from "@/data/site-data";
import MiniFooter from "@/components/MiniFooter";
import Image from "next/image";
import {
  BarChart3,
  LineChart,
  Mail,
  Megaphone,
  Search,
  Sparkles,
  Users,
} from "lucide-react";

export default function ProductsPage() {
  const [isMainCardRevealed, setIsMainCardRevealed] = useState(false);
  const [activeMarketingIndex, setActiveMarketingIndex] = useState(0);
  const [isDmCardsExpanded, setIsDmCardsExpanded] = useState(false);
  const marketingKit = [
    {
      title: "Social Media Management",
      icon: Users,
      points: ["Monthly content planning", "Creative + copy delivery", "Community management"],
    },
    {
      title: "Google Ads",
      icon: Search,
      points: ["Search campaign setup", "Keyword intent targeting", "Bid and budget optimization"],
    },
    {
      title: "SEO",
      icon: LineChart,
      points: ["Technical + on-page SEO", "Service page ranking strategy", "Content cluster planning"],
    },
    {
      title: "Meta Ads",
      icon: Megaphone,
      points: ["Audience segmentation", "Creative A/B testing", "Retargeting loops"],
    },
    {
      title: "Meta Marketing",
      icon: Sparkles,
      points: ["Organic + paid alignment", "Narrative consistency", "Brand recall growth"],
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <ProductGallery products={PRODUCT_DATA} />

      <section className="px-6 py-16 md:px-14 md:py-24">
        <div className="mx-auto max-w-6xl border-t border-black/10 pt-10 dark:border-white/10 md:pt-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-neutral-500">
            Industrial // Decals
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-5xl">
            Speciality Substrates
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <ul className="divide-y divide-black/10 border-y border-black/10 dark:divide-white/10 dark:border-white/10">
                {[
                  "Information Labels",
                  "Non-Tearable Labels",
                  "Petrol-Resistant Labels",
                  "Ultra-Destructable Labels",
                  "Fire-Resistant Labels",
                  "QR Code Labels",
                  "PET Labels",
                ].map((item) => (
                  <li
                    key={item}
                    className="px-1 py-4 text-sm font-medium text-neutral-700 dark:text-neutral-200 md:text-base"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <Image
                src="/products/special-labels.png"
                alt="Special label products"
                width={1400}
                height={900}
                className="h-[320px] w-full object-contain md:h-[460px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="mystery-products" className="relative w-full overflow-hidden bg-[#040507] py-10 text-white md:py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.18),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(217,70,239,0.2),transparent_50%)]" />
          <div className="absolute inset-0 opacity-35 [background:repeating-linear-gradient(115deg,rgba(255,255,255,0.08)_0px,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_18px)]" />
          <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-fuchsia-400/20 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-12 md:px-12 md:py-16">

            <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/60">
                  Signature // Collection
                </p>
                <h3 className="mt-3 text-5xl font-black uppercase leading-[0.9] md:text-7xl">
                  Want Your Brand
                  <span className="block text-white/30">To Blend In?</span>
                  <span className="block bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-yellow-200 bg-clip-text text-transparent">
                    Or Break The Grid.
                  </span>
                </h3>
                <p className="mt-5 max-w-[44ch] break-words text-sm leading-relaxed text-white/80 md:text-lg">
                  We got it cover with our unique <span className="text-[1.14em] font-bold text-white">Promotional Products</span> you can find nowhere else, to know more contact us and ask for the not-usual products, we provide you with a unique collection of creatively customised marketing and packaging products.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] md:text-sm">
                  <span className="text-cyan-100">Unexpected</span>
                  <span className="text-white/35">/</span>
                  <span className="text-fuchsia-100">Collector-grade</span>
                  <span className="text-white/35">/</span>
                  <span className="text-yellow-100">High-conversion</span>
                </div>
              </div>

              <div className="relative flex min-h-[300px] items-center justify-center lg:col-span-5 lg:min-h-[380px]">
                <div className="absolute right-3 top-5 z-20 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-white/80">
                  Limited Run
                </div>
                <div
                  onMouseLeave={() => setIsMainCardRevealed(false)}
                  onClick={() => {
                    if (
                      typeof window !== "undefined" &&
                      window.matchMedia("(hover: none)").matches
                    ) {
                      setIsMainCardRevealed((prev) => !prev);
                    }
                  }}
                  className={`group absolute h-[340px] w-[250px] rotate-[-7deg] cursor-pointer md:h-[390px] md:w-[285px] ${isMainCardRevealed ? "is-revealed" : ""}`}
                >
                  <div className="relative h-full w-full rounded-[28px] border border-white/25 bg-gradient-to-b from-white/12 to-white/[0.02] p-3 shadow-[0_0_90px_rgba(14,165,233,0.25)] backdrop-blur-xl transition-transform duration-500 group-hover:rotate-[1deg] group-hover:scale-[1.02]">
                    <div className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] overflow-hidden rounded-2xl border border-white/20 bg-black/65 p-6 transition-opacity duration-300 group-hover:opacity-0 group-[.is-revealed]:opacity-0">
                      <div className="absolute inset-0 opacity-50 [background:radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.25),transparent_35%),radial-gradient(circle_at_80%_75%,rgba(250,204,21,0.22),transparent_32%),radial-gradient(circle_at_65%_25%,rgba(217,70,239,0.28),transparent_34%)]" />
                      <div className="absolute inset-0 opacity-25 [background:repeating-linear-gradient(0deg,rgba(255,255,255,0.22)_0px,rgba(255,255,255,0.22)_1px,transparent_1px,transparent_12px)]" />
                      <p className="relative text-[10px] font-bold uppercase tracking-[0.38em] text-white/65">
                        Mystery Card
                      </p>
                      <p className="relative mt-8 text-6xl font-black leading-none text-white md:text-7xl">
                        ?
                      </p>
                      <p className="relative mt-2 text-xs uppercase tracking-[0.32em] text-white/75">
                        Ask For The Not-usual
                      </p>
                      <div className="relative mt-8 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/65">
                        <span>Ref</span>
                        <span>EP-X</span>
                      </div>
                      <div className="relative mt-3 h-1.5 w-full rounded-full bg-white/20">
                        <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-yellow-200" />
                      </div>
                      <div className="relative mt-8 grid grid-cols-3 gap-2">
                        <span className="h-2 rounded bg-cyan-300/80" />
                        <span className="h-2 rounded bg-fuchsia-300/80" />
                        <span className="h-2 rounded bg-yellow-200/80" />
                      </div>
                    </div>
                    <div className="absolute inset-3 flex h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] flex-col justify-between overflow-hidden rounded-2xl border border-white/25 bg-black/80 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-[.is-revealed]:opacity-100">
                      <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/65">
                        Access Side
                      </p>
                      <div>
                        <p className="text-3xl font-black uppercase leading-tight text-white md:text-4xl">
                          Contact
                          <br />
                          To Unlock
                        </p>
                        <p className="mt-4 text-sm leading-relaxed text-white/80">
                          Shhh! Mention the secret code <span className="font-bold text-cyan-200">Not-Usual</span> with us to find more.
                        </p>
                      </div>
                      <p className="text-[10px] uppercase tracking-[0.35em] text-white/55">
                        Ellora Press // Private Collection
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>

      <section className="relative overflow-hidden px-6 pb-16 pt-12 md:px-14 md:pb-20 md:pt-16">
        <div className="pointer-events-none absolute inset-0 opacity-80">
          <div className="absolute left-[6%] top-16 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute bottom-16 right-[8%] h-52 w-52 rounded-full bg-fuchsia-500/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl border-t border-black/10 pt-10 dark:border-white/10 md:pt-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-neutral-500">
            Services // Digital
          </p>
          <h3 className="mt-3 text-[1.9rem] font-black leading-[0.95] tracking-tight text-neutral-900 dark:text-white sm:text-[2.5rem] md:text-[3.25rem]">
            Digital Marketing
            <span className="mt-1 block text-neutral-500 dark:text-neutral-400">
              for aggressive brand growth
            </span>
          </h3>

          <div className="mt-10 grid items-start gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="max-w-xl text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 md:text-base">
                Straight to point execution for offset-print businesses: we combine <span className="font-semibold text-neutral-900 dark:text-white">Social Media Management</span>, Google and Meta ads, and SEO systems to drive qualified enquiries and repeat demand.
              </p>

              <div className="mt-8 space-y-4">
                {marketingKit.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = activeMarketingIndex === idx;
                  return (
                    <div
                      key={item.title}
                      onClick={() => setActiveMarketingIndex(idx)}
                      className={`group cursor-pointer border-b pb-4 transition-all duration-300 dark:border-white/10 md:hover:border-black/25 dark:md:hover:border-white/25 ${
                        isActive
                          ? "border-black/25 dark:border-white/25"
                          : "border-black/10"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-1 rounded-full border border-black/15 p-1.5 transition-transform duration-300 dark:border-white/20 ${
                            isActive ? "scale-110" : ""
                          } md:group-hover:scale-110`}
                        >
                          <Icon className="h-4 w-4 text-neutral-800 dark:text-white" />
                        </div>
                        <div>
                          <p
                            className={`text-base font-semibold transition-colors duration-300 md:text-lg ${
                              isActive
                                ? "text-neutral-900 dark:text-white"
                                : "text-neutral-500 dark:text-neutral-400"
                            } md:group-hover:text-neutral-900 dark:md:group-hover:text-white`}
                          >
                            {item.title}
                          </p>
                          <p
                            className={`mt-1 text-xs uppercase tracking-[0.12em] transition-[opacity,color] duration-300 md:text-[11px] ${
                              isActive
                                ? "opacity-100 text-neutral-700 dark:text-neutral-100"
                                : "opacity-55 text-neutral-500/80 dark:text-neutral-400/75"
                            } md:opacity-15 md:text-neutral-500/60 md:group-hover:opacity-100 md:group-hover:text-neutral-700 dark:md:text-neutral-400/70 dark:md:group-hover:text-neutral-100`}
                          >
                            {item.points.join(" • ")}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative lg:col-span-6">
              <svg
                className="pointer-events-none absolute -left-28 top-2 z-30 hidden h-[260px] w-[220px] text-neutral-700/70 md:-left-32 md:h-[320px] md:w-[280px] lg:block dark:text-white/55 xl:-left-40 xl:h-[360px] xl:w-[320px]"
                viewBox="0 0 360 380"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <marker
                    id="curlyArrowA"
                    markerWidth="8"
                    markerHeight="8"
                    refX="6"
                    refY="4"
                    orient="auto"
                    markerUnits="strokeWidth"
                  >
                    <path d="M0 0L8 4L0 8" fill="currentColor" />
                  </marker>
                </defs>
                <path
                  d="M34 24C8 64 18 114 58 146C100 178 148 170 162 140C176 110 146 84 120 98C84 118 114 176 168 214C226 256 292 258 334 206"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  markerEnd="url(#curlyArrowA)"
                />
              </svg>
              <svg
                className="pointer-events-none absolute -left-24 top-44 z-30 hidden h-[260px] w-[220px] text-neutral-700/70 md:-left-28 md:h-[300px] md:w-[260px] lg:block dark:text-white/55 xl:-left-36 xl:h-[340px] xl:w-[300px]"
                viewBox="0 0 320 360"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <marker
                    id="curlyArrowB"
                    markerWidth="8"
                    markerHeight="8"
                    refX="6"
                    refY="4"
                    orient="auto"
                    markerUnits="strokeWidth"
                  >
                    <path d="M0 0L8 4L0 8" fill="currentColor" />
                  </marker>
                </defs>
                <path
                  d="M26 128C72 82 134 92 170 138C206 184 188 248 142 258C92 268 70 218 100 186C144 140 230 132 292 182"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  markerEnd="url(#curlyArrowB)"
                />
              </svg>

              <div className="relative z-10 mx-auto max-w-[430px]">
                <div
                  onMouseLeave={() => setIsDmCardsExpanded(false)}
                  onClick={() => {
                    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
                      setIsDmCardsExpanded((prev) => !prev);
                    }
                  }}
                  className="group relative h-[360px] cursor-pointer overflow-visible sm:h-[420px]"
                >
                  <div
                    className={`absolute left-2 top-4 z-20 w-[58%] rotate-[-8deg] transform-gpu transition-transform duration-500 ease-out md:group-hover:-translate-x-16 md:group-hover:-translate-y-8 md:group-hover:-rotate-12 md:group-hover:scale-[1.04] ${
                      isDmCardsExpanded ? "-translate-x-12 -translate-y-6 -rotate-12 scale-[1.03]" : ""
                    }`}
                  >
                    <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-black/15 shadow-2xl dark:border-white/15">
                      <Image
                        src="/products/dm-1.svg"
                        alt="Instagram post marketing visual"
                        width={860}
                        height={1080}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div
                    className={`absolute right-1 top-14 z-30 w-[58%] rotate-[7deg] transform-gpu transition-transform duration-500 ease-out md:group-hover:translate-x-16 md:group-hover:-translate-y-8 md:group-hover:rotate-[12deg] md:group-hover:scale-[1.04] ${
                      isDmCardsExpanded ? "translate-x-12 -translate-y-6 rotate-[12deg] scale-[1.03]" : ""
                    }`}
                  >
                    <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-black/15 shadow-2xl dark:border-white/15">
                      <Image
                        src="/products/dm-2.svg"
                        alt="Facebook reels campaign visual"
                        width={860}
                        height={1080}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div
                    className={`absolute bottom-0 left-1/2 z-40 w-[62%] -translate-x-1/2 transform-gpu transition-transform duration-500 ease-out md:group-hover:translate-y-14 md:group-hover:scale-[1.04] ${
                      isDmCardsExpanded ? "translate-y-12 scale-[1.03]" : ""
                    }`}
                  >
                    <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-black/15 shadow-[0_20px_60px_rgba(0,0,0,0.25)] dark:border-white/15">
                      <Image
                        src="/products/dm-2.png"
                        alt="Ad creative strategy board visual"
                        width={1000}
                        height={760}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                <p className="mt-3 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.35em] text-neutral-500">
                  <Sparkles className="h-3.5 w-3.5" />
                  Strategy points to visuals ·
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 border-y border-black/10 py-6 dark:border-white/10">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {[
                { title: "Brief", icon: Mail },
                { title: "Positioning", icon: BarChart3 },
                { title: "Creative", icon: Sparkles },
                { title: "Launch", icon: Megaphone },
                { title: "Scale", icon: LineChart },
              ].map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="flex items-center gap-3">
                    <div className="rounded-full border border-black/15 p-2 dark:border-white/20">
                      <Icon className="h-3.5 w-3.5 text-neutral-700 dark:text-neutral-200" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-neutral-500">
                        0{index + 1}
                      </p>
                      <p className="text-sm] font-semibold text-neutral-900 dark:text-white">{step.title}</p>
                    </div>
                    {index < 4 ? (
                      <span className="ml-auto text-xl text-neutral-400 dark:text-neutral-500">↷</span>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <MiniFooter />
    </main>
  );
}
