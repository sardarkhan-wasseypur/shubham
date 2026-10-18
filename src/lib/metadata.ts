import type { Metadata } from "next";
import { siteUrl, siteName } from "@/content/seo";

export interface ConstructMetadataOptions {
  title: string; // Target: <= 60 characters
  description: string; // Target: <= 155 characters
  pathname: string; // e.g. "/cheque-bounce-lawyer-delhi"
  noIndex?: boolean;
}

/**
 * Standardized SEO metadata constructor
 * Enforces strict limits: title <= 60 chars, description <= 155 chars, canonical URLs,
 * OpenGraph, Twitter card, and BCI-compliant wording.
 */
export function constructMetadata({
  title,
  description,
  pathname,
  noIndex = false,
}: ConstructMetadataOptions): Metadata {
  const cleanPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const canonicalUrl = `${siteUrl}${cleanPath === "/" ? "" : cleanPath}`;
  const ogImageUrl = `${siteUrl}/opengraph-image`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: canonicalUrl,
      siteName,
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "Advocate Shubham Singh | Legal Counsel, Delhi",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}
