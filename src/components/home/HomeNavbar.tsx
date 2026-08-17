import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronDown,
  Home,
  LogOut,
  Menu,
  UserRound,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { clearSessionUser } from "@/lib/session";
import { useSessionUser } from "@/hooks/useSessionUser";

const NAV_LINKS = [
  { label: "Events", href: "#events" },
  { label: "Download", href: "#download" },
  { label: "Story", href: "#story" },
  { label: "Team", href: "#features" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const BAR_DURATIONS = [0.6, 0.8, 0.5, 0.7];
const BAR_DELAYS = [0.1, 0, 0.25, 0.05];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function EqualizerBars({ playing }: { playing: boolean }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion || !playing) {
    return (
      <span className="flex h-4 items-end gap-0.5" aria-hidden="true">
        {BAR_DURATIONS.map((_, index) => (
          <span key={index} className="h-2 w-0.5 rounded-full bg-icon-strong" />
        ))}
      </span>
    );
  }

  return (
    <span className="flex h-4 items-end gap-0.5" aria-hidden="true">
      {BAR_DURATIONS.map((duration, index) => (
        <motion.span
          key={index}
          className="w-0.5 origin-bottom rounded-full bg-icon-strong"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{
            duration,
            delay: BAR_DELAYS[index],
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
}

function UserMenu() {
  const navigate = useNavigate();
  const user = useSessionUser();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (!user) {
    return (
      <button
        type="button"
        onClick={() => navigate("/signup")}
        className="flex h-11 items-center rounded-full border border-border px-4 text-xs font-semibold uppercase tracking-widest text-text-secondary transition-colors hover:border-border-light hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
      >
        Sign in
      </button>
    );
  }

  const initials = getInitials(user.name || user.username);

  const handleLogout = () => {
    setOpen(false);
    clearSessionUser();
    navigate("/signup");
  };

  const goTo = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Open account menu"
        className="flex h-11 items-center gap-2 rounded-full border border-border bg-surface-secondary pl-1 pr-2 transition-colors hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-grad-hero-1 to-grad-dl-2 text-xs font-bold text-background">
          {initials}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-4 w-4 text-icon-muted transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            aria-label="Account menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-border bg-surface/95 p-2 shadow-popover backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 rounded-xl p-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-grad-hero-1 to-grad-dl-2 text-sm font-bold text-background">
                {initials}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-text-primary">
                  {user.name}
                </p>
                <p className="truncate text-xs text-text-muted">
                  @{user.username}
                </p>
              </div>
            </div>

            <div className="my-1 h-px bg-border-muted" />

            <button
              type="button"
              onClick={() => goTo("/profile")}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-secondary transition-colors hover:bg-surface-secondary hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <UserRound aria-hidden="true" className="h-4 w-4 text-icon-muted" />
              My profile
            </button>
            <button
              type="button"
              onClick={() => goTo("/home")}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-secondary transition-colors hover:bg-surface-secondary hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <Home aria-hidden="true" className="h-4 w-4 text-icon-muted" />
              Home
            </button>

            <div className="my-1 h-px bg-border-muted" />

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-error transition-colors hover:bg-error-light focus:outline-none focus:ring-2 focus:ring-error"
            >
              <LogOut aria-hidden="true" className="h-4 w-4" />
              Log out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function HomeNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  return (
    <div className="fixed inset-x-4 top-4 z-30 sm:inset-x-6">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between rounded-2xl border border-border bg-surface/80 px-4 backdrop-blur-xl">
        <a
          href="#hero"
          aria-label="Extroverts home"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-grad-hero-1 to-grad-dl-2 text-background"
        >
          <Zap aria-hidden="true" className="h-5 w-5" />
        </a>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
          className="absolute left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-lg text-icon-strong transition-colors hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent md:hidden"
        >
          {menuOpen ? (
            <X aria-hidden="true" className="h-5 w-5" />
          ) : (
            <Menu aria-hidden="true" className="h-5 w-5" />
          )}
        </button>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-[11px] font-medium uppercase tracking-widest text-text-faint transition-colors hover:text-text-primary after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-text-primary after:transition-all after:duration-200 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-pressed={soundOn}
            aria-label={
              soundOn ? "Mute background music" : "Play background music"
            }
            onClick={() => setSoundOn((on) => !on)}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-icon-strong transition-colors hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <EqualizerBars playing={soundOn} />
          </button>
          <UserMenu />
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-2xl border border-border bg-surface/90 p-3 backdrop-blur-xl md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-xs font-medium uppercase tracking-widest text-text-secondary transition-colors hover:bg-surface-secondary hover:text-text-primary"
              >
                {link.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}