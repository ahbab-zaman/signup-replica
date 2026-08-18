import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/useToast";
import { submitSignup } from "@/lib/mock-api";
import { useWizard } from "../hooks/useWizard";
import {
  reviewSchema,
  type ReviewFields,
} from "../validators/review.schema";
import { StepFooter } from "./StepFooter";
import {
  wizardCopyClass,
  wizardFieldErrorClass,
  wizardLinkClass,
  wizardPrimaryButtonClass,
  wizardStepClass,
  wizardTermsCardClass,
  wizardTitleClass,
} from "./wizardStyles";

export function ReviewStep() {
  const { state, dispatch } = useWizard();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.input<typeof reviewSchema>, unknown, ReviewFields>({
    resolver: zodResolver(reviewSchema),
    mode: "onChange",
    defaultValues: { termsAccepted: state.fields.termsAccepted },
  });

  const termsAccepted = watch("termsAccepted");

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const onValidSubmit = async (values: ReviewFields) => {
    dispatch({
      type: "SAVE_FIELD",
      field: "termsAccepted",
      value: values.termsAccepted,
    });
    dispatch({ type: "SET_STATUS", status: "submitting" });
    setIsSubmitting(true);
    try {
      await submitSignup({
        email: state.fields.email,
        newsletter: state.fields.newsletter,
        username: state.fields.username,
        name: state.fields.name,
        country: state.fields.country,
        state: state.fields.state,
        dateOfBirth: state.fields.dateOfBirth,
        pronouns: state.fields.pronouns,
        termsAccepted: values.termsAccepted,
      });
      dispatch({ type: "SET_STATUS", status: "success" });
      navigate("/success", {
        state: {
          username: state.fields.username,
          name: state.fields.name,
        },
      });
    } catch {
      dispatch({ type: "SET_STATUS", status: "idle" });
      toast({
        variant: "error",
        title: "Couldn't create your account",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
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
          Almost there
        </h2>
        <p className={wizardCopyClass}>
          Accept the terms to finish creating your account.
        </p>
      </div>

      <form noValidate onSubmit={onSubmit} className="mt-4 flex flex-col gap-6">
        <div className={wizardTermsCardClass}>
          <p className="text-[0.98rem] leading-[1.7] text-white/78">
            By creating an account, you agree to our Terms &amp; Conditions and Privacy Policy. You must be 18 or older to use this service. We collect your email, username, and date of birth to personalize your experience, and you can request to delete your data at any time.
          </p>
          <Link to="/terms" className={wizardLinkClass + " mt-4"}>
            View full terms →
          </Link>
        </div>

        <label className="flex items-start gap-4">
          <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] border border-white/75 bg-white">
            <input
              type="checkbox"
              disabled={isSubmitting}
              className="sr-only"
              {...register("termsAccepted")}
            />
            {termsAccepted ? <span className="h-4 w-4 text-black">✓</span> : null}
          </span>
          <span className="text-[1.05rem] leading-[1.35] text-white">
            I agree to the Terms &amp; Conditions.
          </span>
        </label>
        {errors.termsAccepted ? (
          <p role="alert" className={wizardFieldErrorClass}>
            {errors.termsAccepted.message}
          </p>
        ) : null}

        <StepFooter
          onBack={() => dispatch({ type: "PREV_STEP" })}
          primary={
            <button
              type="submit"
              aria-label="Sign up"
              disabled={!termsAccepted || isSubmitting}
              className={wizardPrimaryButtonClass}
            >
              SIGN UP
            </button>
          }
        />
      </form>
    </section>
  );
}
