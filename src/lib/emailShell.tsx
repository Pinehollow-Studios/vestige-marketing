import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

/**
 * Shared branded shell + tokens for Vestige emails. Mirrors the marketing site
 * (deep-ocean dark, mint accent, serif display) but with email-safe styling —
 * solid colours, system/serif font stacks, table-friendly components. Lives in
 * lib/ (not emails/) so the react-email dev server lists only real templates.
 */

export const brand = {
  bg: "#06090E",
  card: "#0E1822",
  border: "rgba(255,255,255,0.10)",
  ink: "#F3F0E5",
  ink2: "#A8B3C0",
  ink3: "#6E7A89",
  accent: "#5BE4C3",
  accent2: "#8FE85B",
  onAccent: "#0A1A22",
  // Web fonts are unreliable in email; lean on the serif/system stacks. New York
  // (Apple) + Georgia echo the site's Source Serif display where they're present.
  serif: "'New York', Georgia, 'Times New Roman', serif",
  sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Helvetica, Arial, sans-serif",
};

export const eyebrowStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 11,
  letterSpacing: 2,
  textTransform: "uppercase",
  color: brand.accent,
  fontWeight: 700,
};

export const h1Style: React.CSSProperties = {
  margin: "12px 0 0",
  fontFamily: brand.serif,
  fontSize: 30,
  lineHeight: "34px",
  color: brand.ink,
  fontWeight: 500,
};

export const pStyle: React.CSSProperties = {
  margin: "16px 0 0",
  fontSize: 15,
  lineHeight: "24px",
  color: brand.ink2,
};

export function EmailShell({
  preview,
  children,
  footer,
}: {
  preview: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Body
        style={{
          backgroundColor: brand.bg,
          margin: 0,
          padding: "32px 0",
          fontFamily: brand.sans,
        }}
      >
        <Container style={{ width: "100%", maxWidth: 520, margin: "0 auto", padding: "0 16px" }}>
          <Section style={{ padding: "2px 4px 18px" }}>
            <Text
              style={{
                margin: 0,
                fontSize: 12,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: brand.accent,
                fontWeight: 700,
              }}
            >
              Vestige
            </Text>
          </Section>

          <Section
            style={{
              backgroundColor: brand.card,
              border: `1px solid ${brand.border}`,
              borderRadius: 16,
              padding: "32px 28px",
            }}
          >
            {children}
          </Section>

          <Section style={{ padding: "18px 4px 0" }}>
            <Hr style={{ borderColor: brand.border, margin: "0 0 14px" }} />
            <Text style={{ margin: 0, fontSize: 12, lineHeight: "18px", color: brand.ink3 }}>
              Vestige &middot; Every course in England, tracked.
            </Text>
            {footer && (
              <Text style={{ margin: "8px 0 0", fontSize: 12, lineHeight: "18px", color: brand.ink3 }}>
                {footer}
              </Text>
            )}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export { Heading };
