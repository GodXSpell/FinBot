"use client";

import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback } from "react";

import { META_THEME_COLORS } from "@/config/site";
import { useMetaColor } from "@/hooks/use-meta-color";

interface ToggleThemeProps {
  variant?: "outline" | "ghost" | "default";
  size?: "icon" | "sm" | "lg" | "default";
  className?: string;
}

export function ToggleTheme({ 
  variant = "outline", 
  size = "icon", 
  className = "" 
}: ToggleThemeProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const { setMetaColor } = useMetaColor();

  const switchTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    setMetaColor(
      resolvedTheme === "dark"
        ? META_THEME_COLORS.light
        : META_THEME_COLORS.dark
    );
  }, [resolvedTheme, setTheme, setMetaColor]);

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9 ${className}`}
      onClick={() => {
        if (typeof document !== 'undefined' && document.startViewTransition) {
          document.startViewTransition(switchTheme);
        } else {
          switchTheme();
        }
      }}
    >
      <MoonStar className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Sun className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle Theme</span>
    </button>
  );
}