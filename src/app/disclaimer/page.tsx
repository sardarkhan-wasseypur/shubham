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
import { profile } from "@/content/profile";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Legal Disclaimer & BCI Rule 36 | Advocate Shubham Singh",
  description:
    "Statutory disclaimer under Bar Council of India Rule 36. Informational notice on non-solicitation and absence of an advocate-client relationship.",
  pathname: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-background text-foreground pt-28 sm:pt-32">
        {/* HEADER */}
        <PageHero
          breadcrumbs={[{ label: "Disclaimer" }]}
          eyebrow="Bar Council of India • Statutory Notice"
          title="Legal Disclaimer & Compliance Statement"
          intro={
            <p>
              As per the rules of the Bar Council of India, advocates are prohibited from soliciting work or advertising in any manner. By accessing and using this website, you acknowledge and confirm that you are seeking information of your own accord and volition.
            </p>
          }
          statutoryNote={
            <div className="p-5 border border-line bg-surface/60 rounded-[2px] max-w-3xl">
              <span className="text-xs font-mono text-accent-text uppercase tracking-wider block mb-2 font-semibold">
                Rule 36, Part VI, Chapter II — Bar Council of India Rules:
              </span>
              <p className="text-xs sm:text-sm text-foreground/90 italic leading-relaxed">
                &ldquo;An advocate shall not solicit work or advertise, either directly or indirectly, whether by circulars, advertisements, touts, personal communications, interviews not warranted by personal relations, furnishing or inspiring newspaper comments or producing his photograph to be published in connection with cases in which he has been engaged or concerned.&rdquo;
              </p>
            </div>
          }
        />

        {/* ACKNOWLEDGMENT STATEMENTS */}
        <section className="py-16 md:py-24 border-b border-line">
          <Container>
            <div className="max-w-4xl space-y-10 text-secondary text-sm sm:text-base leading-relaxed">
              <Reveal>
                <SectionLabel number="01" label="TERMS OF ACCESS" className="mb-2" />
                <MaskHeading as="h2" className="font-display text-2xl sm:text-3xl text-foreground font-medium mb-3">
                  Voluntary User Inquiries
                </MaskHeading>
                <p>
                  By proceeding to browse and navigate this website, the user acknowledges that:
                </p>
                <ul className="list-disc pl-6 space-y-2.5 mt-3">
                  <li>
                    There has been no advertisement, personal communication, solicitation, invitation, or inducement of any sort whatsoever from Advocate {profile.name.value} or his chamber associates to solicit any work through this website.
                  </li>
                  <li>
                    The user wishes to gain information about the chamber and practice areas for their own informational and educational reference.
                  </li>
                  <li>
                    The information provided under this website is made available solely at the specific request of the user for general reference purposes.
                  </li>
                </ul>
              </Reveal>

              <Reveal className="pt-8 border-t border-line">
                <SectionLabel number="02" label="NO LEGAL ADVICE" className="mb-2" />
                <MaskHeading as="h2" className="font-display text-2xl sm:text-3xl text-foreground font-medium mb-3">
                  No Advocate-Client Relationship
                </MaskHeading>
                <p className="mb-3">
                  The material and commentary provided on this website do not constitute legal advice and cannot substitute for independent legal counsel tailored to the specific facts of any case.
                </p>
                <ul className="list-disc pl-6 space-y-2.5">
                  <li>
                    Accessing this site or transmitting inquiries through the consultation desk does not constitute or create an advocate-client relationship between Advocate {profile.name.value} and the recipient or sender.
                  </li>
                  <li>
                    Formal legal representation commences exclusively upon mutual execution of a Vakalatnama, formal memorandum of engagement, and clearance of conflicts of interest.
                  </li>
                </ul>
              </Reveal>

              <Reveal className="pt-8 border-t border-line">
                <SectionLabel number="03" label="LIMITATION OF LIABILITY" className="mb-2" />
                <MaskHeading as="h2" className="font-display text-2xl sm:text-3xl text-foreground font-medium mb-3">
                  Limitation of Liability &amp; Statutory Changes
                </MaskHeading>
                <p className="mb-3">
                  Indian substantive and procedural law evolves continuously through legislative amendments (such as the Bharatiya Nyaya Sanhita, Bharatiya Nagarik Suraksha Sanhita, and Bharatiya Sakshya Adhiniyam) and judicial precedents of the Supreme Court and High Courts.
                </p>
                <p>
                  Advocate {profile.name.value} is not liable for any consequence of any action taken by the user relying on material or information provided on this website. For any specific legal issue or dispute, you must seek independent legal counsel before competent judicial forums.
                </p>
              </Reveal>

              <Reveal className="pt-8 border-t border-line">
                <SectionLabel number="04" label="NO OUTCOME GUARANTEES" className="mb-2" />
                <MaskHeading as="h2" className="font-display text-2xl sm:text-3xl text-foreground font-medium mb-3">
                  Prohibition on Outcome Guarantees
                </MaskHeading>
                <p>
                  Litigation outcomes depend upon facts, documentary evidence, judicial discretion, and substantive statutory interpretation. In strict conformity with professional ethics, Advocate {profile.name.value} makes no representations, guarantees, or prognostications regarding judicial outcomes in any pending or contemplated legal proceedings.
                </p>
              </Reveal>

              {/* ACTION CONFIRMATION BOX */}
              <Reveal className="pt-8 border-t border-line">
                <div className="border border-line bg-surface p-6 sm:p-8 rounded-[2px] flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="font-display text-xl text-foreground font-medium mb-1">
                      User Acknowledgment
                    </h3>
                    <p className="text-xs text-secondary max-w-md">
                      If you accept and acknowledge these statutory terms, you may explore the chamber&apos;s practice areas and institutional appointments.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                    <Button variant="solid-red" href="/">
                      I Acknowledge &bull; Proceed to Home
                    </Button>
                    <Button variant="outline" href="/practice-areas">
                      Practice Areas
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* FOOTER CTA */}
        <BandSection className="border-b border-line bg-surface/30">
          <Reveal className="max-w-3xl">
            <h2 className="font-display text-xl sm:text-2xl text-foreground mb-2">
              Chamber Consultation Guidelines
            </h2>
            <p className="text-xs sm:text-sm text-secondary leading-relaxed">
              If you are facing active legal proceedings or have been served with court process, consult with legal counsel without delay to protect applicable statutory limitation periods and filing timelines.
            </p>
            <div className="mt-4">
              <Link
                href="/contact"
                className="text-accent-text text-xs uppercase font-semibold tracking-wider hover:underline"
              >
                Chamber Consultation Desk &rarr;
              </Link>
            </div>
          </Reveal>
        </BandSection>
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
