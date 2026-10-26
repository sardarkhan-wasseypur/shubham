"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  ENQUIRY_TYPES,
  ENQUIRY_TYPE_LABELS,
  EnquiryType,
  validatePhoneOrEmail,
  formatWhatsAppMessage,
  buildWhatsAppUrl,
} from "@/lib/contactSchema";
import { LAWYER_WHATSAPP_NUMBER } from "@/content/profile";

interface FormErrors {
  name?: string;
  phoneOrEmail?: string;
  enquiryType?: string;
  message?: string;
  consent?: string;
  general?: string;
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [enquiryType, setEnquiryType] = useState<EnquiryType>("cheque-bounce");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState(""); // Bot honeypot

  // Form State
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverMessage, setServerMessage] = useState<string>("");
  const [preparedMessage, setPreparedMessage] = useState<string>("");
  const [preparedWhatsAppUrl, setPreparedWhatsAppUrl] = useState<string>("");

  // Guard against duplicate rapid submissions
  const isSubmittingRef = useRef(false);

  // Refs for accessibility focus management
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const successCardRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const contactInputRef = useRef<HTMLInputElement>(null);
  const enquirySelectRef = useRef<HTMLSelectElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const consentInputRef = useRef<HTMLInputElement>(null);

  // Client-side Validation (identical to Zod rules)
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // 1. Name validation
    const trimmedName = name.trim();
    if (!trimmedName) {
      newErrors.name = "Full name is required.";
    } else if (trimmedName.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    } else if (trimmedName.length > 100) {
      newErrors.name = "Name cannot exceed 100 characters.";
    }

    // 2. Phone or Email validation (at least one valid)
    const trimmedContact = phoneOrEmail.trim();
    if (!trimmedContact) {
      newErrors.phoneOrEmail = "Please provide a valid phone number or email address.";
    } else {
      const contactCheck = validatePhoneOrEmail(trimmedContact);
      if (!contactCheck.valid) {
        newErrors.phoneOrEmail =
          "Please enter a valid email address (e.g. name@example.com) or phone number (at least 7 digits).";
      }
    }

    // 3. Enquiry type validation
    if (!ENQUIRY_TYPES.includes(enquiryType)) {
      newErrors.enquiryType = "Please select a valid enquiry type.";
    }

    // 4. Message validation (min 10, max 1500)
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      newErrors.message = "Please describe the nature of your legal matter.";
    } else if (trimmedMessage.length < 10) {
      newErrors.message = "Please provide at least 10 characters describing your inquiry.";
    } else if (trimmedMessage.length > 1500) {
      newErrors.message = "Message cannot exceed 1500 characters.";
    }

    // 5. Consent checkbox (required)
    if (!consent) {
      newErrors.consent = "You must consent to the privacy policy to submit an inquiry.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Prevent duplicate submissions from rapid clicks
    if (isSubmittingRef.current) {
      return;
    }

    // 2. Honeypot check (silently drop bot submissions)
    if (honeypot && honeypot.trim().length > 0) {
      return;
    }

    // 3. Synchronous client-side validation
    const isValid = validateForm();
    if (!isValid) {
      isSubmittingRef.current = false;
      setStatus("error");
      setServerMessage("Please correct the errors in the form before submitting.");
      // Move accessibility focus to Error Summary
      setTimeout(() => {
        errorSummaryRef.current?.focus();
      }, 50);
      return;
    }

    // Mark as submitting to guard against duplicate clicks
    isSubmittingRef.current = true;

    // 4. Format pre-filled WhatsApp message synchronously
    const formattedMsg = formatWhatsAppMessage({
      name,
      phoneOrEmail,
      enquiryType,
      message,
    });
    const whatsappUrl = buildWhatsAppUrl(formattedMsg, LAWYER_WHATSAPP_NUMBER);

    // 5. Open WhatsApp immediately on the user's direct click event
    let openedInNewTab = false;
    try {
      const newTab = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      if (newTab && !newTab.closed && typeof newTab.closed !== "undefined") {
        openedInNewTab = true;
      }
    } catch {
      openedInNewTab = false;
    }

    if (!openedInNewTab) {
      // Browser or webview popup blocker intercepted window.open:
      // Fallback to top-level navigation so client is not stranded
      try {
        window.location.href = whatsappUrl;
      } catch {
        // Confirmation card contains immediate click-to-open button
      }
    }

    // 6. Update confirmation state
    setPreparedMessage(formattedMsg);
    setPreparedWhatsAppUrl(whatsappUrl);
    setErrors({});
    setServerMessage("");
    setStatus("success");

    // Move accessibility focus to confirmation container
    setTimeout(() => {
      successCardRef.current?.focus();
    }, 50);
  };

  const handleEdit = () => {
    isSubmittingRef.current = false;
    setStatus("idle");
    setErrors({});
    setServerMessage("");
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 50);
  };

  const handleReset = () => {
    isSubmittingRef.current = false;
    setName("");
    setPhoneOrEmail("");
    setEnquiryType("cheque-bounce");
    setMessage("");
    setConsent(false);
    setHoneypot("");
    setErrors({});
    setStatus("idle");
    setServerMessage("");
    setPreparedMessage("");
    setPreparedWhatsAppUrl("");
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 50);
  };

  // SUCCESS / WHATSAPP PRE-FILLED STATE
  // Important behavior: Message is pre-filled, NOT automatically delivered.
  // The client must press Send in WhatsApp.
  if (status === "success") {
    return (
      <div
        ref={successCardRef}
        tabIndex={-1}
        role="region"
        aria-label="WhatsApp consultation enquiry confirmation"
        className="border border-line bg-surface p-6 sm:p-10 rounded-[2px] text-center focus:outline-none"
      >
        {/* WhatsApp Icon */}
        <div className="w-14 h-14 rounded-full bg-accent/10 border-2 border-accent text-accent flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12.031 2C6.516 2 2.024 6.49 2.024 12.007c0 1.942.556 3.754 1.523 5.289L2 22l4.85-1.503a9.98 9.98 0 005.181 1.442c5.515 0 10.007-4.49 10.007-10.007S17.546 2 12.031 2zm5.728 14.15c-.24.673-1.393 1.285-1.928 1.368-.49.076-1.127.108-3.232-.764-2.69-1.114-4.408-3.83-4.542-4.009-.134-.179-1.085-1.446-1.085-2.758 0-1.312.69-1.956.936-2.22.246-.265.541-.33.722-.33.18 0 .362.002.52.01.17.009.397-.064.62.473.23.553.784 1.916.853 2.056.07.14.116.304.023.488-.093.184-.139.299-.276.459-.138.161-.29.359-.414.482-.138.138-.282.288-.121.564.161.276.716 1.18 1.54 1.914 1.058.944 1.95 1.236 2.226 1.374.276.138.437.115.598-.069.161-.184.69-8.05.874-1.08.184-.276.368-.23.62-.138.253.092 1.609.759 1.885.897.276.138.46.207.529.322.069.115.069.667-.171 1.34z" />
          </svg>
        </div>

        <span className="text-[11px] font-mono text-accent-text uppercase tracking-widest block mb-2 font-semibold">
          WhatsApp Consultation Desk
        </span>

        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground font-normal mb-3">
          Enquiry Pre-Filled in WhatsApp
        </h3>

        <p className="text-secondary text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-6">
          WhatsApp has been opened with your enquiry pre-filled. Please review your message and press{" "}
          <strong className="text-foreground font-semibold">Send</strong> in WhatsApp to deliver your consultation request directly to Advocate Shubham Singh.
        </p>

        {/* IMPORTANT BEHAVIOR REMINDER */}
        <div className="p-4 bg-accent/10 border border-accent/40 text-xs text-foreground text-left rounded-[2px] max-w-lg mx-auto mb-6 space-y-1.5">
          <div className="flex items-center gap-2 font-semibold text-accent-text">
            <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
            <span>Action Required: Press &quot;Send&quot; in WhatsApp</span>
          </div>
          <p className="text-secondary leading-relaxed">
            Your enquiry details have been pre-formatted for your convenience, but the message is not transmitted automatically. You must tap the Send button in WhatsApp to submit it to the chamber.
          </p>
        </div>

        {/* FORMATTED MESSAGE PREVIEW */}
        <div className="p-4 bg-background border border-line text-left rounded-[2px] max-w-lg mx-auto mb-6">
          <span className="text-[10px] font-mono uppercase tracking-widest text-secondary block mb-2 font-semibold">
            Pre-Filled Message Summary:
          </span>
          <pre className="font-mono text-xs text-foreground/90 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
            {preparedMessage}
          </pre>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-6">
          {preparedWhatsAppUrl && (
            <a
              href={preparedWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent text-on-accent text-xs font-semibold uppercase tracking-[0.14em] py-3.5 px-6 rounded-[2px] hover:brightness-110 transition-colors shadow-sm"
            >
              <span>Open WhatsApp</span>
              <span className="text-sm font-bold">&nearr;</span>
            </a>
          )}

          <button
            type="button"
            onClick={handleEdit}
            className="w-full sm:w-auto inline-flex items-center justify-center border border-line text-foreground text-xs font-semibold uppercase tracking-[0.14em] py-3.5 px-6 rounded-[2px] hover:border-foreground hover:bg-surface/80 transition-colors"
          >
            Edit Enquiry
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto inline-flex items-center justify-center border border-line/60 text-secondary text-xs uppercase tracking-[0.14em] py-3.5 px-6 rounded-[2px] hover:text-foreground hover:border-line transition-colors"
          >
            New Form
          </button>
        </div>

        {/* STATUTORY DISCLAIMER */}
        <p className="text-[11px] text-secondary max-w-lg mx-auto leading-relaxed border-t border-line/60 pt-4">
          Submitting an enquiry via WhatsApp does not create an advocate-client relationship. Formal representation commences upon mutual execution of a Vakalatnama following preliminary conflict clearance.
        </p>
      </div>
    );
  }

  // IDLE / ERROR STATES
  const errorCount = Object.keys(errors).length;

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="border border-line bg-surface p-6 sm:p-10 rounded-[2px] space-y-6"
        noValidate
        aria-label="Chamber Consultation Request Form"
      >
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-6 h-[2px] bg-accent" aria-hidden="true" />
            <span className="text-label text-accent-text font-semibold uppercase tracking-[0.18em]">
              Intake Protocol
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl text-foreground font-normal mb-1.5">
            Chamber Inquiry &amp; Consultation Request
          </h2>
          <p className="text-secondary text-xs sm:text-sm">
            All submissions are treated with strict professional discretion. Required fields are indicated with an asterisk (*).
          </p>
        </div>

        {/* ERROR SUMMARY (Accessible, receives focus upon error) */}
        {status === "error" && (
          <div
            ref={errorSummaryRef}
            tabIndex={-1}
            role="alert"
            aria-live="assertive"
            className="p-4 bg-accent/10 border-2 border-accent text-foreground text-xs sm:text-sm rounded-[2px] focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <div className="flex items-center gap-2 font-semibold text-accent-text mb-2">
              <svg className="w-4 h-4 stroke-current fill-none shrink-0" viewBox="0 0 24 24" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{serverMessage || `There ${errorCount === 1 ? "is 1 error" : `are ${errorCount} errors`} in your submission`}</span>
            </div>

            {errorCount > 0 && (
              <ul className="list-disc pl-5 space-y-1 text-xs text-foreground/90 mt-2">
                {errors.name && (
                  <li>
                    <button
                      type="button"
                      onClick={() => nameInputRef.current?.focus()}
                      className="text-left text-accent-text underline hover:text-foreground transition-colors"
                    >
                      Full Name: {errors.name}
                    </button>
                  </li>
                )}
                {errors.phoneOrEmail && (
                  <li>
                    <button
                      type="button"
                      onClick={() => contactInputRef.current?.focus()}
                      className="text-left text-accent-text underline hover:text-foreground transition-colors"
                    >
                      Phone or Email: {errors.phoneOrEmail}
                    </button>
                  </li>
                )}
                {errors.enquiryType && (
                  <li>
                    <button
                      type="button"
                      onClick={() => enquirySelectRef.current?.focus()}
                      className="text-left text-accent-text underline hover:text-foreground transition-colors"
                    >
                      Enquiry Type: {errors.enquiryType}
                    </button>
                  </li>
                )}
                {errors.message && (
                  <li>
                    <button
                      type="button"
                      onClick={() => messageInputRef.current?.focus()}
                      className="text-left text-accent-text underline hover:text-foreground transition-colors"
                    >
                      Brief Summary: {errors.message}
                    </button>
                  </li>
                )}
                {errors.consent && (
                  <li>
                    <button
                      type="button"
                      onClick={() => consentInputRef.current?.focus()}
                      className="text-left text-accent-text underline hover:text-foreground transition-colors"
                    >
                      Consent: {errors.consent}
                    </button>
                  </li>
                )}
              </ul>
            )}
          </div>
        )}

        {/* HONEYPOT ANTI-SPAM FIELD (Invisible to genuine users) */}
        <div style={{ display: "none" }} aria-hidden="true">
          <label htmlFor="b_fax_number">Do not fill this field</label>
          <input
            id="b_fax_number"
            type="text"
            name="b_fax_number"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* FIELD 1: FULL NAME */}
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5"
          >
            Full Name *
          </label>
          <input
            ref={nameInputRef}
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            placeholder="e.g. Adv. R. K. Sharma"
            className={`w-full h-12 min-h-[48px] bg-background text-foreground px-3.5 text-sm rounded-[2px] transition-colors ${
              errors.name
                ? "border-2 border-accent focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                : "border border-line focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
            }`}
          />
          {errors.name && (
            <p id="contact-name-error" role="alert" className="text-accent-text text-xs mt-1 font-medium">
              {errors.name}
            </p>
          )}
        </div>

        {/* FIELD 2: PHONE OR EMAIL (At least one valid) */}
        <div>
          <label
            htmlFor="contact-phone-or-email"
            className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5"
          >
            Phone or Email Address *
          </label>
          <input
            ref={contactInputRef}
            id="contact-phone-or-email"
            name="phoneOrEmail"
            type="text"
            required
            autoComplete="email tel"
            value={phoneOrEmail}
            onChange={(e) => {
              setPhoneOrEmail(e.target.value);
              if (errors.phoneOrEmail) setErrors((prev) => ({ ...prev, phoneOrEmail: undefined }));
            }}
            aria-invalid={errors.phoneOrEmail ? "true" : "false"}
            aria-describedby={errors.phoneOrEmail ? "contact-contact-error" : "contact-contact-hint"}
            placeholder="name@example.com or +91 98765 43210"
            className={`w-full h-12 min-h-[48px] bg-background text-foreground px-3.5 text-sm rounded-[2px] transition-colors ${
              errors.phoneOrEmail
                ? "border-2 border-accent focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                : "border border-line focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
            }`}
          />
          <p id="contact-contact-hint" className="text-[11px] text-secondary mt-1">
            Provide a valid email or telephone number. At least one contact method is required.
          </p>
          {errors.phoneOrEmail && (
            <p id="contact-contact-error" role="alert" className="text-accent-text text-xs mt-1 font-medium">
              {errors.phoneOrEmail}
            </p>
          )}
        </div>

        {/* FIELD 3: ENQUIRY TYPE */}
        <div>
          <label
            htmlFor="contact-enquiry-type"
            className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5"
          >
            Enquiry Classification *
          </label>
          <select
            ref={enquirySelectRef}
            id="contact-enquiry-type"
            name="enquiryType"
            value={enquiryType}
            onChange={(e) => {
              setEnquiryType(e.target.value as EnquiryType);
              if (errors.enquiryType) setErrors((prev) => ({ ...prev, enquiryType: undefined }));
            }}
            aria-invalid={errors.enquiryType ? "true" : "false"}
            aria-describedby={errors.enquiryType ? "contact-enquiry-error" : undefined}
            className={`w-full h-12 min-h-[48px] bg-background text-foreground px-3.5 text-sm rounded-[2px] transition-colors ${
              errors.enquiryType
                ? "border-2 border-accent focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                : "border border-line focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
            }`}
          >
            {ENQUIRY_TYPES.map((typeKey) => (
              <option key={typeKey} value={typeKey} className="bg-surface text-foreground">
                {ENQUIRY_TYPE_LABELS[typeKey]}
              </option>
            ))}
          </select>
          {errors.enquiryType && (
            <p id="contact-enquiry-error" role="alert" className="text-accent-text text-xs mt-1 font-medium">
              {errors.enquiryType}
            </p>
          )}
        </div>

        {/* FIELD 4: MESSAGE (Max 1500 chars with counter) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="contact-message"
              className="text-xs font-semibold uppercase tracking-wider text-foreground"
            >
              Brief Summary of Dispute / Legal Matter *
            </label>
            <span
              className={`text-[11px] font-mono ${
                message.length > 1400 ? "text-accent-text font-bold" : "text-secondary"
              }`}
            >
              {message.length} / 1500
            </span>
          </div>
          <textarea
            ref={messageInputRef}
            id="contact-message"
            name="message"
            rows={5}
            maxLength={1500}
            required
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
            }}
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "contact-message-error" : "contact-message-hint"}
            placeholder="Please provide general procedural facts (e.g. date of legal notice, court where summons was issued, nature of dispute). Do not submit confidential confessionals or proprietary trade secrets."
            className={`w-full bg-background text-foreground p-3.5 text-sm rounded-[2px] transition-colors resize-y ${
              errors.message
                ? "border-2 border-accent focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                : "border border-line focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
            }`}
          />
          <p id="contact-message-hint" className="text-[11px] text-secondary mt-1">
            Maximum 1500 characters. No file uploads permitted on preliminary consultation intake.
          </p>
          {errors.message && (
            <p id="contact-message-error" role="alert" className="text-accent-text text-xs mt-1 font-medium">
              {errors.message}
            </p>
          )}
        </div>

        {/* FIELD 5: CONSENT CHECKBOX (Links to /privacy-policy) */}
        <div className="pt-2 border-t border-line/60">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              ref={consentInputRef}
              id="contact-consent"
              name="consent"
              type="checkbox"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked);
                if (errors.consent) setErrors((prev) => ({ ...prev, consent: undefined }));
              }}
              aria-invalid={errors.consent ? "true" : "false"}
              aria-describedby={errors.consent ? "contact-consent-error" : undefined}
              className="mt-1 h-4 w-4 rounded-[2px] border-line text-accent accent-accent focus:ring-2 focus:ring-accent focus:outline-none"
            />
            <span className="text-xs text-secondary leading-relaxed">
              I consent to the collection and processing of my contact information in accordance with the{" "}
              <Link
                href="/privacy-policy"
                target="_blank"
                className="text-foreground underline hover:text-accent-text transition-colors"
              >
                Privacy Policy
              </Link>{" "}
              for preliminary conflict-of-interest evaluation and scheduling. *
            </span>
          </label>
          {errors.consent && (
            <p id="contact-consent-error" role="alert" className="text-accent-text text-xs mt-1.5 font-medium pl-7">
              {errors.consent}
            </p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <div>
          <button
            type="submit"
            className="w-full h-12 min-h-[48px] inline-flex items-center justify-between px-5 bg-accent text-on-accent text-xs font-semibold uppercase tracking-[0.18em] rounded-[2px] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-foreground transition-all shadow-sm"
          >
            <span>SEND ENQUIRY</span>
            <span className="text-base font-bold">&rarr;</span>
          </button>
        </div>
      </form>

      {/* NOTICE UNDER THE FORM (Exact required text) */}
      <div className="mt-4 p-4 border border-line bg-surface/40 rounded-[2px] text-xs text-secondary text-center leading-relaxed">
        <p className="font-medium text-foreground/90">
          Submitting this form does not create an advocate-client relationship. Please do not send confidential documents here.
        </p>
      </div>
    </div>
  );
}
