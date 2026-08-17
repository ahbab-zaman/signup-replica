# 🚀 Project Progress Tracker

> **Purpose:** Track implementation progress against `build-plan.md`.
>
> **Rule:** Update this file after completing each milestone. Keep entries short, factual, and actionable.

---

## 📊 Overall Progress

**Completed:** `11 / 14` milestones
**In Progress:** `0`
**Blocked:** `0`
**Progress:** `79%`

`███████████████░░░░░` **79%**

### Status Legend

| Status | Meaning |
|---|---|
| ⬜ **Not Started** | Work has not started |
| 🟡 **In Progress** | Currently being implemented |
| 🟢 **Complete** | Milestone is finished and verified |
| 🔴 **Blocked** | Waiting on a dependency or decision |

---

# 🧭 Milestones

| # | Milestone | Status | Notes |
|---|---|---|---|
| 01 | **Project Setup** | 🟢 Complete | Vite + TS + Tailwind v4 + Router scaffold, UI primitives |
| 02 | **Wizard Foundation** | 🟢 Complete | Context, reducer, Zod schemas, mock-api |
| 03 | **Step 0 — Email** | 🟢 Complete | RHF + Zod, sendOtp + demo OTP toast, failure toast, newsletter opt-in |
| 04 | **Step 0.5 — OTP** | 🟢 Complete | Segmented input, digit-box states, resend cooldown, demo OTP toast with copy |
| 05 | **Step 1 — Username** | 🟢 Complete | RHF validation, debounced availability check, taken-state |
| 06 | **Step 2 — Name** | 🟢 Complete | RHF validation, trimmed save, inline error |
| 07 | **Step 3 — Age (DOB)** | 🟢 Complete | Month/day/year selects, live age, 18+ enforcement with inline error |
| 08 | **Step 4 — Pronouns** | 🟢 Complete | Custom combobox dropdown, auto-fill on select, custom input allowed |
| 09 | **Step 5 — Review & Submit** | 🟢 Complete | T&C acceptance only, no data recap, submit with loading/error toast/retry |
| 10 | **Success & Redirect** | 🟢 Complete | Animated confirmation screen, personalizes username, auto-redirect to /home after 3s + manual button |
| 11 | **Landing Page & Profile** | 🟢 Complete | 9-section `/home` (Three.js hero, marquee, bento, story) + `/profile` banner page |
| 12 | **Terms & Conditions Page** | ⬜ Not Started | |
| 13 | **Polish & Responsiveness Pass** | ⬜ Not Started | |

| 14 | **Demo Readiness** | ⬜ Not Started | Final walkthrough of all required edge cases |

---

# 🎯 Current Focus

> Update this section whenever you start working on a new milestone.

**Current Milestone:** `12 — Terms & Conditions Page`

**Status:** ⬜ Not Started

### Current Tasks

- [x] Initialize Vite + TypeScript
- [x] Configure Tailwind CSS v4
- [x] Configure React Router
- [x] Add UI primitives
- [x] Establish project structure
- [x] Verify development server
- [x] Verify production build
- [x] Wizard context created
- [x] Reducer implemented
- [x] Wizard state defined
- [x] Zod schemas created
- [x] Mock API created
- [x] Step navigation implemented
- [x] Back navigation preserves state
- [x] Email step implemented (RHF + Zod, sendOtp, loading, toasts, newsletter, focus)
- [x] OTP step implemented (segmented input, digit-box states, resend cooldown, demo OTP toast with copy)
- [x] Username step implemented (RHF + Zod, debounced availability check, spinner/check states, taken error)
- [x] Name step implemented (RHF + Zod, inline error, trimmed save)
- [x] Age step implemented (month/day/year selects, live age display, 18+ enforcement with inline error)
- [x] Pronouns step implemented (custom combobox, auto-fill on select, custom input)
- [x] Review step implemented (T&C block + full-terms link, acceptance checkbox, submit with loading/error toast/retry, navigates to /success)
- [x] Success & redirect implemented (animated confirmation, username greeting, auto-redirect to /home + manual button)
- [x] `/home` landing page implemented (9 sections: fixed navbar w/ equalizer, Three.js hero, events marquee, download, about scroll-reveal, feature bento w/ spotlight badge, story w/ goo-filter blend, contact CTA, footer)
- [x] `/profile` page implemented (teal banner w/ initials-glyph hero art, identity block, stats, bio, actions)

