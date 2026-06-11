import type { CSSProperties } from "react";
import { COUNTY_SHAPES, COUNTY_VIEW } from "./counties";

/**
 * The hero of /progress — England with every ceremonial county drawn,
 * the completed ones filling in mint one by one, south to north (the
 * order the database is actually growing in). A server component on
 * purpose: the ~6,000 points of county geometry render once into HTML
 * and never ship as client JavaScript; the fill-in choreography is
 * pure CSS animation-delay, so the map needs no hydration at all.
 *
 * Completed counties are painted twice — once faint in the base layer
 * with all 47, once mint in the overlay — so each fade-in simply
 * reveals the overlay over an already-complete map.
 */
export function CountyAtlas({ completed }: { completed: ReadonlyArray<string> }) {
  const known = new Set(COUNTY_SHAPES.map((s) => s.name));
  const unknown = completed.filter((n) => !known.has(n));
  if (unknown.length) {
    // Surfaces at build time (the page is static) — a typo in
    // progressConfig.completedCounties fails the deploy instead of
    // silently leaving a county unfilled.
    throw new Error(
      `progressConfig.completedCounties: no county named ${unknown
        .map((n) => `"${n}"`)
        .join(", ")} — names must match counties.ts exactly.`
    );
  }

  const doneSet = new Set(completed);
  // South → north, so the mint sweep climbs the country the way the
  // course database is being built.
  const done = COUNTY_SHAPES.filter((s) => doneSet.has(s.name)).sort(
    (a, b) => b.cy - a.cy
  );

  return (
    <figure
      className="fw-catlas"
      role="img"
      aria-label={`Map of England: ${completed.length} of ${COUNTY_SHAPES.length} counties mapped so far`}
    >
      <svg viewBox={`0 0 ${COUNTY_VIEW.w} ${COUNTY_VIEW.h}`} width="100%">
        <defs>
          <linearGradient
            id="fw-catlas-mint"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2={COUNTY_VIEW.w}
            y2={COUNTY_VIEW.h}
          >
            <stop offset="0%" stopColor="#5BE4C3" />
            <stop offset="100%" stopColor="#8FE85B" />
          </linearGradient>
        </defs>
        <g className="fw-catlas-base">
          {COUNTY_SHAPES.map((s) => (
            <path key={s.name} d={s.d} fillRule="evenodd">
              <title>{s.name}</title>
            </path>
          ))}
        </g>
        <g className="fw-catlas-done">
          {done.map((s, i) => (
            <path
              key={s.name}
              d={s.d}
              fillRule="evenodd"
              style={{ "--i": i } as CSSProperties}
            >
              <title>{`${s.name} — mapped`}</title>
            </path>
          ))}
        </g>
      </svg>
      <figcaption className="fw-catlas-legend" aria-hidden="true">
        <span>
          <i data-kind="done" /> Mapped
        </span>
        <span>
          <i /> Still to come
        </span>
      </figcaption>
    </figure>
  );
}
