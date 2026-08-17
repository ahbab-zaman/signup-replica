import { mockProfile } from "@/data/mock-profile";

export function ProfileStats() {
  return (
    <section
      aria-label="Profile stats"
      className="border-b border-border-muted px-4 py-6 sm:px-6"
    >
      <dl className="grid grid-cols-3 gap-4 text-center">
        {mockProfile.stats.map((stat) => (
          <div key={stat.id}>
            <dd className="text-2xl font-bold text-text-primary">
              {stat.value}
            </dd>
            <dt className="mt-1 text-xs text-text-muted">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}