### Next

> Build the Terms & Conditions page (Milestone 12) — standalone `/terms` route styled consistently with the wizard.

---

# 📝 Milestone Checklist

## 01 — Project Setup

- [x] Vite + TypeScript initialized
- [x] Tailwind CSS v4 configured
- [x] React Router configured
- [x] UI primitives created
- [x] Project structure established
- [x] Development server verified
- [x] Production build verified

---

## 02 — Wizard Foundation

- [x] Wizard context created
- [x] Reducer implemented
- [x] Wizard state defined
- [x] Zod schemas created
- [x] Mock API created
- [x] Step navigation implemented
- [x] Back navigation preserves state

---

## 03 — Step 0 — Email

- [x] Email input implemented
- [x] Email validation implemented
- [x] Invalid email state handled
- [x] Loading state handled
- [x] Continue action implemented
- [x] Transition to OTP verified

---

## 04 — Step 0.5 — OTP

- [x] OTP input implemented
- [x] Digit-box states implemented
- [x] OTP validation implemented
- [x] Invalid OTP state handled
- [x] Resend cooldown implemented
- [x] Resend action implemented
- [x] Loading state handled
- [x] Back navigation verified

---

## 05 — Step 1 — Username

- [x] Username input implemented
- [x] Validation implemented
- [x] Invalid state handled
- [x] Continue action implemented
- [x] Back navigation verified

---

## 06 — Step 2 — Name

- [x] Name input implemented
- [x] Validation implemented
- [x] Invalid state handled
- [x] Continue action implemented
- [x] Back navigation verified

---

## 07 — Step 3 — Age (DOB)

- [x] DOB input implemented
- [x] Date validation implemented
- [x] Age calculation implemented
- [x] 18+ enforcement implemented
- [x] Under-18 state handled
- [x] Continue action implemented
- [x] Back navigation verified

---

## 08 — Step 4 — Pronouns

- [x] Pronoun options implemented
- [x] Selection state implemented
- [x] Validation implemented
- [x] Continue action implemented
- [x] Back navigation verified

---

## 09 — Step 5 — Review & Submit

- [x] T&C text implemented
- [x] T&C checkbox implemented
- [x] Checkbox validation implemented
- [x] Submit loading state implemented
- [x] Submit action implemented
- [x] No data recap shown
- [x] Back navigation verified

---

## 10 — Success & Redirect

- [x] Success state implemented
- [x] Success animation implemented
- [x] Redirect behavior implemented
- [x] Redirect destination verified
- [x] Refresh behavior verified

---

## 11 — Landing Page and profile page

- [x] `/home` route built with 9 sections (navbar, hero, marquee, download, about, bento, story, contact, footer)
- [x] Three.js hero (lazy-loaded, particles + mouse parallax, reduced-motion static)
- [x] Infinite events marquee (seamless loop, pause on hover, reduced-motion static)
- [x] Word-by-word animated titles (download, about, story, contact)
- [x] Scroll-linked about image reveal (useScroll → scale/borderRadius)
- [x] Feature bento grid (spotlight cursor-follow badge, hover scale)
- [x] Story section (mix-blend-difference title over goo-filtered panel)
- [x] Sliding-text CTA buttons
- [x] Floating pill navbar + mobile menu + equalizer icon
- [x] `/profile` route: ProfileBanner (teal gradient, initials-glyph art, identity block, edit action, pager dot)
- [x] Profile stats / bio / actions body (mocked data)
- [x] Responsive layout verified at 375 / 768 / 1440
- [x] Tests: HomePage + ProfilePage render suites (77 passing)
- [x] Typecheck, lint, production build all passing

