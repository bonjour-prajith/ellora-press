// src/hooks/use-scroll-spy.ts
import { useState, useEffect } from "react";

export function useScrollSpy(ids: string[]) {
  const [activeId, setActiveId] = useState<number>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When a section takes up 50% or more of the screen
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute("data-index");
            if (index !== null) {
              setActiveId(parseInt(index));
            }
          }
        });
      },
      { 
        threshold: 0.5, // Trigger when 50% of the section is visible
        rootMargin: "-10% 0% -10% 0%" // Creates a "hit zone" in the center of the screen
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}