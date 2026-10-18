import React from "react";

interface SectionLabelProps {
  number?: string | number;
  label: string;
  className?: string;
}

export function SectionLabel({ number, label, className = "" }: SectionLabelProps) {
  const formattedNumber =
    typeof number === "number" ? String(number).padStart(2, "0") : number;

  return (
    <div className={`inline-flex items-center gap-2.5 text-label ${className}`}>
      {formattedNumber && (
        <span className="font-mono text-accent-text font-semibold">
          [{formattedNumber}]
        </span>
      )}
      <span className="text-secondary tracking-[0.18em] uppercase font-sans">
        {label}
      </span>
      <span className="w-6 h-[1px] bg-line inline-block" aria-hidden="true" />
    </div>
  );
}
