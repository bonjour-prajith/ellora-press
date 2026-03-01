"use client";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import logoAnimation from "@/public/Logos/hourglasslogo-animate.json";

const footerLinks = {
  product: [
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
  social: [
    { name: "Twitter", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "LinkedIn", href: "#" },
  ],
};

const QUICK_QUOTE_QR_VALUE =
  "https://wa.me/918939000230?text=Hi%20Ellora%20Press%2C%20I%20need%20a%20quick%20quote.";
const QUICK_QUOTE_QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=10&ecc=M&format=svg&data=${encodeURIComponent(
  QUICK_QUOTE_QR_VALUE
)}`;

export default function Footer() {

const lottieRef = useRef<LottieRefCurrentProps>(null);

  // Synced logic with Navbar: Pause for 3 seconds after each loop
  const handleLoopComplete = () => {
    lottieRef.current?.pause();
    setTimeout(() => {
      lottieRef.current?.play();
    }, 3000);
  };  



  return (
    <footer className="relative w-full py-0 px-4 mt-1">
      {/* Background Grid - optional, if you want it to continue into footer */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="rounded-[2.5rem] border border-white/10 bg-black/100 backdrop-blur-xl p-8 md:p-12 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            
            {/* Brand Section */}
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="flex items-center gap-3 group">
                {/* ADJUST SIZE HERE: Change w-8 h-8 to your preferred dimensions */}
                <div className="relative w-20 h-20 flex items-center mt-2 justify-center overflow-hidden transition-transform duration-300 group-hover:scale-110">
                  <Lottie 
                    lottieRef={lottieRef}
                    animationData={logoAnimation}
                    loop={true}
                    onLoopComplete={handleLoopComplete}
                    className="absolute w-full h-full transform scale-[1.8] origin-center"
                  />
                </div>
                <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tighter text-white">
                  Ellora
                </span>
                <span className="text-5xl font-normal tracking-tighter text-white">
                  Press
                </span>
                </div>
              </Link>
              <p className="mt-4 text-center md:text-centert text-neutral-400 max-w-xs text-sm leading-relaxed">
                Building the next generation of printing experiences with precision and speed.
              </p>
            </div>

            {/* Links Sections */}
            <div className="text-center md:text-left">
              <h4 className="font-semibold text-white mb-4">Sitemap</h4>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-neutral-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center md:text-left">
              <h4 className="font-semibold text-white mb-4">Social</h4>
              <ul className="space-y-2">
                {footerLinks.social.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-neutral-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 mt-4 md:mt-0 flex flex-col items-center text-center md:col-span-1 lg:self-center lg:-translate-x-16">
              <div className="inline-flex flex-col items-center rounded-xl border border-white/10 bg-white p-2">
                <Image
                  src={QUICK_QUOTE_QR_SRC}
                  alt="Scan for a Quick Quote QR"
                  width={96}
                  height={96}
                  sizes="96px"
                  unoptimized
                  className="h-24 w-24 object-contain"
                />
              </div>
              <p className="mt-3 max-w-[10rem] text-center text-xs leading-relaxed text-neutral-400">
                Scan for a Quick Quote
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex justify-center items-center">
            <p className="text-xs text-neutral-400">
              © 2026 Ellora Press. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
