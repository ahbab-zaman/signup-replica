import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightSlot?: ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    error,
    hint,
    leftIcon,
    rightSlot,
    className,
    id,
    "aria-describedby": ariaDescribedBy,
    ...props
  },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = error ? `${inputId}-error` : undefined;
  const hintId = hint ? `${inputId}-hint` : undefined;

  const describedBy = cn(ariaDescribedBy, errorId, hintId) || undefined;

  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-text-secondary"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-icon-muted">
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "h-11 w-full rounded-lg border bg-surface px-3 text-base text-text-primary",
            "placeholder:text-text-dim",
            "transition-colors duration-100 ease-out",
            "focus:outline-none focus:ring-2",
            leftIcon && "pl-10",
            rightSlot && "pr-10",
            error
              ? "border-error focus:ring-error"
              : "border-border hover:border-border-light focus:border-accent focus:ring-accent",
            className,
          )}
          {...props}
        />

        {rightSlot && (
          <span className="absolute inset-y-0 right-3 flex items-center text-icon-muted">
            {rightSlot}
          </span>
        )}
      </div>

      {hint && !error && (
        <p id={hintId} className="text-xs text-text-muted">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} role="alert" className="text-xs text-error-foreground">
          {error}
        </p>
      )}
    </div>
  );
});
