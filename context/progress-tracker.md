# 🚀 Project Progress Tracker

> **Purpose:** Track implementation progress against `build-plan.md`.
>
> **Rule:** Update this file after completing each milestone. Keep entries short, factual, and actionable.

---

## 📊 Overall Progress

**Completed:** `8 / 14` milestones
**In Progress:** `0`
**Blocked:** `0`
**Progress:** `57%`

`███████████░░░░░░░░░` **57%**

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
| 09 | **Step 5 — Review & Submit** | ⬜ Not Started | T&C acceptance only, no data recap |
| 10 | **Success & Redirect** | ⬜ Not Started | |
| 11 | **Landing Page** | ⬜ Not Started | Three.js hero, signup confirm modal |
| 12 | **Terms & Conditions Page** | ⬜ Not Started | |
| 13 | **Polish & Responsiveness Pass** | ⬜ Not Started | |

| 14 | **Demo Readiness** | ⬜ Not Started | Final walkthrough of all required edge cases |

---

# 🎯 Current Focus

> Update this section whenever you start working on a new milestone.

**Current Milestone:** `09 — Step 5 — Review & Submit`

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

### Next

> Build Step 5 — Review & Submit: T&C text + "View full terms" link, required acceptance checkbox, Signup with loading + error toast/retry, Back.

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

- [ ] T&C text implemented
- [ ] T&C checkbox implemented
- [ ] Checkbox validation implemented
- [ ] Submit loading state implemented
- [ ] Submit action implemented
- [ ] No data recap shown
- [ ] Back navigation verified

---

## 10 — Success & Redirect

- [ ] Success state implemented
- [ ] Success animation implemented
- [ ] Redirect behavior implemented
- [ ] Redirect destination verified
- [ ] Refresh behavior verified

---

## 11 — Landing Page

- [ ] Landing page structure implemented
- [ ] Hero section implemented
- [ ] Three.js hero implemented
- [ ] Signup CTA implemented
- [ ] Signup confirmation modal implemented
- [ ] Modal interactions verified
- [ ] Navigation verified
- [ ] Responsive layout verified

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

---

# 🔄 How to Update

## Starting a Milestone

Change the milestone status:

```md
| 01 | **Project Setup** | 🟡 In Progress | ... |
