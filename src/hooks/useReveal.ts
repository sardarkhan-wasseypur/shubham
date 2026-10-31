"use client";

import { useEffect, useRef, useState } from "react";

interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Custom hook for one-shot viewport entry observation.
 * Automatically reveals elements already within the viewport on mount.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOptions = {}
) {
  const { threshold = 0, rootMargin = "80px" } = options;
  const ref = useRef<T | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Immediately reveal if already within or near the viewport
    const vh = window.innerHeight || 800;
    if (node.getBoundingClientRect().top < vh + 100) {
      setIsRevealed(true);
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(node);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return [ref, isRevealed] as const;
}
