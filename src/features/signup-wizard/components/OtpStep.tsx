import type { ClipboardEvent, KeyboardEvent, FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/components/ui/useToast";
import { OTP_COOLDOWN_MS, OTP_LENGTH } from "@/lib/constants";
import { isMockApiError } from "@/lib/errors";
import { sendOtp, verifyOtp } from "@/lib/mock-api";
import { cn } from "@/lib/utils";
import { useWizard } from "../hooks/useWizard";
import { StepFooter } from "./StepFooter";
import {
  wizardFieldErrorClass,
  wizardOtpGridClass,
  wizardOtpInputClass,
  wizardOtpLabelClass,
  wizardOtpNoteClass,
  wizardPrimaryButtonClass,
  wizardStepClass,
} from "./wizardStyles";

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

  const otp = digits.join("");
  const isComplete = otp.length === OTP_LENGTH && /^\d+$/.test(otp);
  const error = verifyError;
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

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
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
    <section className={wizardStepClass}>
      <div className="mt-10">
        <h2 className={wizardOtpLabelClass}>Enter OTP</h2>
      </div>

      <form noValidate onSubmit={onSubmit} className="mt-10 flex flex-col gap-6">
        <div>
          <div role="group" aria-label={`${OTP_LENGTH}-digit code`} className={wizardOtpGridClass}>
            {digits.map((digit, index) => (
              <div key={index} className="relative h-20">
                <input
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
                    wizardOtpInputClass,
                    digit ? "border-white/38" : "text-transparent",
                  )}
                />
                {!digit ? (
                  <span className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 text-3xl leading-none text-white">
                    •
                  </span>
                ) : null}
              </div>
            ))}
          </div>

          {error ? (
            <p role="alert" className={wizardFieldErrorClass + " mt-3"}>
              {error}
            </p>
          ) : null}
        </div>

        <div className="flex justify-end">
          {cooldown > 0 ? (
            <p className={wizardOtpNoteClass}>Resend OTP in {cooldown}s</p>
          ) : (
            <button
              type="button"
              aria-label="Resend OTP"
              disabled={busy}
              onClick={() => void handleResend()}
              className="text-right text-[0.95rem] text-white/38 transition-colors hover:text-white/60 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Resend OTP
            </button>
          )}
        </div>

        <StepFooter
          backLabel="Go back"
          onBack={() => dispatch({ type: "PREV_STEP" })}
          primary={
            <button
              type="submit"
              aria-label="Verify"
              disabled={!isComplete || isResending}
              className={wizardPrimaryButtonClass}
            >
              VERIFY
            </button>
          }
        />
      </form>
    </section>
  );
}
