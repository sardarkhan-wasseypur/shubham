import { Metadata } from "next";
import { notFound } from "next/navigation";
import { practiceAreas } from "@/content/practiceAreas";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Matrimonial Lawyer in Delhi | Advocate Shubham Singh",
  description:
    "Matrimonial and marital dispute representation, divorce proceedings, mutual consent petitions, and mediation before Family Courts in Delhi NCR.",
  pathname: "/matrimonial-lawyer-delhi",
});

export default function MatrimonialLawPage() {
  const area = practiceAreas.find((p) => p.slug === "matrimonial-lawyer-delhi");
  if (!area) notFound();

  return <ServicePageTemplate area={area} />;
}
