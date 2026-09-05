// src/sections/Settings.jsx
import React, { useState } from "react";
import { Info, Plus, RotateCcw } from "lucide-react";
import Footer from "../layouts/Footer";

const DEFAULT_SETTINGS = {
  fontSize: 54,
  mono: true,
  autoCopy: false,
  watermark: false,
  themeToggle: false,
  favorites: [],
  history: [],
  maxHistory: 5,
};

const SettingItem = ({
  id,
  title,
  description,
  infoText,
  children,
  showInfo,
  onToggleInfo,
  settings,
}) => {
  const isActive = showInfo === id;

  return (
    <div className="flex flex-col gap-4 p-2 rounded-xl transition-all">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex-1">
          <p
            className={`font-medium ${
              settings.themeToggle === false ? "text-black" : "text-white"
            } text-base`}
          >
            {title}
          </p>
          <p className="text-xs text-zinc-400 leading-relaxed">{description}</p>
        </div>

        <div className="flex items-center gap-3">
          {children}

          <button
            onClick={() => onToggleInfo(id)}
            className={`flex items-center justify-center rounded-[8px] h-[40px] w-[40px] transition-all cursor-pointer border
              ${
                settings.themeToggle === false
                  ? "border-zinc-900/20 bg-white text-black border-2"
                  : "border-zinc-700 bg-zinc-950 hover:bg-blue-600 text-white"
              }
              ${isActive ? "text-blue-700 shadow-[0_0_10px_rgba(59,130,246,0.2)]" : ""}
            `}
          >
            <Info size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {isActive && (
        <div
          className={`${
            settings.themeToggle === false
              ? "bg-blue-950/90 text-blue-100"
              : "bg-blue-950/40 text-blue-100"
          } py-3 px-4 rounded-lg border border-blue-500/30 w-full animate-in fade-in slide-in-from-top-2 duration-300`}
        >
          <p className="text-sm leading-relaxed">
            <span className="font-bold text-blue-400">Note:</span> {infoText}
          </p>
        </div>
      )}
    </div>
  );
};

