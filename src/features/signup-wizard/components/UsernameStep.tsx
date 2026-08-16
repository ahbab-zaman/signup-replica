import { StepPlaceholder } from "./StepPlaceholder";

export function UsernameStep() {
  return (
    <StepPlaceholder
      title="Pick a username"
      description="At least 6 characters, letters, numbers, and underscores."
    />
  );
}