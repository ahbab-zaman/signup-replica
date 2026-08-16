import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AgeStep } from "./components/AgeStep";
import { EmailStep } from "./components/EmailStep";
import { NameStep } from "./components/NameStep";
import { OtpStep } from "./components/OtpStep";
import { PronounsStep } from "./components/PronounsStep";
import { ReviewStep } from "./components/ReviewStep";
import { UsernameStep } from "./components/UsernameStep";
import { TOTAL_STEPS } from "./context/wizardReducer";
import { useWizard } from "./hooks/useWizard";

const STEP_COMPONENTS = [
  EmailStep,
  OtpStep,
  UsernameStep,
  NameStep,
  AgeStep,
  PronounsStep,
  ReviewStep,
];

const stepVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 32 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -32 }),
};

const reducedStepVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

export function SignupWizard() {
  const { state } = useWizard();
  const reduceMotion = useReducedMotion();

  const StepComponent = STEP_COMPONENTS[state.stepIndex];
  const variants = reduceMotion ? reducedStepVariants : stepVariants;

  return (
    <div className="w-full max-w-[30rem] rounded-xl border border-border bg-surface p-6 shadow-card sm:p-8">
      <StepProgress current={state.stepIndex} />

      <div className="mt-8">
        <AnimatePresence mode="wait" custom={state.direction} initial={false}>
          <motion.div
            key={state.stepIndex}
            custom={state.direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <StepComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function StepProgress({ current }: { current: number }) {
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={TOTAL_STEPS - 1}
      aria-valuenow={current}
      aria-label="Signup progress"
      className="flex items-center gap-1.5"
    >
      {Array.from({ length: TOTAL_STEPS }, (_, index) => (
        <span
          key={index}
          className={cn(
            "h-1.5 flex-1 rounded-full transition-colors duration-200",
            index <= current ? "bg-accent" : "bg-surface-secondary",
          )}
        />
      ))}
    </div>
  );
}