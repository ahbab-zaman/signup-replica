import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, XCircle } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Spinner } from "@/components/ui/Spinner";
import { USERNAME_CHECK_DEBOUNCE_MS } from "@/lib/constants";
import { checkUsernameAvailable } from "@/lib/mock-api";
import { useWizard } from "../hooks/useWizard";
import {
  usernameSchema,
  type UsernameFields,
} from "../validators/username.schema";
import { StepFooter } from "./StepFooter";
import {
  wizardCopyClass,
  wizardFieldClass,
  wizardFieldErrorClass,
  wizardLabelClass,
  wizardPrimaryButtonClass,
  wizardStepClass,
  wizardTitleClass,
} from "./wizardStyles";

type Availability = "idle" | "checking" | "available" | "taken";

export function UsernameStep() {
  const { state, dispatch } = useWizard();
  const [availability, setAvailability] = useState<Availability>("idle");
  const headingRef = useRef<HTMLHeadingElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.input<typeof usernameSchema>, unknown, UsernameFields>({
    resolver: zodResolver(usernameSchema),
    mode: "onChange",
    defaultValues: { username: state.fields.username },
  });

  const username = watch("username");
  const trimmed = username?.trim() ?? "";
  const hasFormatError = Boolean(errors.username);

  useEffect(() => {
    if (!trimmed || hasFormatError) {
      setAvailability("idle");
      return;
    }
    setAvailability("checking");
    let cancelled = false;
    const handle = window.setTimeout(() => {
      void checkUsernameAvailable(trimmed)
        .then((isAvailable) => {
          if (!cancelled) {
            setAvailability(isAvailable ? "available" : "taken");
          }
        })
        .catch(() => {
          if (!cancelled) setAvailability("idle");
        });
    }, USERNAME_CHECK_DEBOUNCE_MS);
    return () => {
      cancelled = true;
      window.clearTimeout(handle);
    };
  }, [trimmed, hasFormatError]);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const canContinue = availability === "available" && !hasFormatError;

  const onValidSubmit = (values: UsernameFields) => {
    dispatch({
      type: "SAVE_FIELD",
      field: "username",
      value: values.username.trim(),
    });
    dispatch({ type: "NEXT_STEP" });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    void handleSubmit(onValidSubmit)(event);
  };

  const hint =
    availability === "available"
      ? "Username available"
      : availability === "checking"
        ? "Checking availability..."
        : "6+ characters. Letters, numbers, and underscores only.";

  const inputError =
    errors.username?.message ??
    (availability === "taken" ? "That username is taken" : undefined);

  return (
    <section className={wizardStepClass}>
      <div>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className={wizardTitleClass + " focus:outline-none"}
        >
          Create a username that fits your vibe!
        </h2>
        <p className={wizardCopyClass}>
          All your Superlatives and Invites will come your way with this name, so make it unforgettable!
        </p>
      </div>

      <form noValidate onSubmit={onSubmit} className="mt-4 flex flex-col gap-6">
        <div>
          <label htmlFor="username" className={wizardLabelClass}>
            Username
          </label>
          <div className="relative">
            <input
              id="username"
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
              placeholder=""
              aria-busy={availability === "checking" ? true : undefined}
              aria-invalid={inputError ? true : undefined}
              aria-describedby={
                inputError ? "username-error" : "username-hint"
              }
              className={wizardFieldClass + " pr-12"}
              {...register("username")}
            />
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
              {availability === "checking" ? (
                <Spinner size="sm" aria-hidden="true" />
              ) : availability === "available" ? (
                <CheckCircle2 aria-hidden="true" className="h-5 w-5 text-white" />
              ) : availability === "taken" ? (
                <XCircle aria-hidden="true" className="h-5 w-5 text-white" />
              ) : null}
            </div>
          </div>
          {inputError ? (
            <p id="username-error" role="alert" className={wizardFieldErrorClass}>
              {inputError}
            </p>
          ) : (
            <p id="username-hint" className={wizardFieldErrorClass}>
              {hint}
            </p>
          )}
        </div>

        <StepFooter
          onBack={() => dispatch({ type: "PREV_STEP" })}
          primary={
            <button
              type="submit"
              aria-label="Continue"
              disabled={!canContinue}
              className={wizardPrimaryButtonClass}
            >
              NEXT
            </button>
          }
        />
      </form>
    </section>
  );
}
