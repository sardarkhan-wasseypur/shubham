import React from "react";
import { Container } from "./Container";
import { Breadcrumbs, BreadcrumbItem } from "./Breadcrumbs";
import { DrawLine } from "./DrawLine";
import { MaskHeading } from "./MaskHeading";
import { Reveal } from "./Reveal";

export interface PageHeroProps {
  breadcrumbs?: BreadcrumbItem[];
  eyebrow?: string;
  title: string;
  titleLines?: string[];
  subtitle?: string | null;
  intro?: React.ReactNode;
  statutoryNote?: React.ReactNode;
  actions?: React.ReactNode;
  rightContent?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

/**
 * PageHero: Standardized inner-page hero section with choreographed editorial motion.
 * Features:
 * 1. Breadcrumb fade-up (delay 50ms)
 * 2. Red rule DrawLine (delay 150ms) + Eyebrow label fade-up (delay 200ms)
 * 3. H1 MaskHeading line-by-line masked rise (delay 250ms)
 * 4. Subtitle / Designation fade-up (delay 350ms)
 * 5. Intro text fade-up (delay 450ms)
 * 6. Statutory notes or callouts (delay 550ms)
 * 7. Action buttons and custom children (delay 600ms)
 * 8. Optional right-side column (delay 300ms)
 */
export function PageHero({
  breadcrumbs,
  eyebrow,
  title,
  titleLines,
  subtitle,
  intro,
  statutoryNote,
  actions,
  rightContent,
  children,
  className = "",
}: PageHeroProps) {
  const hasTwoColumns = Boolean(rightContent);

  return (
    <section className={`py-12 md:py-20 border-b border-line ${className}`}>
      <Container>
        {/* 1. Breadcrumbs Fade */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Reveal delay={50} className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </Reveal>
        )}

        <div className={hasTwoColumns ? "grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" : "max-w-4xl"}>
          {/* Main / Left Column */}
          <div className={hasTwoColumns ? "lg:col-span-7" : ""}>
            {/* 2. Eyebrow with DrawLine */}
            {eyebrow && (
              <div className="flex items-center gap-3 mb-4">
                <DrawLine delay={150} color="accent" height="h-[2px]" width="w-8" />
                <Reveal delay={200} as="span" className="text-label text-accent-text font-semibold uppercase tracking-[0.18em]">
                  {eyebrow}
                </Reveal>
              </div>
            )}

            {/* 3. H1 Masked Reveal */}
            <MaskHeading
              as="h1"
              lines={titleLines}
              delay={250}
              className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground font-normal mb-4 leading-tight tracking-normal"
            >
              {title}
            </MaskHeading>

            {/* 4. Subtitle Fade */}
            {subtitle && (
              <Reveal delay={350} as="p" className="font-sans text-sm sm:text-base text-secondary uppercase tracking-widest font-semibold mb-6">
                {subtitle}
              </Reveal>
            )}

            {/* 5. Intro Paragraphs Fade */}
            {intro && (
              <Reveal delay={450} className="text-secondary text-base sm:text-lg leading-relaxed mb-6 max-w-3xl">
                {intro}
              </Reveal>
            )}

            {/* 6. Statutory Notice / Advisory Card */}
            {statutoryNote && (
              <Reveal delay={550} className="mb-8">
                {statutoryNote}
              </Reveal>
            )}

            {/* 7. Action Buttons */}
            {actions && (
              <Reveal delay={600} className="flex flex-wrap items-center gap-4 mb-6">
                {actions}
              </Reveal>
            )}

            {/* Additional Custom Children */}
            {children && (
              <Reveal delay={650}>
                {children}
              </Reveal>
            )}
          </div>

          {/* Right Column (e.g., Portrait Frame, Chamber Info Card) */}
          {hasTwoColumns && (
            <div className="lg:col-span-5">
              <Reveal delay={300} distance={16}>
                {rightContent}
              </Reveal>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
