"use client";

import { siteConfig } from "@/lib/siteConfig";
import { accentFor, type Palette } from "./palette";
import { Reveal } from "./Reveal";

/**
 * FAQ — native <details> accordions (accessible, no JS, no client state beyond
 * the browser's own toggle). Answers the questions friends text back anyway.
 */
export function Faq({ palette = "mint" }: { palette?: Palette }) {
  const acc = accentFor(palette);

  return (
    <section className="fw-faq-section">
      <Reveal>
        <div className="fw-faq-head">
          <span className="fw-faq-eyebrow" style={{ color: acc.a }}>
            <span
              style={{ width: 5, height: 5, borderRadius: 999, background: acc.a }}
            />
            Good to know
          </span>
          <h2 className="fw-faq-title">Questions, answered.</h2>
        </div>

        <div className="fw-faq-list">
          {siteConfig.faq.map((item, i) => (
            <details key={i} className="fw-faq-item">
              <summary className="fw-faq-q">
                <span>{item.q}</span>
                <span className="fw-faq-mark" aria-hidden>
                  +
                </span>
              </summary>
              <p className="fw-faq-a">{item.a}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
