import { z } from "zod";
import { MIN_AGE } from "@/lib/constants";
import { calculateAge } from "@/lib/utils";

export const ageSchema = z.object({
  dateOfBirth: z
    .string()
    .min(1, "Select your date of birth")
    .refine((value) => calculateAge(value) >= MIN_AGE, {
      message: `You must be ${MIN_AGE} or older to sign up`,
    }),
});

export type AgeFields = z.infer<typeof ageSchema>;