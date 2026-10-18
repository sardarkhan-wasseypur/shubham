"use client";

import React, { useState } from "react";
import { profile } from "@/content/profile";

export function ChamberAddressCard() {
  const [copied, setCopied] = useState(false);

  const addressText = profile.address.value || "";
  const landmarks = profile.address.landmarks || [];
  const mapsUrl = profile.address.mapsUrl || "";
  const phone = profile.phone.value || "";

  const handleCopy = async () => {
    if (!addressText) return;
    try {
      await navigator.clipboard.writeText(
        `${profile.officeName.value}\n${addressText}\nLandmarks: ${landmarks.join(", ")}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="border border-line bg-surface/70 p-6 rounded-[2px] space-y-5">
      {/* Office Name & Location */}
      <div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent-text block mb-1 font-semibold">
          CHAMBER / OFFICE
        </span>
        <h3 className="text-base text-foreground font-display font-medium">
          {profile.officeName.value}
        </h3>
        <p className="text-xs text-secondary mt-0.5">
          New Delhi, India &bull; Judicial &amp; Commercial Practice
        </p>
      </div>

      {/* Verified Address */}
      {profile.address.verified && addressText && (
        <div className="pt-4 border-t border-line/60">
          <span className="text-[10px] font-mono uppercase tracking-widest text-accent-text block mb-1 font-semibold">
            OFFICE ADDRESS
          </span>
          <p className="text-sm text-foreground leading-relaxed">
            {addressText}
          </p>

          {landmarks.length > 0 && (
            <p className="text-xs text-secondary mt-1.5 flex items-center gap-1.5">
              <span className="text-foreground/80 font-medium">Landmarks:</span>
              <span>{landmarks.join(" &bull; ")}</span>
            </p>
          )}

          {/* Action Row: Directions & Copy */}
          <div className="mt-3 flex items-center gap-3">
            {mapsUrl && (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-accent-text hover:underline font-medium"
              >
                <span>Get Directions (Maps)</span>
                <span className="text-xs">&nearr;</span>
              </a>
            )}

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 text-xs text-secondary hover:text-foreground transition-colors px-2 py-1 rounded border border-line bg-background cursor-pointer"
              aria-label="Copy office address to clipboard"
            >
              <span>{copied ? "✓ Copied" : "Copy Address"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Verified Telephone */}
      {profile.phone.verified && phone && (
        <div className="pt-4 border-t border-line/60">
          <span className="text-[10px] font-mono uppercase tracking-widest text-accent-text block mb-1 font-semibold">
            TELEPHONE (DIRECT)
          </span>
          <a
            href={`tel:${phone}`}
            className="text-sm font-mono text-foreground hover:text-accent-text transition-colors font-medium inline-block mt-0.5"
          >
            {phone}
          </a>
          <span className="text-[11px] text-secondary block mt-0.5">
            Chamber administrative desk &bull; Mon–Sat, 10 AM – 7 PM IST
          </span>
        </div>
      )}

      {/* Response Timeline & Email Clarification Note */}
      <div className="pt-4 border-t border-line/60 space-y-2">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-accent-text block mb-1 font-semibold">
            RESPONSE TIMELINE
          </span>
          <p className="text-xs text-secondary leading-relaxed">
            Online consultation requests are reviewed within 24 business hours to conduct preliminary conflict checks.
          </p>
        </div>

        <div className="pt-2 text-[11px] text-secondary/90 italic">
          Note: Direct email communication is coordinated via the secure consultation desk intake form.
        </div>
      </div>
    </div>
  );
}
