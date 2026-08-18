import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { mockProfile } from "@/data/mock-profile";

export function ProfileBio() {
  const bio = mockProfile.bio.trim();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  return (
    <section aria-label="Bio" className="border-b border-white/10 px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-text-muted">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          Extrovert Vibe & Bio
        </h2>
        <span className="text-[10px] font-bold text-accent">Verified Profile</span>
      </div>

      {bio ? (
        <p className="mt-3 text-base leading-relaxed text-text-primary/90 font-medium">
          {bio}
        </p>
      ) : (
        <p className="mt-3 text-sm text-text-muted">No bio added yet.</p>
      )}

      {/* Vibe Tags Pills */}
      {mockProfile.vibeTags && mockProfile.vibeTags.length > 0 && (
        <div className="mt-5 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted/70">
            Favorite Night Vibes
          </span>
          <div className="flex flex-wrap gap-2">
            {mockProfile.vibeTags.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <motion.button
                  key={tag}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTag(isSelected ? null : tag)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md transition-all cursor-pointer ${
                    isSelected
                      ? "border-accent bg-accent/20 text-accent shadow-md shadow-accent/10"
                      : "border-white/10 bg-surface-secondary/60 text-text-primary hover:border-white/20 hover:bg-surface-secondary"
                  }`}
                >
                  <Heart className={`h-3 w-3 ${isSelected ? "fill-accent text-accent" : "text-text-muted"}`} />
                  <span>{tag}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}