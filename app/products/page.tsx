"use client";

import { useState } from "react";
import { ProductGallery } from "@/components/sections/ProductGallery";
import { PRODUCT_DATA } from "@/data/site-data";
import MiniFooter from "@/components/MiniFooter";
import Image from "next/image";

export default function ProductsPage() {
  const [isMainCardRevealed, setIsMainCardRevealed] = useState(false);

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
                src="/products/special-labels.webp"
                alt="Special label products"
                width={1400}
                height={900}
                className="h-[320px] w-full object-contain md:h-[460px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="mystery-products" className="relative mb-11 w-full overflow-hidden bg-[#040507] py-4 text-white md:mb-[3.75rem] md:py-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.18),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(217,70,239,0.2),transparent_50%)]" />
          <div className="absolute inset-0 opacity-35 [background:repeating-linear-gradient(115deg,rgba(255,255,255,0.08)_0px,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_18px)]" />
          <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-fuchsia-400/20 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-6 md:px-12 md:py-8">

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
                  We got it covered with our unique <span className="text-[1.14em] font-bold text-white">Promotional Products</span> that you can find nowhere else, to know more contact us and ask for the <span className="text-[1em] font-bold text-white">Not-Usual Products,</span> we provide you with a unique collection of creatively customised marketing and packaging products.
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
                      <p className="text-sm font-semibold text-white md:hidden">Tap to unlock</p>
                      <p className="hidden text-sm font-semibold text-white md:block">Hover to unlock</p>
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

      <MiniFooter />
    </main>
  );
}
