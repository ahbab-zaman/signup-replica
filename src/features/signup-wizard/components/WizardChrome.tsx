import { type ReactNode } from "react";
import {
  wizardCenteredHeaderClass,
  wizardCenteredLogoClass,
  wizardHeaderClass,
  wizardLogoClass,
  wizardLogoDotClass,
  wizardPageClass,
  wizardPageInnerClass,
  wizardStatusClass,
} from "./wizardStyles";
import { useWizard } from "../hooks/useWizard";

function BrandMark({ centered = false }: { centered?: boolean }) {
  const logoClass = centered ? wizardCenteredLogoClass : wizardLogoClass;

  return (
    <span aria-label="Extroverts" className={logoClass}>
      E
      <span aria-hidden="true" className={wizardLogoDotClass}>
        &#8226;
      </span>
    </span>
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
