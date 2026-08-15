# Library Docs

## Before Using Any Library
1. Check `AGENTS.md` golden rules.
2. Confirm the library isn't already solving this in the stack below.
3. Read the project-specific rules in this file.

---

## React
- Functional components only, hooks-based.
- Keep components small and focused (see file size limits).
- Business logic lives in hooks/context, not inside JSX-heavy components.

### Avoid
- Class components
- Prop drilling more than 2 levels — use wizard context instead

---

## TypeScript
- `strict: true` in `tsconfig.json`.
- No `any`. Use `unknown` + narrowing if a type is genuinely uncertain.
- Every Zod schema exports an inferred type via `z.infer<typeof schema>` — never hand-write a duplicate type alongside a schema.

---

## React Router
- `createBrowserRouter` in `App.tsx`.
- Route-level code splitting via `React.lazy` + `Suspense` (with a `Skeleton` fallback).
- The wizard itself is a single route with internal step state — do not create a route per wizard step (see `architecture.md` for rationale).

---

## Tailwind CSS v4
- All design tokens defined in `src/index.css` via `@theme`. No `tailwind.config.ts` needed for colors/spacing/typography.
- **No raw CSS files anywhere else in the project.** No component-scoped `.css`, no CSS-in-JS, no inline `style={}` (except where a value is truly dynamic and cannot be a class, e.g. a computed transform from Framer Motion — and even then prefer Framer Motion's own style props over manual inline styles).
- Never use raw palette classes (`bg-purple-600`). Only use classes mapped to tokens defined in `ui-tokens.md`.
- Prefer extracting repeated utility chains into a `components/ui` primitive over copy-pasting long class strings.

### Avoid
- Arbitrary values (`p-[13px]`) unless there is truly no token that fits
- `!important` overrides

---

## Framer Motion
- Owns **all** animation in this project (step transitions, modal open/close, micro-interactions, hero entrance text). No GSAP.
- Define animation `variants` as constants outside the component body — never inline objects recreated every render.
- Durations: micro-interactions 100–150ms, step/page transitions 200–300ms, modal 250–350ms. Use `ease-out` by default.
- Respect `prefers-reduced-motion` via `useReducedMotion()` (Framer Motion's built-in hook) — disable/shorten non-essential transitions when true.
- Use `AnimatePresence` for the wizard's step switching so exit animations complete before the next step mounts.

### Avoid
- Animating layout-affecting properties in a way that causes content jump
- Continuous/looping animations outside the landing hero

---

## Three.js (`@react-three/fiber` + `@react-three/drei`)
- **Scope: landing page hero background only.** Never imported into the wizard, terms, or success pages.
- Lazy-loaded via `React.lazy` + `Suspense` so it never blocks or bloats the wizard's bundle.
- Keep the scene lightweight (low poly count, no heavy textures) — this is an ambient visual, not a showcase.
- Must degrade gracefully: if WebGL is unavailable, fall back to a static gradient/background image rather than a blank error.
- Respect `prefers-reduced-motion` — pause/simplify camera or object animation when set.

### Avoid
- Using Three.js for any UI chrome, icons, or decorative elements outside the hero
- Physics engines or heavy postprocessing — this is a visual accent, not a game

---

## React Hook Form
- One `useForm` instance per wizard step, scoped to that step's fields only.
- Paired with Zod via `zodResolver`.
- Validation mode: `onBlur` for text fields, `onChange` for OTP digits and the DOB picker (immediate feedback matters more there).

### Avoid
- Managing step form state with raw `useState` — always go through React Hook Form once a step has more than one field

---

## Zod
- One schema per step, colocated in `features/signup-wizard/validators/`.
- Compose a master `signupSchema` (merge of all step schemas) used for a final safety-check validation before `submitSignup()` is called.
- Custom refinement for age: computed age from DOB must be `>= 18`.

---

## lucide-react
- Use for all icons (chevron, check, alert, spinner-adjacent icons, etc.). No inline raw SVG paths outside `components/ui` primitives, no icon font libraries.

---

# General Rules

- Every library has a single, non-overlapping responsibility (this is why GSAP was dropped in favor of Framer Motion doing everything animation-related).
- Before adding any new library, confirm nothing in this stack already covers the need.
- Update this file if a new library is introduced.
