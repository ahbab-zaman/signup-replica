// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useReducer, type ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { MockApiError } from "@/lib/errors";
import { sendOtp, verifyOtp } from "@/lib/mock-api";
import { WizardContext } from "../../context/wizard-context";
import { initialWizardState, wizardReducer } from "../../context/wizardReducer";
import { useWizard } from "../../hooks/useWizard";
import { OtpStep } from "../OtpStep";

vi.mock("@/lib/mock-api", () => ({
  sendOtp: vi.fn(),
  verifyOtp: vi.fn(),
}));

const mockedSendOtp = vi.mocked(sendOtp);
const mockedVerifyOtp = vi.mocked(verifyOtp);

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  vi.useRealTimers();
});

function SeededWizardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wizardReducer, {
    ...initialWizardState,
    stepIndex: 1,
    fields: { ...initialWizardState.fields, email: "ada@example.com" },
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
      <OtpStep />
      <div data-testid="step-index">{state.stepIndex}</div>
    </div>
  );
}

function renderStep() {
  return render(
    <ToastProvider>
      <SeededWizardProvider>
        <Harness />
      </SeededWizardProvider>
    </ToastProvider>,
  );
}

function getDigitInputs() {
  return Array.from({ length: 6 }, (_, i) =>
    screen.getByRole("textbox", { name: `Digit ${i + 1} of 6` }),
  );
}

async function fillDigits(user: ReturnType<typeof userEvent.setup>) {
  const inputs = getDigitInputs();
  for (let i = 0; i < inputs.length; i += 1) {
    await user.type(inputs[i], String(i + 1));
  }
}

describe("OtpStep", () => {
  it("renders the heading, digit boxes, and a disabled Verify button", () => {
    renderStep();

    expect(
      screen.getByRole("heading", { name: "Enter OTP" }),
    ).toBeInTheDocument();
    expect(getDigitInputs()).toHaveLength(6);
    expect(screen.getByRole("button", { name: "Verify" })).toBeDisabled();
    expect(screen.getByRole("button", { name: /Back/i })).toBeInTheDocument();
    expect(screen.getByText(/Resend OTP in 30s/i)).toBeInTheDocument();
  });

  it("collects digits, marks filled boxes, and enables Verify once complete", async () => {
    const user = userEvent.setup();
    renderStep();

    await fillDigits(user);

    const inputs = getDigitInputs();
    expect(inputs[0]).toHaveValue("1");
    expect(inputs[5]).toHaveValue("6");
    expect(screen.getByRole("button", { name: "Verify" })).toBeEnabled();
  });

  it("verifies the code and advances to the next step", async () => {
    mockedVerifyOtp.mockResolvedValueOnce(undefined);
    const user = userEvent.setup();
    renderStep();

    await fillDigits(user);
    await user.click(screen.getByRole("button", { name: "Verify" }));

    expect(mockedVerifyOtp).toHaveBeenCalledWith("123456");
    await waitFor(() => {
      expect(screen.getByTestId("step-index")).toHaveTextContent("2");
    });
  });

  it("shows an inline error for an invalid code and stays on the step", async () => {
    mockedVerifyOtp.mockRejectedValueOnce(
      new MockApiError("INVALID_OTP", "That code isn't right. Check and try again."),
    );
    const user = userEvent.setup();
    renderStep();

    await fillDigits(user);
    await user.click(screen.getByRole("button", { name: "Verify" }));

    expect(
      await screen.findByText("That code isn't right. Check and try again."),
    ).toBeInTheDocument();
    expect(screen.getByTestId("step-index")).toHaveTextContent("1");
  });

  it("shows an inline error when the code has expired", async () => {
    mockedVerifyOtp.mockRejectedValueOnce(
      new MockApiError("OTP_EXPIRED", "This code has expired. Request a new one."),
    );
    const user = userEvent.setup();
    renderStep();

    await fillDigits(user);
    await user.click(screen.getByRole("button", { name: "Verify" }));

    expect(
      await screen.findByText("This code has expired. Request a new one."),
    ).toBeInTheDocument();
  });

  it("navigates back to the previous step", async () => {
    const user = userEvent.setup();
    renderStep();

    await user.click(screen.getByRole("button", { name: /Back/i }));

    expect(screen.getByTestId("step-index")).toHaveTextContent("0");
  });

  it("fills all boxes when a code is pasted", () => {
    renderStep();

    fireEvent.paste(getDigitInputs()[0], {
      clipboardData: { getData: () => "987654" },
    });

    const inputs = getDigitInputs();
    expect((inputs[0] as HTMLInputElement).value).toBe("9");
    expect((inputs[5] as HTMLInputElement).value).toBe("4");
    expect(screen.getByRole("button", { name: "Verify" })).toBeEnabled();
  });

  it("resends a code, shows the demo toast, and restarts the cooldown", async () => {
    vi.useFakeTimers();
    mockedSendOtp.mockResolvedValueOnce("654321");
    renderStep();

    act(() => {
      vi.advanceTimersByTime(30_000);
    });

    fireEvent.click(screen.getByRole("button", { name: "Resend OTP" }));

    await act(async () => {
      await Promise.resolve();
    });

    expect(mockedSendOtp).toHaveBeenCalledWith("ada@example.com");
    expect(screen.getByText("Demo OTP: 654321")).toBeInTheDocument();
    expect(screen.getByText(/Resend OTP in 30s/i)).toBeInTheDocument();
  });
});
