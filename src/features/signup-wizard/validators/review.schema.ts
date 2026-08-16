import { z } from "zod";

export const reviewSchema = z.object({
  termsAccepted: z.boolean().refine((value) => value === true, {
    message: "You must accept the terms to continue",
  }),
});

export type ReviewFields = z.infer<typeof reviewSchema>;