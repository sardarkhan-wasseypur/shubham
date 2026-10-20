"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GalleryItem } from "@/content/gallery";
import { Lightbox } from "@/components/gallery/Lightbox";

interface GalleryGridProps {
  items: GalleryItem[];
}

export function GalleryGrid({ items }: GalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Extract distinct categories (ignoring empty/undefined)
  const categories = Array.from(
    new Set(
      items
        .map((item) => item.category?.trim())
        .filter((cat): cat is string => Boolean(cat && cat.length > 0))
    )
  );

  const showFilter = categories.length >= 2;

  const filteredItems = selectedCategory === "all"
    ? items
    : items.filter((item) => item.category?.trim().toLowerCase() === selectedCategory.toLowerCase());

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  return (
    <div className="w-full flex flex-col">
      {/* Category Filter - only rendered if 2+ categories exist */}
      {showFilter && (
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-outline-variant/20">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`font-label-md text-[11px] sm:text-[12px] uppercase tracking-wider px-4 py-2 rounded-[2px] transition-colors ${
              selectedCategory === "all"
                ? "bg-secondary-container text-secondary-fixed border border-secondary/30 shadow-sm"
                : "bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container border border-outline-variant/30"
            }`}
          >
            All Photos ({items.length})
          </button>
          {categories.map((cat) => {
            const count = items.filter(
              (i) => i.category?.trim().toLowerCase() === cat.toLowerCase()
            ).length;
            const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`font-label-md text-[11px] sm:text-[12px] uppercase tracking-wider px-4 py-2 rounded-[2px] transition-colors ${
                  isActive
                    ? "bg-secondary-container text-secondary-fixed border border-secondary/30 shadow-sm"
                    : "bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container border border-outline-variant/30"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Masonry Responsive Grid: 3 columns desktop, 2 columns tablet, 1 column mobile */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
        {filteredItems.map((item, index) => {
          // First row of images gets eager loading (index < 3 for 3-column desktop)
          const isFirstRow = index < 3;

          return (
            <div
              key={item.id}
              className="break-inside-avoid mb-6 animate-f3-reveal"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <button
                type="button"
                onClick={() => handleOpenLightbox(index)}
                aria-label={`View photo in lightbox: ${item.alt}`}
                className="w-full text-left group block rounded-[2px] focus-visible:outline-2 focus-visible:outline-tertiary"
              >
                <div
                  className="relative w-full overflow-hidden rounded-[2px] border border-outline-variant/30 bg-surface-container-low shadow-sm"
                  style={{
                    aspectRatio: item.width && item.height ? `${item.width} / ${item.height}` : undefined,
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width || 1200}
                    height={item.height || 800}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading={isFirstRow ? "eager" : "lazy"}
                    priority={isFirstRow}
                    placeholder={item.blurDataURL ? "blur" : "empty"}
                    blurDataURL={item.blurDataURL}
                    className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-out"
                  />
                  <div className="absolute inset-0 bg-surface-container-lowest/0 group-hover:bg-surface-container-lowest/15 transition-colors pointer-events-none" />
                </div>

                {/* Caption below each image in small tracked text */}
                {item.caption && (
                  <p className="mt-2 font-eyebrow text-[11px] sm:text-[12px] uppercase tracking-wider text-on-surface-variant line-clamp-2">
                    {item.caption}
                  </p>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Lightbox Dialog */}
      {lightboxIndex !== null && (
        <Lightbox
          items={filteredItems}
          currentIndex={lightboxIndex}
          isOpen={lightboxIndex !== null}
          onClose={handleCloseLightbox}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </div>
  );
}
