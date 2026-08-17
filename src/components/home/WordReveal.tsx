import { motion, useReducedMotion, type Variants } from "framer-motion";

type WordRevealProps = {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
};

type WordRevealCustom = {
  stagger: number;
  delay: number;
};

const containerVariants: Variants = {
  hidden: {},
  visible: (custom: WordRevealCustom) => ({
    transition: {
      staggerChildren: custom.stagger,
      delayChildren: custom.delay,
    },
  }),
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: "0.6em" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function WordReveal({
  text,
  className,
  stagger = 0.08,
  delay = 0,
}: WordRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      custom={{ stagger, delay }}
      aria-label={text}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block"
          variants={wordVariants}
          aria-hidden="true"
        >
          {word}
          {index < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}