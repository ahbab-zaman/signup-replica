import { describe, expect, it } from "vitest";
import { usernameSchema } from "../username.schema";

describe("usernameSchema", () => {
  it("accepts a valid username", () => {
    expect(usernameSchema.safeParse({ username: "cool_user1" }).success).toBe(
      true,
    );
  });

  it("rejects a username shorter than 6 characters", () => {
    expect(usernameSchema.safeParse({ username: "abc12" }).success).toBe(false);
  });

  it("rejects characters other than letters, numbers, and underscores", () => {
    expect(usernameSchema.safeParse({ username: "hello world!" }).success).toBe(
      false,
    );
  });

  it("rejects whitespace-only input", () => {
    expect(usernameSchema.safeParse({ username: "      " }).success).toBe(false);
  });
});