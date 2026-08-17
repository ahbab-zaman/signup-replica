import {
  Clapperboard,
  Coffee,
  Disc3,
  Music2,
  Sunrise,
  Wine,
  type LucideIcon,
} from "lucide-react";

export type EventItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  icon: LucideIcon;
  gradient: string;
};

export const events: EventItem[] = [
  {
    id: "neon-nights",
    title: "Neon Nights Rooftop",
    description: "Rooftop techno, skyline views, open till 4am.",
    date: "Fri 24 Oct",
    time: "22:00",
    venue: "Skyline Rooftop",
    icon: Music2,
    gradient: "bg-linear-to-br from-grad-hero-1 to-grad-hero-2",
  },
  {
    id: "vinyl-wine",
    title: "Vinyl & Wine",
    description: "Crate-digging set from local selectors over natural wine.",
    date: "Sat 25 Oct",
    time: "19:00",
    venue: "The Basement",
    icon: Wine,
    gradient: "bg-linear-to-br from-grad-dl-1 to-grad-dl-2",
  },
  {
    id: "golden-hour",
    title: "Golden Hour Social",
    description: "Sunset mimosas and a live acoustic duo.",
    date: "Sun 26 Oct",
    time: "17:30",
    venue: "Terrace 44",
    icon: Sunrise,
    gradient: "bg-linear-to-br from-grad-hero-3 to-grad-hero-1",
  },
  {
    id: "silent-disco",
    title: "Silent Disco",
    description: "Three channels, one dance floor. Pick your vibe.",
    date: "Fri 31 Oct",
    time: "23:00",
    venue: "Warehouse 9",
    icon: Disc3,
    gradient: "bg-linear-to-br from-grad-dl-2 to-grad-dl-3",
  },
  {
    id: "brunch-club",
    title: "Brunch Club",
    description: "Bottomless brunch with a retro DJ brunch set.",
    date: "Sat 01 Nov",
    time: "11:00",
    venue: "Garden House",
    icon: Coffee,
    gradient: "bg-linear-to-br from-grad-hero-2 to-grad-hero-3",
  },
  {
    id: "midnight-marquee",
    title: "Midnight Marquee",
    description: "All-night film plus an after-party hybrid. Black tie optional.",
    date: "Sat 01 Nov",
    time: "00:00",
    venue: "The Roxy",
    icon: Clapperboard,
    gradient: "bg-linear-to-br from-grad-dl-1 to-grad-hero-3",
  },
];

export const marqueeOffsets = [-40, 24, -16, 40, -8, 28];