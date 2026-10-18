import React from "react";
import Image from "next/image";
import { profile } from "@/content/profile";

interface PortraitFrameProps {
  className?: string;
  priority?: boolean;
}

export function PortraitFrame({ className = "", priority = false }: PortraitFrameProps) {
  // Enforce Verified Content Only rule
  if (!profile.photo.verified || !profile.photo.value) {
    return null;
  }

  const altText =
    profile.photoAlt.verified && profile.photoAlt.value
      ? profile.photoAlt.value
      : "Portrait of Advocate Shubham Singh";

  return (
    <div
      className={`group relative border border-line bg-surface p-2 sm:p-3 rounded-[2px] transition-colors duration-250 hover:border-foreground/40 ${className}`}
    >
      {/* Corner Red Accent Detail */}
      <div
        className="absolute -top-1 -right-1 w-3 h-3 bg-accent z-10"
        aria-hidden="true"
      />

      {/* Overflow-hidden frame: image scales 1.03 over 700ms on hover */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-background">
        <Image
          src={profile.photo.value}
          alt={altText}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
          className="object-cover object-top select-none filter-none transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        />
        {/* Subtle theme-responsive editorial scrim */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>

      <div className="pt-3 pb-1 px-1 flex items-center justify-between text-[11px] font-mono text-secondary tracking-wider uppercase border-t border-line/60 mt-2">
        <span>DELHI, INDIA</span>
        <span className="text-accent-text font-semibold">ADVOCATE</span>
      </div>
    </div>
  );
}
