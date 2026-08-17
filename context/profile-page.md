<!-- FILE: context/profile-page-prompt.md -->
# Prompt: Build the Profile Page (Pixel-Match Target)

You are building the **Profile page** (`/profile`) for this project. Before writing any code, read `AGENTS.md`, `context/architecture.md`, `context/ui-rules.md`, and `context/ui-tokens.md`. This page must follow every existing rule (Tailwind-only via `index.css` tokens, Framer Motion for animation, strict TypeScript, no `any`).

**Goal:** Recreate the attached reference screenshot as closely as reasonably achievable within this project's stack. The reference shows the top banner/header portion of a mobile profile screen — replicate that section pixel-close, then extend it downward with a sensible, consistent profile body (stats, bio, actions) since the screenshot only captures the header.

---

## Reference Breakdown

**Banner (top ~85% of visible area):**
- Full-width hero banner, teal/mint gradient background (`radial`/`linear`, lighter center-top fading slightly darker toward edges — sample as `#7fd4c7` → `#5fb8ab` range).
- Giant oversized display typography ("TA" — the user's initials) rendered in near-black, bleeding off the top and bottom edges of the banner, positioned right-of-center, overlapping the gradient as a bold graphic/watermark element — not literal text content, a generated *initials-as-hero-art* treatment.
- Top status/nav row overlaid on the banner: small circular/logo mark top-left ("E" in a rounded badge), system-style icon row top-right (this is just the phone status bar in the screenshot — **do not build this**, it's OS chrome, not app UI).
- Small image/edit icon button, bottom-right of the banner (rounded square, translucent dark background, picture icon) — this is the "change banner image" action.
- Bottom-left of the banner, overlaid directly on the gradient:
  - Name in large bold white text: "tahmim ahmed"
  - Age immediately after, same line, smaller and muted/gray: "24"
  - Below that: username in bold white, smaller: "@tahmimahmed"
  - Immediately after username, muted gray pill/tag text: "him" (this is the pronoun, shown as inline muted text next to the handle)
- A single small dot indicator centered near the bottom of the banner (likely a carousel/pager dot if the banner supports multiple photos — build as a pager if multi-image banner support is in scope, otherwise a static decorative dot).

**Below the banner:** solid black area begins — this is where the rest of the profile content (not shown in the screenshot) should continue.

---

## Component Structure

`src/pages/ProfilePage.tsx` composing:
- `src/components/profile/ProfileBanner.tsx` — the hero section described above
- `src/components/profile/ProfileStats.tsx` — extend below (see "Extending Beyond the Screenshot")
- `src/components/profile/ProfileBio.tsx`
- `src/components/profile/ProfileActions.tsx`

---

## `ProfileBanner.tsx` — Detailed Spec

- Container: full viewport width, fixed aspect ratio or fixed height (~380–420px on mobile, scales proportionally on larger viewports — cap max-height so it doesn't dominate desktop), `overflow-hidden`, `relative`.
- Background: gradient token (add to `ui-tokens.md`):
```css
  --color-profile-banner-start: #8ad9cc;
  --color-profile-banner-end: #5aa89b;
```
  Applied as a soft radial/linear gradient, lighter toward the upper-center.
- **Initials art**: render the user's first-name and username initials (e.g. "T" and "A") as two giant, tightly-kerned, bold sans-serif glyphs in near-black (`--color-text-black` equivalent — add `--color-banner-glyph: #12100e` if not already tokenized), sized to bleed off the top and bottom of the banner container, positioned to the right two-thirds of the width, slightly overlapping each other. Implement as an absolutely-positioned `<div>` with two stacked `<span>`s using a bold display font at a huge `font-size` (viewport-relative, e.g. `clamp()`-driven via a Tailwind arbitrary value only if no token fits — otherwise define a `--font-size-banner-glyph` token), `leading-none`, negative letter-spacing, `pointer-events-none`, `select-none`, `aria-hidden="true"` (purely decorative).
  - Generate the two letters dynamically from the user's display name / username (first letter of each), so this component works for any user, not just "TA".
- **Banner action button**: bottom-right, small rounded-square button (~40px), translucent dark background (`bg-black/40` mapped to a token, e.g. `--color-overlay` at reduced opacity), image/picture icon (`lucide-react` `ImagePlus` or `Camera`), `backdrop-blur-sm`, hover brightens, opens a (stubbed) image picker action.
- **Identity block**: bottom-left, absolutely positioned with padding matching the layout spacing tokens (`px-4`/`pb-5` equivalent from `ui-tokens.md` spacing scale):
  - Row 1: `<h1>` name in bold white, large (`3xl`/`2xl` token), followed inline by age in a muted/smaller weight+size (`--color-text-muted`, `lg` token) — e.g. `tahmim ahmed  24`.
  - Row 2, small gap below: `@username` in bold white (`sm`/`base` token) followed inline by pronoun text in muted gray (`--color-text-muted`, `xs`/`sm` token) — e.g. `@tahmimahmed  him`.
  - Use `flex items-baseline gap-2` for each row so the secondary text sits naturally next to the primary text, matching the reference's baseline alignment.
- **Pager dot**: single small white/light dot, centered horizontally, positioned a bit above the bottom edge of the banner (`absolute bottom-4 left-1/2 -translate-x-1/2`). Build this as a real pager if the banner is meant to support multiple images (swipeable), using Framer Motion `drag="x"` + snap, with the dot count matching image count and the active dot brighter/larger. If banner photo carousel isn't in scope yet, render a single static dot and note in `progress-tracker.md` that carousel behavior is deferred.
- **Entrance animation**: on mount, name/username block fades + rises in slightly (Framer Motion, ~300ms, `ease-out`), banner glyph fades in from slightly lower opacity/scale for a subtle "reveal" feel — respect `prefers-reduced-motion`.

---

## Extending Beyond the Screenshot

The screenshot only shows the banner/header. Below it, build a minimal-but-complete profile body so the page isn't just a banner:

### `ProfileStats.tsx`
- Row of 2–4 simple stat blocks (e.g. Events attended, Connections, Member since), centered or left-aligned, each: bold number + muted label underneath. Keep this data mocked (`data/mock-profile.ts`) since there's no backend.

### `ProfileBio.tsx`
- Optional short bio/tagline text area below stats, muted text, max a few lines, with a "no bio yet" empty state if blank (per `ui-rules.md` empty-state rules).

### `ProfileActions.tsx`
- Primary action row: "Edit Profile" button (outlined/secondary style) and a settings/gear icon button, positioned below the banner, standard card padding.

Keep this extended content **visually consistent** with the dark theme established in `ui-tokens.md` (`--color-background`, `--color-surface`, etc.) — the banner is the one section with its own distinct teal palette; everything below returns to the site's standard dark/accent palette.

---

## Responsive Behavior

- Mobile (≤640px): banner height ~380px, identity block padding `16px`, glyph sized to still bleed dramatically off-canvas.
- Tablet/Desktop (≥768px): banner can grow in height moderately but should cap (`max-h-[480px]`) so it doesn't overwhelm a wide viewport; consider centering the content column (`max-w-[640px]` or the project's standard page max-width) for the stats/bio/actions sections below the banner, while the banner itself stays full-bleed.

---

## Accessibility

- Giant initials glyph is `aria-hidden` — it's decorative, not real content.
- Name is a real `<h1>`, age/username/pronoun are properly marked up as supporting text, not baked into the same text node (so screen readers announce them sensibly, e.g. "tahmim ahmed, 24 years old, at tahmimahmed, pronouns him").
- Pager dot(s), if built as an interactive carousel, are keyboard-navigable (arrow keys) with `aria-label`s (e.g. "Banner photo 1 of 3").
- Banner edit button has a real accessible label ("Change banner photo"), not just an icon.

---

## Tokens to Add (`ui-tokens.md` + `index.css`)

```css
--color-profile-banner-start: #8ad9cc;
--color-profile-banner-end: #5aa89b;
--color-banner-glyph: #12100e;
```

Reuse existing tokens (`--color-text-primary`, `--color-text-muted`, `--color-overlay`) for everything else — do not introduce new text/overlay colors if an existing token already fits.

---

## Performance & Motion Checklist

- [ ] Giant glyph text rendered as real text (not an image), so it stays crisp at all sizes and costs nothing to load
- [ ] Entrance animations respect `prefers-reduced-motion`
- [ ] No layout shift when the banner image/carousel loads
- [ ] Fully responsive 375px → 1440px+, banner never causes horizontal scroll
- [ ] If pager/carousel built: smooth drag with snap, 60fps

---

## Deliverable

A `/profile` route rendering `ProfileBanner` (pixel-close to the reference) plus a minimal, consistent `ProfileStats` / `ProfileBio` / `ProfileActions` body below it, using mocked data, following all existing project conventions. Update `progress-tracker.md` on completion, noting whether the banner carousel was fully built or deferred to a single static dot.
