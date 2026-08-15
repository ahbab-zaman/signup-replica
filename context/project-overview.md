# Project Overview

## About the Project

This is a **frontend engineering assessment**: a pixel- and behavior-faithful web replica of a mobile app's signup wizard, plus its landing page mechanism and terms & conditions page. Front-end only — no real backend, database, or authentication; all async behavior is realistically simulated.

The deliverable is judged on: visual parity, validation/error-handling correctness, state management robustness across steps, loading/success/failure UX, and deliberate, well-reasoned improvements over the source app's known weak points.

## Pages

```text
/          → Landing page (hero, Three.js background, signup CTA + confirm modal, login stub)
/terms     → Standalone Terms & Conditions page
/signup    → Signup wizard (single route, 7 internal steps)
/success   → Post-signup confirmation, auto-redirects
/home      → Mock dashboard (redirect target only, minimal placeholder)
```

## Core User Flow

1. Land on the site → click "Sign Up"
2. Confirm modal: "Create Account" or "Maybe Later"
3. **Step 0 — Email**: enter email, optional newsletter opt-in
4. **Step 0.5 — OTP**: 6-digit code sent to email (simulated), verify or resend
5. **Step 1 — Username**: min 6 characters, "fits your vibe"
6. **Step 2 — Name**
7. **Step 3 — Age**: pick DOB via calendar, age auto-computed, must be 18+
8. **Step 4 — Pronouns**: select from dropdown, auto-fills field
9. **Step 5 — Review**: accept Terms & Conditions, click Signup
10. Success screen → auto-redirect to mock dashboard

Every step supports Back navigation without data loss. Every async action (OTP send/verify, signup submit) has loading, success, and failure states.

## Authentication Model (this project)

- **No password field** — matches the real reference app, which uses email + OTP as its sole verification mechanism. This was a deliberate fidelity decision (see `progress-tracker.md` Decisions Log).
- "Log in" exists on the landing page as a stub/secondary entry point only — it is not part of the graded scope and does not need full validation logic.

## Features In Scope
- Landing page with signup confirm modal
- Terms & Conditions page
- 7-step signup wizard with full validation
- OTP verification (redesigned UX)
- 18+ age enforcement (explicit improvement over source app)
- Toast/global + inline/field-level error handling
- Loading states on every async action, with duplicate-submit prevention
- Success state + redirect to a mock dashboard
- Fully responsive (mobile/tablet/desktop)
- Landing page Three.js ambient hero visual

## Explicitly Out of Scope
- Real backend, database, or auth provider
- Full login flow with its own validation suite
- Any page beyond the 5 listed above
- Payment, billing, or account settings

---

# Engineering Goals

## Accessibility
- WCAG AA contrast, full keyboard navigation, visible focus states, proper labels on every input, `aria-live` error announcements, `prefers-reduced-motion` support.

## Performance
- Route-level code splitting, lazy-loaded Three.js hero, memoized wizard context, no unnecessary re-renders, 60fps step transitions.

## Reliability
- Every simulated async call has a realistic failure rate; every failure path preserves entered data and offers a clear retry.

## Developer Experience
- Strict TypeScript, no `any`, single-responsibility files, consistent naming, documentation kept in sync with implementation (`progress-tracker.md` updated per milestone).

## Production Readiness Checklist (for this scope)
- [ ] All pages fully responsive (375px–1440px+)
- [ ] Accessibility requirements met
- [ ] Every async action has loading/error/success states
- [ ] No TypeScript or ESLint errors
- [ ] No placeholder/lorem-ipsum content in final demo paths
- [ ] No console errors/warnings
- [ ] Documentation reflects final implementation
