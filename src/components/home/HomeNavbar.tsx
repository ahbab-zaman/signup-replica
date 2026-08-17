import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { useState } from "react";

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

        <button
          type="button"
          aria-pressed={soundOn}
          aria-label={soundOn ? "Mute background music" : "Play background music"}
          onClick={() => setSoundOn((on) => !on)}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-icon-strong transition-colors hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <EqualizerBars playing={soundOn} />
        </button>
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