import { NextResponse } from "next/server";

/**
 * apple-app-site-association — associates `vestige.golf` with the
 * Vestige iOS app so `https://vestige.golf/u/<username>` opens the app
 * via Universal Links (CLAUDE.md §10.1).
 *
 * Served from a route handler (not a static `public/` file) so the
 * `Content-Type: application/json` and no-extension path are guaranteed
 * and not subject to Next's static-asset content-type guessing.
 *
 * TODO(tom): replace `<TEAM_ID>` with the Pinehollow Studios Apple
 * Developer Team ID (docs/apple-setup.md §1) before this is relied on.
 * Until the real Team ID is here AND the app ships with the
 * `com.apple.developer.associated-domains` entitlement (project.yml,
 * currently commented), `/u/<username>` links open the web fallback
 * page rather than the app — the intended graceful degradation.
 */
const APPLE_APP_SITE_ASSOCIATION = {
  applinks: {
    details: [
      {
        appIDs: ["<TEAM_ID>.com.pinehollow.vestige"],
        components: [
          {
            "/": "/u/*",
            comment: "Profile invite links — vestige.golf/u/<username>",
          },
        ],
      },
    ],
  },
};

export function GET() {
  return NextResponse.json(APPLE_APP_SITE_ASSOCIATION, {
    headers: {
      "Content-Type": "application/json",
      // AASA changes are infrequent and iOS caches aggressively; a short
      // CDN cache keeps the file fresh enough when the Team ID lands.
      "Cache-Control": "public, max-age=3600",
    },
  });
}
