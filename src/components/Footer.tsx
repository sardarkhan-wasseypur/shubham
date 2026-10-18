"use client";

import React from "react";
import Link from "next/link";
import { Container } from "./Container";
import { practiceNavLinks } from "@/content/navigation";
import { courts } from "@/content/courts";
import { profile } from "@/content/profile";

const CURRENT_YEAR = 2026;

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface text-foreground pt-12 sm:pt-16 pb-24 md:pb-16">
      <Container>
        {/* MOBILE STACKED FOOTER (matching Stitch mobile design) */}
        <div className="md:hidden flex flex-col gap-6 pb-8 border-b border-line">
          {/* Brand mark & title */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 min-w-9 min-h-9 bg-accent flex items-center justify-center font-hero text-on-accent text-lg shadow-sm shrink-0 mt-0.5">
              SS
            </div>
            <div>
              <h4 className="font-display text-xl text-foreground leading-tight">
                Advocate Shubham Singh
              </h4>
              <span className="text-[10px] tracking-wider uppercase text-accent-text block font-mono font-semibold">
                {profile.officeName.value}
              </span>
              <p className="text-xs text-secondary mt-1 leading-relaxed">
                {profile.address.value}
              </p>
              {profile.phone.verified && profile.phone.value && (
                <a
                  href={`tel:${profile.phone.value}`}
                  className="text-xs font-mono text-foreground hover:text-accent-text mt-1.5 inline-block font-medium"
                >
                  Tel: {profile.phone.value}
                </a>
              )}
            </div>
          </div>

          {/* Quick Navigation Groups in 2 columns */}
          <div className="grid grid-cols-2 gap-6 text-xs py-4 border-y border-line">
            <div>
              <span className="text-[10px] uppercase font-mono text-accent-text block mb-2 font-semibold">
                Practice Areas
              </span>
              <ul className="space-y-1.5 text-secondary">
                {practiceNavLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-accent-text block mb-2 font-semibold">
                Legal &amp; Office
              </span>
              <ul className="space-y-1.5 text-secondary">
                <li>
                  <Link href="/about" className="hover:text-foreground transition-colors">
                    Chamber Profile
                  </Link>
                </li>
                <li>
                  <Link href="/professional-experience" className="hover:text-foreground transition-colors">
                    Institutional Panels
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Chamber Consultation
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="hover:text-foreground transition-colors">
                    Disclaimer (Rule 36)
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bar Council Mandatory Disclaimer */}
          <div className="text-[11px] leading-relaxed text-secondary">
            <p className="font-semibold text-foreground/90 mb-1 uppercase font-mono tracking-wider text-[10px]">
              Bar Council of India Disclaimer:
            </p>
            <p>
              As per the rules of the Bar Council of India, advocates are prohibited from soliciting work or advertising in any manner. This platform is meant solely for informational purposes.
            </p>
          </div>
        </div>

        {/* DESKTOP 12-COLUMN FOOTER */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-line">
          {/* Column 1: Brand & Office Address */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-hero text-3xl tracking-wider uppercase text-foreground">
                  SHUBHAM SINGH
                </span>
                <span className="text-[10px] tracking-[0.2em] font-sans text-secondary uppercase font-semibold">
                  ADVOCATE
                </span>
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-accent-text font-semibold block mt-1">
                {profile.officeName.value}
              </span>
              <p className="mt-2 text-xs text-secondary leading-relaxed max-w-sm">
                {profile.address.value}
              </p>
              <p className="mt-1 text-[11px] text-secondary/80">
                Landmarks: Wenger&apos;s &bull; Indian Oil petrol pump &bull; Block A
              </p>
              {profile.phone.verified && profile.phone.value && (
                <div className="mt-2.5">
                  <a
                    href={`tel:${profile.phone.value}`}
                    className="text-xs font-mono text-foreground hover:text-accent-text font-medium"
                  >
                    Tel: {profile.phone.value}
                  </a>
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-line/60">
              <span className="text-label text-accent-text font-semibold uppercase block mb-1">
                Bar Council of India Rule 36
              </span>
              <p className="text-xs text-secondary leading-relaxed">
                This platform is strictly informational and does not solicit work or advertise legal services.
              </p>
            </div>
          </div>

          {/* Column 2: Practice Areas (All 7) */}
          <div className="lg:col-span-3">
            <h3 className="text-label text-foreground uppercase tracking-[0.18em] font-semibold mb-4">
              Practice Areas
            </h3>
            <ul className="space-y-2.5">
              {practiceNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Forums & Courts */}
          <div className="lg:col-span-3">
            <h3 className="text-label text-foreground uppercase tracking-[0.18em] font-semibold mb-4">
              Judicial Forums
            </h3>
            <ul className="space-y-2.5">
              {courts.map((court) => (
                <li key={court.id} className="text-sm text-secondary">
                  <span className="block text-foreground">{court.name}</span>
                  <span className="text-xs text-secondary">{court.jurisdiction}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Consultation & Office Standing */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <h3 className="text-label text-foreground uppercase tracking-[0.18em] font-semibold mb-4">
                Consultation
              </h3>
              <p className="text-xs text-secondary leading-relaxed mb-4">
                Formal legal consultations require prior appointment and conflict clearance.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center text-xs uppercase tracking-[0.14em] font-semibold text-accent-text hover:underline"
              >
                Inquire Online &rarr;
              </Link>
            </div>

            <div className="mt-6 pt-4 border-t border-line/60">
              <span className="text-[10px] uppercase tracking-wider text-secondary block font-semibold">
                Bar Standing
              </span>
              <span className="text-xs font-mono text-foreground font-medium block">
                {profile.barEnrolment.value}
              </span>
              <span className="text-[11px] text-secondary mt-0.5 block">
                New Delhi, India
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-secondary">
          <p>
            &copy; {CURRENT_YEAR} Advocate Shubham Singh &bull; {profile.officeName.value}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/disclaimer"
              className="hover:text-foreground transition-colors"
            >
              Disclaimer
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
