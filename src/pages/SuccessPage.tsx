import { MotionConfig, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { SUCCESS_REDIRECT_MS } from "@/lib/constants";

const REDIRECT_TICK_MS = 1_000;

export default function SuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = (location.state as { username?: string } | null)?.username;
  const [secondsLeft, setSecondsLeft] = useState(
    Math.round(SUCCESS_REDIRECT_MS / REDIRECT_TICK_MS),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, REDIRECT_TICK_MS);
    const timeout = setTimeout(() => {
      navigate("/home", { replace: true });
    }, SUCCESS_REDIRECT_MS);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <MotionConfig reducedMotion="user">
      <main className="flex min-h-screen items-center justify-center bg-background px-4 text-text-primary">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          aria-labelledby="success-heading"
          className="flex max-w-md flex-col items-center gap-6 text-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.15,
            }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-accent"
          >
            <Check
              className="h-8 w-8 text-accent-foreground"
              strokeWidth={3}
              aria-hidden="true"
            />
          </motion.div>

          <div className="space-y-2">
            <h1
              id="success-heading"
              className="text-2xl font-bold text-text-primary"
            >
              You're all set!
            </h1>
            <p className="text-sm text-text-muted">
              {username
                ? `Welcome, ${username}! Your account is ready.`
                : "Your account is ready."}{" "}
              Taking you to your dashboard&hellip;
            </p>
          </div>

          <Button
            onClick={() => navigate("/home", { replace: true })}
            className="w-full sm:w-auto"
          >
            Go to dashboard
          </Button>

          <p
            aria-live="polite"
            className="text-xs text-text-muted"
            data-testid="redirect-countdown"
          >
            Redirecting in {secondsLeft}s&hellip;
          </p>
        </motion.section>
      </main>
    </MotionConfig>
  );
}