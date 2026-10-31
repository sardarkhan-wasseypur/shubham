import React from "react";

export interface RevealProps {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  staggerIndex?: number; // integer multiplied by 100ms
  distance?: number; // vertical translate distance in px, default 24
  id?: string;
  style?: React.CSSProperties;
}

/**
 * Reveal Component: One-shot fade-up animation.
 * Translates translateY(24px) -> translateY(0) and opacity 0 -> 1 over 900ms
 * with ease cubic-bezier(0.22, 1, 0.36, 1).
 * Observed centrally by RevealController.
 */
export function Reveal({
  as: Component = "div",
  children,
  className = "",
  delay,
  staggerIndex,
  distance = 24,
  id,
  style,
}: RevealProps) {
  const computedDelay =
    delay !== undefined
      ? delay
      : staggerIndex !== undefined
      ? staggerIndex * 100
      : undefined;

  const dynamicStyles: React.CSSProperties = {
    ...style,
    ...(computedDelay !== undefined && computedDelay > 0
      ? { transitionDelay: `${computedDelay}ms` }
      : {}),
    ...(distance !== 24
      ? ({ "--reveal-distance": `${distance}px` } as React.CSSProperties)
      : {}),
  };

  return (
    <Component
      id={id}
      data-reveal="fade-up"
      className={`reveal-fade-up ${className}`}
      style={dynamicStyles}
      suppressHydrationWarning
    >
      {children}
    </Component>
  );
}
