// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useReducer, type ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { WizardContext } from "../../context/wizard-context";
import { initialWizardState, wizardReducer } from "../../context/wizardReducer";
import { useWizard } from "../../hooks/useWizard";
import { AgeStep } from "../AgeStep";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

function SeededWizardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wizardReducer, {
    ...initialWizardState,
    stepIndex: 4,
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
      <AgeStep />
      <div data-testid="step-index">{state.stepIndex}</div>
      <div data-testid="dob">{state.fields.dateOfBirth}</div>
    </div>
  );
}

function formatIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function yearsAgo(years: number): string {
  const date = new Date();
  date.setFullYear(date.getFullYear() - years);
  return formatIsoDate(date);
}

function renderStep() {
  return render(
    <SeededWizardProvider>
      <Harness />
    </SeededWizardProvider>,
  );
}

function openCalendar() {
  fireEvent.click(screen.getByRole("button", { name: "Date of birth" }));
}

function selectBirthDate(yearsAgoValue: number) {
  const date = new Date();
  date.setFullYear(date.getFullYear() - yearsAgoValue);

  openCalendar();
  fireEvent.change(screen.getByRole("combobox", { name: "Year" }), {
    target: { value: String(date.getFullYear()) },
  });
  fireEvent.change(screen.getByRole("combobox", { name: "Month" }), {
    target: { value: String(date.getMonth() + 1) },
  });
  fireEvent.change(screen.getByRole("combobox", { name: "Day" }), {
    target: { value: String(date.getDate()) },
  });
}

describe("AgeStep", () => {
  it("renders the date of birth field and a disabled Continue button", () => {
    renderStep();

    expect(
      screen.getByRole("heading", {
        name: "What is your date of birth?",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Date of birth" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();
    expect(screen.getByRole("button", { name: /Back/i })).toBeInTheDocument();
  });

  it("enables Continue for an 18+ date of birth", () => {
    renderStep();

    selectBirthDate(18);

    expect(screen.getByRole("button", { name: "Continue" })).toBeEnabled();
  });

  it("shows an inline error and keeps Continue disabled for an under-18 date of birth", () => {
    renderStep();

    selectBirthDate(17);

    expect(screen.getByText("You must be 18 or older to sign up")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();
  });

  it("saves a derived date of birth and advances to the next step", async () => {
    const user = userEvent.setup();
    renderStep();

    selectBirthDate(18);
    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(screen.getByTestId("dob")).not.toBeEmptyDOMElement();
    expect(screen.getByTestId("step-index")).toHaveTextContent("5");
  });

  it("navigates back to the previous step", async () => {
    const user = userEvent.setup();
    renderStep();

    await user.click(screen.getByRole("button", { name: /Back/i }));

    expect(screen.getByTestId("step-index")).toHaveTextContent("3");
  });
});
