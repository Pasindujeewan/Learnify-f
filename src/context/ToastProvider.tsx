import { useState } from "react";
import type { ReactNode } from "react";
import type { Toast, ToastType } from "./ToastContext";
import { ToastContext } from "./ToastContext";
import { FiCheckCircle, FiXCircle, FiInfo } from "react-icons/fi";

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (message: string, type: ToastType = "success") => {
    setToast({ message, type });

    setTimeout(() => setToast(null), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <>
        {children}
        {toast && (
          <div
            className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white 
      animate-slideIn
      ${
        toast.type === "success"
          ? "bg-green-600"
          : toast.type === "error"
            ? "bg-red-600"
            : "bg-yellow-500"
      }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">
                {toast.type === "success" && <FiCheckCircle />}
                {toast.type === "error" && <FiXCircle />}
                {toast.type === "info" && <FiInfo />}
              </span>
              <span className="font-medium">{toast.message}</span>
            </div>
          </div>
        )}
      </>
    </ToastContext.Provider>
  );
};
