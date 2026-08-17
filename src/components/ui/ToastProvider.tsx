import { AnimatePresence } from "framer-motion";
import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { Toast, type ToastItem } from "@/components/ui/Toast";
import { ToastContext, type ToastInput } from "@/components/ui/toast-context";

const TOAST_DURATION_MS = 4000;
const MAX_TOASTS = 3;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idCounter = useRef(0);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (input: ToastInput) => {
      const id = `toast-${++idCounter.current}`;
      const item: ToastItem = {
        id,
        variant: input.variant ?? "info",
        title: input.title,
        description: input.description,
        onClick: input.onClick,
      };

      setToasts((prev) => {
        const next = [...prev, item];
        return next.length > MAX_TOASTS ? next.slice(next.length - MAX_TOASTS) : next;
      });

      window.setTimeout(() => dismiss(id), TOAST_DURATION_MS);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed right-4 top-4 z-[80] flex w-full max-w-sm flex-col gap-3 sm:right-4 sm:top-4 sm:bottom-auto bottom-4 sm:items-end"
      >
        <AnimatePresence>
          {toasts.map((t) => (
            <Toast key={t.id} toast={t} onDismiss={dismiss} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
