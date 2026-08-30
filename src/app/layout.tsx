import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.brandName} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: `https://${siteConfig.domain}`,
    siteName: siteConfig.brandName,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.brandName} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  // The name under the icon when the site is added to an iOS Home Screen.
  // Without it iOS uses the <title>, which is the full title-plus-tagline.
  // Deliberately not `capable` — that launches the bookmark chrome-less,
  // under the notch, and this is a marketing site with no safe-area insets
  // and an App Store link as its whole point. It should open in the browser.
  appleWebApp: { title: siteConfig.brandName },
  applicationName: siteConfig.brandName,
};

/**
 * The app icon's ground colour, so the browser chrome around the page —
 * Safari's address bar, Android's status bar, the PWA splash — carries
 * the same near-black the site and the icon are built on.
 */
export const viewport: Viewport = {
  themeColor: "#06090E",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${manrope.variable}`}
      // Tells Next the smooth scrolling in globals.css is intentional, so
      // it can suspend it during route transitions — without this, moving
      // between the pages would smooth-scroll to the top of each one.
      data-scroll-behavior="smooth"
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
