import { type ReactNode } from "react";
import { Zap } from "lucide-react";
import { Link } from "react-router-dom";
import {
  wizardCenteredHeaderClass,
  wizardHeaderClass,
  wizardPageClass,
  wizardPageInnerClass,
  wizardStatusClass,
} from "./wizardStyles";
import { useWizard } from "../hooks/useWizard";

function BrandMark({ centered = false }: { centered?: boolean }) {
  return (
    <Link
      to="/"
      aria-label="Extroverts home"
      className={`group flex items-center justify-center rounded-xl bg-linear-to-br from-grad-hero-1 to-grad-dl-2 text-background shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent ${
        centered ? "h-12 w-12 sm:h-14 sm:w-14" : "h-10 w-10 sm:h-11 sm:w-11"
      }`}
    >
      <Zap
        aria-hidden="true"
        className={`fill-current text-background transition-transform duration-200 group-hover:scale-110 ${
          centered ? "h-7 w-7" : "h-5 w-5 sm:h-6 sm:w-6"
        }`}
      />
    </Link>
  );
}

export function WizardChrome({ children }: { children: ReactNode }) {
  const { state } = useWizard();
  const showStatus = state.stepIndex > 1;
  const centeredLogo = state.stepIndex === 1;

  return (
    <div className={wizardPageClass}>
      <div className={wizardPageInnerClass}>
        {centeredLogo ? (
          <header className={wizardCenteredHeaderClass}>
            <BrandMark centered />
          </header>
        ) : (
          <header className={wizardHeaderClass}>
            <BrandMark />
            {showStatus ? <div className={wizardStatusClass}>Getting ready</div> : <span />}
          </header>
        )}

        {children}
      </div>
    </div>
  );
}

