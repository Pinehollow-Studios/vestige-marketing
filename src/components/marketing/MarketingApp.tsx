"use client";

import { siteConfig } from "@/lib/siteConfig";
import { useMouseParallax } from "./hooks";
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

/**
 * Hardcoded palette + backdrop mode — the TweaksPanel exploration
 * surface has been stripped per the handoff README's production
 * checklist. Both can be lifted into siteConfig later if multiple
 * brand variants are wanted.
 */
const PALETTE = "mint" as const;
const HERO_MODE: HeroMode = "aurora";

type LiveCount = { total: number; weekly: number };

export function MarketingApp({ liveCount }: { liveCount: LiveCount | null }) {
  const acc = accentFor(PALETTE);
  const [pre, ital, post] = siteConfig.hero.headline;
  useMouseParallax();

  return (
    <div className="fw-root" data-mode={HERO_MODE} data-palette={PALETTE}>
      <ScrollProgress />

      {/* ═══ HERO ═══════════════════════════════════════════ */}
      <section className="fw-hero">
        <HeroBackdrop mode={HERO_MODE} palette={PALETTE} />

        {/* Top bar */}
        <div className="fw-topbar">
          <FwLockup palette={PALETTE} showMark={false} label={siteConfig.brandName.toUpperCase()} />
          <nav className="fw-topbar-nav">
            <a href="#what">What it is</a>
            <a href="#features">Inside</a>
            <a href="#join">Get notified</a>
          </nav>
        </div>

        {/* Centred hero content */}
        <div className="fw-hero-content">
          <div style={{ marginBottom: 30 }}>
            {liveCount ? (
              <LiveEyebrow palette={PALETTE} target={liveCount.weekly}>
                {siteConfig.hero.liveEyebrowLabel}
              </LiveEyebrow>
            ) : (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: fwF.ui,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1.6,
                  textTransform: "uppercase",
                  color: acc.a,
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: 999,
                    background: acc.a,
                    boxShadow: `0 0 8px ${acc.a}`,
                  }}
                />
                {siteConfig.hero.staticEyebrow}
              </span>
            )}
          </div>

          <RevealHeadline
            pre={pre}
            ital={ital}
            post={post}
            palette={PALETTE}
            fontSize="clamp(48px, 8.5vw, 132px)"
            lineHeight="0.94"
            letterSpacing="clamp(-5.6px, -0.45vw, -2.4px)"
          />

          <p className="fw-lede">{siteConfig.hero.lede}</p>

          <GlassEmail palette={PALETTE} cta="Save my spot" />

          <div
            style={{
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

        {/* Scroll hint */}
        <div
          style={{
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
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
      </section>

      {/* ═══ MARQUEE ═══════════════════════════════════════ */}
      <CourseMarquee />

      {/* ═══ STATS STRIP ═══════════════════════════════════ */}
      <StatsStrip />

      {/* ═══ WHY / WHAT IT IS ══════════════════════════════ */}
      <WhatItIs palette={PALETTE} />

      {/* ═══ FEATURES ══════════════════════════════════════ */}
      <section id="features" className="fw-features-section">
        <Reveal>
        <div className="fw-features-header">
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: fwF.ui,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1.6,
              textTransform: "uppercase",
              color: acc.a,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: 999,
                background: acc.a,
              }}
            />
            {siteConfig.featuresHeader.eyebrow}
          </span>
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

      {/* ═══ ROADMAP ═══════════════════════════════════════ */}
      <Roadmap />

      {/* ═══ FAQ ═══════════════════════════════════════════ */}
      <Faq palette={PALETTE} />

      {/* ═══ CLOSING CTA ═══════════════════════════════════ */}
      <ClosingCTA
        palette={PALETTE}
        joinedTotal={liveCount ? liveCount.total : null}
      />

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
