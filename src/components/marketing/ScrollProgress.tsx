"use client";

import { useScrollProgress } from "./hooks";

/**
 * Thin mint→lime gradient bar at the top of the viewport, width tied
 * to scroll position. Modern marketing-site signature element.
 */
export function ScrollProgress() {
  const p = useScrollProgress();
  return (
    <div
      aria-hidden
      className="fw-scroll-progress"
      style={{ width: `${p * 100}%` }}
    />
  );
}
