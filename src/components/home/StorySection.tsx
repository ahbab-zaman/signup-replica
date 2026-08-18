import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MessageCircleHeart, Sparkles, Quote } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { SlidingTextButton } from "@/components/home/SlidingTextButton";
import { WordReveal } from "@/components/home/WordReveal";

const STORY_PILLS = [
  { text: "“Met my core crew at a 3 AM rooftop.”", author: "Rafi, 23", pos: "top-8 left-6 sm:left-12" },
  { text: "“Zero awkward silences, just good energy.”", author: "Anika, 24", pos: "top-12 right-6 sm:right-12" },
  { text: "“Walked in alone, left with 6 new friends.”", author: "Sami, 25", pos: "bottom-12 left-8 sm:left-16" },
];

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const panelY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const panelScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.95]);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative overflow-hidden bg-background px-4 py-32 sm:px-6 lg:px-8"
    >
      {/* SVG Gooey Filter Definition */}
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="goo-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur" />
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

      {/* Ambient Lighting Orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute -left-20 top-1/3 h-96 w-96 rounded-full bg-grad-hero-1/30 blur-[120px]"
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-20 bottom-1/3 h-96 w-96 rounded-full bg-grad-dl-2/30 blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-text-muted backdrop-blur-md">
            <MessageCircleHeart className="h-3.5 w-3.5 text-accent" />
            <span>An app for extroverts</span>
          </div>
        </Reveal>

        {/* Center Liquid Canvas Box */}
        <div className="relative mx-auto mt-16 flex min-h-[65vh] max-w-6xl items-center justify-center overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-12 shadow-2xl">
          {/* Animated Liquid Background Panel */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-grad-hero-1 via-grad-hero-2 to-grad-dl-2 opacity-90 backdrop-blur-xl"
            style={{
              filter: "url(#goo-filter)",
              y: reduceMotion ? 0 : panelY,
              scale: reduceMotion ? 1 : panelScale,
            }}
          />

          {/* Floating Extrovert Quote Pills */}
          <div className="hidden md:block">
            {STORY_PILLS.map((pill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`absolute z-20 max-w-xs rounded-2xl border border-white/20 bg-black/60 p-4 text-left backdrop-blur-md shadow-xl ${pill.pos}`}
              >
                <div className="flex items-center gap-2 text-accent">
                  <Quote className="h-3.5 w-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">
                    Real Story
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium text-white leading-relaxed">
                  {pill.text}
                </p>
                <p className="mt-2 text-[10px] font-semibold text-accent">
                  — {pill.author}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Core Bold Typography Header */}
          <div className="relative z-10 max-w-4xl py-12">
            <h2 className="text-center text-5xl font-black uppercase leading-[1.02] tracking-tight text-text-primary mix-blend-difference sm:text-7xl lg:text-8xl">
              <WordReveal text="Strangers today friends tomorrow" />
            </h2>
          </div>
        </div>

        {/* Bottom CTA & Subtitle Bar */}
        <div className="mx-auto mt-20 flex max-w-6xl flex-col items-center justify-between gap-8 rounded-3xl border border-white/10 bg-surface/60 p-8 backdrop-blur-xl md:flex-row md:p-10">
          <Reveal delay={0.1}>
            <div className="space-y-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Join 12k+ active extroverts</span>
              </div>
              <p className="max-w-md text-xl font-bold text-text-primary">
                You know no one here. And that's the best part.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="shrink-0">
              <SlidingTextButton href="#contact" label="Join the party" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}