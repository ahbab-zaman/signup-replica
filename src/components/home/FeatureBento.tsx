import { motion } from "framer-motion";
import { Clock, PartyPopper } from "lucide-react";
import { useRef, type MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/home/Reveal";

export function SpotlightBadge({ label = "check Live" }: { label?: string }) {
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
      className="relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-border-light bg-background/50 px-3 py-1 text-xs font-medium text-text-primary backdrop-blur-sm"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(255, 255, 255, 0.28), transparent 70%)",
        }}
      />
      <Clock aria-hidden="true" className="h-3.5 w-3.5 text-icon-strong" />
      <span className="relative">{label}</span>
    </span>
  );
}

type BentoVideoCardProps = {
  gradient: string;
  title: string;
  description: string;
};

function BentoVideoCard({
  gradient,
  title,
  description,
}: BentoVideoCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={cn(
        "relative h-64 overflow-hidden rounded-md sm:h-72",
        gradient,
      )}
    >
      <div className="absolute inset-0 flex flex-col justify-between p-6">
        <div>
          <h3 className="text-xl font-bold text-text-primary sm:text-2xl">
            {title}
          </h3>
          <p className="mt-2 max-w-xs text-sm text-text-primary/80">
            {description}
          </p>
        </div>
        <SpotlightBadge />
      </div>
    </motion.div>
  );
}

export function FeatureBento() {
  return (
    <section
      id="features"
      className="bg-background px-4 py-28 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-widest text-text-muted">
            Start partying with strangers
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-3 max-w-md text-sm text-text-subtle">
            Turn any night into a party. Live events, zero planning, all vibes.
          </p>
        </Reveal>

        <Reveal delay={0.15} y={32}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="relative mt-10 h-[65vh] min-h-[384px] w-full overflow-hidden rounded-md bg-linear-to-br from-accent via-grad-hero-2 to-grad-dl-2"
          >
            <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-10">
              <div className="max-w-md">
                <h3 className="text-2xl font-bold text-text-primary sm:text-3xl">
                  Before hours
                </h3>
                <p className="mt-2 text-sm text-text-primary/80">
                  The pregame playlist and the door list, before anyone else is
                  even up.
                </p>
              </div>
              <div className="flex items-center">
                <SpotlightBadge />
              </div>
            </div>
          </motion.div>
        </Reveal>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <Reveal delay={0.05}>
            <BentoVideoCard
              gradient="bg-linear-to-br from-grad-dl-1 via-grad-dl-2 to-grad-dl-3"
              title="After party"
              description="The night doesn't end when the lights come up."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <BentoVideoCard
              gradient="bg-linear-to-br from-grad-hero-1 via-grad-hero-2 to-grad-hero-3"
              title="FREEEEEEEEEEEEEEEEEEEEE"
              description="No cover. No excuses. Just show up."
            />
          </Reveal>
          <Reveal delay={0.15}>
            <BentoVideoCard
              gradient="bg-linear-to-br from-grad-hero-2 to-grad-dl-3"
              title="Table for one"
              description="Walk in alone, leave with a crew."
            />
          </Reveal>
          <Reveal delay={0.2}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="relative h-64 overflow-hidden rounded-md bg-bento-violet p-8 sm:h-72"
            >
              <h3 className="text-2xl font-bold leading-snug text-background">
                Stop scrolling.
                <br />
                Start partying.
              </h3>
              <PartyPopper
                aria-hidden="true"
                className="absolute bottom-6 right-6 h-20 w-20 text-background/25"
              />
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}