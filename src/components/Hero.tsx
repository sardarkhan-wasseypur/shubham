"use client";

import React from "react";
import Image from "next/image";
import { profile } from "@/content/profile";
import { courts } from "@/content/courts";
import { practiceAreas } from "@/content/practiceAreas";
import { currentAppointments } from "@/content/appointments";
import { Button } from "./Button";
import { Ticker } from "./Ticker";

export const heroTickerItems = [
  "SUPREME COURT OF INDIA",
  "DELHI HIGH COURT",
  "DISTRICT COURTS",
  "COMMISSIONS & TRIBUNALS",
  "PANEL COUNSEL: UNION OF INDIA",
  "PANEL COUNSEL: STATE OF U.P.",
  "PANEL COUNSEL: DMRC",
  "CRIMINAL LAW",
  "CIVIL LAW",
  "MATRIMONIAL LAW",
  "FAMILY MATTERS",
  "TRADEMARK LAW",
  "CHEQUE BOUNCE MATTERS",
];

export function Hero() {
  const isPhotoVerified = Boolean(profile.photo.verified && profile.photo.value);
  const photoSrc = profile.photo.value || "";

  // Dynamically computed stats - never hardcoded
  const courtCount = String(courts.length).padStart(2, "0");
  const practiceCount = String(practiceAreas.length).padStart(2, "0");
  const appointmentCount = String(currentAppointments.length).padStart(2, "0");

  const tickerItems = heroTickerItems;

  return (
    <section className="relative w-full min-h-[92vh] lg:h-screen lg:min-h-[640px] lg:max-h-screen flex flex-col justify-between pt-16 sm:pt-20 md:pt-24 lg:pt-20 border-b border-line overflow-hidden bg-background">
      {/* 1. MOBILE HERO PHOTO: top background fade matching Stitch mobile screenshot */}
      {isPhotoVerified && (
        <div className="md:hidden absolute inset-x-0 top-0 h-[60%] sm:h-[64%] z-0 overflow-hidden pointer-events-none">
          <div className="relative w-full h-full animate-hero-photo">
            <Image
              src={photoSrc}
              alt="Portrait of Advocate Shubham Singh in advocate's robes"
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover object-[center_18%] filter contrast-[1.08] brightness-[0.88] dark:brightness-[0.78]"
            />
          </div>
          {/* Scrim gradient blending into theme background */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background"
            aria-hidden="true"
          />
        </div>
      )}

      {/* 1. DESKTOP HERO PHOTO: right bleed matching Stitch desktop reference & pradeeprai.com */}
      <div
        data-portrait-container="true"
        className="hidden md:block absolute top-0 right-0 w-full md:w-[50%] lg:w-[48%] xl:w-[46%] h-full pointer-events-none z-0 overflow-hidden"
      >
        {isPhotoVerified ? (
          <>
            <div className="relative w-full h-full animate-hero-photo">
              <Image
                src={photoSrc}
                alt="Portrait of Advocate Shubham Singh in advocate's robes"
                fill
                priority
                quality={92}
                sizes="(max-width: 1024px) 60vw, 46vw"
                className="object-cover object-[center_20%] filter contrast-[1.08] brightness-[0.88] dark:brightness-[0.78]"
              />
            </div>
            {/* Scrim blending smoothly into background without cutting the face */}
            <div
              className="absolute inset-y-0 left-0 w-2/5 md:w-1/2 bg-gradient-to-r from-background via-background/80 to-transparent"
              aria-hidden="true"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-2/5 md:h-1/2 bg-gradient-to-t from-background via-background/85 to-transparent"
              aria-hidden="true"
            />
            <div
              className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background/70 to-transparent"
              aria-hidden="true"
            />
          </>
        ) : (
          <div
            className="w-full h-full border-l border-line opacity-40 bg-[linear-gradient(to_right,var(--line)_1px,transparent_1px),linear-gradient(to_bottom,var(--line)_1px,transparent_1px)] bg-[size:40px_40px]"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Mobile spacer to reveal advocate portrait */}
      <div className="md:hidden h-[24vh] xs:h-[26vh] sm:h-[28vh] pointer-events-none" />

      {/* 2. HERO CONTENT CONTAINER (Matches wide 1680px layout) */}
      <div className="relative z-10 w-full max-w-[1680px] mx-auto px-[clamp(16px,4vw,64px)] flex-1 flex flex-col justify-end md:justify-center py-4 md:py-2 lg:py-4">
        {/* Eyebrow: red rule grows from width 0 (500ms), text fades in */}
        <div className="flex items-center gap-2.5 sm:gap-4 mb-2.5 sm:mb-4">
          <span
            className="w-5 sm:w-8 h-[1.5px] sm:h-[2px] bg-accent origin-left animate-eyebrow-rule shrink-0"
            aria-hidden="true"
          />
          <p className="font-sans text-[11px] sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent-text animate-eyebrow-text">
            ADVOCATE &bull; DELHI, INDIA
            <span className="hidden sm:inline"> &bull; SUPREME COURT &amp; HIGH COURT</span>
          </p>
        </div>

        {/* Name & ADV Block: Single semantic H1 with responsive desktop/mobile presentations */}
        <h1 className="mb-4 sm:mb-6 select-none">
          {/* Desktop Layout (>= 768px): SHUBHAM on line 1, SINGH + Red ADV Block on line 2 (matching pradeeprai.com & Stitch) */}
          <span className="hidden md:flex flex-col leading-[0.82] tracking-tight">
            <span className="overflow-hidden block">
              <span className="block font-hero text-[clamp(4.5rem,min(11vw,14vh),8.5rem)] text-foreground transform-gpu animate-hero-name-1 uppercase">
                SHUBHAM
              </span>
            </span>

            <span className="overflow-hidden block">
              <span className="flex items-center gap-3 sm:gap-4 md:gap-5 transform-gpu animate-hero-name-2">
                <span className="font-hero text-[clamp(4.5rem,min(11vw,14vh),8.5rem)] text-foreground uppercase">
                  SINGH
                </span>

                {/* Red vertical block with rotated "ADV." right beside SINGH */}
                <span
                  className="w-10 sm:w-12 lg:w-14 h-[clamp(2.75rem,min(8vw,11vh),6.8rem)] bg-accent rounded-[1px] flex items-center justify-center relative shadow-sm animate-hero-adv-block shrink-0"
                  aria-hidden="true"
                >
                  <span
                    className="font-hero text-xs sm:text-sm lg:text-base text-on-accent tracking-[0.25em] uppercase select-none animate-hero-adv-text"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                  >
                    ADV.
                  </span>
                </span>
              </span>
            </span>
          </span>

          {/* Mobile Layout (< 768px): 2-line Bebas Name + inline red ADV badge (matching previous Stitch mobile screenshot) */}
          <span className="flex md:hidden flex-col font-hero text-[clamp(3.1rem,16.5vw,5rem)] leading-[0.88] tracking-tight text-foreground uppercase m-0">
            <span className="block">SHUBHAM</span>
            <span className="flex items-center gap-2.5 sm:gap-3">
              <span>SINGH</span>
              <span className="bg-accent text-on-accent font-hero text-xs sm:text-sm tracking-wider px-2 py-1 flex items-center justify-center uppercase self-center shadow-sm rounded-[1px]">
                ADV.
              </span>
            </span>
          </span>
        </h1>

        {/* Lower Content Grid: Left Narrative + Right Stat Blocks (matching Stitch & pradeeprai.com) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-end">
          {/* Bottom-Left Narrative & Panel Counsel Notice */}
          <div className="md:col-span-7 lg:col-span-6 flex flex-col justify-end animate-hero-tagline">
            <p className="font-sans text-[10px] sm:text-[12px] font-semibold tracking-[0.16em] text-secondary uppercase mb-1 sm:mb-2">
              PANEL COUNSEL &bull; UNION OF INDIA &bull; STATE OF UTTAR PRADESH &bull; DMRC
            </p>
            <p className="font-display italic text-base sm:text-xl lg:text-2xl text-secondary leading-snug mb-3 sm:mb-4 max-w-xl">
              Criminal, civil, matrimonial, family, trademark and cheque bounce matters.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-4 mb-4 md:mb-0 animate-hero-cta">
              {/* Mobile: Full-width button with arrow */}
              <Button
                variant="solid-red"
                href="/contact"
                className="w-full sm:w-auto h-11 sm:h-11 flex items-center justify-between sm:justify-center px-6 font-semibold text-xs tracking-[0.18em]"
              >
                <span>GET IN TOUCH</span>
                <span className="sm:hidden text-base font-bold">&rarr;</span>
              </Button>
              {/* Secondary text link or button */}
              <div className="flex items-center justify-between sm:justify-start gap-4">
                <div className="hidden sm:inline-flex">
                  <Button
                    variant="outline"
                    href="/practice-areas"
                    className="h-11 px-6 text-xs uppercase tracking-[0.14em]"
                  >
                    Explore Practice Areas
                  </Button>
                </div>
                <a
                  href="/practice-areas"
                  className="sm:hidden inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-semibold text-secondary hover:text-foreground pt-1"
                >
                  <span>Explore Practice Areas</span>
                  <span className="text-accent text-sm">&rarr;</span>
                </a>
                {/* Micro Scroll Indicator on mobile */}
                <div className="sm:hidden flex items-center gap-2 text-secondary font-mono text-[9px] tracking-[0.25em] uppercase">
                  <span>SCROLL</span>
                  <span className="w-8 h-[1px] bg-line" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom-Right: 3 Stat Blocks (matching pradeeprai.com & Stitch desktop screenshot) */}
          <div className="hidden md:flex md:col-span-4 lg:col-span-5 items-end gap-6 lg:gap-8 pb-1 animate-hero-stats">
            <div className="flex flex-col border-l border-line pl-4 lg:pl-5">
              <span className="font-hero text-4xl lg:text-5xl leading-none text-foreground">
                {courtCount}
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-secondary mt-1 whitespace-nowrap font-medium">
                Courts &amp; Forums
              </span>
            </div>

            <div className="flex flex-col border-l border-line pl-4 lg:pl-5">
              <span className="font-hero text-4xl lg:text-5xl leading-none text-foreground">
                {practiceCount}
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-secondary mt-1 whitespace-nowrap font-medium">
                Practice Areas
              </span>
            </div>

            <div className="flex flex-col border-l border-line pl-4 lg:pl-5">
              <span className="font-hero text-4xl lg:text-5xl leading-none text-foreground">
                {appointmentCount}
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-secondary mt-1 whitespace-nowrap font-medium">
                Panel Roles
              </span>
            </div>
          </div>

          {/* Far Right: Vertical Scroll Indicator (Desktop only) */}
          <div
            className="hidden xl:flex md:col-span-1 flex-col items-center justify-end pb-2 text-secondary font-mono text-[9px] tracking-[0.25em] uppercase select-none"
            aria-hidden="true"
          >
            <span style={{ writingMode: "vertical-rl" }}>SCROLL</span>
            <div className="w-[1.5px] h-8 bg-line relative overflow-hidden mt-2">
              <div className="w-full h-full bg-accent animate-scroll-line" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. CONTINUOUS ANIMATED TICKER STRIP */}
      <div className="relative z-20 w-full border-t border-line bg-surface overflow-hidden py-2.5 sm:py-3 animate-hero-ticker">
        <Ticker items={tickerItems} speedSeconds={34} />
      </div>

      {/* Mobile 3-Column Stats Row with Vertical Hairlines matching Stitch */}
      <div className="md:hidden grid grid-cols-3 border-t border-line bg-surface z-20">
        <div className="p-3 sm:p-4 flex flex-col justify-center items-center text-center border-r border-line">
          <span className="font-hero text-3xl sm:text-4xl text-foreground leading-none">
            {courtCount}
          </span>
          <span className="text-[10px] tracking-wider uppercase text-secondary mt-1 leading-tight font-medium">
            Courts &amp; Forums
          </span>
        </div>
        <div className="p-3 sm:p-4 flex flex-col justify-center items-center text-center border-r border-line">
          <span className="font-hero text-3xl sm:text-4xl text-foreground leading-none">
            {practiceCount}
          </span>
          <span className="text-[10px] tracking-wider uppercase text-secondary mt-1 leading-tight font-medium">
            Practice Areas
          </span>
        </div>
        <div className="p-3 sm:p-4 flex flex-col justify-center items-center text-center">
          <span className="font-hero text-3xl sm:text-4xl text-foreground leading-none">
            {appointmentCount}
          </span>
          <span className="text-[10px] tracking-wider uppercase text-secondary mt-1 leading-tight font-medium">
            Panel Roles
          </span>
        </div>
      </div>
    </section>
  );
}
