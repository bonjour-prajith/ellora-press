"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;

    const { width, height, left, top } = ref.current.getBoundingClientRect();
    
    // Calculate center of the element
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Calculate distance from cursor to center
    const x = clientX - centerX;
    const y = clientY - centerY;
    
    // SET TO 0.3 (Positive)
    // If -0.3 pushed it away, 0.3 will pull it in.
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
}