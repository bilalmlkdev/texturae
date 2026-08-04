// src/layouts/Header.jsx
import React from "react";
import Options from "../input/Options";
import TextInput from "../input/TextInput";
import Controls from "../layouts/Controls";

export default function Header({
  inputTxt,
  setInputText,
  options,
  setOptions,
  setShowSection,
  settings,
  hasInput,
  toggleFavorite,
}) {
  const bgColor = settings.themeToggle
    ? "bg-zinc-700 border-zinc-700"
    : "bg-slate-700 border-slate-300";

  return (
    <header
      className={`font-outfit flex flex-col items-center w-full max-w-[600px] rounded-[8px] border px-4 pt-3 pb-1 transition-all duration-500 ${bgColor} text-white shadow-xl`}
    >
      <div className="text-center mb-2">
        <h3 className="text-lg font-bold font-outfit tracking-tight">
          Texturae
        </h3>
        <p className="text-[14px] capitalize font-outfit text-slate-200">
          Text to Stylized Text Generator
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3 w-full">
        {/* Left column: Options, Controls */}
        <div className="flex flex-col gap-2">
          <Options
            options={options}
            setOptions={setOptions}
            setShowSection={setShowSection}
            settings={settings}
            hasInput={hasInput}
            toggleFavorite={toggleFavorite}
          />
          <Controls
            setShowSection={setShowSection}
            settings={settings}
            hasInput={hasInput}
          />
        </div>

        {/* Right column: TextInput only */}
        <div className="flex flex-col gap-2">
          <TextInput
            textInput={inputTxt}
            setInputText={setInputText}
            setShowSection={setShowSection}
            settings={settings}
          />
        </div>
      </div>
    </header>
  );
}
