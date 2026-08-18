import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowRight, ChevronDown, PartyPopper } from "lucide-react";
import { Suspense, lazy, useCallback, useRef } from "react";

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

const springConfig = { stiffness: 180, damping: 22, mass: 0.6 };

export function HeroSection() {
  // Normalised mouse position  -0.5 → 0.5
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring-smoothed values so blobs glide rather than snap
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  // Each blob sits at a different "depth" — different multipliers give parallax
  const x1 = useTransform(smoothX, [-0.5, 0.5], [-70, 70]);
  const y1 = useTransform(smoothY, [-0.5, 0.5], [-55, 55]);

  const x2 = useTransform(smoothX, [-0.5, 0.5], [55, -55]);
  const y2 = useTransform(smoothY, [-0.5, 0.5], [-45, 45]);

  const x3 = useTransform(smoothX, [-0.5, 0.5], [-40, 40]);
  const y3 = useTransform(smoothY, [-0.5, 0.5], [35, -35]);

  // Shared mouse ref — stable object identity, updated every mousemove,
  // read by HeroCanvas's useFrame on every animation frame (no re-render needed)
  const mouseRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const { clientX, clientY, currentTarget } = e;
      const { width, height } = currentTarget.getBoundingClientRect();
      const nx = clientX / width - 0.5;
      const ny = clientY / height - 0.5;
      rawX.set(nx);
      rawY.set(ny);
      mouseRef.current.x = nx;
      mouseRef.current.y = ny;
    },
    [rawX, rawY]
  );

  return (
    <section
      id="hero"
      className="relative flex min-h-dvh flex-col overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
    >
      {/* Blob 1 — accent colour, left side */}
      <motion.div
        aria-hidden="true"
        className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
        style={{ x: x1, y: y1 }}
        animate={{
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 2 — hero-2 colour, right side */}
      <motion.div
        aria-hidden="true"
        className="absolute -right-32 top-1/2 h-[28rem] w-[28rem] rounded-full bg-grad-hero-2/15 blur-3xl"
        style={{ x: x2, y: y2 }}
        animate={{
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 3 — hero-3 colour, bottom-centre */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-16 left-1/3 h-72 w-72 rounded-full bg-grad-hero-3/10 blur-3xl"
        style={{ x: x3, y: y3 }}
        animate={{
          scale: [1, 1.25, 0.85, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Suspense fallback={null}>
          <HeroCanvas mouseRef={mouseRef} />
        </Suspense>
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pt-24 text-center sm:pt-28">
        <motion.h1
          className="text-5xl font-black uppercase leading-[0.9] tracking-tight text-text-primary sm:text-6xl md:text-7xl lg:text-[5.5rem]"
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
          className="group mt-14 inline-flex h-12 items-center gap-2 rounded-full bg-linear-to-r from-grad-hero-1 via-grad-hero-2 to-grad-hero-3 px-8 text-[11px] font-semibold uppercase tracking-[0.24em] text-background shadow-card transition-shadow hover:shadow-card-hover sm:h-14 sm:px-9 sm:text-sm"
        >
          GET THE APP
          <ChevronDown
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
          />
        </motion.a>
      </div>

      <div className="relative z-10 mt-auto border-t border-black/20 bg-black px-4 py-3">
        <a
          href="#events"
          className="group mx-auto flex w-fit items-center gap-2 rounded-full border border-border-muted bg-background/30 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-text-faint transition-colors hover:border-border-light hover:text-text-primary sm:px-6 sm:py-2.5 sm:text-sm"
        >
          <PartyPopper aria-hidden="true" className="h-3.5 w-3.5" />
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
