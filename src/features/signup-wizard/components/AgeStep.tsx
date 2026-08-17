import { CalendarDays } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { MIN_AGE } from "@/lib/constants";
import { calculateAge } from "@/lib/utils";
import { useWizard } from "../hooks/useWizard";
import { StepFooter } from "./StepFooter";
import {
  wizardCalendarPanelClass,
  wizardCalendarSelectClass,
  wizardCopyClass,
  wizardDateFieldClass,
  wizardFieldErrorClass,
  wizardLabelClass,
  wizardPrimaryButtonClass,
  wizardSelectWrapClass,
  wizardStepClass,
  wizardTitleClass,
} from "./wizardStyles";

function formatIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function birthDateFromAge(age: number): string {
  const date = new Date();
  date.setFullYear(date.getFullYear() - age);
  return formatIsoDate(date);
}

export function AgeStep() {
  const { state, dispatch } = useWizard();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | "">("");
  const [selectedMonth, setSelectedMonth] = useState<number | "">("");
  const [selectedDay, setSelectedDay] = useState<number | "">("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    const savedDate = state.fields.dateOfBirth;
    if (savedDate) {
      const [year, month, day] = savedDate.split("-").map(Number);
      setDateOfBirth(savedDate);
      setSelectedYear(year);
      setSelectedMonth(month);
      setSelectedDay(day);
    } else {
      setDateOfBirth("");
      setSelectedYear("");
      setSelectedMonth("");
      setSelectedDay("");
    }
    headingRef.current?.focus();
  }, [state.fields.dateOfBirth]);

  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const earliestYear = currentYear - 120;
    const latestYear = currentYear - MIN_AGE;

    return Array.from(
      { length: latestYear - earliestYear + 1 },
      (_, index) => latestYear - index,
    );
  }, []);

  const monthOptions = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        value: index + 1,
        label: new Date(2000, index, 1).toLocaleString("en-US", {
          month: "long",
        }),
      })),
    [],
  );

  const activeYear = selectedYear || new Date().getFullYear() - MIN_AGE;
  const activeMonth = selectedMonth || 1;

  const dayOptions = useMemo(() => {
    const totalDays = new Date(activeYear, activeMonth, 0).getDate();
    return Array.from({ length: totalDays }, (_, index) => index + 1);
  }, [activeMonth, activeYear]);

  useEffect(() => {
    if (!selectedYear || !selectedMonth || !selectedDay) {
      return;
    }

    const validDate = new Date(selectedYear, selectedMonth - 1, selectedDay);
    if (Number.isNaN(validDate.getTime())) {
      return;
    }

    const isoDate = formatIsoDate(validDate);
    setDateOfBirth(isoDate);
    setIsCalendarOpen(false);
  }, [selectedDay, selectedMonth, selectedYear]);

  const selectedAge = dateOfBirth ? calculateAge(dateOfBirth) : -1;
  const dobIsValid = dateOfBirth.trim().length > 0 && selectedAge >= MIN_AGE;
  const minDob = birthDateFromAge(120);
  const maxDob = birthDateFromAge(MIN_AGE);
  const ageError =
    dateOfBirth.trim().length === 0
      ? undefined
      : selectedAge < 0
        ? "Select a valid date of birth"
        : selectedAge < MIN_AGE
          ? `You must be ${MIN_AGE} or older to sign up`
          : undefined;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!dobIsValid) return;
    dispatch({
      type: "SAVE_FIELD",
      field: "dateOfBirth",
      value: dateOfBirth,
    });
    dispatch({ type: "NEXT_STEP" });
  };

  const visibleDate = dateOfBirth
    ? new Date(`${dateOfBirth}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Select your date of birth";

  return (
    <section className={wizardStepClass}>
      <div>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className={wizardTitleClass + " focus:outline-none"}
        >
          What is your date of birth?
        </h2>
        <p className={wizardCopyClass}>
          We use your date of birth to verify you&apos;re eligible and keep the experience age-appropriate.
        </p>
      </div>

      <form noValidate onSubmit={onSubmit} className="mt-4 flex flex-col gap-6">
        <div>
          <label htmlFor="dateOfBirth" className={wizardLabelClass}>
            Date of birth
          </label>
          <div className={wizardSelectWrapClass}>
            <button
              id="dateOfBirth"
              type="button"
              aria-label="Date of birth"
              aria-haspopup="dialog"
              aria-expanded={isCalendarOpen}
              onClick={() => setIsCalendarOpen((open) => !open)}
              className={wizardDateFieldClass + " flex items-center justify-between gap-4"}
            >
              <span className={dateOfBirth ? "text-white" : "text-white/45"}>
                {visibleDate}
              </span>
              <CalendarDays className="h-5 w-5 shrink-0 text-white/35" />
            </button>

            {isCalendarOpen ? (
              <div className={wizardCalendarPanelClass} role="dialog" aria-label="Date picker">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="mb-2 block text-[0.7rem] font-medium uppercase tracking-[0.12em] text-white/55">
                      Day
                    </label>
                    <select
                      value={selectedDay}
                      onChange={(event) => setSelectedDay(Number(event.target.value) || "")}
                      className={wizardCalendarSelectClass}
                    >
                      <option value="">Day</option>
                      {dayOptions.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-[0.7rem] font-medium uppercase tracking-[0.12em] text-white/55">
                      Month
                    </label>
                    <select
                      value={selectedMonth}
                      onChange={(event) => {
                        setSelectedMonth(Number(event.target.value) || "");
                        setSelectedDay("");
                      }}
                      className={wizardCalendarSelectClass}
                    >
                      <option value="">Month</option>
                      {monthOptions.map((month) => (
                        <option key={month.value} value={month.value}>
                          {month.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-[0.7rem] font-medium uppercase tracking-[0.12em] text-white/55">
                      Year
                    </label>
                    <select
                      value={selectedYear}
                      onChange={(event) => {
                        setSelectedYear(Number(event.target.value) || "");
                        setSelectedDay("");
                      }}
                      className={wizardCalendarSelectClass}
                    >
                      <option value="">Year</option>
                      {yearOptions.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsCalendarOpen(false)}
                    className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-white/60 transition-colors hover:text-white"
                  >
                    Cancel
                  </button>
                  <div className="text-right text-[0.68rem] uppercase tracking-[0.12em] text-white/45">
                    {selectedAge >= 0 ? `${selectedAge} yrs` : "Age pending"}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {ageError ? (
            <p role="alert" className={wizardFieldErrorClass}>
              {ageError}
            </p>
          ) : null}
        </div>

        <StepFooter
          onBack={() => dispatch({ type: "PREV_STEP" })}
          primary={
            <button
              type="submit"
              aria-label="Continue"
              disabled={!dobIsValid}
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
