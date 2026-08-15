# AGENTS.md — Signup Wizard Replica

## 1. Project Goal

This is a **frontend engineering assessment project**: a high-fidelity, fully functional replica of a mobile app's signup flow (Nubpack-style), rebuilt as a responsive web application.

The grading criteria are:
- Visual parity with the reference app (typography, spacing, color, component behavior)
- Correct, robust wizard state management across 4 profile steps + email/OTP verification
- Comprehensive validation, error handling, loading states, and success feedback
- Deliberate UX improvements over the original app where it has known gaps (OTP screen quality, missing 18+ age check)
- Full responsiveness across mobile, tablet, desktop
- Front-end only — all "backend" behavior (OTP send/verify, signup submission) is simulated with realistic delays and mock success/failure branching

This is not a generic SaaS build. Every decision should be evaluated against: **"Does this make the signup wizard more correct, more polished, or more demo-able?"**

---

## 2. Tech Stack

| Concern | Choice |
|---|---|
| Framework | React 18 + Vite |
| Language | TypeScript (strict mode) |
| Routing | React Router v6 |
| Styling | Tailwind CSS v4 (`@theme` tokens only, zero raw CSS outside `index.css`) |
| Animation | Framer Motion (all animation — step transitions, modals, micro-interactions, hero effects) |
| 3D | Three.js (`@react-three/fiber` + `@react-three/drei`) — landing page hero only |
| Forms | React Hook Form + Zod |
| State (wizard) | React Context + `useReducer` |
| Icons | `lucide-react` |
| Testing | Vitest + React Testing Library |

No backend, no database, no real auth. No Next.js. No server components. This is a client-only Vite SPA.

---

## 3. Repo Structure

/
├── AGENTS.md
├── context/
│ ├── architecture.md
│ ├── build-plan.md
│ ├── code-structure.md
│ ├── library-docs.md
│ ├── progress-tracker.md
│ ├── project-overview.md
│ ├── ui-rules.md
│ └── ui-tokens.md
├── public/
├── src/
│ ├── main.tsx
│ ├── App.tsx
│ ├── index.css → ALL styling lives here (Tailwind + @theme tokens)
│ ├── pages/ → route-level components
│ ├── features/
│ │ └── signup-wizard/
│ │ ├── components/ → step components (EmailStep, OtpStep, etc.)
│ │ ├── context/ → WizardProvider, wizard reducer
│ │ ├── hooks/ → useWizard, useMockAuth
│ │ ├── validators/ → Zod schemas per step
│ │ └── types.ts
│ ├── components/
│ │ ├── ui/ → Button, Input, Checkbox, Toast, Spinner, Skeleton, Modal
│ │ └── layout/ → Navbar, PageShell
│ ├── hooks/ → generic reusable hooks
│ ├── lib/ → mock-api.ts, utils.ts, constants.ts
│ ├── data/ → mock pronoun list, mock OTP logic
│ └── types/
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json


---

## 4. Development Philosophy

1. **Build the wizard's logic before its polish.** Get state transitions, validation, and mock async behavior correct first. Visual refinement comes after the mechanics work.
2. **Simulate reality, don't fake it shallowly.** Every async action (OTP send, OTP verify, signup submit) must have a real `Promise` + `setTimeout` delay and a chance of failure, not an instant no-op. This is what the assessment is grading.
3. **Every state must be visible.** Idle, loading, error, success, empty, disabled — no async action should ever leave the UI ambiguous about what's happening.
4. **Replicate faithfully, improve deliberately.** Match the app's described mechanics. Where the brief flags a known gap (OTP UX, missing 18+ validation), implement the *better* version, and note the improvement in code comments and `progress-tracker.md`.
5. **No dead ends.** Every step must have a working Back path that preserves previously entered data.

---

## 5. Golden Rules