**Simplifications (no source assets available):** bento "video" cards and marquee event thumbnails use token-gradients + lucide icons instead of real video/photo assets; the about image reveal uses a gradient panel; the story masked image uses an SVG goo filter over a gradient panel. Navbar equalizer toggles a visual-only state (no audio track asset). Banner carousel deferred — single static pager dot.

---

## 12 — Terms & Conditions Page

- [ ] Page structure implemented
- [ ] Terms content added
- [ ] Typography styled
- [ ] Navigation implemented
- [ ] Responsive layout verified

---

## 13 — Polish & Responsiveness Pass

- [ ] Desktop layout polished
- [ ] Tablet layout verified
- [ ] Mobile layout verified
- [ ] Typography reviewed
- [ ] Spacing reviewed
- [ ] Colors reviewed
- [ ] Buttons reviewed
- [ ] Form states reviewed
- [ ] Animations polished
- [ ] Transitions polished
- [ ] Accessibility reviewed
- [ ] Console errors resolved

---

## 14 — Demo Readiness

- [ ] Full signup flow tested
- [ ] Email validation tested
- [ ] OTP validation tested
- [ ] OTP resend tested
- [ ] Username validation tested
- [ ] Name validation tested
- [ ] 18+ validation tested
- [ ] Pronoun selection tested
- [ ] T&C validation tested
- [ ] Back navigation tested
- [ ] Refresh behavior tested
- [ ] Success flow tested
- [ ] Redirect tested
- [ ] Landing page tested
- [ ] Terms page tested
- [ ] Mobile flow tested
- [ ] Desktop flow tested
- [ ] Production build verified
- [ ] Final walkthrough completed

---

# 🧠 Decisions Log

| Date | Decision | Reason |
|---|---|---|
| — | No password field in signup flow | Matches actual reference app behavior (email + OTP only); adding one would break visual/functional parity, which is the primary grading criterion |
| — | Final review step shows T&C + checkbox only, no data recap | Per product decision — keep review step lightweight |
| — | Framer Motion handles all animation, GSAP dropped | Avoids overlapping libraries solving the same concern per `library-docs.md` rules |
| — | Three.js scoped to landing hero only | Keeps wizard bundle light; 3D is an ambient brand touch, not core UX |
| — | Wizard uses one route with internal step state, not per-step routes | Enables smooth Framer Motion transitions and guarantees no data loss on Back |
| — | 18+ age validation added as explicit improvement | Called out in the assessment brief as a known gap in the reference app |
| — | OTP screen redesigned (digit-box states, visible resend cooldown) | Called out in the assessment brief as a known UX weakness in the reference app |
| — | `@hookform/resolvers` upgraded 3.10 → 5.x | zod v4 renamed `ZodError.errors` → `issues`; resolver 3.x rejected on any invalid value (unhandled promise), breaking RHF validation. v5 supports zod v4 |

---

# 🐛 Known Gaps / Open Items

> Populate this section as work proceeds.

- [ ] No known gaps yet

---

# ⚠️ Blockers

> Only add actual blockers here.

- None

---

# ✅ Completed Work

> Add short factual notes when milestones are completed.

### Milestone 01 — Project Setup

- [x] Completed
- **Completed on:** 2026-08-16
- **Notes:** Vite + React 18 + TS scaffold, Tailwind v4 via `@theme` tokens in `src/index.css`, React Router v6 routes (`/`, `/signup`, `/terms`, `/success`, `/home`, `*`), ESLint + Prettier + strict tsconfig, UI primitives (Button, Input, Checkbox, Spinner, Skeleton, Toast, Modal). Dev server, production build, typecheck, and lint all verified passing. Toast context/hook split into `toast-context.ts` + `useToast.ts` to satisfy fast-refresh lint rule.

