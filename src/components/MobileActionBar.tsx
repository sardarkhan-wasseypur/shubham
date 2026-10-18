import React from "react";
import { profile, DEV_TEST_STICKY_BAR, DEV_TEST_NUMBERS } from "@/content/profile";

export function MobileActionBar() {
  const isDevTest = process.env.NODE_ENV !== "production" && DEV_TEST_STICKY_BAR;
  const hasVerifiedPhone = Boolean(profile.phone.verified && profile.phone.value);
  const hasVerifiedWhatsApp = Boolean(profile.whatsApp.verified && profile.whatsApp.value);

  // If no contact numbers are verified and dev test flag is disabled, do not render
  if (!hasVerifiedPhone && !hasVerifiedWhatsApp && !isDevTest) {
    return null;
  }

  const phoneValue = hasVerifiedPhone
    ? profile.phone.value!
    : DEV_TEST_NUMBERS.phone;

  const whatsAppValue = hasVerifiedWhatsApp
    ? profile.whatsApp.value!
    : DEV_TEST_NUMBERS.whatsApp;

  return (
    <aside
      aria-label="Quick Actions"
      className="fixed bottom-0 inset-x-0 z-50 h-[60px] bg-background/95 backdrop-blur-md border-t border-line px-4 flex items-center justify-between gap-3 shadow-2xl md:hidden"
    >
      {/* Phone Call Button */}
      <a
        aria-label="Direct Phone Call"
        href={`tel:${phoneValue}`}
        className="flex-1 h-11 min-h-[44px] bg-transparent border border-line hover:border-foreground text-foreground text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 active:bg-surface transition-colors rounded-[2px]"
      >
        <svg
          className="w-4 h-4 text-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>CALL</span>
      </a>

      {/* WhatsApp Quick Message Button */}
      <a
        aria-label="Send WhatsApp Message"
        href={`https://wa.me/${whatsAppValue.replace(/[^0-9]/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 h-11 min-h-[44px] bg-accent hover:brightness-110 text-on-accent text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 active:brightness-90 transition-colors shadow-sm rounded-[2px]"
      >
        <svg
          className="w-4 h-4 fill-current text-on-accent"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12.031 2C6.516 2 2.024 6.49 2.024 12.007c0 1.942.556 3.754 1.523 5.289L2 22l4.85-1.503a9.98 9.98 0 005.181 1.442c5.515 0 10.007-4.49 10.007-10.007S17.546 2 12.031 2zm5.728 14.15c-.24.673-1.393 1.285-1.928 1.368-.49.076-1.127.108-3.232-.764-2.69-1.114-4.408-3.83-4.542-4.009-.134-.179-1.085-1.446-1.085-2.758 0-1.312.69-1.956.936-2.22.246-.265.541-.33.722-.33.18 0 .362.002.52.01.17.009.397-.064.62.473.23.553.784 1.916.853 2.056.07.14.116.304.023.488-.093.184-.139.299-.276.459-.138.161-.29.359-.414.482-.138.138-.282.288-.121.564.161.276.716 1.18 1.54 1.914 1.058.944 1.95 1.236 2.226 1.374.276.138.437.115.598-.069.161-.184.69-8.05.874-1.08.184-.276.368-.23.62-.138.253.092 1.609.759 1.885.897.276.138.46.207.529.322.069.115.069.667-.171 1.34z" />
        </svg>
        <span>WHATSAPP</span>
      </a>
    </aside>
  );
}
