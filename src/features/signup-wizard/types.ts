import type { z } from "zod";
import type { signupSchema } from "./validators/signupSchema";

export type WizardFields = z.infer<typeof signupSchema>;

export type WizardStatus = "idle" | "submitting" | "success";

export type WizardStepIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;