import type { WizardFields, WizardStatus } from "../types";

export const TOTAL_STEPS = 8;

export type WizardState = {
  stepIndex: number;
  direction: 1 | -1;
  fields: WizardFields;
  otpVerified: boolean;
  status: WizardStatus;
};

export type SaveFieldAction = {
  [K in keyof WizardFields]: {
    type: "SAVE_FIELD";
    field: K;
    value: WizardFields[K];
  };
}[keyof WizardFields];

export type WizardAction =
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "GO_TO_STEP"; stepIndex: number }
  | SaveFieldAction
  | { type: "SET_OTP_VERIFIED"; verified: boolean }
  | { type: "SET_STATUS"; status: WizardStatus }
  | { type: "RESET" };

export const initialWizardState: WizardState = {
  stepIndex: 0,
  direction: 1,
  fields: {
    email: "",
    newsletter: false,
    username: "",
    name: "",
    country: "",
    state: "",
    dateOfBirth: "",
    pronouns: "",
    termsAccepted: false,
  },
  otpVerified: false,
  status: "idle",
};

function clampStep(step: number): number {
  return Math.min(Math.max(step, 0), TOTAL_STEPS - 1);
}

export function wizardReducer(
  state: WizardState,
  action: WizardAction,
): WizardState {
  switch (action.type) {
    case "NEXT_STEP":
      return { ...state, direction: 1, stepIndex: clampStep(state.stepIndex + 1) };
    case "PREV_STEP":
      return { ...state, direction: -1, stepIndex: clampStep(state.stepIndex - 1) };
    case "GO_TO_STEP":
      return {
        ...state,
        direction: action.stepIndex >= state.stepIndex ? 1 : -1,
        stepIndex: clampStep(action.stepIndex),
      };
    case "SAVE_FIELD":
      return { ...state, fields: { ...state.fields, [action.field]: action.value } };
    case "SET_OTP_VERIFIED":
      return { ...state, otpVerified: action.verified };
    case "SET_STATUS":
      return { ...state, status: action.status };
    case "RESET":
      return initialWizardState;
    default:
      return state;
  }
}