"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // UseEffect only runs on the client. 
  // This ensures we don't try to render theme-specific icons on the server.
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Return a placeholder with the same size to prevent layout shift
  if (!mounted) {
    return <div className="h-9 w-9 p-2 opacity-0" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
className="inline-flex items-center justify-center rounded-full p-2 text-sm font-medium transition-colors 
           hover:bg-white/10 dark:hover:bg-white/10
           text-neutral-900 dark:text-neutral-100"    >
      {theme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-white" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-white" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}