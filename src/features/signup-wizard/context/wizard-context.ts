import { createContext } from "react";
import type { Dispatch } from "react";
import type { WizardAction, WizardState } from "./wizardReducer";

export type WizardContextValue = {
  state: WizardState;
  dispatch: Dispatch<WizardAction>;
};

export const WizardContext = createContext<WizardContextValue | null>(null);