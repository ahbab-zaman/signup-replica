# Architecture

## Overview

Single-page React application (Vite SPA), fully client-side, no backend. All "server" behavior for signup/OTP/verification is simulated in `src/lib/mock-api.ts` using `Promise` + `setTimeout`, with randomized latency and failure injection to exercise real error-handling UI.

## High-Level Flow

Landing Page
│ click "Sign Up"
▼
Confirm Modal ("Create Account" / "Maybe Later")
│ Create Account
▼
Signup Wizard (single route, internal step state machine)
│
├─ Step 0: Email (+ optional newsletter checkbox)
├─ Step 0.5: OTP verification
├─ Step 1: Username
├─ Step 2: Name
├─ Step 3: Age (DOB picker → computed age, 18+ enforced)
├─ Step 4: Pronouns (dropdown)
└─ Step 5: Review (Terms & Conditions acceptance) → Signup
▼
Success screen → auto-redirect (after short delay) →
Mock Dashboard / Home page


## Routing (React Router)

| Path | Page | Notes |
|---|---|---|
| `/` | Landing | Hero (Three.js background), CTA, signup modal |
| `/terms` | Standalone Terms & Conditions | Reachable via "View full terms" link from the review step; also directly navigable |
| `/signup` | Signup Wizard | One route; internal step index in context state, not sub-routes — enables smooth Framer Motion transitions without full navigation/remount |
| `/success` | Success screen | Shown briefly post-signup before redirect |
| `/home` | Mock dashboard | Final redirect target, minimal placeholder content |
| `*` | 404 | Simple not-found page |

**Why one route for the wizard instead of nested routes per step:** step transitions need to feel instant and animated (Framer Motion `AnimatePresence`), and all step data must persist in memory without re-fetching or remounting the whole tree. Using route params per step would also make "Back" behavior harder to keep bug-free. Step position is still reflected in a `?step=` query param for shareability/debugging, but is not the source of truth — the wizard context is.

## State Management

- **Wizard state**: `WizardProvider` (`features/signup-wizard/context`) using `useReducer`. Holds: current step index, all collected field values, verification status, submission status.
- **Form state per step**: React Hook Form, scoped to that step's fields, validated with the step's Zod schema. On valid submit, the step dispatches an action to the wizard reducer to persist the values, then advances the step index.
- **No global client-state library** (no Redux/Zustand) — the wizard context is the only cross-cutting state needed for this scope.

## Mock API Layer

`src/lib/mock-api.ts` exposes:
- `sendOtp(email): Promise<void>`
- `verifyOtp(code): Promise<void>` — throws `MockApiError('INVALID_OTP')` on wrong/expired code
- `checkUsernameAvailable(username): Promise<boolean>`
- `submitSignup(payload): Promise<{ userId: string }>` — throws `MockApiError('NETWORK_ERROR')` on simulated failure

Each has artificial latency (600–1400ms) and failure injection, so every consuming component must implement loading + error UI, not just a happy path.

## Component Layering

Page (route-level)
↓
Feature component (e.g. SignupWizard shell)
↓
Step component (e.g. OtpStep)
↓
UI primitive (Button, Input, Spinner, Toast)


Data flows down via props/context; actions flow up via dispatch/callbacks. UI primitives never know about the wizard or mock API.

## Error Handling Flow

mock-api throws MockApiError
↓
Step component catch block
↓
├─ field-level issue → inline error under field
└─ global issue (network) → toast via ToastProvider


## Animation Architecture

Framer Motion handles:
- Step-to-step transitions (`AnimatePresence` + slide/fade variants)
- Modal open/close (landing signup confirm modal)
- Micro-interactions (button press, checkbox toggle, OTP digit fill)
- Landing page hero text/CTA entrance

Three.js (`@react-three/fiber`) handles only the landing page hero background — a lightweight, ambient 3D visual, lazy-loaded so it never impacts the wizard bundle.
