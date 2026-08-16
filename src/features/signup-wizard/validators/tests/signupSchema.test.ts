import { describe, expect, it } from "vitest";
import { signupSchema } from "../signupSchema";

const VALID_PAYLOAD = {
  email: "ada@example.com",
  newsletter: false,
  username: "cool_user",
  name: "Ada Lovelace",
  dateOfBirth: "2000-01-01",
  pronouns: "she/her",
  termsAccepted: true,
};

describe("signupSchema", () => {
  it("accepts a complete valid payload", () => {
    expect(signupSchema.safeParse(VALID_PAYLOAD).success).toBe(true);
  });

  it("defaults the newsletter flag when omitted", () => {
    const result = signupSchema.safeParse({
      email: VALID_PAYLOAD.email,
      username: VALID_PAYLOAD.username,
      name: VALID_PAYLOAD.name,
      dateOfBirth: VALID_PAYLOAD.dateOfBirth,
      pronouns: VALID_PAYLOAD.pronouns,
      termsAccepted: VALID_PAYLOAD.termsAccepted,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.newsletter).toBe(false);
    }
  });

  it("rejects when terms are not accepted", () => {
    expect(
      signupSchema.safeParse({ ...VALID_PAYLOAD, termsAccepted: false }).success,
    ).toBe(false);
  });

  it("rejects an underage date of birth", () => {
    expect(
      signupSchema.safeParse({ ...VALID_PAYLOAD, dateOfBirth: "2015-01-01" })
        .success,
    ).toBe(false);
  });
});