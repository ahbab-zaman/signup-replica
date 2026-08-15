# Progress Tracker

> Update this file after completing any milestone from `build-plan.md`. Keep entries short and factual.

## Status Legend
- `Not Started`
- `In Progress`
- `Complete`
- `Blocked`

---

## Milestones

| # | Milestone | Status | Notes |
|---|---|---|---|
| 01 | Project Setup | Not Started | Vite + TS + Tailwind v4 + Router scaffold, UI primitives |
| 02 | Wizard Foundation | Not Started | Context, reducer, Zod schemas, mock-api |
| 03 | Step 0 — Email | Not Started | |
| 04 | Step 0.5 — OTP | Not Started | Improved UX vs. source app (target requirement) |
| 05 | Step 1 — Username | Not Started | |
| 06 | Step 2 — Name | Not Started | |
| 07 | Step 3 — Age (DOB) | Not Started | 18+ enforcement is a required improvement |
| 08 | Step 4 — Pronouns | Not Started | |
| 09 | Step 5 — Review & Submit | Not Started | T&C acceptance only, no data recap |
| 10 | Success & Redirect | Not Started | |
| 11 | Landing Page | Not Started | Three.js hero, signup confirm modal |
| 12 | Terms & Conditions Page | Not Started | |
| 13 | Polish & Responsiveness Pass | Not Started | |
| 14 | Demo Readiness | Not Started | Final walkthrough of all required edge cases |

---

## Decisions Log

| Date | Decision | Reason |
|---|---|---|
| — | No password field in signup flow | Matches actual reference app behavior (email + OTP only); adding one would break visual/functional parity, which is the primary grading criterion |
| — | Final review step shows T&C + checkbox only, no data recap | Per product decision — keep review step lightweight |
| — | Framer Motion handles all animation, GSAP dropped | Avoids overlapping libraries solving the same concern per `library-docs.md` rules |
| — | Three.js scoped to landing hero only | Keeps wizard bundle light; 3D is an ambient brand touch, not core UX |
| — | Wizard uses one route with internal step state, not per-step routes | Enables smooth Framer Motion transitions and guarantees no data loss on Back |
| — | 18+ age validation added as explicit improvement | Called out in the assessment brief as a known gap in the reference app |
| — | OTP screen redesigned (digit-box states, visible resend cooldown) | Called out in the assessment brief as a known UX weakness in the reference app |

---

## Known Gaps / Open Items
- (populate as work proceeds)
