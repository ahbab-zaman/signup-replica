export type ProfileStat = {
  id: string;
  label: string;
  value: string;
  change?: string;
};

export type Badge = {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
};

export type AttendedEvent = {
  id: string;
  title: string;
  date: string;
  venue: string;
  image: string;
  tag: string;
};

export type ActivityItem = {
  id: string;
  time: string;
  action: string;
  target: string;
};

export type ProfileData = {
  name: string;
  username: string;
  age: number;
  pronouns: string;
  bio: string;
  location: string;
  vipStatus: string;
  vibeTags: string[];
  stats: ProfileStat[];
  badges: Badge[];
  attendedEvents: AttendedEvent[];
  activities: ActivityItem[];
};

export const mockProfile: ProfileData = {
  name: "Tahmim Ahmed",
  username: "tahmimahmed",
  age: 24,
  pronouns: "he/him",
  bio: "Might be the reason you came out tonight. Speakeasies, rooftop brunches, underground techno, and the mandatory 4 AM street food runs.",
  location: "Dhaka, Bangladesh",
  vipStatus: "PLATINUM EXTROVERT",
  vibeTags: ["Techno Nights", "Rooftop Brunches", "Speakeasies", "4 AM Kebab", "VIP Lounges", "Live Jazz"],
  stats: [
    { id: "events", label: "Events Attended", value: "28", change: "+4 this month" },
    { id: "connections", label: "Nightlife Connections", value: "142", change: "Top 5% active" },
    { id: "member", label: "Member Since", value: "2024", change: "Verified VIP" },
  ],
  badges: [
    { id: "b1", name: "Night Owl", icon: "🦉", description: "Attended 10+ events past 2 AM", color: "from-purple-500/20 to-indigo-500/20 border-purple-500/30" },
    { id: "b2", name: "Party Host", icon: "🎉", description: "Connected over 50 strangers", color: "from-pink-500/20 to-rose-500/20 border-pink-500/30" },
    { id: "b3", name: "Vibe Setter", icon: "⚡", description: "Top rated profile in Dhaka", color: "from-amber-500/20 to-yellow-500/20 border-amber-500/30" },
    { id: "b4", name: "Speakeasy VIP", icon: "🍸", description: "Unlocked secret door pass", color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30" },
  ],
  attendedEvents: [
    { id: "e1", title: "Neon Skyline Rooftop Party", date: "Last Saturday, 11 PM", venue: "Cloud9 Lounge", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80", tag: "Rooftop" },
    { id: "e2", title: "Underground Bass & Techno", date: "Aug 12, 12 AM", venue: "The Vault", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80", tag: "Techno" },
    { id: "e3", title: "Sunday Mimosa Brunch & Vinyl", date: "Aug 06, 1 PM", venue: "Artisan Courtyard", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80", tag: "Brunch" },
  ],
  activities: [
    { id: "a1", time: "2 hours ago", action: "Joined event group", target: "Neon Skyline Rooftop" },
    { id: "a2", time: "Yesterday", action: "Unlocked badge", target: "Speakeasy VIP Pass" },
    { id: "a3", time: "3 days ago", action: "Connected with", target: "Sarah & 3 others" },
  ]
};