import { useMemo, useReducer, type ReactNode } from "react";
import { WizardContext } from "./wizard-context";
import { initialWizardState, wizardReducer } from "./wizardReducer";

export function WizardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wizardReducer, initialWizardState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
}