import { hasVerifiedGalleryItems } from "./gallery";
import { NavLink } from "./types";

export interface NavItem extends NavLink {
  requiresVerification?: boolean;
}

export const baseNavLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Practice Areas", href: "/practice-areas" },
  { label: "Experience", href: "/professional-experience" },
  { label: "Gallery", href: "/gallery", requiresVerification: true },
  { label: "Insights", href: "/legal-insights" },
  { label: "Contact", href: "/contact" },
];

export const practiceNavLinks: NavLink[] = [
  { label: "Criminal Law", href: "/criminal-lawyer-delhi" },
  { label: "Civil Law", href: "/civil-lawyer-delhi" },
  { label: "Matrimonial Matters", href: "/matrimonial-lawyer-delhi" },
  { label: "Family Matters", href: "/family-lawyer-delhi" },
  { label: "Trademark & IP", href: "/trademark-lawyer-delhi" },
  { label: "Cheque Bounce Matters", href: "/cheque-bounce-lawyer-delhi" },
  { label: "NCMEI Matters", href: "/ncmei-matters-lawyer-delhi" },
];

/**
 * Single source of truth helper that returns visible navigation links.
 * Hides a link only when its page has no verified content (Gallery needs at least 1 verified photo).
 * Automatically numbers entries (01, 02, ...) and maintains correct sequence.
 */
export function getVisibleNav(): Array<NavLink & { num: string }> {
  const hasGallery = hasVerifiedGalleryItems();

  return baseNavLinks
    .filter((item) => {
      if (item.requiresVerification && item.href.includes("gallery")) {
        return hasGallery;
      }
      return true;
    })
    .map((item, index) => ({
      label: item.label,
      href: item.href,
      num: String(index + 1).padStart(2, "0"),
    }));
}

export function getVisibleHeaderNav(): NavLink[] {
  return getVisibleNav().map(({ label, href }) => ({ label, href }));
}

export const headerNavLinks: NavLink[] = getVisibleHeaderNav();

export function getVisibleFooterNav(): NavLink[] {
  const hasGallery = hasVerifiedGalleryItems();
  const footerLinks: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Practice Areas", href: "/practice-areas" },
    { label: "Experience", href: "/professional-experience" },
    { label: "Gallery", href: "/gallery", requiresVerification: true },
    { label: "Legal Insights", href: "/legal-insights" },
    { label: "Contact", href: "/contact" },
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ];
  return footerLinks
    .filter((item) => {
      if (item.requiresVerification && item.href.includes("gallery")) {
        return hasGallery;
      }
      return true;
    })
    .map(({ label, href }) => ({ label, href }));
}

export const footerNavLinks: NavLink[] = getVisibleFooterNav();
