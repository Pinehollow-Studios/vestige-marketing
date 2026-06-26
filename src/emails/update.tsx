import * as React from "react";
import { Heading, Section, Text } from "@react-email/components";
import {
  EmailShell,
  brand,
  eyebrowStyle,
  h1Style,
  pStyle,
} from "../lib/emailShell";
import { siteConfig } from "../lib/siteConfig";

/**
 * Progress update — a periodic "here's where we are" email sent as a Resend
 * Broadcast to the "Vestige launch waitlist" segment. All content is driven by
 * `siteConfig.progress`, so a new send is a config edit, not a template rewrite.
 * Publish/refresh it the same way as launch.tsx:
 *   resend broadcasts create --segment-id <id> --from "Vestige <hello@vestige.golf>" \
 *     --subject "<siteConfig.progress.subject>" --react-email src/emails/update.tsx \
 *     --reply-to hello@pinehollow.studio
 *
 * The unsubscribe link uses Resend's broadcast variable {{{RESEND_UNSUBSCRIBE_URL}}},
 * which only resolves when sent as a broadcast (it shows literally in preview).
 */
export default function UpdateEmail() {
  const { progress, roadmap } = siteConfig;
  return (
    <EmailShell
      preview={progress.subject}
      footer={
        <>
          You&rsquo;re getting this because you joined the {siteConfig.brandName}{" "}
          waiting list.{" "}
          <a
            href="{{{RESEND_UNSUBSCRIBE_URL}}}"
            style={{ color: brand.ink2, textDecoration: "underline" }}
          >
            Unsubscribe
          </a>
          .
        </>
      }
    >
      <Text style={eyebrowStyle}>{progress.eyebrow}</Text>
      <Heading style={h1Style}>{progress.headline}</Heading>

      {progress.intro.map((para, i) => (
        <Text key={i} style={pStyle}>
          {para}
        </Text>
      ))}

      {/* Headline figures — a compact stat list. */}
      {progress.figures.length > 0 && (
        <Section
          style={{
            margin: "22px 0 4px",
            padding: "4px 16px",
            backgroundColor: brand.bg,
            border: `1px solid ${brand.border}`,
            borderRadius: 10,
          }}
        >
          {progress.figures.map((f, i) => (
            <Text
              key={i}
              style={{
                margin: 0,
                padding: "12px 0",
                fontSize: 14,
                lineHeight: "20px",
                color: brand.ink2,
                borderBottom:
                  i < progress.figures.length - 1
                    ? `1px solid ${brand.border}`
                    : undefined,
              }}
            >
              <span
                style={{
                  color: brand.accent,
                  fontWeight: 700,
                  fontSize: 18,
                  fontFamily: brand.serif,
                }}
              >
                {f.value}
              </span>
              {"  —  "}
              <span style={{ color: brand.ink }}>{f.label}</span>
            </Text>
          ))}
        </Section>
      )}

      {/* What's new this update. */}
      {progress.highlights.length > 0 && (
        <Section style={{ margin: "8px 0 2px" }}>
          {progress.highlights.map((h, i) => (
            <Text
              key={i}
              style={{ margin: "16px 0 0", fontSize: 15, lineHeight: "23px", color: brand.ink2 }}
            >
              <span style={{ color: brand.ink, fontWeight: 700 }}>{h.title}.</span>{" "}
              {h.body}
            </Text>
          ))}
        </Section>
      )}

      {/* Roadmap reminder — reused from the single source of truth. */}
      {progress.showRoadmap && (
        <Section
          style={{
            margin: "24px 0 4px",
            padding: "16px",
            borderLeft: `3px solid ${brand.accent}`,
            backgroundColor: brand.card,
            borderRadius: 6,
          }}
        >
          <Text style={{ margin: 0, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: brand.accent, fontWeight: 700 }}>
            {roadmap.eyebrow}
          </Text>
          {roadmap.milestones.map((m, i) => (
            <Text key={i} style={{ margin: "8px 0 0", fontSize: 14, lineHeight: "20px", color: brand.ink2 }}>
              <span style={{ color: brand.accent, fontWeight: 700 }}>
                {m.month} {m.year}
              </span>
              {"  —  "}
              <span style={{ color: brand.ink }}>{m.label}.</span> {m.body}
            </Text>
          ))}
        </Section>
      )}

      <Text style={pStyle}>{siteConfig.closingCta.forwardNudge}</Text>

      <Text style={{ ...pStyle, color: brand.ink, marginTop: 22 }}>
        {progress.signoff}
        <br />
        Jack &amp; Tom
      </Text>
    </EmailShell>
  );
}
