// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useReducer, type ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { WizardContext } from "../../context/wizard-context";
import { initialWizardState, wizardReducer } from "../../context/wizardReducer";
import { useWizard } from "../../hooks/useWizard";
import { NameStep } from "../NameStep";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

function SeededWizardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wizardReducer, {
    ...initialWizardState,
    stepIndex: 3,
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
      <NameStep />
      <div data-testid="step-index">{state.stepIndex}</div>
      <div data-testid="name">{state.fields.name}</div>
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

describe("NameStep", () => {
  it("renders the name field and a disabled Continue button", () => {
    renderStep();

    expect(
      screen.getByRole("heading", { name: "What should we call you?" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();
    expect(screen.getByRole("button", { name: /Back/i })).toBeInTheDocument();
  });

  it("shows an inline error for a whitespace-only name and blocks Continue", async () => {
    const user = userEvent.setup();
    renderStep();

    const input = screen.getByLabelText("Name");
    await user.type(input, "   ");
    await user.tab();

    expect(await screen.findByText("Enter your name")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();
  });

  it("enables Continue once a name is entered", async () => {
    const user = userEvent.setup();
    renderStep();

    await user.type(screen.getByLabelText("Name"), "Ada Lovelace");
    await user.tab();

    expect(screen.getByRole("button", { name: "Continue" })).toBeEnabled();
  });

  it("saves the trimmed name and advances to the next step", async () => {
    const user = userEvent.setup();
    renderStep();

    await user.type(screen.getByLabelText("Name"), "  Ada Lovelace  ");
    await user.tab();
    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(screen.getByTestId("name")).toHaveTextContent("Ada Lovelace");
    expect(screen.getByTestId("step-index")).toHaveTextContent("4");
  });

  it("navigates back to the previous step", async () => {
    const user = userEvent.setup();
    renderStep();

    await user.click(screen.getByRole("button", { name: /Back/i }));

    expect(screen.getByTestId("step-index")).toHaveTextContent("2");
  });
});