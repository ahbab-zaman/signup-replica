import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useWizard } from "../hooks/useWizard";
import { StepFooter } from "./StepFooter";
import {
  wizardCopyClass,
  wizardFieldClass,
  wizardFieldErrorClass,
  wizardFieldSelectClass,
  wizardLabelClass,
  wizardPrimaryButtonClass,
  wizardSelectChevronClass,
  wizardSelectWrapClass,
  wizardStepClass,
  wizardTitleClass,
} from "./wizardStyles";

const PRONOUN_OPTIONS = [
  { value: "she/her", label: "She / her" },
  { value: "he/him", label: "He / him" },
  { value: "they/them", label: "They / them" },
  { value: "she/they", label: "She / they" },
  { value: "he/they", label: "He / they" },
  { value: "any pronouns", label: "Any pronouns" },
  { value: "custom", label: "Custom pronouns" },
] as const;

type PronounOptionValue = (typeof PRONOUN_OPTIONS)[number]["value"];

function isPronounOptionValue(value: string): value is PronounOptionValue {
  return PRONOUN_OPTIONS.some((option) => option.value === value);
}

export function PronounsStep() {
  const { state, dispatch } = useWizard();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [selection, setSelection] = useState<PronounOptionValue | "">("");
  const [customPronouns, setCustomPronouns] = useState("");
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const savedPronouns = state.fields.pronouns.trim();
    if (!savedPronouns) {
      setSelection("");
      setCustomPronouns("");
    } else if (isPronounOptionValue(savedPronouns)) {
      setSelection(savedPronouns);
      setCustomPronouns("");
    } else {
      setSelection("custom");
      setCustomPronouns(savedPronouns);
    }
    headingRef.current?.focus();
  }, [state.fields.pronouns]);

  const savedPronouns =
    selection === "custom" ? customPronouns.trim() : selection;
  const canContinue = savedPronouns.trim().length > 0;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canContinue) {
      setError("Select your pronouns");
      return;
    }

    setError(undefined);
    dispatch({
      type: "SAVE_FIELD",
      field: "pronouns",
      value: savedPronouns.trim(),
    });
    dispatch({ type: "NEXT_STEP" });
  };

  return (
    <section className={wizardStepClass}>
      <div>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className={wizardTitleClass + " focus:outline-none"}
        >
          Which pronouns feel right for you?
        </h2>
        <p className={wizardCopyClass}>
          Pick from the list or choose custom if you want to type your own.
        </p>
      </div>

      <form noValidate onSubmit={onSubmit} className="mt-4 flex flex-col gap-6">
        <div>
          <label htmlFor="pronouns" className={wizardLabelClass}>
            Pronouns
          </label>
          <div className={wizardSelectWrapClass}>
            <select
              id="pronouns"
              value={selection}
              onChange={(event) => {
                const nextSelection = event.target.value;
                setSelection(
                  isPronounOptionValue(nextSelection) ? nextSelection : "",
                );
                setError(undefined);
                if (nextSelection !== "custom") {
                  setCustomPronouns("");
                }
              }}
              className={wizardFieldSelectClass}
            >
              <option value="">Select your pronouns</option>
              {PRONOUN_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className={wizardSelectChevronClass + " h-5 w-5"}
            />
          </div>

          {selection === "custom" ? (
            <div className="mt-4">
              <label htmlFor="custom-pronouns" className={wizardLabelClass}>
                Custom pronouns
              </label>
              <input
                id="custom-pronouns"
                value={customPronouns}
                onChange={(event) => {
                  setCustomPronouns(event.target.value);
                  setError(undefined);
                }}
                placeholder="Type your pronouns"
                className={wizardFieldClass}
              />
            </div>
          ) : null}

          {error ? (
            <p role="alert" className={wizardFieldErrorClass}>
              {error}
            </p>
          ) : null}
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
