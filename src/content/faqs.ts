import { FAQItem } from "./types";

export interface SystemFAQ extends FAQItem {
  id: string;
  category: "compliance" | "consultation" | "procedure";
  verified: boolean;
}

export const faqs: SystemFAQ[] = [
  {
    id: "bci-guidelines",
    question: "What is the purpose of this website?",
    answer:
      "This website is designed strictly for informational purposes to provide basic factual information regarding Advocate Shubham Singh's practice areas and court jurisdictions in Delhi, adhering to Bar Council of India guidelines.",
    category: "compliance",
    verified: true,
  },
  {
    id: "advocate-client-relationship",
    question: "Does reading this website create an advocate-client relationship?",
    answer:
      "No. Accessing the material on this website or transmitting an inquiry does not constitute or create an advocate-client relationship. A formal relationship requires a mutual, written engagement.",
    category: "compliance",
    verified: true,
  },
  {
    id: "courts-of-appearance",
    question: "In which courts does Advocate Shubham Singh appear?",
    answer:
      "Appearances are conducted before the Supreme Court of India, the High Court of Delhi, District Courts across Delhi NCR, as well as statutory commissions and judicial tribunals.",
    category: "procedure",
    verified: true,
  },
  {
    id: "consultation-booking",
    question: "How can a formal legal consultation be requested?",
    answer:
      "Individuals seeking independent legal guidance may submit their request through the designated intake form or contact channel to arrange an appointment subject to conflict checks.",
    category: "consultation",
    verified: true,
  },
];
