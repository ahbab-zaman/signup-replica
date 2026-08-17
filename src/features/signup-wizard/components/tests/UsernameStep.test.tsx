// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useReducer, type ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { checkUsernameAvailable } from "@/lib/mock-api";
import { WizardContext } from "../../context/wizard-context";
import { initialWizardState, wizardReducer } from "../../context/wizardReducer";
import { useWizard } from "../../hooks/useWizard";
import { UsernameStep } from "../UsernameStep";

vi.mock("@/lib/mock-api", () => ({
  checkUsernameAvailable: vi.fn(),
}));

const mockedCheck = vi.mocked(checkUsernameAvailable);

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

function SeededWizardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wizardReducer, {
    ...initialWizardState,
    stepIndex: 2,
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
      <UsernameStep />
      <div data-testid="step-index">{state.stepIndex}</div>
      <div data-testid="username">{state.fields.username}</div>
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

describe("UsernameStep", () => {
  it("renders the username field, hint, and a disabled Continue button", () => {
    renderStep();

    expect(
      screen.getByRole("heading", { name: "Pick a username" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(
      screen.getByText("6+ characters. Letters, numbers, and underscores only."),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();
    expect(screen.getByRole("button", { name: /Back/i })).toBeInTheDocument();
  });

  it("shows an inline error for a username shorter than 6 characters", async () => {
    const user = userEvent.setup();
    renderStep();

    await user.type(screen.getByLabelText("Username"), "abc");

    expect(
      await screen.findByText("At least 6 characters"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();
  });

  it("rejects characters other than letters, numbers, and underscores", async () => {
    const user = userEvent.setup();
    renderStep();

    await user.type(screen.getByLabelText("Username"), "hello world!");

    expect(
      await screen.findByText("Letters, numbers, and underscores only"),
    ).toBeInTheDocument();
  });

  it("checks availability and enables Continue when the username is free", async () => {
    mockedCheck.mockResolvedValue(true);
    const user = userEvent.setup();
    renderStep();

    await user.type(screen.getByLabelText("Username"), "cool_user1");

    expect(await screen.findByText("Username available")).toBeInTheDocument();
    expect(mockedCheck).toHaveBeenCalledWith("cool_user1");
    expect(screen.getByRole("button", { name: "Continue" })).toBeEnabled();
  });

  it("disables Continue when the username is taken", async () => {
    mockedCheck.mockResolvedValue(false);
    const user = userEvent.setup();
    renderStep();

    await user.type(screen.getByLabelText("Username"), "admin12");

    expect(
      await screen.findByText("That username is taken"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();
  });

  it("saves the username and advances when the user continues", async () => {
    mockedCheck.mockResolvedValue(true);
    const user = userEvent.setup();
    renderStep();

    await user.type(screen.getByLabelText("Username"), "cool_user1");
    await screen.findByText("Username available");
    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(screen.getByTestId("username")).toHaveTextContent("cool_user1");
    expect(screen.getByTestId("step-index")).toHaveTextContent("3");
  });

  it("navigates back to the previous step", async () => {
    const user = userEvent.setup();
    renderStep();

    await user.click(screen.getByRole("button", { name: /Back/i }));

    expect(screen.getByTestId("step-index")).toHaveTextContent("1");
  });
});