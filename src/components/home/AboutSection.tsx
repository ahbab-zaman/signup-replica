import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/home/Reveal";
import { WordReveal } from "@/components/home/WordReveal";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.7, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [64, 24]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-background px-4 py-28 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl text-center">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-widest text-text-muted">
            Welcome Extroverts
          </p>
        </Reveal>
        <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-tight text-text-primary sm:text-5xl">
          <WordReveal text="discover the nightlife, brunches, and hangouts of your city" />
        </h2>
      </div>

      <motion.div
        style={{
          scale: reduceMotion ? 1 : scale,
          borderRadius: reduceMotion ? 24 : borderRadius,
        }}
        className="relative mx-auto mt-20 h-[70vh] max-h-[720px] w-full max-w-6xl overflow-hidden bg-linear-to-br from-accent via-grad-hero-2 to-grad-dl-2"
      >
        <div className="absolute inset-0 bg-overlay/40" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="absolute -left-16 top-1/3 h-72 w-72 rounded-full bg-grad-hero-1/30 blur-3xl"
        />
        <div className="absolute inset-0 flex items-end p-8 sm:p-12">
          <p className="max-w-md text-lg text-text-primary/90 sm:text-xl">
            Every weekend starts here — the people, the music, the plan you
            didn't know you had.
          </p>
        </div>
      </motion.div>
    </section>
  );
}