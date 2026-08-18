import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Sparkles, MapPin, Users, Flame, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { WordReveal } from "@/components/home/WordReveal";

const VIBE_TAGS = [
  { label: "🍸 Speakeasy Crawls", top: "12%", left: "6%" },
  { label: "🌙 Rooftop DJ Sets", top: "18%", right: "8%" },
  { label: "🥞 Late Night Brunches", bottom: "28%", left: "8%" },
  { label: "⚡ Secret Door Passes", bottom: "34%", right: "6%" },
];

const STAT_BADGES = [
  { icon: MapPin, label: "50+ Venues Active", sublabel: "In Dhaka tonight" },
  { icon: Users, label: "1.4k Extroverts", sublabel: "Out right now" },
  { icon: Flame, label: "0% Boring Moments", sublabel: "Guaranteed vibes" },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Scroll Progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [48, 28]);

  // 3D Tilt Spring Effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-background px-4 py-32 sm:px-6 lg:px-8"
    >
      {/* Background Lighting Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-grad-hero-2/20 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Welcome Extroverts</span>
          </div>
        </Reveal>

        <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-black leading-tight text-text-primary sm:text-5xl lg:text-6xl">
          <WordReveal text="discover the nightlife, brunches, and hangouts of your city" />
        </h2>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-4 max-w-xl text-base text-text-muted sm:text-lg">
            No endless group chat debates. No "what are we doing tonight?" excuses.
          </p>
        </Reveal>
      </div>

      {/* 3D Interactive Feature Card Container */}
      <div className="perspective-1000 relative mx-auto mt-16 max-w-6xl">
        <motion.div
          onMouseMove={reduceMotion ? undefined : handleMouseMove}
          onMouseLeave={reduceMotion ? undefined : handleMouseLeave}
          style={{
            scale: reduceMotion ? 1 : scale,
            borderRadius: reduceMotion ? 28 : borderRadius,
            rotateX: reduceMotion ? 0 : rotateX,
            rotateY: reduceMotion ? 0 : rotateY,
            transformStyle: "preserve-3d",
          }}
          className="group relative h-[72vh] max-h-[700px] min-h-[480px] w-full overflow-hidden border border-white/15 bg-gradient-to-br from-accent/30 via-grad-hero-2/40 to-grad-dl-2/50 shadow-2xl backdrop-blur-xl transition-shadow duration-500 hover:shadow-accent/20"
        >
          {/* Overlay Gradient Shading */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

          {/* Dynamic Mesh Blob Background Inside Card */}
          <motion.div
            className="absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-grad-hero-1/40 blur-3xl"
            animate={{
              x: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-accent/30 blur-3xl"
            animate={{
              x: [0, -50, 0],
              scale: [1, 1.25, 1],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating Vibe Tags */}
          <div className="hidden sm:block">
            {VIBE_TAGS.map((tag, idx) => (
              <motion.div
                key={idx}
                style={{
                  top: tag.top,
                  left: tag.left,
                  right: tag.right,
                  bottom: tag.bottom,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, zIndex: 30 }}
                onMouseEnter={() => setActiveTag(tag.label)}
                onMouseLeave={() => setActiveTag(null)}
                className="absolute z-20 cursor-pointer rounded-full border border-white/20 bg-black/60 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md shadow-lg transition-all hover:border-accent hover:bg-black/80"
              >
                {tag.label}
              </motion.div>
            ))}
          </div>

          {/* Card Content Header / Footer */}
          <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-12">
            <div className="flex justify-between items-start">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
                Live Vibe Radar
              </span>
              <a
                href="#features"
                className="flex items-center gap-1 text-xs font-semibold text-white/80 hover:text-white transition-colors"
              >
                Explore Events <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            {/* Bottom Content Area */}
            <div className="space-y-6">
              <p className="max-w-xl text-2xl font-bold text-white sm:text-3xl lg:text-4xl leading-snug">
                Every weekend starts here — the people, the music, the plan you didn't know you had.
              </p>

              {/* Live Statistics Counter Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                {STAT_BADGES.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -3 }}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-md"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-accent">
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">
                        {stat.label}
                      </div>
                      <div className="text-[11px] text-white/70">
                        {stat.sublabel}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}