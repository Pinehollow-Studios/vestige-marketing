"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/siteConfig";
import { accentFor, type Palette } from "./palette";
import { useMagnetic } from "./hooks";

/**
 * Floating glass pill nav — the site's tab chooser now that the story
 * is split across pages (home / the app / progress). On the homepage
 * it slides in with a spring once the visitor scrolls past the hero —
 * the hero's own topbar owns the first viewport — and on every other
 * page it springs in on arrival and stays. The active page is marked
 * off the pathname, and the magnetic "Join" CTA always leads back to
 * the homepage signup. Stays visible on phones: it's the only way our
 * (mostly mobile) visitors move between the pages.
 */
export function StickyNav({ palette = "mint" }: { palette?: Palette }) {
  const acc = accentFor(palette);
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [shown, setShown] = useState(false);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.3, ".fw-sticky");

  useEffect(() => {
    // Subpages get the pill straight away — a frame after mount, so the
    // hidden state paints first and the data-shown spring plays. The
    // homepage gates it on scrolling past the hero instead.
    if (!onHome) {
      const raf = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(raf);
    }
    const fn = () => setShown(window.scrollY > window.innerHeight * 0.72);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
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
