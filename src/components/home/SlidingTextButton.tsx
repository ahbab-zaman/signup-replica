import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type SlidingTextButtonProps = ComponentProps<"a"> & {
  label: string;
};

export function SlidingTextButton({
  label,
  className,
  ...props
}: SlidingTextButtonProps) {
  return (
    <a
      {...props}
      className={cn(
        "group relative inline-flex h-12 overflow-hidden rounded-full bg-text-primary text-background shadow-card",
        "transition-shadow duration-200 hover:shadow-card-hover",
        className,
      )}
    >
      <span className="flex h-12 flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2 group-hover:-skew-y-3">
        <span className="flex h-12 items-center px-8 text-sm font-semibold uppercase tracking-widest">
          {label}
        </span>
        <span className="flex h-12 items-center px-8 text-sm font-semibold uppercase tracking-widest">
          {label}
        </span>
      </span>
    </a>
  );
}