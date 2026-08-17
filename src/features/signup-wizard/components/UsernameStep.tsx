import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, CheckCircle2, XCircle } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { USERNAME_CHECK_DEBOUNCE_MS } from "@/lib/constants";
import { checkUsernameAvailable } from "@/lib/mock-api";
import { useWizard } from "../hooks/useWizard";
import {
  usernameSchema,
  type UsernameFields,
} from "../validators/username.schema";
import { StepFooter } from "./StepFooter";

type Availability = "idle" | "checking" | "available" | "taken";

export function UsernameStep() {
  const { state, dispatch } = useWizard();
  const [availability, setAvailability] = useState<Availability>("idle");

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
        ? "Checking availability…"
        : "6+ characters. Letters, numbers, and underscores only.";

  const inputError =
    errors.username?.message ??
    (availability === "taken" ? "That username is taken" : undefined);

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Pick a username</h2>
        <p className="mt-2 text-sm text-text-muted">
          This is how others will see you. Choose something unique.
        </p>
      </div>

      <form noValidate onSubmit={onSubmit} className="flex flex-col gap-5">
        <Input
          label="Username"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="cool_user"
          leftIcon={<AtSign aria-hidden="true" className="h-4 w-4" />}
          hint={inputError ? undefined : hint}
          error={inputError}
          aria-busy={availability === "checking" ? true : undefined}
          rightSlot={
            availability === "checking" ? (
              <Spinner size="sm" aria-hidden="true" />
            ) : availability === "available" ? (
              <CheckCircle2
                aria-hidden="true"
                className="h-4 w-4 text-success"
              />
            ) : availability === "taken" ? (
              <XCircle aria-hidden="true" className="h-4 w-4 text-error" />
            ) : undefined
          }
          {...register("username")}
        />

        <StepFooter
          onBack={() => dispatch({ type: "PREV_STEP" })}
          primary={
            <Button
              type="submit"
              disabled={!canContinue}
              className="w-full sm:w-auto"
            >
              Continue
            </Button>
          }
        />
      </form>
    </section>
  );
}