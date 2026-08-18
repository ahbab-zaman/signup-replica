import { MotionConfig, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { SUCCESS_REDIRECT_MS } from "@/lib/constants";
import { setSessionUser } from "@/lib/session";

const REDIRECT_TICK_MS = 1_000;

export default function SuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { username?: string; name?: string } | null;
  const username = state?.username;
  const [secondsLeft, setSecondsLeft] = useState(
    Math.round(SUCCESS_REDIRECT_MS / REDIRECT_TICK_MS),
  );

  useEffect(() => {
    if (!username) return;
    setSessionUser({ username, name: state?.name ?? username });
  }, [username, state?.name]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, REDIRECT_TICK_MS);
    const timeout = setTimeout(() => {
      navigate("/", { replace: true });
    }, SUCCESS_REDIRECT_MS);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-background px-4 py-8 text-text-primary sm:px-6 lg:px-8">
        {/* Ambient background glow elements matching Hero/Signup palette */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-1/2 h-[26rem] w-[26rem] rounded-full bg-grad-hero-2/15 blur-3xl"
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 40, -30, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-10 left-1/3 h-72 w-72 rounded-full bg-grad-hero-3/10 blur-3xl"
          animate={{
            x: [0, 30, -40, 0],
            y: [0, -30, 40, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Brand Header */}
        <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between pt-2">
          <span aria-label="Extroverts" className="select-none font-serif text-4xl font-black leading-none tracking-[-0.08em] text-white sm:text-5xl">
            E
            <span aria-hidden="true" className="ml-0.5 inline-block align-top text-[0.42em] leading-none text-accent-light">
              &#8226;
            </span>
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
            Account Ready
          </span>
        </header>

        {/* Main Content Card */}
        <div className="relative z-10 flex flex-1 items-center justify-center py-12">
          <motion.section
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            aria-labelledby="success-heading"
            className="relative flex w-full max-w-md flex-col items-center gap-6 overflow-hidden rounded-[24px] border border-white/12 bg-surface/80 p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-10"
          >
            {/* Top gradient highlight strip */}
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-grad-hero-1 via-grad-hero-2 to-grad-hero-3" />

            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 16,
                delay: 0.15,
              }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-tr from-accent via-accent-dark to-grad-hero-2 p-0.5 shadow-[0_0_35px_rgba(87,36,255,0.45)]"
            >
              <div className="flex h-full w-full items-center justify-center rounded-full bg-background/40 backdrop-blur-xs">
                <Check
                  className="h-9 w-9 text-white"
                  strokeWidth={3}
                  aria-hidden="true"
                />
              </div>
            </motion.div>

            <div className="space-y-3">
              <h1
                id="success-heading"
                className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
              >
                You're all set!
              </h1>
              <p className="text-base text-white/80 leading-relaxed">
                {username
                  ? `Welcome, ${username}! Your account is ready.`
                  : "Your account is ready."}{" "}
                Taking you to your dashboard&hellip;
              </p>
            </div>

            <div className="w-full space-y-4 pt-2">
              <Button
                onClick={() => navigate("/", { replace: true })}
                className="h-13 w-full rounded-xl bg-linear-to-r from-grad-hero-1 via-grad-hero-2 to-grad-hero-3 font-semibold uppercase tracking-[0.14em] text-background shadow-card transition-all duration-200 hover:opacity-95 hover:shadow-card-hover"
              >
                Go to dashboard
              </Button>

              <p
                aria-live="polite"
                className="text-xs font-medium tracking-wide text-white/50"
                data-testid="redirect-countdown"
              >
                Redirecting in {secondsLeft}s&hellip;
              </p>
            </div>
          </motion.section>
        </div>

        {/* Footer info */}
        <footer className="relative z-10 mx-auto w-full max-w-5xl text-center text-xs text-white/30">
          Extroverts &copy; {new Date().getFullYear()} &bull; All rights reserved
        </footer>
      </main>
    </MotionConfig>
  );
}
