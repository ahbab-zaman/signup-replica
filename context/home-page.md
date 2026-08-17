<!-- FILE: context/home-page-prompt.md -->
# Prompt: Build the Home / Landing Page (Pixel-Match Target)

You are building the **Home/Landing page** for this project. Before writing any code, read `AGENTS.md`, `context/architecture.md`, `context/ui-rules.md`, and `context/ui-tokens.md` — this page must follow every existing rule (Tailwind-only styling via tokens in `index.css`, Framer Motion for all animation, Three.js scoped to the hero only, strict TypeScript, no `any`).

**Goal:** Recreate the attached reference screenshot and HTML structure as close to pixel-perfect as reasonably achievable within this project's tech stack (React + Vite + TypeScript + Tailwind v4 + Framer Motion + Three.js — no GSAP, no raw CSS outside `index.css`). Match structure, spacing, typography rhythm, and motion *character* section by section. Where the reference uses GSAP/ScrollTrigger, reproduce the equivalent effect using Framer Motion's `useScroll` / `useTransform` / `whileInView` APIs instead — do not add GSAP as a dependency.

Build fast, buttery-smooth (60fps), and premium. This page is judged on motion polish as much as visual layout.

---

## Global Notes

- Route: `/home` in `App.tsx` (replace the current minimal placeholder).
- Component location: `src/pages/HomePage.tsx` composing section components from `src/components/home/` (one file per section, e.g. `HeroSection.tsx`, `EventsMarquee.tsx`, `DownloadSection.tsx`, `AboutSection.tsx`, `FeatureBento.tsx`, `StorySection.tsx`, `ContactSection.tsx`, `SiteFooter.tsx`).
- Reuse `components/layout/Navbar.tsx` if it already fits; extend rather than duplicate.
- All colors/spacing/typography must come from `ui-tokens.md` tokens. Where the reference needs a color not yet in tokens (see "New Tokens Needed" below), add it to `index.css` `@theme` first, then use it — never hardcode.
- Respect `prefers-reduced-motion`: every scroll/hover/marquee animation must have a reduced/static fallback.
- Every video/image is lazy-loaded; the Three.js hero canvas is `React.lazy` + `Suspense`.

---

## New Tokens Needed (add to `ui-tokens.md` + `index.css` before building)

