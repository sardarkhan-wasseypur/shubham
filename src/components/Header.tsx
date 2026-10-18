"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle, SegmentedThemeSwitch } from "./ThemeToggle";
import { headerNavLinks } from "@/content/navigation";
import { Button } from "./Button";

const mobileNavLinks = [
  { num: "01", label: "HOME", href: "/" },
  { num: "02", label: "PRACTICE AREAS", href: "/practice-areas" },
  { num: "03", label: "EXPERIENCE", href: "/professional-experience" },
  { num: "04", label: "INSIGHTS", href: "/legal-insights" },
  { num: "05", label: "CONTACT", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close mobile menu on route change during render (official React pattern for adjusting state when prop changes)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
  }

  // Ensure body scroll is unlocked whenever pathname updates
  useEffect(() => {
    document.body.style.overflow = "";
  }, [pathname]);


  // Header becomes solid with a hairline border after 8px scroll (passive listener)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      // Auto-focus the close button on open
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Focus trap & Escape key listener for mobile menu
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (e.key === "Tab") {
        const modal = mobileMenuRef.current;
        if (!modal) return;

        const focusables = modal.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => {
      const next = !prev;
      if (!next) {
        menuButtonRef.current?.focus();
      }
      return next;
    });
  };

  return (
    <>
      {/* Accessible Skip Link for keyboard navigation */}
      <a
        href="#main-content"
        className="fixed -top-32 left-4 z-[100] px-4 py-2.5 bg-accent text-on-accent font-medium text-sm shadow-xl outline-2 outline-offset-2 outline-foreground rounded-[2px] transition-all duration-200 focus:top-4"
      >
        Skip to main content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 animate-header-down transition-colors duration-250 ${
          isScrolled
            ? "bg-surface/95 backdrop-blur-md border-b border-line shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="w-full max-w-[1680px] mx-auto px-[clamp(16px,4vw,64px)] h-16 min-[1100px]:h-20 flex items-center justify-between">
          {/* Left: Red square "SS" monogram (40px) + Wordmark "Shubham Singh" */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-foreground rounded-[2px] whitespace-nowrap shrink-0"
          >
            {/* 40x40 Red Square SS Monogram */}
            <div className="w-10 h-10 min-w-10 min-h-10 bg-accent text-on-accent font-hero text-2xl flex items-center justify-center rounded-[1px] select-none tracking-wider pt-0.5 shadow-sm group-hover:brightness-95 transition-all">
              SS
            </div>
            {/* Wordmark and tiny tracked subtitle (collapses on very small screens < 360px to guarantee 0 overflow) */}
            <div className="hidden xs:flex flex-col justify-center">
              <span className="font-display text-xl sm:text-2xl font-medium tracking-wide text-foreground leading-none whitespace-nowrap group-hover:text-accent-text transition-colors duration-200">
                Shubham Singh
              </span>
              <span className="font-sans text-[10px] tracking-[0.25em] text-secondary uppercase font-semibold leading-none mt-1 whitespace-nowrap">
                ADVOCATE &bull; DELHI
              </span>
            </div>
          </Link>

          {/* Centre & Right: Full Nav shown from 1100px up (single non-wrapping row) */}
          <div className="hidden min-[1100px]:flex items-center gap-8 lg:gap-10 shrink-0">
            {/* Nav links: Tracked uppercase Inter 12px, equal 28px gaps, red underline on active item, underline-draw hover */}
            <nav
              aria-label="Main Navigation"
              className="flex items-center gap-[28px]"
            >
              {headerNavLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-sans text-[12px] uppercase tracking-[0.14em] font-medium whitespace-nowrap py-1 relative transition-colors duration-200 ${
                      isActive
                        ? "text-accent-text border-b-2 border-accent pb-0.5"
                        : "text-secondary hover:text-foreground after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-accent after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right actions: 40x40 ThemeToggle + Solid red "Get in Touch" button */}
            <div className="flex items-center gap-4 shrink-0">
              <ThemeToggle />
              <Button
                variant="solid-red"
                href="/contact"
                className="whitespace-nowrap shrink-0 px-5 py-2.5 text-[12px]"
              >
                Get in Touch
              </Button>
            </div>
          </div>

          {/* Below 1100px: Show ONLY Theme Toggle (40x40) and Hamburger (40x40) */}
          <div className="flex min-[1100px]:hidden items-center gap-2.5 sm:gap-3 shrink-0">
            <ThemeToggle />

            <button
              ref={menuButtonRef}
              type="button"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              className="w-10 h-10 min-w-10 min-h-10 flex flex-col items-center justify-center gap-1.5 border border-line bg-surface text-foreground rounded-[2px] hover:border-foreground transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-foreground shrink-0"
            >
              <span className="w-5 h-[1.5px] bg-foreground transition-transform" />
              <span className="w-3.5 h-[1.5px] bg-foreground self-end mr-2.5 transition-transform" />
              <span className="w-5 h-[1.5px] bg-foreground transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Menu matching Stitch screen (Hidden on 1100px+) */}
      <div
        ref={mobileMenuRef}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-hidden={!isMobileMenuOpen}
        aria-label="Navigation Menu"
        className={`fixed inset-0 z-50 bg-background text-foreground overflow-y-auto min-[1100px]:hidden flex flex-col justify-between transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto visible"
            : "opacity-0 -translate-y-4 pointer-events-none invisible"
        }`}
      >
        {/* TOP HEADER / CHROME matching Stitch */}
        <div className="w-full px-5 pt-6 pb-4 flex items-center justify-between border-b border-line shrink-0">
          {/* Red SS Monogram + Chamber Navigation */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 min-w-9 min-h-9 bg-accent text-on-accent flex items-center justify-center font-hero text-xl tracking-wider shadow-sm">
              SS
            </div>
            <div className="flex flex-col">
              <span className="font-hero text-[15px] tracking-widest text-foreground leading-none">
                SHUBHAM SINGH
              </span>
              <span className="text-[9px] uppercase tracking-[0.22em] text-secondary font-medium mt-0.5">
                CHAMBER NAVIGATION
              </span>
            </div>
          </div>

          {/* Close button with square X container */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              menuButtonRef.current?.focus();
            }}
            aria-label="Close menu"
            className="flex items-center gap-2 py-2 px-3 text-foreground hover:text-accent-text transition-colors focus-visible:outline-2 focus-visible:outline-foreground min-h-[44px]"
          >
            <span className="text-[12px] font-semibold tracking-[0.25em] uppercase text-foreground">
              CLOSE
            </span>
            <div className="w-7 h-7 rounded-none border border-line flex items-center justify-center text-sm">
              <svg
                className="w-3.5 h-3.5 stroke-current fill-none"
                viewBox="0 0 16 16"
                strokeWidth="1.75"
                strokeLinecap="square"
                aria-hidden="true"
              >
                <path d="M3 3L13 13M13 3L3 13" />
              </svg>
            </div>
          </button>
        </div>

        {/* MAIN NAVIGATION LINKS matching Stitch */}
        <div className="flex-1 flex flex-col justify-center px-6 py-6">
          <div className="mb-3">
            <span className="text-[10px] tracking-[0.28em] text-accent-text font-semibold uppercase flex items-center gap-2">
              <span className="inline-block w-4 h-[1px] bg-accent" />
              INDEX &amp; DIRECTORY
            </span>
          </div>

          <nav className="flex flex-col" aria-label="Mobile Navigation Links">
            {mobileNavLinks.map((link, idx) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    menuButtonRef.current?.focus();
                  }}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${idx * 40 + 60}ms` : "0ms",
                  }}
                  className={`group py-4 border-b border-line flex items-baseline justify-between transition-all duration-300 min-h-[56px] ${
                    isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                  }`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-hero text-[17px] text-accent tracking-wider w-6">
                      {link.num}
                    </span>
                    <span
                      className={`font-display text-[34px] xs:text-[38px] sm:text-[40px] font-medium leading-none tracking-tight transition-colors ${
                        isActive ? "text-accent-text" : "text-foreground group-hover:text-accent-text"
                      }`}
                    >
                      {link.label}
                    </span>
                  </div>
                  <span className="text-secondary text-xs font-mono group-hover:text-accent-text group-hover:translate-x-1 transition-transform">
                    &rarr;
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM UTILITY & FOOTER AREA matching Stitch */}
        <div className="w-full px-6 pt-5 pb-8 border-t border-line bg-surface/95 flex flex-col gap-4 shrink-0">
          {/* GET IN TOUCH Button */}
          <Link
            href="/contact"
            onClick={() => {
              setIsMobileMenuOpen(false);
              menuButtonRef.current?.focus();
            }}
            className="w-full bg-accent hover:brightness-110 text-on-accent py-3.5 px-5 flex items-center justify-between font-semibold text-xs tracking-[0.2em] uppercase transition-colors shadow-sm min-h-[48px]"
          >
            <span>GET IN TOUCH</span>
            <span className="font-mono text-sm leading-none">&rarr;</span>
          </Link>

          {/* Theme Switch & Subtitle Bar */}
          <div className="flex items-center justify-between pt-1 text-[11px]">
            <SegmentedThemeSwitch />

            {/* Line: Advocate · Delhi, India */}
            <div className="text-right">
              <span className="text-secondary font-display italic text-[15px] tracking-wide">
                Advocate &bull; Delhi, India
              </span>
            </div>
          </div>

          {/* Chamber Registration Micro-Note */}
          <div className="pt-2 border-t border-line/60 flex items-center justify-between text-[9px] text-secondary font-mono tracking-wider">
            <span>CHAMBER OF ADV. SHUBHAM SINGH</span>
            <span>NEW DELHI</span>
          </div>
        </div>
      </div>
    </>
  );
}
