import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { useWizard } from "../hooks/useWizard";
import { nameSchema, type NameFields } from "../validators/name.schema";
import { StepFooter } from "./StepFooter";
import {
  wizardCopyClass,
  wizardFieldClass,
  wizardLabelClass,
  wizardPrimaryButtonClass,
  wizardStepClass,
  wizardTitleClass,
} from "./wizardStyles";
import { NAME_MAX_LENGTH } from "@/lib/constants";

export function NameStep() {
  const { state, dispatch } = useWizard();
  const headingRef = useRef<HTMLHeadingElement>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useForm<z.input<typeof nameSchema>, unknown, NameFields>({
    resolver: zodResolver(nameSchema),
    mode: "onTouched",
    defaultValues: { name: state.fields.name },
  });

  useEffect(() => {
    if (state.fields.name) {
      void trigger();
    }
    headingRef.current?.focus();
  }, [state.fields.name, trigger]);

  const onValidSubmit = (values: NameFields) => {
    dispatch({ type: "SAVE_FIELD", field: "name", value: values.name.trim() });
    dispatch({ type: "NEXT_STEP" });
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
          &quot;Name, please, for the party check!&quot;
        </h2>
        <p className={wizardCopyClass}>
          This is the name shown as on members and requests. Cannot be changed later.
        </p>
      </div>

      <form noValidate onSubmit={onSubmit} className="mt-4 flex flex-col gap-6">
        <div>
          <label htmlFor="name" className={wizardLabelClass}>
            Name
          </label>
          <input
            id="name"
            autoComplete="name"
            placeholder=""
            maxLength={NAME_MAX_LENGTH}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={wizardFieldClass}
            {...register("name")}
          />
          {errors.name ? (
            <p id="name-error" role="alert" className="mt-2 text-sm text-white/55">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <StepFooter
          onBack={() => dispatch({ type: "PREV_STEP" })}
          primary={
            <button
              type="submit"
              aria-label="Continue"
              disabled={!isValid}
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
