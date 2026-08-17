import { zodResolver } from "@hookform/resolvers/zod";
import type { ClipboardEvent, FormEvent, KeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { useController, useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/useToast";
import { OTP_COOLDOWN_MS, OTP_LENGTH } from "@/lib/constants";
import { isMockApiError } from "@/lib/errors";
import { sendOtp, verifyOtp } from "@/lib/mock-api";
import { cn } from "@/lib/utils";
import { useWizard } from "../hooks/useWizard";
import { otpSchema, type OtpFields } from "../validators/otp.schema";
import { StepFooter } from "./StepFooter";

export function OtpStep() {
  const { state, dispatch } = useWizard();
  const { toast } = useToast();
  const email = state.fields.email;
  const [digits, setDigits] = useState<string[]>(() =>
    Array.from({ length: OTP_LENGTH }, () => ""),
  );
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(OTP_COOLDOWN_MS / 1000);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const { control, formState } = useForm<OtpFields>({
    resolver: zodResolver(otpSchema),
    mode: "onChange",
    defaultValues: { otp: "" },
  });
  const { field: otpField } = useController({ name: "otp", control });

  const otp = digits.join("");
  const isComplete = otp.length === OTP_LENGTH && /^\d+$/.test(otp);
  const error = verifyError ?? formState.errors.otp?.message;
  const busy = isVerifying || isResending;

  useEffect(() => {
    const id = window.setInterval(() => {
      setCooldown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const updateDigits = (next: string[]) => {
    setDigits(next);
    otpField.onChange(next.join(""));
    setVerifyError(null);
  };

  const handleDigitChange = (index: number, raw: string) => {
    const value = raw.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = value;
    updateDigits(next);
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      if (!digits[index] && index > 0) {
        const prev = index - 1;
        const next = [...digits];
        next[prev] = "";
        updateDigits(next);
        inputRefs.current[prev]?.focus();
      }
    } else if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (index: number, event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH - index);
    if (!pasted) return;
    const next = [...digits];
    let cursor = index;
    for (const char of pasted) {
      next[cursor] = char;
      cursor += 1;
    }
    updateDigits(next);
    inputRefs.current[cursor - 1]?.focus();
  };

  const handleVerify = async () => {
    if (!isComplete || isVerifying) return;
    setIsVerifying(true);
    setVerifyError(null);
    try {
      await verifyOtp(otp);
      dispatch({ type: "SET_OTP_VERIFIED", verified: true });
      dispatch({ type: "NEXT_STEP" });
    } catch (err) {
      if (isMockApiError(err)) {
        setVerifyError(err.message);
      } else {
        toast({
          variant: "error",
          title: "Couldn't verify your code",
          description: "Something went wrong. Please try again.",
        });
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || isResending) return;
    setIsResending(true);
    try {
      const code = await sendOtp(email);
      toast({
        variant: "info",
        title: `Demo OTP: ${code}`,
        description: "Use this code to verify. Tap the copy icon.",
        onClick: () => {
          void navigator.clipboard?.writeText(code);
        },
      });
      setCooldown(OTP_COOLDOWN_MS / 1000);
      updateDigits(Array.from({ length: OTP_LENGTH }, () => ""));
      inputRefs.current[0]?.focus();
    } catch {
      toast({
        variant: "error",
        title: "Couldn't resend your code",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsResending(false);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handleVerify();
  };

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Check your inbox</h2>
        <p className="mt-2 text-sm text-text-muted">
          A 6-digit OTP has been sent to {email || "your email"}.
        </p>
      </div>

      <form noValidate onSubmit={onSubmit} className="flex flex-col gap-5">
        <input type="hidden" aria-hidden="true" {...otpField} />

        <div>
          <div
            role="group"
            aria-label={`${OTP_LENGTH}-digit code`}
            className="flex gap-2"
          >
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={1}
                value={digit}
                disabled={busy}
                aria-label={`Digit ${index + 1} of ${OTP_LENGTH}`}
                aria-invalid={error ? true : undefined}
                onChange={(event) => handleDigitChange(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                onPaste={(event) => handlePaste(index, event)}
                onFocus={(event) => event.currentTarget.select()}
                className={cn(
                  "h-12 w-12 rounded-lg border bg-surface text-center text-lg font-semibold text-text-primary",
                  "transition-colors duration-100 ease-out",
                  "focus:outline-none focus:ring-2",
                  error
                    ? "border-error focus:ring-error"
                    : digit
                      ? "border-accent focus:ring-accent"
                      : "border-border hover:border-border-light focus:border-accent focus:ring-accent",
                )}
              />
            ))}
          </div>

          <div className="mt-2 min-h-5">
            {error && (
              <p role="alert" className="text-xs text-error-foreground">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center">
          {cooldown > 0 ? (
            <p className="text-xs text-text-muted">Resend code in {cooldown}s</p>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              loading={isResending}
              disabled={busy}
              onClick={() => void handleResend()}
            >
              Resend code
            </Button>
          )}
        </div>

        <StepFooter
          onBack={() => dispatch({ type: "PREV_STEP" })}
          primary={
            <Button
              type="submit"
              loading={isVerifying}
              disabled={!isComplete || isResending}
              className="w-full sm:w-auto"
            >
              Verify
            </Button>
          }
        />
      </form>
    </section>
  );
}
