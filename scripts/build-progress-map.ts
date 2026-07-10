/**
 * Builds the coverage-map snapshot used in the progress-update email
 * (src/emails/update.tsx) into public/progress/atlas-current.png.
 *
 * It renders the SAME county geometry and the SAME completed-counties list the
 * website's /progress map uses (src/components/progress/counties.ts +
 * src/lib/progressConfig.ts), so the email map can never disagree with the
 * site. Email clients don't render inline SVG reliably, hence a PNG.
 *
 * Workflow each send: edit progressConfig (coursesMapped / completedCounties /
 * latestCounty), run `npm run build:map`, commit the regenerated PNG, deploy,
 * then send the broadcast.
 *
 *   npm run build:map
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import { COUNTY_SHAPES, COUNTY_VIEW } from "../src/components/progress/counties.ts";
import { progressConfig } from "../src/lib/progressConfig.ts";
import { siteConfig } from "../src/lib/siteConfig.ts";

const here = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(here, "../public/progress/atlas-current.png");
// Retina width — displayed at 440px in the email, so ~2x keeps it crisp.
const RENDER_WIDTH = 880;

// Fail loudly on a typo, mirroring CountyAtlas's build-time guard.
const known = new Set(COUNTY_SHAPES.map((s) => s.name));
const unknown = progressConfig.completedCounties.filter((n) => !known.has(n));
if (unknown.length) {
  throw new Error(
    `progressConfig.completedCounties: unknown county ${unknown
      .map((n) => `"${n}"`)
      .join(", ")} — names must match counties.ts exactly.`
  );
}

const doneSet = new Set<string>(progressConfig.completedCounties);
const latest = progressConfig.latestCounty;

// Colours/strokes mirror globals.css (.fw-catlas-base / .fw-catlas-done).
const basePaths = COUNTY_SHAPES.map(
  (s) =>
    `<path d="${s.d}" fill="rgba(246,244,238,0.04)" stroke="rgba(255,255,255,0.10)" stroke-width="0.6" stroke-linejoin="round" fill-rule="evenodd"/>`
).join("");

const donePaths = COUNTY_SHAPES.filter((s) => doneSet.has(s.name))
  .map(
    (s) =>
      `<path d="${s.d}" fill="url(#mint)" stroke="rgba(6,9,14,0.5)" stroke-width="0.7" stroke-linejoin="round" fill-rule="evenodd"/>`
  )
  .join("");

// The most-recent county gets a soft light outline (the email's static stand-in
// for the website's pulsing "just added" beacon).
const latestShape = COUNTY_SHAPES.find((s) => s.name === latest && doneSet.has(s.name));
const latestOutline = latestShape
  ? `<path d="${latestShape.d}" fill="none" stroke="#EAFBF5" stroke-width="1.3" stroke-linejoin="round" fill-rule="evenodd"/>`
  : "";

// Optional standout-course pin — a glowing mint marker at the county's
// centroid (a "played course" pin, §11 — distinct from the county fill, which
// is reserved for 100% complete). Named in the email caption, not on the map.
const spot = siteConfig.progress.spotlight;
let spotlightPin = "";
if (spot.enabled) {
  const spotShape = COUNTY_SHAPES.find((s) => s.name === spot.county);
  if (!spotShape) {
    throw new Error(
      `progress.spotlight.county "${spot.county}" is not a county in counties.ts — names must match exactly.`
    );
  }
  spotlightPin =
    `<circle cx="${spotShape.cx}" cy="${spotShape.cy}" r="15" fill="url(#pinGlow)"/>` +
    `<circle cx="${spotShape.cx}" cy="${spotShape.cy}" r="3.4" fill="#5BE4C3" stroke="#EAFBF5" stroke-width="0.7"/>`;
}

const { w, h } = COUNTY_VIEW;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="mint" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${w}" y2="${h}">
      <stop offset="0%" stop-color="#5BE4C3"/>
      <stop offset="100%" stop-color="#8FE85B"/>
    </linearGradient>
    <radialGradient id="halo" cx="50%" cy="48%" r="55%">
      <stop offset="0%" stop-color="#5BE4C3" stop-opacity="0.12"/>
      <stop offset="70%" stop-color="#5BE4C3" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#5BE4C3" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#5BE4C3" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect x="0" y="0" width="${w}" height="${h}" fill="url(#halo)"/>
  <g>${basePaths}</g>
  <g>${donePaths}</g>
  ${latestOutline}
  ${spotlightPin}
</svg>`;

const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: RENDER_WIDTH },
  background: "rgba(0,0,0,0)", // transparent — sits on the email's dark card
});
const png = resvg.render().asPng();

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, png);

const done = progressConfig.completedCounties.length;
const pinNote = spot.enabled ? `, pin: ${spot.name} (${spot.county})` : "";
console.log(
  `Wrote ${OUT}\n  ${done} counties filled${latest ? ` (latest: ${latest})` : ""}${pinNote}, ${png.length} bytes`
);
