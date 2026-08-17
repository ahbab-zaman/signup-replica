# UI Tokens

## How to Use
All tokens are defined in `src/index.css` via Tailwind v4's `@theme` directive. No `tailwind.config.ts` needed for colors, spacing, or typography. Components consume only these tokens — never raw Tailwind palette classes, never arbitrary values.

> Palette derived from the provided reference extraction (dark theme, black base, violet/indigo accent, amber highlight). Color roles below are inferred from the extraction's element-usage data (e.g., `#000000` used on `body`/`main`/`section` → background; `#5724ff` used sparingly on a single `div` → primary accent/brand color).

## Complete Token Definition

```css
@import "tailwindcss";

@theme {
  --font-sans: "Poppins", sans-serif;

  /* Backgrounds / Surfaces */
  --color-background: #000000;
  --color-surface: #151515;
  --color-surface-secondary: rgba(255, 255, 255, 0.04);
  --color-surface-tertiary: rgba(255, 255, 255, 0.03);
  --color-surface-hover: rgba(255, 255, 255, 0.06);

  /* Borders */
  --color-border: rgba(255, 255, 255, 0.1);
  --color-border-light: rgba(255, 255, 255, 0.2);
  --color-border-muted: rgba(255, 255, 255, 0.05);

  /* Text */
  --color-text-primary: #ffffff;
  --color-text-secondary: #e5e7eb;
  --color-text-muted: rgba(255, 255, 255, 0.5);
  --color-text-subtle: rgba(255, 255, 255, 0.45);
  --color-text-faint: rgba(255, 255, 255, 0.4);
  --color-text-dim: rgba(255, 255, 255, 0.3);

  /* Icon opacity tiers (svg/path usage from extraction) */
  --color-icon-strong: rgba(255, 255, 255, 0.7);
  --color-icon-muted: rgba(255, 255, 255, 0.3);

  /* Accent (brand) */
  --color-accent: #5724ff;
  --color-accent-dark: #4318e0;
  --color-accent-light: #a78bfa;
  --color-accent-lightest: #dfdff0;
  --color-accent-tint: #f5f3ff;
  --color-accent-foreground: #ffffff;

  /* Highlight (badges, ratings, special emphasis) */
  --color-highlight: #fbbf24;
  --color-highlight-foreground: #151515;

  /* Semantic status (extensions beyond the extracted palette, kept consistent with the dark theme) */
  --color-success: #22c55e;
  --color-success-light: rgba(34, 197, 94, 0.15);
  --color-success-foreground: #d7f2e8;

  --color-error: #ef4444;
  --color-error-light: rgba(239, 68, 68, 0.15);
  --color-error-foreground: #ffe0e0;

  --color-warning: #fbbf24;
  --color-warning-light: rgba(251, 191, 36, 0.15);

  --color-info: #4a84ff;
  --color-info-light: rgba(74, 132, 255, 0.15);

  --color-overlay: rgba(0, 0, 0, 0.7);

  /* Gradient stops — compose with `bg-linear-to-*` + `from/via/to` utilities */
  --color-grad-hero-1: #a78bfa; /* violet (hero "Perfect!" gradient) */
  --color-grad-hero-2: #f472b6; /* pink */
  --color-grad-hero-3: #fbbf24; /* amber */
  --color-grad-dl-1: #9333ea; /* purple (download section bg) */
  --color-grad-dl-2: #ec4899; /* pink */
  --color-grad-dl-3: #dc2626; /* red */

  /* Bento / landing extras */
  --color-bento-violet: #ddd6fe; /* CTA bento card bg (violet-300 eq.) */

  /* Profile banner palette */
  --color-profile-banner-start: #8ad9cc;
  --color-profile-banner-end: #5aa89b;
  --color-banner-glyph: #12100e;

  /* Typography */
  --font-size-banner-glyph: clamp(9rem, 32vw, 15rem);

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-card: 0px 10px 30px rgba(0, 0, 0, 0.4);
  --shadow-card-hover: 0px 14px 40px rgba(0, 0, 0, 0.5);
  --shadow-popover: 0px 18px 50px rgba(0, 0, 0, 0.6);
}
```

