import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  events,
  marqueeOffsets,
  type EventItem,
} from "@/data/home-content";

const MARQUEE_SPEED = 0.035;

type EventCardProps = {
  event: EventItem;
  offset: number;
  ariaHidden?: boolean;
};

function EventCard({ event, offset, ariaHidden = false }: EventCardProps) {
  const Icon = event.icon;

  return (
    <article
      aria-hidden={ariaHidden || undefined}
      className="group w-[19rem] shrink-0 overflow-hidden rounded-xl border border-border bg-surface-secondary transition-colors duration-200 hover:border-border-light hover:bg-surface-hover sm:w-96"
      style={{ transform: `translateY(${offset}px)` }}
    >
      <div
        className={cn(
          "flex h-40 items-center justify-center overflow-hidden sm:h-44",
          event.gradient,
        )}
      >
        <Icon aria-hidden="true" className="h-12 w-12 text-background/40" />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-text-primary">
          {event.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-text-muted">
          {event.description}
        </p>
        <div className="mt-4 space-y-2 text-sm text-text-muted">
          <p className="flex items-center gap-2">
            <Calendar aria-hidden="true" className="h-4 w-4 text-icon-muted" />
            {event.date}
            <span className="text-icon-muted">·</span>
            <Clock aria-hidden="true" className="h-4 w-4 text-icon-muted" />
            {event.time}
          </p>
          <p className="flex items-center gap-2">
            <MapPin aria-hidden="true" className="h-4 w-4 text-icon-muted" />
            {event.venue}
          </p>
        </div>
        <button
          type="button"
          className="mt-5 w-full rounded-full bg-text-primary py-2.5 text-sm font-semibold text-background transition-colors hover:bg-text-primary/90"
        >
          Join
        </button>
      </div>
    </article>
  );
}

export function EventsMarquee() {
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    if (reduceMotion || paused) return;
    const track = trackRef.current;
    if (!track) return;
    const half = track.scrollWidth / 2;
    if (half <= 0) return;
    const next = x.get() - MARQUEE_SPEED * delta;
    x.set(next <= -half ? next + half : next);
  });

  return (
    <section id="events" className="relative overflow-hidden bg-background py-24">
      <div
        className="group/row cursor-default"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div ref={trackRef} style={{ x }} className="flex w-max">
          {[0, 1].map((group) => (
            <div key={group} className="flex gap-6 pr-6">
              {events.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  offset={marqueeOffsets[index % marqueeOffsets.length]}
                  ariaHidden={group === 1}
                />
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}