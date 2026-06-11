import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import { FwLockup } from "./atoms";

/**
 * The shared footer — brand lockup, the site's pages, and the studio
 * attribution. One component so every page (home / the app / progress)
 * carries the same way around the site.
 */
export function SiteFooter() {
  const { studio } = siteConfig.footer;
  return (
    <footer className="fw-footer">
      <FwLockup size={22} label={siteConfig.brandName.toUpperCase()} />
      <div className="fw-footer-meta">
        {siteConfig.nav.map((l) => (
          <Link key={l.href} className="fw-footer-link" href={l.href}>
            {l.label}
          </Link>
        ))}
        <Link className="fw-footer-link" href="/privacy">
          Privacy
        </Link>
        <span className="fw-footer-sep" aria-hidden>
          ·
        </span>
        <a
          className="fw-footer-mark"
          href={studio.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          {studio.name}
        </a>
        <a className="fw-footer-link" href={`mailto:${studio.email}`}>
          {studio.email}
        </a>
      </div>
    </footer>
  );
}
