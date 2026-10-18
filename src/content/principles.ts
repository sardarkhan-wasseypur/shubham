import { Principle } from "./types";

export const principles: Principle[] = [
  {
    id: "bci-compliance",
    title: "Bar Council of India Compliance",
    description:
      "This platform is strictly informational in accordance with Rule 36 of the Bar Council of India Rules. It does not solicit work or advertise legal services.",
    citation: "Rule 36, Standards of Professional Conduct and Etiquette",
    verified: true,
  },
  {
    id: "no-solicitation",
    title: "Non-Solicitation & Ethical Practice",
    description:
      "In compliance with the Advocates Act, 1961, any information retrieved or received through this website is at the user's voluntary request and does not establish an advocate-client relationship.",
    citation: "The Advocates Act, 1961",
    verified: true,
  },
  {
    id: "client-confidentiality",
    title: "Privilege & Professional Confidentiality",
    description:
      "All professional communications are safeguarded by statutory advocate-client privilege.",
    citation: "Section 126, Indian Evidence Act / Section 132, Bharatiya Sakshya Adhiniyam",
    verified: true,
  },
  {
    id: "objective-representation",
    title: "Objective Courtroom Advocacy",
    description:
      "Representation before courts and tribunals is conducted with strict adherence to procedure, legal merit, and judicial etiquette without outcome guarantees.",
    verified: true,
  },
];
