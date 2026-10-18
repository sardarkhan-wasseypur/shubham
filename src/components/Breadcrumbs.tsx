import React from "react";
import Link from "next/link";
import { siteUrl } from "@/content/seo";
import { JsonLd } from "./JsonLd";
import { getBreadcrumbSchema } from "@/lib/jsonLd";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  emitJsonLd?: boolean;
}

/**
 * Editorial Breadcrumbs component
 * Features hairline styling, accessible navigation, and automatic JSON-LD BreadcrumbList structured data.
 */
export function Breadcrumbs({
  items,
  className = "",
  emitJsonLd = true,
}: BreadcrumbsProps) {
  // Always include Home as first crumb if not already provided
  const allItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    ...items.filter((item) => item.href !== "/"),
  ];

  const schemaItems = allItems.map((item) => ({
    name: item.label,
    url: `${siteUrl}${item.href || ""}`,
  }));

  const jsonLdData = emitJsonLd ? getBreadcrumbSchema(schemaItems) : null;

  return (
    <>
      {jsonLdData && <JsonLd data={jsonLdData} />}
      <nav aria-label="Breadcrumb" className={`mb-6 sm:mb-8 ${className}`}>
        <ol className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-secondary">
          {allItems.map((item, idx) => {
            const isLast = idx === allItems.length - 1;

            return (
              <li key={idx} className="flex items-center gap-2">
                {idx > 0 && (
                  <span className="text-line select-none" aria-hidden="true">
                    /
                  </span>
                )}
                {isLast || !item.href ? (
                  <span
                    className="text-foreground font-semibold"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-accent-text transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
