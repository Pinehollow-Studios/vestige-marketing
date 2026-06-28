/**
 * Hand-edited values for the public /progress page.
 *
 * When progress moves on, update the three things that change —
 * `coursesMapped`, `completedCounties`, and `lastUpdated` — and you're
 * done; the county count, fractions, percentages and map fills all
 * derive from them. County names must match counties.ts exactly
 * (the build fails loudly on a typo, so a mistake can't ship silently).
 *
 * These may later be wired to a live read-only Supabase count — keep
 * this shape stable so the swap is just a fetch returning the same
 * object. For now the page has no database dependency, by design.
 */

export const progressConfig = {
  /** Courses in the database so far. */
  coursesMapped: 1231,
  /** Approximate total — always rendered with a "~". */
  coursesTotal: 2500,

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
    "Cornwall",
    "Derbyshire",
    "Devon",
    "Dorset",
    "East Sussex",
    "Essex",
    "Gloucestershire",
    "Greater London",
    "Hampshire",
    "Herefordshire",
    "Hertfordshire",
    "Isle of Wight",
    "Kent",
    "Leicestershire",
    "Lincolnshire",
    "Norfolk",
    "Northamptonshire",
    "Nottinghamshire",
    "Oxfordshire",
    "Rutland",
    "Shropshire",
    "Somerset",
    "Staffordshire",
    "Suffolk",
    "Surrey",
    "Warwickshire",
    "West Midlands",
    "West Sussex",
    "Wiltshire",
    "Worcestershire",
  ],

  /** The most recently mapped county — gets the "Just added" beacon on the
   *  atlas and the ledger line. Must be one of completedCounties above. */
  latestCounty: "Lincolnshire",

  lastUpdated: "28 June 2026",

  /** Honest, present-tense — rewrite it whenever the work changes. */
  rightNow:
    "Tom's polishing the app's main flows and squashing beta feedback ahead of a wider release; Jack's expanding the course database, county by county.",

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
