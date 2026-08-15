import { createContext } from "react";
import type { ToastVariant } from "@/components/ui/Toast";

export type ToastInput = {
  variant?: ToastVariant;
  title: string;
  description?: string;
};

export type ToastContextValue = {
  toast: (input: ToastInput) => void;
  dismiss: (id: string) => void;
};

export const ToastContext = createContext<ToastContextValue | null>(null);