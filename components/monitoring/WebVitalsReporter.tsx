"use client";

import { useRef } from "react";
import { useReportWebVitals } from "next/web-vitals";

const parseSampleRate = () => {
  const raw = process.env.NEXT_PUBLIC_WEB_VITALS_SAMPLE_RATE;
  if (!raw) return 1;
  const parsed = Number(raw);
  if (Number.isNaN(parsed)) return 1;
  return Math.min(1, Math.max(0, parsed));
};

const SAMPLE_RATE = parseSampleRate();

export default function WebVitalsReporter() {
  const seen = useRef<Set<string>>(new Set());

  useReportWebVitals((metric) => {
    if (Math.random() > SAMPLE_RATE) return;

    const key = `${metric.id}:${metric.name}`;
    if (seen.current.has(key)) return;
    seen.current.add(key);

    const payload = JSON.stringify({
      id: metric.id,
      name: metric.name,
      value: metric.value,
      delta: metric.delta,
      rating: metric.rating,
      navigationType: metric.navigationType,
      path: window.location.pathname,
      ts: Date.now(),
    });

    const url = "/api/vitals";

    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon(url, blob);
      return;
    }

    fetch(url, {
      method: "POST",
      body: payload,
      headers: { "Content-Type": "application/json" },
      keepalive: true,
    }).catch(() => undefined);
  });

  return null;
}
