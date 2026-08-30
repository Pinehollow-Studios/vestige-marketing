# Legal — Vestige

> **STATUS: LIVE, pending solicitor review. NOT LEGAL ADVICE.**
>
> All three documents are published on vestige.golf and were drafted to
> match the Vestige product's *actual* data flows (verified against the iOS
> codebase), so a solicitor has a specific, accurate starting point rather
> than generic boilerplate. **They should still be reviewed by a qualified
> UK solicitor** — nothing here has been legally vetted.

## Files

Each Markdown file is the canonical source for its rendered page; the two
must be kept in step whenever either changes.

- [`privacy-policy.md`](privacy-policy.md) → `src/app/privacy/page.tsx`
  (https://vestige.golf/privacy). UK GDPR / DPA 2018 privacy notice for the
  app + this website. Linked from the app (`VestigePrivacyURL`) and App
  Store Connect.
- [`terms-of-service.md`](terms-of-service.md) → `src/app/terms/page.tsx`
  (https://vestige.golf/terms). End-user terms, including Vestige Pro.
  Linked from the app (`VestigeTermsURL`), the paywall, and App Store
  Connect.
- [`beta-testing-agreement.md`](beta-testing-agreement.md) →
  `src/app/beta-terms/page.tsx` (https://vestige.golf/beta-terms). The
  private-beta tester agreement (confidentiality, no sharing, liability for
  breach), accepted via the app's beta acknowledgement gate.
- [`community-guidelines.md`](community-guidelines.md) →
  `src/app/guidelines/page.tsx` (https://vestige.golf/guidelines). The
  plain-English companion to ToS §5–§6 (the ToS is what binds; this is the
  readable version). Linked from ToS §6; the app's report/block flows can
  link it later if wanted.

Company facts used across all three (update everywhere if they change):
**Pinehollow Studios Limited**, company number **17212889**, registered
office 82A James Carter Road, Mildenhall, Bury St. Edmunds, IP28 7DE.
Contact: **support@pinehollow.studio**. Minimum age: **17**.

## Outstanding (business tasks, not copy)

1. **Solicitor review** — especially the golf-club data-package section of
   the privacy policy (the B2B model is the legally sensitive part of this
   product; "aggregated/anonymised" has a high bar under UK GDPR), and
   whether the analytics opt-out model is sufficient vs opt-in consent
   (a PECR/GDPR call).
2. **ICO registration** — Pinehollow Studios Limited must register as a
   data controller and pay the annual data-protection fee before processing
   live user data at scale. Not yet done as far as this repo records.
3. **B2B data packages** — the aggregation threshold (refuse cells < N
   users), the k-anonymity model, and the lawful basis for the sale all
   need sign-off before the export pipeline is built.
4. **Sub-processor DPAs** — confirm data-processing agreements are in place
   with the live set: Supabase, Sentry, Mapbox, Apple, Google, Vercel,
   Resend.
5. **App Store Connect** — keep the Privacy "Nutrition Label" questionnaire
   consistent with the privacy policy whenever either changes.

## History

- **2026-07-14** — `/terms` and `/privacy` pages built; ToS gained the
  Vestige Pro section.
- **2026-08-28** — Beta Testing Agreement live at `/beta-terms` (#63).
- **2026-08-29** — Watertightness pass: company number (17212889) added to
  all three documents; ToS gained §17 General (entire agreement,
  severability, no waiver, assignment); privacy policy corrected to the
  live app (Google added as processor, location described as on-device
  only, the three onboarding demographics questions named, legal-basis
  wording aligned with the opt-out model). Markdown sources consolidated
  into this folder as the single canonical set — the old parallel draft in
  the iOS repo (`docs/privacy-policy.md`) now just points here.
- **2026-08-29** — Community Guidelines added at `/guidelines` (the
  plain-English companion to ToS §5–§6), linked from ToS §6.
