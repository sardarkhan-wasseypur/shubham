import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { defaultMetadata } from "@/content/seo";
import { JsonLd } from "@/components/JsonLd";
import { RevealController } from "@/components/RevealController";
import { ScrollToTop } from "@/components/ScrollToTop";
import { getPersonSchema, getWebSiteSchema } from "@/lib/jsonLd";

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = defaultMetadata;

const initScript = `
(function() {
  try {
    document.documentElement.classList.remove('no-js');
    document.documentElement.classList.add('js');
    try { localStorage.removeItem('theme'); } catch (e) {}
    var stored = localStorage.getItem('theme-v2');
    var theme = stored === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`no-js ${bebasNeue.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
        <JsonLd data={getPersonSchema()} />
        <JsonLd data={getWebSiteSchema()} />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ScrollToTop />
        <RevealController />
        {children}
      </body>
    </html>
  );
}
