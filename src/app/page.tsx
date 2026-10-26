import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Header,
  Hero,
  Footer,
  Container,
  SectionLabel,
  NumberedRow,
  AppointmentList,
  Accordion,
  BandSection,
  Button,
  MobileActionBar,
  RevealSection,
  MaskedHeading,
  Reveal,
  JsonLd,
  ContactForm,
} from "@/components";
import { practiceAreas } from "@/content/practiceAreas";
import { courts } from "@/content/courts";
import { getHomepageGalleryItems } from "@/content/gallery";
import { HomepageGallery } from "@/components/gallery/HomepageGallery";
import { principles } from "@/content/principles";
import { faqs } from "@/content/faqs";
import { profile } from "@/content/profile";
import { constructMetadata } from "@/lib/metadata";
import { getFaqPageSchema } from "@/lib/jsonLd";

export const metadata: Metadata = constructMetadata({
  title: "Advocate Shubham Singh | Legal Counsel",
  description:
    "Informational resource for Advocate Shubham Singh, legal counsel practicing before Supreme Court of India, Delhi High Court & District Courts.",
  pathname: "/",
});

export default function HomePage() {
  const faqSchema = getFaqPageSchema(faqs);
  const homepagePhotos = getHomepageGalleryItems();
  const isPhotoVerified = Boolean(profile.photo.verified && profile.photo.value);

  return (
    <>
      {faqSchema && <JsonLd data={faqSchema} />}
      <Header />
      <main id="main-content" className="min-h-screen bg-background text-foreground">
        {/* SECTION 01: HERO */}
        <Hero />

        {/* SECTION 02: EDITORIAL PRACTICE STATEMENT & MOBILE PORTRAIT */}
        <RevealSection as="div">
          <BandSection className="border-b border-line">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-baseline">
              <div className="lg:col-span-4">
                <SectionLabel number="01" label="CHAMBER OVERVIEW" />
              </div>
              <div className="lg:col-span-8">
                <MaskedHeading
                  as="h2"
                  className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground font-normal leading-tight mb-6"
                >
                  A practice built on preparation, clarity and careful drafting.
                </MaskedHeading>

                {/* Mobile Advocate Portrait with Left Red Accent Bar matching Stitch Section 01 */}
                {isPhotoVerified && (
                  <div className="relative w-full max-w-[360px] mx-auto aspect-[3/4] sm:aspect-[4/5] mb-6 overflow-hidden border-l-2 border-accent bg-surface md:hidden shadow-sm rounded-[1px]">
                    <Image
                      src={profile.photo.value!}
                      alt="Advocate Shubham Singh in court robes"
                      fill
                      loading="lazy"
                      quality={90}
                      sizes="(max-width: 767px) 360px, 1px"
                      className="object-cover object-[center_12%] contrast-[1.05]"
                    />
                  </div>
                )}

                <div className="space-y-4 text-secondary text-sm sm:text-base leading-relaxed max-w-3xl">
                  <p>
                    Advocate Shubham Singh maintains an active litigation practice anchored across Delhi courts and specialized regulatory tribunals. The chamber prioritizes trial readiness, robust statutory construction, and procedural accuracy across multifaceted civil and criminal proceedings.
                  </p>
                  <p>
                    With an emphasis on structured drafting and plain-language advisory, representation is tailored to deliver dependable, timely, and objective counsel for individuals, public sector undertakings, and corporate bodies alike.
                  </p>
                </div>

                <div className="mt-6 pt-2">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-semibold text-foreground hover:text-accent-text transition-colors"
                  >
                    <span>Read the chamber overview</span>
                    <span className="text-accent text-base">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </BandSection>
        </RevealSection>

        {/* SECTION 03: PRACTICE AREAS (Full-width rows with 56px minimum height) */}
        <RevealSection className="py-12 sm:py-16 md:py-24 border-b border-line">
          <Container>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 pb-4 sm:pb-6 border-b border-line">
              <div>
                <SectionLabel number="02" label="PRACTICE AREAS" className="mb-2 sm:mb-3" />
                <MaskedHeading
                  as="h2"
                  className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground"
                >
                  Core Jurisdictions
                </MaskedHeading>
              </div>
              <p className="text-secondary text-xs sm:text-base max-w-md">
                Structured legal representation across distinct civil, trial, and regulatory fields.
              </p>
            </div>

            <div className="border-t border-b border-line">
              {practiceAreas.map((area, idx) => (
                <Reveal key={area.slug} staggerIndex={idx}>
                  <NumberedRow
                    index={idx + 1}
                    title={area.title.value || ""}
                    subtitle={area.shortDescription.value}
                    tag={area.relevantForums.value?.[0]}
                    href={`/${area.slug}`}
                  />
                </Reveal>
              ))}
            </div>

            <div className="mt-8 sm:mt-10 flex justify-end">
              <Button variant="text-arrow" href="/practice-areas">
                View All Practice Jurisdictions
              </Button>
            </div>
          </Container>
        </RevealSection>

        {/* SECTION 04: APPOINTMENTS & EMPANELMENTS (Current and Former groups) */}
        <RevealSection className="py-12 sm:py-16 md:py-24 border-b border-line bg-surface/40">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
              <div className="lg:col-span-5">
                <SectionLabel number="03" label="APPOINTMENTS" className="mb-2 sm:mb-3" />
                <MaskedHeading
                  as="h2"
                  className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4 sm:mb-6"
                >
                  Institutional Panels
                </MaskedHeading>
                <p className="text-secondary text-sm sm:text-base leading-relaxed mb-6">
                  Official representation as Panel Counsel for government instrumentalities and public corporations before judicial tribunals and appellate benches.
                </p>
                <Button variant="outline" href="/professional-experience">
                  Review Complete Appointments
                </Button>
              </div>

              <div className="lg:col-span-7">
                <AppointmentList showGrouped={true} />
              </div>
            </div>
          </Container>
        </RevealSection>

        {/* SECTION 05: COURTS & TRIBUNALS (Stacked list on mobile, grid on desktop) */}
        <RevealSection className="py-12 sm:py-16 md:py-24 border-b border-line">
          <Container>
            <div className="mb-8 sm:mb-12 pb-4 sm:pb-6 border-b border-line flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <SectionLabel number="04" label="COURTS & TRIBUNALS" className="mb-2 sm:mb-3" />
                <MaskedHeading
                  as="h2"
                  className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground"
                >
                  Where I Practise
                </MaskedHeading>
              </div>
              <p className="text-secondary text-xs sm:text-base max-w-md">
                Regular litigation appearances across apex, high court, and district trial venues.
              </p>
            </div>

            {/* Mobile Stacked List matching Stitch */}
            <div className="md:hidden divide-y divide-line border-y border-line">
              {courts.map((court, idx) => {
                const tag =
                  court.type === "apex"
                    ? "APEX →"
                    : court.type === "high-court"
                      ? "HIGH COURT →"
                      : court.type === "subordinate"
                        ? "TRIAL →"
                        : "TRIBUNAL →";

                return (
                  <Reveal
                    key={court.id}
                    staggerIndex={idx}
                    className="py-4 min-h-[56px] flex items-center justify-between gap-3"
                  >
                    <div>
                      <h3 className="font-display text-xl text-foreground">
                        {court.name}
                      </h3>
                      <span className="text-[11px] text-secondary font-sans block mt-0.5">
                        {court.jurisdiction}
                      </span>
                    </div>
                    <span className="text-xs uppercase font-mono text-accent-text tracking-wider shrink-0 font-medium">
                      {tag}
                    </span>
                  </Reveal>
                );
              })}
            </div>

            {/* Desktop 4-Card Grid */}
            <div className="hidden md:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {courts.map((court, idx) => (
                <Reveal
                  key={court.id}
                  staggerIndex={idx}
                  className="border border-line bg-surface p-6 sm:p-8 flex flex-col justify-between rounded-[2px] transition-colors duration-250 hover:border-foreground/40 group"
                >
                  <div>
                    <span className="font-mono text-xs text-accent-text font-semibold block mb-3">
                      0{idx + 1}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl text-foreground font-medium mb-3 group-hover:text-accent-text transition-colors duration-200">
                      {court.name}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-secondary leading-relaxed mt-4 pt-4 border-t border-line/60">
                    {court.jurisdiction}
                  </p>
                </Reveal>
              ))}
            </div>
          </Container>
        </RevealSection>

        {/* SECTION: HOMEPAGE GALLERY (Moments from practice and events) */}
        {homepagePhotos.length >= 3 && <HomepageGallery photos={homepagePhotos} />}

        {/* SECTION 06: ADVOCACY PRINCIPLES (Single column on mobile) */}
        <RevealSection className="py-12 sm:py-16 md:py-24 border-b border-line bg-surface/30">
          <Container>
            <div className="mb-8 sm:mb-12 pb-4 sm:pb-6 border-b border-line">
              <SectionLabel number="05" label="WORKING PRINCIPLES" className="mb-2 sm:mb-3" />
              <MaskedHeading
                as="h2"
                className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground"
              >
                Standards of Chamber Practice
              </MaskedHeading>
            </div>

            {/* Mobile Single Column with large red numbers matching Stitch */}
            <div className="md:hidden space-y-6">
              {principles.map((principle, idx) => (
                <Reveal key={principle.id} staggerIndex={idx} className="flex items-start gap-4">
                  <span className="font-hero text-3xl text-accent leading-none shrink-0 pt-0.5">
                    0{idx + 1}
                  </span>
                  <div>
                    <h4 className="font-display text-xl text-foreground">
                      {principle.title}
                    </h4>
                    <p className="text-xs text-secondary mt-1 leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {principles.map((principle, idx) => (
                <Reveal
                  key={principle.id}
                  staggerIndex={idx}
                  className="border border-line bg-surface p-6 sm:p-8 rounded-[2px] transition-colors duration-250 hover:border-foreground/40"
                >
                  <h3 className="font-display text-xl text-foreground font-medium mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed mb-4">
                    {principle.description}
                  </p>
                  {principle.citation && (
                    <span className="text-[11px] font-mono text-accent-text uppercase block pt-3 border-t border-line/60">
                      {principle.citation}
                    </span>
                  )}
                </Reveal>
              ))}
            </div>
          </Container>
        </RevealSection>

        {/* SECTION 07: LEGAL INSIGHTS (Stacked rows matching Stitch) */}
        <RevealSection className="py-12 sm:py-16 md:py-24 border-b border-line">
          <Container>
            <div className="mb-8 pb-4 border-b border-line flex items-center justify-between">
              <div>
                <SectionLabel number="06" label="LEGAL INSIGHTS" className="mb-2" />
                <MaskedHeading
                  as="h2"
                  className="font-display text-3xl sm:text-4xl text-foreground"
                >
                  Notes &amp; Analysis
                </MaskedHeading>
              </div>
            </div>

            <div className="divide-y divide-line border-t border-b border-line">
              <Reveal staggerIndex={0}>
                <article className="py-4 min-h-[56px] flex flex-col justify-between hover:bg-surface/60 transition-colors">
                  <span className="text-[10px] font-mono uppercase text-secondary tracking-wider">
                    NEGOTIABLE INSTRUMENTS
                  </span>
                  <h3 className="font-display text-lg sm:text-xl text-foreground mt-0.5">
                    Understanding Cheque Bounce Proceedings under Section 138
                  </h3>
                  <div className="flex items-center justify-between mt-2 text-xs text-secondary">
                    <span>Practice Advisory</span>
                    <Link
                      href="/cheque-bounce-lawyer-delhi"
                      className="text-accent-text font-medium hover:underline inline-flex items-center gap-1"
                    >
                      <span>Read Note</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>
                </article>
              </Reveal>

              <Reveal staggerIndex={1}>
                <article className="py-4 min-h-[56px] flex flex-col justify-between hover:bg-surface/60 transition-colors">
                  <span className="text-[10px] font-mono uppercase text-secondary tracking-wider">
                    FAMILY &amp; MATRIMONIAL
                  </span>
                  <h3 className="font-display text-lg sm:text-xl text-foreground mt-0.5">
                    Procedural Overview of Mutual Consent Divorce under Hindu Marriage Act
                  </h3>
                  <div className="flex items-center justify-between mt-2 text-xs text-secondary">
                    <span>Practice Advisory</span>
                    <Link
                      href="/matrimonial-lawyer-delhi"
                      className="text-accent-text font-medium hover:underline inline-flex items-center gap-1"
                    >
                      <span>Read Note</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>
                </article>
              </Reveal>

              <Reveal staggerIndex={2}>
                <article className="py-4 min-h-[56px] flex flex-col justify-between hover:bg-surface/60 transition-colors">
                  <span className="text-[10px] font-mono uppercase text-secondary tracking-wider">
                    INTELLECTUAL PROPERTY
                  </span>
                  <h3 className="font-display text-lg sm:text-xl text-foreground mt-0.5">
                    Trademark Registration and Preliminary Protection Strategies
                  </h3>
                  <div className="flex items-center justify-between mt-2 text-xs text-secondary">
                    <span>Practice Advisory</span>
                    <Link
                      href="/trademark-lawyer-delhi"
                      className="text-accent-text font-medium hover:underline inline-flex items-center gap-1"
                    >
                      <span>Read Note</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>
                </article>
              </Reveal>
            </div>

            <div className="mt-6">
              <Link
                href="/legal-insights"
                className="text-xs uppercase tracking-[0.16em] font-semibold text-secondary hover:text-foreground inline-flex items-center gap-1.5"
              >
                <span>View all legal briefs</span>
                <span className="text-accent">&rarr;</span>
              </Link>
            </div>
          </Container>
        </RevealSection>

        {/* SECTION 08: FAQS (Accordion with 48px touch targets) */}
        <RevealSection className="py-12 sm:py-16 md:py-24 border-b border-line bg-surface/30">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
              <div className="lg:col-span-5">
                <SectionLabel number="07" label="FAQ" className="mb-2 sm:mb-3" />
                <MaskedHeading
                  as="h2"
                  className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4 sm:mb-6"
                >
                  Frequently Asked Questions
                </MaskedHeading>
                <p className="text-secondary text-sm sm:text-base leading-relaxed mb-6">
                  Common procedural and administrative queries regarding consultation protocol, court appearances, and professional guidelines.
                </p>
                <div className="border border-line p-4 rounded-[2px] bg-surface">
                  <span className="text-label text-accent-text block mb-1">
                    Regulatory Notice
                  </span>
                  <p className="text-xs text-secondary leading-relaxed">
                    Under BCI guidelines, preliminary inquiries do not constitute legal advice or establish a client relationship.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7">
                <Accordion items={faqs} />
              </div>
            </div>
          </Container>
        </RevealSection>

        {/* SECTION 09: CHAMBER CONSULTATION & CONTACT FORM (matching Stitch) */}
        <RevealSection className="py-12 sm:py-16 md:py-24 bg-surface border-b border-line" id="contact">
          <Container>
            <div className="max-w-2xl mx-auto">
              <SectionLabel label="CHAMBER CONSULTATION" className="mb-2" />
              <MaskedHeading
                as="h2"
                className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground font-normal mb-2"
              >
                Discuss Your Legal Requirements
              </MaskedHeading>
              <p className="text-xs sm:text-sm text-secondary leading-normal mb-8">
                Please provide preliminary information regarding your matter to arrange a formal chamber appointment.
              </p>

              <ContactForm />

              {/* Chamber Direct Channels Box */}
              <div className="mt-10 pt-6 border-t border-line space-y-3">
                <h3 className="font-display text-xl text-foreground mb-2">
                  Direct Chamber Contact
                </h3>
                <div className="flex justify-between items-center text-xs py-1.5 border-b border-line/40">
                  <span className="text-secondary uppercase font-mono tracking-wider">Phone</span>
                  <span className="text-foreground/80 font-mono">
                    {profile.phone.verified && profile.phone.value ? profile.phone.value : "By Appointment"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs py-1.5 border-b border-line/40">
                  <span className="text-secondary uppercase font-mono tracking-wider">WhatsApp</span>
                  <span className="text-foreground/80 font-mono">
                    {profile.whatsApp.verified && profile.whatsApp.value ? profile.whatsApp.value : "By Appointment"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs py-1.5 border-b border-line/40">
                  <span className="text-secondary uppercase font-mono tracking-wider">Email</span>
                  <span className="text-foreground/80 font-mono">
                    Consultation Intake Only
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs py-1.5">
                  <span className="text-secondary uppercase font-mono tracking-wider">Office</span>
                  <span className="text-foreground/80 font-mono">Delhi, India</span>
                </div>
              </div>
            </div>
          </Container>
        </RevealSection>
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
