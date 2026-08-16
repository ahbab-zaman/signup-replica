import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

type StepFooterProps = {
  onBack?: () => void;
  primary: ReactNode;
};

export function StepFooter({ onBack, primary }: StepFooterProps) {
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
      {onBack && (
        <Button
          variant="ghost"
          onClick={onBack}
          className="w-full sm:w-auto"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back
        </Button>
      )}
      <div className="w-full sm:w-auto">{primary}</div>
    </div>
  );
}