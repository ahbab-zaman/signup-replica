import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/Spinner";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:bg-accent-dark focus-visible:ring-accent",
  secondary:
    "bg-surface-secondary text-text-primary hover:bg-surface-hover focus-visible:ring-accent",
  ghost:
    "bg-transparent text-text-secondary hover:bg-surface-secondary hover:text-text-primary focus-visible:ring-accent",
  danger:
    "bg-error-light text-error-foreground hover:bg-error/20 focus-visible:ring-error",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium " +
  "transition-colors duration-100 ease-out select-none " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
  "disabled:cursor-not-allowed disabled:opacity-50";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={cn(
          baseClass,
          variantClass[variant],
          sizeClass[size],
          fullWidth && "w-full",
          className,
        )}
        {...props}
      >
        {loading ? (
          <Spinner size={size === "sm" ? "sm" : "md"} aria-hidden="true" />
        ) : (
          leftIcon
        )}
        <span className={cn(loading && "sr-only")}>{children}</span>
        {!loading && rightIcon}
      </button>
    );
  },
);
