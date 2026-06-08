import * as React from "react";
import { Heading, Link, Section, Text } from "@react-email/components";
import {
  EmailShell,
  brand,
  eyebrowStyle,
  h1Style,
  pStyle,
} from "../lib/emailShell";
import { siteConfig } from "../lib/siteConfig";

/**
 * Welcome email — fires from the joinWaitlist server action when a *new*
 * contact joins the waiting list. No personalisation (we only collect an
 * email). Tinker freely; preview with `npm run email`.
 */
export default function WelcomeEmail() {
  return (
    <EmailShell
      preview={`You're on the ${siteConfig.brandName} waiting list — ${siteConfig.tagline}`}
      footer={
        <>
          You&rsquo;re getting this because you joined the waiting list at{" "}
          {siteConfig.domain}. Joined by mistake?{" "}
          <Link
            href={`mailto:${siteConfig.contactEmail}?subject=Unsubscribe%20from%20Vestige`}
            style={{ color: brand.ink2, textDecoration: "underline" }}
          >
            Unsubscribe
          </Link>
          .
        </>
      }
    >
      <Text style={eyebrowStyle}>The waiting list</Text>
      <Heading style={h1Style}>You&rsquo;re on the list.</Heading>

      <Text style={pStyle}>
        Thanks for joining the waiting list for {siteConfig.brandName} — the quiet
        way to keep every golf course you&rsquo;ve played in England, and see how
        your collection stands against your friends.
      </Text>

      <Text style={pStyle}>We&rsquo;re building it now. Here&rsquo;s the shape of things:</Text>

      <Section style={{ margin: "6px 0 2px" }}>
        {siteConfig.roadmap.milestones.map((m, i) => (
          <Text key={i} style={{ margin: "8px 0 0", fontSize: 14, lineHeight: "20px", color: brand.ink2 }}>
            <span style={{ color: brand.accent, fontWeight: 700 }}>
              {m.month} {m.year}
            </span>
            {"  —  "}
            <span style={{ color: brand.ink }}>{m.label}.</span> {m.body}
          </Text>
        ))}
      </Section>

      <Text style={pStyle}>
        We&rsquo;ll only email you when it matters — a note the moment the app is
        ready, and little else. Promise.
      </Text>

      <Text style={{ ...pStyle, color: brand.ink, marginTop: 22 }}>
        — The {siteConfig.brandName} team
      </Text>
    </EmailShell>
  );
}
