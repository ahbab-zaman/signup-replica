export type ProfileStat = {
  id: string;
  label: string;
  value: string;
};

export type ProfileData = {
  name: string;
  username: string;
  age: number;
  pronouns: string;
  bio: string;
  stats: ProfileStat[];
};

export const mockProfile: ProfileData = {
  name: "tahmim ahmed",
  username: "tahmimahmed",
  age: 24,
  pronouns: "him",
  bio: "Might be the reason you came out tonight. Events, brunches, and the occasional 4am kebab.",
  stats: [
    { id: "events", label: "Events attended", value: "24" },
    { id: "connections", label: "Connections", value: "142" },
    { id: "member", label: "Member since", value: "2024" },
  ],
};