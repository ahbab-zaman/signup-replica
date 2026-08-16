import { z } from "zod";
import { OTP_LENGTH } from "@/lib/constants";

export const otpSchema = z.object({
  otp: z
    .string()
    .length(OTP_LENGTH, `Enter the ${OTP_LENGTH}-digit code`)
    .regex(/^\d+$/, "Digits only"),
});

export type OtpFields = z.infer<typeof otpSchema>;