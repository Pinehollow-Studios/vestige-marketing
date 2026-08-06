import Link from "next/link";
import {
  progressConfig,
  COUNTIES_TOTAL,
  COURSES_EXACT_TEXT,
  isComplete,
} from "@/lib/progressConfig";
import { CountyAtlas } from "./CountyAtlas";
import { PeekFrame } from "./PeekFrame";

/**
 * The homepage's window onto /progress — just the county map filling
 * in and lighting up complete, and one way through to the full page.
 * The fractions, the "right now" note and the screenshot all live on
 * /progress itself; the homepage keeps only the map. A server component
 * for the same reason as the page it previews: the county geometry
 * renders to HTML once and ships no client JavaScript.
 */
export function ProgressPeek() {
  const { completedCounties, latestCounty, coursesMapped } = progressConfig;

  return (
    <PeekFrame>
      <div className="fw-peek-head">
        <p className="fw-page-eyebrow">Progress</p>
        <h2 className="fw-peek-title">
          {isComplete ? (
            <>
              The map, <span className="fw-peek-ital">finished</span>.
            </>
          ) : (
            <>
              The map, <span className="fw-peek-ital">so far</span>.
            </>
          )}
        </h2>
        <p className="fw-peek-sub">
          {isComplete ? (
            <>
              We set out to put every golf course in England on one map, county
              by county. {COUNTIES_TOTAL} counties and {COURSES_EXACT_TEXT}{" "}
              courses later, it&rsquo;s done — watch it fill in.
            </>
          ) : (
            <>
              We&rsquo;re putting every course in England on the map, county by
              county, and you can watch it happen.
            </>
          )}
        </p>
      </div>
      <CountyAtlas
        completed={completedCounties}
        latest={latestCounty}
        courses={coursesMapped}
      />
      <Link href="/progress" className="fw-peek-more">
        See the full progress →
      </Link>
    </PeekFrame>
  );
}
