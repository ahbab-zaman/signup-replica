import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { useToast } from "@/components/ui/useToast";
import { submitSignup } from "@/lib/mock-api";
import { useWizard } from "../hooks/useWizard";
import {
  reviewSchema,
  type ReviewFields,
} from "../validators/review.schema";
import { StepFooter } from "./StepFooter";

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
        dateOfBirth: state.fields.dateOfBirth,
        pronouns: state.fields.pronouns,
        termsAccepted: values.termsAccepted,
      });
      dispatch({ type: "SET_STATUS", status: "success" });
      navigate("/success");
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
    <section className="flex flex-col gap-6">
      <div>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="text-2xl font-bold text-text-primary focus:outline-none"
        >
          Almost there
        </h2>
        <p className="mt-2 text-sm text-text-muted">
          Accept the terms to finish creating your account.
        </p>
      </div>

      <form noValidate onSubmit={onSubmit} className="flex flex-col gap-5">
        <div className="rounded-lg border border-border bg-surface-tertiary p-4">
          <p className="text-xs leading-relaxed text-text-muted">
            By creating an account, you agree to our Terms &amp; Conditions and
            Privacy Policy. You must be 18 or older to use this service. We
            collect your email, username, and date of birth to personalize your
            experience, and you can request to delete your data at any time.
          </p>
          <Link
            to="/terms"
            className="mt-3 inline-block text-xs font-medium text-accent underline underline-offset-2 hover:text-accent-light focus:outline-none focus:ring-2 focus:ring-accent"
          >
            View full terms &rarr;
          </Link>
        </div>

        <Checkbox
          label="I agree to the Terms &amp; Conditions."
          disabled={isSubmitting}
          error={errors.termsAccepted?.message}
          {...register("termsAccepted")}
        />

        <StepFooter
          onBack={() => dispatch({ type: "PREV_STEP" })}
          primary={
            <Button
              type="submit"
              loading={isSubmitting}
              disabled={!termsAccepted || isSubmitting}
              className="w-full sm:w-auto"
            >
              Sign up
            </Button>
          }
        />
      </form>
    </section>
  );
}