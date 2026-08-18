import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, Star, Sparkles, Smartphone, ShieldCheck, Download, X } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { WordReveal } from "@/components/home/WordReveal";
import playstore from "@/assets/playstore.png";
import apple from "@/assets/game.png";

const DOWNLOAD_LINKS = [
  {
    id: "android",
    label: "Download for Android",
    sublabel: "Google Play Store • v2.4",
    href: "https://play.google.com/store",
    icon: playstore,
    fallbackIcon: Smartphone,
    color: "from-emerald-500/20 to-teal-500/20 hover:border-emerald-500/50",
    badge: "Free • 4.9 ★",
  },
  {
    id: "ios",
    label: "Download for iOS",
    sublabel: "Apple App Store • v2.4",
    href: "https://www.apple.com/app-store/",
    icon: apple,
    fallbackIcon: Smartphone,
    color: "from-blue-500/20 to-indigo-500/20 hover:border-blue-500/50",
    badge: "iOS 17+ • 4.9 ★",
  },
];

const FEATURE_BADGES = [
  { icon: Star, text: "4.9 Rating (12k+ Reviews)", delay: 0 },
  { icon: ShieldCheck, text: "Instant VIP Access", delay: 0.1 },
  { icon: Sparkles, text: "Zero Cover Charge", delay: 0.2 },
];

export function DownloadSection() {
  const [showQrModal, setShowQrModal] = useState(false);

  return (
    <section
      id="download"
      className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-background px-4 py-28 text-center"
    >
      {/* Background Animated Gradient Mesh & Glowing Orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-grad-dl-1/25 blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-grad-dl-3/25 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Top Floating Feature Badges */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          {FEATURE_BADGES.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: item.delay }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-text-primary backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10"
            >
              <item.icon className="h-3.5 w-3.5 text-accent" />
              <span>{item.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Main Heading */}
        <h2 className="mx-auto max-w-4xl text-4xl font-black uppercase tracking-tight leading-none text-text-primary sm:text-6xl lg:text-7xl">
          <WordReveal text="Believe Honey - it's all free." />
        </h2>

        {/* Subtitle */}
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-base font-normal text-text-muted sm:text-lg">
            Get instant access to live Dhaka nightlife, secret rooftop parties, and exclusive extrovert hangouts right from your pocket.
          </p>
        </Reveal>

        {/* Store Download Cards Container */}
        <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
          {DOWNLOAD_LINKS.map((link) => (
            <motion.a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-surface/80 p-4 px-6 text-left backdrop-blur-xl shadow-2xl transition-all duration-300 sm:w-72 bg-gradient-to-br ${link.color}`}
            >
              {/* Shimmer sweep line */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                <motion.div
                  className="h-full w-12 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                  animate={{ x: ["-200%", "400%"] }}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
                />
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 border border-white/10 p-2.5 transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/20">
                <img
                  src={link.icon}
                  alt=""
                  className="h-7 w-7 object-contain drop-shadow-md"
                  onError={(e) => {
                    // Fallback if image fails
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              <div className="flex-1 overflow-hidden">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {link.badge}
                  </span>
                </div>
                <div className="text-base font-bold text-text-primary group-hover:text-accent transition-colors">
                  {link.label}
                </div>
                <div className="text-[11px] text-text-muted">
                  {link.sublabel}
                </div>
              </div>

              <Download className="h-4 w-4 shrink-0 text-text-muted opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-text-primary" />
            </motion.a>
          ))}
        </div>

        {/* Interactive Quick QR Code Trigger & Footer Note */}
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-text-muted hover:text-text-primary transition-colors group cursor-pointer"
            >
              <QrCode className="h-4 w-4 text-accent transition-transform group-hover:scale-110" />
              <span>Or Scan QR Code to Download</span>
            </button>

            <p className="text-[11px] font-medium uppercase tracking-widest text-text-muted/60">
              You will probably see honey on the app...
            </p>
          </div>
        </Reveal>
      </div>

      {/* QR Code Modal Overlay */}
      <AnimatePresence>
        {showQrModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQrModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-3xl border border-white/20 bg-surface p-8 text-center shadow-2xl backdrop-blur-2xl"
            >
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="absolute right-4 top-4 rounded-full p-2 text-text-muted hover:bg-white/10 hover:text-text-primary transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/20 text-accent">
                <QrCode className="h-7 w-7" />
              </div>

              <h3 className="mt-4 text-xl font-bold text-text-primary">
                Scan to Get the App
              </h3>
              <p className="mt-1 text-xs text-text-muted">
                Point your phone camera to download instantly
              </p>

              {/* Simulated stylized QR Code graphic */}
              <div className="mx-auto mt-6 flex h-48 w-48 items-center justify-center rounded-2xl border border-white/10 bg-white p-4 shadow-inner">
                <div className="relative flex h-full w-full flex-col items-center justify-center rounded-lg bg-black p-2">
                  <div className="grid grid-cols-5 gap-1.5 w-full h-full p-2">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-xs ${
                          i % 2 === 0 || i === 0 || i === 4 || i === 20 || i === 24
                            ? "bg-accent"
                            : "bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-lg bg-black px-2 py-1 border border-accent text-[9px] font-bold text-accent">
                      EXTROVERT
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-xs text-text-subtle">
                Compatible with iOS 17+ and Android 10+
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
