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
import { articles } from "@/content/articles";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Legal Insights & Notes | Advocate Shubham Singh",
  description:
    "Procedural legal updates, statutory analysis, and court practice notes from the chamber of Advocate Shubham Singh in Delhi. Educational resources only.",
  pathname: "/legal-insights",
  noIndex: articles.length === 0,
});

export default function LegalInsightsPage() {
  const hasArticles = articles.length > 0;

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-background text-foreground pt-28 sm:pt-32">
        {/* HEADER / INTRO */}
        <PageHero
          breadcrumbs={[{ label: "Legal Insights" }]}
          eyebrow="Publications • Procedural Commentary"
          title="Legal Insights & Notes"
          intro={
            <>
              <p className="mb-4">
                The chamber authors procedural briefings, statutory commentaries, and case summaries analyzing developments across civil, criminal, commercial, and intellectual property law in India.
              </p>
              <p>
                All publications are strictly educational in nature and do not constitute formal legal advice or solicit professional engagement.
              </p>
            </>
          }
        />

        {/* ARTICLES CONTENT OR HONEST EMPTY STATE */}
        <section className="py-16 md:py-24 border-b border-line">
          <Container>
            {!hasArticles ? (
              <Reveal className="max-w-3xl mx-auto border border-line bg-surface/40 p-8 sm:p-12 text-center rounded-[2px]">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-line bg-background text-accent-text mb-6">
                  <svg
                    className="w-6 h-6 stroke-current fill-none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>

                <span className="text-xs font-mono uppercase tracking-widest text-accent-text block mb-2">
                  Editorial Docket In Progress
                </span>

                <MaskHeading as="h2" className="font-display text-3xl sm:text-4xl text-foreground font-normal mb-4">
                  Articles &amp; Procedural Notes Coming Soon
                </MaskHeading>

                <p className="text-secondary text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8">
                  Formal legal briefs and statutory overviews are currently undergoing legal review and factual verification prior to publication. In accordance with ethical standards, only peer-verified procedural notes are released.
                </p>

                {/* UPCOMING TOPICS PREVIEW */}
                <div className="text-left border-t border-line/60 pt-8 mt-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">
                    Upcoming Legal Commentary Topics
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        tag: "Negotiable Instruments Act",
                        title: "Section 138 Notice Timelines & Judicial Trends",
                        desc: "Statutory analysis of notice requirements, cause of action computation, and compounding guidelines.",
                      },
                      {
                        tag: "Criminal Jurisprudence",
                        title: "Bail Jurisprudence & Bharatiya Nagarik Suraksha Sanhita",
                        desc: "Comparative study of procedural shifts between CrPC and BNSS provisions.",
                      },
                      {
                        tag: "Intellectual Property",
                        title: "Trademark Injunctions before Delhi High Court (IPD)",
                        desc: "Procedural prerequisites for ex-parte interim injunctions and trademark infringement defence.",
                      },
                      {
                        tag: "Commercial Litigation",
                        title: "Summary Proceedings & Commercial Suits",
                        desc: "Mandatory pre-institution mediation and timelines under the Commercial Courts Act, 2015.",
                      },
                    ].map((topic, idx) => (
                      <Reveal
                        key={idx}
                        staggerIndex={idx}
                        className="border border-line bg-background p-4 rounded-[2px]"
                      >
                        <span className="text-[10px] font-mono text-accent-text uppercase block mb-1">
                          {topic.tag}
                        </span>
                        <h4 className="font-display text-base text-foreground font-medium mb-1">
                          {topic.title}
                        </h4>
                        <p className="text-xs text-secondary">
                          {topic.desc}
                        </p>
                      </Reveal>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <Button variant="outline" href="/practice-areas">
                    Explore Practice Areas
                  </Button>
                  <Button variant="solid-red" href="/contact">
                    Inquire Directly
                  </Button>
                </div>
              </Reveal>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((art, idx) => (
                  <Reveal
                    key={art.slug}
                    as="article"
                    staggerIndex={idx}
                    className="border border-line bg-surface p-6 rounded-[2px] flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[11px] font-mono text-accent-text uppercase tracking-wider block mb-2">
                        Procedural Note
                      </span>
                      <h2 className="font-display text-2xl text-foreground font-medium mb-3">
                        <Link
                          href={`/legal-insights/${art.slug}`}
                          className="hover:text-accent-text transition-colors"
                        >
                          {art.title}
                        </Link>
                      </h2>
                      <p className="text-xs text-secondary leading-relaxed mb-4">
                        {art.summary}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-line text-xs text-secondary flex items-center justify-between">
                      <span>{art.publishedAt}</span>
                      <span className="text-foreground font-medium hover:underline">
                        Read Analysis &rarr;
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </Container>
        </section>

        {/* EDITORIAL DISCLAIMER */}
        <BandSection className="border-b border-line bg-surface/30">
          <Reveal className="max-w-3xl">
            <SectionLabel number="02" label="LEGAL NOTICE" className="mb-2" />
            <MaskHeading as="h2" className="font-display text-2xl sm:text-3xl text-foreground mb-4">
              Informational Purpose Only
            </MaskHeading>
            <p className="text-secondary text-sm sm:text-base leading-relaxed">
              Articles and legal notes published on this website are intended solely for academic and informational discussions on legal procedure and statutory interpretation. They do not constitute legal advice and cannot substitute for independent legal counsel tailored to specific factual circumstances.
            </p>
          </Reveal>
        </BandSection>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-surface border-b border-line text-center">
          <Container>
            <Reveal className="max-w-xl mx-auto">
              <MaskHeading as="h2" className="font-display text-3xl sm:text-4xl text-foreground mb-4">
                Specific Legal Inquiries
              </MaskHeading>
              <p className="text-secondary text-sm sm:text-base mb-8 leading-relaxed">
                If you require counsel on active litigation or pre-litigation notices, submit your inquiry to the chamber.
              </p>
              <Button variant="solid-red" href="/contact">
                Schedule a Consultation
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
