import { z } from "zod";

export const pronounsSchema = z.object({
  pronouns: z.string().trim().min(1, "Select your pronouns"),
});

export type PronounsFields = z.infer<typeof pronounsSchema>;