# Stitch Design Reference Notes

Analysis of exported screens from Stitch project `Advocate Shubham Singh` (`projects/4634545418169231620`) across dark (primary look) and light modes.

---

## 1. Grid & Layout Columns

- **Desktop Grid (1440px max-width canvas)**:
  - 12-column asymmetric grid layout.
  - Column breakdown in Hero:
    - 7 to 8 columns dedicated to the massive typographic name, credential markers, and value proposition.
    - 4 to 5 columns dedicated to the vertical advocate portrait frame and empanelment badge.
  - Practice Area & Docket Sections:
    - 4-column layout for overview statistics and section labels.
    - 8-column layout for detailed numbered practice rows and court lists.
- **Mobile Grid (390px viewport)**:
  - Single column linear vertical stack.
  - Outer horizontal padding: `16px` to `24px` (`px-4` to `px-6`).
  - Strict horizontal hairline dividers separating each narrative block.

---

## 2. Spacing Scale

*(Values marked with ~ are estimated from Stitch export)*

- **Section Spacing (`section-y`)**:
  - Desktop: `~80px` to `~144px` (`py-20` to `py-36`), mapped to fluid token `clamp(5rem, 10vw, 9rem)`.
  - Mobile: `~48px` to `~64px` (`py-12` to `py-16`).
- **Component Gutters**:
  - Large gap: `~32px` to `~48px` (`gap-8` to `gap-12`) between primary structural columns.
  - Medium gap: `~16px` to `~24px` (`gap-4` to `gap-6`) between cards and list items.
  - Micro gap: `~8px` to `~12px` (`gap-2` to `gap-3`) between labels, icons, and inline badges.
- **Container**:
  - Desktop Max Width: `1440px` (`max-w-[1440px]`).
  - Side padding: fluid `clamp(1rem, 3.5vw, 2.5rem)` (`16px` mobile to `40px` wide desktop).

---

## 3. Font Sizes & Typography Hierarchy

| Role | Font Family | Size (Stitch Raw) | Fluid Clamp Token | Tracking / Leading |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Name** | Bebas Neue | `140px` – `188px` (~est.) | `clamp(5rem, 20vw, 18rem)` | Leading `0.85`, Uppercase |
| **Display XL** | Cormorant Garamond | `56px` – `72px` | `clamp(2.75rem, 5vw + 1rem, 4.5rem)` | Leading `1.1`, Normal / Italic |
| **Display LG** | Cormorant Garamond | `40px` – `48px` | `clamp(2.25rem, 3.8vw + 0.8rem, 3.5rem)` | Leading `1.15` |
| **Headline MD / H3** | Cormorant Garamond / Inter | `24px` – `34px` | `clamp(1.35rem, 1.8vw + 0.4rem, 1.75rem)` | Leading `1.3` |
| **Body Large** | Inter | `18px` – `20px` | `clamp(1.125rem, 0.8vw + 0.85rem, 1.25rem)` | Leading `1.6` |
| **Body Default** | Inter | `14px` – `15px` | `clamp(0.95rem, 0.4vw + 0.85rem, 1.05rem)` | Leading `1.65` |
| **Section Label** | Inter | `10px` – `11px` | `clamp(0.75rem, 0.3vw + 0.68rem, 0.85rem)` | Leading `1.4`, Tracking `0.18em`, Uppercase |
| **Vertical Tag** | Bebas Neue | `14px` – `16px` | Monospace / Display | Rotated 90° (`writing-mode: vertical-rl`) |

---

## 4. Border Styles & Geometry

- **Border Radius**: Strictly `0px` to `2px` (`rounded-none` or `rounded-[2px]`). No rounded pill buttons, no soft card corners.
- **Borders & Dividers**:
  - Hairline `1px solid var(--line)` (`#2A2A2A` in Dark, `#E2E0DC` in Light).
  - No drop shadows or ambient blurs (`box-shadow: none`).
  - Elevation is achieved purely through background planar contrast (`surface` vs `background`) and sharp hairline bounding rules.

---

## 5. Interactive & Hover States

