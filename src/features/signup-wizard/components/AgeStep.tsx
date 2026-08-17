import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useController, useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { calculateAge } from "@/lib/utils";
import { useWizard } from "../hooks/useWizard";
import { ageSchema, type AgeFields } from "../validators/age.schema";
import { StepFooter } from "./StepFooter";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 101 }, (_, i) =>
  String(CURRENT_YEAR - i),
);

export function AgeStep() {
  const { state, dispatch } = useWizard();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");

  const { control, handleSubmit, formState, trigger } = useForm<
    z.input<typeof ageSchema>,
    unknown,
    AgeFields
  >({
    resolver: zodResolver(ageSchema),
    mode: "onChange",
    defaultValues: { dateOfBirth: state.fields.dateOfBirth },
  });
  const { field } = useController({ name: "dateOfBirth", control });

  const monthIndex = MONTHS.indexOf(month);
  const yearNum = Number(year);
  const dayNum = Number(day);
  const complete = Boolean(month && day && year);
  const computedDate = complete
    ? new Date(yearNum, monthIndex, dayNum)
    : null;
  const isValidDate =
    computedDate !== null &&
    computedDate.getFullYear() === yearNum &&
    computedDate.getMonth() === monthIndex &&
    computedDate.getDate() === dayNum;
  const isoDate = isValidDate
    ? `${String(yearNum).padStart(4, "0")}-${String(monthIndex + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`
    : "";
  const age = isValidDate ? calculateAge(isoDate) : null;
  const maxDays =
    month && year
      ? new Date(yearNum, monthIndex + 1, 0).getDate()
      : 31;

  const syncDate = (m: string, d: string, y: string) => {
    if (!m || !d || !y) {
      field.onChange("");
      void trigger("dateOfBirth");
      return;
    }
    const idx = MONTHS.indexOf(m);
    const dayNumValue = Number(d);
    const yearNumValue = Number(y);
    const date = new Date(yearNumValue, idx, dayNumValue);
    const valid =
      date.getFullYear() === yearNumValue &&
      date.getMonth() === idx &&
      date.getDate() === dayNumValue;
    const iso = valid
      ? `${String(yearNumValue).padStart(4, "0")}-${String(idx + 1).padStart(2, "0")}-${String(dayNumValue).padStart(2, "0")}`
      : "";
    field.onChange(iso);
    void trigger("dateOfBirth");
  };

  const handleMonthChange = (value: string) => {
    setMonth(value);
    const max = value && year
      ? new Date(Number(year), MONTHS.indexOf(value) + 1, 0).getDate()
      : 31;
    const nextDay = day && Number(day) > max ? "" : day;
    setDay(nextDay);
    syncDate(value, nextDay, year);
  };

  const handleDayChange = (value: string) => {
    setDay(value);
    syncDate(month, value, year);
  };

  const handleYearChange = (value: string) => {
    setYear(value);
    const max = month && value
      ? new Date(Number(value), MONTHS.indexOf(month) + 1, 0).getDate()
      : 31;
    const nextDay = day && Number(day) > max ? "" : day;
    setDay(nextDay);
    syncDate(month, nextDay, value);
  };

  useEffect(() => {
    const iso = state.fields.dateOfBirth;
    if (!iso) return;
    const [y, m, d] = iso.split("-").map(Number);
    setYear(String(y));
    setMonth(MONTHS[m - 1] ?? "");
    setDay(String(d));
  }, [state.fields.dateOfBirth]);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const canContinue = complete && isValidDate && !formState.errors.dateOfBirth;
  const errorText = formState.errors.dateOfBirth?.message;

  const onValidSubmit = (values: AgeFields) => {
    dispatch({
      type: "SAVE_FIELD",
      field: "dateOfBirth",
      value: values.dateOfBirth,
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
          When were you born?
        </h2>
        <p className="mt-2 text-sm text-text-muted">
          You must be 18 or older to sign up.
        </p>
      </div>

      <form noValidate onSubmit={onSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-3">
            <Select
              label="Month"
              value={month}
              onChange={(event) => handleMonthChange(event.target.value)}
            >
              <option value="">Month</option>
              {MONTHS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </Select>

            <Select
              label="Day"
              value={day}
              onChange={(event) => handleDayChange(event.target.value)}
            >
              <option value="">Day</option>
              {Array.from({ length: maxDays }, (_, i) => (
                <option key={i + 1} value={String(i + 1)}>
                  {i + 1}
                </option>
              ))}
            </Select>

            <Select
              label="Year"
              value={year}
              onChange={(event) => handleYearChange(event.target.value)}
            >
              <option value="">Year</option>
              {YEAR_OPTIONS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </Select>
          </div>

          <div className="min-h-5">
            {age !== null ? (
              <p className="text-xs text-text-muted">
                You are {age} years old.
              </p>
            ) : (
              !complete && (
                <p className="text-xs text-text-muted">
                  Select your date of birth.
                </p>
              )
            )}
            {errorText && complete && (
              <p role="alert" className="mt-1 text-xs text-error-foreground">
                {errorText}
              </p>
            )}
          </div>
        </div>

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