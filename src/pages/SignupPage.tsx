import { SignupWizard } from "@/features/signup-wizard/SignupWizard";
import { WizardProvider } from "@/features/signup-wizard/context/WizardProvider";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-background text-text-primary">
      <WizardProvider>
        <SignupWizard />
      </WizardProvider>
    </main>
  );
}