## Color Usage

| Token | Usage |
|---|---|
| `--color-background` | App shell, body background (pure black) |
| `--color-surface` | Wizard card, modal, dropdown backgrounds |
| `--color-surface-secondary` / `-tertiary` | Subtle nested panels, hover backgrounds, OTP box default fill |
| `--color-border` / `-light` / `-muted` | Card borders, input borders, dividers |
| `--color-text-primary` | Headings, primary body text, button labels |
| `--color-text-secondary` | Secondary body text, form labels |
| `--color-text-muted` / `-subtle` / `-faint` / `-dim` | Helper text, placeholder-adjacent copy, disabled text — descending emphasis tiers |
| `--color-icon-strong` / `-muted` | Icon opacity tiers (chevrons, checkmarks, decorative svg) |
| `--color-accent` | Primary buttons, active states, focus rings, links, progress indicator |
| `--color-accent-light` | Secondary accent — hover states, secondary badges |
| `--color-accent-lightest` / `-tint` | Rare, light-toned emphasis text on dark background (hero subtext, special callouts) |
| `--color-highlight` | Badges, ratings, "new"/emphasis tags — used sparingly |
| `--color-success` / `-error` / `-warning` / `-info` | Field validation states, toasts |

## Typography Tokens

| Token | Font Size | Usage |
|---|---:|---|
| xs | 12px | Helper text, OTP resend timer, captions |
| sm | 14px | Secondary text, field labels |
| base | 16px | Body text, input text |
| lg | 18px | Emphasized body text |
| xl | 20px | Card/step titles |
| 2xl | 24px | Wizard step headings |
| 3xl | 32px | Page headings (Terms, Success) |
| 4xl | 40px | Landing hero title |

Font weights: 400 (body), 500 (labels/buttons), 600 (subheadings), 700 (headings) — Poppins only.

## Spacing Tokens

| Token | Value | Usage |
|---|---:|---|
| 2 | 2px | Micro spacing |
| 4 | 4px | Icon gaps |
| 8 | 8px | Small gaps (label-to-input) |
| 12 | 12px | Compact spacing (OTP box gaps) |
| 16 | 16px | Default field/button padding |
| 20 | 20px | Card internal spacing (mobile) |
| 24 | 24px | Section gaps, card padding (mobile) |
| 32 | 32px | Card padding (desktop), large gaps |
| 40 | 40px | Page section spacing |
| 64 | 64px | Landing hero spacing |
| 96 | 96px | Landing hero top spacing (desktop) |

## Animation Tokens

| Token | Value | Usage |
|---|---:|---|
| fast | 100ms | Hover, checkbox toggle |
| normal | 200ms | Step transitions, buttons |
| slow | 300ms | Modal open/close |
| hero | 500ms | Landing hero entrance |

Always `ease-out` unless a spring is explicitly appropriate (OTP digit fill feedback).

## Shadow Tokens
`--shadow-card` (default elevation), `--shadow-card-hover`, `--shadow-popover` (dropdowns, modal).

## Z-Index Tokens

| Layer | Value |
|---|---:|
| Base | 0 |
| Dropdown | 20 |
| Sticky nav | 30 |
| Modal overlay | 60 |
| Toast | 80 |
| Tooltip | 90 |

## Breakpoints

| Breakpoint | Width |
|---|---:|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |

## Focus Ring
2px, 2px offset, `--color-accent`. Never removed without an accessible replacement.

## Toast Tokens
Top-right on desktop, bottom-center on mobile. Max 3 visible. Auto-dismiss 4s unless persistent.

## Token Usage Rules
- Never hardcode colors, spacing, or font sizes in components.
- Never use raw Tailwind palette classes.
- Reuse existing tokens before adding new ones — if a new token is genuinely needed, add it here first, then use it.
