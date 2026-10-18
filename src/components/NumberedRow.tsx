import React from "react";
import Link from "next/link";

interface NumberedRowProps {
  index: string | number;
  title: string;
  subtitle?: string | null;
  tag?: string | null;
  featured?: boolean;
  featuredBadge?: string;
  href?: string;
  className?: string;
}

export function NumberedRow({
  index,
  title,
  subtitle,
  tag,
  featured = false,
  featuredBadge = "Specialized",
  href,
  className = "",
}: NumberedRowProps) {
  const formattedIndex =
    typeof index === "number" ? String(index).padStart(2, "0") : index;

  const content = (
    <div
      className={`group relative flex items-center justify-between min-h-[56px] py-4 sm:py-5 px-3 sm:px-4 border-b border-line transition-colors duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-surface/80 overflow-hidden ${
        featured ? "bg-surface border-l-4 border-l-accent pl-3 sm:pl-4" : ""
      } ${className}`}
    >
      {/* Red left bar scales in on non-featured hover (scaleY 0 -> 1) */}
      {!featured && (
        <span
          className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none"
          aria-hidden="true"
        />
      )}

      <div className="flex items-start sm:items-baseline gap-3.5 sm:gap-6 min-w-0 pr-3">
        <span
          className={`font-mono text-xs sm:text-sm font-semibold shrink-0 pt-0.5 sm:pt-0 ${
            featured ? "text-accent-text" : "text-secondary group-hover:text-accent-text"
          }`}
        >
          {formattedIndex}
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              className={`font-display text-lg sm:text-2xl leading-snug transition-colors duration-250 ${
                featured
                  ? "text-foreground font-medium"
                  : "text-foreground group-hover:text-accent-text"
              }`}
            >
              {title}
            </h3>
            {featured && (
              <span className="text-[9px] uppercase tracking-wider bg-accent/20 text-accent-text px-1.5 py-0.5 font-mono rounded-[1px]">
                {featuredBadge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-secondary text-xs sm:text-sm mt-0.5 line-clamp-2">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0 pl-2">
        {tag && !featured && (
          <span className="hidden sm:inline-block text-label text-secondary border border-line px-2.5 py-1 rounded-[2px]">
            {tag}
          </span>
        )}
        {/* Action arrow */}
        <span
          className={`text-base sm:text-lg inline-block transition-transform duration-250 group-hover:translate-x-1 ${
            featured ? "text-accent-text" : "text-secondary group-hover:text-accent-text"
          }`}
          aria-hidden="true"
        >
          &rarr;
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block no-underline focus-visible:outline-2 focus-visible:outline-foreground rounded-[2px]"
      >
        {content}
      </Link>
    );
  }

  return content;
}