```css
--color-gradient-hero: linear-gradient(to right, #a78bfa, #f472b6, #fbbf24); /* violet → pink → amber, hero "Perfect!" text */
--color-gradient-download: linear-gradient(to right, #9333ea, #ec4899, #dc2626); /* purple → pink → red, download section bg */
--color-bento-violet: #ddd6fe; /* violet-300 equivalent, CTA bento card bg */
--color-card-glass: rgba(255, 255, 255, 0.04); /* event card / bento card translucent bg, matches existing --color-surface-secondary */
```
(Reuse `--color-surface-secondary` for `--color-card-glass` if they end up identical — don't duplicate tokens.)

---

## Section 1 — Fixed Navbar

- Floating pill-shaped bar, `fixed`, inset from edges (`top-4`, side margins on larger screens), rounded-2xl, translucent/blurred background, height ~64px.
- Left: logo image in a small rounded square.
- Center/right (desktop ≥768px): nav links — Events, Download, Story, Team, About, Contact — uppercase, small tracking-wide, `text-white/70` hover to `text-white`, underline-hover effect (`nav-hover-btn` style).
- Mobile (<768px): hamburger/menu icon centered, opens a dropdown panel below the navbar (blurred dark card, links stacked, fade+scale in via Framer Motion `AnimatePresence`).
- Right-most control: small "audio visualizer" icon — 4 vertical bars animating height in a loop (looks like an equalizer), toggles a background loop audio track on/off. Build with Framer Motion looping `animate` + `repeat: Infinity`, staggered delays per bar, respecting reduced-motion (freeze bars if set).

---

## Section 2 — Hero

- Full viewport height (`h-dvh`), background: dark radial/gradient (deep violet-to-black), overflow hidden.
- **Moving background effect**: a Three.js canvas behind the text — soft ambient particles or a subtly rotating/drifting abstract shape, reacting gently to mouse position (parallax). Keep it lightweight — low particle count, no heavy postprocessing. This is the ONLY Three.js usage on the page.
- Centered content:
  - H1, two lines, bold uppercase, tight leading: "No plans for the night?" — animate in with Framer Motion (fade + rise, staggered per line) on mount.
  - Second H1 below: "Perfect!" rendered with the `--color-gradient-hero` gradient as `background-clip: text` / `text-transparent` (Tailwind `bg-clip-text text-transparent` + a gradient utility class mapped to the token). The `!` gets its own accent color pop (e.g. `--color-highlight`).
  - CTA pill button below, gap ~56px: gradient background (violet→pink), uppercase tracked label "get the app", small down-arrow that nudges down on hover (Framer Motion `whileHover`), shadow-glow on hover (`shadow-lg` intensifying).
- Below the hero, a thin full-width dark strip with a centered pill link: "🎉 What's your party vibe? →" — subtle border, hover brightens, arrow slides right on hover.

---

## Section 3 — Events Marquee

- Full-height section, same gradient/dark background family as hero.
- Section eyebrow/heading not required if not in reference — go straight to the marquee row.
- **Infinite horizontal marquee**: a row of fixed-width (~384px) cards scrolling continuously right-to-left, seamless loop (duplicate the card array once and animate `translateX` from `0` to `-50%` in a linear, infinite Framer Motion `animate` — this guarantees a seamless loop). Speed: slow, ambient (~60–80s per full loop). Pause on hover (`onHoverStart`/`onHoverEnd` stop the animation).
- Each card is playfully offset vertically (`translateY`, alternating small random-looking offsets per card, e.g. -45px to +45px) to create a staggered, non-grid rhythm — replicate this offset pattern.
- Card anatomy: translucent glass background (`--color-card-glass`), border `--color-border-light`, rounded-xl, hover brightens border/background slightly (200ms transition):
  - Top: fixed-height image (cover-fit)
  - Body padding ~24px: title (bold, white), 2-line description (`--color-text-muted`), date row (calendar icon + date, clock icon + time), location row (pin icon + venue), full-width white pill "Join" button (`text-black`, hover `bg-white/90`)

---

## Section 4 — Download

- Full viewport height, full-bleed background using `--color-gradient-download`.
- Centered content:
  - Large animated title built word-by-word: each word is a separate `<span>`/`motion.span`, revealed with a staggered entrance (fade + slight y-offset, `whileInView`, stagger ~60–100ms per word) — mirrors the reference's `animated-word` pattern. Text: "Believe Honey- its all free.."
  - Two stacked pill buttons below (white bg, black text, rounded-full, shadow): "Download for Android" (Android icon) and "Download for iOS" (Apple icon) — both link out (`target="_blank"`), hover: `bg-gray-100` + subtle lift.
  - Small uppercase caption beneath: "You will probably see honey on the app..."

---

## Section 5 — About

- Light section (background shifts to a light token if the reference does — confirm against screenshot; if kept dark, use `--color-background`).
- Eyebrow text centered: "Welcome Extroverts" (`--color-text-secondary`, small uppercase).
- Animated word-by-word title (same pattern as Section 4): "discover the nightlife, brunches, and hangouts of your city".
- **Scroll-pinned image reveal**: a large rounded image that scales/reveals as the user scrolls through this section — replicate the reference's pin+mask behavior using Framer Motion's `useScroll` (scoped to this section via a `ref` + `target`) driving a `useTransform` on `scale`/`clipPath`/`borderRadius`. The image should start smaller/masked and expand to fuller size as the section scrolls through view, then release (unpin) at the end. This does not need literal CSS `position: sticky` pinning identical to the original GSAP pin-spacer — an approximate scroll-linked scale/reveal that reads the same way visually is the goal.

---

## Section 6 — Feature Bento Grid

- Dark section (`--color-background`), small kicker text top-left + muted subtext (e.g. "Start partying with strangers" / "Turn Any Night Into a Party...").
- **Top wide card**: full-width video background (`autoPlay loop muted playsInline`), rounded-md, min-height ~65vh on desktop / ~384px mobile. Overlaid content (bottom-anchored, flex `justify-between`):
  - Top-left: bold title ("Before hours") + short description
  - Bottom-left: small pill badge "check Live" with a clock icon — badge has a **cursor-follow spotlight glow**: on mouse move over the badge, a radial gradient glow tracks the cursor position inside it (implement via `onMouseMove` updating CSS custom properties `--x`/`--y` consumed by a radial-gradient background, or a Framer Motion-animated glow div positioned at cursor offset).
- **Below, a 3-cell grid** (2x2-ish, responsive): three more video-background cards (same title/description/"check Live" badge pattern — "After party", "FREEEEEEEEEEEEEEEEEEEEE") plus one solid-color card (`--color-bento-violet` background, dark text): headline "Stop scrolling. Start partying." with a large decorative icon bottom-right.
- All bento cards: subtle hover scale/tilt (Framer Motion `whileHover={{ scale: 1.01 }}`, quick 150ms), respecting the "no continuous animation except intentional loops" motion rule from `ui-rules.md`.

---

## Section 7 — Story

- Dark section, full viewport-ish height.
- Eyebrow: "An app for extroverts".
- Large word-by-word animated title with `mix-blend-mode: difference` applied to the text layer, layered in front of/behind an image (matches the reference's `mix-blend-difference` trick): "Strangers today friends tomorrow".
- Below/behind the title: a large masked image (`entrance.png`-style) — apply an SVG goo/blur filter for a soft organic mask edge if reasonably achievable with an inline `<svg><filter>` (feGaussianBlur + feColorMatrix + feComposite), matching the reference's `flt_tag` filter. If this is too costly for the time budget, a simple `clip-path`/rounded-mask fallback is acceptable — note the simplification in `progress-tracker.md`.
- Side text block: "You know no one here. And that's the best part." + a pill CTA button with the **sliding-text hover effect**: two stacked text layers, default state shows the top layer, on hover the top slides/skews up out of view while an identical bottom layer slides in from below (`overflow-hidden` wrapper, two `motion.div`s translating on `y` with a skew, `group-hover` driven).

---

## Section 8 — Contact / Final CTA

- Rounded dark card (`--color-surface` / near-black), generous vertical padding, centered content, `overflow-hidden`.
- Decorative neon glow images positioned absolutely in the corners (left and right), partially cropped off-canvas, hidden on small screens (`hidden sm:block`).
- Eyebrow: "Join Extroverts".
- Word-by-word animated title: "We are already partying."
- Pill CTA button (same sliding-text hover pattern as Section 7): "Contact us".

---

## Section 9 — Footer

- Simple dark bar: copyright text left (`text-white/40`), link row right (Privacy Policy, Terms & Conditions, Contact) — small, `text-white/60` hover `text-white`, stacked/centered on mobile, row on desktop (`flex-col md:flex-row`).

---

## Motion System Recap (apply consistently across all sections)

| Pattern | Implementation |
|---|---|
| Word-by-word title reveal | Split text into words, wrap each in `motion.span`, `whileInView` + `staggerChildren` on parent, fade+y-offset per word |
| Marquee | `motion.div` with duplicated content, `animate={{ x: ["0%", "-50%"] }}`, `transition={{ repeat: Infinity, ease: "linear", duration: N }}`, pause on hover |
| Scroll-linked scale/reveal | `useScroll({ target: sectionRef })` → `useTransform` → drive `scale`/`clipPath` |
| Sliding-text button hover | Two absolutely stacked text layers in an `overflow-hidden` wrapper, `group-hover:-translate-y-full` style swap via Framer Motion variants |
| Cursor-follow glow | Track `onMouseMove` offset within element, apply as CSS var to a radial-gradient overlay |
| Equalizer bars (navbar) | Looping `animate` on `scaleY` per bar, staggered `delay` |
| Hero ambient background | Three.js, lazy-loaded, low-poly ambient particles/shape, gentle mouse parallax |

All entrance/scroll animations use `viewport={{ once: true, margin: "-100px" }}` on `whileInView` so they trigger once, not on every scroll pass, for performance.

---

## Performance Checklist (must pass before this milestone is marked done in `progress-tracker.md`)

- [ ] Three.js chunk lazy-loaded and only present on this route
- [ ] All videos `muted playsInline` with `preload="metadata"`, lazy-mounted (only load when scrolled near)
- [ ] Marquee uses transform-based animation only (no layout thrashing), GPU-accelerated
- [ ] No layout shift on any word-reveal or image-reveal animation
- [ ] 60fps on marquee + hero background on a mid-range device (test with browser perf profiler)
- [ ] `prefers-reduced-motion` disables/simplifies: marquee (static row instead), word-stagger (instant fade), hero parallax (static render), equalizer bars (static)
- [ ] Lighthouse performance score check post-build

---

## Deliverable

A fully responsive (`375px` → `1440px+`) `/home` page composed of the 9 sections above, built as separate components under `src/components/home/`, wired into `HomePage.tsx`, following every existing token/animation/file-size rule in `AGENTS.md` and `ui-rules.md`. Update `progress-tracker.md` when complete, noting any deliberate simplifications (e.g. SVG goo filter fallback) and why.
