import React from "react";

interface TickerProps {
  items: string[];
  className?: string;
  speedSeconds?: number;
}

export function Ticker({
  items,
  className = "",
  speedSeconds = 30,
}: TickerProps) {
  return (
    <div
      className={`relative w-full overflow-hidden border-y border-line bg-surface py-3 sm:py-4 select-none ${className}`}
    >
      <div
        className="flex w-max animate-ticker hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        {/* Track 1 */}
        <div className="flex items-center gap-6 sm:gap-10 shrink-0 pr-6 sm:pr-10">
          {items.map((item, idx) => (
            <div key={`track1-${idx}`} className="flex items-center gap-6 sm:gap-10">
              <span className="font-sans text-xs sm:text-sm uppercase tracking-[0.18em] text-foreground font-medium whitespace-nowrap">
                {item}
              </span>
              <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0" aria-hidden="true" />
            </div>
          ))}
        </div>

        {/* Track 2 (Duplicate for seamless loop, hidden from assistive tech) */}
        <div
          aria-hidden="true"
          className="flex items-center gap-6 sm:gap-10 shrink-0 pr-6 sm:pr-10"
        >
          {items.map((item, idx) => (
            <div key={`track2-${idx}`} className="flex items-center gap-6 sm:gap-10">
              <span className="font-sans text-xs sm:text-sm uppercase tracking-[0.18em] text-foreground font-medium whitespace-nowrap">
                {item}
              </span>
              <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
