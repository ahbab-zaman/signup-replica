import { describe, expect, it } from "vitest";
import {
  initialWizardState,
  wizardReducer,
} from "../wizardReducer";

describe("wizardReducer", () => {
  it("advances the step with NEXT_STEP", () => {
    const state = wizardReducer(initialWizardState, { type: "NEXT_STEP" });
    expect(state.stepIndex).toBe(1);
    expect(state.direction).toBe(1);
  });

  it("clamps NEXT_STEP at the last step", () => {
    let state = initialWizardState;
    for (let i = 0; i < 10; i += 1) {
      state = wizardReducer(state, { type: "NEXT_STEP" });
    }
    expect(state.stepIndex).toBe(6);
  });

  it("goes back with PREV_STEP and never goes below 0", () => {
    const atStepTwo = wizardReducer(
      wizardReducer(initialWizardState, { type: "NEXT_STEP" }),
      { type: "NEXT_STEP" },
    );
    const back = wizardReducer(atStepTwo, { type: "PREV_STEP" });
    expect(back.stepIndex).toBe(1);
    expect(back.direction).toBe(-1);

    const atZero = wizardReducer(initialWizardState, { type: "PREV_STEP" });
    expect(atZero.stepIndex).toBe(0);
  });

  it("persists saved fields across navigation", () => {
    const withEmail = wizardReducer(initialWizardState, {
      type: "SAVE_FIELD",
      field: "email",
      value: "ada@example.com",
    });
    const next = wizardReducer(withEmail, { type: "NEXT_STEP" });
    const back = wizardReducer(next, { type: "PREV_STEP" });
    expect(back.fields.email).toBe("ada@example.com");
  });

  it("tracks OTP verification and submission status", () => {
    const verified = wizardReducer(initialWizardState, {
      type: "SET_OTP_VERIFIED",
      verified: true,
    });
    expect(verified.otpVerified).toBe(true);

    const submitting = wizardReducer(verified, {
      type: "SET_STATUS",
      status: "submitting",
    });
    expect(submitting.status).toBe("submitting");
  });

  it("resets to the initial state", () => {
    const advanced = wizardReducer(
      wizardReducer(initialWizardState, { type: "NEXT_STEP" }),
      { type: "SAVE_FIELD", field: "name", value: "Ada" },
    );
    const reset = wizardReducer(advanced, { type: "RESET" });
    expect(reset).toEqual(initialWizardState);
  });
});