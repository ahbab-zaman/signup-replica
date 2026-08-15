# UI Rules

## Font
Import **Poppins** via a font-loading strategy in `index.html` or `@font-face` in `index.css` (weights: 400, 500, 600, 700). Applied as the sans font token — see `ui-tokens.md`.

## Styling Constraint (critical)
**All styling is Tailwind utility classes + tokens defined in `index.css`. No raw CSS files, no CSS-in-JS, no inline `style={}` except where a value is truly dynamic (e.g., a Framer Motion-driven transform), and even then prefer Framer Motion's style props first.**

## Layout
- Page max width: `1280px`, centered
- Main content padding: `32px` desktop, `24px` tablet, `16px` mobile
- Section gap: `24px`
- Wizard card max width: `480px`, centered vertically and horizontally on all viewports ≥ tablet; full-width with side padding on mobile

### Responsive Behavior
- Desktop/tablet: wizard card centered, generous surrounding negative space, hero visuals visible on landing
- Mobile: wizard card fills width minus padding, single column throughout, sticky Next/Back button bar at the bottom of the viewport if content is tall
- Touch targets minimum 44×44px everywhere
- No horizontal scrolling anywhere, ever

## Navbar
- Minimal top bar on landing/terms pages only (logo left, Login/Signup right). The wizard itself uses only the logo + step progress indicator, no full nav, to keep focus on the form.
- Height: `72px`
- Background: `bg-background` with a subtle bottom border (`--color-border`)

## Cards (wizard step container, dropdowns, modal)
- Background: `--color-surface`
- Border: `1px solid --color-border`
- Border radius: `--radius-xl` (16px)
- Padding: `32px` desktop / `24px` mobile
- Shadow: `--shadow-card`

## Wizard-Specific Rules
- A progress indicator (dots or thin bar) is always visible at the top of the wizard card, reflecting current step out of total.
- Step headings use the `2xl` type token, always present, always the first focusable element on step mount (for accessibility).
- Primary action button is always full-width within the card on mobile, auto-width on desktop, right-aligned next to Back.
- Back is always a secondary/ghost-style button, never visually competing with the primary action.

## OTP Input
- 6 individual boxed digit inputs, evenly spaced, large touch targets (≥48px on mobile)
- States: default, focused, filled, error (each visually distinct via token colors, not just color — also border weight/icon)
- Resend link shows a visible countdown (`Resend in 0:24`) while on cooldown, becomes an active link at 0:00

## Accessibility
- Every input has a real, visible `<label>` — never placeholder-as-label
- Strong text contrast against the dark background at every token tier
- Focus states always visible (2px ring using `--color-accent`)
- Interactive targets ≥ 44×44px on mobile

## Do Nots
- Never rely on color alone to indicate error/success state — pair with icon and/or text
- Never use raw Tailwind palette classes — tokens only
- Never let the wizard card jump/shift in height jarringly between steps — animate height changes smoothly
- Never hide the Back button once a user has entered Step 1+

## Design Goal
Dark, premium, focused, uncommon — a confident black-and-violet aesthetic with generous negative space, crisp typography, and purposeful motion. The wizard should feel calm and fast, never busy.

---

# Motion Rules (Framer Motion)
- Micro-interactions: 100–150ms
- Step/UI transitions: 200–300ms
- Modals: 250–350ms
- Landing hero entrance: staggered, 400–600ms total
- Always `ease-out` unless a spring is explicitly more appropriate (e.g., OTP digit fill)
- Respect `prefers-reduced-motion`: fall back to instant/opacity-only transitions
- Never animate in a way that causes layout shift or content jump

---

# Interaction States
Every interactive component supports: **default, hover, active/pressed, focus, disabled, loading (where applicable), error (form fields only).**
- Disabled: reduced opacity + `cursor-not-allowed`, never fires events
- Focus: visible 2px ring, `--color-accent`, never removed without an accessible replacement

---

# Loading States
- Buttons: inline spinner replaces/accompanies label text, button disabled while pending
- Page-level async content (rare in this scope): skeleton loaders matching final content shape
- Never leave the user wondering whether something is happening — every async trigger gets immediate visual feedback within 100ms

---

# Empty States
Not heavily applicable to this scope (no data lists), but the mock dashboard (`/home`) should still show a clear "you're in" state rather than a blank page.

---

# Error States
- Field-level: inline text directly beneath the input, red-toned error token, paired with `aria-invalid` + `aria-describedby`
- Global/network-level: toast, top-right on desktop, bottom-center on mobile, auto-dismiss 4s, max 3 stacked
- Never expose raw error objects, stack traces, or technical codes to the user

---

# Toast Notifications
- Use only for: OTP resend confirmation, global submission failure, generic success confirmations
- Never for validation errors requiring immediate field-level correction — those stay inline

---

# Modal Rules (landing signup confirm modal)
- Traps focus while open
- Closes on `Esc`
- Restores focus to the triggering "Sign Up" button on close
- Max width `420px`, centered, dark overlay with blur behind it

---

# Keyboard Accessibility
- Logical tab order through every step
- Enter submits the current step's form
- Esc closes modals/dropdowns
- Arrow keys navigate the OTP digit boxes and the pronoun dropdown

---

# Touch Targets
Minimum 44×44px, with adequate spacing between adjacent actions (Next/Back never closer than 16px apart).

---

# Responsive Checklist
Every page/step verified at: 375px, 768px, 1024px, 1440px. No horizontal scroll unless explicitly intended (none is, in this project).

---

# Definition of Good UI (this project)
Responsive, accessible, performant, calm, dark-and-premium, consistent with tokens, keyboard-friendly, screen-reader compatible, free of layout shift, and — above all — clearly communicative about system state (loading/error/success) at every step.
