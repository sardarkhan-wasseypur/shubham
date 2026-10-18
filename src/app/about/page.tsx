import { Metadata } from "next";
import {
  Header,
  Footer,
  Container,
  SectionLabel,
  PortraitFrame,
  AppointmentList,
  BandSection,
  Button,
  MobileActionBar,
  PageHero,
  Reveal,
  MaskHeading,
} from "@/components";
import { profile } from "@/content/profile";
import { courts } from "@/content/courts";
import { principles } from "@/content/principles";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "About Advocate Shubham Singh | Legal Counsel, Delhi",
  description:
    "Professional profile of Advocate Shubham Singh, legal counsel representing clients before the Supreme Court, Delhi High Court, and Delhi District Courts.",
  pathname: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-background text-foreground pt-28 sm:pt-32">
        {/* HERO / CHAMBER PROFILE */}
        <PageHero
          breadcrumbs={[{ label: "About" }]}
          eyebrow="Advocate • Bar Profile"
          title={`Advocate ${profile.name.value}`}
          subtitle={`${profile.designation.value} • ${profile.jurisdiction.value}`}
          intro={
            <>
              <p className="mb-4">
                Advocate Shubham Singh maintains an active litigation and legal advisory practice in New Delhi, appearing before the Supreme Court of India, the High Court of Delhi, District Courts, and specialized statutory tribunals.
              </p>
              <p>
                The chamber emphasizes thorough factual briefing, statutory research, and adherence to procedural rules under civil, criminal, and commercial law. In compliance with Bar Council of India guidelines, all client representation proceeds upon voluntary inquiry and formal engagement.
              </p>
            </>
          }
          actions={
            <>
              <Button variant="solid-red" href="/contact">
                Request Consultation
              </Button>
              <Button variant="outline" href="/professional-experience">
                Appointments Record
              </Button>
            </>
          }
          rightContent={
            <div className="max-w-md mx-auto lg:mx-0 w-full">
              <PortraitFrame priority />
            </div>
          }
        />

        {/* PROFESSIONAL STANDING & CREDENTIALS */}
        <section className="py-10 md:py-14 border-b border-line bg-surface/30">
          <Container>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Reveal delay={100} className="border border-line bg-background p-6 rounded-[2px]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent-text block mb-2 font-semibold">
                  OFFICE / PRACTICE
                </span>
                <h3 className="font-display text-xl text-foreground font-medium mb-1">
                  Law Office of Shubham Singh
                </h3>
                <p className="text-xs text-secondary">
                  Connaught Place, New Delhi &bull; Litigation &amp; Advisory
                </p>
              </Reveal>

              <Reveal delay={150} className="border border-line bg-background p-6 rounded-[2px]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent-text block mb-2 font-semibold">
                  QUALIFICATION
                </span>
                <h3 className="font-display text-xl text-foreground font-medium mb-1">
                  LL.M.
                </h3>
                <p className="text-xs text-secondary">
                  Gautam Buddha University
                </p>
              </Reveal>

              <Reveal delay={200} className="border border-line bg-background p-6 rounded-[2px]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent-text block mb-2 font-semibold">
                  BAR ENROLMENT
                </span>
                <h3 className="font-display text-xl text-foreground font-medium mb-1">
                  Bar Council of Delhi
                </h3>
                <p className="text-xs text-secondary">
                  Advocate Standing &bull; Delhi Bar
                </p>
              </Reveal>

              <Reveal delay={250} className="border border-line bg-background p-6 rounded-[2px]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent-text block mb-2 font-semibold">
                  CLIENT REPRESENTATION
                </span>
                <h3 className="font-display text-xl text-foreground font-medium mb-1">
                  Diverse Briefs
                </h3>
                <p className="text-xs text-secondary">
                  Advising Individuals, Companies &amp; Commercial Entities
                </p>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* VERIFIED JUDICIAL FORUMS */}
        <BandSection className="border-b border-line">
          <div className="mb-8">
            <SectionLabel number="01" label="COURTS & TRIBUNALS" className="mb-2" />
            <MaskHeading as="h2" className="font-display text-2xl sm:text-3xl text-foreground">
              Forums of Appearance
            </MaskHeading>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courts.map((court, index) => (
              <Reveal
                key={court.id}
                staggerIndex={index}
                className="border border-line bg-background p-6 rounded-[2px]"
              >
                <h3 className="font-display text-lg text-foreground font-medium mb-2">
                  {court.name}
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  {court.jurisdiction}
                </p>
              </Reveal>
            ))}
          </div>
        </BandSection>

        {/* VERIFIED PUBLIC APPOINTMENTS */}
        <section className="py-16 md:py-24 border-b border-line">
          <Container>
            <div className="max-w-4xl mx-auto">
              <Reveal className="mb-10 text-center">
                <SectionLabel number="02" label="APPOINTMENTS" className="mb-2 justify-center" />
                <MaskHeading as="h2" className="font-display text-3xl sm:text-4xl text-foreground">
                  Government &amp; Institutional Panels
                </MaskHeading>
                <p className="text-secondary text-sm sm:text-base mt-2">
                  Official representation as Panel Counsel before appellate and statutory forums.
                </p>
              </Reveal>

              <Reveal delay={150}>
                <AppointmentList />
              </Reveal>
            </div>
          </Container>
        </section>

        {/* CORE ADVOCACY PRINCIPLES */}
        <section className="py-16 md:py-24 border-b border-line bg-surface/30">
          <Container>
            <div className="max-w-4xl mx-auto">
              <Reveal className="mb-10 text-center">
                <SectionLabel number="03" label="ETHICAL STANDARDS" className="mb-2 justify-center" />
                <MaskHeading as="h2" className="font-display text-3xl sm:text-4xl text-foreground">
                  Professional Principles
                </MaskHeading>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {principles.map((p, index) => (
                  <Reveal
                    key={p.id}
                    staggerIndex={index}
                    className="border border-line bg-surface p-6 sm:p-8 rounded-[2px]"
                  >
                    <h3 className="font-display text-xl text-foreground font-medium mb-3">
                      {p.title}
                    </h3>
                    <p className="text-secondary text-sm leading-relaxed mb-3">
                      {p.description}
                    </p>
                    {p.citation && (
                      <span className="text-[11px] font-mono text-accent-text uppercase block pt-2 border-t border-line/60">
                        {p.citation}
                      </span>
                    )}
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* CONTACT CTA */}
        <section className="py-16 md:py-24 bg-surface border-b border-line text-center">
          <Container>
            <Reveal className="max-w-xl mx-auto">
              <MaskHeading as="h2" className="font-display text-3xl sm:text-4xl text-foreground mb-4">
                Schedule a Consultation
              </MaskHeading>
              <p className="text-secondary text-sm sm:text-base mb-8 leading-relaxed">
                To arrange a preliminary consultation subject to conflict clearance, submit your inquiry online.
              </p>
              <Button variant="solid-red" href="/contact">
                Contact the Chamber
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
