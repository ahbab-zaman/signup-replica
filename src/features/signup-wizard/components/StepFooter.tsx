import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import {
  wizardFooterClass,
  wizardSecondaryButtonClass,
} from "./wizardStyles";

type StepFooterProps = {
  onBack?: () => void;
  primary: ReactNode;
  backLabel?: string;
};

export function StepFooter({
  onBack,
  primary,
  backLabel = "Back",
}: StepFooterProps) {
  return (
    <div className={wizardFooterClass}>
      <div>{primary}</div>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className={wizardSecondaryButtonClass}
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          {backLabel}
        </button>
      )}
    </div>
  );
}
