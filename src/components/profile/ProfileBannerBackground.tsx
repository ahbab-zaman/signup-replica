import { motion, useReducedMotion } from "framer-motion";

export function ProfileBannerBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {/* Base Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-profile-banner-start via-profile-banner-start/80 to-background" />

      {/* Radial Mask overlay */}
      <div
        className="absolute inset-0 bg-text-primary/10"
        style={{
          maskImage: "radial-gradient(80% 60% at 50% 0%, black, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(80% 60% at 50% 0%, black, transparent 70%)",
        }}
      />

      {/* Floating Animated Ambient Blobs */}
      <motion.div
        className="absolute -left-20 top-8 h-72 w-72 rounded-full bg-accent/25 blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, 44, 0], y: [0, 26, 0], scale: [1, 1.2, 1] }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-16 top-14 h-80 w-80 rounded-full bg-grad-dl-1/25 blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, -36, 0], y: [0, 22, 0], scale: [1, 1.15, 1] }
        }
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-24 left-1/3 h-96 w-96 rounded-full bg-grad-hero-2/20 blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, 32, 0], y: [0, -26, 0], scale: [1, 1.1, 1] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Scanning Shimmer Light Beam */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2"
        animate={reduceMotion ? undefined : { x: ["-160%", "360%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="h-full w-full -skew-x-12 bg-white/10 blur-2xl" />
      </motion.div>

      {/* Subtle Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
    </div>
  );
}