// src/components/layout/Controls.jsx
import React from "react";
import { FlaskConical, Info, Settings, History } from "lucide-react"; // add History icon

export default function Controls({ setShowSection, settings, hasInput }) {
  const isDisabled = !hasInput;

  const btnClass = (disabled) =>
    `flex flex-col items-center gap-[5px] p-2 rounded-[8px] transition-colors duration-200 ${
      settings.themeToggle === false
        ? "hover:bg-white hover:text-black"
        : "hover:bg-zinc-800"
    } ${disabled ? "cursor-not-allowed opacity-80" : "cursor-pointer opacity-100"}`;

  return (
    <div className="w-full flex items-center justify-center gap-2">
      <button
        onClick={() => setShowSection("about")}
        className={btnClass(false)}
      >
        <Info size={17} />
        <span className="text-[14px]">About</span>
      </button>
      <button
        disabled={isDisabled}
        onClick={() => setShowSection("settings")}
        className={btnClass(isDisabled)}
      >
        <Settings size={18} />
        <span className="text-[14px]">Settings</span>
      </button>
      <button
        disabled={isDisabled}
        onClick={() => setShowSection("testall")}
        className={btnClass(isDisabled)}
      >
        <FlaskConical size={18} />
        <span className="text-[14px]">Test all</span>
      </button>
      <button
        disabled={isDisabled}
        onClick={() => setShowSection("history")}
        className={btnClass(isDisabled)}
      >
        <History size={18} />
        <span className="text-[14px]">History</span>
      </button>
    </div>
  );
}
