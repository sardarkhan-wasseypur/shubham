# PROJECT RULES
Client: Advocate Shubham Singh, Delhi, India. Informational website. It must follow Bar Council of India advertising restrictions: no solicitation, no superlatives, no outcome promises, no "best/No.1", no testimonials.

VERIFIED CONTENT ONLY
- Courts: Supreme Court of India, Delhi High Court, District Courts, Commissions and Tribunals.
- Practice areas: Criminal Law, Civil Law, Matrimonial Law, Family Matters, Trademark Law, Cheque Bounce Matters.
- Current appointments: Panel Counsel for Union of India, State of Uttar Pradesh, DMRC.
- FORMER: Panel Counsel for Muthoot Finance; Legal Advisor for UP Madarsa Board.
- Photo: /public/images/advocate-portrait.jpg (client-provided).
- Everything else is UNVERIFIED: experience years, education, bar enrolment, phone, WhatsApp, address, bio, awards, stats, reviews, social links, office hours.
- Emails are pending: "Thevidhikars@gmail.com" and "Lawofficeofshubhamsingh@gmai.com" (probable typo: gmai.com). Never show either publicly.

CODE RULES
- Next.js App Router, TypeScript strict, Tailwind, server components by default, client components only for interactivity.
- All content lives in /src/content as typed data. Unverified fields use the type Field<T> = { value: T | null; verified: boolean }. The UI renders a field only when verified === true and value is non-null; otherwise it renders nothing (no placeholders on the live site).
- Never invent facts, numbers, quotes, case studies or credentials.
- No "#" links. Every link must point to a real route or be hidden.
- Never claim a test passed unless you ran it.

THEMING (light and dark are both first-class)
- All colours come from semantic CSS variables. Components use semantic Tailwind colours (bg-background, bg-surface, text-foreground, text-secondary, border-line, bg-accent, text-accent-text, text-on-accent) and never hard-coded hex.
- DARK (primary look): background #0A0A0A, surface #141414, foreground #F7F5F0, secondary #A3A09A, line #2A2A2A, accent #C8102E, accent-text #FF5A6E, on-accent #FFFFFF.
- LIGHT: background #FFFFFF, surface #F4F3F0, foreground #0A0A0A, secondary #5A5A5A, line #E2E0DC, accent #C8102E, accent-text #B00D26, on-accent #FFFFFF.
- Red (accent) is for solid blocks, rules, buttons and large display text. Small red text uses accent-text.
- Every text/background pair must meet WCAG AA in both themes.
- The hero follows the theme (dark scrim in dark mode, white scrim in light mode). Photographs are never inverted or recoloured.
FONTS (next/font): Bebas Neue (hero name and big numerals only), Cormorant Garamond (nav labels, italic taglines, section headings), Inter (body and UI).
STYLE: editorial, high-contrast, hairline borders, 0-2px radius, no gradients except the hero photo scrim, no glassmorphism, no icon cards, no gavel/scales/courthouse stock imagery, no heavy shadows, no pure #000 or pure #FFF for text on dark.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
