import { useContext } from "react";
import {
  WizardContext,
  type WizardContextValue,
} from "../context/wizard-context";

export function useWizard(): WizardContextValue {
  const ctx = useContext(WizardContext);
  if (!ctx) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return ctx;
}