# Build Plan

## Core Principle

Build outward from the wizard's core mechanics: state + validation first, then styling/animation polish, then the surrounding pages (landing, terms, success), then final responsiveness/accessibility pass.

---

## Milestone 01 — Project Setup
- Vite + React + TypeScript scaffold
- Tailwind v4 configured via `@theme` in `src/index.css` (no `tailwind.config.ts` for tokens)
- React Router base routes (`/`, `/signup`, `/terms`, `/success`, `/home`, 404)
- ESLint + Prettier + strict `tsconfig`
- `components/ui` primitives: Button, Input, Checkbox, Spinner, Skeleton, Toast, Modal

## Milestone 02 — Wizard Foundation
- `WizardProvider` + reducer (step index, field state, status flags)
- `useWizard` hook
- Zod schemas for all 7 steps
- `lib/mock-api.ts` with latency + failure injection
- Wizard shell component with `AnimatePresence` step transitions and progress indicator

## Milestone 03 — Step 0: Email
- Email input, real-time format validation
- Optional newsletter checkbox
- Next button → calls `sendOtp()`, loading state, error toast on failure

## Milestone 04 — Step 0.5: OTP
- 6-digit segmented input (auto-advance, backspace-back, paste-fill)
- "A 6 digit OTP has been sent to your email" helper text
- Resend link with 30s cooldown timer
- Verify button (loading state) + Go Back button
- Inline error for invalid/expired OTP
- **Improvement over source app**: clear visual feedback per digit box (default/filled/error states), accessible labeling, resend countdown visible
- Dev-convenience: on successful `sendOtp()` (and each `resend`), show a toast displaying the generated mock OTP code (e.g., "Demo OTP: 482913 — tap to copy"), so it can be used directly during testing/recording without guessing

## Milestone 05 — Step 1: Username
- Min 6 chars, alphanumeric + underscore, real-time validation
- Async "check availability" simulated call with debounce
- Next / Back

## Milestone 06 — Step 2: Name
- Required text field, real-time validation
- Next / Back

## Milestone 07 — Step 3: Age (DOB)
- Custom calendar/date picker (day/month/year)
- Auto-computes and displays current age
- **18+ enforcement**: inline error, Next disabled if underage — explicit improvement over source app
- Next / Back

## Milestone 08 — Step 4: Pronouns
- Custom dropdown of pronoun/gender options
- Selecting auto-fills the field
- Next / Back

## Milestone 09 — Step 5: Review & Submit
- Terms & Conditions text block + "View full terms" link to `/terms`
- Required acceptance checkbox (Signup button disabled until checked)
- Signup button (loading state) → `submitSignup()`
- Error toast + retry (data preserved) on simulated failure
- Back button

## Milestone 10 — Success & Redirect
- Success animation/confirmation screen
- Auto-redirect to `/home` mock dashboard after short delay

## Milestone 11 — Landing Page
 - follow the context\home-page.md file to desing it
- follow the context\profile-page.md to design the page

## Milestone 12 — Terms & Conditions Page
- Standalone `/terms` route, styled consistently with wizard

## Milestone 13 — Polish & Responsiveness Pass
- Verify every step at 375px / 768px / 1440px
- Full keyboard navigation pass
- Screen reader labeling pass
- `prefers-reduced-motion` handling
- Skeleton/loading state audit across all async actions
- Remove all console logs, verify zero TS/ESLint errors

## Milestone 14 — Demo Readiness
- Walk full happy path + every failure path once end-to-end
- Confirm all edge cases from the brief are demonstrable on camera (underage block, invalid OTP, duplicate-submit prevention, back-navigation data retention, whitespace rejection)
