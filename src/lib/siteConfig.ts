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
    /** Static eyebrow above the headline — shown when there's no live count to
     *  show. Anchors the question headline ("played what?") with context. */
    staticEyebrow: string;
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
    /** Light "forward this to a golf mate" nudge under the signup. */
    forwardNudge: string;
  };

  /** Section labels for the features header. */
  featuresHeader: {
    eyebrow: string;
    titlePre: string;
    titleItalic: string;
    sub: string;
  };

  /** "Why we're building it" — studio-voice narrative. Carries the #what anchor. */
  what: {
    eyebrow: string;
    titlePre: string;
    titleItalic: string;
    /** One or more paragraphs. */
    body: ReadonlyArray<string>;
  };

  /** Frequently-asked questions — rendered as accessible accordions. */
  faq: ReadonlyArray<{ q: string; a: string }>;

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
  tagline: "Every course in England, collected.",
  domain: "vestige.golf",
  appStoreUrl: null,
  contactEmail: "hello@pinehollow.studio",

  hero: {
    liveCountMinWeekly: 100,
    liveEyebrowLabel: "joined the waiting list this week",
    staticEyebrow: "Every course in England",
    headline: ["How many have you ", "played", "?"],
    lede:
      "England has over 2,500 courses — from Open Championship links to your local nine-holer. Vestige keeps the ones you've played, fills in your map of the country, and shows how your collection compares with your friends'.",
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

  what: {
    eyebrow: "Why we're building it",
    titlePre: "The list nobody was ",
    titleItalic: "keeping.",
    body: [
      "Every golfer has played somewhere they can't quite picture any more — and argued, on the first tee, about who's played more. There was never a simple way to keep the list.",
      "So we're building one: every course in England on a single map, the ones you've played marked with a tap, and a friendly tally of who's collected the most. No swing analysis, no dashboards — just the places, kept. England first; the rest of the British Isles to follow.",
    ],
  },

  faq: [
    {
      q: "Is it really free?",
      a: "Yes — completely free. The whole app, the whole collection, no premium tier and no catch.",
    },
    {
      q: "Does it track my score or handicap?",
      a: "No. Vestige isn't a scorecard or a swing analyser. Jot a score against a round if you like — but the point is the collection: the courses, not the numbers.",
    },
    {
      q: "How does it know which courses I've played?",
      a: "You tell it. One tap marks a course as played — no card to scan, no per-hole bookkeeping.",
    },
    {
      q: "Which courses are in it?",
      a: "Every course in England — all 2,500-odd, from Open Championship links to nine-hole village greens.",
    },
    {
      q: "Is it England only?",
      a: "England first. The rest of the British Isles will follow.",
    },
    {
      q: "What do you do with my data?",
      a: "As little as possible. No ads, and we never sell your personal data — your collection is yours, and you can export or delete it whenever you like.",
    },
    {
      q: "When can I actually use it?",
      a: "A friends-and-family beta this autumn, then a public beta in early 2027 — waitlist members get an access code before anyone else — and the free App Store release next summer.",
    },
  ],

  features: [
    {
      kind: "atlas",
      eyebrow: "The atlas",
      title: "Every course in England.",
      body:
        "All 2,500+ of them — championship links to nine-hole village greens, complete on the day we launch.",
    },
    {
      kind: "tap",
      eyebrow: "One tap",
      title: "A round, kept.",
      body:
        "Tap the course, add a score if you like. No card to scan, no per-hole bookkeeping.",
    },
    {
      kind: "board",
      eyebrow: "Your circle",
      title: "A polite competition.",
      body:
        "See whose collection runs deepest — your friends, and the whole country. No strangers in your feed.",
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
        body: "Public beta. Waitlist members get a code first.",
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
    sub: "We'll only email when it matters — and little else, we promise.",
    ctaLabel: "Count me in",
    forwardNudge:
      "P.S. Know a golfer who'd swear blind they've played more? Forward them this.",
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
