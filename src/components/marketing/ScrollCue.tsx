"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { accentFor, type Palette } from "./palette";

/**
 * Hero scroll cue.
 *
 * The old hint — a 10px "SCROLL" label over a hairline — was too quiet:
 * less confident visitors (the older testers especially) were landing on
 * the full-height waitlist hero without realising a whole site sat below
 * it, and getting stranded on the sign-up. This is the louder replacement:
 *
 *   • a labelled, bouncing down-chevron — the universally-read "more below";
 *   • that is itself a button, so tapping it pages the visitor down. Someone
 *     who doesn't reach for the scroll gesture is *shown* it rather than told;
 *   • and which escalates if they linger: after a few seconds with no scroll
 *     the cue grows, brightens and swaps to a plainer "There's more below" —
 *     a stationary visitor is exactly the one who is stuck.
 *
 * It fades out on the first scroll via the hero's existing `--hp` scrub var
 * (so it composes with the intro fade instead of fighting it), and stops
 * nagging once the visitor is moving.
 */
export function ScrollCue({
  palette = "mint",
  /** Entrance delay, threaded through the hero's staged intro choreography. */
  delayMs = 1100,
}: {
  palette?: Palette;
  delayMs?: number;
}) {
  const acc = accentFor(palette);
  // They've lingered on the hero without scrolling — escalate the cue.
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    // Already scrolled (reload mid-page, a restored position) — never nag.
    if (window.scrollY > 20) return;
    let idleTimer: ReturnType<typeof setTimeout> | undefined = setTimeout(
      () => setIdle(true),
      5000
    );
    const cancel = () => {
      if (idleTimer) {
        clearTimeout(idleTimer);
        idleTimer = undefined;
      }
    };
    const onScroll = () => {
      // The moment they scroll, the escalation is moot — the --hp fade takes
      // the cue away on its own, so just stop the timer from firing late.
      if (window.scrollY > 20) {
        cancel();
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancel();
    };
  }, []);

  const pageDown = () => {
    // Page down a little under a full viewport — enough to bring the marquee
    // and stats into view and, more to the point, to demonstrate the gesture.
    window.scrollTo({ top: window.innerHeight * 0.92, behavior: "smooth" });
  };

  return (
    <div
      className="fw-intro-stage fw-scrollcue-wrap"
      style={{ "--stage-d": `${delayMs}ms` } as CSSProperties}
    >
      <button
        type="button"
        className="fw-scrollcue"
        data-idle={idle ? "1" : "0"}
        onClick={pageDown}
        aria-label="Scroll down for the rest of the page"
        style={{ "--cue-a": acc.a } as CSSProperties}
      >
        <span className="fw-scrollcue-label">
          {idle ? "There’s more below" : "Scroll"}
        </span>
        <span className="fw-scrollcue-chev" aria-hidden="true">
          <svg width="24" height="15" viewBox="0 0 24 15" fill="none">
            <path
              d="M2 2.5 12 12l10-9.5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </div>
  );
}
