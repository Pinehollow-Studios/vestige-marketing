"use client";

import { type ReactNode } from "react";
import { useScrollReveal } from "../marketing/hooks";

/**
 * The client shell around the homepage progress snapshot. The map's
 * fill-in choreography is pure CSS animation, which would otherwise
 * play on page load — long before the visitor scrolls here. This
 * gates it: the animations sit paused (data-shown="0") until the
 * section enters the viewport, so the counties sweep in on arrival.
 */
export function PeekFrame({ children }: { children: ReactNode }) {
  const [ref, revealed] = useScrollReveal<HTMLElement>();
  return (
    <section ref={ref} className="fw-peek" data-shown={revealed ? "1" : "0"}>
      <div className="fw-peek-inner">{children}</div>
    </section>
  );
}
