import { Court } from "./types";

export const courts: Court[] = [
  {
    id: "supreme-court",
    name: "Supreme Court of India",
    type: "apex",
    jurisdiction: "All India (Appellate and Original Jurisdiction)",
    verified: true,
  },
  {
    id: "delhi-high-court",
    name: "Delhi High Court",
    type: "high-court",
    jurisdiction: "National Capital Territory of Delhi",
    verified: true,
  },
  {
    id: "district-courts",
    name: "District Courts",
    type: "subordinate",
    jurisdiction: "Delhi & NCR (Tis Hazari, Patiala House, Karkardooma, Rohini, Dwarka, Saket, Rouse Avenue)",
    verified: true,
  },
  {
    id: "commissions-tribunals",
    name: "Commissions and Tribunals",
    type: "tribunals",
    jurisdiction: "Statutory & Specialized Benches (NCLT, NCLAT, NCDRC, DRT, CAT, etc.)",
    verified: true,
  },
];
