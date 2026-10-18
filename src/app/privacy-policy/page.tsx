import { Metadata } from "next";
import {
  Header,
  Footer,
  Container,
  SectionLabel,
  MobileActionBar,
  PageHero,
  Reveal,
  MaskHeading,
} from "@/components";
import { profile } from "@/content/profile";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy & DPDP Act 2023 | Advocate Shubham Singh",
  description:
    "Privacy policy and data protection practices under the Digital Personal Data Protection Act, 2023 for visitors to Advocate Shubham Singh's website.",
  pathname: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-background text-foreground pt-28 sm:pt-32">
        {/* HEADER */}
        <PageHero
          breadcrumbs={[{ label: "Privacy Policy" }]}
          eyebrow="Statutory Compliance"
          title="Privacy Policy"
          intro={
            <p>
              This Privacy Policy describes the policies and procedures of the chamber of Advocate {profile.name.value} (&quot;we&quot;, &quot;us&quot;, or &quot;the Chamber&quot;) regarding the collection, use, processing, and protection of personal data provided through this informational website.
            </p>
          }
          statutoryNote={
            <div className="p-4 border-l-2 border-accent bg-surface/50 text-xs text-secondary leading-relaxed">
              <span className="font-semibold text-foreground uppercase tracking-wider block mb-1">
                Compliance Notice: DPDP Act, 2023 &bull; Legal Review Flag
              </span>
              This policy is drafted to comply with the provisions of the Digital Personal Data Protection Act, 2023 (India) and the Standards of Professional Conduct and Etiquette under the Bar Council of India Rules. Subject to final review and verification by Advocate Shubham Singh prior to operational launch.
            </div>
          }
        />

        {/* POLICY ARTICLES */}
        <section className="py-16 md:py-24 border-b border-line">
          <Container>
            <div className="max-w-4xl space-y-12 text-secondary text-sm sm:text-base leading-relaxed">
              {/* Section 1 */}
              <Reveal>
                <SectionLabel number="01" label="DATA FIDUCIARY" className="mb-2" />
                <MaskHeading as="h2" className="font-display text-2xl sm:text-3xl text-foreground font-medium mb-3">
                  Identity of the Data Fiduciary
                </MaskHeading>
                <p>
                  For the purposes of the Digital Personal Data Protection Act, 2023 (DPDP Act, 2023), the Data Fiduciary responsible for personal data processed through this website is the Chamber of Advocate {profile.name.value}, operating in New Delhi, India.
                </p>
              </Reveal>

              {/* Section 2 */}
              <Reveal className="pt-8 border-t border-line">
                <SectionLabel number="02" label="DATA COLLECTED" className="mb-2" />
                <MaskHeading as="h2" className="font-display text-2xl sm:text-3xl text-foreground font-medium mb-3">
                  Categories of Personal Data Collected
                </MaskHeading>
                <p className="mb-3">
                  We collect only such personal data as is voluntarily transmitted by you when submitting an inquiry or scheduling a consultation:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong className="text-foreground">Contact Identification:</strong> Full name, email address, and voluntary telephone/mobile contact number.
                  </li>
                  <li>
                    <strong className="text-foreground">Matter Classification:</strong> Relevant legal area (e.g. Criminal, Civil, Cheque Dishonour, Trademark), current court forum (if pending), and non-confidential description of the legal query.
                  </li>
                  <li>
                    <strong className="text-foreground">Technical Log Data:</strong> Minimal technical logs required for secure HTTP transport (IP address, browser user-agent) generated transiently by web server infrastructure.
                  </li>
                </ul>
              </Reveal>

              {/* Section 3 */}
              <Reveal className="pt-8 border-t border-line">
                <SectionLabel number="03" label="PURPOSE OF PROCESSING" className="mb-2" />
                <MaskHeading as="h2" className="font-display text-2xl sm:text-3xl text-foreground font-medium mb-3">
                  Lawful Grounds &amp; Specified Purposes
                </MaskHeading>
                <p className="mb-3">
                  Personal data provided through our consultation form is processed strictly for specified purposes under Section 4 and Section 6 of the DPDP Act, 2023:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong className="text-foreground">Conflict of Interest Clearance:</strong> Verifying names of adverse parties against active panel counsel commitments (including Union of India, State of Uttar Pradesh, and DMRC) to adhere to Bar Council of India professional ethics.
                  </li>
                  <li>
                    <strong className="text-foreground">Communication &amp; Scheduling:</strong> Responding to voluntary inquiries and arranging conference appointments.
                  </li>
                  <li>
                    <strong className="text-foreground">Regulatory &amp; Legal Compliance:</strong> Maintaining records required by statutory bodies, court procedure, or applicable Indian law.
                  </li>
                </ul>
              </Reveal>

              {/* Section 4 */}
              <Reveal className="pt-8 border-t border-line">
                <SectionLabel number="04" label="LEGAL PRIVILEGE" className="mb-2" />
                <MaskHeading as="h2" className="font-display text-2xl sm:text-3xl text-foreground font-medium mb-3">
                  Professional Secrecy &amp; Advocate-Client Privilege
                </MaskHeading>
                <p className="mb-3">
                  Communications exchanged between a client and their advocate are protected under statutory professional confidentiality:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Once a formal advocate-client relationship is constituted by execution of a Vakalatnama or formal engagement letter, all communications enjoy privileged professional status under Section 126 of the Indian Evidence Act, 1872 / Section 132 of the Bharatiya Sakshya Adhiniyam, 2023 (BSA).
                  </li>
                  <li>
                    Prior to formal retention, preliminary inquiries are treated with utmost chamber discretion but do not legally establish privilege until representation is mutually agreed. Prospective clients are advised not to submit confidential confessions or proprietary trade secrets via website web forms.
                  </li>
                </ul>
              </Reveal>

              {/* Section 5 */}
              <Reveal className="pt-8 border-t border-line">
                <SectionLabel number="05" label="DATA PRINCIPAL RIGHTS" className="mb-2" />
                <MaskHeading as="h2" className="font-display text-2xl sm:text-3xl text-foreground font-medium mb-3">
                  Rights of the Data Principal (DPDP Act, 2023)
                </MaskHeading>
                <p className="mb-3">
                  Under the DPDP Act, 2023, you are entitled to exercise specific rights with respect to your digital personal data:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong className="text-foreground">Right to Access Information:</strong> Request confirmation of whether your personal data is being processed and obtain a summary of such data.
                  </li>
                  <li>
                    <strong className="text-foreground">Right to Correction &amp; Erasure:</strong> Request the correction of misleading or inaccurate personal data, or the deletion of data that is no longer required for the purpose for which it was gathered, subject to legal record retention requirements under court rules.
                  </li>
                  <li>
                    <strong className="text-foreground">Right of Grievance Redressal:</strong> Register a grievance regarding the processing of your personal data before our designated Chamber representative.
                  </li>
                </ul>
              </Reveal>

              {/* Section 6 */}
              <Reveal className="pt-8 border-t border-line">
                <SectionLabel number="06" label="RETENTION & SECURITY" className="mb-2" />
                <MaskHeading as="h2" className="font-display text-2xl sm:text-3xl text-foreground font-medium mb-3">
                  Data Retention &amp; Security Standards
                </MaskHeading>
                <p className="mb-3">
                  We implement reasonable technical and organizational security measures to protect personal data against unauthorized disclosure, loss, or alteration. Data submitted via preliminary consultation inquiries is retained only for the duration necessary to address the inquiry, complete conflict evaluation, or satisfy statutory record-keeping periods.
                </p>
                <p>
                  No personal data is sold, leased, or traded to third parties or marketing platforms under any circumstances.
                </p>
              </Reveal>

              {/* Section 7 */}
              <Reveal className="pt-8 border-t border-line">
                <SectionLabel number="07" label="GRIEVANCE OFFICER" className="mb-2" />
                <MaskHeading as="h2" className="font-display text-2xl sm:text-3xl text-foreground font-medium mb-3">
                  Grievance Redressal &amp; Inquiries
                </MaskHeading>
                <p className="mb-3">
                  If you have questions, concerns, or requests relating to this Privacy Policy or your digital personal data, you may submit a formal communication directed to the Chamber Privacy Desk:
                </p>
                <div className="border border-line bg-surface p-5 rounded-[2px] text-xs font-mono space-y-1">
                  <p className="text-foreground font-semibold">Chamber of Advocate Shubham Singh</p>
                  <p>Attn: Privacy &amp; Data Protection Desk</p>
                  <p>Jurisdiction: New Delhi, India</p>
                  <p>Inquiries: Accessible via online Consultation Intake Desk</p>
                </div>
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
