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
  /** Used in OG / page-title fallback. Also the hero's support line —
   *  one declarative sentence that works everywhere: bio, ads, hero. */
  tagline: string;
  /** Meta/OG description — fuller than the tagline so title and
   *  description don't duplicate in search results and link previews. */
  description: string;
  domain: string;
  /** Null until live. When set, swap waitlist UI for App Store CTA. */
  appStoreUrl: string | null;
  contactEmail: string;

  /**
   * The site's pages, in tab order. The story is split across three
   * pages — the homepage (the pitch), /app (the three small ideas) and
   * /progress (the map so far) — and this list drives the floating
   * tab chooser, the hero topbar and the footer, so adding a page is
   * one entry here.
   */
  nav: ReadonlyArray<{ href: string; label: string }>;

  /** Hero composition — three-line serif stack with the italic word in the middle. */
  hero: {
    /** The live signup counter only surfaces once weekly signups exceed this. */
    liveCountMinWeekly: number;
    liveEyebrowLabel: string;
    /** Three-part headline: [pre, italicWord, post]. The number carries
     *  the scale hook, so no eyebrow is needed beneath the threshold. */
    headline: readonly [string, string, string];
    /** One line under the email field — what joining actually gets you. */
    waitlistNote: string;
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

  /**
   * /app — the three small ideas on their own page. The hero copy up
   * top, then the `features` cards, then one way into the waiting list.
   */
  appPage: {
    /** Three-part headline: [pre, italicWord, post]. */
    headline: readonly [string, string, string];
    lede: string;
    cta: {
      headlinePre: string;
      headlineItalic: string;
      headlinePost: string;
      body: string;
      ctaLabel: string;
      meta: string;
    };
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
  tagline: "Every golf course in England, collected.",
  description:
    "England has over 2,500 golf courses, from Open Championship links to your local pitch & putt. Vestige keeps the ones you've played, fills in your map of the country, and shows how your collection compares with your friends'.",
  domain: "vestige.golf",
  appStoreUrl: null,
  contactEmail: "hello@pinehollow.studio",

  nav: [
    { href: "/", label: "Home" },
    { href: "/app", label: "The app" },
    { href: "/progress", label: "Progress" },
  ],

  hero: {
    liveCountMinWeekly: 100,
    liveEyebrowLabel: "joined the waiting list this week",
    headline: ["2,500 courses. How many have you ", "played", "?"],
    waitlistNote:
      "Beta codes go to the waiting list first. Play it months before launch.",
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
    { kind: "number", target: 2500, suffix: "+", label: "Courses" },
    { kind: "number", target: 47, label: "Ceremonial counties" },
    { kind: "number", target: 0, prefix: "£", label: "Cost at launch" },
    { kind: "static", value: "Summer ’27", label: "On the App Store" },
  ],

  appPage: {
    headline: ["Three small ideas, ", "kept simple", "."],
    lede:
      "No swing analysis. No data dashboards. Just a quiet way to keep the places you have played, mark a score if you like, and see how your collection stands.",
    cta: {
      headlinePre: "Play it ",
      headlineItalic: "first",
      headlinePost: ".",
      body:
        "Join the waiting list. Beta codes go to the list before anyone else, and the App Store release is free.",
      ctaLabel: "Join the waiting list",
      meta: "iPhone, iOS 18+ · Free at launch",
    },
  },

  what: {
    eyebrow: "Why we're building it",
    titlePre: "The list nobody was ",
    titleItalic: "keeping.",
    body: [
      "Ask a golfer how many courses they've played and you'll get a guess, a frown, and a story about a links in Cornwall. What you won't get is a number. Nobody keeps the list.",
      "So we're building one: every course in England on a single map, the ones you've played marked with a tap, and a friendly tally of who's collected the most. No swing analysis, no dashboards. Just the places, kept. England first; the rest of the British Isles to follow.",
      "The name? A vestige is the trace something leaves behind. Every round leaves one.",
    ],
  },

  faq: [
    {
      q: "Is it really free?",
      a: "Yes. The full app and your whole collection are free, and always will be. You will never pay to map a course, fill in your collection, or see where you stand. A paid tier may come later for a few extras, but only ever on top of the free app, never a gate in front of it.",
    },
    {
      q: "Does it track my score or handicap?",
      a: "No. Vestige isn't a scorecard or a swing analyser. Jot a score against a round if you like, but the point is the collection: the courses, not the numbers.",
    },
    {
      q: "How does it know which courses I've played?",
      a: "You tell it. One tap marks a course as played. No card to scan, no per-hole bookkeeping.",
    },
    {
      q: "Which courses are in it?",
      a: "Every course in England: all 2,500-odd, from Open Championship links to your local nine-hole pitch & putt.",
    },
    {
      q: "Is it England only?",
      a: "England first. The rest of the British Isles will follow.",
    },
    {
      q: "What do you do with my data?",
      a: "As little as possible, and no ads. We will never sell your personal data: no names, nothing that ties back to you. Further down the line we may sell broad, anonymised trends to golf clubs, the patterns across thousands of rounds, but never your individual record. Your collection is yours, and you can export or delete it whenever you like.",
    },
    {
      q: "When can I actually use it?",
      a: "A friends-and-family beta this autumn, then a public beta in early 2027, then the free App Store release next summer. Waitlist members get an access code before anyone else.",
    },
  ],

  features: [
    {
      kind: "atlas",
      eyebrow: "The atlas",
      title: "Every course in England.",
      body:
        "All 2,500+ of them, championship links to your local nine-hole pitch & putt, complete on the day we launch.",
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
        "See whose collection runs deepest among your friends, and where you rank across the country. First-tee bragging rights, finally settled.",
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
    sub: "We'll keep you posted as we build, more as launch nears, and never any noise. Promise.",
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
