import { ChevronDown } from "lucide-react";
import {
  forwardRef,
  useId,
  type ReactNode,
  type SelectHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  hint?: string;
  rightIcon?: ReactNode;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    error,
    hint,
    rightIcon,
    className,
    id,
    "aria-describedby": ariaDescribedBy,
    children,
    ...props
  },
  ref,
) {
  const autoId = useId();
  const selectId = id ?? autoId;
  const errorId = error ? `${selectId}-error` : undefined;
  const hintId = hint ? `${selectId}-hint` : undefined;

  const describedBy = cn(ariaDescribedBy, errorId, hintId) || undefined;

  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-medium text-text-secondary"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "h-11 w-full appearance-none rounded-lg border bg-surface px-3 text-sm text-text-primary",
            "transition-colors duration-100 ease-out",
            "focus:outline-none focus:ring-2",
            rightIcon ? "pr-10" : "pr-9",
            error
              ? "border-error focus:ring-error"
              : "border-border hover:border-border-light focus:border-accent focus:ring-accent",
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-icon-muted">
          {rightIcon ?? (
            <ChevronDown aria-hidden="true" className="h-4 w-4" />
          )}
        </span>
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