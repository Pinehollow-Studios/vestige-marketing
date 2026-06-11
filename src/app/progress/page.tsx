import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";
import { progressConfig, COUNTIES_TOTAL } from "@/lib/progressConfig";
import { CountyAtlas } from "@/components/progress/CountyAtlas";
import { ProgressStats } from "@/components/progress/ProgressStats";
import { PageMotion } from "@/components/marketing/PageMotion";
import { StickyNav } from "@/components/marketing/StickyNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { Reveal } from "@/components/marketing/Reveal";
import { LiveEyebrow, RevealHeadline } from "@/components/marketing/atoms";
import { ENGLAND_PATH } from "@/components/marketing/england";

/**
 * /progress — the build, in the open. A reward for the waiting list
 * and a recruiting tool for the curious: the county map filling in,
 * the two honest fractions, what's happening right now, and one way
 * in. The homepage carries only the map as a peek; everything else
 * about the build lives here. Numbers are hand-edited in
 * src/lib/progressConfig.ts.
 *
 * Deliberately absent: the roadmap and FAQ (they live on the
 * homepage), a second signup form, a changelog. One idea per page.
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
      <PageMotion />
      <div className="fw-ambient" aria-hidden="true" />
      <StickyNav />

      <main className="fw-page-main">
        {/* ─── Hero: intro + ledger beside the map on desktop ─ */}
        <section className="fw-prog-hero" aria-label="Progress so far">
          <div className="fw-prog-intro">
            <div className="fw-page-enter" style={{ "--enter-d": "120ms" } as React.CSSProperties}>
              <LiveEyebrow label="Building in the open" />
            </div>
            <div style={{ marginTop: 26 }}>
              {/* capped so "England, filling in." holds a single line in
                  both the phone column and the desktop hero cell — at
                  43px+ a 375px phone orphans the "in." */}
              <RevealHeadline
                pre="England, "
                ital="filling in"
                post="."
                fontSize="clamp(40px, 10.5vw, 68px)"
                lineHeight="0.97"
                letterSpacing="clamp(-2.6px, -0.3vw, -1.4px)"
              />
            </div>
            <p className="fw-lede fw-page-enter" style={{ "--enter-d": "420ms" } as React.CSSProperties}>
              Vestige is an iPhone app that puts every golf course in England
              on one map — and keeps the ones you&rsquo;ve played. We&rsquo;re
              building it in the open. This is how far the map has come.
            </p>
          </div>
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
            <p className="fw-page-eyebrow">Right now</p>
            <p className="fw-prog-now-line">{rightNow}</p>
          </section>
        </Reveal>

        {/* ─── The screenshot ──────────────────────────────── */}
        <section className="fw-prog-duo">
          <Reveal>
            <div className="fw-prog-shot-copy">
              <p className="fw-page-eyebrow">From the build</p>
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
          <section className="fw-page-cta">
            <h2>
              Want <span className="fw-page-cta-ital">in</span>?
            </h2>
            <p>
              Join the waiting list — beta codes go there first, along with the
              occasional update like this one. Nothing else.
            </p>
            <Link href="/#join" className="fw-page-cta-btn">
              Join the waiting list
            </Link>
            <p className="fw-page-cta-meta">iPhone, iOS 18+ · Free at launch</p>
          </section>
        </Reveal>
      </main>

      {/* ─── Footer ──────────────────────────────────────── */}
      <SiteFooter />
    </div>
  );
}
