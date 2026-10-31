"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * RevealController: Central scroll & route animation orchestrator.
 * Placed in RootLayout. On mount and every route change (via usePathname):
 * 1. Defers execution until after React hydration completes to prevent hydration mismatches.
 * 2. Marks any elements currently within or near the viewport as .is-revealed so they never flash.
 * 3. Adds the .js class to documentElement for progressive enhancement of below-the-fold reveals.
 * 4. Observes remaining offscreen [data-reveal] elements with IntersectionObserver (rootMargin 80px).
 * 5. Respects prefers-reduced-motion: reduce.
 */
export function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    // Run after React hydration finishes across the route
    const timer = setTimeout(() => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
        document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
          el.classList.add("is-revealed");
        });
        return;
      }

      // 1. Immediately mark all elements currently within or near viewport as revealed
      const vh = window.innerHeight || 800;
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh + 100) {
          el.classList.add("is-revealed");
        }
      });

      // 2. Enable .js class now that in-viewport elements are safely marked revealed
      document.documentElement.classList.add("js");

      // 3. Observe remaining offscreen targets as user scrolls
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLElement;
              target.classList.add("is-revealed");
              observer?.unobserve(target);
            }
          });
        },
        {
          threshold: 0,
          rootMargin: "80px",
        }
      );

      const elements = document.querySelectorAll<HTMLElement>(
        "[data-reveal]:not(.is-revealed)"
      );
      elements.forEach((el) => {
        observer?.observe(el);
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [pathname]);

  return null;
}
