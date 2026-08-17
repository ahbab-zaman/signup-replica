// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import ProfilePage from "@/pages/ProfilePage";
import { mockProfile } from "@/data/mock-profile";
import { clearSessionUser } from "@/lib/session";

function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

function renderPage() {
  return render(
    <MemoryRouter
      initialEntries={["/profile"]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <ProfilePage />
      <LocationDisplay />
    </MemoryRouter>,
  );
}

describe("ProfilePage", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    clearSessionUser();
  });

  it("renders the identity block from mock profile data", () => {
    renderPage();

    expect(
      screen.getByRole("heading", { name: /tahmim ahmed/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("24").length).toBeGreaterThan(0);
    expect(screen.getByText(/@tahmimahmed/i)).toBeInTheDocument();
    expect(screen.getByText("him")).toBeInTheDocument();
  });

  it("renders the banner edit action", () => {
    renderPage();

    expect(
      screen.getByRole("button", { name: "Change banner photo" }),
    ).toBeInTheDocument();
  });

  it("navigates back to the home page from the banner", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "Go to home" }));

    expect(screen.getByTestId("location")).toHaveTextContent("/");
  });

  it("renders stats, bio, and actions below the banner", () => {
    renderPage();

    expect(screen.getByText("Events attended")).toBeInTheDocument();
    expect(screen.getByText("Connections")).toBeInTheDocument();
    expect(screen.getByText("Member since")).toBeInTheDocument();
    expect(screen.getByLabelText("Bio")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Edit Profile" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Settings" }),
    ).toBeInTheDocument();
  });

  it("shows the mock bio text", () => {
    renderPage();

    expect(screen.getByText(mockProfile.bio)).toBeInTheDocument();
  });
});
