// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import {
  cleanup,
  render,
  screen,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import HomePage from "@/pages/HomePage";
import { clearSessionUser, getSessionUser, setSessionUser } from "@/lib/session";

vi.mock("@/components/home/HeroCanvas", () => ({
  default: () => null,
}));

function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

function renderPage() {
  return render(
    <MemoryRouter
      initialEntries={["/home"]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <HomePage />
      <LocationDisplay />
    </MemoryRouter>,
  );
}

describe("HomePage", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    clearSessionUser();
  });

  it("renders the fixed navbar with nav links", () => {
    renderPage();

    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(nav).toBeInTheDocument();
    expect(within(nav).getByRole("link", { name: "Events" })).toBeInTheDocument();
    expect(
      within(nav).getByRole("link", { name: "Download" }),
    ).toBeInTheDocument();
    expect(
      within(nav).getByRole("link", { name: "Contact" }),
    ).toBeInTheDocument();
  });

  it("renders the hero heading and CTA", () => {
    renderPage();

    const heading = screen.getByRole("heading", { name: /No plans for/i });
    expect(heading).toBeInTheDocument();
    expect(screen.getByText(/Perfect/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Get the app/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/party vibe/i)).toBeInTheDocument();
  });

  it("renders the events marquee cards", () => {
    renderPage();

    expect(
      screen.getAllByRole("heading", {
        name: "Dancing Like Nobody's Judging",
      }),
    ).toHaveLength(2);
    expect(
      screen.getAllByText("The Basement, Mumbai").length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: "Join" }).length).toBeGreaterThan(
      0,
    );
  });

  it("renders the download section with platform buttons", () => {
    renderPage();

    expect(
      screen.getByRole("link", { name: /Download for Android/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Download for iOS/i }),
    ).toBeInTheDocument();
  });

  it("renders the story and contact sections", () => {
    renderPage();

    expect(screen.getByText("An app for extroverts")).toBeInTheDocument();
    expect(screen.getByText("Join Extroverts")).toBeInTheDocument();
    expect(screen.getAllByText("Contact us").length).toBeGreaterThan(0);
  });

  it("shows a Sign in button when there is no session", () => {
    clearSessionUser();
    renderPage();

    expect(
      screen.getByRole("button", { name: /Sign in/i }),
    ).toBeInTheDocument();
  });

  it("opens the user menu and navigates to the profile page", async () => {
    setSessionUser({ name: "tahmim ahmed", username: "tahmimahmed" });
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "Open account menu" }));
    await user.click(screen.getByRole("button", { name: /My profile/i }));

    expect(screen.getByTestId("location")).toHaveTextContent("/profile");
  });

  it("logs the user out and returns to /signup", async () => {
    setSessionUser({ name: "tahmim ahmed", username: "tahmimahmed" });
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "Open account menu" }));
    await user.click(screen.getByRole("button", { name: /Log out/i }));

    expect(getSessionUser()).toBeNull();
    expect(screen.getByTestId("location")).toHaveTextContent("/signup");
  });
});
