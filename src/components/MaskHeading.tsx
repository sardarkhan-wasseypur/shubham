import React from "react";

export interface MaskHeadingProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div" | "p";
  lines?: string[];
  children?: React.ReactNode;
  className?: string;
  delay?: number; // ms
  stagger?: number; // ms per line, default 100
  id?: string;
  style?: React.CSSProperties;
}

/**
 * MaskHeading: Line-by-line masked rise heading.
 * Each line sits inside an overflow-hidden mask and rises translateY(100%) -> translateY(0)
 * over 900ms with ease cubic-bezier(0.22, 1, 0.36, 1) and optional stagger.
 * Observed centrally by RevealController via [data-reveal="mask-heading"].
 */
export function MaskHeading({
  as: Component = "h2",
  lines,
  children,
  className = "",
  delay = 0,
  stagger = 100,
  id,
  style,
}: MaskHeadingProps) {
  // If lines are provided, render each line inside its own mask container
  if (lines && lines.length > 0) {
    return (
      <Component
        id={id}
        data-reveal="mask-heading"
        className={`mask-heading-container ${className}`}
        style={style}
      >
        {lines.map((line, idx) => {
          const lineDelay = delay + idx * stagger;
          return (
            <span
              key={idx}
              className="mask-line-container block overflow-hidden leading-tight"
            >
              <span
                className="mask-line-inner block transform-gpu"
                style={lineDelay > 0 ? { transitionDelay: `${lineDelay}ms` } : undefined}
              >
                {line}
              </span>
            </span>
          );
        })}
      </Component>
    );
  }

  // If children is provided as a string, check if it contains linebreaks or single line
  return (
    <Component
      id={id}
      data-reveal="mask-heading"
      className={`mask-heading-container ${className}`}
      style={style}
    >
      <span className="mask-line-container block overflow-hidden leading-tight">
        <span
          className="mask-line-inner block transform-gpu"
          style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
        >
          {children}
        </span>
      </span>
    </Component>
  );
}

// Alias for backwards compatibility with any existing imports
export const MaskedHeading = MaskHeading;
