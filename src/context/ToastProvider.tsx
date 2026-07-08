import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Toast, ToastType } from "./ToastContext";
import { ToastContext } from "./ToastContext";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

const toastStyles = {
  success: {
    icon: CheckCircle2,
    title: "Success",
    iconClass: "text-emerald-600",
    borderClass: "border-emerald-200 dark:border-emerald-900/70",
    barClass: "bg-emerald-500",
  },
  error: {
    icon: AlertCircle,
    title: "Error",
    iconClass: "text-rose-600",
    borderClass: "border-rose-200 dark:border-rose-900/70",
    barClass: "bg-rose-500",
  },
  info: {
    icon: Info,
    title: "Info",
    iconClass: "text-blue-600",
    borderClass: "border-blue-200 dark:border-blue-900/70",
    barClass: "bg-blue-500",
  },
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id),
    );
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "success", title?: string) => {
      // Keep ids browser-safe even if randomUUID is unavailable.
      const id =
        window.crypto?.randomUUID?.() ||
        `${Date.now()}-${Math.random().toString(36).slice(2)}`;

      // Limit the stack so repeated API errors do not cover the interface.
      setToasts((currentToasts) =>
        [
          ...currentToasts,
          {
            id,
            message,
            type,
            title,
          },
        ].slice(-4),
      );

      window.setTimeout(() => dismissToast(id), 4200);
    },
    [dismissToast],
  );

  const value = useMemo(
    () => ({
      showToast,
      dismissToast,
      success: (message: string, title?: string) =>
        showToast(message, "success", title),
      error: (message: string, title?: string) =>
        showToast(message, "error", title),
      info: (message: string, title?: string) =>
        showToast(message, "info", title),
    }),
    [dismissToast, showToast],
  );

  return (
    <ToastContext.Provider value={value}>
      <>
        {children}
        <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:top-6">
          {toasts.map((toast) => {
            const style = toastStyles[toast.type];
            const Icon = style.icon;

            return (
              <div
                key={toast.id}
                className={`pointer-events-auto overflow-hidden rounded-lg border ${style.borderClass} bg-white shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5 toast-enter dark:bg-slate-950 dark:shadow-black/30 dark:ring-white/10`}
              >
                <div className={`h-1 ${style.barClass}`} />
                <div className="flex gap-3 p-4">
                  <Icon className={`mt-0.5 shrink-0 ${style.iconClass}`} size={21} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {toast.title || style.title}
                    </p>
                    <p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-300">
                      {toast.message}
                    </p>
                  </div>
                  <button
                    onClick={() => dismissToast(toast.id)}
                    className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                    aria-label="Dismiss notification"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </>
    </ToastContext.Provider>
  );
};
