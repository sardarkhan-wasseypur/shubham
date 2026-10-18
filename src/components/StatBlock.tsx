"use client";

import React, { useState, useEffect, useRef } from "react";
import { MOTION } from "@/lib/motion";

interface StatBlockProps {
  number: string | number;
  label: string;
  sublabel?: string;
  className?: string;
}

export function StatBlock({
  number,
  label,
  sublabel,
  className = "",
}: StatBlockProps) {
  const targetNum =
    typeof number === "number"
      ? number
      : parseInt(String(number).replace(/\D/g, ""), 10) || 0;

  const isPadded = typeof number === "string" && number.startsWith("0") && number.length === 2;
  const initialDisplay = isPadded ? "00" : "0";

  const [displayNumber, setDisplayNumber] = useState<string>(initialDisplay);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (animatedRef.current) return;
    animatedRef.current = true;

    const duration = MOTION.durations.statsCount; // 1200ms
    const startTimestamp = performance.now();

    const frame = (now: number) => {
      // Check for prefers-reduced-motion asynchronously on frame
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        setDisplayNumber(String(number));
        return;
      }

      const elapsed = now - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic: 1 - (1 - progress)^3
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(easeOut * targetNum);

      setDisplayNumber(isPadded ? String(current).padStart(2, "0") : String(current));

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setDisplayNumber(String(number));
      }
    };

    requestAnimationFrame(frame);
  }, [number, targetNum, isPadded]);

  return (
    <div
      className={`border-l border-line pl-4 sm:pl-6 py-2 flex flex-col justify-between ${className}`}
    >
      <div className="flex items-baseline gap-1">
        <span className="font-hero text-4xl sm:text-5xl md:text-6xl text-foreground leading-none tracking-tight">
          {displayNumber}
        </span>
      </div>
      <div className="mt-2">
        <p className="text-label text-secondary uppercase tracking-[0.16em] font-sans font-medium">
          {label}
        </p>
        {sublabel && (
          <p className="text-xs text-secondary mt-0.5 line-clamp-1">
            {sublabel}
          </p>
        )}
      </div>
    </div>
  );
}
