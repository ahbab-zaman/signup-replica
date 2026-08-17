import { MotionConfig } from "framer-motion";
import { AboutSection } from "@/components/home/AboutSection";
import { ContactSection } from "@/components/home/ContactSection";
import { DownloadSection } from "@/components/home/DownloadSection";
import { EventsMarquee } from "@/components/home/EventsMarquee";
import { FeatureBento } from "@/components/home/FeatureBento";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeNavbar } from "@/components/home/HomeNavbar";
import { ScrollProgress } from "@/components/home/ScrollProgress";
import { SiteFooter } from "@/components/home/SiteFooter";
import { StorySection } from "@/components/home/StorySection";

export default function HomePage() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="min-h-screen bg-background text-text-primary">
        <ScrollProgress />
        <HomeNavbar />
        <HeroSection />
        <EventsMarquee />
        <DownloadSection />
        <AboutSection />
        <FeatureBento />
        <StorySection />
        <ContactSection />
        <SiteFooter />
      </main>
    </MotionConfig>
  );
}