export default function Settings({
  setShowSection,
  settings,
  setSettings,
  setInputText,
  setOptions,
}) {
  const [showInfo, setShowInfo] = useState("");

  const handleToggleInfo = (id) => {
    setShowInfo((prev) => (prev === id ? "" : id));
  };

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleNumberChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: parseInt(value, 10) || 0,
    }));
  };

  const handleResetDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    setOptions?.("scriptUnicode");
    setShowSection("main");
  };

  return (
    <div className="w-full h-screen pb-50 overflow-y-auto relative text-white flex flex-col items-center py-4 bg-transparent scroll-smooth">
      <button
        className={`${
          settings.themeToggle === false ? "text-black" : "text-white"
        } rounded-full cursor-pointer fixed top-66 right-13`}
        onClick={() => setShowSection("main")}
      >
        <Plus className="rotate-45" size={20} />
      </button>

      <div className="flex flex-col items-center w-full max-w-xl px-6 pt-10">
        {/* Banner image removed */}
        <h2
          className={`text-3xl font-bold text-center mb-8 ${settings.themeToggle ? "text-white" : "text-black"}`}
        >
          Settings
        </h2>
        <p className="text-center text-sm text-zinc-400 mb-10">
          Customise your Texturae experience.
        </p>
      </div>

      <div className="w-full max-w-xl px-6 space-y-12 pb-32 font-outfit">
        <section className="space-y-6">
          <h3 className="text-[11px] text-center text-zinc-500 uppercase tracking-[0.2em] font-black">
            Editor Experience
          </h3>

          <SettingItem
            id="fontSize"
            title="Font Size"
            description="Adjust the preview text scale"
            infoText="Higher values (24px+) are great for visual checking, while 16px is standard for Discord/GitHub exports."
            showInfo={showInfo}
            onToggleInfo={handleToggleInfo}
            settings={settings}
          >
            <input
              type="range"
              min="16"
              max="100"
              value={settings.fontSize}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  fontSize: e.target.value,
                }))
              }
              className={`w-32 appearance-none bg-transparent cursor-pointer
                [&::-webkit-slider-runnable-track]:h-[6px]
                [&::-webkit-slider-runnable-track]:rounded-full
                ${
                  settings.themeToggle === false
                    ? "[&::-webkit-slider-runnable-track]:bg-zinc-300"
                    : "[&::-webkit-slider-runnable-track]:bg-zinc-700"
                }
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:h-[16px]
                [&::-webkit-slider-thumb]:w-[16px]
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-[#9B26FF]
                [&::-webkit-slider-thumb]:mt-[-5px]
              `}
            />
          </SettingItem>

          <SettingItem
            id="mono"
            title="Monospace Editor"
            description="Force fixed-width font alignment"
            infoText="ASCII Art requires monospace fonts to keep characters perfectly aligned. Turning this off may 'break' complex art."
            showInfo={showInfo}
            onToggleInfo={handleToggleInfo}
            settings={settings}
          >
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.mono}
                onChange={() => handleToggle("mono")}
              />
              <div className="w-11 h-6 bg-zinc-800 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
            </label>
          </SettingItem>
        </section>

        <section className="space-y-6">
          <h3 className="text-[11px] text-center text-zinc-500 uppercase tracking-[0.2em] font-black">
            Export & Workflow
          </h3>

          <SettingItem
            id="autoCopy"
            title="Auto-Copy on Export"
            description="Copy to clipboard when saving image"
            infoText="Enabling this will automatically put the raw text into your clipboard the moment you hit the 'Save Image' button."
            showInfo={showInfo}
            onToggleInfo={handleToggleInfo}
            settings={settings}
          >
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.autoCopy}
                onChange={() => handleToggle("autoCopy")}
              />
              <div className="w-11 h-6 bg-zinc-800 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
            </label>
          </SettingItem>

          <SettingItem
            id="watermark"
            title="Include Watermark"
            description="Add a small brand tag to images"
            infoText="This adds 'Generated via Texturae' to the bottom right of your PNG exports. Great for supporting the project!"
            showInfo={showInfo}
            onToggleInfo={handleToggleInfo}
            settings={settings}
          >
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.watermark}
                onChange={() => handleToggle("watermark")}
              />
              <div className="w-11 h-6 bg-zinc-800 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
            </label>
          </SettingItem>
        </section>

        <section className="space-y-6">
          <h3 className="text-[11px] text-center text-zinc-500 uppercase tracking-[0.2em] font-black">
            Advanced Features
          </h3>

          <SettingItem
            id="history"
            title="Max History Items"
            description="Number of recent styles to keep in history"
            infoText="Set to 0 to disable history tracking."
            showInfo={showInfo}
            onToggleInfo={handleToggleInfo}
            settings={settings}
          >
            <input
              type="number"
              min="0"
              max="20"
              value={settings.maxHistory ?? 5}
              onChange={(e) => handleNumberChange("maxHistory", e.target.value)}
              className={`w-16 px-2 py-1 rounded border ${
                settings.themeToggle
                  ? "bg-zinc-800 border-zinc-700 text-white"
                  : "bg-white border-zinc-300 text-black"
              }`}
            />
          </SettingItem>
        </section>

        <section className="flex items-center flex-col gap-2 justify-center">
          <h3
            className={`text-[18px] ${
              settings.themeToggle === false ? "text-black" : "text-white"
            }`}
          >
            Theme Toggle
          </h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={settings.themeToggle}
              onChange={() => handleToggle("themeToggle")}
            />
            <div
              className="bg-black h-7 w-14
                rounded-full
                transition-colors duration-100
                relative
                after:content-[''] after:absolute after:top-[2.5px] after:left-[2.5px]
                after:w-[22px] after:h-[22px]
                after:rounded-full
                after:bg-white
                after:transition-transform after:duration-300
                peer-checked:after:translate-x-[31px]
                peer-checked:bg-white peer-checked:after:bg-black"
            />
          </label>
        </section>

        <footer className="pt-10 border-t border-zinc-900 flex flex-col items-center gap-6">
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm hover:text-red-400 hover:border-red-900/50 transition-all cursor-pointer group"
            onClick={handleResetDefaults}
          >
            <RotateCcw
              size={16}
              className="group-hover:rotate-[-90deg] transition-transform"
            />
            Reset Defaults
          </button>

          {setInputText && (
            <button
              className="text-xs text-zinc-500 hover:text-red-400 transition-colors cursor-pointer underline"
              onClick={() => setInputText("")}
            >
              Clear saved draft text
            </button>
          )}

          <div className="text-center space-y-1">
            <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-[0.3em]">
              Texturae
            </p>
            <p className="text-[9px] text-zinc-700 font-mono uppercase">
              Stylized Text Transformer
            </p>
          </div>
        </footer>

        <Footer settings={settings} setShowSection={setShowSection} />
      </div>
    </div>
  );
}
