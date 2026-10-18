import { Appointment } from "./types";

export const currentAppointments: Appointment[] = [
  {
    id: "panel-counsel-uoi",
    role: { value: "Panel Counsel", verified: true },
    organization: { value: "Union of India", verified: true },
    status: "current",
    verified: true,
  },
  {
    id: "panel-counsel-up",
    role: { value: "Panel Counsel", verified: true },
    organization: { value: "State of Uttar Pradesh", verified: true },
    status: "current",
    verified: true,
  },
  {
    id: "panel-counsel-dmrc",
    role: { value: "Panel Counsel", verified: true },
    organization: { value: "Delhi Metro Rail Corporation (DMRC)", verified: true },
    status: "current",
    verified: true,
  },
];

export const formerAppointments: Appointment[] = [
  {
    id: "panel-counsel-muthoot",
    role: { value: "Panel Counsel", verified: true },
    organization: { value: "Muthoot Finance", verified: true },
    status: "former",
    verified: true,
  },
  {
    id: "legal-advisor-up-madarsa",
    role: { value: "Legal Advisor", verified: true },
    organization: { value: "Uttar Pradesh Madarsa Board", verified: true },
    status: "former",
    verified: true,
  },
];

export const appointments: Appointment[] = [
  ...currentAppointments,
  ...formerAppointments,
];
