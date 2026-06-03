import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Web fallback for the `https://vestige.golf/u/<username>` universal
 * link (CLAUDE.md §10.1). When the Vestige app is installed and the
 * Associated Domains capability is live, iOS opens the app straight to
 * the profile and this page never renders. Otherwise — app not
 * installed, or the entitlement not yet provisioned — the link lands
 * here: a graceful "@username is on Vestige" card pointing at the
 * waiting list (pre-launch) or the App Store (post-launch).
 */

type Params = { username: string };

/**
 * Strip a stray leading `@` and cap length defensively. This value is
 * only ever rendered as text — never trusted for a lookup (the app does
 * the real username → profile resolution on its side).
 */
function cleanUsername(raw: string): string {
  return decodeURIComponent(raw).replace(/^@+/, "").slice(0, 40);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { username } = await params;
  const handle = cleanUsername(username);
  return {
    title: `@${handle}`,
    description: `@${handle} is keeping their golf collection on ${siteConfig.brandName}.`,
  };
}

export default async function ProfileInvitePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { username } = await params;
  const handle = cleanUsername(username);
  const launched = siteConfig.appStoreUrl !== null;
  const ctaHref = launched ? (siteConfig.appStoreUrl as string) : "/";
  const ctaLabel = launched ? `Get ${siteConfig.brandName}` : "Join the waiting list";

  return (
    <main
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--s-4)",
        background: "var(--gradient-ocean), var(--paper)",
        color: "var(--ink)",
        fontFamily: "var(--font-ui)",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 420, display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--s-3)" }}>
        <span
          style={{
            fontSize: 13,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--accent)",
            fontWeight: 600,
          }}
        >
          {siteConfig.brandName}
        </span>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.4rem, 9vw, 3.4rem)",
            lineHeight: 1.05,
            margin: 0,
            fontWeight: 500,
          }}
        >
          @{handle}
        </h1>

        <p style={{ fontSize: 17, lineHeight: 1.5, color: "var(--ink-2)", margin: 0 }}>
          is keeping their golf collection on {siteConfig.brandName}.{" "}
          {siteConfig.tagline}
        </p>

        <a
          href={ctaHref}
          style={{
            marginTop: "var(--s-2)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "14px 28px",
            borderRadius: "var(--r-pill)",
            background: "var(--gradient-accent)",
            color: "var(--on-accent)",
            fontWeight: 600,
            fontSize: 16,
            textDecoration: "none",
          }}
        >
          {ctaLabel}
        </a>

        {!launched && (
          <p style={{ fontSize: 13, color: "var(--ink-3)", margin: 0 }}>
            {siteConfig.brandName} is launching soon. Open this link on your
            iPhone once the app is installed to jump straight to the profile.
          </p>
        )}
      </div>
    </main>
  );
}
