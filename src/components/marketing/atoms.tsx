"use client";

import { Fragment, useEffect, useState } from "react";
import { accentFor, fwF, fwT, type Palette } from "./palette";
import { useCountUp } from "./hooks";

// ─── Word-by-word reveal animation ──────────────────────────
// Direct port from marketing-shared.jsx :: RevealHeadline.

type RevealHeadlineProps = {
  pre: string;
  ital: string;
  post: string;
  palette?: Palette;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
  italGradient?: boolean;
};

export function RevealHeadline({
  pre,
  ital,
  post,
  palette = "mint",
  fontSize,
  lineHeight,
  letterSpacing,
  italGradient = true,
}: RevealHeadlineProps) {
  const acc = accentFor(palette);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);
  const words = (pre + ital + post).split(/(\s+)/);
  const italStart = pre.length;
  const italEnd = italStart + ital.length;
  let cursor = 0;
  return (
    <h1
      style={{
        fontFamily: fwF.display,
        fontWeight: 500,
        color: fwT.ink,
        margin: 0,
        fontSize,
        lineHeight,
        letterSpacing,
        wordSpacing: "0.12em",
        textWrap: "pretty",
      }}
    >
      {words.map((w, i) => {
        const wStart = cursor;
        const wEnd = wStart + w.length;
        cursor = wEnd;
        const inItal = wStart < italEnd && wEnd > italStart;
        if (/^\s+$/.test(w)) return <Fragment key={i}>{" "}</Fragment>;
        const child = inItal ? (
          <span
            style={{
              background: italGradient
                ? `linear-gradient(120deg, ${acc.a} 0%, ${acc.b} 50%, ${acc.a} 100%)`
                : undefined,
              backgroundSize: italGradient ? "200% 100%" : undefined,
              WebkitBackgroundClip: italGradient ? "text" : undefined,
              backgroundClip: italGradient ? "text" : undefined,
              WebkitTextFillColor: italGradient ? "transparent" : undefined,
              color: italGradient ? "transparent" : acc.a,
              animation: italGradient
                ? "fw-italic-shimmer 6s linear infinite"
                : undefined,
            }}
          >
            {w}
          </span>
        ) : (
          w
        );
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              transform: visible
                ? "translateY(0) scale(1)"
                : "translateY(40%) scale(0.98)",
              opacity: visible ? 1 : 0,
              filter: visible ? "blur(0)" : "blur(8px)",
              transition: `transform 800ms cubic-bezier(0.2,0.8,0.2,1) ${i * 60}ms, opacity 800ms ease ${i * 60}ms, filter 800ms ease ${i * 60}ms`,
              willChange: "transform,opacity,filter",
            }}
          >
            {child}
          </span>
        );
      })}
    </h1>
  );
}

// ─── Brand mark + lockup ────────────────────────────────────

type FwMarkProps = { size?: number; palette?: Palette };

export function FwMark({ size = 26, palette = "mint" }: FwMarkProps) {
  const acc = accentFor(palette);
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.32,
        flexShrink: 0,
        background: `linear-gradient(160deg, ${acc.a} 0%, ${acc.b} 100%)`,
        boxShadow: `0 0 0 1px rgba(255,255,255,0.32) inset, 0 6px 16px -4px ${acc.a}80`,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 16 16" fill="none">
        <path
          d="M3 12 L3 3 L11 5 L8 7 L11 9 L3 7"
          fill={acc.on}
          stroke={acc.on}
          strokeWidth="0.5"
          strokeLinejoin="round"
        />
        <path d="M2 12 L14 12" stroke={acc.on} strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </span>
  );
}

type FwLockupProps = {
  palette?: Palette;
  size?: number;
  color?: string;
  gap?: number;
  /** Caption to the right of the mark. Defaults to siteConfig.brandName. */
  label?: string;
  /** Show the gradient brand mark to the left of the wordmark. */
  showMark?: boolean;
};

export function FwLockup({
  palette = "mint",
  size = 26,
  color,
  gap = 10,
  label = "VESTIGE",
  showMark = true,
}: FwLockupProps) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap }}>
      {showMark && <FwMark size={size} palette={palette} />}
      <span
        style={{
          fontFamily: fwF.ui,
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 1.6,
          textTransform: "uppercase",
          color: color || fwT.ink,
        }}
      >
        {label}
      </span>
    </span>
  );
}

// ─── Live-counter eyebrow ───────────────────────────────────

type LiveEyebrowProps = {
  palette?: Palette;
  target?: number | null;
  label?: string;
  children?: React.ReactNode;
};

export function LiveEyebrow({
  palette = "mint",
  target,
  label,
  children,
}: LiveEyebrowProps) {
  const acc = accentFor(palette);
  const n = useCountUp(target ?? 0, { duration: 2200, delay: 200 });
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "7px 13px 7px 11px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: 999,
        fontFamily: fwF.ui,
        fontSize: 12,
        fontWeight: 600,
        color: fwT.ink2,
        letterSpacing: 0.1,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <span style={{ position: "relative", display: "inline-flex" }}>
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: 999,
            background: acc.a,
            animation: "fw-pulse-dot 1.8s ease-in-out infinite",
          }}
        />
        <span
          style={{
            position: "absolute",
            inset: -3,
            borderRadius: 999,
            border: `1px solid ${acc.a}`,
            opacity: 0.4,
            animation: "fw-pulse-ring 1.8s ease-out infinite",
          }}
        />
      </span>
      <span>
        {target != null && (
          <span
            style={{
              color: fwT.ink,
              fontWeight: 700,
              fontFeatureSettings: '"tnum" 1',
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {n.toLocaleString("en-GB")}
          </span>
        )}
        {target != null && " "}
        {label || children}
      </span>
    </span>
  );
}

// ─── Footer mark ────────────────────────────────────────────

export function FooterMark({
  children,
  dim,
}: {
  children: React.ReactNode;
  dim?: boolean;
}) {
  return (
    <span
      style={{
        fontFamily: fwF.ui,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 2.2,
        textTransform: "uppercase",
        color: dim ? fwT.ink3 : fwT.ink2,
      }}
    >
      {children}
    </span>
  );
}
