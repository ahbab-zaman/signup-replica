export type MockApiErrorCode =
  | "NETWORK_ERROR"
  | "INVALID_OTP"
  | "OTP_EXPIRED";

export class MockApiError extends Error {
  readonly code: MockApiErrorCode;

  constructor(code: MockApiErrorCode, message?: string) {
    super(message ?? `Mock API error: ${code}`);
    this.name = "MockApiError";
    this.code = code;
  }
}

export function isMockApiError(
  error: unknown,
  code?: MockApiErrorCode,
): error is MockApiError {
  return (
    error instanceof MockApiError &&
    (code === undefined || error.code === code)
  );
}