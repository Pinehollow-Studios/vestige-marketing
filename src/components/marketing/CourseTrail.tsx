"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The course trail — a dashed routing line, like a route drawn on a
 * paper map, weaving down the entire page behind the content. As the
 * visitor scrolls, the route draws itself just ahead of the viewport
 * centre, a glowing ball travels the line, and a golf pin flag at each
 * section lights up as the ball passes — by the footer the whole
 * round has been "played".
 *
 * Geometry is measured from the real section positions (and re-measured
 * when the document resizes, e.g. an FAQ opening), so the bends always
 * land beside their sections. All per-frame work is direct DOM writes —
 * dashoffset on the reveal mask, a transform on the ball — no renders.
 */

type Flag = { x: number; y: number };
type Geom = { w: number; h: number; top: number; d: string; flags: Flag[] };

/** Sections the trail bends beside, in page order. */
const ANCHORS = [
  ".fw-stats",
  "#features",
  "#what",
  "#roadmap",
  ".fw-faq-section",
  "#join",
] as const;

function buildGeom(): Geom | null {
  const w = window.innerWidth;
  if (w < 760) return null;
  const marquee = document.querySelector(".fw-marquee");
  const mega = document.querySelector(".fw-mega");
  if (!marquee || !mega) return null;

  const yOf = (el: Element, frac: number) => {
    const r = el.getBoundingClientRect();
    return window.scrollY + r.top + r.height * frac;
  };

  const top = yOf(marquee, 0.5);
  const pts: Array<{ x: number; y: number }> = [{ x: w * 0.5, y: top }];
  const flags: Flag[] = [];
  let side = 0;
  for (const sel of ANCHORS) {
    const el = document.querySelector(sel);
    if (!el) continue;
    const x = side % 2 === 0 ? w * 0.09 : w * 0.91;
    side++;
    const y = yOf(el, 0.5);
    if (y <= pts[pts.length - 1].y + 40) continue; // keep strictly descending
    pts.push({ x, y });
    flags.push({ x, y: y - top });
  }
  // The journey ends at the mega wordmark — back to the brand.
  const endY = yOf(mega, 0.12);
  if (endY > pts[pts.length - 1].y + 40) pts.push({ x: w * 0.5, y: endY });

  const h = pts[pts.length - 1].y - top + 4;
  let d = `M ${pts[0].x.toFixed(1)} 0`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const dy = b.y - a.y;
    // Vertical-tangent cubics — keeps the curve monotonic in y, which
    // the y→length lookup in the scroll loop relies on.
    d += ` C ${a.x.toFixed(1)} ${(a.y - top + dy * 0.5).toFixed(1)}, ${b.x.toFixed(1)} ${(b.y - top - dy * 0.5).toFixed(1)}, ${b.x.toFixed(1)} ${(b.y - top).toFixed(1)}`;
  }
  return { w, h, top, d, flags };
}

