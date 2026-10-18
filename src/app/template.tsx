import React from "react";

/**
 * Root Template: Runs on initial mount and on every client-side route navigation.
 * Fades page content in: opacity 0 -> 1, translateY 8px -> 0 over 350ms with ease cubic-bezier(0.22, 1, 0.36, 1).
 * Does not delay content or block navigation; strictly CSS transform & opacity for 0 layout shift (CLS 0).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-page-transition w-full min-h-screen">
      {children}
    </div>
  );
}
