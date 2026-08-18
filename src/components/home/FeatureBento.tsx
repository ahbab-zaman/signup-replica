import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Clock, PartyPopper, Flame, Music, Users, ArrowUpRight, Zap, Radio } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/home/Reveal";

export function SpotlightBadge({
  label = "Check Live",
  icon: Icon = Clock,
  variant = "default",
}: {
  label?: string;
  icon?: typeof Clock;
  variant?: "default" | "live" | "accent";
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (event: MouseEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <span
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative inline-flex items-center gap-2 overflow-hidden rounded-full border px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md transition-all duration-300",
        variant === "live"
          ? "border-red-500/30 bg-red-500/10 text-red-400"
          : variant === "accent"
          ? "border-accent/40 bg-accent/15 text-accent"
          : "border-white/15 bg-white/10 text-text-primary hover:border-white/30"
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(255, 255, 255, 0.25), transparent 70%)",
        }}
      />
      {variant === "live" && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
        </span>
      )}
      <Icon aria-hidden="true" className="relative h-3.5 w-3.5" />
      <span className="relative">{label}</span>
    </span>
  );
}

// 3D Tilt Card Wrapper Component
function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 250,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 250,
    damping: 25,
  });

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
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 shadow-xl transition-all duration-300 hover:border-white/25 hover:shadow-2xl",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function FeatureBento() {
  return (
    <section id="features" className="relative bg-background px-4 py-28 sm:px-6 lg:px-8">
      {/* Subtle Background Lighting Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-grad-hero-2/15 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/3 h-96 w-96 rounded-full bg-grad-dl-2/15 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-text-muted backdrop-blur-md">
            <Radio className="h-3.5 w-3.5 text-accent animate-pulse" />
            <span>Start partying with strangers</span>
          </div>
        </Reveal>
        
        <Reveal delay={0.1}>
          <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Turn any night into a party. Live events, zero planning.
          </h2>
        </Reveal>

        {/* Hero Top Bento Card (Before Hours) */}
        <Reveal delay={0.15} y={32}>
          <TiltCard className="mt-10 h-[60vh] min-h-[400px] w-full bg-gradient-to-br from-accent/30 via-grad-hero-2/30 to-grad-dl-2/40 backdrop-blur-2xl">
            {/* Shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Animated Sound Equalizer Bars Graphic */}
            <div className="absolute right-8 top-8 flex items-end gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
              {[40, 70, 30, 90, 50, 80, 45, 65].map((height, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 rounded-full bg-accent"
                  animate={{
                    height: [`${height * 0.4}%`, `${height}%`, `${height * 0.4}%`],
                  }}
                  transition={{
                    duration: 1 + i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>

            <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-12">
              <div className="flex items-center gap-3">
                <SpotlightBadge label="LIVE PREGAME" variant="live" />
                <span className="text-xs font-medium text-text-primary/70">
                  Dhaka • 11:30 PM
                </span>
              </div>

              <div className="max-w-xl space-y-4">
                <h3 className="text-3xl font-black text-text-primary sm:text-4xl lg:text-5xl tracking-tight">
                  Before hours
                </h3>
                <p className="text-base text-text-primary/80 sm:text-lg">
                  The pregame playlist and door list, before anyone else is even up. Tap into secret guest lists and live door updates.
                </p>

                <div className="flex items-center gap-4 pt-2">
                  <div className="flex -space-x-2 overflow-hidden">
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-background object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="" />
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-background object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="" />
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-background object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="" />
                  </div>
                  <span className="text-xs font-semibold text-text-primary/90">
                    +42 extroverts heading there
                  </span>
                </div>
              </div>
            </div>
          </TiltCard>
        </Reveal>

        {/* 2x2 Bento Grid */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {/* Card 1: After Party */}
          <Reveal delay={0.05}>
            <TiltCard className="h-72 bg-gradient-to-br from-grad-dl-1/40 via-grad-dl-2/30 to-grad-dl-3/40 backdrop-blur-xl p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <SpotlightBadge label="Secret Locations" icon={Flame} />
                  <ArrowUpRight className="h-5 w-5 text-text-primary/50 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <h3 className="mt-6 text-2xl font-black text-text-primary sm:text-3xl">
                  After party
                </h3>
                <p className="mt-2 text-sm text-text-primary/80">
                  The night doesn't end when the lights come up. Unlock 3 AM speakeasy locations.
                </p>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-text-primary/70 border-t border-white/10 pt-4">
                <span>Secret Pass Code required</span>
                <span className="text-accent">Unlocked</span>
              </div>
            </TiltCard>
          </Reveal>

          {/* Card 2: FREEEEEEEEEEEEEEEEEEEEE */}
          <Reveal delay={0.1}>
            <TiltCard className="h-72 bg-gradient-to-br from-grad-hero-1/40 via-grad-hero-2/40 to-grad-hero-3/40 backdrop-blur-xl p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <SpotlightBadge label="Zero Cover" icon={Zap} variant="accent" />
                  <span className="rounded-full bg-accent/20 px-2.5 py-0.5 text-[10px] font-bold text-accent">VIP ACCESS</span>
                </div>
                <h3 className="mt-6 text-2xl font-black tracking-tight text-text-primary sm:text-3xl break-words">
                  FREEEEEEEEEEE
                </h3>
                <p className="mt-2 text-sm text-text-primary/80">
                  No cover charge. No excuses. Just show up and vibe.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-text-primary">Instant Guestlist</span>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="rounded-full bg-text-primary px-4 py-1.5 text-xs font-bold text-background shadow-md cursor-pointer"
                >
                  Claim Pass
                </motion.span>
              </div>
            </TiltCard>
          </Reveal>

          {/* Card 3: Table for one */}
          <Reveal delay={0.15}>
            <TiltCard className="h-72 bg-gradient-to-br from-grad-hero-2/40 to-grad-dl-3/40 backdrop-blur-xl p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <SpotlightBadge label="Solo Friendly" icon={Users} />
                  <span className="text-xs text-accent font-semibold">100% Match Rate</span>
                </div>
                <h3 className="mt-6 text-2xl font-black text-text-primary sm:text-3xl">
                  Table for one
                </h3>
                <p className="mt-2 text-sm text-text-primary/80">
                  Walk in alone, leave with a full crew. Instant group table matching.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 flex-1 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-accent to-grad-dl-1" />
                </div>
                <span className="text-xs font-semibold text-text-primary/90">8/10 Seats Filled</span>
              </div>
            </TiltCard>
          </Reveal>

          {/* Card 4: Stop scrolling. Start partying. */}
          <Reveal delay={0.2}>
            <TiltCard className="h-72 bg-bento-violet p-8 flex flex-col justify-between text-background relative overflow-hidden group">
              <div className="relative z-10">
                <span className="inline-block rounded-full bg-background/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-background">
                  Join Now
                </span>
                <h3 className="mt-4 text-3xl font-black leading-tight text-background sm:text-4xl">
                  Stop scrolling.
                  <br />
                  Start partying.
                </h3>
              </div>

              {/* Floating Animated Party Popper Icon */}
              <motion.div
                animate={{
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-4 right-4 text-background/25 transition-all duration-300 group-hover:scale-125 group-hover:text-background/40"
              >
                <PartyPopper aria-hidden="true" className="h-28 w-28" />
              </motion.div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}