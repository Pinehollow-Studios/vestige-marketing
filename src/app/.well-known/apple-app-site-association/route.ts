import { NextResponse } from "next/server";

/**
 * apple-app-site-association — associates `vestige.golf` with the
 * Vestige iOS app. Two services, both required by the app's
 * `com.apple.developer.associated-domains` entitlement (iOS repo
 * `project.yml`):
 *
 * - `applinks` — `https://vestige.golf/u/<username>` opens the app via
 *   Universal Links rather than the web fallback (CLAUDE.md §10.1).
 *   Only `/u/*` is claimed: it is the one path with a web fallback page
 *   (`src/app/u/[username]/`), so a visitor without the app installed
 *   still lands somewhere real. Do not add paths here before their
 *   fallback pages exist, or non-installed visitors get a 404.
 *
 * - `webcredentials` — lets iOS file a Vestige password under
 *   `vestige.golf` in the Passwords app instead of under an opaque
 *   bundle identifier. This is what enables the app's saved-password
 *   sign-in offer (`AppleSignInService.existingAccount()`) and, in
 *   future, credential sharing with a web login.
 *
 * Served from a route handler (not a static `public/` file) so the
 * `Content-Type: application/json` and no-extension path are guaranteed
 * and not subject to Next's static-asset content-type guessing.
 *
 * The Team ID below is not a secret — an AASA file is public by
 * necessity, and the same ID appears on every App Store listing.
 *
 * Verify after deploy: `https://vestige.golf/.well-known/apple-app-site-association`
 * returns this JSON as `application/json`, and Apple's CDN mirrors it at
 * `https://app-site-association.cdn-apple.com/a/v1/vestige.golf`
 * (allow a few minutes).
 */
const APP_ID = "B4A6SQSS7U.com.pinehollow.vestige";

const APPLE_APP_SITE_ASSOCIATION = {
  applinks: {
    details: [
      {
        appIDs: [APP_ID],
        components: [
          {
            "/": "/u/*",
            comment: "Profile invite links — vestige.golf/u/<username>",
          },
        ],
      },
    ],
  },
  webcredentials: {
    apps: [APP_ID],
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
