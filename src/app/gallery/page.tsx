import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/metadata";
import { siteUrl } from "@/content/seo";
import { Header, Footer, PageHero, Container, JsonLd } from "@/components";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { getVerifiedGalleryItems, hasVerifiedGalleryItems } from "@/content/gallery";

export async function generateMetadata(): Promise<Metadata> {
  const hasPhotos = hasVerifiedGalleryItems();

  return constructMetadata({
    title: "Photo Gallery | Advocate Shubham Singh Chambers",
    description:
      "Visual records, moments from court appearances, legal conferences, and institutional events of Advocate Shubham Singh.",
    pathname: "/gallery",
    noIndex: !hasPhotos,
  });
}

export default function GalleryPage() {
  const verifiedItems = getVerifiedGalleryItems();
  const hasPhotos = verifiedItems.length > 0;

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Photo Gallery" },
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Photo Gallery",
        item: `${siteUrl}/gallery`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <Header />
      <main id="main-content" className="min-h-screen bg-background text-foreground">
        <PageHero
          breadcrumbs={breadcrumbs}
          eyebrow="Archives & Engagements"
          title="Photo Gallery"
          intro="Moments from professional engagements and events."
        />

        <section className="py-12 sm:py-16 md:py-20">
          <Container>
            {hasPhotos ? (
              <GalleryGrid items={verifiedItems} />
            ) : (
              <div className="w-full flex flex-col items-center justify-center py-20 px-6 text-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center mb-6 text-accent">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                </div>
                <h2 className="font-display text-2xl uppercase tracking-wide text-foreground mb-3">
                  Gallery coming soon
                </h2>
                <p className="text-secondary max-w-md mb-8 leading-relaxed">
                  Visual records of court appearances, legal conferences, and institutional events are being curated for this archive.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-[2px] bg-accent text-accent-foreground hover:bg-accent/90 text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>Contact Chambers</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            )}
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
