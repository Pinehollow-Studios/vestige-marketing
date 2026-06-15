# `www.vestige.golf` SSL certificate warning

**Status:** investigating · **Last updated:** 14 June 2026

A visitor opened the shared link and Safari showed *"This Connection Is Not
Private — This website may be impersonating www.vestige.golf to steal your
personal or financial information."*

## What it means

It's a **TLS/SSL certificate problem on the `www.` version of the domain** —
**not** a hack, a compromised domain, or anyone actually impersonating us.
Safari shows that exact "may be impersonating…" wording whenever it cannot
verify a valid HTTPS certificate matching the hostname it is connecting to.
In plain terms: when the visitor's phone connected to `www.vestige.golf`, the
server answered without a certificate the browser trusts for that name, so the
browser refused and threw the warning.

The bare `https://vestige.golf` almost certainly works fine. It is the `www`
variant that is broken, and that is the one that got opened.

## What's actually configured (verified via DNS)

DNS routing is correct — both names point at Vercel:

| Name | Record | Points to |
|---|---|---|
| `vestige.golf` (apex) | A | Vercel IPs (`216.198.79.65`, `64.29.17.65`) |
| `www.vestige.golf` | CNAME | Vercel (`…vercel-dns-017.com`) |
| `vestige.golf` | CAA | none (nothing blocking certificate issuance) |

So the routing is right. What's missing or broken is a **valid certificate for
`www.vestige.golf` specifically** — most likely the Vercel cert for `www` was
pending, failed, or mid-provisioning when the visitor hit it.

## Why it matters

For a pre-launch marketing site this is damaging: a "this site may be stealing
your information" screen is about the worst first impression possible, and most
people will close the tab and never sign up. Worth fixing promptly. It is a
**Vercel / DNS configuration fix — nothing in the code.**

## How to fix it (Vercel dashboard)

1. **Vercel → project → Settings → Domains.** Confirm **both** `vestige.golf`
   *and* `www.vestige.golf` are listed. Check `www`'s status for any "Invalid
   Configuration" or a certificate that isn't issued (pending / error).
2. If `www` shows an error or pending cert: use Vercel's **Refresh / re-issue**,
   or remove and re-add `www`. Vercel auto-provisions a Let's Encrypt cert once
   it verifies the DNS (can take a few minutes).
3. **Set a canonical + redirect.** Pick one as primary (usually the apex
   `vestige.golf`) and have `www` **redirect** to it. Vercel does this
   automatically once both are added and a primary is chosen — then it doesn't
   matter which form anyone types or shares.
4. **Re-test with a real tool.** Open `https://www.vestige.golf` from a normal
   phone/browser, and/or run `www.vestige.golf` through an external checker:
   - <https://www.ssllabs.com/ssltest/>
   - <https://www.sslshopper.com/ssl-checker.html>
   - <https://crt.sh/?q=www.vestige.golf> (Certificate Transparency log)

## In the meantime

- **Share the link as `https://vestige.golf`** (no `www`) — that side works.
- It may self-resolve: Vercel has a brief window right after a domain change
  where `www` is invalid. If the domain was touched recently, the visitor may
  have hit that window. Re-try `https://www.vestige.golf`; if it loads cleanly,
  it was a provisioning blip, and step 3 (the redirect) prevents a repeat.

## Note on automated checking from this environment

The Claude Code sandbox here is locked to a **network egress allowlist** that
includes neither `vestige.golf` / `www.vestige.golf` nor the public SSL
checkers (crt.sh, SSL Labs) — requests to them return
`403 Host not in allowlist`. On top of that, the sandbox proxy terminates TLS
with its own substitute certificate, so a direct probe can't see Vercel's real
cert anyway.

**Net effect:** from this environment only **DNS lookups** are reliable (they
don't go through the HTTP proxy). DNS confirms the routing is correct, but it
**cannot reveal certificate status** — so I can't detect from here when the
cert gets fixed. The authoritative re-test has to be external:

- open `https://www.vestige.golf` on a real phone/browser, or
- run it through <https://www.ssllabs.com/ssltest/> or
  <https://crt.sh/?q=www.vestige.golf>.

To let this environment monitor it for real, add `vestige.golf` and
`www.vestige.golf` (and optionally `crt.sh`) to the session's network egress
allowlist — see <https://code.claude.com/docs/en/claude-code-on-the-web>.

## Live findings log

- _14 Jun 2026 ~09:09 — DNS still correct: apex → Vercel IPs
  (`216.198.79.65`, `64.29.17.65`), `www` → Vercel CNAME
  (`…vercel-dns-017.com`), no CAA record. Could not reach the site or any
  cert checker from the sandbox (egress allowlist). Cert status must be
  confirmed externally._

