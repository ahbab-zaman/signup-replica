# Code Structure

## Root Structure

/
├── AGENTS.md
├── context/ → this documentation set
├── src/
│ ├── main.tsx
│ ├── App.tsx → router setup
│ ├── index.css → Tailwind + all @theme tokens + base styles
│ ├── pages/
│ │ ├── LandingPage.tsx
│ │ ├── TermsPage.tsx
│ │ ├── SignupPage.tsx → mounts the wizard feature
│ │ ├── SuccessPage.tsx
│ │ ├── HomePage.tsx → mock dashboard
│ │ └── NotFoundPage.tsx
│ ├── features/
│ │ └── signup-wizard/
│ │ ├── SignupWizard.tsx → shell: progress bar + AnimatePresence step switch
│ │ ├── components/
│ │ │ ├── EmailStep.tsx
│ │ │ ├── OtpStep.tsx
│ │ │ ├── UsernameStep.tsx
│ │ │ ├── NameStep.tsx
│ │ │ ├── AgeStep.tsx
│ │ │ ├── PronounsStep.tsx
│ │ │ └── ReviewStep.tsx
│ │ ├── context/
│ │ │ ├── WizardProvider.tsx
│ │ │ └── wizardReducer.ts
│ │ ├── hooks/
│ │ │ └── useWizard.ts
│ │ ├── validators/
│ │ │ ├── email.schema.ts
│ │ │ ├── otp.schema.ts
│ │ │ ├── username.schema.ts
│ │ │ ├── name.schema.ts
│ │ │ ├── age.schema.ts
│ │ │ └── pronouns.schema.ts
│ │ └── types.ts
│ ├── components/
│ │ ├── ui/
│ │ │ ├── Button.tsx
│ │ │ ├── Input.tsx
│ │ │ ├── Checkbox.tsx
│ │ │ ├── Spinner.tsx
│ │ │ ├── Skeleton.tsx
│ │ │ ├── Toast.tsx
│ │ │ ├── ToastProvider.tsx
│ │ │ ├── Modal.tsx
│ │ │ ├── OtpInput.tsx
│ │ │ ├── DatePickerField.tsx
│ │ │ └── Dropdown.tsx
│ │ └── layout/
│ │ ├── Navbar.tsx
│ │ └── PageShell.tsx
│ ├── hooks/
│ │ └── useReducedMotion.ts
│ ├── lib/
│ │ ├── mock-api.ts
│ │ ├── errors.ts → MockApiError class
│ │ ├── constants.ts → OTP_LENGTH, MIN_AGE, cooldown durations
│ │ └── utils.ts → cn(), age calculation, etc.
│ ├── data/
│ │ └── pronouns.ts → static pronoun option list
│ ├── three/
│ │ └── HeroScene.tsx → Three.js landing hero, lazy-loaded
│ └── types/
│ └── index.ts
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json


---

## Folder Ownership

- `pages/` → route-level composition only, no business logic
- `features/signup-wizard/` → everything specific to the wizard, self-contained
- `components/ui/` → dumb, reusable, no feature knowledge
- `components/layout/` → app shell pieces (navbar, page wrapper)
- `lib/` → framework-independent utilities and the mock API layer
- `data/` → static option lists only, never component logic
- `three/` → all Three.js/`@react-three/fiber` code, isolated so it's never accidentally imported into wizard bundle

## Dependency Rules

Page → Feature component → Step component → UI primitive
Step component → validators (Zod) + lib/mock-api + wizard context


Not allowed:
- UI primitives importing from `features/` or `lib/mock-api`
- Step components importing each other directly (communicate only via wizard context)
- Any component importing `three/` except `LandingPage`

## Import Rules

Use absolute imports via `@/` alias:

```ts
import { Button } from "@/components/ui/Button";
import { useWizard } from "@/features/signup-wizard/hooks/useWizard";
```

Avoid `../../../` relative chains.

## File Size Limits

- Component → 250 lines
- Page → 200 lines
- Reducer/context file → 150 lines
- Validator schema file → 60 lines
- Utility file → 150 lines

Split if exceeded.

## Naming Convention Recap

- Components: `PascalCase.tsx`
- Hooks: `useCamelCase.ts`
- Schemas: `camelCase.schema.ts`
- Types: `types.ts` per feature, or `camelCase.types.ts` if shared

## Testing Structure

src/
features/signup-wizard/
components/tests/
context/tests/
validators/tests/
components/ui/tests/
lib/tests/


Testing priorities: Zod validators → wizard reducer → mock-api error paths → step components → full happy-path integration.
