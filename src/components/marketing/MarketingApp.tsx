"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { siteConfig } from "@/lib/siteConfig";
import { useGlobalProgress, useMouseParallax, useViewScrub } from "./hooks";
import { accentFor, fwF } from "./palette";
import { HeroBackdrop, type HeroMode } from "./backdrops";
import {
  FwLockup,
  LiveEyebrow,
  RevealHeadline,
} from "./atoms";
import { GlassEmail } from "./GlassEmail";
import { CourseMarquee } from "./CourseMarquee";
import { StatsStrip } from "./StatsStrip";
import { WhatItIs } from "./WhatItIs";
import { FeatureCard } from "./Features";
import { Faq } from "./Faq";
import { ClosingCTA } from "./ClosingCTA";
import { ScrollProgress } from "./ScrollProgress";
import { Reveal } from "./Reveal";
import { Roadmap } from "./Roadmap";
import { Preloader } from "./Preloader";
import { StickyNav } from "./StickyNav";
import { MegaWordmark } from "./MegaWordmark";
import { CourseTrail } from "./CourseTrail";
import { AtlasMini } from "./AtlasMini";

/** Staggered entrance delay for hero children, gated on the intro. */
const stage = (s: number): CSSProperties =>
  ({ "--stage-d": `${s}ms` } as CSSProperties);

/**
 * Hardcoded palette + backdrop mode — the TweaksPanel exploration
 * surface has been stripped per the handoff README's production
 * checklist. Both can be lifted into siteConfig later if multiple
 * brand variants are wanted.
 */
const PALETTE = "mint" as const;
const HERO_MODE: HeroMode = "aurora";

type LiveCount = { total: number; weekly: number };

