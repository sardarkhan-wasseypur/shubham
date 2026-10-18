import { Metadata } from "next";
import { notFound } from "next/navigation";
import { practiceAreas } from "@/content/practiceAreas";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Civil Litigation Lawyer in Delhi | Advocate Shubham Singh",
  description:
    "Civil litigation counsel for property disputes, recovery suits, injunctions, commercial proceedings, and execution petitions before Delhi courts.",
  pathname: "/civil-lawyer-delhi",
});

export default function CivilLawPage() {
  const area = practiceAreas.find((p) => p.slug === "civil-lawyer-delhi");
  if (!area) notFound();

  return <ServicePageTemplate area={area} />;
}
