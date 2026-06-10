import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Privacy notice — scoped to the *website* (the waiting list collects one
 * thing: an email). Written with the seriousness data deserves; the fuller app
 * privacy policy (drafted in /legal, pending solicitor review) ships with the
 * app at launch.
 */

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${siteConfig.brandName} collects, uses, and protects the email you give the waiting list.`,
};

const UPDATED = "10 June 2026";

const link: React.CSSProperties = {
  color: "#5BE4C3",
  textDecoration: "underline",
  textUnderlineOffset: 2,
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ marginTop: 38 }}>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 21,
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
          lineHeight: 1.78,
          color: "#A8B3C0",
          margin: "12px 0 0",
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
          {domain} waiting list · Last updated {UPDATED}
        </p>

        <p style={{ fontSize: 17, lineHeight: 1.72, color: "rgba(246,244,238,0.85)", margin: 0 }}>
          We take your privacy seriously and handle your information with care. This
          notice sets out exactly what we collect when you join the {brandName} waiting
          list, why we collect it, how we protect it, and the rights you hold over it.{" "}
          {brandName} is operated by {studio}, which is the data controller responsible
          for your information.
        </p>

        <Section title="What we collect">
          When you join the waiting list, we collect your email address — the only personal
          information this website asks for or stores. We also use Vercel&rsquo;s
          privacy-first analytics to count visits and page views; it sets no cookies, does
          not identify you, and does not follow you across other sites. There is no
          advertising here.
        </Section>

        <Section title="Why we hold it, and our lawful basis">
          We hold your email address for one purpose: to contact you about {brandName}
          {" — "}principally to let you know when it is ready, with the occasional closely
          related update. Our lawful basis is your consent, given when you submit the
          form. You are free to withdraw that consent at any time, and doing so is as
          simple as unsubscribing or emailing us.
        </Section>

        <Section title="Who processes it">
          Your email is stored and delivered through Resend, our email provider, and this
          site is hosted by Vercel. Both act only on our instructions, as our data
          processors. We do not sell your information, and we never share it with anyone
          else for their own purposes.
        </Section>

        <Section title="How long we keep it">
          We keep your email until {brandName} has launched and you have had the chance to
          download it, or until you ask us to remove it — whichever comes first.
          Thereafter it is deleted.
        </Section>

        <Section title="Your rights">
          You can ask us at any time to show you the information we hold about you, correct
          it, delete it, or stop emailing you. To exercise any of these, email{" "}
          <a href={mailto} style={link}>
            {contactEmail}
          </a>{" "}
          and we will act promptly. You also have the right to lodge a complaint with the
          Information Commissioner&rsquo;s Office (ICO), the UK&rsquo;s data protection
          authority, at ico.org.uk.
        </Section>

        <Section title="Keeping it safe">
          Access to the waiting list is restricted, and your information is held within
          established, security-conscious services. We ask for the minimum we need, which
          is the best protection of all.
        </Section>

        <Section title="When the app arrives">
          When the {brandName} app launches it will carry its own, fuller privacy policy
          covering how the app itself handles your data. This notice covers only the
          website.
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
          Questions about your privacy?{" "}
          <a href={mailto} style={link}>
            {contactEmail}
          </a>
        </p>
      </div>
    </main>
  );
}
