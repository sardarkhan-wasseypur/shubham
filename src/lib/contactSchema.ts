import { z } from "zod";

// Valid Enquiry Types
export const ENQUIRY_TYPES = [
  "cheque-bounce",
  "criminal-law",
  "civil-law",
  "matrimonial-law",
  "family-matters",
  "trademark-law",
  "ncmei-matters",
  "general-consultation",
] as const;

export type EnquiryType = (typeof ENQUIRY_TYPES)[number];

export const ENQUIRY_TYPE_LABELS: Record<EnquiryType, string> = {
  "cheque-bounce": "Cheque Bounce Matters (Section 138 NI Act)",
  "criminal-law": "Criminal Law & Bail Proceedings",
  "civil-law": "Civil Suits & Commercial Litigation",
  "matrimonial-law": "Matrimonial Matters & Proceedings",
  "family-matters": "Family Matters & Succession",
  "trademark-law": "Trademark & Intellectual Property Matters",
  "ncmei-matters": "NCMEI-related Matters & Institutional Petitions",
  "general-consultation": "General Legal Consultation",
};

// Phone and Email regex helpers
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Minimum 7 digits, permits +, spaces, dashes, brackets
export const PHONE_REGEX = /^(\+?[0-9\s\-().]{7,20})$/;

export function isValidEmail(val: string): boolean {
  return EMAIL_REGEX.test(val.trim());
}

export function isValidPhone(val: string): boolean {
  const digits = val.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15 && PHONE_REGEX.test(val.trim());
}

export function validatePhoneOrEmail(val: string): { valid: boolean; type?: "email" | "phone" } {
  const trimmed = val.trim();
  if (!trimmed) return { valid: false };
  if (isValidEmail(trimmed)) return { valid: true, type: "email" };
  if (isValidPhone(trimmed)) return { valid: true, type: "phone" };
  return { valid: false };
}

// Sanitization: strip dangerous HTML/script tags and normalize whitespace
export function sanitizeInput(str: string): string {
  return str
    .replace(/<[^>]*>/g, "") // Strip HTML tags
    .replace(/[\r\n\t]+/g, " ") // Normalize control whitespaces
    .trim();
}

export function sanitizeMultiline(str: string): string {
  return str
    .replace(/<[^>]*>/g, "") // Strip HTML tags
    .replace(/\r\n/g, "\n")
    .trim();
}

// Contact Form Schema
export const contactSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters.")
      .max(100, "Name cannot exceed 100 characters."),

    // Supports unified phoneOrEmail OR individual email/phone
    phoneOrEmail: z.string().trim().optional().or(z.literal("")),
    email: z.string().trim().optional().or(z.literal("")),
    phone: z.string().trim().optional().or(z.literal("")),

    enquiryType: z.enum(ENQUIRY_TYPES, {
      message: "Please select a valid enquiry type.",
    }),

    message: z
      .string()
      .trim()
      .min(10, "Please provide at least 10 characters describing your enquiry.")
      .max(1500, "Message cannot exceed 1500 characters."),

    consent: z.literal(true, {
      message: "You must consent to the privacy policy to submit an inquiry.",
    }),

    // Honeypot field (must remain empty)
    honeypot: z.string().optional().or(z.literal("")),

    // Client-side render timestamp for timing check (min 2 seconds)
    renderedAt: z.number().optional(),
  })
  .superRefine((data, ctx) => {
    // Check phone-or-email requirement (at least one valid contact method)
    const unified = data.phoneOrEmail?.trim() || "";
    const email = data.email?.trim() || "";
    const phone = data.phone?.trim() || "";

    if (unified) {
      const check = validatePhoneOrEmail(unified);
      if (!check.valid) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter a valid email address or phone number.",
          path: ["phoneOrEmail"],
        });
      }
    } else {
      // If unified field is empty, check if either email or phone is provided and valid
      const hasValidEmail = email ? isValidEmail(email) : false;
      const hasValidPhone = phone ? isValidPhone(phone) : false;

      if (!hasValidEmail && !hasValidPhone) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please provide at least one valid contact method (email or phone).",
          path: ["phoneOrEmail"],
        });
      }

      if (email && !isValidEmail(email)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter a valid email address.",
          path: ["email"],
        });
      }

      if (phone && !isValidPhone(phone)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter a valid phone number.",
          path: ["phone"],
        });
      }
    }
  });

export type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Extracts phone and/or email from a user-supplied contact string.
 */
export function extractContactDetails(contactStr: string): {
  phone?: string;
  email?: string;
  raw: string;
} {
  const trimmed = contactStr.trim();
  const emailMatch = trimmed.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);

  if (emailMatch) {
    const email = emailMatch[0];
    const remainder = trimmed
      .replace(email, "")
      .replace(/^[,/\s|&;-]+|[,/\s|&;-]+$/g, "")
      .trim();
    const digits = remainder.replace(/\D/g, "");
    if (digits.length >= 7 && digits.length <= 15) {
      return { phone: remainder, email, raw: trimmed };
    }
    return { email, raw: trimmed };
  }

  const check = validatePhoneOrEmail(trimmed);
  if (check.type === "phone") {
    return { phone: trimmed, raw: trimmed };
  }
  if (check.type === "email") {
    return { email: trimmed, raw: trimmed };
  }
  return { raw: trimmed };
}

export interface FormatWhatsAppMessageParams {
  name: string;
  phoneOrEmail: string;
  enquiryType: EnquiryType;
  message: string;
}

/**
 * Formats entered consultation inquiry details into a clean, professional WhatsApp message
 * conforming to the chamber intake protocol.
 */
export function formatWhatsAppMessage({
  name,
  phoneOrEmail,
  enquiryType,
  message,
}: FormatWhatsAppMessageParams): string {
  const trimmedName = name.trim();
  const contactInfo = extractContactDetails(phoneOrEmail);
  const matterLabel = ENQUIRY_TYPE_LABELS[enquiryType] || enquiryType;
  const trimmedMessage = message.trim();

  const lines: string[] = [
    "Hello Advocate Shubham Singh,",
    "",
    "I would like to enquire about a consultation.",
    "",
    `Name: ${trimmedName}`,
  ];

  if (contactInfo.phone) {
    lines.push(`Phone: ${contactInfo.phone}`);
  }
  if (contactInfo.email) {
    lines.push(`Email: ${contactInfo.email}`);
  }
  if (!contactInfo.phone && !contactInfo.email) {
    lines.push(`Phone / Email: ${contactInfo.raw}`);
  }

  lines.push(`Matter: ${matterLabel}`);
  lines.push("");
  lines.push("Enquiry:");
  lines.push(trimmedMessage);
  lines.push("");
  lines.push("Please let me know the next steps. Thank you.");

  return lines.join("\n");
}

/**
 * Encodes the formatted message into the official WhatsApp click-to-chat URL:
 * https://wa.me/NUMBER?text=ENCODED_MESSAGE
 */
export function buildWhatsAppUrl(
  message: string,
  phoneNumber: string = "919990590014"
): string {
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

