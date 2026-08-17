import { Settings } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ProfileActions() {
  return (
    <section
      aria-label="Profile actions"
      className="flex items-center gap-3 px-4 pb-10 sm:px-6"
    >
      <Button variant="secondary" className="flex-1">
        Edit Profile
      </Button>
      <button
        type="button"
        aria-label="Settings"
        className="flex h-11 w-11 items-center justify-center rounded-lg bg-surface-secondary text-icon-strong transition-colors hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <Settings aria-hidden="true" className="h-5 w-5" />
      </button>
    </section>
  );
}