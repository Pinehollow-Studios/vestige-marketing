"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mouse parallax — writes `--mx` / `--my` (0..1) to <html>.
 * AuroraBg + ConstellationBg pick them up from CSS.
 * Verbatim port from marketing-shared.jsx.
 */
export function useMouseParallax() {
  const ref = useRef({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const fn = (e: PointerEvent) => {
      ref.current.x = e.clientX / window.innerWidth;
      ref.current.y = e.clientY / window.innerHeight;
      document.documentElement.style.setProperty("--mx", ref.current.x.toFixed(3));
      document.documentElement.style.setProperty("--my", ref.current.y.toFixed(3));
    };
    window.addEventListener("pointermove", fn, { passive: true });
    return () => window.removeEventListener("pointermove", fn);
  }, []);
  return ref;
}

/**
 * Count-up — chosen to use setTimeout (not RAF) so it ticks in
 * backgrounded tabs and embedded previews.
 *
 * `enabled` defaults true so existing call sites (LiveEyebrow in the
 * hero, ClosingCTA chip) keep firing on mount. Pass `false` to gate the
 * counter and flip it `true` when the parent should kick the count —
 * e.g. when the stats strip scrolls into view.
 */
export function useCountUp(
  target: number,
  {
    duration = 1600,
    delay = 0,
    enabled = true,
  }: { duration?: number; delay?: number; enabled?: boolean } = {}
): number {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let start: number | null = null;
    const tick = () => {
      const now = performance.now();
      if (start == null) start = now;
      const p = Math.min(1, (now - start) / duration);
      const e = 1 - Math.pow(1 - p, 3);
      setV(Math.round(target * e));
      if (p < 1) timer = setTimeout(tick, 32);
    };
    timer = setTimeout(tick, delay);
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [target, duration, delay, enabled]);
  return v;
}

/**
 * Scroll-triggered reveal. Returns [ref, revealed] — attach the ref to
 * the element, gate transforms/opacity on the boolean. Fires once,
 * disconnects the observer after first hit. Respects
 * `prefers-reduced-motion: reduce` by resolving to revealed=true
 * immediately so no motion runs.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>({
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
}: { threshold?: number; rootMargin?: string } = {}) {
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduce-motion users: skip the transition, render at rest state.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setRevealed(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  return [ref, revealed] as const;
}

/**
 * Scroll progress (0..1) — drives the thin gradient bar at the top of
 * MarketingApp. Updates on scroll, throttled by passive listener.
 */
export function useScrollProgress(): number {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const next = max > 0 ? window.scrollY / max : 0;
      setP(Math.max(0, Math.min(1, next)));
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    window.addEventListener("resize", fn, { passive: true });
    return () => {
      window.removeEventListener("scroll", fn);
      window.removeEventListener("resize", fn);
    };
  }, []);
  return p;
}
