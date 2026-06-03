# vestige-marketing

Marketing site for the Vestige iOS app. Built name-agnostic so the brand swap (when Apple approves a different name) is a single-file change.

Stack: Next.js 16 (App Router) · TypeScript · Tailwind 4 · Source Serif 4 + Inter via `next/font/google` · Deploy on Vercel.

Design tokens mirror the iOS app's Atlas system (`Vestige-ios/Vestige/DesignSystem/Theme.swift`). Dark-only.

## Local dev

```bash
npm run dev
# http://localhost:3000
```

## Renaming the brand

When the App Store name is approved, edit **`src/lib/siteConfig.ts`** — every user-facing string, the domain, the App Store URL, and the hero composition flow from there. Specifically:

- `brandName` / `brandShortName` / `brandLowerName`
- `tagline`
- `domain`
- `appStoreUrl` (set this once the App Store listing is live — the hero swaps the waitlist form for the App Store badge)
- `contactEmail`
- `hero.line1` / `line2Gradient` / `line3Italic` (the three-line serif stack — keep `line2Gradient` as the most-emphasised word; it gets the mint→lime gradient)
- `features[]` if the product framing shifts

You'll also want to replace:
- `src/app/icon.png` / `favicon.ico` (use a single 512×512 png in `src/app/`)
- `src/app/opengraph-image.png` (1200×630 social card)

When you're ready to be indexed by Google, flip `robots: { index: false, follow: false }` in `src/app/layout.tsx` to `index: true` and update `src/app/robots.ts` to `allow: "/"`.

## Waitlist (Resend Audiences)

The waitlist form calls a server action that adds the email to a Resend Audience.

**Until you've created the Resend account**, the action runs in *noop mode*: it logs the email to the server console and shows the user the success state. The form is fully usable in dev without a key.

**When you're ready to wire it up:**

1. Sign up at https://resend.com.
2. Verify your sending domain (you'll want to do this anyway for transactional email later).
3. **Audiences** → New Audience (call it "Vestige launch waitlist" or similar).
4. **API Keys** → Create with Audience write scope.
5. Locally: `cp .env.example .env.local` and fill in `RESEND_API_KEY` + `RESEND_AUDIENCE_ID`.
6. On Vercel: Project Settings → Environment Variables → add both for Production and Preview.

The action becomes live the next time the server boots.

## Deploy

```bash
# One-time: connect the Vercel project to this repo.
# After that, every push to main auto-deploys.
```

Vercel detects Next.js automatically. Set the two Resend env vars in the Vercel project before the first deploy if you want live mode out of the gate.

## Structure

```
src/
├── app/
│   ├── actions.ts          # joinWaitlist server action
│   ├── globals.css         # Atlas tokens (mirrors iOS Theme.swift)
│   ├── layout.tsx          # Fonts, metadata, root <html>
│   ├── page.tsx            # Landing composition
│   └── robots.ts           # Pre-launch noindex
├── components/
│   ├── AtlasBackdrop.tsx   # Deep-ocean radial + dual atmosphere
│   ├── Features.tsx        # Three glass cards
│   ├── ForClubs.tsx        # Quiet B2B block
│   ├── Hero.tsx            # Page-hero composition with gradient word
│   ├── SiteFooter.tsx
│   ├── SiteHeader.tsx
│   ├── WaitlistForm.tsx    # Client component, useActionState
│   └── Wordmark.tsx        # Compass-tile glyph + brand name
└── lib/
    ├── resend.ts           # Resend Audiences client (server-only)
    └── siteConfig.ts       # Single source of truth for brand
```

## Voice

Mirror the iOS app: short, declarative, en-GB. Source Serif 4 Medium for display lines, Inter for UI. UPPERCASE eyebrows at 11px with +0.6 tracking. Sentence case on everything else. Smart apostrophes throughout.
