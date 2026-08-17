import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, type FormEvent } from "react";
import { useController, useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Combobox } from "@/components/ui/Combobox";
import { useWizard } from "../hooks/useWizard";
import {
  pronounsSchema,
  type PronounsFields,
} from "../validators/pronouns.schema";
import { StepFooter } from "./StepFooter";

const PRONOUN_OPTIONS = [
  "they/them",
  "she/her",
  "he/him",
  "she/they",
  "he/they",
  "they/he",
  "they/she",
];

export function PronounsStep() {
  const { state, dispatch } = useWizard();
  const headingRef = useRef<HTMLHeadingElement>(null);

  const { control, handleSubmit, formState } = useForm<
    z.input<typeof pronounsSchema>,
    unknown,
    PronounsFields
  >({
    resolver: zodResolver(pronounsSchema),
    mode: "onChange",
    defaultValues: { pronouns: state.fields.pronouns },
  });
  const { field } = useController({ name: "pronouns", control });

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const hasValue = field.value.trim().length > 0;
  const canContinue = hasValue && !formState.errors.pronouns;

  const onValidSubmit = (values: PronounsFields) => {
    dispatch({
      type: "SAVE_FIELD",
      field: "pronouns",
      value: values.pronouns.trim(),
    });
    dispatch({ type: "NEXT_STEP" });
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
          Your pronouns
        </h2>
        <p className="mt-2 text-sm text-text-muted">
          Pick what fits you best, or type your own.
        </p>
      </div>

      <form noValidate onSubmit={onSubmit} className="flex flex-col gap-5">
        <Combobox
          label="Pronouns"
          value={field.value}
          onChange={field.onChange}
          options={PRONOUN_OPTIONS}
          placeholder="she/her"
          hint="Choose from the list or type your own."
          error={formState.errors.pronouns?.message}
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