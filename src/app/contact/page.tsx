import { Metadata } from "next";
import {
  Header,
  Footer,
  Container,
  SectionLabel,
  BandSection,
  ContactForm,
  MobileActionBar,
  Breadcrumbs,
  Reveal,
  MaskHeading,
  DrawLine,
  ChamberAddressCard,
} from "@/components";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Chamber Contact & Consultation | Advocate Shubham Singh",
  description:
    "Submit a legal inquiry or schedule a consultation with the chamber of Advocate Shubham Singh in Delhi. Conflict checks precede all client engagements.",
  pathname: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-background text-foreground pt-28 sm:pt-32">
        {/* HEADER / INTRO */}
        <section className="py-12 md:py-20 border-b border-line">
          <Container>
            <Reveal delay={50} className="mb-6">
              <Breadcrumbs items={[{ label: "Contact" }]} />
            </Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Chamber Information */}
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-4">
                  <DrawLine delay={150} color="accent" height="h-[2px]" width="w-8" />
                  <Reveal delay={200} as="span" className="text-label text-accent-text font-semibold uppercase tracking-[0.18em]">
                    Chamber Inquiry
                  </Reveal>
                </div>

                <MaskHeading
                  as="h1"
                  delay={250}
                  className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground font-normal mb-6"
                >
                  Contact &amp; Consultation Request
                </MaskHeading>

                <Reveal delay={350} as="p" className="font-sans text-secondary text-base leading-relaxed mb-6">
                  Advocate Shubham Singh represents clients before the Supreme Court of India, Delhi High Court, and statutory tribunals. Chamber consultations are conducted strictly by prior appointment following preliminary conflict clearance.
                </Reveal>

                {/* Verified Chamber Address & Contact Details */}
                <Reveal delay={450} className="mb-8">
                  <ChamberAddressCard />
                </Reveal>

                {/* BCI Notice */}
                <Reveal delay={550} className="p-4 border-l-2 border-accent bg-surface/30 text-xs text-secondary leading-relaxed">
                  <span className="font-semibold text-foreground block mb-1">
                    Bar Council of India Rule 36:
                  </span>
                  In compliance with Bar Council of India guidelines prohibiting advertisement or client solicitation, communication via this form is initiated on your own volition and does not constitute retention of legal counsel.
                </Reveal>
              </div>

              {/* Right Column: Interactive Consultation Intake Form */}
              <div className="lg:col-span-7">
                <Reveal delay={250} distance={16}>
                  <ContactForm />
                </Reveal>
              </div>
            </div>
          </Container>
        </section>

        {/* 3-STEP CONSULTATION PROCEDURE */}
        <BandSection className="border-b border-line bg-surface/30">
          <Reveal className="mb-10 text-center max-w-2xl mx-auto">
            <SectionLabel number="01" label="PROTOCOL" className="mb-2 justify-center" />
            <MaskHeading as="h2" className="font-display text-3xl sm:text-4xl text-foreground">
              Chamber Consultation Procedure
            </MaskHeading>
            <p className="text-secondary text-sm mt-2">
              Standard professional steps observed prior to accepting any brief or court representation.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: "01/",
                title: "Conflict Clearance",
                desc: "Before evaluating facts, opposing parties and institutional panels are cross-checked to ensure complete ethical independence and absence of conflict.",
              },
              {
                num: "02/",
                title: "Documentary Assessment",
                desc: "Initial perusal of impugned orders, legal notices, or charge-sheets to identify jurisdictional forum and applicable statutory limitation periods.",
              },
              {
                num: "03/",
                title: "Conference & Vakalatnama",
                desc: "A formal chamber or video briefing is scheduled. Formal representation commences upon mutual execution of a Vakalatnama and terms of engagement.",
              },
            ].map((step, idx) => (
              <Reveal
                key={idx}
                staggerIndex={idx}
                className="border border-line bg-background p-6 rounded-[2px]"
              >
                <span className="font-display text-2xl text-accent-text block mb-2">{step.num}</span>
                <h3 className="font-display text-xl text-foreground font-medium mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  {step.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </BandSection>
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
