import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Edit3, Share2, X, Check, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { mockProfile } from "@/data/mock-profile";

export function ProfileActions({
  onToast,
  onShare,
}: {
  onToast?: (msg: string) => void;
  onShare?: () => void;
}) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Form states initialized with mockProfile
  const [name, setName] = useState(mockProfile.name);
  const [bio, setBio] = useState(mockProfile.bio);
  const [pronouns, setPronouns] = useState(mockProfile.pronouns);
  const [location, setLocation] = useState(mockProfile.location);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    mockProfile.name = name;
    mockProfile.bio = bio;
    mockProfile.pronouns = pronouns;
    mockProfile.location = location;
    setShowEditModal(false);
    onToast?.("Profile updated successfully!");
  };

  return (
    <>
      <section
        aria-label="Profile actions"
        className="flex items-center gap-3 px-4 py-6 sm:px-6"
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
          <Button
            onClick={() => setShowEditModal(true)}
            variant="secondary"
            className="w-full h-11 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-surface-secondary text-sm font-bold text-text-primary backdrop-blur-md transition-all hover:border-white/20 hover:bg-surface-hover cursor-pointer"
          >
            <Edit3 className="h-4 w-4 text-accent" />
            <span>Edit Profile</span>
          </Button>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onShare}
          aria-label="Share Profile"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-surface-secondary text-icon-strong transition-all hover:bg-surface-hover cursor-pointer"
        >
          <Share2 className="h-4 w-4 text-text-primary" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => setShowSettingsModal(true)}
          aria-label="Settings"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-surface-secondary text-icon-strong transition-all hover:bg-surface-hover cursor-pointer"
        >
          <Settings className="h-4 w-4 text-text-primary" />
        </motion.button>
      </section>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {showEditModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEditModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl border border-white/20 bg-surface p-6 sm:p-8 shadow-2xl backdrop-blur-2xl text-left"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-accent" />
                  <h3 className="text-xl font-bold text-text-primary">
                    Edit Extrovert Profile
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="rounded-full p-2 text-text-muted hover:bg-white/10 hover:text-text-primary transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-text-primary focus:border-accent focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">
                      Pronouns
                    </label>
                    <input
                      type="text"
                      value={pronouns}
                      onChange={(e) => setPronouns(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-text-primary focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-text-primary focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">
                    Extrovert Bio
                  </label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-text-primary focus:border-accent focus:outline-none resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-text-muted hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-xl bg-accent px-6 py-2.5 text-sm font-bold text-background hover:bg-accent/90 transition-colors cursor-pointer shadow-lg"
                  >
                    <Check className="h-4 w-4" />
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettingsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSettingsModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-3xl border border-white/20 bg-surface p-6 text-center shadow-2xl backdrop-blur-2xl"
            >
              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                className="absolute right-4 top-4 rounded-full p-2 text-text-muted hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/20 text-accent">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mt-3 text-lg font-bold text-text-primary">
                Profile Preferences
              </h3>
              <p className="mt-1 text-xs text-text-muted">
                Manage notifications, privacy, and account perks
              </p>

              <div className="mt-6 space-y-2 text-left text-sm font-medium">
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-3">
                  <span>Show Active Status</span>
                  <span className="text-xs font-bold text-emerald-400">ON</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-3">
                  <span>VIP Guestlist Alerts</span>
                  <span className="text-xs font-bold text-accent">ENABLED</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-3">
                  <span>Match Visibility</span>
                  <span className="text-xs font-bold text-text-primary">PUBLIC</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}