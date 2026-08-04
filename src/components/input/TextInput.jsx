// src/components/input/TextInput.jsx
import React from "react";

export default function TextInput({
  textInput,
  setInputText,
  setShowSection,
  settings,
}) {
  return (
    <div className="flex flex-col items-start gap-1">
      <label htmlFor="textInput" className="text-xs">
        Input text:
      </label>
      <textarea
        id="textInput"
        placeholder="Type something cool..."
        value={textInput}
        onChange={(e) => {
          setInputText(e.target.value);
          setShowSection("main");
        }}
        rows={4}
        className={`placeholder:text-black/50 focus-visible:ring-white/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex min-h-22 rounded-md border ${
          settings.themeToggle === false
            ? "border-zinc-400 bg-white text-black placeholder:text-black"
            : "border-zinc-900 bg-zinc-900/40 text-white placeholder:text-white/40"
        } px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[1px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-full md:w-70 max-sm:w-80`}
      />
    </div>
  );
}
