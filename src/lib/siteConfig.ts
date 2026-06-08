/**
 * Single source of truth for everything brand-specific.
 *
 * When the App Store approves the final name, change the values in this file
 * (and update the OG image + favicon) and the entire site is rebranded.
 */

export type SiteConfig = {
  brandName: string;
  brandShortName: string;
  brandLowerName: string;
  /** Used in OG / page-title fallback. */
  tagline: string;
  domain: string;
  /** Null until live. When set, swap waitlist UI for App Store CTA. */
  appStoreUrl: string | null;
  contactEmail: string;

  /** Hero composition — three-line serif stack with the italic word in the middle. */
  hero: {
    /** The live signup counter only surfaces once weekly signups exceed this. */
    liveCountMinWeekly: number;
    liveEyebrowLabel: string;
    /** Three-part headline: [pre, italicWord, post]. */
    headline: readonly [string, string, string];
    /** Italic lede paragraph beneath the headline. */
    lede: string;
    /** Meta strip below the email field. */
    metaStrip: ReadonlyArray<string>;
  };

  /** Course marquee — duplicated automatically for seamless loop. */
  marquee: ReadonlyArray<string>;

  /** Stats strip — four cells. */
  stats: ReadonlyArray<
    | { kind: "number"; target: number; prefix?: string; suffix?: string; label: string }
    | { kind: "static"; value: string; label: string }
  >;

  /** Three feature cards — `kind` selects the motif (atlas / tap / board). */
  features: ReadonlyArray<{
    kind: "atlas" | "tap" | "board";
    eyebrow: string;
    title: string;
    body: string;
  }>;

  /** Closing CTA section. */
  closingCta: {
    eyebrowLabel: string;
    headlinePre: string;
    headlineItalic: string;
    sub: string;
    ctaLabel: string;
  };

  /** Section labels for the features header. */
  featuresHeader: {
    eyebrow: string;
    titlePre: string;
    titleItalic: string;
    sub: string;
  };

  /** Roadmap timeline — three milestones from now to launch. */
  roadmap: {
    eyebrow: string;
    titlePre: string;
    titleItalic: string;
    titlePost: string;
    sub: string;
    milestones: ReadonlyArray<{
      month: string;
      year: string;
      label: string;
      body: string;
    }>;
  };

  footer: {
    /** Studio attribution + contact, shown to the right of the wordmark. */
    studio: {
      /** Legal company name. Renders UPPERCASE, links to website. */
      name: string;
      /** Contact email. Renders lowercase as a mailto: link. */
      email: string;
      /** Studio website URL (https://...). */
      website: string;
      /** Display label for the website link (e.g. "pinehollow.studio"). */
      websiteLabel: string;
    };
  };
};

export const siteConfig: SiteConfig = {
  brandName: "Vestige",
  brandShortName: "Vestige",
  brandLowerName: "vestige",
  tagline: "Every course in England, tracked.",
  domain: "vestige.golf",
  appStoreUrl: null,
  contactEmail: "hello@pinehollow.studio",

  hero: {
    liveCountMinWeekly: 100,
    liveEyebrowLabel: "joined the waiting list this week",
    headline: ["Every course in England, ", "tracked", "."],
    lede:
      "An iPhone app to keep the golf courses you have played in England, and compare your collection with friends. Almost ready.",
    metaStrip: ["iPhone, iOS 18+", "Free at launch", "Summer 2027"],
  },

  marquee: [
    "Royal Birkdale",
    "Sunningdale",
    "Walton Heath",
    "Royal St George’s",
    "The Berkshire",
    "Royal Lytham",
    "Royal Liverpool",
    "St Enodoc",
    "Saunton",
    "Woodhall Spa",
    "Royal Cinque Ports",
    "Hillside",
    "Royal North Devon",
    "Ganton",
    "Notts (Hollinwell)",
    "Alwoodley",
    "Royal St David’s",
    "Princes",
    "Burnham & Berrow",
    "Trevose",
  ],

  stats: [
    { kind: "number", target: 2500, suffix: "+", label: "Courses, top to bottom" },
    { kind: "number", target: 48, label: "Historic counties" },
    { kind: "number", target: 0, prefix: "£", label: "Cost at launch" },
    { kind: "static", value: "Summer ’27", label: "On the App Store" },
  ],

  featuresHeader: {
    eyebrow: "Inside the app",
    titlePre: "Three small ideas, ",
    titleItalic: "kept simple.",
    sub:
      "No swing analysis. No data dashboards. Just a quiet way to keep the places you have played, mark a score if you like, and see how your collection stands.",
  },

  features: [
    {
      kind: "atlas",
      eyebrow: "The atlas",
      title: "Every course in England.",
      body:
        "All 2,500+ of them, from championship links to nine-hole village greens. The map is complete on the day we launch.",
    },
    {
      kind: "tap",
      eyebrow: "One tap",
      title: "A round, kept.",
      body:
        "Tap the course. Add a score if you want to. No card to scan, no per-hole bookkeeping — the round is kept in the time it takes to read this sentence.",
    },
    {
      kind: "board",
      eyebrow: "Your circle",
      title: "A polite competition.",
      body:
        "See whose collection runs deepest — among your friends, and across the country. No streaks. No strangers in your feed.",
    },
  ],

  roadmap: {
    eyebrow: "Road to launch",
    titlePre: "From here, to ",
    titleItalic: "summer",
    titlePost: ".",
    sub: "Three steps between now and the App Store.",
    milestones: [
      {
        month: "Oct",
        year: "2026",
        label: "Beta one",
        body: "Friends and family. The first look.",
      },
      {
        month: "Feb",
        year: "2027",
        label: "Beta two",
        body: "Public TestFlight. A wider trial.",
      },
      {
        month: "Summer",
        year: "2027",
        label: "Launch day",
        body: "On the App Store. Free for everyone.",
      },
    ],
  },

  closingCta: {
    eyebrowLabel: "already on the list",
    headlinePre: "Be among the ",
    headlineItalic: "first.",
    sub: "One note when the App Store listing arrives. Nothing else. We promise.",
    ctaLabel: "Get notified",
  },

  footer: {
    studio: {
      name: "Pinehollow Studios Limited",
      email: "hello@pinehollow.studio",
      website: "https://www.pinehollow.studio/",
      websiteLabel: "pinehollow.studio",
    },
  },
};
