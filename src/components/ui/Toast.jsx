// src/components/ui/Toast.jsx
import React, { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, X, Info } from "lucide-react";

const TOAST_TYPES = {
  success: {
    icon: CheckCircle,
    light: "border-green-500 bg-green-50 text-green-800",
    dark: "border-green-600 bg-zinc-900 text-green-400",
    iconColor: "text-green-500",
  },
  error: {
    icon: AlertCircle,
    light: "border-red-500 bg-red-50 text-red-800",
    dark: "border-red-600 bg-zinc-900 text-red-400",
    iconColor: "text-red-500",
  },
  info: {
    icon: Info,
    light: "border-blue-500 bg-blue-50 text-blue-800",
    dark: "border-blue-600 bg-zinc-900 text-blue-400",
    iconColor: "text-blue-500",
  },
};

export default function Toast({
  message,
  type = "success",
  duration = 1000,
  onClose,
  themeToggle = false,
}) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) {
        clearInterval(timer);
        onClose?.();
      }
    }, 50);

    return () => clearInterval(timer);
  }, [duration, onClose]);

  const typeData = TOAST_TYPES[type] || TOAST_TYPES.info;
  const Icon = typeData.icon;
  const themeClass = themeToggle ? typeData.dark : typeData.light;

  return (
    <div
      className="fixed bottom-6 right-6 z-[999] max-w-[220px] w-full animate-in slide-in-from-right-5 fade-in duration-300"
      role="alert"
    >
      <div
        className={`relative flex items-center gap-2 p-2 rounded-xl border shadow-lg ${themeClass}`}
      >
        <Icon
          className={`mt-0.5 flex-shrink-0 ${typeData.iconColor}`}
          size={20}
        />

        <div className="flex-1">
          <p className="text-sm font-medium leading-relaxed">{message}</p>
        </div>

        <button
          onClick={onClose}
          className="flex-shrink-0 ml-2 rounded-full p-1 hover:bg-black/10 transition-colors cursor-pointer"
          aria-label="Close notification"
        >
          <X size={18} className="text-current opacity-60" />
        </button>

        <div className="absolute bottom-0 left-0 h-1 w-full bg-current opacity-10 rounded-b-xl overflow-hidden">
          <div
            className="h-full bg-current opacity-40 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
