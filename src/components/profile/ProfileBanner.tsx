import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Home, ImagePlus, Share2, Sparkles, MapPin, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockProfile } from "@/data/mock-profile";
import { ProfileBannerBackground } from "@/components/profile/ProfileBannerBackground";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ProfileBanner({ onShare }: { onShare?: () => void }) {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const { name, username, age, pronouns, location, vipStatus } = mockProfile;
  const initials = getInitials(name);
  const [avatarImage, setAvatarImage] = useState<string | null>(
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
  );

  const glyphMotion = {
    initial: reduceMotion ? undefined : { opacity: 0.4, scale: 1.06 },
    animate: reduceMotion ? undefined : { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" as const },
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setAvatarImage(url);
    }
  };

  return (
    <header className="relative h-[420px] overflow-hidden sm:h-[480px]">
      <ProfileBannerBackground />

      {/* Top Header Bar Navigation */}
      <div className="absolute left-4 top-4 z-20 flex items-center justify-between right-4">
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => navigate("/")}
            aria-label="Go to home"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-text-primary backdrop-blur-md transition-colors hover:bg-black/60 cursor-pointer"
          >
            <Home aria-hidden="true" className="h-5 w-5" />
          </motion.button>
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-sm font-bold text-accent backdrop-blur-md"
            aria-hidden="true"
          >
            E
          </span>
        </div>

        {/* Share Profile Quick Action */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onShare}
          type="button"
          className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-semibold text-text-primary backdrop-blur-md transition-all hover:border-white/30 hover:bg-black/60 cursor-pointer"
        >
          <Share2 className="h-3.5 w-3.5 text-accent" />
          <span className="hidden sm:inline">Share Profile</span>
        </motion.button>
      </div>

      {/* Stylized Giant Background Initials Glyphs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-0.06em] right-2 flex select-none items-baseline justify-end leading-none tracking-[-0.06em] opacity-30 sm:right-8"
      >
        <motion.span
          className="font-black text-banner-glyph"
          style={{ fontSize: "var(--font-size-banner-glyph)" }}
          {...glyphMotion}
        >
          {initials.charAt(0)}
        </motion.span>
        <motion.span
          className="font-black text-banner-glyph"
          style={{
            fontSize: "var(--font-size-banner-glyph)",
            marginLeft: "-0.16em",
          }}
          {...glyphMotion}
        >
          {initials.charAt(1)}
        </motion.span>
      </div>

      {/* Main Profile Avatar & Info Card */}
      <motion.div
        className="absolute bottom-6 left-4 z-10 flex flex-col sm:flex-row items-start sm:items-end gap-5 sm:left-8"
        initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Interactive Avatar Container with Online Indicator */}
        <div className="relative group">
          <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-3xl overflow-hidden ring-4 ring-background shadow-2xl border-2 border-white/20">
            {avatarImage ? (
              <img
                src={avatarImage}
                alt={name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent to-grad-dl-2 text-2xl font-bold text-white">
                {initials}
              </div>
            )}
            
            {/* Avatar Upload Overlay */}
            <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <ImagePlus className="h-6 w-6 text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Live Online Pulse Dot */}
          <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-background ring-2 ring-background">
            <span className="relative flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-500" />
            </span>
          </span>
        </div>

        {/* Profile Identity Details */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-amber-400 backdrop-blur-md">
              <Sparkles className="h-3 w-3" />
              {vipStatus}
            </span>
          </div>

          <h1 className="flex items-center gap-2 text-3xl font-black text-text-primary sm:text-4xl capitalize tracking-tight">
            {name}
            <CheckCircle className="h-5 w-5 text-accent shrink-0" />
            <span className="text-base font-normal text-text-muted">({age})</span>
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-text-muted">
            <span>@{username}</span>
            <span>•</span>
            <span>{pronouns}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-text-subtle">
              <MapPin className="h-3.5 w-3.5 text-accent" />
              {location}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Decorative Bottom Indicator */}
      <div
        aria-hidden="true"
        className="absolute bottom-3 left-1/2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-white/20"
      />
    </header>
  );
}
