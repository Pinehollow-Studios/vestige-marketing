import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";
import {
  progressConfig,
  COUNTIES_TOTAL,
  COURSES_EXACT_TEXT,
  isComplete,
} from "@/lib/progressConfig";
import { CountyAtlas } from "@/components/progress/CountyAtlas";
import { ProgressStats } from "@/components/progress/ProgressStats";
import { PageMotion } from "@/components/marketing/PageMotion";
import { StickyNav } from "@/components/marketing/StickyNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { Reveal } from "@/components/marketing/Reveal";
import { RevealHeadline } from "@/components/marketing/atoms";
import { ENGLAND_PATH } from "@/components/marketing/england";

/**
 * /progress — the build, in the open. A reward for the waiting list
 * and a recruiting tool for the curious: the county map filling in and
 * then lighting up complete, the two honest figures, what's happening
 * right now, and one way in. The homepage carries only the map as a
 * peek; everything else about the build lives here. Numbers are
 * hand-edited in src/lib/progressConfig.ts, and every "complete" here
 * derives from that file rather than being written into the copy — add
 * a territory to counties.ts and the page goes back to filling in.
 *
 * Deliberately absent: the roadmap and FAQ (they live on the
 * homepage), a second signup form, a changelog. One idea per page.
 */

export const metadata: Metadata = {
  title: "Progress",
  description: isComplete
    ? `How far ${siteConfig.brandName} has come: every county in England mapped, ${COURSES_EXACT_TEXT} courses collected, and what we're working on right now.`
    : `How far ${siteConfig.brandName} has come: counties mapped, courses collected, and what we're working on right now.`,
};

export default function ProgressPage() {
  const {
    coursesMapped,
    coursesTotal,
    completedCounties,
    latestCounty,
    completedOn,
    lastUpdated,
    rightNow,
    screenshot,
  } = progressConfig;

  return (
    <div className="fw-root">
      <PageMotion />
      <div className="fw-ambient" aria-hidden="true" />
      <StickyNav />

      <main className="fw-page-main">
        {/* ─── Hero: intro + ledger beside the map on desktop ─ */}
        <section className="fw-prog-hero" aria-label="Progress so far">
          <div className="fw-prog-intro">
            {/* capped so the headline holds a single line in both the
                phone column and the desktop hero cell — at 43px+ a
                375px phone orphans the last word. */}
            <RevealHeadline
              pre="England, "
              ital={isComplete ? "complete" : "filling in"}
              post="."
              fontSize="clamp(40px, 10.5vw, 68px)"
              lineHeight="0.97"
              letterSpacing="clamp(-2.6px, -0.3vw, -1.4px)"
            />
            <p className="fw-lede fw-page-enter" style={{ "--enter-d": "420ms" } as React.CSSProperties}>
              {isComplete ? (
                <>
                  Vestige is an iPhone app that puts every golf course in
                  England on one map, and keeps the ones you&rsquo;ve played.
                  The map is finished: all {COUNTIES_TOTAL} counties,{" "}
                  {COURSES_EXACT_TEXT} courses, every one of them in. This is
                  how it got there.
                </>
              ) : (
                <>
                  Vestige is an iPhone app that puts every golf course in
                  England on one map, and keeps the ones you&rsquo;ve played.
                  We&rsquo;re partway through building it. This is how far the
                  map has come.
                </>
              )}
            </p>
          </div>
          <CountyAtlas
            completed={completedCounties}
            latest={latestCounty}
            courses={coursesMapped}
          />
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
              note: "every one in England",
            }}
            latest={latestCounty}
            lastUpdated={lastUpdated}
            complete={isComplete}
            completedOn={completedOn}
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
              <h2 className="fw-prog-shot-title">What it looks like today.</h2>
              <p className="fw-prog-shot-sub">
                A real screen from the current build: the app as it stands,
                still taking shape.
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
              Join the waiting list. The public beta link goes there in October,
              along with the occasional update like this one. Nothing else.
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
