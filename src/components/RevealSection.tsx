import React from "react";
import { Reveal } from "./Reveal";

export interface RevealSectionProps {
  as?: "section" | "div";
  className?: string;
  id?: string;
  delay?: number;
  staggerIndex?: number;
  children: React.ReactNode;
}

/**
 * RevealSection: Section wrapper using the unified Reveal system.
 * Observed centrally by RevealController via [data-reveal="fade-up"].
 */
export function RevealSection({
  as: Component = "section",
  className = "",
  id,
  delay,
  staggerIndex,
  children,
}: RevealSectionProps) {
  return (
    <Reveal
      as={Component}
      id={id}
      className={className}
      delay={delay}
      staggerIndex={staggerIndex}
    >
      {children}
    </Reveal>
  );
}
