import { Button } from "@/components/ui/Button";
import { useWizard } from "../hooks/useWizard";
import { StepFooter } from "./StepFooter";

type StepPlaceholderProps = {
  title: string;
  description: string;
};

export function StepPlaceholder({ title, description }: StepPlaceholderProps) {
  const { state, dispatch } = useWizard();
  const isFirst = state.stepIndex === 0;

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
        <p className="mt-2 text-sm text-text-muted">{description}</p>
      </div>
      <StepFooter
        onBack={isFirst ? undefined : () => dispatch({ type: "PREV_STEP" })}
        primary={
          <Button
            onClick={() => dispatch({ type: "NEXT_STEP" })}
            className="w-full sm:w-auto"
          >
            Continue
          </Button>
        }
      />
    </section>
  );
}