1. **No raw CSS anywhere except `src/index.css`.** No inline `style={}`, no `.css` files per component, no styled-components. Only Tailwind utility classes in components, only `@theme` tokens + base layer rules in `index.css`.
2. **No hardcoded colors, spacing, or font sizes.** Everything must reference a token defined in `ui-tokens.md` / `index.css`. No raw Tailwind palette classes (`bg-purple-600`, `text-gray-400`, etc.) — only project token classes.
3. **No `any` in TypeScript.** Use proper types/interfaces for every prop, wizard state field, and mock API response.
4. **One responsibility per file.** A step component renders and wires up its form. Validation logic lives in `validators/`. Mock async logic lives in `lib/mock-api.ts`. Never mix these.
5. **Every form field must be validated in real time** (on blur at minimum, on change where noted in `build-plan.md`), with an accessible, visible error message — never just a red border with no text.
6. **Every button that triggers an async action must show a loading state and be disabled while pending.** No double-submits, ever.
7. **Wizard state must never be lost on Back navigation.** Going back and forward must repopulate every field exactly as the user left it.
8. **Accessibility is not optional.** Every input has a real `<label>`, every interactive element is keyboard reachable, every error is announced (`aria-live` / `aria-describedby`), focus is managed on step transitions.
9. **Mobile is a first-class target, not an afterthought.** Every step must be verified at 375px width before being considered done.
10. **Reuse before creating.** Check `src/components/ui` before building a new Button/Input/Modal variant.

---

## 6. Build Workflow

For every new step/feature, follow this order:
1. Read `architecture.md` for where the piece fits.
2. Check `build-plan.md` for the current milestone and acceptance criteria.
3. Define/extend the Zod schema in `validators/` first.
4. Wire the wizard reducer action(s) in `features/signup-wizard/context/`.
5. Build the step component using existing `components/ui` primitives.
6. Add loading/error/success states via `lib/mock-api.ts` simulated calls.
7. Test keyboard navigation and screen reader labels.
8. Test at 375px, 768px, 1440px.
9. Update `progress-tracker.md`.

---

## 7. Definition of Done (per step/feature)

A step is "done" only when:
- [ ] All fields validate in real time with visible, correctly-worded error messages
- [ ] Whitespace-only / empty submissions are blocked
- [ ] Character limits are enforced where specified
- [ ] The primary action button shows a loading spinner and is disabled during the simulated async call
- [ ] A simulated failure path exists and displays a clear, human-readable error (toast or inline)
- [ ] Back button returns to the previous step with all previously entered data intact
- [ ] Step is keyboard-navigable start to finish (Tab order, Enter to submit, Esc where relevant)
- [ ] Step is visually correct and usable at 375px, 768px, and 1440px
- [ ] No hardcoded colors/spacing — only tokens
- [ ] No console errors/warnings

---

## 8. Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Components | PascalCase | `OtpStep.tsx` |
| Hooks | camelCase, `use` prefix | `useWizard.ts` |
| Validators | camelCase, `.schema` suffix | `email.schema.ts` |
| Mock API functions | camelCase, verb-first | `verifyOtp()`, `submitSignup()` |
| Types/interfaces | PascalCase | `WizardState`, `SignupPayload` |
| Constants | SCREAMING_SNAKE_CASE | `OTP_LENGTH`, `MIN_AGE` |
| CSS tokens | kebab-case, `--color-*` / `--space-*` | `--color-accent` |

---

## 9. Component Rules

- Presentational components (`components/ui`) accept props only — no business logic, no direct calls to `lib/mock-api.ts`.
- Step components (`features/signup-wizard/components`) own their form + validation wiring, and dispatch to the wizard context — they do not manage global routing.
- Max component size: **250 lines**. Split if larger.
- Every component that renders a list must have a defined `key` using a stable id, never array index (except fully static option lists).
- Animation variants (Framer Motion) are defined as constants outside the component body, not inline objects re-created every render.

---

## 10. Validation Rules (Zod, per step)

