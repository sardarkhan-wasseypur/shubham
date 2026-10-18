import React from "react";

interface HeroNameProps {
  className?: string;
  tagline?: string;
}

export function HeroName({ className = "", tagline = "SUPREME COURT & HIGH COURT COUNSEL" }: HeroNameProps) {
  return (
    <div className={`relative flex items-stretch gap-3 sm:gap-4 select-none ${className}`}>
      {/* Vertical solid red accent block with rotated text */}
      <div
        className="bg-accent text-on-accent px-2 sm:px-3 py-4 flex flex-col items-center justify-between shrink-0 rounded-[2px]"
        aria-hidden="true"
      >
        <span className="w-1.5 h-1.5 bg-on-accent rounded-full mb-2" />
        <span
          className="font-hero tracking-[0.25em] text-sm sm:text-base text-on-accent"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          ADV.
        </span>
        <span className="w-1.5 h-1.5 bg-on-accent rounded-full mt-2" />
      </div>

      {/* Two-line mask-ready heading */}
      <div className="flex flex-col justify-between overflow-hidden">
        {tagline && (
          <p className="text-label text-accent-text font-sans font-semibold tracking-[0.2em] mb-1 sm:mb-2">
            {tagline}
          </p>
        )}
        <h1 className="font-hero text-hero-name leading-[0.85] tracking-tight text-foreground flex flex-col">
          <span className="inline-block transform-gpu">SHUBHAM</span>
          <span className="inline-block transform-gpu text-foreground">SINGH</span>
        </h1>
      </div>
    </div>
  );
}