export function CourseTrail() {
  const [geom, setGeom] = useState<Geom | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const drawRef = useRef<SVGPathElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);

  // Measure + rebuild on resize and on document-height changes (fonts
  // settling, FAQ accordions opening). Keyed so identical geometry
  // doesn't loop through setState.
  useEffect(() => {
    let last = "";
    const build = () => {
      const g = buildGeom();
      const key = g ? `${g.w}|${Math.round(g.h)}|${Math.round(g.top)}` : "none";
      if (key === last) return;
      last = key;
      setGeom(g);
    };
    build();
    let t: ReturnType<typeof setTimeout> | undefined;
    const queue = () => {
      clearTimeout(t);
      t = setTimeout(build, 200);
    };
    window.addEventListener("resize", queue);
    const ro = new ResizeObserver(queue);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("resize", queue);
      ro.disconnect();
      clearTimeout(t);
    };
  }, []);

  // The scroll loop — sample the path once per geometry, then each
  // frame map "viewport centre" → path length → dashoffset + ball.
  useEffect(() => {
    if (!geom) return;
    const pathEl = pathRef.current;
    const drawEl = drawRef.current;
    const ball = ballRef.current;
    const wrap = wrapRef.current;
    if (!pathEl || !drawEl || !ball || !wrap) return;

    const total = pathEl.getTotalLength();
    const N = 480;
    const sx = new Float64Array(N + 1);
    const sy = new Float64Array(N + 1);
    for (let i = 0; i <= N; i++) {
      const pt = pathEl.getPointAtLength((total * i) / N);
      sx[i] = pt.x;
      sy[i] = pt.y;
    }
    // y is monotonic (vertical-tangent cubics) → binary search by y.
    const fracAtY = (y: number): number => {
      if (y <= sy[0]) return 0;
      if (y >= sy[N]) return 1;
      let lo = 0;
      let hi = N;
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (sy[mid] < y) lo = mid;
        else hi = mid;
      }
      const span = sy[hi] - sy[lo];
      const t = span > 0 ? (y - sy[lo]) / span : 0;
      return (lo + t) / N;
    };
    const pointAt = (f: number) => {
      const idx = Math.max(0, Math.min(N, f * N));
      const lo = Math.floor(idx);
      const hi = Math.min(N, lo + 1);
      const t = idx - lo;
      return { x: sx[lo] + (sx[hi] - sx[lo]) * t, y: sy[lo] + (sy[hi] - sy[lo]) * t };
    };

    const flagEls = Array.from(
      wrap.querySelectorAll<SVGGElement>(".fw-trail-flag")
    );
    const flagFracs = geom.flags.map((f) => fracAtY(f.y));
    const flagLit = flagEls.map(() => false);

    let raf = 0;
    let cur = -1;
    // The ball (own compositor layer) moves every frame; the drawn-line
    // reveal is a horizontal clip-path updated at ~10Hz with a CSS
    // transition smoothing the steps — repainting the document-length
    // SVG 10× a second instead of every frame is the difference between
    // smooth and slideshow on retina displays.
    let lastBall = "";
    let lastBallOp = "";
    let lastClipY = -1;
    let lastClipT = 0;
    const loop = (now: number) => {
      const targetY = window.scrollY + window.innerHeight * 0.62 - geom.top;
      const target = fracAtY(targetY);
      cur = cur < 0 ? target : cur + (target - cur) * 0.12;
      if (Math.abs(target - cur) < 0.0005) cur = target;

      const pt = pointAt(cur);
      const ballT = `translate3d(${pt.x.toFixed(1)}px, ${pt.y.toFixed(1)}px, 0)`;
      if (ballT !== lastBall) {
        ball.style.transform = ballT;
        lastBall = ballT;
      }
      const ballOp = cur < 0.004 || cur > 0.996 ? "0" : "1";
      if (ballOp !== lastBallOp) {
        ball.style.opacity = ballOp;
        lastBallOp = ballOp;
      }
      const clipY = Math.round(pt.y);
      if (clipY !== lastClipY && now - lastClipT > 100) {
        drawEl.style.clipPath = `inset(0 0 ${Math.max(0, geom.h - clipY)}px 0)`;
        lastClipY = clipY;
        lastClipT = now;
      }
      for (let i = 0; i < flagEls.length; i++) {
        const lit = cur >= flagFracs[i] - 0.002;
        if (lit !== flagLit[i]) {
          flagLit[i] = lit;
          if (lit) flagEls[i].setAttribute("data-lit", "1");
          else flagEls[i].removeAttribute("data-lit");
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [geom]);

  if (!geom) return null;

  return (
    <div
      ref={wrapRef}
      className="fw-trail"
      style={{ top: geom.top, height: geom.h }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${geom.w} ${geom.h}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="fw-trail-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5BE4C3" />
            <stop offset="55%" stopColor="#8FE85B" />
            <stop offset="100%" stopColor="#F4A85C" />
          </linearGradient>
        </defs>

        {/* the full route, barely-there — where the journey will go.
            Also serves as the measuring path for the scroll loop. */}
        <path ref={pathRef} d={geom.d} className="fw-trail-base" />
        {/* the played portion — revealed by a cheap horizontal clip
            that tracks the ball (the route is monotonic in y, so a
            y-clip and a length-based reveal look the same) */}
        <path
          ref={drawRef}
          d={geom.d}
          className="fw-trail-draw"
          stroke="url(#fw-trail-grad)"
          style={{ clipPath: "inset(0 0 100% 0)" }}
        />

        {/* a golf pin at each section bend */}
        {geom.flags.map((f, i) => (
          <g
            key={i}
            className="fw-trail-flag"
            transform={`translate(${f.x.toFixed(1)} ${f.y.toFixed(1)})`}
          >
            <line className="fw-flag-pole" x1="0" y1="0" x2="0" y2="-20" />
            <path className="fw-flag-pennant" d="M 0 -20 L 13 -16 L 0 -12 Z" />
            <circle className="fw-flag-dot" r="3" />
          </g>
        ))}

      </svg>

      {/* the ball, travelling the route just ahead of the reader — an
          HTML element so its every-frame movement stays off the SVG */}
      <div ref={ballRef} className="fw-trail-ball" />
    </div>
  );
}
