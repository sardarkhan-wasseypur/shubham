import { Metadata } from "next";
import { notFound } from "next/navigation";
import { practiceAreas } from "@/content/practiceAreas";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Criminal Defence Lawyer in Delhi | Advocate Shubham Singh",
  description:
    "Criminal defence and appellate advocacy before Delhi District Courts, Delhi High Court, and Supreme Court across bail, trial, and revision matters.",
  pathname: "/criminal-lawyer-delhi",
});

export default function CriminalLawPage() {
  const area = practiceAreas.find((p) => p.slug === "criminal-lawyer-delhi");
  if (!area) notFound();

  return <ServicePageTemplate area={area} />;
}
