import { ProfileActions } from "@/components/profile/ProfileActions";
import { ProfileBanner } from "@/components/profile/ProfileBanner";
import { ProfileBio } from "@/components/profile/ProfileBio";
import { ProfileStats } from "@/components/profile/ProfileStats";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-background text-text-primary">
      <ProfileBanner />
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <ProfileStats />
        <ProfileBio />
        <ProfileActions />
      </div>
    </main>
  );
}