- **Primary Buttons**:
  - Normal: Solid red `bg-accent` (`#C8102E`) with white text `text-on-accent`.
  - Hover: Darker red `hover:bg-[#a60b24]` or subtle brightness shift.
- **Ghost / Outline Buttons**:
  - Normal: Transparent with `border border-line text-foreground`.
  - Hover: `border-foreground text-foreground` or inversion to `bg-foreground text-background`.
- **Numbered Rows & Docket Lists**:
  - Hover: Subtle background highlight (`hover:bg-surface/60`), right arrow slides right (`hover:translate-x-1.5 transition-transform duration-200`), row title color transitions to `text-accent-text`.
- **Text Action Links**:
  - Arrow nudges `+4px` on hover (`group-hover:translate-x-1 transition-transform`).
- **Focus Rings**:
  - Strict accessibility: `2px solid var(--foreground)` with `3px offset` using `var(--background)`.

---

## 6. Color Analysis: Stitch Raw vs. Project Semantic Tokens

Stitch used direct inline hex colors in generated screens. Below is the mapping reconciliation to our semantic Tailwind tokens:

### Dark Theme Comparison
| Stitch Raw Hex | Usage in Stitch | Project Semantic Token | Canonical Value | Status / Action |
| :--- | :--- | :--- | :--- | :--- |
| `#0A0A0A` | Canvas background | `bg-background` | `#0A0A0A` | **Exact Match** |
| `#141414`, `#181818`, `#1C1C1C` | Cards & panels | `bg-surface` | `#141414` | Normalized to `--surface` |
| `#2A2A2A`, `#333333`, `#444444` | Hairline borders | `border-line` | `#2A2A2A` | Normalized to `--line` |
| `#F7F5F0`, `#FFFFFF` | Primary text | `text-foreground` | `#F7F5F0` | Normalized to `--foreground` |
| `#A3A09A`, `#8E8E8E`, `#666666` | Muted copy & labels | `text-secondary` | `#A3A09A` | Normalized to `--secondary` |
| `#C8102E` | Action buttons, vertical block | `bg-accent` | `#C8102E` | **Exact Match** |
| `#FF5A6E`, `#E63946` | Small red labels & accents | `text-accent-text` | `#FF5A6E` | Normalized to `--accent-text` (meets WCAG AA) |
| `#FFFFFF` | Text on red buttons | `text-on-accent` | `#FFFFFF` | **Exact Match** |

### Light Theme Comparison
| Stitch Raw Hex | Usage in Stitch | Project Semantic Token | Canonical Value | Status / Action |
| :--- | :--- | :--- | :--- | :--- |
| `#FFFFFF` | Canvas background | `bg-background` | `#FFFFFF` | **Exact Match** |
| `#F4F3F0`, `#F5F2EC` | Card surfaces | `bg-surface` | `#F4F3F0` | Normalized to `--surface` |
| `#E2E0DC`, `#D9D4CB` | Hairline borders | `border-line` | `#E2E0DC` | Normalized to `--line` |
| `#0A0A0A`, `#111111` | Primary text | `text-foreground` | `#0A0A0A` | Normalized to `--foreground` |
| `#5A5A5A`, `#66635E` | Secondary copy | `text-secondary` | `#5A5A5A` | Normalized to `--secondary` |
| `#C8102E` | Action buttons & solid blocks | `bg-accent` | `#C8102E` | **Exact Match** |
| `#B00D26`, `#960C22` | Small red text | `text-accent-text` | `#B00D26` | Normalized to `--accent-text` (meets WCAG AA) |
| `#FFFFFF` | Text on red buttons | `text-on-accent` | `#FFFFFF` | **Exact Match** |

---

## 7. Component Rebuild Strategy

Stitch HTML used hard-coded inline classes and repetitive markup. In accordance with Code Rules:
- All components will be built in `/src/components` with TypeScript strict types.
- Pure semantic CSS variables and tokens (`bg-background`, `bg-surface`, `text-foreground`, `text-secondary`, `border-line`, `bg-accent`, `text-accent-text`, `text-on-accent`).
- Zero hard-coded hex colors in components.
- Verified data only: portraits and contact buttons render conditionally based on `Field<T>.verified === true`.
