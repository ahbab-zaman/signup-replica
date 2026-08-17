import { WordReveal } from "@/components/home/WordReveal";
import { SlidingTextButton } from "@/components/home/SlidingTextButton";

export function ContactSection() {
  return (
    <section id="contact" className="bg-background px-4 pb-28 pt-8 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-surface px-6 py-24 text-center shadow-card sm:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 hidden h-72 w-72 rounded-full bg-grad-hero-1/30 blur-3xl sm:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -right-24 hidden h-72 w-72 rounded-full bg-grad-hero-3/25 blur-3xl sm:block"
        />

        <p className="text-xs font-medium uppercase tracking-widest text-text-muted">
          Join Extroverts
        </p>
        <h2 className="mx-auto mt-6 max-w-2xl text-4xl font-bold leading-tight text-text-primary sm:text-5xl">
          <WordReveal text="We are already partying." />
        </h2>
        <div className="mt-12 flex justify-center">
          <SlidingTextButton href="#" label="Contact us" />
        </div>
      </div>
    </section>
  );
}