"use client";

import React, { useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import Image from "next/image";
import { GalleryItem } from "@/content/gallery";

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerReducedMotionSnapshot() {
  return false;
}

export function Lightbox({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot
  );

  const total = items.length;
  const current = items[currentIndex];

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    onNavigate((currentIndex + 1) % total);
  }, [currentIndex, total, onNavigate]);

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    onNavigate((currentIndex - 1 + total) % total);
  }, [currentIndex, total, onNavigate]);

  // Lock body scroll and manage focus trap
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      // Focus close button on open
      const timer = setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          onClose();
          return;
        }

        if (e.key === "ArrowLeft") {
          e.preventDefault();
          handlePrev();
          return;
        }

        if (e.key === "ArrowRight") {
          e.preventDefault();
          handleNext();
          return;
        }

        if (e.key === "Tab" && dialogRef.current) {
          const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );
          if (focusables.length === 0) return;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      // Focus returns to the clicked image trigger
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === "function") {
        previousFocusRef.current.focus();
      }
    }
  }, [isOpen, onClose, handleNext, handlePrev]);

  // Preload the next image
  useEffect(() => {
    if (!isOpen || total <= 1) return;
    const nextIdx = (currentIndex + 1) % total;
    const nextItem = items[nextIdx];
    if (nextItem && typeof window !== "undefined") {
      const img = new window.Image();
      img.src = nextItem.src;
    }
  }, [isOpen, currentIndex, total, items]);

  if (!isOpen || !current) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Minimum swipe threshold 40px, predominantly horizontal
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${currentIndex + 1} of ${total}: ${current.alt}`}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-surface-container-lowest/95 backdrop-blur-md text-on-surface p-4 sm:p-6 select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Bar: Counter & Close Button */}
      <div className="w-full max-w-7xl flex items-center justify-between py-2 border-b border-outline-variant/30">
        <div className="flex items-center gap-3">
          <span className="font-eyebrow text-eyebrow tracking-widest uppercase text-tertiary font-bold">
            {currentIndex + 1} / {total}
          </span>
          {current.category && (
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-[2px] bg-surface-container-high text-on-surface-variant text-[11px] font-eyebrow uppercase tracking-wider">
              {current.category}
            </span>
          )}
        </div>

        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="Close lightbox"
          className="min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-[2px] bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors focus-visible:outline-2 focus-visible:outline-tertiary"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Main Center Area with Navigation Arrows and Image */}
      <div className="relative w-full flex-1 max-w-6xl flex items-center justify-center my-4 overflow-hidden">
        {/* Previous Button */}
        {total > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous photo"
            className="absolute left-2 sm:left-4 z-10 min-w-[44px] min-h-[44px] w-12 h-12 flex items-center justify-center rounded-[2px] bg-surface-container-low/80 hover:bg-surface-container-high text-on-surface backdrop-blur-sm border border-outline-variant/30 transition-colors focus-visible:outline-2 focus-visible:outline-tertiary"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Active Image Container */}
        <div
          className={`relative max-w-full max-h-[72vh] flex items-center justify-center ${
            prefersReducedMotion ? "" : "transition-opacity duration-200"
          }`}
          style={{
            aspectRatio: current.width && current.height ? `${current.width} / ${current.height}` : undefined,
          }}
        >
          <Image
            src={current.src}
            alt={current.alt}
            width={current.width || 1200}
            height={current.height || 800}
            sizes="90vw"
            priority
            placeholder={current.blurDataURL ? "blur" : "empty"}
            blurDataURL={current.blurDataURL}
            className="max-h-[72vh] w-auto h-auto object-contain rounded-[2px] border border-outline-variant/30 shadow-2xl"
          />
        </div>

        {/* Next Button */}
        {total > 1 && (
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next photo"
            className="absolute right-2 sm:right-4 z-10 min-w-[44px] min-h-[44px] w-12 h-12 flex items-center justify-center rounded-[2px] bg-surface-container-low/80 hover:bg-surface-container-high text-on-surface backdrop-blur-sm border border-outline-variant/30 transition-colors focus-visible:outline-2 focus-visible:outline-tertiary"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Bottom Caption & Metadata */}
      <div className="w-full max-w-3xl text-center py-2 border-t border-outline-variant/20">
        <p className="font-body-md text-body-md text-on-surface tracking-wide">
          {current.caption || current.alt}
        </p>
        {current.date && (
          <span className="font-eyebrow text-[11px] text-outline uppercase tracking-widest mt-1 block">
            {current.date}
          </span>
        )}
      </div>
    </div>
  );
}
