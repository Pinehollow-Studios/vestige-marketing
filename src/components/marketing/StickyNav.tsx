"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/siteConfig";
import { accentFor, type Palette } from "./palette";
import { useMagnetic } from "./hooks";

/**
 * Floating glass pill nav — the site's tab chooser now that the story
 * is split across pages (home / the app / progress). The active page
 * is marked off the pathname, and the magnetic "Join" CTA always
 * leads back to the homepage signup.
 *
 * Surfacing is tuned for reading on a phone, where the pill is the
 * only navigation but also covers a meaningful slice of the screen:
 *
 *   - The homepage holds it back until the visitor scrolls past the
 *     hero (the hero's own topbar owns the first viewport), then
 *     springs it in and pins it for a beat — announcing it exists —
 *     before the scroll rules below take over.
 *   - Subpages spring it in on arrival, and it stays while you're
 *     near the top.
 *   - Everywhere else it tucks away while you scroll down to read
 *     and returns on the first upward gesture — chrome only when
 *     wanted, never while reading.
 */
export function StickyNav({ palette = "mint" }: { palette?: Palette }) {
  const acc = accentFor(palette);
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [shown, setShown] = useState(false);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.3, ".fw-sticky");

  useEffect(() => {
    let lastY = window.scrollY;
    let down = 0; // px scrolled down since the last direction change
    let up = 0; //   px scrolled up   "
    let visible = true;
    let wasSurfaced = false;
    let graceUntil = 0;

    const apply = () => {
      const y = Math.max(0, window.scrollY); // iOS rubber-band guard
      const surfaced = !onHome || y > window.innerHeight * 0.72;
      // First time past the hero: pin the pill for a beat even though
      // the visitor is mid-downward-scroll, so its arrival is seen.
      if (surfaced && !wasSurfaced && onHome) {
        graceUntil = performance.now() + 1600;
      }
      wasSurfaced = surfaced;

      const d = y - lastY;
      lastY = y;
      if (d > 0) {
        down += d;
        up = 0;
      } else if (d < 0) {
        up -= d;
        down = 0;
      }

      // Hysteresis: a deliberate stretch of downward reading hides it;
      // any real upward gesture brings it back. The 28px floor keeps
      // few-px layout-shift corrections from flashing it in mid-read.
      if (y < 90 || performance.now() < graceUntil) visible = true;
      else if (down > 160) visible = false;
      else if (up > 28) visible = true;

      setShown(surfaced && visible);
    };

    // A frame after mount, so the hidden state paints first and the
    // data-shown spring plays on pages that show it immediately.
    const raf = requestAnimationFrame(apply);
    window.addEventListener("scroll", apply, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", apply);
    };
  }, [onHome]);

  return (
    <nav className="fw-sticky" data-shown={shown ? "1" : "0"} aria-label="Site">
      <Link
        className="fw-sticky-brand"
        href="/"
        onClick={(e) => {
          if (!onHome) return;
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        {siteConfig.brandName.toUpperCase()}
      </Link>
      <span className="fw-sticky-rule" aria-hidden />
      {siteConfig.nav.map((l) => (
        <Link
          key={l.href}
          className="fw-sticky-link"
          data-active={pathname === l.href ? "1" : "0"}
          aria-current={pathname === l.href ? "page" : undefined}
          href={l.href}
        >
          {l.label}
        </Link>
      ))}
      <a
        ref={ctaRef}
        className="fw-sticky-cta"
        href={onHome ? "#join" : "/#join"}
        style={{
          background: `linear-gradient(135deg, ${acc.a}, ${acc.b})`,
          color: acc.on,
        }}
      >
        Join the list
      </a>
    </nav>
  );
}
