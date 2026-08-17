import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Copy,
  Info,
  X,
  XCircle,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ToastVariant = "success" | "error" | "info" | "warning";

export type ToastItem = {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
  onClick?: () => void;
};

type ToastProps = {
  toast: ToastItem;
  onDismiss: (id: string) => void;
};

const variantConfig: Record<ToastVariant, { icon: ReactNode; accent: string }> = {
  success: {
    icon: <CheckCircle2 aria-hidden="true" className="h-5 w-5 text-success" />,
    accent: "border-l-success",
  },
  error: {
    icon: <XCircle aria-hidden="true" className="h-5 w-5 text-error" />,
    accent: "border-l-error",
  },
  info: {
    icon: <Info aria-hidden="true" className="h-5 w-5 text-info" />,
    accent: "border-l-info",
  },
  warning: {
    icon: <AlertCircle aria-hidden="true" className="h-5 w-5 text-warning" />,
    accent: "border-l-warning",
  },
};

export function Toast({ toast, onDismiss }: ToastProps) {
  const { icon, accent } = variantConfig[toast.variant];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.15 } }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      role="status"
      aria-live="polite"
      className={cn(
        "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border border-border bg-surface p-4 shadow-popover",
        "border-l-4",
        accent,
      )}
    >
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-text-primary">{toast.title}</p>
        {toast.description && (
          <p className="mt-0.5 text-xs text-text-muted">{toast.description}</p>
        )}
      </div>
      {toast.onClick && (
        <button
          type="button"
          onClick={toast.onClick}
          aria-label="Copy code to clipboard"
          className="shrink-0 rounded p-1 text-icon-muted transition-colors hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <Copy aria-hidden="true" className="h-4 w-4" />
        </button>
      )}
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="shrink-0 rounded p-1 text-icon-muted transition-colors hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <X aria-hidden="true" className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
