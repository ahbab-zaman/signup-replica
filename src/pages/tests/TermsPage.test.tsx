// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import TermsPage from "@/pages/TermsPage";

function renderTermsPage() {
  return render(
    <MemoryRouter initialEntries={["/terms"]}>
      <Routes>
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/" element={<div data-testid="home-page">Home</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("TermsPage", () => {
  it("renders the heading and last updated date", () => {
    renderTermsPage();

    expect(
      screen.getByRole("heading", { name: "TERMS & CONDITIONS" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Last updated August 18, 2026")
    ).toBeInTheDocument();
  });

  it("renders all key sections from the design", () => {
    renderTermsPage();

    const sections = [
      "Acceptance of Terms",
      "Eligibility",
      "User Conduct",
      "Events & Meetups",
      "Intellectual Property",
      "Limitation of Liability",
      "Termination",
      "Contact Us",
    ];

    for (const sectionTitle of sections) {
      expect(
        screen.getByRole("heading", { name: sectionTitle })
      ).toBeInTheDocument();
    }
  });

  it("renders contact email link with mailto attribute", () => {
    renderTermsPage();

    const emailLink = screen.getByRole("link", { name: "legal@extroverts.app" });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute("href", "mailto:legal@extroverts.app");
  });

  it("renders back button that can navigate back", async () => {
    const user = userEvent.setup();
    renderTermsPage();

    const backLink = screen.getByRole("link", { name: "← Back" });
    expect(backLink).toBeInTheDocument();

    await user.click(backLink);
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });
});
