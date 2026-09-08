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
2. **ICO registration — DONE. Official 14 September 2026** (Tom,
   2026-09-08). Pinehollow Studios Limited has completed its registration as
   a data controller; it takes effect on **14 September 2026**, which is also
   the date the annual data-protection fee is taken and the **year of billing
   starts**. Nothing further to do unless the payment fails. Two things to
   come back for: **record the registration number here** once the ICO issues
   it, because it is the first thing anyone auditing us will ask for, and
   **diarise the renewal for September 2027** — letting a registration lapse
   is a fineable offence rather than a paperwork slip.
3. **B2B data packages** — the aggregation threshold (refuse cells < N
   users), the k-anonymity model, and the lawful basis for the sale all
   need sign-off before the export pipeline is built.
4. **Sub-processor DPAs** — confirm data-processing agreements are in place
   with the live set: Supabase, Sentry, Mapbox, Apple, Google, Vercel,
   Resend, Microsoft. **Microsoft is now settled (2026-09-08):** the
   Products and Services DPA is an addendum to the Product Terms, which the
   Microsoft Customer Agreement incorporates, so Art. 28 is satisfied by the
   agreement itself and there is nothing separate to sign. The Azure account
   was also moved onto the company — sold-to is now *Pinehollow Studios
   Limited* with company number 17212889, where it previously named Tom
   personally. Its `accountType` is still Microsoft's `Individual`
   (self-service signup; no supported conversion), which is **a question for
   the solicitor**, not something to treat as closed.
   **The rest of the list has not been checked, and the same personal-vs-
   company question applies to every one of them** — that is the real
   outstanding work in this item.
5. **App Store Connect** — keep the Privacy "Nutrition Label" questionnaire
   consistent with the privacy policy whenever either changes. The 2026-09-08
   content-safety change adds no new *category* of collected data, so no
   label change is expected — but the questionnaire should be re-read, not
   assumed, next time it is opened.
6. ~~**Azure data logging**~~ — **closed 2026-09-08, it was a phantom.**
   Azure AI Content Safety stores no input, uses none of it for training,
   and is explicitly outside Azure OpenAI's abuse-monitoring process
   (Microsoft's own data-privacy page). The opt-out form we were looking for
   belongs to Azure OpenAI. The policy's retention section now states this
   rather than staying silent. The one thing Microsoft *does* store is
   Blocklist API data, which we do not use — if anyone ever wires up
   blocklists, this paragraph stops being true.
7. **DPIA** — automated scanning of user photos is arguably systematic
   monitoring. Worth putting to the solicitor alongside item 1 rather than
   deciding in-house.

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
- **2026-09-08** — **Content moderation pass.** Microsoft named as a
  processor (Azure AI Content Safety, Sweden Central) in the privacy
  policy's processor list and its EEA storage sentence; the photo section
  and a new "keep Vestige a decent place" bullet describe what is checked
  and what is deliberately not (private notes, and the bug reports you send
  us); the legal-basis section gains content safety under legitimate
  interests plus an explicit statement that no automated check decides
  anything about an account on its own. ToS §6 and the Community Guidelines
  gained the matching plain-English description. All four documents and
  their four rendered pages updated together; "Last updated" moved to
  8 September 2026 on the three that changed.
- **2026-09-08** — **Microsoft confirmed end to end.** Azure account moved
  onto the company (sold-to *Pinehollow Studios Limited*, company number
  17212889); DPA needs no separate signature; region verified **Sweden
  Central** (EEA, so adequacy covers it); service verified live. The
  retention paragraph of the privacy policy gained a sentence that the
  provider stores nothing, uses nothing for training, and processes only
  in-region — which the earlier pass had deliberately left out while we
  still believed there was a data-logging switch to find. Details in
  `vestige-ios/docs/azure-content-safety-setup.md`.
