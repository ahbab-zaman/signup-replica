import { z } from "zod";
import { EMAIL_MAX_LENGTH } from "@/lib/constants";

export const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address")
    .email("Enter a valid email address")
    .max(EMAIL_MAX_LENGTH, "Email address is too long"),
  newsletter: z.boolean().default(false),
});

export type EmailFields = z.infer<typeof emailSchema>;