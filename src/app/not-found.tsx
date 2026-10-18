import type { Metadata } from "next";
import {
  Header,
  Footer,
  Container,
  Button,
  MobileActionBar,
  MaskHeading,
  Reveal,
  DrawLine,
} from "@/components";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Advocate Shubham Singh",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-background text-foreground pt-28 sm:pt-32 flex flex-col justify-center">
        <section className="py-16 md:py-24 border-b border-line">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <DrawLine delay={100} color="accent" height="h-[2px]" width="w-8" />
                <Reveal delay={150} as="span" className="text-label text-accent-text font-semibold uppercase tracking-[0.2em]">
                  Error 404 &bull; Docket Not Found
                </Reveal>
                <DrawLine delay={100} color="accent" height="h-[2px]" width="w-8" />
              </div>

              <MaskHeading
                as="h1"
                delay={200}
                className="font-display text-7xl sm:text-9xl text-foreground font-normal tracking-tight mb-4"
              >
                404
              </MaskHeading>

              <Reveal delay={300} as="h2" className="font-display text-2xl sm:text-3xl text-foreground font-medium mb-4">
                The Requested Page Does Not Exist
              </Reveal>

              <Reveal delay={400} as="p" className="font-sans text-secondary text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
                The URL or judicial docket you requested could not be located on this server. The page may have been relocated or updated in accordance with chamber publications.
              </Reveal>

              <Reveal delay={500} className="flex flex-wrap items-center justify-center gap-4">
                <Button variant="solid-red" href="/">
                  Return to Homepage
                </Button>
                <Button variant="outline" href="/practice-areas">
                  Explore Practice Areas
                </Button>
                <Button variant="outline" href="/contact">
                  Chamber Contact
                </Button>
              </Reveal>

              <Reveal delay={600} className="pt-8 border-t border-line/60 mt-10">
                <p className="text-xs text-secondary font-mono">
                  Advocate Shubham Singh &bull; New Delhi, India
                </p>
              </Reveal>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
