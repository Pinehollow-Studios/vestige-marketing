import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/siteConfig";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Modern geometric sans — the display face. Replaces Fraunces. Used
// upright only, so only the normal style is loaded to keep the font
// payload small on mobile.
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-display-face",
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${siteConfig.domain}`),
  title: {
    default: `${siteConfig.brandName} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.brandName}`,
  },
  description: siteConfig.hero.lede,
  openGraph: {
    title: `${siteConfig.brandName} — ${siteConfig.tagline}`,
    description: siteConfig.hero.lede,
    url: `https://${siteConfig.domain}`,
    siteName: siteConfig.brandName,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.brandName} — ${siteConfig.tagline}`,
    description: siteConfig.hero.lede,
  },
  // Pre-launch: don't get indexed before we want to be found.
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${manrope.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
