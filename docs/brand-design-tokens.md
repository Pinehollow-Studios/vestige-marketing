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
