"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { GalleryItem } from "@/content/gallery";
import { Lightbox } from "@/components/gallery/Lightbox";

interface HomepageGalleryProps {
  photos: GalleryItem[];
}

export function HomepageGallery({ photos }: HomepageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const photoCount = photos?.length || 0;

  // Handle scroll progress and active slide index in carousel
  const handleScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el || photoCount < 3) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll > 0) {
      const progress = Math.max(0, Math.min(1, scrollLeft / maxScroll));
      setScrollProgress(progress);

      // Calculate active index based on child slide width
      const slide = el.firstElementChild as HTMLElement | null;
      if (slide) {
        const slideWidth = slide.offsetWidth + 12; // width + gap
        const index = Math.round(scrollLeft / slideWidth);
        setActiveIndex(Math.max(0, Math.min(photoCount - 1, index)));
      }
    }
  }, [photoCount]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    el.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollPrev = () => {
    const el = carouselRef.current;
    if (!el) return;
    const slide = el.firstElementChild as HTMLElement | null;
    const slideWidth = slide ? slide.offsetWidth + 12 : 300;
    el.scrollBy({ left: -slideWidth, behavior: "smooth" });
  };

  const scrollNext = () => {
    const el = carouselRef.current;
    if (!el) return;
    const slide = el.firstElementChild as HTMLElement | null;
    const slideWidth = slide ? slide.offsetWidth + 12 : 300;
    el.scrollBy({ left: slideWidth, behavior: "smooth" });
  };

  // Keyboard arrow keys for carousel
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollNext();
    }
  };

  // Require at least 3 photos - render nothing if fewer
  if (!photos || photoCount < 3) {
    return null;
  }

  // Grid layout class determination for desktop
  const count = photoCount;
  const getDesktopColSpan = (idx: number) => {
    if (idx === 0) return "col-span-6 row-span-2";
    if (count === 3) return "col-span-6 row-span-1";
    if (count === 4) {
      if (idx === 1) return "col-span-3 row-span-1";
      if (idx === 2) return "col-span-3 row-span-1";
      return "col-span-6 row-span-1";
    }
    // count >= 5
    return "col-span-3 row-span-1";
  };

  const minBarPercent = 100 / count;
  const progressPercent = Math.max(
    minBarPercent,
    Math.min(100, Math.round(minBarPercent + scrollProgress * (100 - minBarPercent)))
  );

  return (
    <section id="moments" className="py-12 sm:py-16 md:py-24 border-b border-line bg-background text-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12 pb-4 sm:pb-6 border-b border-line flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <span className="w-5 sm:w-8 h-[2px] bg-accent shrink-0" aria-hidden="true" />
              <span className="text-label text-accent-text font-semibold uppercase tracking-[0.18em] text-[11px] sm:text-xs">
                05 &mdash; Moments
              </span>
            </div>
            <div className="overflow-hidden">
              <h2 className="font-['Cormorant_Garamond',var(--font-cormorant),var(--font-bodoni),serif] text-3xl sm:text-4xl md:text-5xl text-foreground font-normal animate-f3-reveal">
                Moments from practice and events
              </h2>
            </div>
            <p className="text-secondary text-sm sm:text-base max-w-2xl mt-3 leading-relaxed">
              Moments from professional appearances, chamber consultations, and institutional forums.
            </p>
          </div>
          <Link
            href="/gallery/"
            className="group hidden md:inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent-text hover:text-foreground transition-colors shrink-0"
          >
            <span>View full gallery</span>
            <span className="font-mono text-sm group-hover:translate-x-1 transition-transform" aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {/* 1. DESKTOP (1024px+): Editorial Mosaic (12 Columns, Fixed Height Rows) */}
        <div className="hidden lg:grid grid-cols-12 gap-4 min-[1440px]:gap-6 grid-rows-[280px_280px] min-[1440px]:grid-rows-[320px_320px] items-stretch">
          {photos.map((photo, idx) => {
            const isLarge = idx === 0;
            const colSpan = getDesktopColSpan(idx);

            return (
              <div
                key={photo.id}
                style={{ animationDelay: `${idx * 100}ms` }}
                className={`relative ${colSpan} animate-f3-reveal`}
              >
                {/* Thin red offset outline behind large tile only */}
                {isLarge && (
                  <div
                    className="absolute -bottom-3 -right-3 inset-0 border border-accent pointer-events-none -z-10 rounded-[2px] animate-draw-outline"
                    aria-hidden="true"
                  />
                )}

                <button
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  aria-label={`View photo in lightbox: ${photo.alt}`}
                  className="group relative w-full h-full block rounded-[2px] overflow-hidden border border-line bg-surface focus-visible:outline-2 focus-visible:outline-accent text-left cursor-pointer min-h-[44px]"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={
                      isLarge
                        ? "(max-width: 639px) 82vw, (max-width: 1023px) 46vw, 50vw"
                        : "25vw"
                    }
                    loading="lazy"
                    placeholder={photo.blurDataURL ? "blur" : "empty"}
                    blurDataURL={photo.blurDataURL}
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [@media(hover:hover)]:group-hover:scale-[1.03]"
                    style={{ objectPosition: photo.focus || "50% 25%" }}
                  />

                  {/* Gradient-free solid caption */}
                  {photo.caption && (
                    <div className="absolute bottom-3 left-3 max-w-[85%] z-10 pointer-events-none">
                      <span className="inline-block bg-white/85 dark:bg-[#0A0A0A]/80 border border-line/40 px-2.5 py-1 rounded-[2px] text-[11px] min-[1440px]:text-[12px] text-foreground font-sans tracking-wide truncate transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [@media(hover:hover)]:group-hover:-translate-y-1.5 shadow-sm">
                        {photo.caption}
                      </span>
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* 2. MOBILE & TABLET (Below 1024px): Swipe Carousel */}
        <div className="block lg:hidden">
          <div
            ref={carouselRef}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Moments and engagements gallery carousel"
            onKeyDown={handleKeyDown}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none px-4 sm:px-6 -mx-4 sm:-mx-6 pb-2 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {photos.map((photo, idx) => (
              <div
                key={photo.id}
                className="w-[82vw] max-w-[420px] sm:w-[46vw] sm:max-w-none aspect-[4/5] snap-start shrink-0 relative"
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  aria-label={`Photo ${idx + 1} of ${photos.length}: ${photo.alt}`}
                  className="group relative w-full h-full block rounded-[2px] overflow-hidden border border-line bg-surface text-left focus-visible:outline-2 focus-visible:outline-accent cursor-pointer min-h-[44px]"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 639px) 82vw, (max-width: 1023px) 46vw, 50vw"
                    loading="lazy"
                    placeholder={photo.blurDataURL ? "blur" : "empty"}
                    blurDataURL={photo.blurDataURL}
                    className="object-cover"
                    style={{ objectPosition: photo.focus || "50% 25%" }}
                  />

                  {/* Gradient-free solid caption */}
                  {photo.caption && (
                    <div className="absolute bottom-3 left-3 max-w-[85%] z-10 pointer-events-none">
                      <span className="inline-block bg-white/85 dark:bg-[#0A0A0A]/80 border border-line/40 px-2.5 py-1 rounded-[2px] text-[11px] text-foreground font-sans tracking-wide truncate shadow-sm">
                        {photo.caption}
                      </span>
                    </div>
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Progress Indicator: Thin 1px Hairline + Red Fill + Counter */}
          <div className="mt-4 flex items-center gap-4">
            <div className="h-[1px] bg-line relative flex-1 overflow-hidden rounded-full">
              <div
                className="absolute top-0 bottom-0 left-0 bg-accent transition-all duration-150"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-mono text-xs text-secondary tracking-widest shrink-0 select-none">
              {activeIndex + 1} / {photos.length}
            </span>
          </div>

          {/* Full-width 48px Outline CTA Button */}
          <Link
            href="/gallery/"
            className="w-full h-12 min-h-[48px] border border-line hover:border-foreground text-foreground text-xs font-semibold uppercase tracking-[0.18em] flex items-center justify-center gap-2 rounded-[2px] transition-colors mt-6"
          >
            <span>View full gallery</span>
            <span className="font-mono text-sm" aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>

      {/* Lightbox Dialog (Limited to Homepage Set) */}
      {lightboxIndex !== null && (
        <Lightbox
          items={photos}
          currentIndex={lightboxIndex}
          isOpen={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(index) => setLightboxIndex(index)}
        />
      )}
    </section>
  );
}
