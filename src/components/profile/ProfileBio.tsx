import { mockProfile } from "@/data/mock-profile";

export function ProfileBio() {
  const bio = mockProfile.bio.trim();

  return (
    <section aria-label="Bio" className="px-4 py-6 sm:px-6">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
        Bio
      </h2>
      {bio ? (
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          {bio}
        </p>
      ) : (
        <p className="mt-2 text-sm text-text-dim">No bio yet.</p>
      )}
    </section>
  );
}