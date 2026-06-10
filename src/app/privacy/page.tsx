import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Privacy notice — deliberately scoped to the *website* only.
 *
 * The site collects one thing (an email, for the waiting list), so this stays
 * short and describes exactly that. The fuller app privacy policy (drafted in
 * /legal, pending solicitor review) belongs with the app at launch, not here.
 */

export const metadata: Metadata = {
  title: "Privacy",
  description: `How the ${siteConfig.brandName} waiting-list website handles your email.`,
};

const UPDATED = "10 June 2026";

const link: React.CSSProperties = {
  color: "#5BE4C3",
  textDecoration: "underline",
  textUnderlineOffset: 2,
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ marginTop: 36 }}>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: "-0.3px",
          color: "#F6F4EE",
          margin: 0,
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontSize: 15.5,
          lineHeight: 1.75,
          color: "#A8B3C0",
          margin: "10px 0 0",
        }}
      >
        {children}
      </p>
    </section>
  );
}

export default function PrivacyPage() {
  const { brandName, domain, contactEmail } = siteConfig;
  const studio = siteConfig.footer.studio.name;
  const mailto = `mailto:${contactEmail}`;

  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "#06090E",
        color: "#F6F4EE",
        fontFamily: "var(--font-ui)",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "clamp(56px, 9vw, 110px) 24px 96px",
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-block",
            marginBottom: 44,
            fontSize: 13,
            color: "#9BA7B5",
            textDecoration: "none",
          }}
        >
          ← {brandName}
        </Link>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 7vw, 72px)",
            fontWeight: 500,
            letterSpacing: "-2px",
            lineHeight: 1,
            margin: 0,
          }}
        >
          Privacy
        </h1>
        <p style={{ color: "#5F6B7A", fontSize: 13, margin: "14px 0 40px" }}>
          The waiting-list website at {domain} · Last updated {UPDATED}
        </p>

        <p style={{ fontSize: 17, lineHeight: 1.7, color: "rgba(246,244,238,0.85)", margin: 0 }}>
          This is short, because the site does very little. {brandName} is made by{" "}
          {studio}, who looks after the details you give us here.
        </p>

        <Section title="What we collect">
          Only your email address, and only when you choose to join the waiting list. No name,
          no password, and no advertising or third-party tracking on this site.
        </Section>

        <Section title="Why we collect it">
          So we can let you know about {brandName}
          {" — "}
          chiefly the moment it&rsquo;s ready to download, plus the occasional closely-related
          update. Nothing else.
        </Section>

        <Section title="Who handles it">
          Your email is stored and sent through Resend (our email provider), and the site is
          hosted by Vercel. We never sell your email or share it with anyone else for their own
          marketing.
        </Section>

        <Section title="Your choices">
          You can unsubscribe from any email we send, or ask us to delete your details entirely,
          at any time — just email{" "}
          <a href={mailto} style={link}>
            {contactEmail}
          </a>
          .
        </Section>

        <Section title="When the app arrives">
          The {brandName} app will have its own, fuller privacy policy covering how the app itself
          handles your data. This notice only covers the website.
        </Section>

        <p
          style={{
            marginTop: 56,
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.10)",
            fontSize: 14,
            color: "#9BA7B5",
          }}
        >
          Questions?{" "}
          <a href={mailto} style={link}>
            {contactEmail}
          </a>
        </p>
      </div>
    </main>
  );
}
