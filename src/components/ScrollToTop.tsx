"use client";

import { useLayoutEffect, useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * scrollToTopInstant: Reliably and instantaneously sets the scroll position to (0, 0)
 * across window, documentElement, and body.
 */
function scrollToTopInstant() {
  if (typeof window === "undefined") return;

  try {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  } catch {
    window.scrollTo(0, 0);
  }

  if (document.documentElement) {
    document.documentElement.scrollTop = 0;
  }
  if (document.body) {
    document.body.scrollTop = 0;
  }
}

/**
 * ScrollToTop: Enforces that clicking on any page option or navigating opens at the top (0, 0) every time.
 * - Sets browser history.scrollRestoration to 'manual' so the browser never restores old scroll positions.
 * - Intercepts internal link clicks to reset scroll to top immediately upon click.
 * - Enforces (0, 0) on pathname transitions via useLayoutEffect, useEffect, requestAnimationFrame, and post-mount timers.
 * - Correctly honors explicit in-page anchor links (e.g., #contact) when a hash is targeted.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  // 1. Enforce manual scroll restoration once on mount
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      try {
        window.history.scrollRestoration = "manual";
      } catch {
        // Fallback for browsers with restricted history permissions
      }
    }

    // Intercept clicks on internal links to reset scroll instantly before route transition
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Ignore external links, mailto, tel, or explicit in-page anchors
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#")
      ) {
        return;
      }

      // If the link has an anchor hash like "/page#section", let it scroll to that section
      if (href.includes("#")) {
        return;
      }

      // Reset scroll immediately so the viewport is at top when the new page renders
      scrollToTopInstant();
    };

    document.addEventListener("click", handleLinkClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleLinkClick, { capture: true });
    };
  }, []);

  // 2. Run immediately on layout phase of pathname change
  useLayoutEffect(() => {
    // Unlock body scroll if it was locked by any modal/menu
    document.body.style.overflow = "";

    // If an explicit hash exists, try to scroll to the target element
    const hash = window.location.hash;
    if (hash && hash !== "#") {
      try {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "instant" });
          return;
        }
      } catch {
        // Fall through to instant top reset
      }
    }

    scrollToTopInstant();
  }, [pathname]);

  // 3. Re-enforce scroll at (0, 0) across animation frame and microtasks
  // to prevent any deferred browser or Next.js router scroll restoration from overriding it.
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash !== "#") return;

    scrollToTopInstant();

    const rafId = requestAnimationFrame(() => {
      scrollToTopInstant();
    });

    const timer1 = setTimeout(scrollToTopInstant, 30);
    const timer2 = setTimeout(scrollToTopInstant, 100);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [pathname]);

  return null;
}
