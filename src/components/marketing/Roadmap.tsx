"use client";

import { siteConfig } from "@/lib/siteConfig";
import { fwF } from "./palette";
import { useScrollReveal } from "./hooks";
import { Reveal } from "./Reveal";

/**
 * Roadmap timeline — three milestones between now and the App Store.
 *
 * Layout mirrors the rest of the site: eyebrow + serif h2 (with italic
 * mint-gradient shimmer on one word) + italic sub + visual block.
 *
 * The connecting line draws left-to-right when the timeline scrolls
 * into view; each milestone fades up in stagger via <Reveal>; dots
 * pulse continuously.
 */
export function Roadmap() {
  const { eyebrow, titlePre, titleItalic, titlePost, sub, milestones } =
    siteConfig.roadmap;
  const [trackRef, trackRevealed] = useScrollReveal<HTMLDivElement>({
    threshold: 0.2,
  });

  return (
    <section id="roadmap" className="fw-roadmap-section">
      <Reveal>
        <div className="fw-roadmap-header">
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
              color: "var(--accent)",
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: 999,
                background: "var(--accent)",
              }}
            />
            {eyebrow}
          </span>
          <h2 className="fw-roadmap-title">
            {titlePre}
            <span
              style={{
                fontStyle: "italic",
                fontWeight: 500,
                background:
                  "linear-gradient(120deg, var(--accent), var(--accent-2), var(--accent))",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "fw-italic-shimmer 6s linear infinite",
              }}
            >
              {titleItalic}
            </span>
            {titlePost}
          </h2>
          <p className="fw-roadmap-sub">{sub}</p>
        </div>
      </Reveal>

      <div ref={trackRef} className="fw-timeline">
        <div className="fw-timeline-track">
          <div
            className="fw-timeline-track-fill"
            style={{ width: trackRevealed ? "100%" : "0%" }}
          />
        </div>
        <div className="fw-timeline-nodes">
          {milestones.map((m, i) => (
            <Reveal key={i} delay={250 + i * 180}>
              <article className="fw-timeline-node">
                <div className="fw-timeline-dot" />
                <p className="fw-timeline-date">
                  {m.month.toUpperCase()} · {m.year}
                </p>
                <h3 className="fw-timeline-label">{m.label}</h3>
                <p className="fw-timeline-body">{m.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
