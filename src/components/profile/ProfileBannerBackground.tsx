import { motion, useReducedMotion } from "framer-motion";

export function ProfileBannerBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-profile-banner-start via-profile-banner-start to-profile-banner-end" />

      <div
        className="absolute inset-0 bg-text-primary/10"
        style={{
          maskImage: "radial-gradient(80% 60% at 50% 0%, black, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(80% 60% at 50% 0%, black, transparent 70%)",
        }}
      />

      <motion.div
        className="absolute -left-20 top-8 h-64 w-64 rounded-full bg-text-primary/20 blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, 44, 0], y: [0, 26, 0], scale: [1, 1.15, 1] }
        }
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-16 top-14 h-72 w-72 rounded-full bg-grad-dl-1/20 blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, -36, 0], y: [0, 22, 0], scale: [1, 1.12, 1] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-24 left-1/4 h-80 w-80 rounded-full bg-highlight/15 blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, 32, 0], y: [0, -26, 0], scale: [1, 1.1, 1] }
        }
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-y-0 left-0 w-1/2"
        animate={reduceMotion ? undefined : { x: ["-160%", "360%"] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="h-full w-full -skew-x-12 bg-text-primary/15 blur-2xl" />
      </motion.div>
    </div>
  );
}