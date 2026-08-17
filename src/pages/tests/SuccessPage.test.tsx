// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SUCCESS_REDIRECT_MS } from "@/lib/constants";
import { clearSessionUser } from "@/lib/session";
import SuccessPage from "@/pages/SuccessPage";

function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

function renderPage(pathname = "/success") {
  return render(
    <MemoryRouter
      initialEntries={[{ pathname, state: { username: "cool_user1" } }]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <SuccessPage />
      <LocationDisplay />
    </MemoryRouter>,
  );
}

describe("SuccessPage", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.useRealTimers();
    clearSessionUser();
  });

  it("renders the confirmation with the username and a dashboard button", () => {
    renderPage();

    expect(
      screen.getByRole("heading", { name: "You're all set!" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Welcome, cool_user1!/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Go to dashboard" }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("redirect-countdown")).toHaveTextContent(
      `Redirecting in ${SUCCESS_REDIRECT_MS / 1000}s`,
    );
  });

  it("redirects to /home after the configured delay", () => {
    vi.useFakeTimers();
    renderPage();

    act(() => {
      vi.advanceTimersByTime(SUCCESS_REDIRECT_MS);
    });

    expect(screen.getByTestId("location")).toHaveTextContent("/");
  });

  it("decrements the countdown every second", () => {
    vi.useFakeTimers();
    renderPage();

    expect(screen.getByTestId("redirect-countdown")).toHaveTextContent(
      `Redirecting in ${SUCCESS_REDIRECT_MS / 1000}s`,
    );

    act(() => {
      vi.advanceTimersByTime(1_000);
    });

    expect(screen.getByTestId("redirect-countdown")).toHaveTextContent(
      `Redirecting in ${SUCCESS_REDIRECT_MS / 1000 - 1}s`,
    );
  });

  it("navigates to /home immediately when the button is clicked", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(
      screen.getByRole("button", { name: "Go to dashboard" }),
    );

    expect(screen.getByTestId("location")).toHaveTextContent("/");
  });
});
