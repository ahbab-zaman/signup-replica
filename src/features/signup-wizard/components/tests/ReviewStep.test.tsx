// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useReducer, type ReactNode } from "react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { submitSignup } from "@/lib/mock-api";
import { WizardContext } from "../../context/wizard-context";
import { initialWizardState, wizardReducer } from "../../context/wizardReducer";
import { useWizard } from "../../hooks/useWizard";
import { ReviewStep } from "../ReviewStep";

vi.mock("@/lib/mock-api", () => ({
  submitSignup: vi.fn(),
}));

const mockedSubmitSignup = vi.mocked(submitSignup);

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

const seededFields = {
  email: "ada@example.com",
  newsletter: true,
  username: "cool_user1",
  name: "Ada Lovelace",
  country: "US",
  state: "California",
  dateOfBirth: "2000-01-15",
  pronouns: "she/her",
  termsAccepted: false,
};

function SeededWizardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wizardReducer, {
    ...initialWizardState,
    stepIndex: 7,
    fields: seededFields,
  });

  return (
    <WizardContext.Provider value={{ state, dispatch }}>
      {children}
    </WizardContext.Provider>
  );
}

function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

function Harness() {
  const { state } = useWizard();
  return (
    <div>
      <ReviewStep />
      <div data-testid="step-index">{state.stepIndex}</div>
    </div>
  );
}

function renderStep() {
  return render(
    <MemoryRouter
      initialEntries={["/signup"]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <ToastProvider>
        <SeededWizardProvider>
          <Harness />
          <LocationDisplay />
        </SeededWizardProvider>
      </ToastProvider>
    </MemoryRouter>,
  );
}

describe("ReviewStep", () => {
  it("renders the terms block, unchecked checkbox, and disabled Sign up button", () => {
    renderStep();

    expect(
      screen.getByRole("heading", { name: "Almost there" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/By creating an account, you agree to our Terms/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /View full terms/i }),
    ).toHaveAttribute("href", "/terms");
    expect(
      screen.getByRole("checkbox", {
        name: /I agree to the Terms & Conditions/i,
      }),
    ).not.toBeChecked();
    expect(screen.getByRole("button", { name: "Sign up" })).toBeDisabled();
    expect(screen.getByRole("button", { name: /Back/i })).toBeInTheDocument();
  });

  it("enables Sign up once the terms are accepted", async () => {
    const user = userEvent.setup();
    renderStep();

    const signUp = screen.getByRole("button", { name: "Sign up" });
    expect(signUp).toBeDisabled();

    await user.click(
      screen.getByRole("checkbox", {
        name: /I agree to the Terms & Conditions/i,
      }),
    );

    expect(signUp).toBeEnabled();
  });

  it("submits the collected data and navigates to /success", async () => {
    const user = userEvent.setup();
    mockedSubmitSignup.mockResolvedValueOnce({ userId: "user_123" });
    renderStep();

    await user.click(
      screen.getByRole("checkbox", {
        name: /I agree to the Terms & Conditions/i,
      }),
    );
    await user.click(screen.getByRole("button", { name: "Sign up" }));

    expect(await screen.findByTestId("location")).toHaveTextContent(
      "/success",
    );
    expect(mockedSubmitSignup).toHaveBeenCalledTimes(1);
    expect(mockedSubmitSignup).toHaveBeenCalledWith({
      ...seededFields,
      termsAccepted: true,
    });
  });

  it("shows an error toast on failure, preserves data, and allows retry", async () => {
    const user = userEvent.setup();
    mockedSubmitSignup.mockRejectedValueOnce(new Error("network down"));
    renderStep();

    await user.click(
      screen.getByRole("checkbox", {
        name: /I agree to the Terms & Conditions/i,
      }),
    );
    await user.click(screen.getByRole("button", { name: "Sign up" }));

    expect(
      await screen.findByText("Couldn't create your account"),
    ).toBeInTheDocument();
    expect(mockedSubmitSignup).toHaveBeenCalledTimes(1);

    const signUp = screen.getByRole("button", { name: "Sign up" });
    expect(signUp).toBeEnabled();
    expect(
      screen.getByRole("checkbox", {
        name: /I agree to the Terms & Conditions/i,
      }),
    ).toBeChecked();
    expect(screen.getByTestId("step-index")).toHaveTextContent("7");
  });

  it("navigates back to the previous step", async () => {
    const user = userEvent.setup();
    renderStep();

    await user.click(screen.getByRole("button", { name: /Back/i }));

    expect(screen.getByTestId("step-index")).toHaveTextContent("6");
  });
});