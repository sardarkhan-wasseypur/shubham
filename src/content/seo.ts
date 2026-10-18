import type { Metadata } from "next";
import { SEODefaults } from "./types";

export const siteUrl: string =
  process.env.NEXT_PUBLIC_SITE_URL || "https://shubhamsinghadvocate.com";

export const siteName: string = "Advocate Shubham Singh";

export const seoDefaults: SEODefaults = {
  siteName,
  siteUrl,
  title: "Advocate Shubham Singh | Legal Counsel, Delhi",
  description:
    "Informational resource for Advocate Shubham Singh, legal practitioner appearing before the Supreme Court of India, Delhi High Court, and District Courts in Delhi NCR.",
  locale: "en_IN",
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seoDefaults.title,
    template: `%s | ${siteName}`,
  },
  description: seoDefaults.description,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: seoDefaults.locale,
    url: siteUrl,
    siteName,
    title: seoDefaults.title,
    description: seoDefaults.description,
  },
  twitter: {
    card: "summary_large_image",
    title: seoDefaults.title,
    description: seoDefaults.description,
  },
};
