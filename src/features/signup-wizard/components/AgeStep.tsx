import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  User,
} from "lucide-react";
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
  wizardFieldClass,
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

const AGE_PRESETS = [18, 21, 25, 30, 40];
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function AgeStep() {
  const { state, dispatch } = useWizard();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

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

  // Close calendar popover on outside click or Escape key
  useEffect(() => {
    if (!isCalendarOpen) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCalendarOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCalendarOpen]);

  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const earliestYear = currentYear - 120;
    const latestYear = currentYear;

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
    const totalDays = new Date(Number(activeYear), Number(activeMonth), 0).getDate();
    return Array.from({ length: totalDays }, (_, index) => index + 1);
  }, [activeMonth, activeYear]);

  // Grid calculation for interactive calendar view
  const calendarGrid = useMemo(() => {
    const firstDayOfWeek = new Date(Number(activeYear), Number(activeMonth) - 1, 1).getDay();
    const totalDays = new Date(Number(activeYear), Number(activeMonth), 0).getDate();
    return { firstDayOfWeek, totalDays };
  }, [activeMonth, activeYear]);

  // Synchronously compute active DOB string during render
  const activeDob = useMemo(() => {
    if (!selectedYear || !selectedMonth || !selectedDay) return dateOfBirth;
    const validDate = new Date(
      Number(selectedYear),
      Number(selectedMonth) - 1,
      Number(selectedDay),
    );
    if (Number.isNaN(validDate.getTime())) return dateOfBirth;
    return formatIsoDate(validDate);
  }, [selectedYear, selectedMonth, selectedDay, dateOfBirth]);

  useEffect(() => {
    if (activeDob && activeDob !== dateOfBirth) {
      setDateOfBirth(activeDob);
    }
  }, [activeDob, dateOfBirth]);

  const selectedAge = activeDob ? calculateAge(activeDob) : -1;
  const dobIsValid = activeDob.trim().length > 0 && selectedAge >= MIN_AGE;

  const ageError =
    activeDob.trim().length === 0
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
      value: activeDob,
    });
    dispatch({ type: "NEXT_STEP" });
  };

  const visibleDate = activeDob
    ? new Date(`${activeDob}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Select date of birth";

  const applyPresetAge = (ageYears: number) => {
    const targetDate = new Date();
    targetDate.setFullYear(targetDate.getFullYear() - ageYears);
    setSelectedYear(targetDate.getFullYear());
    setSelectedMonth(targetDate.getMonth() + 1);
    setSelectedDay(targetDate.getDate());
    setIsCalendarOpen(false);
  };

  const prevMonth = () => {
    if (!selectedMonth || !selectedYear) {
      const now = new Date();
      setSelectedYear(now.getFullYear() - MIN_AGE);
      setSelectedMonth(1);
      return;
    }
    if (Number(selectedMonth) === 1) {
      setSelectedMonth(12);
      setSelectedYear((y) => Number(y) - 1);
    } else {
      setSelectedMonth((m) => Number(m) - 1);
    }
  };

  const nextMonth = () => {
    if (!selectedMonth || !selectedYear) {
      const now = new Date();
      setSelectedYear(now.getFullYear() - MIN_AGE);
      setSelectedMonth(1);
      return;
    }
    if (Number(selectedMonth) === 12) {
      setSelectedMonth(1);
      setSelectedYear((y) => Number(y) + 1);
    } else {
      setSelectedMonth((m) => Number(m) + 1);
    }
  };

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

      <form noValidate onSubmit={onSubmit} className="mt-6 flex flex-col gap-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Date of Birth Picker Field */}
          <div>
            <label htmlFor="dateOfBirth" className={wizardLabelClass}>
              Date of birth
            </label>
            <div ref={calendarRef} className={wizardSelectWrapClass}>
              <button
                id="dateOfBirth"
                type="button"
                aria-label="Date of birth"
                aria-haspopup="dialog"
                aria-expanded={isCalendarOpen}
                onClick={() => setIsCalendarOpen((open) => !open)}
                className={`${wizardDateFieldClass} flex items-center justify-between gap-3 border transition-all duration-200 ${
                  isCalendarOpen
                    ? "border-accent/60 bg-surface/100 ring-2 ring-accent/20"
                    : "hover:border-white/25"
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <CalendarDays className="h-5 w-5 shrink-0 text-accent" />
                  <span className={activeDob ? "font-medium text-white" : "text-white/40"}>
                    {visibleDate}
                  </span>
                </div>
                {dobIsValid && (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                )}
              </button>

              {/* Premium Calendar Center Modal */}
              <AnimatePresence>
                {isCalendarOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
                    <motion.div
                      ref={calendarRef}
                      role="dialog"
                      aria-label="Date picker"
                      initial={{ opacity: 0, scale: 0.94, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.94, y: 10 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-[24px] border border-white/15 bg-[#121319]/98 p-5 sm:p-6 shadow-[0_25px_70px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
                    >
                      {/* Header: Quick Age Presets */}
                      <div className="mb-4">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/50">
                            Quick Presets
                          </span>
                          {selectedAge >= 0 && (
                            <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[0.7rem] font-bold text-accent">
                              {selectedAge} yrs old
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {AGE_PRESETS.map((preset) => (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => applyPresetAge(preset)}
                              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                                selectedAge === preset
                                  ? "bg-white text-black shadow-md scale-105"
                                  : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
                              }`}
                            >
                              {preset} yrs
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Day, Month & Year Selectors & Month Nav */}
                      <div className="mb-4 grid grid-cols-3 gap-2">
                        <div>
                          <label className="mb-1 block text-[0.7rem] font-medium uppercase tracking-[0.12em] text-white/55">
                            Day
                          </label>
                          <select
                            aria-label="Day"
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
                          <label className="mb-1 block text-[0.7rem] font-medium uppercase tracking-[0.12em] text-white/55">
                            Month
                          </label>
                          <select
                            aria-label="Month"
                            value={selectedMonth}
                            onChange={(event) => {
                              setSelectedMonth(Number(event.target.value) || "");
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
                          <label className="mb-1 block text-[0.7rem] font-medium uppercase tracking-[0.12em] text-white/55">
                            Year
                          </label>
                          <select
                            aria-label="Year"
                            value={selectedYear}
                            onChange={(event) => {
                              setSelectedYear(Number(event.target.value) || "");
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

                      {/* Month Nav Bar */}
                      <div className="mb-4 flex items-center justify-between border-y border-white/10 py-2">
                        <button
                          type="button"
                          onClick={prevMonth}
                          aria-label="Previous month"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/15 hover:text-white"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>

                        <span className="text-xs font-semibold text-white/80">
                          {selectedMonth && selectedYear
                            ? `${monthOptions.find((m) => m.value === Number(selectedMonth))?.label} ${selectedYear}`
                            : "Select Month & Year"}
                        </span>

                        <button
                          type="button"
                          onClick={nextMonth}
                          aria-label="Next month"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/15 hover:text-white"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Interactive Calendar Days Grid */}
                      <div className="mb-4">
                        <div className="mb-2 grid grid-cols-7 text-center">
                          {WEEKDAYS.map((day) => (
                            <span
                              key={day}
                              className="text-[0.68rem] font-bold uppercase tracking-wider text-white/40"
                            >
                              {day}
                            </span>
                          ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center">
                          {Array.from({ length: calendarGrid.firstDayOfWeek }).map((_, i) => (
                            <div key={`empty-${i}`} className="h-8" />
                          ))}

                          {Array.from({ length: calendarGrid.totalDays }).map((_, i) => {
                            const dayNum = i + 1;
                            const isSelected = Number(selectedDay) === dayNum;

                            return (
                              <button
                                key={dayNum}
                                type="button"
                                onClick={() => {
                                  if (!selectedYear) {
                                    setSelectedYear(new Date().getFullYear() - MIN_AGE);
                                  }
                                  if (!selectedMonth) {
                                    setSelectedMonth(1);
                                  }
                                  setSelectedDay(dayNum);
                                }}
                                className={`flex h-8 w-full items-center justify-center rounded-lg text-xs font-semibold transition-all ${
                                  isSelected
                                    ? "bg-white text-black shadow-md font-bold scale-105"
                                    : "text-white/80 hover:bg-white/15 hover:text-white"
                                }`}
                              >
                                {dayNum}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-3.5">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedDay("");
                            setSelectedMonth("");
                            setSelectedYear("");
                            setDateOfBirth("");
                          }}
                          className="text-xs font-medium text-white/50 transition-colors hover:text-white"
                        >
                          Reset
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (selectedYear && selectedMonth && !selectedDay) {
                              setSelectedDay(1);
                            }
                            setIsCalendarOpen(false);
                          }}
                          className="rounded-lg bg-accent px-5 py-2 text-xs font-bold text-white transition-all hover:bg-accent/90 shadow-md hover:scale-105 active:scale-95"
                        >
                          Done
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Calculated Age Field (Automatically Updated) */}
          <div>
            <label htmlFor="calculatedAge" className={wizardLabelClass}>
              Calculated Age
            </label>
            <div className="relative">
              <input
                id="calculatedAge"
                type="text"
                readOnly
                value={selectedAge >= 0 ? `${selectedAge} years old` : ""}
                placeholder="Age auto-calculated"
                className={`${wizardFieldClass} pr-12 cursor-default bg-surface/90 text-white font-medium placeholder:text-white/30 ${
                  dobIsValid ? "border-emerald-500/50" : ""
                }`}
              />
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-white/40">
                {dobIsValid ? (
                  <User className="h-5 w-5 text-emerald-400" />
                ) : (
                  <Sparkles className="h-5 w-5 text-white/30" />
                )}
              </div>
            </div>
          </div>
        </div>

        {ageError ? (
          <p role="alert" className={wizardFieldErrorClass}>
            {ageError}
          </p>
        ) : null}

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
