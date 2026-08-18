import { z } from "zod";

export const locationSchema = z.object({
  country: z.string().min(1, "Select your country"),
  state: z.string().min(1, "Select your state / region"),
});

export type LocationFields = z.infer<typeof locationSchema>;
