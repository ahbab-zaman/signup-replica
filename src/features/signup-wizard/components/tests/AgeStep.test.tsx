// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
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

function renderStep() {
  return render(
    <SeededWizardProvider>
      <Harness />
    </SeededWizardProvider>,
  );
}

async function selectDate(
  user: ReturnType<typeof userEvent.setup>,
  iso: string,
) {
  const [y, m, d] = iso.split("-").map(Number);
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  await user.selectOptions(screen.getByLabelText("Month"), MONTHS[m - 1]);
  await user.selectOptions(screen.getByLabelText("Day"), String(d));
  await user.selectOptions(screen.getByLabelText("Year"), String(y));
}

describe("AgeStep", () => {
  it("renders the month/day/year selects and a disabled Continue button", () => {
    renderStep();

    expect(
      screen.getByRole("heading", { name: "When were you born?" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Month")).toBeInTheDocument();
    expect(screen.getByLabelText("Day")).toBeInTheDocument();
    expect(screen.getByLabelText("Year")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();
    expect(screen.getByRole("button", { name: /Back/i })).toBeInTheDocument();
  });

  it("computes the age and enables Continue for an 18+ date of birth", async () => {
    const user = userEvent.setup();
    renderStep();

    await selectDate(user, "2000-01-15");

    expect(
      await screen.findByText(/You are \d+ years old/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue" })).toBeEnabled();
  });

  it("shows an inline error and keeps Continue disabled for an under-18 date of birth", async () => {
    const user = userEvent.setup();
    renderStep();

    await selectDate(user, "2015-06-10");

    expect(
      await screen.findByText("You must be 18 or older to sign up"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();
  });

  it("saves the date of birth and advances to the next step", async () => {
    const user = userEvent.setup();
    renderStep();

    await selectDate(user, "2000-01-15");
    await screen.findByText(/You are \d+ years old/i);
    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(screen.getByTestId("dob")).toHaveTextContent("2000-01-15");
    expect(screen.getByTestId("step-index")).toHaveTextContent("5");
  });

  it("navigates back to the previous step", async () => {
    const user = userEvent.setup();
    renderStep();

    await user.click(screen.getByRole("button", { name: /Back/i }));

    expect(screen.getByTestId("step-index")).toHaveTextContent("3");
  });
});