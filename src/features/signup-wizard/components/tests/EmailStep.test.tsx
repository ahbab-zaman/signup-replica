// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import {
  cleanup,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { sendOtp } from "@/lib/mock-api";
import { useWizard } from "../../hooks/useWizard";
import { WizardProvider } from "../../context/WizardProvider";
import { EmailStep } from "../EmailStep";

vi.mock("@/lib/mock-api", () => ({
  sendOtp: vi.fn(),
}));

const mockedSendOtp = vi.mocked(sendOtp);

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

function Harness() {
  const { state } = useWizard();
  return (
    <div>
      <EmailStep />
      <div data-testid="step-index">{state.stepIndex}</div>
    </div>
  );
}

function renderStep() {
  return render(
    <ToastProvider>
      <WizardProvider>
        <Harness />
      </WizardProvider>
    </ToastProvider>,
  );
}

describe("EmailStep", () => {
  it("renders the email field, newsletter checkbox, and Continue button", () => {
    renderStep();

    expect(
      screen.getByRole("heading", { name: "Your email" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Send me occasional product updates"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue" }),
    ).toBeDisabled();
  });

  it("shows an inline error for an invalid email and blocks submission", async () => {
    const user = userEvent.setup();
    renderStep();

    const emailInput = screen.getByLabelText("Email address");
    await user.type(emailInput, "not-an-email");
    await user.tab();

    expect(
      await screen.findByText("Enter a valid email address"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue" }),
    ).toBeDisabled();
  });

  it("sends an OTP, shows the demo code toast, and advances the step", async () => {
    mockedSendOtp.mockResolvedValueOnce("123456");
    const user = userEvent.setup();
    renderStep();

    await user.type(
      screen.getByLabelText("Email address"),
      "ada@example.com",
    );
    await user.tab();
    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(mockedSendOtp).toHaveBeenCalledWith("ada@example.com");
    expect(await screen.findByText("Demo OTP: 123456")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("step-index")).toHaveTextContent("1");
    });
  });

  it("shows an error toast and preserves data when sending fails", async () => {
    mockedSendOtp.mockRejectedValueOnce(new Error("network down"));
    const user = userEvent.setup();
    renderStep();

    await user.type(
      screen.getByLabelText("Email address"),
      "ada@example.com",
    );
    await user.tab();
    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(
      await screen.findByText("Couldn't send your code"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("step-index")).toHaveTextContent("0");
    expect(screen.getByLabelText("Email address")).toHaveValue(
      "ada@example.com",
    );
  });
});