# Legal — Vestige

> **STATUS: DRAFTS. NOT YET LIVE. NOT LEGAL ADVICE.**
>
> The documents in this folder were drafted to match the Vestige product's
> *actual* data flows (as described in the iOS `CLAUDE.md`), so a solicitor
> has a specific, accurate starting point rather than generic boilerplate.
> **They must be reviewed by a qualified UK solicitor before publication.**
> Nothing here has been legally vetted.

## Files

- [`privacy-policy.md`](privacy-policy.md) — UK GDPR / DPA 2018 privacy notice.
- [`terms-of-service.md`](terms-of-service.md) — end-user terms / EULA.

## Before these can go live

1. **Solicitor review** — especially the golf-club data-package section of
   the privacy policy (the §12 B2B model is the legally sensitive part of
   this product; "aggregated/anonymised" has a high bar under UK GDPR).
2. **Fill every `[BRACKETED PLACEHOLDER]`** — company registered address,
   company number, ICO registration number, contact email, effective date,
   minimum age decision.
3. **ICO registration** — Pinehollow Studios Limited must register as a data
   controller and pay the annual data-protection fee before processing live
   user data. Get the registration number for the placeholder.
4. **Publish on `vestige.golf`** — convert each Markdown file to a Next.js
   route (`src/app/privacy/page.tsx`, `src/app/terms/page.tsx`) or render the
   Markdown. Then wire the iOS `VestigeTermsURL` / `VestigePrivacyURL`
   Info.plist keys (read by `AboutView.swift`) to the live URLs.
5. **App Store Connect** — the privacy-policy URL is a hard submission
   requirement; also complete the Privacy "Nutrition Label" questionnaire
   consistently with the privacy policy.

## Open questions flagged for the solicitor

- **Minimum age.** Recommend **16** to side-step the UK Age Appropriate
  Design Code (Children's Code) and keep the social + data-package model
  simple. (UK digital-consent age under GDPR is 13, but a 13+ social app
  with a data-sale model invites the Children's Code.) Decision is Tom's.
- **Analytics consent vs opt-out.** The app's `app_events` are
  anonymous-by-default with an `analytics_opt_out` toggle. Whether the
  opt-out model is sufficient (vs opt-in consent) depends on how
  re-identifiable the events are — a PECR/GDPR call.
- **Phone number at signup.** Onboarding collects `users.phone_number`, but
  no current feature uses it. Either find a stated purpose or drop it (data
  minimisation).
- **B2B data packages** — the aggregation threshold (refuse cells < N users),
  the k-anonymity model, and the lawful basis for the sale all need sign-off
  before the export pipeline is built.
- **Sub-processor list** — confirm the live set (Supabase, Sentry, Mapbox,
  Apple, Google, Vercel, Resend) and that DPAs are in place with each.

## 2026-07-14 — pages built, Pro clause added

- `terms-of-service.md` gained **§3 Vestige Pro** (subscriptions: auto-renewal,
  trials, lifetime + founding pricing, Apple refunds) and had known facts
  filled (address, contact, age 17, liability cap). Company number still a
  placeholder — fill from Companies House.
- Both documents now render as site pages: **`/terms`** (new) and
  **`/privacy`** (rewritten to the full app policy from the iOS repo's
  `docs/privacy-policy.md`, 10 July 2026, + a short "This website" section).
  Keep page and markdown in step when either changes.
- Solicitor-review status unchanged: still drafts until reviewed.