### Milestone 02 — Wizard Foundation

- [x] Completed
- **Completed on:** 2026-08-16
- **Notes:** `WizardProvider` + reducer (step index, direction, field state, otpVerified, status) with `useWizard` hook. Zod schemas for all 7 steps + composed `signupSchema` master. `lib/mock-api.ts` with `sendOtp`/`verifyOtp`/`checkUsernameAvailable`/`submitSignup`, 600–1400ms latency, failure injection, plus `MockApiError` (`NETWORK_ERROR`/`INVALID_OTP`/`OTP_EXPIRED`). Wizard shell with `AnimatePresence` direction-aware transitions + segmented progress bar; 7 placeholder step components; `SignupPage` mounts provider. Unit tests: validators, reducer, mock-api error paths (25 passing). Typecheck, lint, build all passing.

### Milestone 03 — Step 0: Email

- [x] Completed
- **Completed on:** 2026-08-16
- **Notes:** `EmailStep` built with React Hook Form + `zodResolver` (mode `onTouched` for real-time validation): email input with icon + inline error, optional newsletter checkbox, heading auto-focus on mount, Back hidden on first step. Continue persists fields via `SAVE_FIELD`, calls `sendOtp()` with spinner/disabled state, shows "Demo OTP: XXXXXX" info toast on success then advances to OTP, or an error toast on failure with data preserved. Discovered and fixed zod v4 incompatibility in `@hookform/resolvers` 3.x (upgraded to 5.9). EmailStep tests added (render, inline validation, happy path, failure path). 29 tests passing; lint, typecheck, build all passing.

### Milestone 04 — Step 0.5: OTP

- [x] Completed
- **Completed on:** 2026-08-18
- **Notes:** `OtpStep` built with 6 segmented digit boxes (auto-advance, backspace-back, arrow-key nav, paste-fill, select-on-focus), per-box states (default/filled/error borders), and accessible per-digit `aria-label`s. Verify button disabled until complete, spinner while verifying, inline error for `INVALID_OTP`/`OTP_EXPIRED` via `MockApiError`, error toast for network failures. Resend link with live 30s cooldown countdown; on resend, digits reset and a new demo-OTP toast is shown. Demo OTP toasts now include a tap-to-copy button (Toast/ToastItem gained optional `onClick`). OtpStep tests added (8: render, digit collection, happy path, invalid, expired, back nav, paste-fill, resend with fake timers). 37 tests passing; lint, typecheck, build all passing.

### Milestone 05 — Step 1: Username

- [x] Completed
- **Completed on:** 2026-08-18
- **Notes:** `UsernameStep` built with RHF + zodResolver (mode `onChange`): real-time format validation (min 6, alphanumeric + underscore), async availability check debounced 500ms via `checkUsernameAvailable`, with per-state UI — spinner in input while checking, green check + "Username available" hint when free, red X + "That username is taken" error when taken (Continue disabled). Continue saves trimmed username via `SAVE_FIELD` then advances; Back preserved. Added `USERNAME_CHECK_DEBOUNCE_MS` constant. UsernameStep tests added (7: render, short error, invalid chars, available, taken, save+advance, back). 44 tests passing; lint, typecheck, build all passing.

### Milestone 06 — Step 2: Name

- [x] Completed
- **Completed on:** 2026-08-18
- **Notes:** `NameStep` built with RHF + zodResolver (mode `onTouched`): required text field with icon + inline error, `maxLength` guard, heading auto-focus on mount, Back preserved. Continue saves trimmed name via `SAVE_FIELD` then advances. NameStep tests added (5: render, whitespace error, enable-on-valid, trimmed save + advance, back). 49 tests passing; lint, typecheck, build all passing.

### Milestone 07 — Step 3: Age (DOB)

