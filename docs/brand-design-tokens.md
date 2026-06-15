# Vestige — Brand & Design Tokens

Reference for designing the app logo / icon. All values are taken directly from
the live marketing site, so anything built on them will sit correctly against
the product.

---

## 1. Colours

### Core
| Role | Hex | RGB | Notes |
|---|---|---|---|
| Background (paper) | `#06090E` | 6, 9, 14 | The deep near-black everything sits on |
| Sheet / card | `#0B1119` | 11, 17, 25 | Slightly lifted panel |
| Sheet (alt) | `#0E1822` / `#101D2B` | — | Deeper card tones |
| Ink — primary text | `#F6F4EE` | 246, 244, 238 | Warm off-white / cream |
| Ink — secondary | `#9BA7B5` | 155, 167, 181 | Muted slate (sub-text) |
| Ink — tertiary | `#5F6B7A` | 95, 107, 122 | Faint labels/captions |
| Hairline | `rgba(255,255,255,0.10)` | — | Borders |
| Hairline (strong) | `rgba(255,255,255,0.18)` | — | Borders |

### Signature accent — mint → lime (THE brand colour)
| Role | Hex | RGB |
|---|---|---|
| **Mint (primary)** | `#5BE4C3` | 91, 228, 195 |
| **Lime** | `#8FE85B` | 143, 232, 91 |
| On-accent (text/shapes on mint) | `#06090E` | 6, 9, 14 |

- **Gradient:** `linear-gradient(135deg, #5BE4C3, #8FE85B)` — ~135° diagonal,
  mint top-left → lime bottom-right.
- If you need **one solid colour** (favicon, monochrome mark): use mint `#5BE4C3`.
- Anything sitting *on* the mint (a knockout/cut-out shape) should be the
  near-black `#06090E`.

### Secondary accents (used sparingly)
| Role | Hex | RGB |
|---|---|---|
| Amber | `#F4A85C` | 244, 168, 92 |
| Claret / coral (also the error colour) | `#E2664E` | 226, 102, 78 |

> Mint is the identity. Amber/claret are optional warmth — keep them secondary.

### Selection / highlight
- Text selection: background `#5BE4C3`, text `#06090E`.

---

## 2. Typography

| Use | Typeface | Weights | Notes |
|---|---|---|---|
| **Display / headlines / wordmark** | **Manrope** | 400–700 (headlines use **500**) | Modern geometric sans, upright only |
| UI / body | **Inter** | — | |
| Mono (rare) | SF Mono / JetBrains Mono | — | |

**Wordmark treatment on the site:** `VESTIGE` — all uppercase, letter-spacing
~1.6px, weight 700 (small lockup). The large closing wordmark uses Manrope. The
emphasised word in headlines is filled with the mint→lime gradient.

Both fonts are free (Google Fonts): Manrope, Inter.

---

## 3. Logo / app-icon guidance

- **Brand essence:** deep near-black canvas, cream text, a single mint→lime
  gradient as the one pop of colour.
- **Full version:** mint→lime gradient (135°).
- **One-colour version:** solid mint `#5BE4C3` on `#06090E` (or reversed).
- **App icon:** it'll render small on the iOS home screen — make sure the mark
  reads as a **solid mint shape** without relying on the subtle gradient or fine
  detail. Treat the gradient as the "full-size" flourish.
- The current square mark in the site header is a **placeholder** (a stylised
  flag-on-a-pin), so there's nothing you need to match — clean slate.

---

## 4. Quick copy-paste

```
Background  #06090E
Sheet       #0B1119
Ink         #F6F4EE
Ink-2       #9BA7B5
Ink-3       #5F6B7A

Mint        #5BE4C3   ← primary brand colour
Lime        #8FE85B
On-accent   #06090E

Amber       #F4A85C
Claret      #E2664E

Gradient    linear-gradient(135deg, #5BE4C3, #8FE85B)
Fonts       Manrope (display/wordmark), Inter (UI)
```

---

## 5. App context (design brief)

Vestige is an iPhone app for golfers in England. It's a personal *collection*:
every golf course in the country on one map, and you mark the ones you've played
with a tap, watching your map of England fill in over time. It's not a scorecard
or a swing tracker — the point is the places, kept. There's a quiet social side
too: see how your collection compares with friends, and where you rank across
the country.

The name means a *vestige* — a trace or mark left behind. Every round leaves one.
The brand is calm, elegant and understated rather than loud or sporty: a deep
near-black canvas, warm cream text, and a single mint-to-lime gradient
(`#5BE4C3 → #8FE85B`) as the one pop of colour. Think premium and map-like —
closer to a fine atlas or a members' club than a fitness app.

**Looking for:** app icon / logo concepts. Motifs worth exploring — the map or
silhouette of England, a flag or pin marking a course, a route/trail line, a
"collected/ticked" mark, or something abstract from the idea of a trace left
behind. It needs to read clearly at small size as an iOS home-screen icon, and
ideally work as a solid mint shape as well as with the gradient.