export function MarketingApp({
  liveCount,
  progressPeek,
}: {
  liveCount: LiveCount | null;
  /**
   * The server-rendered /progress snapshot (ProgressPeek), passed in
   * as a node so its ~6,000 points of county geometry never enter
   * this client bundle.
   */
  progressPeek?: React.ReactNode;
}) {
  const acc = accentFor(PALETTE);
  const [pre, ital, post] = siteConfig.hero.headline;
  useMouseParallax();
  // One lerped 0..1 progress var (--gp on <html>) that every
  // cross-page companion — progress bar, ambient colour journey,
  // atlas pins — evolves against.
  useGlobalProgress();

  // Intro choreography: the preloader covers the page, then flips this
  // on as its curtain wipes up — hero children enter in stages via the
  // [data-intro] attribute + per-element --stage-d delays.
  const [introDone, setIntroDone] = useState(false);

  // Hero scroll-exit: writes --hp (0..1) on the section as the visitor
  // scrolls the first ~0.85 viewport; CSS recedes/fades the content.
  const heroRef = useViewScrub<HTMLElement>({ mode: "exit", varName: "--hp" });

  // Past the hero, mark it offstage so CSS can stop painting/animating
  // the aurora — its giant blurred blend layers are the most expensive
  // pixels on the page and they're invisible from viewport two onward.
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    let off: boolean | null = null;
    const fn = () => {
      const next = window.scrollY > window.innerHeight * 1.15;
      if (next !== off) {
        off = next;
        el.setAttribute("data-offstage", next ? "1" : "0");
      }
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="fw-root"
      data-mode={HERO_MODE}
      data-palette={PALETTE}
      data-intro={introDone ? "done" : "wait"}
    >
      <Preloader onReveal={() => setIntroDone(true)} />
      {/* fixed ambient glows — dawn mint drifting to golden hour as --gp climbs */}
      <div className="fw-ambient" aria-hidden="true" />
      {/* the course-routing trail weaving down the whole page */}
      <CourseTrail />
      <ScrollProgress />
      <StickyNav palette={PALETTE} />
      <AtlasMini />

      {/* ═══ HERO ═══════════════════════════════════════════ */}
      <section ref={heroRef} className="fw-hero">
        <HeroBackdrop mode={HERO_MODE} palette={PALETTE} />

        {/* Top bar */}
        <div className="fw-topbar fw-intro-stage" style={stage(80)}>
          <FwLockup palette={PALETTE} label={siteConfig.brandName.toUpperCase()} />
          {/* links in page order: features → what-it-is → closing CTA */}
          <nav className="fw-topbar-nav">
            <a href="#features">Inside</a>
            <a href="#what">What it is</a>
            <a href="#join">Get notified</a>
          </nav>
        </div>

        {/* Centred hero content */}
        <div className="fw-hero-content">
          {liveCount && (
            <div className="fw-intro-stage" style={{ marginBottom: 30, ...stage(150) }}>
              <LiveEyebrow palette={PALETTE} target={liveCount.weekly}>
                {siteConfig.hero.liveEyebrowLabel}
              </LiveEyebrow>
            </div>
          )}

          <RevealHeadline
            pre={pre}
            ital={ital}
            post={post}
            palette={PALETTE}
            fontSize="clamp(48px, 8.5vw, 132px)"
            lineHeight="0.94"
            letterSpacing="clamp(-5.6px, -0.45vw, -2.4px)"
            play={introDone}
          />

          <p className="fw-lede fw-intro-stage" style={stage(520)}>
            {siteConfig.hero.lede}
          </p>

          <div className="fw-intro-stage" style={stage(680)}>
            <GlassEmail palette={PALETTE} cta="Save my spot" />
          </div>

          <div
            className="fw-intro-stage"
            style={{
              ...stage(840),
              marginTop: 18,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              fontFamily: fwF.ui,
              fontSize: 12,
              color: "rgba(246,244,238,0.5)",
            }}
          >
            {siteConfig.hero.metaStrip.map((m, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
                {i === 0 ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: 999,
                        background: acc.a,
                        boxShadow: `0 0 8px ${acc.a}`,
                      }}
                    />
                    {m}
                  </span>
                ) : (
                  <>
                    <span style={{ width: 1, height: 10, background: "rgba(255,255,255,0.18)" }} />
                    <span>{m}</span>
                  </>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll hint — outer carries the intro fade, inner fades out
            against --hp on first scroll so the two never fight */}
        <div
          className="fw-intro-stage"
          style={{
            ...stage(1100),
            position: "absolute",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 3,
            fontFamily: fwF.ui,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "rgba(246,244,238,0.4)",
          }}
        >
          <div className="fw-scroll-hint-inner">
            <span>Scroll</span>
            <span
              style={{
                width: 1,
                height: 24,
                background:
                  "linear-gradient(180deg, rgba(246,244,238,0.4), transparent)",
                animation: "fw-pulse-dot 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE ═══════════════════════════════════════ */}
      <CourseMarquee />

      {/* ═══ STATS STRIP ═══════════════════════════════════ */}
      <StatsStrip />

      {/* ═══ FEATURES ══════════════════════════════════════ */}
      <section id="features" className="fw-features-section">
        <Reveal>
        <div className="fw-features-header">
          <h2 className="fw-features-title">
            {siteConfig.featuresHeader.titlePre}
            <span
              style={{
                fontWeight: 500,
                background: `linear-gradient(120deg, ${acc.a}, ${acc.b}, ${acc.a})`,
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "fw-italic-shimmer 6s linear infinite",
              }}
            >
              {siteConfig.featuresHeader.titleItalic}
            </span>
          </h2>
          <p className="fw-features-sub">{siteConfig.featuresHeader.sub}</p>
        </div>
        </Reveal>
        <div className="fw-features">
          {siteConfig.features.map((f, i) => (
            <Reveal key={i} delay={i * 120}>
              <FeatureCard
                kind={f.kind}
                palette={PALETTE}
                eyebrow={f.eyebrow}
                title={f.title}
                body={f.body}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ WHY / WHAT IT IS ══════════════════════════════ */}
      <WhatItIs palette={PALETTE} />

      {/* ═══ PROGRESS SNAPSHOT ═════════════════════════════ */}
      {progressPeek}

      {/* ═══ ROADMAP ═══════════════════════════════════════ */}
      <Roadmap />

      {/* ═══ FAQ ═══════════════════════════════════════════ */}
      <Faq palette={PALETTE} />

      {/* ═══ CLOSING CTA ═══════════════════════════════════ */}
      <ClosingCTA
        palette={PALETTE}
        joinedTotal={liveCount ? liveCount.total : null}
      />

      {/* ═══ MEGA WORDMARK ═════════════════════════════════ */}
      <MegaWordmark />

      {/* ═══ FOOTER ════════════════════════════════════════ */}
      <footer className="fw-footer">
        <FwLockup palette={PALETTE} size={22} label={siteConfig.brandName.toUpperCase()} />
        <div className="fw-footer-meta">
          <a
            className="fw-footer-mark"
            href={siteConfig.footer.studio.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {siteConfig.footer.studio.name}
          </a>
          <span className="fw-footer-sep" aria-hidden>
            ·
          </span>
          <a
            className="fw-footer-link"
            href={`mailto:${siteConfig.footer.studio.email}`}
          >
            {siteConfig.footer.studio.email}
          </a>
          <span className="fw-footer-sep" aria-hidden>
            ·
          </span>
          <a
            className="fw-footer-link"
            href={siteConfig.footer.studio.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {siteConfig.footer.studio.websiteLabel}
          </a>
          <span className="fw-footer-sep" aria-hidden>
            ·
          </span>
          <a className="fw-footer-link" href="/privacy">
            Privacy
          </a>
        </div>
      </footer>
    </div>
  );
}
