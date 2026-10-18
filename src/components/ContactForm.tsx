"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ENQUIRY_TYPES,
  ENQUIRY_TYPE_LABELS,
  EnquiryType,
  validatePhoneOrEmail,
} from "@/lib/contactSchema";

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

  // Timing check: capture initial render timestamp safely in effect
  const renderedAtRef = useRef<number | null>(null);
  useEffect(() => {
    renderedAtRef.current = Date.now();
  }, []);

  // Form State
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverMessage, setServerMessage] = useState<string>("");
  const [referenceId, setReferenceId] = useState<string>("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Run client validation
    const isValid = validateForm();
    if (!isValid) {
      setStatus("error");
      setServerMessage("Please correct the errors in the form before submitting.");
      // Move accessibility focus to Error Summary
      setTimeout(() => {
        errorSummaryRef.current?.focus();
      }, 50);
      return;
    }

    setStatus("submitting");
    setServerMessage("");

    try {
      const payload = {
        name: name.trim(),
        phoneOrEmail: phoneOrEmail.trim(),
        enquiryType,
        message: message.trim(),
        consent,
        honeypot,
        renderedAt: renderedAtRef.current,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      // ONLY transition to success upon 2xx response
      if (res.ok && data.success) {
        setStatus("success");
        setReferenceId(data.referenceId || "CONFIRMED");
        setServerMessage(data.message || "Your inquiry has been received.");
        setErrors({});
        // Focus success container for screen readers
        setTimeout(() => {
          successCardRef.current?.focus();
        }, 50);
      } else {
        // Error state: Honest message, preserve user inputs
        setStatus("error");
        setServerMessage(
          data.error ||
            "An error occurred while submitting your inquiry. Your information has been preserved. Please try again."
        );

        if (data.errors) {
          const serverFieldErrors: FormErrors = {};
          if (data.errors.name) serverFieldErrors.name = data.errors.name[0];
          if (data.errors.phoneOrEmail) serverFieldErrors.phoneOrEmail = data.errors.phoneOrEmail[0];
          if (data.errors.enquiryType) serverFieldErrors.enquiryType = data.errors.enquiryType[0];
          if (data.errors.message) serverFieldErrors.message = data.errors.message[0];
          if (data.errors.consent) serverFieldErrors.consent = data.errors.consent[0];
          setErrors(serverFieldErrors);
        }

        setTimeout(() => {
          errorSummaryRef.current?.focus();
        }, 50);
      }
    } catch {
      setStatus("error");
      setServerMessage(
        "Network connection failed. Your data has not been lost. Please verify your internet connection and try again."
      );
      setTimeout(() => {
        errorSummaryRef.current?.focus();
      }, 50);
    }
  };

  const handleReset = () => {
    setName("");
    setPhoneOrEmail("");
    setEnquiryType("cheque-bounce");
    setMessage("");
    setConsent(false);
    setHoneypot("");
    setErrors({});
    setStatus("idle");
    setServerMessage("");
    setReferenceId("");
    renderedAtRef.current = Date.now();
  };

  // SUCCESS STATE (Rendered ONLY after a 2xx response)
  if (status === "success") {
    return (
      <div
        ref={successCardRef}
        tabIndex={-1}
        role="region"
        aria-label="Inquiry submission confirmation"
        className="border border-line bg-surface p-8 sm:p-10 rounded-[2px] text-center focus:outline-none"
      >
        <div className="w-14 h-14 rounded-full bg-accent/10 border-2 border-accent text-accent flex items-center justify-center mx-auto mb-5">
          <svg
            className="w-7 h-7 stroke-current fill-none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <span className="text-[11px] font-mono text-accent-text uppercase tracking-widest block mb-2 font-semibold">
          Reference &bull; {referenceId}
        </span>

        <h3 className="font-display text-3xl sm:text-4xl text-foreground font-normal mb-3">
          Consultation Inquiry Received
        </h3>

        <p className="text-secondary text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-6">
          {serverMessage}
        </p>

        <div className="p-5 bg-background border border-line text-xs text-secondary text-left rounded-[2px] max-w-md mx-auto mb-8 space-y-2">
          <div className="flex items-center gap-2 text-foreground font-semibold">
            <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
            <span>Next Steps in Chamber Protocol:</span>
          </div>
          <p>
            1. <strong>Conflict Clearance:</strong> Names of parties are cross-referenced against active panel retainers.
          </p>
          <p>
            2. <strong>Direct Communication:</strong> You will receive a response regarding chamber availability within 24 business hours.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center justify-center border border-line text-foreground text-xs font-semibold uppercase tracking-[0.14em] py-3.5 px-6 rounded-[2px] hover:border-foreground hover:bg-surface/80 transition-colors focus-visible:outline-2 focus-visible:outline-foreground"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  // IDLE / SUBMITTING / ERROR STATES
  const isSubmitting = status === "submitting";
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
            disabled={isSubmitting}
            className="w-full h-12 min-h-[48px] inline-flex items-center justify-between px-5 bg-accent text-on-accent text-xs font-semibold uppercase tracking-[0.18em] rounded-[2px] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Transmitting Consultation Inquiry...
              </span>
            ) : (
              <>
                <span>SEND ENQUIRY</span>
                <span className="text-base font-bold">&rarr;</span>
              </>
            )}
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
