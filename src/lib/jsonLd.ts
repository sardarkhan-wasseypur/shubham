import { profile } from "@/content/profile";
import { courts } from "@/content/courts";
import { currentAppointments } from "@/content/appointments";
import { practiceAreas } from "@/content/practiceAreas";
import { siteUrl, siteName } from "@/content/seo";

/**
 * Person Schema (Strictly Verified Data Only)
 * In accordance with Bar Council of India Rule 36 and project integrity standards:
 * - Includes verified qualifications (LL.M., Gautam Buddha University) and Bar Council of Delhi.
 * - Never includes ratings, reviews, or outcome claims.
 */
export function getPersonSchema() {
  const verifiedPhoto =
    profile.photo.verified && profile.photo.value
      ? `${siteUrl}${profile.photo.value}`
      : undefined;

  const verifiedAppointments = currentAppointments.map((app) => ({
    "@type": "Organization",
    name: `${app.organization.value || "Institutional Body"} (${app.role.value || "Counsel"})`,
  }));

  const verifiedPractices = practiceAreas
    .map((pa) => pa.title.value)
    .filter((title): title is string => Boolean(title));

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name.value,
    jobTitle: profile.designation.value,
    description: `Advocate practicing before the Supreme Court of India, Delhi High Court, and District Courts in Delhi NCR.`,
    url: siteUrl,
    ...(verifiedPhoto ? { image: verifiedPhoto } : {}),
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Gautam Buddha University",
    },
    memberOf: {
      "@type": "Organization",
      name: "Bar Council of Delhi",
    },
    worksFor: [
      {
        "@type": "Organization",
        name: profile.officeName.value,
        url: siteUrl,
      },
      ...verifiedAppointments,
    ],
    knowsAbout: [
      ...verifiedPractices,
      ...courts.map((c) => c.name),
    ],
  };
}

/**
 * WebSite Schema
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description:
      "Informational resource for Advocate Shubham Singh, legal practitioner in Delhi, India.",
    inLanguage: "en-IN",
    publisher: {
      "@type": "Person",
      name: profile.name.value,
    },
  };
}

/**
 * BreadcrumbList Schema
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * FAQPage Schema
 * CRITICAL RULE: Emitted ONLY on pages where the FAQs are visibly rendered to users.
 */
export function getFaqPageSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs || faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Article Schema (Ready for published editorial articles)
 */
export interface ArticleSchemaData {
  title: string;
  summary: string;
  slug: string;
  publishedAt: string;
}

export function getArticleSchema(article: ArticleSchemaData) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    url: `${siteUrl}/legal-insights/${article.slug}`,
    datePublished: article.publishedAt,
    author: {
      "@type": "Person",
      name: profile.name.value,
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: profile.name.value,
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/legal-insights/${article.slug}`,
    },
  };
}

/**
 * LegalService / LocalBusiness Schema
 * Emits verified office name, address, and telephone.
 */
export function getLegalServiceSchema() {
  const hasVerifiedAddress = Boolean(profile.address.verified && profile.address.value);
  const hasVerifiedPhone = Boolean(profile.phone.verified && profile.phone.value);

  if (!hasVerifiedAddress || !hasVerifiedPhone) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: profile.officeName.value,
    url: siteUrl,
    telephone: profile.phone.value,
    address: {
      "@type": "PostalAddress",
      streetAddress: "A-23, Sujan Singh Block, Middle Circle, Connaught Place",
      postalCode: "110001",
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      addressCountry: "IN",
    },
  };
}
