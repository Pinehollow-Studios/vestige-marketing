"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";
import { accentFor, type Palette } from "./palette";
import { useMagnetic } from "./hooks";

// Page order: features → what-it-is → roadmap.
const LINKS = [
  { id: "features", label: "Inside" },
  { id: "what", label: "What it is" },
  { id: "roadmap", label: "Roadmap" },
] as const;

/**
 * Floating glass pill nav — slides in with a spring once the visitor
 * scrolls past the hero, tracks the active section via one
 * IntersectionObserver, and carries a magnetic "Join" CTA. The hero's
 * own topbar stays static; this takes over for the rest of the page.
 */
export function StickyNav({ palette = "mint" }: { palette?: Palette }) {
  const acc = accentFor(palette);
  const [shown, setShown] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.3, ".fw-sticky");

  useEffect(() => {
    const fn = () => setShown(window.scrollY > window.innerHeight * 0.72);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el != null
    );
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <nav className="fw-sticky" data-shown={shown ? "1" : "0"} aria-label="Page">
      <a
        className="fw-sticky-brand"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        {siteConfig.brandName.toUpperCase()}
      </a>
      <span className="fw-sticky-rule" aria-hidden />
      {LINKS.map((l) => (
        <a
          key={l.id}
          className="fw-sticky-link"
          data-active={active === l.id ? "1" : "0"}
          href={`#${l.id}`}
        >
          {l.label}
        </a>
      ))}
      <a
        ref={ctaRef}
        className="fw-sticky-cta"
        href="#join"
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
