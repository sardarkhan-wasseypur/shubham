import { Metadata } from "next";
import { notFound } from "next/navigation";
import { practiceAreas } from "@/content/practiceAreas";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Family Law Advocate in Delhi | Advocate Shubham Singh",
  description:
    "Legal representation for guardianship, custody, inheritance, partition suits, and succession disputes before Delhi District Courts and Family Courts.",
  pathname: "/family-lawyer-delhi",
});

export default function FamilyLawPage() {
  const area = practiceAreas.find((p) => p.slug === "family-lawyer-delhi");
  if (!area) notFound();

  return <ServicePageTemplate area={area} />;
}
