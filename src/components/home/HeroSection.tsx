import { motion, type Variants } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Suspense, lazy } from "react";

const HeroCanvas = lazy(() => import("@/components/home/HeroCanvas"));

const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const heroLine: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-dvh flex-col overflow-hidden bg-background"
    >
      <div
        aria-hidden="true"
        className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-accent/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-32 top-1/2 h-[28rem] w-[28rem] rounded-full bg-grad-hero-2/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-16 left-1/3 h-72 w-72 rounded-full bg-grad-hero-3/10 blur-3xl"
      />

      <div className="absolute inset-0" aria-hidden="true">
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pt-28 text-center">
        <motion.h1
          className="text-5xl font-bold uppercase leading-[0.95] tracking-tight text-text-primary sm:text-6xl lg:text-7xl"
          initial="hidden"
          animate="visible"
          variants={heroContainer}
        >
          <motion.span variants={heroLine} className="block">
            No plans for
          </motion.span>
          <motion.span variants={heroLine} className="block">
            the night?
          </motion.span>
          <motion.span
            variants={heroLine}
            className="mt-3 block bg-linear-to-r from-grad-hero-1 via-grad-hero-2 to-grad-hero-3 bg-clip-text text-transparent"
          >
            Perfect<span className="text-highlight">!</span>
          </motion.span>
        </motion.h1>

        <motion.a
          href="#download"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.4, ease: "easeOut" }}
          whileHover={{ y: 2 }}
          whileTap={{ scale: 0.98 }}
          className="group mt-14 inline-flex h-14 items-center gap-2 rounded-full bg-linear-to-r from-grad-hero-1 via-grad-hero-2 to-grad-hero-3 px-9 text-sm font-semibold uppercase tracking-widest text-background shadow-card transition-shadow hover:shadow-card-hover"
        >
          Get the app
          <ChevronDown
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
          />
        </motion.a>
      </div>

      <div className="relative z-10 mt-auto border-t border-border-muted bg-background/60 px-4 py-5 backdrop-blur-sm">
        <a
          href="#events"
          className="group mx-auto flex w-fit items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm text-text-secondary transition-colors hover:border-border-light hover:text-text-primary"
        >
          <span aria-hidden="true">🎉</span>
          <span>What's your party vibe?</span>
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          />
        </a>
      </div>
    </section>
  );
}