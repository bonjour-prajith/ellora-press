"use client";

import { useEffect, useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function DeferredSpeedInsights() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let idleId: number | null = null;
    const runtime = globalThis as typeof globalThis & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    const onReady = () => setEnabled(true);

    if (typeof runtime.requestIdleCallback === "function") {
      idleId = runtime.requestIdleCallback(onReady, { timeout: 2500 });
    } else {
      timeoutId = globalThis.setTimeout(onReady, 1200);
    }

    return () => {
      if (idleId !== null && typeof runtime.cancelIdleCallback === "function") {
        runtime.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        globalThis.clearTimeout(timeoutId);
      }
    };
  }, []);

  return enabled ? <SpeedInsights /> : null;
}
