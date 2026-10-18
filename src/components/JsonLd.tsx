import React from "react";

interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>> | null | undefined;
}

/**
 * Safe JSON-LD script component with XSS escaping
 */
export function JsonLd({ data }: JsonLdProps) {
  if (!data) return null;

  // Sanitize to prevent script injection in JSON-LD
  const sanitizedJson = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: sanitizedJson }}
    />
  );
}
