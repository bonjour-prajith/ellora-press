"use client";

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import OpeningIntro from "@/components/OpeningIntro";

type IntroWindow = Window & {
  __epHomeIntroPlayed?: boolean;
};

const runtimeInitialPathname =
  typeof window === "undefined" ? null : window.location.pathname;

export default function RouteAwareIntro() {
  const pathname = usePathname();
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!isHydrated) {
    return null;
  }

  if (pathname !== "/" || typeof window === "undefined" || runtimeInitialPathname !== "/") {
    return null;
  }

  const introWindow = window as IntroWindow;
  const introAlreadyDone = introWindow.__epHomeIntroPlayed === true;
  if (introAlreadyDone) {
    return null;
  }

  return <OpeningIntro onComplete={() => {
    introWindow.__epHomeIntroPlayed = true;
  }} />;
}
