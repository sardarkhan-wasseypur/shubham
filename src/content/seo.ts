import type { Metadata } from "next";
import { SEODefaults } from "./types";

export const siteUrl: string =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.shubhamsinghadvocate.com";

export const siteName: string = "Advocate Shubham Singh";

export const seoDefaults: SEODefaults = {
  siteName,
  siteUrl,
  title: "Advocate Shubham Singh | Legal Counsel",
  description:
    "Informational resource for Advocate Shubham Singh, legal practitioner appearing before the Supreme Court of India, Delhi High Court, and District Courts in Delhi NCR.",
  locale: "en_IN",
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  verification: {
    google:
      process.env.GOOGLE_SITE_VERIFICATION ||
      "aJmjqKGgWBM3l7VeA5Yb6ecT9D8vPIifdrCCB3Mrdbo",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "48x48" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  title: {
    default: seoDefaults.title,
    template: `%s | Advocate Shubham Singh`,
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
