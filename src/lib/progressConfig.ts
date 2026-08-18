/**
 * Hand-edited values for the public /progress page.
 *
 * When progress moves on, update the three things that change —
 * `coursesMapped`, `completedCounties`, and `lastUpdated` — and you're
 * done; the county count, fractions, percentages, map fills and the
 * headline figure quoted across the site all derive from them. County
 * names must match counties.ts exactly (the build fails loudly on a
 * typo, so a mistake can't ship silently).
 *
 * England is finished, so the map now runs its completion finale and
 * the copy speaks in the past tense. None of that is hardcoded: the
 * whole site reads `isComplete` below, which is simply "every county in
 * counties.ts is filled". Point this file at a bigger territory (add
 * Wales to counties.ts, say) and everything reverts to the filling-in
 * state on its own.
 *
 * These may later be wired to a live read-only Supabase count — keep
 * this shape stable so the swap is just a fetch returning the same
 * object. For now the page has no database dependency, by design.
 */

export const progressConfig = {
  /** Courses in the database. England is complete, so this is all of them. */
  coursesMapped: 1794,
  /**
   * Estimated courses across the territory still being mapped — the
   * denominator of the "x of ~y" fraction, always rendered with a "~".
   * Null once the counting is done and `coursesMapped` IS the total;
   * set it again when the map grows beyond England.
   */
  coursesTotal: null as number | null,

  /**
   * Counties fully mapped, filled mint on the map. 47 ceremonial
   * counties in total — the City of London is counted within Greater
   * London, matching the homepage's "47 ceremonial counties" stat.
   */
  completedCounties: [
    "Bedfordshire",
    "Berkshire",
    "Bristol",
    "Buckinghamshire",
    "Cambridgeshire",
    "Cheshire",
    "Cornwall",
    "County Durham",
    "Cumbria",
    "Derbyshire",
    "Devon",
    "Dorset",
    "East Riding of Yorkshire",
    "East Sussex",
    "Essex",
    "Gloucestershire",
    "Greater London",
    "Greater Manchester",
    "Hampshire",
    "Herefordshire",
    "Hertfordshire",
    "Isle of Wight",
    "Kent",
    "Lancashire",
    "Leicestershire",
    "Lincolnshire",
    "Merseyside",
    "Norfolk",
    "Northamptonshire",
    "North Yorkshire",
    "Northumberland",
    "Nottinghamshire",
    "Oxfordshire",
    "Rutland",
    "Shropshire",
    "Somerset",
    "South Yorkshire",
    "Staffordshire",
    "Suffolk",
    "Surrey",
    "Tyne and Wear",
    "Warwickshire",
    "West Midlands",
    "West Sussex",
    "West Yorkshire",
    "Wiltshire",
    "Worcestershire",
  ],

  /** The most recently mapped county — gets the "Just added" beacon on the
   *  atlas and the ledger line while there are still counties to come.
   *  Once the map is complete the finale takes over and this is unused,
   *  but it stays accurate for the record. Must be one of the above. */
  latestCounty: "Northumberland",

  /** The day the last county landed — stamped on the completion badge. */
  completedOn: "4 August 2026",

  lastUpdated: "18 August 2026",

  /** Honest, present-tense — rewrite it whenever the work changes. */
  rightNow:
    "The database is done: every course in England is in, all the way to the Northumberland coast. Tom's polishing the app's main flows and squashing beta feedback ahead of a wider release; Jack's moved from mapping to filling out — more content inside the app, and deeper detail on each course.",

  /**
   * One real screenshot of the app. Drop the file in public/progress/
   * and point at it; set to null to fall back to the placeholder.
   */
  screenshot: {
    src: "/progress/app-home-2.png",
    alt: "The Vestige home screen on the closed beta: a county map of England with the collection filling in, 11 of 942 courses played, Surrey within reach at 9 of 68.",
  } as { src: string; alt: string } | null,
} as const;

/** Ceremonial counties of England (City of London within Greater London). */
export const COUNTIES_TOTAL = 47;

/**
 * Every county mapped. Drives the map's finale, the ledger's "complete"
 * state and the past-tense copy — nothing says "done" on its own.
 */
export const isComplete = progressConfig.completedCounties.length === COUNTIES_TOTAL;

/**
 * The headline course figure, for marketing copy: the real count rounded
 * DOWN to the nearest hundred, so "1,700+" is always an undersell and can
 * never over-claim. Change the rounding here and the hero, the stats
 * strip, the meta description and the emails all follow.
 *
 * The exact figure isn't a secret — /progress, the FAQ and the update
 * email all quote it. The rounding is for the lines that want a number
 * you can say out loud, not for hiding anything.
 */
export const COURSES_HEADLINE = Math.floor(progressConfig.coursesMapped / 100) * 100;

/** "1,700" — the rounded figure, formatted. */
export const COURSES_HEADLINE_TEXT = COURSES_HEADLINE.toLocaleString("en-GB");

/** "1,700+" — the rounded figure as it appears in headlines. */
export const COURSES_HEADLINE_PLUS = `${COURSES_HEADLINE_TEXT}+`;

/** "1,794" — the exact count, for the places that earn the precision. */
export const COURSES_EXACT_TEXT = progressConfig.coursesMapped.toLocaleString("en-GB");
