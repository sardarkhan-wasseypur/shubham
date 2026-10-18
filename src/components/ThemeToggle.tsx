"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener("storage", callback);

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.attributeName === "data-theme") {
        callback();
      }
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  return () => {
    window.removeEventListener("storage", callback);
    observer.disconnect();
  };
}

function getSnapshot(): "light" | "dark" {
  if (typeof document === "undefined") {
    return "dark";
  }
  const currentTheme = document.documentElement.getAttribute("data-theme");
  return currentTheme === "light" ? "light" : "dark";
}

function getServerSnapshot(): "light" | "dark" {
  return "dark";
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = (nextTheme: "light" | "dark") => {
    try {
      localStorage.removeItem("theme"); // Clear legacy key
      localStorage.setItem("theme-v2", nextTheme);
    } catch {}
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return { theme, isDark: theme === "dark", setTheme, toggleTheme };
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { isDark, toggleTheme } = useTheme();
  const ariaLabel = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={ariaLabel}
      aria-pressed={isDark}
      className={`w-10 h-10 min-w-10 min-h-10 flex items-center justify-center border border-line bg-surface text-foreground hover:text-accent-text hover:border-foreground rounded-[2px] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-foreground cursor-pointer shrink-0 ${className}`}
    >
      {isDark ? (
        /* Sun Icon to switch to light */
        <svg
          className="w-4 h-4 fill-none stroke-current"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      ) : (
        /* Moon Icon to switch to dark */
        <svg
          className="w-4 h-4 fill-none stroke-current"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
      <span className="sr-only">{ariaLabel}</span>
    </button>
  );
}

export function SegmentedThemeSwitch({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span className="text-secondary tracking-wider text-[10px] uppercase font-mono mr-1">
        THEME:
      </span>
      <div className="inline-flex p-0.5 bg-background border border-line rounded-[1px]">
        <button
          type="button"
          onClick={() => setTheme("light")}
          className={`px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase transition-colors rounded-[1px] min-h-[32px] ${
            theme === "light"
              ? "bg-foreground text-background shadow-sm"
              : "text-secondary hover:text-foreground"
          }`}
        >
          Light
        </button>
        <button
          type="button"
          onClick={() => setTheme("dark")}
          className={`px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase transition-colors rounded-[1px] min-h-[32px] ${
            theme === "dark"
              ? "bg-foreground text-background shadow-sm"
              : "text-secondary hover:text-foreground"
          }`}
        >
          Dark
        </button>
      </div>
    </div>
  );
}
