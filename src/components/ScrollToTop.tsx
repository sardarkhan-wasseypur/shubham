"use client";

import { useLayoutEffect, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollToTop: Guarantees that every new page opens at (0, 0) instantly on navigation.
 * - Runs synchronously inside useLayoutEffect on pathname change.
 * - Honors in-page anchors when a hash is present (e.g. /#contact).
 * - Preserves browser Back/Forward scroll restoration via popstate detection.
 * - Unlocks body scroll and closes any open mobile menus on route change.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const isPopStateNavigation = useRef(false);

  // Detect browser Back / Forward navigation (popstate)
  useEffect(() => {
    const handlePopState = () => {
      isPopStateNavigation.current = true;
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useLayoutEffect(() => {
    // Only process actual pathname transitions, not first mount
    if (prevPathname.current === pathname) {
      return;
    }
    prevPathname.current = pathname;

    // Unlock body scroll in case a modal or mobile menu locked it
    document.body.style.overflow = "";

    // If back/forward navigation occurred, allow browser/Next.js to restore scroll position
    if (isPopStateNavigation.current) {
      isPopStateNavigation.current = false;
      return;
    }

    // Check if the route has an in-page anchor hash
    const hash = window.location.hash;
    if (hash) {
      try {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "instant" });
          return;
        }
      } catch {
        // Fall through to top scroll if querySelector fails
      }
    }

    // Instantly reset window scroll position to the very top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}
