import type { z } from "zod";
import { ageSchema } from "./age.schema";
import { emailSchema } from "./email.schema";
import { locationSchema } from "./location.schema";
import { nameSchema } from "./name.schema";
import { pronounsSchema } from "./pronouns.schema";
import { reviewSchema } from "./review.schema";
import { usernameSchema } from "./username.schema";

export const signupSchema = emailSchema
  .merge(usernameSchema)
  .merge(nameSchema)
  .merge(locationSchema)
  .merge(ageSchema)
  .merge(pronounsSchema)
  .merge(reviewSchema);

export type SignupFields = z.infer<typeof signupSchema>;