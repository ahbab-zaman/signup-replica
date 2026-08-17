import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useEffect, useRef, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { NAME_MAX_LENGTH } from "@/lib/constants";
import { useWizard } from "../hooks/useWizard";
import { nameSchema, type NameFields } from "../validators/name.schema";
import { StepFooter } from "./StepFooter";

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
    <section className="flex flex-col gap-6">
      <div>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="text-2xl font-bold text-text-primary focus:outline-none"
        >
          What should we call you?
        </h2>
        <p className="mt-2 text-sm text-text-muted">
          Your name as it should appear on your profile.
        </p>
      </div>

      <form noValidate onSubmit={onSubmit} className="flex flex-col gap-5">
        <Input
          label="Name"
          autoComplete="name"
          placeholder="Ada Lovelace"
          maxLength={NAME_MAX_LENGTH}
          leftIcon={<User aria-hidden="true" className="h-4 w-4" />}
          error={errors.name?.message}
          {...register("name")}
        />

        <StepFooter
          onBack={() => dispatch({ type: "PREV_STEP" })}
          primary={
            <Button
              type="submit"
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