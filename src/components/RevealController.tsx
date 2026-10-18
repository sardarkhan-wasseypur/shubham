"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * RevealController: Central scroll & route animation orchestrator.
 * Placed in RootLayout. On mount and every route change (via usePathname):
 * 1. Re-queries all [data-reveal] elements in the DOM.
 * 2. Observes them with ONE IntersectionObserver (threshold 0.15).
 * 3. Immediately fires for all elements currently in viewport, animating them.
 * 4. Unobserves each element immediately after firing.
 * 5. Cleans up and disconnects on unmount or route change.
 * 6. Respects prefers-reduced-motion: reduce.
 */
export function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    // If reduced motion is requested or IntersectionObserver is unsupported, reveal all immediately
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        el.classList.add("is-revealed");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add("is-revealed");
            observer.unobserve(target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    const observeTargets = () => {
      const elements = document.querySelectorAll<HTMLElement>(
        "[data-reveal]:not(.is-revealed)"
      );
      elements.forEach((el) => {
        observer.observe(el);
      });
    };

    // Run observation after React finishes DOM hydration across the route
    const timer = setTimeout(observeTargets, 80);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
