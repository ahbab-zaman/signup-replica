export type EventItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  image: string;
};

export const events: EventItem[] = [
  {
    id: "dancing-nobodys-judging",
    title: "Dancing Like Nobody's Judging",
    description:
      "Spoiler: everyone is judging. Bring your best moves, a plus-one who can't dance, and a complete disregard for personal space. The floor is lava after midnight.",
    date: "Sat, 12 Jul",
    time: "9:00 PM",
    venue: "The Basement, Mumbai",
    image:
      "https://plus.unsplash.com/premium_photo-1670333351937-68cb2735a0fd?w=400&auto=format&fit=crop",
  },
  {
    id: "karaoke-kick-us-out",
    title: "Karaoke Until They Kick Us Out",
    description:
      "Singing talent not required. Enthusiasm is mandatory. There will be a tambourine, a questionable song choice from 2007, and at least one person crying during Wonderwall.",
    date: "Fri, 18 Jul",
    time: "8:00 PM",
    venue: "Loud Mouth Bar, Bangalore",
    image:
      "https://plus.unsplash.com/premium_photo-1683121126477-17ef068309bc?w=400&auto=format&fit=crop",
  },
  {
    id: "silent-disco-loud-drama",
    title: "Silent Disco, Loud Drama",
    description:
      "Two channels. Three love triangles. Zero ability to hear yourself sing. Pick your DJ wisely — the wrong channel could mean 45 minutes of pan flute covers and eternal shame.",
    date: "Sun, 20 Jul",
    time: "7:30 PM",
    venue: "Neon Cove, Goa",
    image:
      "https://images.unsplash.com/photo-1627020730793-2ccb5cd55e99?w=400&auto=format&fit=crop",
  },
  {
    id: "rooftop-sunsets",
    title: "Rooftop Sunsets & Bad Decisions",
    description:
      "The view is stunning. Your life choices tonight will be highly debatable. We provide the sunset and the cocktails. You provide the stories you'll regret telling your therapist.",
    date: "Thu, 24 Jul",
    time: "6:00 PM",
    venue: "Sky Deck, Delhi",
    image:
      "https://plus.unsplash.com/premium_photo-1661759013744-4754d402459d?w=400&auto=format&fit=crop",
  },
  {
    id: "board-games-boozy",
    title: "Board Games But Make It Boozy",
    description:
      "Monopoly has never been this cutthroat — or this drunk. Every hotel purchase requires a shot. Every 'Go to Jail' card means two. We are not liable for flipped tables or broken friendships.",
    date: "Wed, 30 Jul",
    time: "7:00 PM",
    venue: "The Den, Pune",
    image:
      "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=400&auto=format&fit=crop",
  },
  {
    id: "pajama-party",
    title: "Pajama Party (No, Seriously)",
    description:
      "Bring your fancy pajamas. Your ex might be here. There will be pillow forts, a hot chocolate station, and a strict no-shoes policy enforced by our very serious bouncer named Kevin.",
    date: "Sat, 2 Aug",
    time: "10:00 PM",
    venue: "Villa 42, Jaipur",
    image:
      "https://plus.unsplash.com/premium_photo-1682681903841-1f98ce6a1175?w=400&auto=format&fit=crop",
  },
  {
    id: "potluck-questionable-cooking",
    title: "Potluck of Questionable Cooking",
    description:
      "Bring a dish. Bring antacids. Bring a signed waiver. Last month someone brought 'deconstructed cereal' which was just a box of Cheerios and warm milk. We're still recovering emotionally.",
    date: "Sun, 10 Aug",
    time: "1:00 PM",
    venue: "Green House, Hyderabad",
    image:
      "https://plus.unsplash.com/premium_photo-1664278686569-e2045aa5b11d?w=400&auto=format&fit=crop",
  },
  {
    id: "glow-in-the-dark",
    title: "Glow in the Dark Chaos",
    description:
      "We provide the neon paint, UV lights, and questionable life advice. You bring white clothing and a willingness to look ridiculous. Photos will surface at your wedding. You've been warned.",
    date: "Fri, 15 Aug",
    time: "9:30 PM",
    venue: "Warehouse 7, Chennai",
    image:
      "https://images.unsplash.com/photo-1600854109241-46990389fb97?w=400&auto=format&fit=crop",
  },
];

export const marqueeOffsets = [4, 37, -45, 43, -44, 38, 35, 5];