import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, CheckCircle2, ShieldCheck, Flame, Zap } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { WordReveal } from "@/components/home/WordReveal";
import { SlidingTextButton } from "@/components/home/SlidingTextButton";

const BENEFIT_CHIPS = [
  { icon: Flame, text: "Curated Dhaka Nightlife" },
  { icon: ShieldCheck, text: "Verified Extrovert Club" },
  { icon: Zap, text: "Instant Door Invites" },
];

export function ContactSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative bg-background px-4 pb-32 pt-12 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 bottom-0 h-[450px] w-[600px] -translate-x-1/2 rounded-full bg-accent/15 blur-[140px]" />
      </div>

      <Reveal>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/15 bg-surface/80 px-6 py-24 text-center shadow-2xl backdrop-blur-2xl sm:px-12">
          {/* Orbiting Ambient Glow Rings */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-grad-hero-1/30 blur-3xl"
            animate={{
              scale: [1, 1.25, 1],
              x: [0, 30, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-grad-hero-3/30 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, -30, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Join Extroverts VIP</span>
            </div>

            <h2 className="mx-auto mt-6 text-4xl font-black leading-tight tracking-tight text-text-primary sm:text-6xl">
              <WordReveal text="We are already partying." />
            </h2>

            <p className="mt-4 text-base text-text-muted sm:text-lg">
              Get secret party drops, door codes, and exclusive host invites sent directly to you.
            </p>

            {/* Benefit Chips */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {BENEFIT_CHIPS.map((chip, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-text-primary backdrop-blur-md"
                >
                  <chip.icon className="h-3.5 w-3.5 text-accent" />
                  <span>{chip.text}</span>
                </div>
              ))}
            </div>

            {/* Interactive VIP Email Signup Form */}
            <div className="mt-12 mx-auto max-w-md">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row items-center gap-3 rounded-2xl border border-white/15 bg-black/40 p-2 backdrop-blur-xl shadow-xl"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email for VIP drops..."
                      required
                      className="w-full bg-transparent px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-background transition-all hover:bg-accent/90 cursor-pointer shadow-lg"
                    >
                      <span>Join Pass</span>
                      <Send className="h-4 w-4" />
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="flex flex-col items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 backdrop-blur-xl text-emerald-400"
                  >
                    <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                    <div className="text-base font-bold text-white">You're on the VIP Guestlist! 🍸</div>
                    <div className="text-xs text-white/70">Check your inbox for your secret door access code.</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-8 flex justify-center">
              <SlidingTextButton href="#" label="Contact team directly" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}