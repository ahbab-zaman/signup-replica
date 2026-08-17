import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AgeStep } from "./components/AgeStep";
import { WizardChrome } from "./components/WizardChrome";
import { EmailStep } from "./components/EmailStep";
import { NameStep } from "./components/NameStep";
import { OtpStep } from "./components/OtpStep";
import { PronounsStep } from "./components/PronounsStep";
import { ReviewStep } from "./components/ReviewStep";
import { UsernameStep } from "./components/UsernameStep";
import { useWizard } from "./hooks/useWizard";
import {
  wizardContentClass,
  wizardStepClass,
} from "./components/wizardStyles";

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
    <WizardChrome>
      <div className={wizardContentClass}>
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
            <div className={wizardStepClass}>
              <StepComponent />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </WizardChrome>
  );
}
