"use client";

import { accentFor, type Palette } from "./palette";

export type MotifKind = "atlas" | "tap" | "board";

/**
 * Three SVG feature motifs, each tuned to match its card body copy:
 *
 *   atlas  — Simplified England silhouette with pulsing course pins.
 *            Matches "Every course in England."
 *   tap    — Tap ripple + a logged-round receipt pill underneath.
 *            Matches "Tap the course. Add a score if you want to."
 *   board  — 5-row leaderboard, middle row highlighted as "you".
 *            Matches "A polite competition. Your friends, and across
 *            the country."
 */
function FeatureMotif({ kind, palette }: { kind: MotifKind; palette: Palette }) {
  const acc = accentFor(palette);

  if (kind === "atlas") {
    // England silhouette derived from Natural Earth 10m admin_0_map_subunits
    // (nvkelso/natural-earth-vector). Mainland polygon only; the original
    // 1,792 coastline points are downsampled to ~106 via scripts/build-england-path.mjs
    // (Mercator-corrected projection into the 200×140 viewBox).
    const pins = [
      { x: 95, y: 60, bright: true },    // Royal Birkdale (Lancashire)
      { x: 92, y: 65, bright: false },   // Royal Lytham
      { x: 128, y: 105, bright: true },  // Sunningdale (Surrey/Berks)
      { x: 122, y: 102, bright: false }, // The Berkshire
      { x: 143, y: 108, bright: true },  // Royal St George's (Kent)
      { x: 65, y: 124, bright: true },   // St Enodoc (Cornwall)
      { x: 72, y: 115, bright: false },  // Saunton (Devon)
      { x: 125, y: 75, bright: true },   // Woodhall Spa (Lincolnshire)
      { x: 120, y: 48, bright: false },  // Ganton (N. Yorkshire)
      { x: 95, y: 67, bright: false },   // Royal Liverpool
    ];
    return (
      <svg
        viewBox="0 0 200 140"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id={`mot-atlas-${palette}`} cx="50%" cy="55%" r="55%">
            <stop offset="0%" stopColor={acc.a} stopOpacity="0.45" />
            <stop offset="100%" stopColor={acc.a} stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id={`mot-atlas-fill-${palette}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={acc.a} stopOpacity="0.14" />
            <stop offset="100%" stopColor={acc.b} stopOpacity="0.06" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="200" height="140" fill={`url(#mot-atlas-${palette})`} />

        {/* England silhouette — see comment above for source */}
        <path
          d="M 91.1 96.8 L 91.0 94.3 L 90.2 92.1 L 87.0 90.2 L 85.4 87.3 L 85.8 85.7 L 86.4 83.6 L 86.9 82.4 L 84.2 79.8 L 87.1 77.4 L 85.6 77.5 L 85.8 76.0 L 86.7 73.7 L 86.1 72.5 L 85.3 70.6 L 86.1 69.1 L 89.7 69.6 L 89.2 67.7 L 87.9 64.0 L 84.5 59.2 L 89.0 61.1 L 89.6 60.6 L 88.1 51.9 L 88.7 47.0 L 89.5 43.6 L 87.6 43.0 L 85.3 44.0 L 84.2 41.9 L 81.6 39.7 L 79.6 32.7 L 82.9 27.5 L 85.7 25.9 L 87.4 24.2 L 91.2 20.6 L 93.9 17.4 L 96.2 16.2 L 96.9 14.4 L 95.5 11.9 L 97.6 9.8 L 101.5 11.1 L 103.5 12.1 L 105.0 16.2 L 105.5 19.9 L 106.6 23.4 L 107.9 26.9 L 110.1 32.7 L 110.9 32.9 L 119.9 39.4 L 121.9 42.5 L 127.0 54.6 L 119.5 52.4 L 118.1 52.9 L 127.0 57.3 L 129.5 65.5 L 127.0 70.2 L 131.1 69.8 L 138.1 68.3 L 147.9 78.4 L 145.5 87.0 L 140.5 88.7 L 141.4 90.0 L 138.5 93.3 L 135.5 94.2 L 137.3 94.9 L 135.7 98.5 L 131.1 99.2 L 134.5 100.4 L 134.5 101.0 L 143.0 103.8 L 138.9 108.6 L 129.6 114.3 L 121.8 113.5 L 114.2 114.1 L 111.7 114.5 L 110.1 114.3 L 108.4 113.9 L 104.7 115.6 L 100.3 116.1 L 99.8 116.7 L 93.9 117.8 L 86.6 116.1 L 81.8 118.0 L 80.9 118.7 L 80.3 123.1 L 77.4 126.6 L 73.2 124.5 L 71.6 121.5 L 71.1 123.3 L 69.1 123.3 L 64.4 124.7 L 61.2 128.1 L 60.2 128.8 L 59.5 130.8 L 56.3 128.8 L 52.3 129.3 L 55.4 126.9 L 59.6 122.5 L 62.1 120.1 L 63.9 118.5 L 67.4 110.5 L 71.3 108.1 L 76.1 105.0 L 86.6 105.8 L 87.4 102.0 L 92.3 96.4 L 93.3 94.4 Z"
          fill={`url(#mot-atlas-fill-${palette})`}
          stroke={acc.a}
          strokeOpacity="0.6"
          strokeWidth="0.8"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Course pins scattered across the map */}
        {pins.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.bright ? 2.2 : 1.6}
            fill={p.bright ? acc.a : "#9BB3C6"}
            opacity={p.bright ? 0.9 : 0.5}
            style={{
              animation: `fw-motif-pulse ${3 + ((i * 7) % 5)}s ease-in-out ${
                ((i * 11) % 20) / 10
              }s infinite`,
              transformBox: "fill-box",
              transformOrigin: "center",
              filter: p.bright ? `drop-shadow(0 0 4px ${acc.a})` : undefined,
            }}
          />
        ))}
      </svg>
    );
  }

  if (kind === "tap") {
    return (
      <svg
        viewBox="0 0 200 140"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id={`mot-tap-${palette}`} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor={acc.a} stopOpacity="0.5" />
            <stop offset="100%" stopColor={acc.a} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="200" height="140" fill={`url(#mot-tap-${palette})`} />

        {/* Tap ripples — three expanding rings */}
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx="100"
            cy="52"
            r="10"
            fill="none"
            stroke={acc.a}
            strokeWidth="0.8"
            opacity="0.5"
            style={{
              animation: `fw-motif-ring 2.6s ease-out ${i * 0.85}s infinite`,
              transformOrigin: "100px 52px",
            }}
          />
        ))}
        {/* Central tap dot */}
        <circle
          cx="100"
          cy="52"
          r="6"
          fill={acc.a}
          style={{
            filter: `drop-shadow(0 0 10px ${acc.a})`,
            animation: "fw-motif-bob 2.6s ease-in-out infinite",
            transformBox: "fill-box",
            transformOrigin: "center",
          }}
        />

        {/* Logged-round receipt pill below — visualises the optional score */}
        <g transform="translate(55, 96)">
          <rect
            x="0"
            y="0"
            width="90"
            height="24"
            rx="6"
            fill="rgba(0,0,0,0.4)"
            stroke={acc.a}
            strokeOpacity="0.45"
            strokeWidth="0.7"
          />
          {/* mint dot — the played marker */}
          <circle
            cx="13"
            cy="12"
            r="3.2"
            fill={acc.a}
            style={{ filter: `drop-shadow(0 0 4px ${acc.a})` }}
          />
          {/* course name placeholder */}
          <rect x="23" y="7" width="38" height="2.6" rx="1.3" fill="rgba(255,255,255,0.45)" />
          <rect x="23" y="14" width="26" height="2" rx="1" fill="rgba(255,255,255,0.22)" />
          {/* score chip on the right */}
          <rect
            x="66"
            y="6"
            width="18"
            height="12"
            rx="3"
            fill={`${acc.a}40`}
            stroke={acc.a}
            strokeOpacity="0.7"
            strokeWidth="0.6"
          />
        </g>
      </svg>
    );
  }

  // kind === "board" — leaderboard rows, middle row highlighted as "you"
  const rows = [
    { width: 130, isYou: false },
    { width: 108, isYou: false },
    { width: 88, isYou: true },
    { width: 72, isYou: false },
    { width: 56, isYou: false },
  ];
  return (
    <svg
      viewBox="0 0 200 140"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id={`mot-board-${palette}`} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={acc.a} stopOpacity="0.25" />
          <stop offset="100%" stopColor={acc.a} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="200" height="140" fill={`url(#mot-board-${palette})`} />

      {rows.map((row, i) => {
        const y = 16 + i * 22;
        return (
          <g key={i}>
            {/* avatar dot on the left */}
            <circle
              cx="22"
              cy={y + 4}
              r="3.5"
              fill={row.isYou ? acc.a : "#9BB3C6"}
              opacity={row.isYou ? 1 : 0.55}
              style={row.isYou ? { filter: `drop-shadow(0 0 4px ${acc.a})` } : undefined}
            />
            {/* score-length bar — width descends to suggest ranking */}
            <rect
              x="34"
              y={y}
              width={row.width}
              height="8"
              rx="4"
              fill={row.isYou ? acc.a : "rgba(255,255,255,0.08)"}
              fillOpacity={row.isYou ? 0.6 : 1}
              stroke={row.isYou ? acc.a : "rgba(255,255,255,0.15)"}
              strokeWidth="0.6"
            />
          </g>
        );
      })}
    </svg>
  );
}

export function FeatureCard({
  kind,
  eyebrow,
  title,
  body,
  palette,
}: {
  kind: MotifKind;
  eyebrow: string;
  title: string;
  body: string;
  palette: Palette;
}) {
  const acc = accentFor(palette);
  return (
    <article className="fw-feature">
      <div className="fw-feature-motif">
        <FeatureMotif kind={kind} palette={palette} />
      </div>
      <div className="fw-feature-body">
        <div className="fw-feature-eyebrow" style={{ color: acc.a }}>
          {eyebrow}
        </div>
        <h3 className="fw-feature-title">{title}</h3>
        <p className="fw-feature-copy">{body}</p>
      </div>
    </article>
  );
}
