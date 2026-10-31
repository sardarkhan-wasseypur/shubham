import type { NextConfig } from "next";
import { DEV_TEST_STICKY_BAR, profile } from "./src/content/profile";

// PRODUCTION SAFETY GATE: Fail build immediately if test flag is active or fake numbers are verified
if (process.env.NODE_ENV === "production") {
  if (DEV_TEST_STICKY_BAR) {
    throw new Error(
      "FATAL PRODUCTION BUILD FAILURE: DEV_TEST_STICKY_BAR is set to true in src/content/profile.ts. Simulated contact numbers cannot be shipped to production."
    );
  }
  if (
    profile.phone.verified &&
    profile.phone.value &&
    (profile.phone.value.includes("99999") || profile.phone.value.toLowerCase().includes("fake"))
  ) {
    throw new Error(
      "FATAL PRODUCTION BUILD FAILURE: Fake phone number detected with verified: true."
    );
  }
  if (
    profile.whatsApp.verified &&
    profile.whatsApp.value &&
    (profile.whatsApp.value.includes("99999") || profile.whatsApp.value.toLowerCase().includes("fake"))
  ) {
    throw new Error(
      "FATAL PRODUCTION BUILD FAILURE: Fake WhatsApp number detected with verified: true."
    );
  }
}

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80, 90],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
