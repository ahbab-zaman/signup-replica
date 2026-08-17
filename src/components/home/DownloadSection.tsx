import { Apple, Smartphone } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { WordReveal } from "@/components/home/WordReveal";

const DOWNLOAD_LINKS = [
  {
    id: "android",
    label: "Download for Android",
    href: "https://play.google.com/store",
    icon: Smartphone,
  },
  {
    id: "ios",
    label: "Download for iOS",
    href: "https://www.apple.com/app-store/",
    icon: Apple,
  },
];

export function DownloadSection() {
  return (
    <section
      id="download"
      className="flex min-h-screen flex-col items-center justify-center bg-linear-to-r from-grad-dl-1 via-grad-dl-2 to-grad-dl-3 px-4 py-24 text-center"
    >
      <h2 className="max-w-4xl text-4xl font-bold uppercase leading-tight text-text-primary sm:text-5xl lg:text-6xl">
        <WordReveal text="Believe Honey- its all free.." />
      </h2>

      <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
        {DOWNLOAD_LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="flex h-14 w-full max-w-sm items-center justify-center gap-3 rounded-full bg-text-primary px-8 text-sm font-semibold text-background shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-text-primary/90 hover:shadow-card-hover sm:w-auto"
            >
              <Icon aria-hidden="true" className="h-5 w-5" />
              {link.label}
            </a>
          );
        })}
      </div>

      <Reveal delay={0.25}>
        <p className="mt-10 text-[11px] font-medium uppercase tracking-widest text-text-primary/70">
          You will probably see honey on the app...
        </p>
      </Reveal>
    </section>
  );
}