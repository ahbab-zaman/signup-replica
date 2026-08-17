const FOOTER_LINKS = ["Privacy Policy", "Terms & Conditions", "Contact"];

export function SiteFooter() {
  return (
    <footer className="border-t border-border-muted bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm md:flex-row">
        <p className="text-text-faint">
          © {new Date().getFullYear()} Extroverts. All rights reserved.
        </p>
        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-6">
          {FOOTER_LINKS.map((label) => (
            <a
              key={label}
              href="#"
              className="text-text-muted transition-colors hover:text-text-primary"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}