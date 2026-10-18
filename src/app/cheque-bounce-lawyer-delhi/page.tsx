import { Metadata } from "next";
import { notFound } from "next/navigation";
import { practiceAreas } from "@/content/practiceAreas";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Cheque Bounce Lawyer in Delhi | Advocate Shubham Singh",
  description:
    "Procedural legal representation and statutory advisory for Section 138 NI Act cheque bounce matters and demand notices before Delhi courts.",
  pathname: "/cheque-bounce-lawyer-delhi",
});

export default function ChequeBouncePage() {
  const area = practiceAreas.find((p) => p.slug === "cheque-bounce-lawyer-delhi");
  if (!area) notFound();

  return <ServicePageTemplate area={area} />;
}
