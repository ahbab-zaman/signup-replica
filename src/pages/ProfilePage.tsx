import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Calendar, Award, Activity, MapPin, CheckCircle2, ArrowUpRight, Copy } from "lucide-react";
import { ProfileActions } from "@/components/profile/ProfileActions";
import { ProfileBanner } from "@/components/profile/ProfileBanner";
import { ProfileBio } from "@/components/profile/ProfileBio";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { mockProfile } from "@/data/mock-profile";

type TabType = "overview" | "events" | "badges" | "activity";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText?.(window.location.href);
    showToast("Profile link copied to clipboard! 📋");
  };

  return (
    <main className="min-h-screen bg-background text-text-primary pb-24">
      {/* Toast Notification Manager */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 left-1/2 z-50 -translate-x-1/2 flex items-center gap-2 rounded-full border border-accent/40 bg-surface/90 px-5 py-2.5 text-xs font-bold text-accent backdrop-blur-xl shadow-2xl"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <ProfileBanner onShare={handleShare} />

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <ProfileStats />
        <ProfileBio />
        <ProfileActions onToast={showToast} onShare={handleShare} />

        {/* Dynamic Tabbed Navigation System */}
        <div className="mt-4 border-b border-white/10">
          <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-px scrollbar-none" aria-label="Profile Tabs">
            {[
              { id: "overview", label: "Overview", icon: Sparkles },
              { id: "events", label: "Events", icon: Calendar, badge: mockProfile.attendedEvents.length },
              { id: "badges", label: "VIP Badges", icon: Award, badge: mockProfile.badges.length },
              { id: "activity", label: "Activity", icon: Activity },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`relative flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                    isActive ? "text-accent" : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && (
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                      isActive ? "bg-accent/20 text-accent" : "bg-white/10 text-text-muted"
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content Display */}
        <div className="py-8">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Badges Preview */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-text-muted">
                      Unlocked VIP Perks & Badges
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveTab("badges")}
                      className="text-xs font-bold text-accent hover:underline cursor-pointer"
                    >
                      View All ({mockProfile.badges.length})
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {mockProfile.badges.map((badge) => (
                      <div
                        key={badge.id}
                        className={`rounded-2xl border p-4 text-center bg-gradient-to-br backdrop-blur-md ${badge.color}`}
                      >
                        <div className="text-2xl mb-1">{badge.icon}</div>
                        <div className="text-xs font-bold text-text-primary">{badge.name}</div>
                        <div className="text-[10px] text-text-muted mt-1">{badge.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Event Highlight */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-text-muted">
                      Latest Night Out
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveTab("events")}
                      className="text-xs font-bold text-accent hover:underline cursor-pointer"
                    >
                      All Events
                    </button>
                  </div>
                  {mockProfile.attendedEvents[0] && (
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface/60 backdrop-blur-md sm:flex">
                      <img
                        src={mockProfile.attendedEvents[0].image}
                        alt=""
                        className="h-44 w-full sm:w-48 object-cover"
                      />
                      <div className="p-5 flex flex-col justify-between flex-1">
                        <div>
                          <span className="rounded-full bg-accent/20 px-2.5 py-0.5 text-[10px] font-bold text-accent">
                            {mockProfile.attendedEvents[0].tag}
                          </span>
                          <h4 className="text-lg font-bold text-text-primary mt-2">
                            {mockProfile.attendedEvents[0].title}
                          </h4>
                          <div className="flex items-center gap-1.5 text-xs text-text-muted mt-1">
                            <MapPin className="h-3.5 w-3.5 text-accent" />
                            <span>{mockProfile.attendedEvents[0].venue} • {mockProfile.attendedEvents[0].date}</span>
                          </div>
                        </div>
                        <div className="text-xs font-semibold text-accent flex items-center gap-1 mt-4">
                          Attended with 4 connections <ArrowUpRight className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === "events" && (
              <motion.div
                key="events"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid gap-4 sm:grid-cols-2"
              >
                {mockProfile.attendedEvents.map((evt) => (
                  <motion.div
                    key={evt.id}
                    whileHover={{ y: -3 }}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-surface/60 backdrop-blur-md shadow-lg"
                  >
                    <div className="relative h-40 w-full overflow-hidden">
                      <img src={evt.image} alt={evt.title} className="h-full w-full object-cover" />
                      <span className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                        {evt.tag}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="text-base font-bold text-text-primary">{evt.title}</h4>
                      <p className="text-xs text-text-muted mt-1 flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-accent" /> {evt.venue}
                      </p>
                      <p className="text-[11px] text-text-subtle mt-0.5">{evt.date}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === "badges" && (
              <motion.div
                key="badges"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {mockProfile.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`flex items-center gap-4 rounded-2xl border p-5 bg-gradient-to-br backdrop-blur-md ${badge.color}`}
                  >
                    <div className="text-4xl">{badge.icon}</div>
                    <div>
                      <div className="text-sm font-bold text-text-primary">{badge.name}</div>
                      <div className="text-xs text-text-muted mt-1">{badge.description}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "activity" && (
              <motion.div
                key="activity"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {mockProfile.activities.map((act) => (
                  <div
                    key={act.id}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-surface/50 p-4 backdrop-blur-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 text-accent">
                        <Activity className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-text-primary">
                          {act.action} <span className="font-bold text-accent">{act.target}</span>
                        </div>
                        <div className="text-[10px] text-text-muted">{act.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}