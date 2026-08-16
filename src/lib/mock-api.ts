import { OTP_EXPIRY_MS } from "@/lib/constants";
import { MockApiError } from "@/lib/errors";

const LATENCY_MIN_MS = 600;
const LATENCY_MAX_MS = 1400;

const TAKEN_USERNAMES = ["admin", "test", "root", "user"];

type SignupPayload = {
  email: string;
  newsletter: boolean;
  username: string;
  name: string;
  dateOfBirth: string;
  pronouns: string;
  termsAccepted: boolean;
};

let activeOtp: { email: string; code: string; expiresAt: number } | null = null;

const registeredUsers = new Map<string, SignupPayload>();

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomLatency(): number {
  return (
    LATENCY_MIN_MS +
    Math.floor(Math.random() * (LATENCY_MAX_MS - LATENCY_MIN_MS + 1))
  );
}

function maybeFail(failureRate: number): void {
  if (Math.random() < failureRate) {
    throw new MockApiError("NETWORK_ERROR", "Something went wrong. Please try again.");
  }
}

function generateOtpCode(): string {
  return Array.from(
    { length: 6 },
    () => Math.floor(Math.random() * 10),
  ).join("");
}

export async function sendOtp(email: string): Promise<string> {
  await delay(randomLatency());
  maybeFail(0.2);
  const code = generateOtpCode();
  activeOtp = { email, code, expiresAt: Date.now() + OTP_EXPIRY_MS };
  return code;
}

export async function verifyOtp(code: string): Promise<void> {
  await delay(randomLatency());
  maybeFail(0.1);
  if (!activeOtp || Date.now() > activeOtp.expiresAt) {
    throw new MockApiError("OTP_EXPIRED", "This code has expired. Request a new one.");
  }
  if (code !== activeOtp.code) {
    throw new MockApiError("INVALID_OTP", "That code isn't right. Check and try again.");
  }
}

export async function checkUsernameAvailable(username: string): Promise<boolean> {
  await delay(300 + Math.floor(Math.random() * 500));
  return !TAKEN_USERNAMES.includes(username.toLowerCase());
}

export async function submitSignup(
  payload: SignupPayload,
): Promise<{ userId: string }> {
  await delay(randomLatency());
  maybeFail(0.2);
  const userId = `user_${Date.now().toString(36)}`;
  registeredUsers.set(payload.username, payload);
  return { userId };
}