import { Metadata } from "next";
import { notFound } from "next/navigation";
import { practiceAreas } from "@/content/practiceAreas";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "NCMEI Lawyer in Delhi | Advocate Shubham Singh",
  description:
    "Legal representation and advisory for proceedings before the National Commission for Minority Educational Institutions (NCMEI) and Delhi High Court.",
  pathname: "/ncmei-matters-lawyer-delhi",
});

export default function NcmeiMattersPage() {
  const area = practiceAreas.find((p) => p.slug === "ncmei-matters-lawyer-delhi");
  if (!area) notFound();

  return <ServicePageTemplate area={area} />;
}
