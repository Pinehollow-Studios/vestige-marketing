import Link from "next/link";
import { progressConfig, COUNTIES_TOTAL } from "@/lib/progressConfig";
import { CountyAtlas } from "./CountyAtlas";
import { ProgressStats } from "./ProgressStats";
import { PeekFrame } from "./PeekFrame";

/**
 * The homepage snapshot of /progress — the county map filling in and
 * the two headline fractions, nothing else, with one quiet way
 * through to the full page. A server component for the same reason as
 * the page it previews: the county geometry renders to HTML once and
 * ships no client JavaScript.
 */
export function ProgressPeek() {
  const { coursesMapped, coursesTotal, completedCounties } = progressConfig;

  return (
    <PeekFrame>
      <div className="fw-peek-head">
        <p className="fw-prog-eyebrow">Building in the open</p>
        <h2 className="fw-peek-title">
          The map, <span className="fw-peek-ital">so far</span>.
        </h2>
        <p className="fw-peek-sub">
          We&rsquo;re putting every course in England on the map, county by
          county — and you can watch it happen.
        </p>
      </div>
      <CountyAtlas completed={completedCounties} />
      <div className="fw-peek-body">
        <ProgressStats
          counties={{
            label: "Counties mapped",
            value: completedCounties.length,
            total: COUNTIES_TOTAL,
          }}
          courses={{
            label: "Courses mapped",
            value: coursesMapped,
            total: coursesTotal,
            approx: true,
          }}
        />
        <Link href="/progress" className="fw-peek-more">
          See more →
        </Link>
      </div>
    </PeekFrame>
  );
}
