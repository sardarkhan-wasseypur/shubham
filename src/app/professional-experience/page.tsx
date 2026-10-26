import { Metadata } from "next";
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
  JsonLd,
} from "@/components";
import { currentAppointments, formerAppointments } from "@/content/appointments";
import { courts } from "@/content/courts";
import { profile } from "@/content/profile";
import { constructMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema } from "@/lib/jsonLd";
import { siteUrl } from "@/content/seo";

export const metadata: Metadata = constructMetadata({
  title: "Professional Standing & Empanelments | Shubham Singh",
  description:
    "Verified record of public panel counsel appointments including Union of India, State of Uttar Pradesh, and DMRC alongside institutional tenures.",
  pathname: "/professional-experience",
});

export default function ProfessionalExperiencePage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Professional Experience", url: `${siteUrl}/professional-experience` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <Header />
      <main id="main-content" className="min-h-screen bg-background text-foreground pt-28 sm:pt-32">
        {/* HEADER / INTRO */}
        <PageHero
          breadcrumbs={[{ label: "Professional Experience" }]}
          eyebrow="Empanelments • Record of Standing"
          title="Professional Experience & Institutional Appointments"
          intro={
            <>
              <p className="mb-4">
                Advocate {profile.name.value} maintains an institutional and dispute-resolution docket across national and state judicial forums. In strict conformity with Bar Council of India standards, this page provides a factual record of current and former institutional empanelments.
              </p>
              <p>
                Current and past appointments are delineated below. These entries represent verified institutional standing and do not imply exclusive representation or endorsement by public authorities.
              </p>
            </>
          }
        />

        {/* SECTION 1: CURRENT APPOINTMENTS */}
        <section className="py-16 md:py-24 border-b border-line">
          <Container>
            <Reveal className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                <span className="text-label text-accent-text font-semibold uppercase tracking-[0.18em]">
                  Active Panel Standing
                </span>
              </div>
              <MaskHeading as="h2" className="font-display text-3xl sm:text-4xl text-foreground">
                Current Government &amp; Institutional Appointments
              </MaskHeading>
              <p className="text-secondary text-sm sm:text-base mt-2 max-w-2xl">
                Active empanelment representing sovereign and statutory bodies before high courts, district courts, and statutory tribunals.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentAppointments.map((appt, idx) => (
                <Reveal
                  key={appt.id}
                  staggerIndex={idx}
                  className="border-2 border-accent/40 bg-surface/80 p-6 sm:p-8 rounded-[2px] flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 bg-accent text-on-accent text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1">
                    CURRENT
                  </div>

                  <div>
                    <span className="text-xs font-mono text-accent-text uppercase tracking-wider block mb-2">
                      {appt.role.value}
                    </span>
                    <h3 className="font-display text-2xl text-foreground font-medium mb-3">
                      {appt.organization.value}
                    </h3>
                  </div>

                  <div className="pt-4 border-t border-line/60 mt-6 flex items-center justify-between text-xs text-secondary">
                    <span>Status: Verified Active</span>
                    <span className="text-accent-text font-semibold">&bull; Panel Counsel</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* SECTION 2: FORMER APPOINTMENTS */}
        <section className="py-16 md:py-24 border-b border-line bg-surface/30">
          <Container>
            <Reveal className="mb-10">
              <SectionLabel number="02" label="PAST ENGAGEMENTS" className="mb-2" />
              <MaskHeading as="h2" className="font-display text-3xl sm:text-4xl text-foreground">
                Former Institutional &amp; Advisory Appointments
              </MaskHeading>
              <p className="text-secondary text-sm sm:text-base mt-2 max-w-2xl">
                Concluded tenures of legal advisorship and institutional panel standing. Displayed strictly for factual historical record.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
              {formerAppointments.map((appt, idx) => (
                <Reveal
                  key={appt.id}
                  staggerIndex={idx}
                  className="border border-line bg-background p-6 sm:p-8 rounded-[2px] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono text-secondary uppercase tracking-wider">
                        {appt.role.value}
                      </span>
                      <span className="border border-line text-secondary text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-[2px]">
                        FORMER
                      </span>
                    </div>
                    <h3 className="font-display text-2xl text-foreground font-medium mb-2">
                      {appt.organization.value}
                    </h3>
                  </div>

                  <div className="pt-4 border-t border-line/60 mt-6 text-xs text-secondary">
                    <span>Tenure Concluded &bull; Factual Record</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* SECTION 3: COURTS OF REGULAR APPEARANCE */}
        <BandSection className="border-b border-line">
          <Reveal className="mb-10">
            <SectionLabel number="03" label="JURISDICTION" className="mb-2" />
            <MaskHeading as="h2" className="font-display text-3xl sm:text-4xl text-foreground">
              Forums of Judicial Practice
            </MaskHeading>
            <p className="text-secondary text-sm sm:text-base mt-2 max-w-2xl">
              Regular appearances representing individuals, corporate entities, and state instrumentalities before civil, criminal, and appellate benches.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courts.map((court, idx) => (
              <Reveal
                key={court.id}
                staggerIndex={idx}
                className="border border-line bg-background p-6 rounded-[2px]"
              >
                <span className="text-accent-text font-mono text-xs block mb-1">
                  Court / Tribunal
                </span>
                <h3 className="font-display text-xl text-foreground font-medium mb-2">
                  {court.name}
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  {court.jurisdiction}
                </p>
              </Reveal>
            ))}
          </div>
        </BandSection>

        {/* SECTION 4: STATUTORY DISCLOSURE */}
        <section className="py-12 md:py-16 border-b border-line bg-surface/50">
          <Container>
            <Reveal className="max-w-3xl">
              <h3 className="font-display text-lg text-foreground uppercase tracking-wider mb-2">
                Bar Council of India Rule 36 Disclosure
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                The particulars published above regarding institutional panel counsels and government representation are disclosed solely in compliance with Rule 36, Section IV (Standards of Professional Conduct and Etiquette) of the Bar Council of India Rules. These statements do not constitute testimonials, solicitation, or claims of superiority over other legal practitioners.
              </p>
            </Reveal>
          </Container>
        </section>

        {/* CONTACT CTA */}
        <section className="py-16 md:py-24 bg-surface border-b border-line text-center">
          <Container>
            <Reveal className="max-w-xl mx-auto">
              <MaskHeading as="h2" className="font-display text-3xl sm:text-4xl text-foreground mb-4">
                Inquire Concerning Matter Representation
              </MaskHeading>
              <p className="text-secondary text-sm sm:text-base mb-8 leading-relaxed">
                For formal representation before Delhi courts or statutory panels, contact the chamber to conduct a conflict check.
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
