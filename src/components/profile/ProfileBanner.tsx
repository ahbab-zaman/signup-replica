import { motion, useReducedMotion } from "framer-motion";
import { ImagePlus } from "lucide-react";
import { mockProfile } from "@/data/mock-profile";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ProfileBanner() {
  const reduceMotion = useReducedMotion();
  const { name, username, age, pronouns } = mockProfile;
  const initials = getInitials(name);

  const glyphMotion = {
    initial: reduceMotion ? undefined : { opacity: 0.4, scale: 1.06 },
    animate: reduceMotion ? undefined : { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" as const },
  };

  return (
    <header className="relative h-[380px] overflow-hidden bg-linear-to-b from-profile-banner-start via-profile-banner-start to-profile-banner-end sm:h-[440px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-text-primary/10"
        style={{
          maskImage:
            "radial-gradient(80% 60% at 50% 0%, black, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(80% 60% at 50% 0%, black, transparent 70%)",
        }}
      />

      <span
        className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-overlay/50 text-base font-bold text-text-primary backdrop-blur-sm"
        aria-hidden="true"
      >
        E
      </span>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-0.06em] right-2 flex select-none items-baseline justify-end leading-none tracking-[-0.06em] sm:right-8"
      >
        <motion.span
          className="font-bold text-banner-glyph"
          style={{ fontSize: "var(--font-size-banner-glyph)" }}
          {...glyphMotion}
        >
          {initials.charAt(0)}
        </motion.span>
        <motion.span
          className="font-bold text-banner-glyph"
          style={{
            fontSize: "var(--font-size-banner-glyph)",
            marginLeft: "-0.16em",
          }}
          {...glyphMotion}
        >
          {initials.charAt(1)}
        </motion.span>
      </div>

      <motion.div
        className="absolute bottom-6 left-4 z-10 sm:left-6"
        initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <h1 className="flex items-baseline gap-2 text-3xl font-bold text-text-primary">
          {name}
          <span className="text-lg font-normal text-text-muted">{age}</span>
        </h1>
        <p className="mt-1 flex items-baseline gap-2 text-sm font-semibold text-text-primary">
          @{username}
          <span className="text-xs font-normal text-text-muted">
            {pronouns}
          </span>
        </p>
      </motion.div>

      <button
        type="button"
        aria-label="Change banner photo"
        className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-lg bg-overlay/50 text-text-primary backdrop-blur-sm transition-colors hover:bg-overlay/70 focus:outline-none focus:ring-2 focus:ring-text-primary/60 sm:right-6"
      >
        <ImagePlus aria-hidden="true" className="h-5 w-5" />
      </button>

      <div
        aria-hidden="true"
        className="absolute bottom-4 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-text-primary"
      />
    </header>
  );
}