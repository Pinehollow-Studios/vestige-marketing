import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Root not-found — catches every unmatched URL across the app as well as any
 * notFound() thrown in a segment. Styled to match the privacy page's quiet,
 * dark register rather than the marketing homepage.
 */

export const metadata: Metadata = {
  title: "Page not found",
  description: `That page doesn't exist on ${siteConfig.domain}.`,
};

export default function NotFound() {
  const { brandName } = siteConfig;

  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "#06090E",
        color: "#F6F4EE",
        fontFamily: "var(--font-ui)",
        WebkitFontSmoothing: "antialiased",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: 560, padding: "48px 24px 96px", textAlign: "center" }}>
        <p
          style={{
            fontSize: 13,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#5BE4C3",
            margin: 0,
          }}
        >
          404
        </p>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 7vw, 64px)",
            fontWeight: 500,
            letterSpacing: "-2px",
            lineHeight: 1.05,
            margin: "18px 0 0",
          }}
        >
          This page doesn&rsquo;t exist
        </h1>

        <p
          style={{
            fontSize: 16,
            lineHeight: 1.72,
            color: "#A8B3C0",
            margin: "20px 0 0",
          }}
        >
          Whatever you were looking for isn&rsquo;t here — it may have moved, or
          the address may be mistyped. The rest of {brandName} is where it
          should be.
        </p>

        <Link
          href="/"
          style={{
            display: "inline-block",
            marginTop: 36,
            padding: "12px 24px",
            borderRadius: 999,
            border: "1px solid rgba(91,228,195,0.35)",
            color: "#5BE4C3",
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          ← Back to {brandName}
        </Link>
      </div>
    </main>
  );
}
