import { motion } from "framer-motion";
import { Calendar, Users, Trophy } from "lucide-react";
import { mockProfile } from "@/data/mock-profile";

const STAT_ICONS = [
  Calendar,
  Users,
  Trophy,
];

export function ProfileStats() {
  return (
    <section
      aria-label="Profile stats"
      className="border-b border-white/10 px-4 py-8 sm:px-6"
    >
      <dl className="grid grid-cols-3 gap-3 sm:gap-4">
        {mockProfile.stats.map((stat, idx) => {
          const Icon = STAT_ICONS[idx % STAT_ICONS.length];

          return (
            <motion.div
              key={stat.id}
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface/60 p-4 text-center backdrop-blur-md shadow-md hover:border-white/20 hover:bg-surface/80"
            >
              <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <Icon className="h-4 w-4" />
              </div>
              <dd className="text-2xl font-black tracking-tight text-text-primary sm:text-3xl">
                {stat.value}
              </dd>
              <dt className="mt-1 text-xs font-semibold text-text-muted">
                {stat.label}
              </dt>
              {stat.change && (
                <div className="mt-1 text-[10px] font-bold text-accent">
                  {stat.change}
                </div>
              )}
            </motion.div>
          );
        })}
      </dl>
    </section>
  );
}