import { Field } from "./types";

export interface Profile {
  name: Field<string>;
  designation: Field<string>;
  jurisdiction: Field<string>;
  experienceYears: Field<number>;
  education: Field<string[]>;
  barEnrolment: Field<string>;
  phone: Field<string>;
  whatsApp: Field<string>;
  address: Field<string>;
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
  };
}

// DEV-ONLY TEST FLAG: Set to true ONLY during local development to preview the sticky bottom bar with simulated numbers.
// CRITICAL SAFETY RULE: Must be false for production. The Next.js production build will throw a fatal error if this flag is true.
export const DEV_TEST_STICKY_BAR = false;

export const DEV_TEST_NUMBERS = {
  phone: "+91 99999 99999",
  whatsApp: "+919999999999",
};

export const profile: Profile = {
  name: {
    value: "Shubham Singh",
    verified: true,
  },
  designation: {
    value: "Advocate",
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
    value: null,
    verified: false,
  },
  barEnrolment: {
    value: null,
    verified: false,
  },
  phone: {
    value: null,
    verified: false,
  },
  whatsApp: {
    value: null,
    verified: false,
  },
  address: {
    value: null,
    verified: false,
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
  },
};
