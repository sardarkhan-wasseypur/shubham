import React from "react";

export interface DrawLineProps {
  color?: "accent" | "line" | "foreground";
  height?: string;
  width?: string;
  className?: string;
  delay?: number; // ms
  duration?: number; // ms, default 500ms
  as?: React.ElementType;
  style?: React.CSSProperties;
}

const colorClassMap: Record<NonNullable<DrawLineProps["color"]>, string> = {
  accent: "bg-accent",
  line: "bg-line",
  foreground: "bg-foreground",
};

/**
 * DrawLine: Hairline or red rule that grows smoothly from width 0 (scaleX: 0 -> 1).
 * Duration 500ms with ease cubic-bezier(0.22, 1, 0.36, 1).
 * Observed centrally by RevealController via [data-reveal="draw-line"].
 */
export function DrawLine({
  color = "accent",
  height = "h-[2px]",
  width = "w-8",
  className = "",
  delay = 0,
  duration = 500,
  as: Component = "span",
  style,
}: DrawLineProps) {
  const colorClass = colorClassMap[color] || "bg-accent";

  return (
    <Component
      data-reveal="draw-line"
      aria-hidden="true"
      className={`draw-line-element block ${height} ${width} ${colorClass} ${className}`}
      style={{
        ...style,
        ...(delay > 0 ? { transitionDelay: `${delay}ms` } : {}),
        ...(duration !== 500 ? { transitionDuration: `${duration}ms` } : {}),
      }}
    />
  );
}
