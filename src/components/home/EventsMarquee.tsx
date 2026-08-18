import Marquee from "react-fast-marquee";
import { Calendar, Clock, MapPin } from "lucide-react";
import {
  events,
  marqueeOffsets,
  type EventItem,
} from "@/data/home-content";

type EventCardProps = {
  event: EventItem;
  offset: number;
  ariaHidden?: boolean;
};

function EventCard({ event, offset, ariaHidden = false }: EventCardProps) {
  return (
    <article
      aria-hidden={ariaHidden || undefined}
      className="group w-[24rem] shrink-0  rounded-[1.25rem] border border-white/10 bg-white/4 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/6"
      style={{ transform: `translateY(${offset}px)` }}
    >
      <div className="flex h-56 items-center justify-center bg-white/3">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold leading-snug text-white">
          {event.title}
        </h3>
        <p className="mt-2 text-base leading-relaxed text-white/58">
          {event.description}
        </p>
        <div className="mt-4 flex items-center gap-4 text-base text-white/48">
          <span className="inline-flex items-center gap-1.5">
            <Calendar aria-hidden="true" className="h-4 w-4 text-white/35" />
            {event.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock aria-hidden="true" className="h-4 w-4 text-white/35" />
            {event.time}
          </span>
        </div>
        <div className="mt-2.5 flex items-center gap-1.5 text-base text-white/48">
          <MapPin aria-hidden="true" className="h-4 w-4 text-white/35" />
          {event.venue}
        </div>
        <button
          type="button"
          className="mt-6 w-full rounded-full bg-white py-3 text-base font-semibold text-black transition-all duration-300 hover:bg-white/92 hover:shadow-lg hover:shadow-white/10"
        >
          Join
        </button>
      </div>
    </article>
  );
}

export function EventsMarquee() {
  return (
    <section
      id="events"
      className="hero-gradient-bg flex min-h-screen items-center py-16 md:py-20 overflow-hidden"
    >
      <div className="w-full overflow-hidden py-4">
        <Marquee
          autoFill
          speed={60}
          gradient={false}
        >
          {events.map((event, index) => (
            <div key={event.id} className="pr-6 py-6">
              <EventCard
                event={event}
                offset={marqueeOffsets[index % marqueeOffsets.length]}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
