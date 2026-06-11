"use client";

import { useCountUp, useScrollReveal } from "../marketing/hooks";

type Stat = {
  label: string;
  value: number;
  total: number;
  /** Render the total as approximate ("~2,500"). */
  approx?: boolean;
};

function StatRow({
  stat,
  revealed,
  delay,
}: {
  stat: Stat;
  revealed: boolean;
  delay: number;
}) {
  const n = useCountUp(stat.value, { duration: 1800, delay: 200 + delay, enabled: revealed });
  const pct = Math.round((stat.value / stat.total) * 100);
  return (
    <div
      className="fw-prog-stat"
      style={{
        transform: revealed ? "translateY(0)" : "translateY(20px)",
        opacity: revealed ? 1 : 0,
        transition: `transform 720ms cubic-bezier(0.2,0.8,0.2,1) ${delay}ms, opacity 720ms ease ${delay}ms`,
      }}
    >
      <div className="l">{stat.label}</div>
      <div className="row">
        <span className="v">{n.toLocaleString("en-GB")}</span>
        <span className="of">
          of {stat.approx && "~"}
          {stat.total.toLocaleString("en-GB")}
        </span>
        <span className="pct">{pct}%</span>
      </div>
      <div className="fw-prog-bar">
        <i
          style={{
            width: `${(stat.value / stat.total) * 100}%`,
            transform: revealed ? "scaleX(1)" : "scaleX(0)",
            transitionDelay: `${200 + delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

/**
 * The ledger under the map — both headline fractions with their
 * progress bars, and (when given) the last-updated stamp. Numbers
 * count up and the bars draw once the card scrolls into view, same
 * choreography as the homepage StatsStrip. The homepage snapshot
 * omits `lastUpdated`; the full /progress page carries it.
 */
export function ProgressStats({
  counties,
  courses,
  lastUpdated,
}: {
  counties: Stat;
  courses: Stat;
  lastUpdated?: string;
}) {
  const [ref, revealed] = useScrollReveal<HTMLDivElement>({ threshold: 0.25 });
  return (
    <div ref={ref} className="fw-prog-card">
      <StatRow stat={counties} revealed={revealed} delay={0} />
      <StatRow stat={courses} revealed={revealed} delay={120} />
      {lastUpdated && (
        <div className="fw-prog-stamp">
          <span className="dot" aria-hidden="true" />
          Last updated <b>{lastUpdated}</b>
        </div>
      )}
    </div>
  );
}