| Step | Rules |
|---|---|
| Email | valid email format; required; trimmed |
| Password | min 8 chars, 1 number, 1 letter (only if password step is enabled — see `project-overview.md`) |
| OTP | exactly 6 digits, numeric only |
| Username | min 6 characters, no whitespace-only, alphanumeric + underscore, max 20 |
| Name | required, min 2 chars, no whitespace-only, letters/spaces/hyphens only |
| Age (DOB) | required date; computed age must be ≥ 18, else block progression with inline error |
| Pronouns | required selection from dropdown; no free text |
| Terms acceptance | checkbox must be checked before Signup button is enabled |

All schemas live in `features/signup-wizard/validators/`, one file per step, composed into a master schema for final validation before submit.

---

## 11. Error Handling & Logging

- All simulated async functions in `lib/mock-api.ts` must throw typed errors (`class MockApiError extends Error`) with a `code` field (`INVALID_OTP`, `NETWORK_ERROR`, `UNDERAGE`, etc.).
- Step components catch errors and map `code` → human-readable copy. Never show raw error objects or stack traces in the UI.
- Global failures (e.g., simulated network failure on submit) surface via a toast component (`components/ui/Toast`), auto-dismiss after 4s, max 3 stacked.
- Field-level failures (validation) surface inline beneath the field, never as toasts.
- Use `console.warn`/`console.error` only during development; no console logging should ship in the production build (strip via Vite `define` or ESLint rule).

---

## 12. Security Rules (front-end scope)

- Never store the mock "password" in plain readable state longer than needed for the mock call — clear from context after step transition if not required later.
- Sanitize any user-entered text before rendering (React does this by default — never use `dangerouslySetInnerHTML`).
- No real credentials, API keys, or secrets in the repo — this project has no backend to protect, but treat mock tokens as if they mattered.

---

## 13. Accessibility Rules

- WCAG AA contrast minimum on all text against its background token.
- Every input has an associated `<label htmlFor>`.
- Every error message is linked via `aria-describedby` and the input carries `aria-invalid` when errored.
- OTP digit inputs are keyboard-navigable (arrow keys, backspace clears and moves back, paste fills all 6).
- Focus moves to the new step's heading on every step transition (`tabIndex={-1}` + `.focus()`).
- Respect `prefers-reduced-motion` — disable non-essential Framer Motion transitions when set.
- Modal (landing signup popup) traps focus and restores it to the trigger button on close.

---

## 14. Performance Standards

- Route-level code splitting via `React.lazy` for the wizard, terms page, and success page.
- Three.js hero component is lazy-loaded and only mounted on the landing page — never imported elsewhere.
- Memoize expensive derived values (e.g., computed age) with `useMemo`.
- No unnecessary re-renders: wizard context value is memoized; step components subscribe only to the slice of state they need.
- Images optimized (WebP where possible), lazy-loaded below the fold.
- Target: smooth 60fps on step transitions, no layout shift.

---

## 15. Reliability & Retry Strategy

- Mock API calls (`sendOtp`, `verifyOtp`, `submitSignup`) simulate a ~10–20% random failure rate to force real error-state UI testing.
- "Resend OTP" includes a cooldown timer (30s) to prevent spam, and re-enables cleanly on expiry.
- Failed submissions never lose entered form data — user can retry without re-typing.
- `sendOtp()` generates a real random 6-digit code each call and returns it in the mock response. The Email step displays this code via a toast (clearly labeled as a demo/dev aid, e.g. "Demo OTP: 482913") so the flow can be tested and recorded without a real inbox. This is a testing convenience only, not a security shortcut — no separate hidden bypass code.
---

## 16. AI Agent Responsibilities

Before implementing anything, an AI agent working in this repo must:
1. Read this file (`AGENTS.md`) in full.
2. Read `architecture.md` and `code-structure.md`.
3. Check `build-plan.md` for the current milestone.
4. Check `progress-tracker.md` for what's already done.
5. Follow every rule above — especially the CSS/token rule and the Definition of Done checklist.
6. Update `progress-tracker.md` after completing any milestone.
