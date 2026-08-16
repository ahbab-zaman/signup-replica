import { SignupWizard } from "@/features/signup-wizard/SignupWizard";
import { WizardProvider } from "@/features/signup-wizard/context/WizardProvider";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8 text-text-primary">
      <WizardProvider>
        <SignupWizard />
      </WizardProvider>
    </main>
  );
}