- [x] Completed
- **Completed on:** 2026-08-18
- **Notes:** Added reusable `Select` UI primitive (native select, themed, chevron, label/error/hint). `AgeStep` built with Month/Day/Year selects (year range = current to 100 back, day count adapts to month/year, day auto-reset when a shorter month is chosen so invalid dates can't be picked). Field synced to `ageSchema`'s `dateOfBirth` (ISO) via `useController` + `trigger`. Live age display ("You are X years old"); 18+ enforcement with inline error and Continue disabled for underage — explicit improvement over the source app. Continue saves ISO date via `SAVE_FIELD`, Back preserved. AgeStep tests added (5: render, 18+ computes age + enables, under-18 error + disabled, save + advance, back). 54 tests passing; lint, typecheck, build all passing.

### Milestone 08 — Step 4: Pronouns

- [x] Completed
- **Completed on:** 2026-08-18
- **Notes:** Added reusable `Combobox` UI primitive (custom dropdown): text input with filterable listbox, click-to-select auto-fills the field, keyboard nav (arrows/enter/escape), outside-click + Escape to close, accessible roles (`combobox`/`listbox`/`option`, `aria-expanded`/`aria-activedescendant`), check mark on the selected option. `PronounsStep` uses it with 7 pronoun options plus free-text custom entry, RHF + zodResolver validation via `useController`, Continue disabled until non-empty, trims on save, Back preserved. PronounsStep tests added (5: render, select-from-list, custom type + save/advance, whitespace error, back). 59 tests passing; lint, typecheck, build all passing.

### Milestone 09 — Step 5: Review & Submit

- [x] Completed
- **Completed on:** 2026-08-18
- **Notes:** `ReviewStep` builds the whole signup payload and calls `submitSignup()`. T&C summary block with "View full terms →" link to `/terms`; acceptance `Checkbox` (RHF `onChange` mode + watch-gated `Sign up` button so it's disabled until checked); submit sets `SET_STATUS` submitting/success, navigates to `/success` on success, and on failure shows an error toast, resets status to idle, and keeps all data for retry (checkbox stays checked, button re-enabled). No data recap shown (per decision log). `SET_STATUS` now wired end-to-end. ReviewStep tests added (5: render, check-enables-submit, submit+navigate with payload assertion, failure toast+retry+data preserved, back). 64 tests passing; lint, typecheck, build all passing.

### Milestone 10 — Success & Redirect

- [x] Completed
- **Completed on:** 2026-08-18
- **Notes:** `SuccessPage` is a Framer Motion confirmation screen (spring check-circle animation, fade-up content, wrapped in `MotionConfig reducedMotion="user"`). Greets the user by username passed via router state from `ReviewStep` (`navigate("/success", { state: { username } })`). Auto-redirects to `/home` (replace) after `SUCCESS_REDIRECT_MS` (3s) with a visible live countdown ("Redirecting in 3s…", `aria-live="polite"`); a "Go to dashboard" button redirects immediately (also covers reduced-motion/no-JS-timer users). Timer effect cleans up on unmount so refresh is safe. SuccessPage tests added (4: render+username, auto-redirect via fake timers, countdown decrement, button redirect). 68 tests passing; lint, typecheck, build all passing.

### Milestone 11 — Landing Page & Profile

- [x] Completed
- **Completed on:** 2026-08-18
- **Notes:** Built `/home` (9 sections in `src/components/home/`) + `/profile` (`src/components/profile/`). Added `three@0.169` + `@react-three/fiber@8.18` (React 18-compatible), lazy-loaded `HeroCanvas` chunk (only on this route). New tokens: gradient stops (`--color-grad-hero-*`, `--color-grad-dl-*`), `--color-bento-violet`, profile banner palette, `--font-size-banner-glyph`. Motion via Framer Motion only — marquee uses `useAnimationFrame`+`useMotionValue` (seamless loop, true hover-pause), word reveals via `whileInView` stagger, scroll-linked reveal via `useScroll`/`useTransform`, sliding-text CTAs via Tailwind group-hover transforms, cursor-follow glow via CSS-vars radial gradient. `prefers-reduced-motion` handled via `MotionConfig reducedMotion="user"` + `useReducedMotion` in marquee/equalizer/hero. Deliberate simplifications (no real video/photo assets): gradient+icon event thumbs, gradient bento/video panels, goo-filter over gradient for story image, visual-only equalizer toggle, static pager dot. Added vitest global jsdom setup (`src/test/setup.ts` mocks IntersectionObserver + matchMedia). 77 tests passing; typecheck, lint, build all passing.

---

# 🧪 Verification Checklist

Use this before changing a milestone to `🟢 Complete`.

### Functional

- [ ] Feature works as expected
- [ ] Validation works
- [ ] Loading states work
- [ ] Error states work
- [ ] Success states work
- [ ] Back navigation works
- [ ] Next navigation works

### UI / UX

- [ ] Desktop layout verified
- [ ] Tablet layout verified
- [ ] Mobile layout verified
- [ ] Animations verified
- [ ] Transitions verified
- [ ] Spacing reviewed
- [ ] Typography reviewed
- [ ] Interactive states reviewed

### Technical

- [ ] No console errors
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Production build passes
- [ ] No unnecessary dependencies
- [ ] No obvious performance issues

---

# 📅 Update Log

> Add one short entry whenever meaningful progress is made.

| Date | Milestone | Status | Change |
|---|---|---|---|
| 2026-08-16 | Project Tracker | 🟢 Complete | Progress tracker created |
| 2026-08-16 | 01 — Project Setup | 🟢 Complete | Scaffold, Tailwind v4, Router, UI primitives; lint/typecheck/build passing |
| 2026-08-16 | 02 — Wizard Foundation | 🟢 Complete | Wizard context/reducer, Zod schemas, mock-api, shell with transitions + progress; 25 tests passing |
| 2026-08-16 | 03 — Step 0 — Email | 🟢 Complete | EmailStep (RHF + Zod) with sendOtp + demo OTP toast + failure handling; resolver upgraded for zod v4; 29 tests passing |
| 2026-08-18 | 04 — Step 0.5 — OTP | 🟢 Complete | OtpStep (segmented input, digit-box states, resend cooldown, inline errors); demo OTP toast tap-to-copy; 37 tests passing |
| 2026-08-18 | 05 — Step 1 — Username | 🟢 Complete | UsernameStep (RHF validation, debounced availability check, taken state); 44 tests passing |
| 2026-08-18 | 06 — Step 2 — Name | 🟢 Complete | NameStep (RHF validation, trimmed save, inline error); 49 tests passing |
| 2026-08-18 | 07 — Step 3 — Age (DOB) | 🟢 Complete | AgeStep (month/day/year selects, live age, 18+ enforcement); Select primitive added; 54 tests passing |
| 2026-08-18 | 08 — Step 4 — Pronouns | 🟢 Complete | PronounsStep (custom combobox dropdown, auto-fill, custom input); 59 tests passing |
| 2026-08-18 | 09 — Step 5 — Review & Submit | 🟢 Complete | ReviewStep (T&C + acceptance checkbox, submitSignup with loading/error toast/retry, navigates to /success); 64 tests passing |
| 2026-08-18 | 10 — Success & Redirect | 🟢 Complete | SuccessPage (Framer Motion confirmation, username greeting, 3s auto-redirect to /home + manual button); 68 tests passing |
| 2026-08-18 | 11 — Landing Page & Profile | 🟢 Complete | 9-section /home (Three.js lazy hero, events marquee, download, about reveal, bento, story, contact, footer) + /profile banner page; three/fiber added; 77 tests passing |

---

# 🔄 How to Update

## Starting a Milestone

Change the milestone status:

```md
| 01 | **Project Setup** | 🟡 In Progress | ... |
