// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useReducer, type ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { WizardContext } from "../../context/wizard-context";
import { initialWizardState, wizardReducer } from "../../context/wizardReducer";
import { useWizard } from "../../hooks/useWizard";
import { PronounsStep } from "../PronounsStep";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

function SeededWizardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wizardReducer, {
    ...initialWizardState,
    stepIndex: 5,
  });

  return (
    <WizardContext.Provider value={{ state, dispatch }}>
      {children}
    </WizardContext.Provider>
  );
}

function Harness() {
  const { state } = useWizard();
  return (
    <div>
      <PronounsStep />
      <div data-testid="step-index">{state.stepIndex}</div>
      <div data-testid="pronouns">{state.fields.pronouns}</div>
    </div>
  );
}

function renderStep() {
  return render(
    <SeededWizardProvider>
      <Harness />
    </SeededWizardProvider>,
  );
}

describe("PronounsStep", () => {
  it("renders the combobox and a disabled Continue button", () => {
    renderStep();

    expect(
      screen.getByRole("heading", { name: "Your pronouns" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Pronouns" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();
    expect(screen.getByRole("button", { name: /Back/i })).toBeInTheDocument();
  });

  it("selecting an option from the dropdown fills the field and enables Continue", async () => {
    const user = userEvent.setup();
    renderStep();

    const combobox = screen.getByRole("combobox", { name: "Pronouns" });
    await user.click(combobox);

    await user.click(screen.getByRole("option", { name: "she/her" }));

    expect(combobox).toHaveValue("she/her");
    expect(screen.getByRole("button", { name: "Continue" })).toBeEnabled();
  });

  it("allows typing a custom pronoun and saves it on Continue", async () => {
    const user = userEvent.setup();
    renderStep();

    await user.type(
      screen.getByRole("combobox", { name: "Pronouns" }),
      "ze/zir",
    );

    expect(screen.getByRole("button", { name: "Continue" })).toBeEnabled();
    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(screen.getByTestId("pronouns")).toHaveTextContent("ze/zir");
    expect(screen.getByTestId("step-index")).toHaveTextContent("6");
  });

  it("shows an inline error for whitespace-only input and blocks Continue", async () => {
    const user = userEvent.setup();
    renderStep();

    await user.type(
      screen.getByRole("combobox", { name: "Pronouns" }),
      "   ",
    );

    expect(
      await screen.findByText("Select your pronouns"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();
  });

  it("navigates back to the previous step", async () => {
    const user = userEvent.setup();
    renderStep();

    await user.click(screen.getByRole("button", { name: /Back/i }));

    expect(screen.getByTestId("step-index")).toHaveTextContent("4");
  });
});