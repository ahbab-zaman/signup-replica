import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/useToast";
import { sendOtp } from "@/lib/mock-api";
import { useWizard } from "../hooks/useWizard";
import { emailSchema, type EmailFields } from "../validators/email.schema";
import { StepFooter } from "./StepFooter";

export function EmailStep() {
  const { state, dispatch } = useWizard();
  const { toast } = useToast();
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useForm<z.input<typeof emailSchema>, unknown, EmailFields>({
    resolver: zodResolver(emailSchema),
    mode: "onTouched",
    defaultValues: {
      email: state.fields.email,
      newsletter: state.fields.newsletter,
    },
  });

  useEffect(() => {
    if (state.fields.email) {
      void trigger();
    }
    headingRef.current?.focus();
  }, [state.fields.email, trigger]);

  const onValidSubmit = async (values: EmailFields) => {
    dispatch({ type: "SAVE_FIELD", field: "email", value: values.email });
    dispatch({ type: "SAVE_FIELD", field: "newsletter", value: values.newsletter });

    setIsSendingOtp(true);
    try {
      const code = await sendOtp(values.email);
      toast({
        variant: "info",
        title: `Demo OTP: ${code}`,
        description: "Use this code on the next step. Tap the copy icon.",
        onClick: () => {
          void navigator.clipboard?.writeText(code);
        },
      });
      dispatch({ type: "NEXT_STEP" });
    } catch {
      toast({
        variant: "error",
        title: "Couldn't send your code",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSendingOtp(false);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    void handleSubmit(onValidSubmit)(event);
  };

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="text-2xl font-bold text-text-primary focus:outline-none"
        >
          Your email
        </h2>
        <p className="mt-2 text-sm text-text-muted">
          We&apos;ll send a 6-digit code to verify it&apos;s you.
        </p>
      </div>

      <form noValidate onSubmit={onSubmit} className="flex flex-col gap-5">
        <Input
          label="Email address"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          disabled={isSendingOtp}
          leftIcon={<Mail aria-hidden="true" className="h-4 w-4" />}
          error={errors.email?.message}
          {...register("email")}
        />

        <Checkbox
          label="Send me occasional product updates"
          disabled={isSendingOtp}
          error={errors.newsletter?.message}
          {...register("newsletter")}
        />

        <StepFooter
          primary={
            <Button
              type="submit"
              loading={isSendingOtp}
              disabled={!isValid}
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