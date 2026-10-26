import { Field } from "./types";

export interface Profile {
  name: Field<string>;
  designation: Field<string>;
  officeName: Field<string>;
  jurisdiction: Field<string>;
  experienceYears: Field<number>;
  education: Field<string[]>;
  barEnrolment: Field<string>;
  barNotation: {
    value: string;
    verified: boolean;
    note: string;
  };
  phone: Field<string>;
  whatsApp: Field<string>;
  address: Field<string> & {
    landmarks?: string[];
    mapsUrl?: string;
  };
  clientTypes: Field<string[]>;
  photo: Field<string>;
  photoAlt: Field<string>;
  bio: Field<string>;
  awards: Field<string[]>;
  stats: Field<Record<string, number | string>>;
  reviews: Field<string[]>;
  socialLinks: Field<Record<string, string>>;
  officeHours: Field<string>;
  // Emails pending verification - strictly internal, NEVER expose publicly on UI
  pendingEmails: {
    primary: string;
    alternate: string;
    verified: false;
    showPublicly: false;
    note: string;
  };
}

// DEV-ONLY TEST FLAG: Set to true ONLY during local development to preview the sticky bottom bar with simulated numbers.
// CRITICAL SAFETY RULE: Must be false for production. The Next.js production build will throw a fatal error if this flag is true.
export const DEV_TEST_STICKY_BAR = false;

export const DEV_TEST_NUMBERS = {
  phone: "+91 99905 90014",
  whatsApp: "+91 99905 90014",
};

// Canonical international WhatsApp number without '+', spaces, or hyphens for official wa.me click-to-chat links
export const LAWYER_WHATSAPP_NUMBER = "919990590014";

export const profile: Profile = {
  name: {
    value: "Shubham Singh",
    verified: true,
  },
  designation: {
    value: "Advocate",
    verified: true,
  },
  officeName: {
    value: "Law Office of Shubham Singh",
    verified: true,
  },
  jurisdiction: {
    value: "Delhi, India",
    verified: true,
  },
  experienceYears: {
    value: null,
    verified: false,
  },
  education: {
    value: ["LL.M., Gautam Buddha University"],
    verified: true,
  },
  barEnrolment: {
    value: "Bar Council of Delhi",
    verified: true,
  },
  barNotation: {
    value: "(9) Y",
    verified: false,
    note: "Client supplied notation '(9) Y'. Requires confirmation of exact meaning before publishing as an official registration or enrollment number.",
  },
  phone: {
    value: "+91 99905 90014",
    verified: true,
  },
  whatsApp: {
    value: "+91 99905 90014",
    verified: true,
  },
  address: {
    value: "A-23, Sujan Singh Block, Middle Circle, Connaught Place, New Delhi – 110001, India",
    verified: true,
    landmarks: ["Wenger's", "Indian Oil petrol pump", "Block A"],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=A-23+Sujan+Singh+Block+Middle+Circle+Connaught+Place+New+Delhi+110001",
  },
  clientTypes: {
    value: ["Individuals", "Companies", "Businesses and other entities"],
    verified: true,
  },
  photo: {
    value: "/images/advocate-portrait.jpg",
    verified: true,
  },
  photoAlt: {
    value: "Portrait of Advocate Shubham Singh in advocate's robes",
    verified: true,
  },
  bio: {
    value: null,
    verified: false,
  },
  awards: {
    value: null,
    verified: false,
  },
  stats: {
    value: null,
    verified: false,
  },
  reviews: {
    value: null,
    verified: false,
  },
  socialLinks: {
    value: null,
    verified: false,
  },
  officeHours: {
    value: null,
    verified: false,
  },
  pendingEmails: {
    primary: "Thevidhikars@gmail.com",
    alternate: "Lawofficeofshubhamsingh@gmai.com",
    verified: false,
    showPublicly: false,
    note: "Second email contains domain 'gmai.com' (possible typo). Both addresses flagged for client confirmation; neither published as verified until confirmed.",
  },
};
