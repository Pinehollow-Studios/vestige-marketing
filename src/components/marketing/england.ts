/**
 * England silhouette derived from Natural Earth 10m admin_0_map_subunits
 * (nvkelso/natural-earth-vector). Mainland polygon only; the original
 * 1,792 coastline points are downsampled to ~106 via scripts/build-england-path.mjs
 * (Mercator-corrected projection into the 200×140 viewBox).
 *
 * Shared by the "atlas" feature-card motif and the fixed AtlasMini HUD.
 */
export const ENGLAND_PATH =
  "M 91.1 96.8 L 91.0 94.3 L 90.2 92.1 L 87.0 90.2 L 85.4 87.3 L 85.8 85.7 L 86.4 83.6 L 86.9 82.4 L 84.2 79.8 L 87.1 77.4 L 85.6 77.5 L 85.8 76.0 L 86.7 73.7 L 86.1 72.5 L 85.3 70.6 L 86.1 69.1 L 89.7 69.6 L 89.2 67.7 L 87.9 64.0 L 84.5 59.2 L 89.0 61.1 L 89.6 60.6 L 88.1 51.9 L 88.7 47.0 L 89.5 43.6 L 87.6 43.0 L 85.3 44.0 L 84.2 41.9 L 81.6 39.7 L 79.6 32.7 L 82.9 27.5 L 85.7 25.9 L 87.4 24.2 L 91.2 20.6 L 93.9 17.4 L 96.2 16.2 L 96.9 14.4 L 95.5 11.9 L 97.6 9.8 L 101.5 11.1 L 103.5 12.1 L 105.0 16.2 L 105.5 19.9 L 106.6 23.4 L 107.9 26.9 L 110.1 32.7 L 110.9 32.9 L 119.9 39.4 L 121.9 42.5 L 127.0 54.6 L 119.5 52.4 L 118.1 52.9 L 127.0 57.3 L 129.5 65.5 L 127.0 70.2 L 131.1 69.8 L 138.1 68.3 L 147.9 78.4 L 145.5 87.0 L 140.5 88.7 L 141.4 90.0 L 138.5 93.3 L 135.5 94.2 L 137.3 94.9 L 135.7 98.5 L 131.1 99.2 L 134.5 100.4 L 134.5 101.0 L 143.0 103.8 L 138.9 108.6 L 129.6 114.3 L 121.8 113.5 L 114.2 114.1 L 111.7 114.5 L 110.1 114.3 L 108.4 113.9 L 104.7 115.6 L 100.3 116.1 L 99.8 116.7 L 93.9 117.8 L 86.6 116.1 L 81.8 118.0 L 80.9 118.7 L 80.3 123.1 L 77.4 126.6 L 73.2 124.5 L 71.6 121.5 L 71.1 123.3 L 69.1 123.3 L 64.4 124.7 L 61.2 128.1 L 60.2 128.8 L 59.5 130.8 L 56.3 128.8 L 52.3 129.3 L 55.4 126.9 L 59.6 122.5 L 62.1 120.1 L 63.9 118.5 L 67.4 110.5 L 71.3 108.1 L 76.1 105.0 L 86.6 105.8 L 87.4 102.0 L 92.3 96.4 L 93.3 94.4 Z";

/**
 * Pin positions derived from real course (lng, lat) projected through
 * the same Mercator-corrected projection as the silhouette, then
 * nudged 2-3px inland from the coast so they read as clearly inside
 * the shape rather than sitting on the boundary.
 */
export const COURSE_PINS = [
  { x: 95, y: 55, bright: true },    // Royal Birkdale (Lancs)
  { x: 95, y: 62, bright: false },   // Royal Liverpool (Wirral)
  { x: 120, y: 100, bright: true },  // Sunningdale (Surrey)
  { x: 115, y: 102, bright: false }, // The Berkshire
  { x: 135, y: 108, bright: true },  // Royal St George's (Kent)
  { x: 68, y: 119, bright: false },  // St Enodoc (Cornwall)
  { x: 75, y: 110, bright: true },   // Saunton (N. Devon)
  { x: 122, y: 65, bright: false },  // Woodhall Spa (Lincs)
  { x: 115, y: 45, bright: true },   // Ganton (N. Yorks)
  { x: 138, y: 82, bright: false },  // Royal Norwich (Norfolk)
  { x: 108, y: 75, bright: true },   // Notts (Hollinwell)
  { x: 93, y: 102, bright: false },  // Burnham & Berrow (Somerset)
  { x: 108, y: 53, bright: true },   // Alwoodley (Leeds)
  { x: 123, y: 110, bright: false }, // Walton Heath (Surrey)
] as const;
