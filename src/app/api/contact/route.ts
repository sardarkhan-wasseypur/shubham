import { NextRequest, NextResponse } from "next/server";
import {
  contactSchema,
  sanitizeInput,
  sanitizeMultiline,
  ENQUIRY_TYPE_LABELS,
  EnquiryType,
} from "@/lib/contactSchema";

// Rate limiting in-memory store
// Maps IP to { count: number, resetAt: number }
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Clean up stale rate limit entries periodically
function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}

// Method not allowed helper for all non-POST methods
function methodNotAllowed() {
  return NextResponse.json(
    { success: false, error: "Method not allowed. The contact endpoint accepts POST requests only." },
    {
      status: 405,
      headers: {
        Allow: "POST",
      },
    }
  );
}

export async function GET() {
  return methodNotAllowed();
}

export async function PUT() {
  return methodNotAllowed();
}

export async function DELETE() {
  return methodNotAllowed();
}

export async function PATCH() {
  return methodNotAllowed();
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP Identification & Rate Limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const clientIp = forwarded ? forwarded.split(",")[0].trim() : realIp || "127.0.0.1";

    cleanupRateLimitStore();

    const now = Date.now();
    const existingLimit = rateLimitMap.get(clientIp);

    if (existingLimit && now < existingLimit.resetAt) {
      if (existingLimit.count >= MAX_REQUESTS_PER_WINDOW) {
        const retryAfterSeconds = Math.ceil((existingLimit.resetAt - now) / 1000);
        return NextResponse.json(
          {
            success: false,
            error: "Too many consultation inquiries submitted from this connection. Please wait before submitting again.",
          },
          {
            status: 429,
            headers: {
              "Retry-After": String(retryAfterSeconds),
            },
          }
        );
      }
      existingLimit.count += 1;
    } else {
      rateLimitMap.set(clientIp, {
        count: 1,
        resetAt: now + RATE_LIMIT_WINDOW_MS,
      });
    }

    // 2. Parse JSON payload
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Malformed request body." },
        { status: 400 }
      );
    }

    const payload = body as Record<string, unknown>;

    // 3. Honeypot Check (Must remain blank)
    const honeypotVal = (payload.honeypot || payload.website || payload.b_fax_number || "") as string;
    if (honeypotVal && honeypotVal.trim().length > 0) {
      // Bot trapped in honeypot
      return NextResponse.json(
        { success: false, error: "Bot activity detected. Submission rejected." },
        { status: 400 }
      );
    }

    // 4. Timing Check (Must take at least 2 seconds between render and submit)
    const renderedAt = typeof payload.renderedAt === "number" ? payload.renderedAt : 0;
    if (!renderedAt || now - renderedAt < 2000) {
      return NextResponse.json(
        {
          success: false,
          error: "Submission completed too quickly. Please take a moment to verify your inquiry details before submitting.",
        },
        { status: 400 }
      );
    }

    // 5. Server-side validation using Zod
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          success: false,
          error: "Validation error. Please review the highlighted fields.",
          errors: fieldErrors,
        },
        { status: 400 }
      );
    }

    const validatedData = parsed.data;

    // 6. Input Sanitization
    const sanitizedName = sanitizeInput(validatedData.name);
    const sanitizedContact = sanitizeInput(
      validatedData.phoneOrEmail || validatedData.email || validatedData.phone || ""
    );
    const sanitizedMessage = sanitizeMultiline(validatedData.message);
    const enquiryLabel = ENQUIRY_TYPE_LABELS[validatedData.enquiryType as EnquiryType];

    // PRIVACY REQUIREMENT: Do NOT log message contents to the console or server logs
    console.info(
      `[Contact Inquiry Received] Type: "${validatedData.enquiryType}" | Client IP: ${clientIp} | Timestamp: ${new Date().toISOString()}`
    );

    // 7. Email Provider Resolution & Sending
    const emailProvider = process.env.EMAIL_PROVIDER?.toLowerCase();
    const resendApiKey = process.env.RESEND_API_KEY;
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    const referenceId = `INQ-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // Case A: Mock Provider (Used for verified testing and staging)
    if (emailProvider === "mock" || process.env.NODE_ENV === "test") {
      // Simulate successful dispatch
      return NextResponse.json({
        success: true,
        referenceId,
        message: "Inquiry received and queued for chamber conflict review.",
      });
    }

    // Case B: Resend Provider via HTTP REST API
    if (resendApiKey) {
      const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || "thevidhikars@gmail.com";
      const fromEmail = process.env.CONTACT_FROM_EMAIL || "Chamber Consultation <onboarding@resend.dev>";

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px;">
          <h2 style="color: #C8102E; margin-top: 0; border-bottom: 2px solid #C8102E; padding-bottom: 8px;">
            New Chamber Consultation Inquiry
          </h2>
          <p><strong>Reference ID:</strong> ${referenceId}</p>
          <p><strong>Full Name:</strong> ${sanitizedName}</p>
          <p><strong>Contact Method (Email/Phone):</strong> ${sanitizedContact}</p>
          <p><strong>Enquiry Classification:</strong> ${enquiryLabel}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <h3 style="color: #333; margin-bottom: 6px;">Message Summary:</h3>
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 3px solid #C8102E; white-space: pre-wrap;">
${sanitizedMessage}
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 11px; color: #777;">
            <strong>Statutory Compliance:</strong> This inquiry was voluntarily submitted via the web consultation desk. In accordance with Bar Council of India Rule 36, receipt of this inquiry does not constitute legal retention or create an advocate-client relationship until formal conflict clearance and execution of a Vakalatnama.
          </p>
        </div>
      `;

      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: recipientEmail,
          subject: `[Consultation Inquiry - ${referenceId}] ${enquiryLabel} - ${sanitizedName}`,
          html: emailHtml,
        }),
      });

      if (!resendRes.ok) {
        const errorData = await resendRes.text();
        console.error("[Email Delivery Error via Resend]", errorData);
        return NextResponse.json(
          {
            success: false,
            error: "Unable to dispatch consultation notification through email service. Please contact the chamber directly.",
          },
          { status: 502 }
        );
      }

      return NextResponse.json({
        success: true,
        referenceId,
        message: "Your inquiry has been successfully transmitted for preliminary conflict evaluation.",
      });
    }

    // Case C: SMTP Configuration
    if (smtpHost && smtpUser && smtpPass) {
      // SMTP is indicated; in a serverless environment or without nodemailer installed,
      // return error if missing transport, or handle accordingly.
      return NextResponse.json(
        {
          success: false,
          error: "SMTP transport not initialized. Please configure RESEND_API_KEY for direct HTTP delivery.",
        },
        { status: 503 }
      );
    }

    // Case D: STRICT REQUIREMENT: If env vars are missing, return a clear error and NEVER show success
    return NextResponse.json(
      {
        success: false,
        error:
          "The consultation inquiry email dispatch service is currently unconfigured (missing RESEND_API_KEY or EMAIL_PROVIDER env vars). The chamber cannot receive web messages until this is configured.",
      },
      { status: 503 }
    );
  } catch (err: unknown) {
    console.error("[Contact API Internal Error]", err instanceof Error ? err.message : String(err));
    return NextResponse.json(
      {
        success: false,
        error: "An internal server error occurred while processing your consultation request. Please try again later.",
      },
      { status: 500 }
    );
  }
}
