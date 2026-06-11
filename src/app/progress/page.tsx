import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";
import { progressConfig, COUNTIES_TOTAL } from "@/lib/progressConfig";
import { CountyAtlas } from "@/components/progress/CountyAtlas";
import { ProgressStats } from "@/components/progress/ProgressStats";
import { ProgressMotion } from "@/components/progress/ProgressMotion";
import { Reveal } from "@/components/marketing/Reveal";
import { FwLockup, LiveEyebrow, RevealHeadline } from "@/components/marketing/atoms";
import { ENGLAND_PATH } from "@/components/marketing/england";

/**
 * /progress — the build, in the open. A reward for the waiting list
 * and a recruiting tool for the curious: the county map filling in,
 * the two honest fractions, what's happening right now, and one way
 * in. Numbers are hand-edited in src/lib/progressConfig.ts.
 *
 * Deliberately absent: the roadmap (lives on the homepage), a second
 * signup form, a changelog. The page's power is its focus.
 */

export const metadata: Metadata = {
  title: "Progress",
  description: `How far ${siteConfig.brandName} has come — counties mapped, courses collected, and what we're working on right now.`,
  // Pre-launch: inherited from the root layout, restated so nobody
  // "fixes" the layout and indexes this page by accident.
  robots: { index: false, follow: false },
};

export default function ProgressPage() {
  const { coursesMapped, coursesTotal, completedCounties, lastUpdated, rightNow, screenshot } =
    progressConfig;

  return (
    <div className="fw-root">
      <ProgressMotion />
      <div className="fw-ambient" aria-hidden="true" />

      <main className="fw-prog-main">
        {/* ─── Top bar ─────────────────────────────────────── */}
        <div className="fw-prog-topbar fw-prog-enter">
          <Link href="/" style={{ textDecoration: "none" }} aria-label={`${siteConfig.brandName} home`}>
            <FwLockup label={siteConfig.brandName.toUpperCase()} />
          </Link>
          <Link href="/" className="fw-prog-home">
            {siteConfig.domain} →
          </Link>
        </div>

        {/* ─── Header ──────────────────────────────────────── */}
        <header className="fw-prog-head">
          <div className="fw-prog-enter" style={{ "--enter-d": "120ms" } as React.CSSProperties}>
            <LiveEyebrow label="Building in the open" />
          </div>
          <div style={{ marginTop: 26 }}>
            {/* capped so "England, filling in." holds a single line within
                the 680px column at every width — 92px orphans the "in." */}
            <RevealHeadline
              pre="England, "
              ital="filling in"
              post="."
              fontSize="clamp(44px, 11vw, 68px)"
              lineHeight="0.97"
              letterSpacing="clamp(-2.6px, -0.3vw, -1.4px)"
            />
          </div>
          <p className="fw-lede fw-prog-enter" style={{ "--enter-d": "420ms" } as React.CSSProperties}>
            Vestige is an iPhone app that puts every golf course in England on
            one map — and keeps the ones you&rsquo;ve played. We&rsquo;re
            building it in the open. This is how far the map has come.
          </p>
        </header>

        {/* ─── The map + the numbers ───────────────────────── */}
        <section aria-label="Progress so far">
          <CountyAtlas completed={completedCounties} />
          <ProgressStats
            counties={{
              label: "Counties mapped",
              value: completedCounties.length,
              total: COUNTIES_TOTAL,
            }}
            courses={{
              label: "Courses mapped",
              value: coursesMapped,
              total: coursesTotal,
              approx: true,
            }}
            lastUpdated={lastUpdated}
          />
        </section>

        {/* ─── Right now ───────────────────────────────────── */}
        <Reveal>
          <section className="fw-prog-now">
            <p className="fw-prog-eyebrow">Right now</p>
            <p className="fw-prog-now-line">{rightNow}</p>
          </section>
        </Reveal>

        {/* ─── The screenshot ──────────────────────────────── */}
        <section className="fw-prog-duo">
          <Reveal>
            <div className="fw-prog-shot-copy">
              <p className="fw-prog-eyebrow">From the build</p>
              <h2 className="fw-prog-shot-title">Proof, not promises.</h2>
              <p className="fw-prog-shot-sub">
                A real screen from the closed TestFlight build — the atlas as
                it looks this week, bugs and all.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="fw-prog-shot">
              {screenshot ? (
                <Image
                  src={screenshot.src}
                  alt={screenshot.alt}
                  fill
                  sizes="(max-width: 879px) 72vw, 320px"
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div className="fw-prog-shot-placeholder">
                  <svg viewBox="0 0 200 140" width="58%" aria-hidden="true">
                    <path
                      d={ENGLAND_PATH}
                      fill="rgba(91,228,195,0.06)"
                      stroke="rgba(91,228,195,0.45)"
                      strokeWidth="0.8"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Screenshot to follow</span>
                </div>
              )}
            </div>
          </Reveal>
        </section>

        {/* ─── One way in ──────────────────────────────────── */}
        <Reveal>
          <section className="fw-prog-cta">
            <h2>
              Want{" "}
              <span className="fw-prog-cta-ital">in</span>?
            </h2>
            <p>
              Join the waiting list — beta codes go there first, along with the
              occasional update like this one. Nothing else.
            </p>
            <Link href="/#join" className="fw-prog-cta-btn">
              Join the waiting list
            </Link>
            <p className="fw-prog-cta-meta">iPhone, iOS 18+ · Free at launch</p>
          </section>
        </Reveal>
      </main>

      {/* ─── Footer ──────────────────────────────────────── */}
      <footer className="fw-footer">
        <FwLockup size={22} label={siteConfig.brandName.toUpperCase()} />
        <div className="fw-footer-meta">
          <Link className="fw-footer-link" href="/">
            {siteConfig.domain}
          </Link>
          <span className="fw-footer-sep" aria-hidden>
            ·
          </span>
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
          <a className="fw-footer-link" href="/privacy">
            Privacy
          </a>
        </div>
      </footer>
    </div>
  );
}
