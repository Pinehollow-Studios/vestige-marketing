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

## Waitlist (Resend contacts + segment)

The waitlist form calls a server action that, when configured, (1) upserts a
global Resend **contact** and (2) adds it to a **segment** — the group the launch
broadcast will target. (Resend retired "Audiences" in 2025; contacts are now
global and grouped by segments.)

**Without `RESEND_API_KEY` + `RESEND_WAITLIST_SEGMENT_ID`**, the action runs in
*noop mode*: it logs the email to the server console and shows the success
state. The form is fully usable in dev without keys.

**To wire it up:**

1. Sign up at https://resend.com and verify the sending domain.
2. **Contacts → Segments** → create a segment (e.g. "Vestige launch waitlist").
3. **API Keys** → create a **Full access** key. Writing contacts needs more than
   the send-only scope, so a `sending_access` key will 403 here.
4. Locally: `cp .env.example .env.local` and fill in `RESEND_API_KEY` +
   `RESEND_WAITLIST_SEGMENT_ID`.
5. On Vercel: Project Settings → Environment Variables → add both for Production
   and Preview.

The action becomes live the next time the server boots. The key is used only in
the server action and is never exposed to the browser.

## Emails (React Email)

Templates live in `src/emails/`, built with [React Email](https://react.email).
The shared branded shell + tokens are in `src/lib/emailShell.tsx` (mirrors the
site — dark, mint accent, serif display, email-safe styling).

Design / tinker locally:

```bash
npm run email   # preview at http://localhost:3001 — hot-reloads as you edit
```

- **`welcome.tsx`** — *transactional*. Fires from the `joinWaitlist` action when a
  **new** contact joins (send-once: existing contacts aren't re-welcomed). Sent
  via `src/lib/email.tsx` (`sendWelcomeEmail`), non-blocking and failure-tolerant
  — a failed send never turns a successful signup into an error.
- **`launch.tsx`** — the launch announcement, sent as a Resend **Broadcast** to
  the "Vestige launch waitlist" segment (every signup is auto-added to it). Its
  unsubscribe link uses `{{{RESEND_UNSUBSCRIBE_URL}}}`, which Resend resolves at
  send time (it shows literally in the local preview).

A draft broadcast already exists (id `865ecb34-2426-4c07-b8ca-6eb4791af0a2`,
Resend → Broadcasts). After editing `launch.tsx`, refresh it and send when live:

```bash
resend broadcasts update 865ecb34-2426-4c07-b8ca-6eb4791af0a2 \
  --react-email src/emails/launch.tsx
resend broadcasts send 865ecb34-2426-4c07-b8ca-6eb4791af0a2   # launch day
```

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
    ├── resend.ts           # Resend waitlist client — contacts + segment (server-only)
    └── siteConfig.ts       # Single source of truth for brand
```

## Voice

Mirror the iOS app: short, declarative, en-GB. Source Serif 4 Medium for display lines, Inter for UI. UPPERCASE eyebrows at 11px with +0.6 tracking. Sentence case on everything else. Smart apostrophes throughout.
