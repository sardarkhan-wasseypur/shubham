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
                  <span className="material-symbols-outlined text-3xl">photo_library</span>
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
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
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
