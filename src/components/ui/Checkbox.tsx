import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: ReactNode;
  error?: string;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, error, className, id, ...props }, ref) {
    const autoId = useId();
    const inputId = id ?? autoId;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={inputId} className="flex cursor-pointer items-start gap-3">
          <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
            <input
              ref={ref}
              type="checkbox"
              id={inputId}
              aria-invalid={error ? true : undefined}
              aria-describedby={errorId}
              className={cn(
                "peer h-5 w-5 appearance-none rounded border bg-surface",
                "transition-colors duration-100 ease-out",
                "checked:border-accent checked:bg-accent",
                "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background",
                error ? "border-error" : "border-border hover:border-border-light",
                className,
              )}
              {...props}
            />
            <Check
              aria-hidden="true"
              className="pointer-events-none absolute h-3.5 w-3.5 text-accent-foreground opacity-0 transition-opacity duration-100 peer-checked:opacity-100"
              strokeWidth={3}
            />
          </span>
          {label && (
            <span className="text-sm leading-relaxed text-text-secondary">{label}</span>
          )}
        </label>
        {error && (
          <p id={errorId} role="alert" className="pl-8 text-xs text-error-foreground">
            {error}
          </p>
        )}
      </div>
    );
  },
);
