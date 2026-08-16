import { describe, expect, it } from "vitest";
import { ageSchema } from "../age.schema";

function dateYearsAgo(years: number): string {
  const date = new Date();
  date.setFullYear(date.getFullYear() - years);
  return date.toISOString().slice(0, 10);
}

describe("ageSchema", () => {
  it("accepts a date of birth for someone exactly 18", () => {
    expect(
      ageSchema.safeParse({ dateOfBirth: dateYearsAgo(18) }).success,
    ).toBe(true);
  });

  it("accepts a date of birth for someone older than 18", () => {
    expect(
      ageSchema.safeParse({ dateOfBirth: dateYearsAgo(30) }).success,
    ).toBe(true);
  });

  it("rejects a date of birth for someone under 18", () => {
    expect(
      ageSchema.safeParse({ dateOfBirth: dateYearsAgo(17) }).success,
    ).toBe(false);
  });

  it("rejects an empty date of birth", () => {
    expect(ageSchema.safeParse({ dateOfBirth: "" }).success).toBe(false);
  });
});