// One-off generator for the England SVG path used in the atlas
// motif (src/components/marketing/Features.tsx).
//
// Tries several known GeoJSON sources in order and uses the first
// that includes an "England" feature. Run with:
//   node scripts/build-england-path.mjs
// Then copy the printed `d` attribute into Features.tsx.

import { Buffer } from "node:buffer";

const VIEW_W = 200;
const VIEW_H = 140;
const PADDING = 8;
const TARGET_POINTS = 100;

// Source URLs, tried in order.
//
// admin-1 has England broken into counties (Cornwall, Cumbria, ...), not as
// one shape — we need admin-0 map_subunits, which splits the UK into
// England / Scotland / Wales / Northern Ireland as distinct features.
const SOURCES = [
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_map_subunits.geojson",
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_map_subunits.geojson",
  "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/master/10m/cultural/ne_10m_admin_0_map_subunits.json",
];

async function main() {
  let england = null;
  let chosenSource = null;
  for (const url of SOURCES) {
    process.stderr.write(`trying ${url}\n`);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        process.stderr.write(`  HTTP ${res.status}\n`);
        continue;
      }
      const text = await res.text();
      // Some mirrors serve as JSON with BOM or other quirks.
      const data = JSON.parse(text);
      const features = data.features || [];
      process.stderr.write(`  ${features.length} features\n`);

      // Try to find England with permissive matching.
      const candidate = features.find((f) => {
        const p = f.properties || {};
        const subunit = (p.subunit || p.SUBUNIT || p.geounit || p.GEOUNIT || p.name || p.NAME || "").toString();
        const admin = (p.admin || p.ADMIN || p.sovereignt || p.SOVEREIGNT || "").toString();
        if (subunit.toLowerCase() !== "england") return false;
        if (!admin) return true;
        return admin.toLowerCase().includes("kingdom") || admin === "GB" || admin === "UK";
      });
      if (candidate) {
        england = candidate;
        chosenSource = url;
        break;
      }
      // Diagnostic — dump UK subdivisions if any.
      const ukSubs = features
        .filter((f) => {
          const p = f.properties || {};
          const admin = (p.admin || p.ADMIN || p.geonunit || "").toString();
          return admin.toLowerCase().includes("kingdom");
        })
        .map((f) => f.properties.name || f.properties.NAME)
        .filter(Boolean);
      if (ukSubs.length) {
        process.stderr.write(`  UK subdivisions: ${JSON.stringify(ukSubs)}\n`);
      }
    } catch (e) {
      process.stderr.write(`  ${e.message || e}\n`);
    }
  }

  if (!england) {
    throw new Error("England not found in any source");
  }

  process.stderr.write(`using ${chosenSource}\n`);
  process.stderr.write(`geometry: ${england.geometry.type}\n`);

  // Resolve to a single Polygon (largest by outer-ring area).
  let rings;
  if (england.geometry.type === "Polygon") {
    rings = england.geometry.coordinates;
  } else if (england.geometry.type === "MultiPolygon") {
    let largest = england.geometry.coordinates[0];
    let largestArea = 0;
    for (const poly of england.geometry.coordinates) {
      const area = Math.abs(ringArea(poly[0]));
      if (area > largestArea) {
        largestArea = area;
        largest = poly;
      }
    }
    rings = largest;
    process.stderr.write(
      `  ${england.geometry.coordinates.length} parts; picked largest (area=${largestArea.toFixed(2)})\n`
    );
  } else {
    throw new Error(`Unexpected geometry: ${england.geometry.type}`);
  }

  const outer = rings[0];
  process.stderr.write(`outer ring: ${outer.length} points\n`);

  // Bounding box.
  let minLng = Infinity,
    maxLng = -Infinity,
    minLat = Infinity,
    maxLat = -Infinity;
  for (const [lng, lat] of outer) {
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }
  process.stderr.write(
    `bbox lng [${minLng.toFixed(2)}, ${maxLng.toFixed(2)}] lat [${minLat.toFixed(2)}, ${maxLat.toFixed(2)}]\n`
  );

  // Mercator latitude correction so the silhouette isn't horizontally squashed.
  const meanLat = (minLat + maxLat) / 2;
  const lngScale = Math.cos((meanLat * Math.PI) / 180);

  const effLngRange = (maxLng - minLng) * lngScale;
  const effLatRange = maxLat - minLat;

  const scaleX = (VIEW_W - PADDING * 2) / effLngRange;
  const scaleY = (VIEW_H - PADDING * 2) / effLatRange;
  const scale = Math.min(scaleX, scaleY);

  const projW = effLngRange * scale;
  const projH = effLatRange * scale;
  const offsetX = (VIEW_W - projW) / 2;
  const offsetY = (VIEW_H - projH) / 2;

  const project = (lng, lat) => {
    const x = offsetX + (lng - minLng) * lngScale * scale;
    const y = offsetY + (maxLat - lat) * scale;
    return [x, y];
  };

  // Simple nth-point downsample.
  const step = Math.max(1, Math.floor(outer.length / TARGET_POINTS));
  const sampled = outer.filter((_, i) => i % step === 0);
  process.stderr.write(`downsampled to ${sampled.length} points (step=${step})\n`);

  const d =
    sampled
      .map(([lng, lat], i) => {
        const [x, y] = project(lng, lat);
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ") + " Z";

  process.stdout.write(d + "\n");
}

function ringArea(ring) {
  let area = 0;
  for (let i = 0; i < ring.length - 1; i++) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[i + 1];
    area += (x2 - x1) * (y2 + y1);
  }
  return area / 2;
}

// Avoid the "unused import" warning while keeping the helpful global.
void Buffer;

main().catch((err) => {
  process.stderr.write(`${err.stack || err.message || err}\n`);
  process.exit(1);
});
