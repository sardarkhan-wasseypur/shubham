import { Metadata } from "next";
import Link from "next/link";
import {
  Header,
  Footer,
  Container,
  SectionLabel,
  BandSection,
  Button,
  MobileActionBar,
  PageHero,
  Reveal,
  MaskHeading,
} from "@/components";
import { practiceAreas } from "@/content/practiceAreas";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Legal Practice Areas in Delhi | Advocate Shubham Singh",
  description:
    "Overview of core litigation disciplines before Delhi courts including criminal defence, civil litigation, matrimonial, trademark, and NI Act matters.",
  pathname: "/practice-areas",
});

export default function PracticeAreasPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-background text-foreground pt-28 sm:pt-32">
        {/* HEADER / INTRO */}
        <PageHero
          breadcrumbs={[{ label: "Practice Areas" }]}
          eyebrow="Litigation Disciplines"
          title="Practice Areas & Judicial Representation"
          intro={
            <>
              <p className="mb-4">
                Advocate Shubham Singh represents clients across civil, criminal, commercial, and matrimonial disputes before the Supreme Court of India, the High Court of Delhi, District Courts, and specialized statutory tribunals.
              </p>
              <p>
                Below is an informational overview of active practice disciplines, relevant statutory frameworks, and judicial forums. In adherence to Bar Council of India rules, this summary provides procedural information without making superlative claims or outcome guarantees.
              </p>
            </>
          }
        />

        {/* PRACTICE AREAS DIRECTORY */}
        <section className="py-16 md:py-24 border-b border-line">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {practiceAreas.map((area, index) => {
                const areaNumber = String(index + 1).padStart(2, "0");
                const href = `/${area.slug}`;

                return (
                  <Reveal
                    key={area.slug}
                    as="article"
                    staggerIndex={index}
                    className="border border-line bg-surface/50 p-6 sm:p-8 flex flex-col justify-between hover:border-foreground/40 transition-colors"
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-center justify-between pb-4 mb-6 border-b border-line">
                        <span className="font-display text-2xl text-accent-text">
                          /{areaNumber}
                        </span>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-secondary">
                          Delhi Jurisdiction
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <h2 className="font-display text-2xl sm:text-3xl text-foreground font-medium mb-2">
                        <Link
                          href={href}
                          className="hover:text-accent-text transition-colors"
                        >
                          {area.title.value}
                        </Link>
                      </h2>

                      {area.subtitle?.value && (
                        <p className="text-xs font-mono text-accent-text uppercase tracking-wider mb-4">
                          {area.subtitle.value}
                        </p>
                      )}

                      {/* Description */}
                      <p className="text-secondary text-sm leading-relaxed mb-6">
                        {area.shortDescription.value}
                      </p>

                      {/* Who it helps highlights */}
                      {area.whoItHelps?.value && area.whoItHelps.value.length > 0 && (
                        <div className="mb-6">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground block mb-2">
                            Key Areas of Application
                          </span>
                          <ul className="space-y-1.5">
                            {area.whoItHelps.value.slice(0, 2).map((item, i) => (
                              <li
                                key={i}
                                className="text-xs text-secondary flex items-start gap-2"
                              >
                                <span className="text-accent-text font-bold text-sm leading-none">
                                  &bull;
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Relevant Forums */}
                      {area.relevantForums?.value && area.relevantForums.value.length > 0 && (
                        <div className="mb-6 pt-4 border-t border-line/60">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary block mb-2">
                            Primary Forums
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {area.relevantForums.value.map((forum, fi) => (
                              <span
                                key={fi}
                                className="text-[11px] bg-background border border-line text-secondary px-2.5 py-1 rounded-[2px]"
                              >
                                {forum}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom CTA Button */}
                    <div className="pt-4 border-t border-line mt-4 flex items-center justify-between">
                      <Button variant="outline" href={href} className="w-full text-center justify-center">
                        View Practice Details &amp; FAQs &rarr;
                      </Button>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </section>

        {/* STATUTORY JURISDICTION BANNER */}
        <BandSection className="border-b border-line bg-surface/30">
          <Reveal className="max-w-3xl">
            <SectionLabel number="02" label="REGULATORY COMPLIANCE" className="mb-2" />
            <MaskHeading as="h2" className="font-display text-2xl sm:text-3xl text-foreground mb-4">
              Procedural Scope &amp; Legal Ethics
            </MaskHeading>
            <p className="text-secondary text-sm sm:text-base leading-relaxed mb-4">
              Under the Advocates Act, 1961 and the Bar Council of India Rules, advocates in India are prohibited from soliciting clients or claiming expertise in comparative terms. The practice summaries provided on this website are exclusively intended to facilitate informed decision-making by prospective clients seeking lawful representation before Indian courts.
            </p>
            <p className="text-xs text-secondary/80 font-mono">
              For specific legal advice concerning your dispute or matter, schedule an in-person or virtual consultation with the chamber.
            </p>
          </Reveal>
        </BandSection>

        {/* CONSULTATION CTA */}
        <section className="py-16 md:py-24 bg-surface border-b border-line text-center">
          <Container>
            <Reveal className="max-w-xl mx-auto">
              <MaskHeading as="h2" className="font-display text-3xl sm:text-4xl text-foreground mb-4">
                Arrange a Chamber Consultation
              </MaskHeading>
              <p className="text-secondary text-sm sm:text-base mb-8 leading-relaxed">
                Matters are taken up following initial conflict-of-interest review and formal scheduling.
              </p>
              <Button variant="solid-red" href="/contact">
                Submit Consultation Request
              </Button>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
