"use client";

import React, { useState, useRef, useId } from "react";

export interface AccordionItemData {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  className = "",
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([]);
  const baseId = useId();
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const total = items.length;
    let nextIndex = index;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        nextIndex = (index + 1) % total;
        triggerRefs.current[nextIndex]?.focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        nextIndex = (index - 1 + total) % total;
        triggerRefs.current[nextIndex]?.focus();
        break;
      case "Home":
        e.preventDefault();
        triggerRefs.current[0]?.focus();
        break;
      case "End":
        e.preventDefault();
        triggerRefs.current[total - 1]?.focus();
        break;
      default:
        break;
    }
  };

  return (
    <div className={`divide-y divide-line border-y border-line ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIds.includes(item.id);
        const headerId = `${baseId}-header-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;

        return (
          <div key={item.id} className="group">
            <h3>
              <button
                ref={(el) => {
                  triggerRefs.current[index] = el;
                }}
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                type="button"
                onClick={() => toggleItem(item.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-full py-4 sm:py-5 min-h-[48px] text-left flex items-center justify-between gap-4 text-foreground hover:text-accent-text transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-foreground"
              >
                <span className="font-display text-lg sm:text-xl font-medium">
                  {item.question}
                </span>

                {/* Plus icon rotates vertical line into minus (300ms transition) */}
                <span
                  className={`shrink-0 w-6 h-6 flex items-center justify-center border rounded-[2px] transition-colors duration-300 ${
                    isOpen ? "border-accent text-accent-text" : "border-line text-secondary"
                  }`}
                  aria-hidden="true"
                >
                  <svg
                    className="w-3.5 h-3.5 stroke-current"
                    viewBox="0 0 16 16"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <line x1="2" y1="8" x2="14" y2="8" />
                    <line
                      x1="8"
                      y1="2"
                      x2="8"
                      y2="14"
                      className={`transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] origin-center ${
                        isOpen ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
                      }`}
                    />
                  </svg>
                </span>
              </button>
            </h3>

            {/* Height & Opacity 300ms transition via CSS Grid rows (0 layout shift) */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0 pointer-events-none"
              }`}
            >
              <div className="overflow-hidden">
                <div className="pb-5 pt-1 text-secondary text-sm sm:text-base leading-relaxed">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
