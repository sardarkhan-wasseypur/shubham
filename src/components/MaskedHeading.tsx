"use client";

import React from "react";
import { useReveal } from "@/hooks/useReveal";

interface MaskedHeadingProps {
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div";
  className?: string;
  children: React.ReactNode;
}

/**
 * Editorial Masked Heading Reveal
 * Headings rise translateY(100%) -> 0 inside an overflow-hidden mask (900ms, cubic-bezier(0.22, 1, 0.36, 1)).
 * Triggered by IntersectionObserver (threshold 0.15) once.
 * Gracefully displays immediately when JavaScript is disabled (no-js).
 */
export function MaskedHeading({
  as: Component = "h2",
  className = "",
  children,
}: MaskedHeadingProps) {
  const [ref, isRevealed] = useReveal<HTMLDivElement>({ threshold: 0.15 });

  return (
    <Component
      ref={ref as React.Ref<any>} // eslint-disable-line @typescript-eslint/no-explicit-any
      className={`mask-line-container ${isRevealed ? "is-revealed" : ""} ${className}`}
    >
      <span className="mask-line-inner transform-gpu">{children}</span>
    </Component>
  );
}
