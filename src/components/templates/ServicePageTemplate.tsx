import React from "react";
import Link from "next/link";
import {
  Header,
  Footer,
  Container,
  SectionLabel,
  Button,
  Accordion,
  BandSection,
  MobileActionBar,
  PageHero,
  Reveal,
  MaskHeading,
  JsonLd,
} from "@/components";
import { PracticeArea } from "@/content/types";
import { practiceAreas } from "@/content/practiceAreas";
import { getFaqPageSchema } from "@/lib/jsonLd";

interface ServicePageTemplateProps {
  area: PracticeArea;
}

export function ServicePageTemplate({ area }: ServicePageTemplateProps) {
  const title = area.title.value || "Practice Area";
  const subtitle = area.subtitle?.value;
  const intro = area.intro.value;
  const legalNote = area.legalNote?.value;
  const whoItHelps = area.whoItHelps.value || [];
  const whenItApplies = area.whenItApplies.value || [];
  const processSteps = area.processSteps.value || [];
  const relevantForums = area.relevantForums.value || [];
  const rawFaqs = area.faqs.value || [];
  const faqs = rawFaqs.map((faq, idx) => ({
    id: `faq-${idx}`,
    question: faq.question,
    answer: faq.answer,
  }));
  const disclaimer = area.disclaimer.value;

  // Filter other practice areas for the related-services block
  const otherAreas = practiceAreas.filter((p) => p.slug !== area.slug);

  // Schema for visible FAQs on this service page
  const faqSchema = rawFaqs.length > 0 ? getFaqPageSchema(rawFaqs) : null;

  return (
    <>
      {faqSchema && <JsonLd data={faqSchema} />}
      <Header />
      <main id="main-content" className="min-h-screen bg-background text-foreground pt-28 sm:pt-32">
        {/* BANNER / HERO */}
        <PageHero
          breadcrumbs={[
            { label: "Practice Areas", href: "/practice-areas" },
            { label: title },
          ]}
          eyebrow="Practice Jurisdiction • Delhi NCR"
          title={title}
          subtitle={subtitle}
          intro={intro}
          statutoryNote={
            legalNote ? (
              <div className="border border-line bg-surface p-5 sm:p-6 rounded-[2px] border-l-4 border-l-accent">
                <span className="text-label text-accent-text block font-semibold uppercase mb-2">
                  Statutory Notice &amp; Limitation Advisory
                </span>
                <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                  {legalNote}
                </p>
              </div>
            ) : undefined
          }
          actions={
            <>
              <Button variant="solid-red" href="/contact">
                Consultation on {title}
              </Button>
              <Button variant="outline" href="/practice-areas">
                All Practice Areas
              </Button>
            </>
          }
        />

        {/* WHO IT HELPS & WHEN IT APPLIES */}
        <section className="py-16 md:py-24 border-b border-line bg-surface/30">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Who It Helps */}
              <Reveal>
                <SectionLabel number="01" label="APPLICABILITY" className="mb-4" />
                <MaskHeading as="h2" className="font-display text-2xl sm:text-3xl text-foreground mb-6">
                  Who This Practice Helps
                </MaskHeading>
                <ul className="space-y-4">
                  {whoItHelps.map((point, idx) => (
                    <Reveal
                      as="li"
                      key={idx}
                      staggerIndex={idx}
                      className="flex items-start gap-3 text-secondary text-base leading-relaxed"
                    >
                      <span className="text-accent-text font-mono shrink-0 mt-0.5">&bull;</span>
                      <span>{point}</span>
                    </Reveal>
                  ))}
                </ul>
              </Reveal>

              {/* When It Applies */}
              <Reveal delay={150}>
                <SectionLabel number="02" label="CIRCUMSTANCES" className="mb-4" />
                <MaskHeading as="h2" className="font-display text-2xl sm:text-3xl text-foreground mb-6">
                  When This Applies
                </MaskHeading>
                <ul className="space-y-4">
                  {whenItApplies.map((point, idx) => (
                    <Reveal
                      as="li"
                      key={idx}
                      staggerIndex={idx}
                      className="flex items-start gap-3 text-secondary text-base leading-relaxed"
                    >
                      <span className="text-accent-text font-mono shrink-0 mt-0.5">&bull;</span>
                      <span>{point}</span>
                    </Reveal>
                  ))}
                </ul>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* HOW THE PROCESS GENERALLY WORKS */}
        {processSteps.length > 0 && (
          <section className="py-16 md:py-24 border-b border-line">
            <Container>
              <Reveal className="mb-12 pb-6 border-b border-line">
                <SectionLabel number="03" label="PROCEDURAL STAGES" className="mb-3" />
                <MaskHeading as="h2" className="font-display text-3xl sm:text-4xl text-foreground">
                  How the Process Generally Works
                </MaskHeading>
                <p className="text-secondary text-base max-w-2xl mt-2">
                  Standard procedural trajectory observed under Indian statutory timelines. Specific steps may vary by court and factual merits.
                </p>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {processSteps.map((step, idx) => (
                  <Reveal
                    key={step.step}
                    staggerIndex={idx}
                    className="border border-line bg-surface p-6 rounded-[2px] flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-mono text-xs font-semibold text-accent-text block mb-3">
                        STAGE 0{step.step}
                      </span>
                      <h3 className="font-display text-lg sm:text-xl text-foreground font-medium mb-3">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* FORUMS WHERE MATTERS ARE HEARD */}
        {relevantForums.length > 0 && (
          <BandSection className="border-b border-line">
            <div className="mb-8">
              <SectionLabel number="04" label="JURISDICTION" className="mb-3" />
              <MaskHeading as="h2" className="font-display text-2xl sm:text-3xl text-foreground">
                Forums Where Matters Are Heard
              </MaskHeading>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relevantForums.map((forum, idx) => (
                <Reveal
                  key={idx}
                  staggerIndex={idx}
                  className="border border-line bg-background p-6 rounded-[2px]"
                >
                  <span className="text-xs font-mono text-accent-text font-semibold block mb-2">
                    FORUM 0{idx + 1}
                  </span>
                  <p className="font-display text-lg text-foreground font-medium">
                    {forum}
                  </p>
                </Reveal>
              ))}
            </div>
          </BandSection>
        )}

        {/* FAQS */}
        {faqs.length > 0 && (
          <section className="py-16 md:py-24 border-b border-line">
            <Container>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <Reveal className="lg:col-span-5">
                  <SectionLabel number="05" label="INQUIRIES" className="mb-3" />
                  <MaskHeading as="h2" className="font-display text-3xl sm:text-4xl text-foreground mb-4">
                    Frequently Asked Questions
                  </MaskHeading>
                  <p className="text-secondary text-sm sm:text-base leading-relaxed">
                    General procedural clarifications relating to {title.toLowerCase()}. For case-specific queries, consult the advocate.
                  </p>
                </Reveal>
                <div className="lg:col-span-7">
                  <Accordion items={faqs} />
                </div>
              </div>
            </Container>
          </section>
        )}

        {/* RELATED PRACTICE AREAS BLOCK */}
        <section className="py-16 md:py-24 border-b border-line bg-surface/20">
          <Container>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-line">
              <Reveal>
                <SectionLabel number="06" label="OTHER DISCIPLINES" className="mb-2" />
                <MaskHeading as="h2" className="font-display text-3xl sm:text-4xl text-foreground">
                  Related Practice Jurisdictions
                </MaskHeading>
                <p className="text-secondary text-sm sm:text-base mt-2">
                  Additional litigation and advisory disciplines handled before courts in Delhi NCR.
                </p>
              </Reveal>
              <Link
                href="/practice-areas"
                className="text-xs uppercase tracking-[0.14em] font-semibold text-accent-text hover:underline"
              >
                All 6 Practice Areas &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherAreas.slice(0, 3).map((rel, idx) => (
                <Reveal
                  key={rel.slug}
                  staggerIndex={idx}
                  className="border border-line bg-background p-6 rounded-[2px] flex flex-col justify-between transition-colors duration-250 hover:border-foreground/30"
                >
                  <div>
                    <span className="text-[11px] font-mono text-accent-text uppercase tracking-wider block mb-2">
                      Delhi NCR Practice
                    </span>
                    <h3 className="font-display text-xl text-foreground font-medium mb-2">
                      <Link
                        href={`/${rel.slug}`}
                        className="hover:text-accent-text transition-colors"
                      >
                        {rel.title.value}
                      </Link>
                    </h3>
                    <p className="text-xs text-secondary leading-relaxed line-clamp-3 mb-4">
                      {rel.shortDescription.value}
                    </p>
                  </div>
                  <Link
                    href={`/${rel.slug}`}
                    className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5 pt-4 border-t border-line/60 hover:text-accent-text transition-colors"
                  >
                    <span>View Procedural Overview</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* RELATED INSIGHTS & INTERNAL CROSS-LINKS */}
        <section className="py-16 md:py-20 border-b border-line bg-surface/30">
          <Container>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <Reveal>
                <SectionLabel number="07" label="PUBLICATIONS" className="mb-2" />
                <MaskHeading as="h2" className="font-display text-2xl sm:text-3xl text-foreground">
                  Related Legal Insights
                </MaskHeading>
              </Reveal>
              <Link
                href="/legal-insights"
                className="text-xs uppercase tracking-[0.14em] font-semibold text-accent-text hover:underline"
              >
                View Legal Notes &rarr;
              </Link>
            </div>
            <Reveal className="border border-line bg-surface p-8 rounded-[2px] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-foreground font-medium text-base mb-1">
                  Procedural Commentary Docket
                </p>
                <p className="text-secondary text-sm leading-relaxed">
                  The chamber prepares procedural briefing notes and statutory overviews relating to {title.toLowerCase()} and judicial developments in Delhi courts.
                </p>
              </div>
              <Button variant="outline" href="/legal-insights">
                Read Insights
              </Button>
            </Reveal>
          </Container>
        </section>

        {/* CONTACT CTA */}
        <section className="py-20 md:py-28 bg-surface border-b border-line">
          <Container>
            <Reveal className="max-w-2xl mx-auto text-center">
              <SectionLabel label="ENGAGEMENT" className="mb-4 justify-center" />
              <MaskHeading as="h2" className="font-display text-3xl sm:text-4xl text-foreground mb-4">
                Discuss a Matter in {title}
              </MaskHeading>
              <p className="text-secondary text-sm sm:text-base leading-relaxed mb-8">
                Consultations are arranged on prior appointment subject to conflict clearance. Submit your query to schedule an intake discussion.
              </p>
              <Button variant="solid-red" href="/contact">
                Initiate Consultation
              </Button>
            </Reveal>
          </Container>
        </section>

        {/* STATUTORY DISCLAIMER */}
        {disclaimer && (
          <section className="py-8 bg-background border-b border-line">
            <Container>
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-xs text-secondary/80 leading-relaxed italic">
                  {disclaimer}
                </p>
              </div>
            </Container>
          </section>
        )}
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
