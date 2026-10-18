/**
 * Centralised Editorial Motion Tokens & Constants
 * Modelled on editorial typography and pradeeprai.com physical behaviour.
 * Strict performance: only animates transform and opacity (plus theme colour transitions).
 */

export const MOTION = {
  ease: "cubic-bezier(0.22, 1, 0.36, 1)", // Custom editorial quintic/cubic deceleration
  durations: {
    reveal: 900,       // 900ms section / text reveal
    ui: 250,           // 250ms interactive UI transitions
    stagger: 100,      // 100ms stagger between elements
    theme: 200,        // 200ms theme color switch
    photoScale: 1200,  // 1.2s photo slow scale 1.06 -> 1
    headerFade: 600,   // 600ms header entrance
    eyebrowRule: 500,  // 500ms red eyebrow line growth
    nameRise: 900,     // 900ms masked name line rise
    advBlock: 700,     // 700ms vertical ADV block height scale
    statsCount: 1200,  // 1.2s number counter
    scrollLoop: 2000,  // 2s scroll pulse loop
    imageHover: 700,   // 700ms slow image hover scale
    accordion: 300,    // 300ms accordion height/opacity
    rowHover: 300,     // 300ms practice row left bar scale
  },
  distances: {
    reveal: "24px",    // 24px vertical reveal distance
    header: "12px",    // 12px header entrance offset
    arrow: "4px",      // 4px hover nudge on action arrows
  },
} as const;

/**
 * CSS custom properties string to inject or reference
 */
export const MOTION_CSS_VARS = `
  --ease-editorial: cubic-bezier(0.22, 1, 0.36, 1);
  --duration-reveal: 900ms;
  --duration-ui: 250ms;
  --duration-stagger: 100ms;
  --duration-theme: 200ms;
  --distance-reveal: 24px;
`;
