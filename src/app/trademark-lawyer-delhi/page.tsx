import { Metadata } from "next";
import { notFound } from "next/navigation";
import { practiceAreas } from "@/content/practiceAreas";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Trademark Lawyer in Delhi | Advocate Shubham Singh",
  description:
    "Trademark protection, opposition filings, infringement suits, and intellectual property litigation before the Delhi High Court and Trade Marks Registry.",
  pathname: "/trademark-lawyer-delhi",
});

export default function TrademarkLawPage() {
  const area = practiceAreas.find((p) => p.slug === "trademark-lawyer-delhi");
  if (!area) notFound();

  return <ServicePageTemplate area={area} />;
}
