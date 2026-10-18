export interface Field<T> {
  value: T | null;
  verified: boolean;
}

export function isVerified<T>(
  field: Field<T> | null | undefined
): field is { value: T; verified: true } {
  return Boolean(field && field.verified && field.value !== null);
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PracticeArea {
  slug: string;
  title: Field<string>;
  subtitle?: Field<string>;
  shortDescription: Field<string>;
  intro: Field<string>;
  whoItHelps: Field<string[]>;
  whenItApplies: Field<string[]>;
  processSteps: Field<ProcessStep[]>;
  relevantForums: Field<string[]>;
  faqs: Field<FAQItem[]>;
  disclaimer: Field<string>;
  legalNote?: Field<string>;
}

export type AppointmentStatus = "current" | "former";

export interface Appointment {
  id: string;
  role: Field<string>;
  organization: Field<string>;
  status: AppointmentStatus;
  verified: boolean;
}

export interface Court {
  id: string;
  name: string;
  type: "apex" | "high-court" | "subordinate" | "tribunals";
  jurisdiction: string;
  verified: boolean;
}

export interface Principle {
  id: string;
  title: string;
  description: string;
  citation?: string;
  verified: boolean;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Article {
  slug: string;
  title: string;
  summary: string;
  content: string;
  publishedAt: string;
  verified: boolean;
}

export interface SEODefaults {
  siteName: string;
  siteUrl: string;
  title: string;
  description: string;
  locale: string;
}
