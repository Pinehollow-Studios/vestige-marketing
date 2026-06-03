"use client";

import { siteConfig } from "@/lib/siteConfig";
import { fwF } from "./palette";

export function CourseMarquee() {
  // Duplicate the list so the translateX(-50%) loop reads seamlessly.
  const items = [...siteConfig.marquee, ...siteConfig.marquee];
  return (
    <div className="fw-marquee">
      <div className="fw-marquee-mask">
        <div className="fw-marquee-track">
          {items.map((c, i) => (
            <span key={i} className="fw-marquee-item">
              <span className="fw-marquee-sep">●</span>
              <span
                style={{
                  fontFamily: fwF.display,
                  fontWeight: 400,
                }}
              >
                {c}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
