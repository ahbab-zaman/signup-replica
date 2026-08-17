import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { useToast } from "@/components/ui/useToast";
import { sendOtp } from "@/lib/mock-api";
import { useWizard } from "../hooks/useWizard";
import { emailSchema, type EmailFields } from "../validators/email.schema";
import { StepFooter } from "./StepFooter";
import {
  wizardCheckboxBoxClass,
  wizardCheckboxLabelClass,
  wizardCheckboxRowClass,
  wizardCopyClass,
  wizardFieldClass,
  wizardLabelClass,
  wizardPrimaryButtonClass,
  wizardStepClass,
  wizardTitleClass,
} from "./wizardStyles";

export function EmailStep() {
  const { state, dispatch } = useWizard();
  const { toast } = useToast();
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
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

  const newsletterChecked = watch("newsletter");

  const onValidSubmit = async (values: EmailFields) => {
    dispatch({ type: "SAVE_FIELD", field: "email", value: values.email });
    dispatch({
      type: "SAVE_FIELD",
      field: "newsletter",
      value: values.newsletter,
    });

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
    <section className={wizardStepClass}>
      <div>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className={wizardTitleClass + " focus:outline-none"}
        >
          Enter your email
        </h2>
        <p className={wizardCopyClass}>
          We&apos;ll send a 6-digit code to verify it&apos;s you.
        </p>
      </div>

      <form noValidate onSubmit={onSubmit} className="mt-4 flex flex-col gap-6">
        <div>
          <label htmlFor="email" className={wizardLabelClass}>
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="EMAIL"
            disabled={isSendingOtp}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={wizardFieldClass}
            {...register("email")}
          />
          {errors.email ? (
            <p id="email-error" role="alert" className="mt-2 text-sm text-white/55">
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <label className={wizardCheckboxRowClass}>
          <span className={wizardCheckboxBoxClass}>
            <input
              type="checkbox"
              disabled={isSendingOtp}
              className="sr-only"
              {...register("newsletter")}
            />
            {newsletterChecked ? (
              <Check aria-hidden="true" className="h-4 w-4 text-black" />
            ) : null}
          </span>
          <span className={wizardCheckboxLabelClass}>
            I&apos;d like to subscribe to your newsletter
          </span>
        </label>

        <StepFooter
          primary={
            <button
              type="submit"
              aria-label="Continue"
              disabled={!isValid || isSendingOtp}
              className={wizardPrimaryButtonClass}
            >
              PROCEED
            </button>
          }
        />
      </form>
    </section>
  );
}
