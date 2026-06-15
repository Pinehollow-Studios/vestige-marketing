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
export function CountyAtlas({
  completed,
  latest,
}: {
  completed: ReadonlyArray<string>;
  latest?: string;
}) {
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

  // The most recent addition gets a "Just added" beacon anchored to its
  // centroid. It waits out the south->north fill sweep, then pulses — the
  // delay is derived from the county count so it always lands just after the
  // last county fills, however many there are. (Mirrors the done-path timing
  // in globals.css: 620ms + i*55ms, 500ms each.)
  const latestShape = latest ? done.find((s) => s.name === latest) : undefined;
  const beaconDelay = 1120 + Math.max(0, done.length - 1) * 55 + 200;

  return (
    <figure
      className="fw-catlas"
      role="img"
      aria-label={`Map of England: ${completed.length} of ${COUNTY_SHAPES.length} counties mapped so far${
        latestShape ? `, most recently ${latestShape.name}` : ""
      }`}
      style={
        latestShape
          ? ({ "--beacon-delay": `${beaconDelay}ms` } as CSSProperties)
          : undefined
      }
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
              <title>{`${s.name} — ${
                s.name === latest ? "just added" : "mapped"
              }`}</title>
            </path>
          ))}
        </g>
        {latestShape && (
          <g className="fw-catlas-beacon" aria-hidden="true">
            <circle
              className="fw-catlas-ping"
              cx={latestShape.cx}
              cy={latestShape.cy}
              r="7"
            />
            <circle
              className="fw-catlas-beacon-dot"
              cx={latestShape.cx}
              cy={latestShape.cy}
              r="3.2"
            />
          </g>
        )}
      </svg>
      {latestShape && (
        <span
          className="fw-catlas-beacon-label"
          style={{
            left: `${(latestShape.cx / COUNTY_VIEW.w) * 100}%`,
            top: `${(latestShape.cy / COUNTY_VIEW.h) * 100}%`,
          }}
        >
          Just added
        </span>
      )}
      <figcaption className="fw-catlas-legend" aria-hidden="true">
        <span>
          <i data-kind="done" /> Mapped
        </span>
        {latestShape && (
          <span>
            <i data-kind="latest" /> Just added
          </span>
        )}
        <span>
          <i /> Still to come
        </span>
      </figcaption>
    </figure>
  );
}
