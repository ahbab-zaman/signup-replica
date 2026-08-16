import { z } from "zod";
import { NAME_MAX_LENGTH } from "@/lib/constants";

export const nameSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Enter your name")
    .max(NAME_MAX_LENGTH, "Name is too long"),
});

export type NameFields = z.infer<typeof nameSchema>;