import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/home/Reveal";
import { SlidingTextButton } from "@/components/home/SlidingTextButton";
import { WordReveal } from "@/components/home/WordReveal";

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const panelY = useTransform(scrollYProgress, [0, 1], [56, -56]);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative overflow-hidden bg-background px-4 py-28 sm:px-6 lg:px-8"
    >
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="goo-filter">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="14"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -11"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <Reveal>
        <p className="text-center text-xs font-medium uppercase tracking-widest text-text-muted">
          An app for extroverts
        </p>
      </Reveal>

      <div className="relative mx-auto mt-16 flex min-h-[70vh] max-w-6xl items-center justify-center overflow-hidden">
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl bg-linear-to-br from-grad-hero-1 via-grad-hero-2 to-grad-dl-2"
          style={{
            filter: "url(#goo-filter)",
            y: reduceMotion ? 0 : panelY,
          }}
        />
        <h2 className="relative z-10 max-w-4xl px-4 text-center text-5xl font-bold uppercase leading-[1.05] text-text-primary mix-blend-difference sm:text-6xl lg:text-7xl">
          <WordReveal text="Strangers today friends tomorrow" />
        </h2>
      </div>

      <div className="mx-auto mt-20 flex max-w-6xl flex-col items-center justify-between gap-10 md:flex-row md:items-end">
        <Reveal delay={0.1}>
          <p className="max-w-md text-center text-xl font-medium text-text-primary md:text-left">
            You know no one here. And that's the best part.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <SlidingTextButton href="#contact" label="Join the party" />
        </Reveal>
      </div>
    </section>
  );
}