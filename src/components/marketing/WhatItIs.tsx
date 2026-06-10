"use client";

import { siteConfig } from "@/lib/siteConfig";
import { accentFor, fwF, fwT, type Palette } from "./palette";
import { Reveal } from "./Reveal";

/**
 * "Why we're building it" — studio-voice narrative between the stats and the
 * feature cards. Also carries the `#what` anchor the top-bar "What it is" link
 * points at (previously a dead link — no element had that id).
 */
export function WhatItIs({ palette = "mint" }: { palette?: Palette }) {
  const acc = accentFor(palette);
  const { titlePre, titleItalic, body } = siteConfig.what;

  return (
    <section
      id="what"
      style={{
        position: "relative",
        zIndex: 2,
        padding: "clamp(64px, 9vw, 150px) clamp(20px, 5vw, 80px)",
        scrollMarginTop: 80,
      }}
    >
      <Reveal>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: fwF.display,
              fontSize: "clamp(30px, 4.4vw, 56px)",
              fontWeight: 500,
              letterSpacing: "-1.5px",
              lineHeight: 1.05,
              color: fwT.ink,
              margin: 0,
            }}
          >
            {titlePre}
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
              {titleItalic}
            </span>
          </h2>

          {body.map((p, i) => (
            <p
              key={i}
              style={{
                fontFamily: fwF.ui,
                fontSize: "clamp(15px, 1.4vw, 18px)",
                lineHeight: 1.7,
                color: "rgba(246,244,238,0.62)",
                margin: i === 0 ? "26px auto 0" : "16px auto 0",
                maxWidth: 640,
              }}
            >
              {p}
            </p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
