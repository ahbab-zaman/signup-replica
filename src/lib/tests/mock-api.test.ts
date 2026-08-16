import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { OTP_EXPIRY_MS } from "@/lib/constants";
import {
  checkUsernameAvailable,
  sendOtp,
  submitSignup,
  verifyOtp,
} from "@/lib/mock-api";

const VALID_PAYLOAD = {
  email: "ada@example.com",
  newsletter: false,
  username: "cool_user",
  name: "Ada Lovelace",
  dateOfBirth: "2000-01-01",
  pronouns: "she/her",
  termsAccepted: true,
};

describe("mock-api", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockReturnValue(0.9);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  async function settle<T>(promise: Promise<T>): Promise<T> {
    await vi.advanceTimersByTimeAsync(2000);
    return promise;
  }

  it("sendOtp returns a 6-digit code", async () => {
    const code = await settle(sendOtp("ada@example.com"));
    expect(code).toMatch(/^\d{6}$/);
  });

  it("verifyOtp resolves for the correct code", async () => {
    const code = await settle(sendOtp("ada@example.com"));
    await expect(settle(verifyOtp(code))).resolves.toBeUndefined();
  });

  it("verifyOtp rejects with INVALID_OTP for a wrong code", async () => {
    const code = await settle(sendOtp("ada@example.com"));
    const wrong = code === "000000" ? "111111" : "000000";
    const result = verifyOtp(wrong).catch((error: unknown) => error);
    await vi.advanceTimersByTimeAsync(2000);
    await expect(result).resolves.toMatchObject({ code: "INVALID_OTP" });
  });

  it("verifyOtp rejects with OTP_EXPIRED after the code expires", async () => {
    const code = await settle(sendOtp("ada@example.com"));
    await vi.advanceTimersByTimeAsync(OTP_EXPIRY_MS);
    const result = verifyOtp(code).catch((error: unknown) => error);
    await vi.advanceTimersByTimeAsync(2000);
    await expect(result).resolves.toMatchObject({ code: "OTP_EXPIRED" });
  });

  it("checkUsernameAvailable rejects taken usernames", async () => {
    await expect(settle(checkUsernameAvailable("admin"))).resolves.toBe(false);
  });

  it("checkUsernameAvailable accepts an available username", async () => {
    await expect(settle(checkUsernameAvailable("cool_user_42"))).resolves.toBe(
      true,
    );
  });

  it("submitSignup resolves with a userId", async () => {
    const result = await settle(submitSignup(VALID_PAYLOAD));
    expect(result.userId).toBeTruthy();
  });
});