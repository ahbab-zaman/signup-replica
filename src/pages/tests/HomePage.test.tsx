// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import HomePage from "@/pages/HomePage";

vi.mock("@/components/home/HeroCanvas", () => ({
  default: () => null,
}));

function renderPage() {
  return render(<HomePage />);
}

describe("HomePage", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
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
      screen.getByRole("heading", { name: "Neon Nights Rooftop" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Skyline Rooftop").length).toBeGreaterThan(0);
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
});