// src/sections/History.jsx
import React from "react";
import { Plus, ChevronRight, Trash2 } from "lucide-react";
import Footer from "../layouts/Footer";
import { TEXT_TOOLS } from "../../data/tools";

export default function History({
  setShowSection,
  settings,
  setSettings,
  setOptions,
}) {
  const { history = [], themeToggle } = settings;

  // Build label map
  const labelMap = (() => {
    const map = new Map();
    TEXT_TOOLS.forEach((g) =>
      g.items.forEach((item) => {
        if (!map.has(item.value)) map.set(item.value, item.label);
      }),
    );
    return map;
  })();
  const getLabel = (val) => labelMap.get(val) || val;

  const handleSelect = (val) => {
    setOptions(val);
    setShowSection("main");
  };

  const handleClear = () => {
    setSettings((prev) => ({ ...prev, history: [] }));
  };

  const handleClearOne = (val) => {
    setSettings((prev) => ({
      ...prev,
      history: prev.history.filter((h) => h !== val),
    }));
  };

  return (
    <div
      className={`w-full h-screen pb-70 overflow-y-auto relative flex flex-col items-center py-4 transition-colors ${themeToggle ? "bg-zinc-950" : "bg-white"}`}
    >
      <button
        className={`fixed top-66 right-13 z-50 cursor-pointer ${themeToggle ? "text-white" : "text-black"}`}
        onClick={() => setShowSection("main")}
      >
        <Plus className="rotate-45" size={20} />
      </button>

      <div className="w-full max-w-xl px-6 pt-10 text-center">
        <h2
          className={`text-3xl font-bold mb-2 ${themeToggle ? "text-white" : "text-black"}`}
        >
          Style History
        </h2>
        <p className="text-sm text-zinc-400 mb-6">
          Your recently used styles appear here.
        </p>

        {history.length === 0 ? (
          <div
            className={`text-center text-sm ${themeToggle ? "text-zinc-400" : "text-zinc-600"}`}
          >
            No styles used yet. Start transforming text to build your history.
          </div>
        ) : (
          <div className="space-y-2 text-left">
            {history.map((val, idx) => (
              <div
                key={`${val}-${idx}`}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  themeToggle
                    ? "border-zinc-700 bg-zinc-900 text-white"
                    : "border-zinc-300 bg-white text-black"
                }`}
              >
                <button
                  onClick={() => handleSelect(val)}
                  className="flex-1 text-left flex items-center gap-2"
                >
                  <span>{getLabel(val)}</span>
                  <ChevronRight size={14} className="text-zinc-500" />
                </button>
                <button
                  onClick={() => handleClearOne(val)}
                  className="p-1 hover:bg-red-500/10 rounded transition-colors text-red-400"
                  aria-label="Remove from history"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

            <button
              onClick={handleClear}
              className="mt-4 w-full py-2 text-sm text-red-400 border border-red-400/30 rounded-lg hover:bg-red-500/10 transition-colors"
            >
              Clear All History
            </button>
          </div>
        )}
      </div>

      <Footer settings={settings} setShowSection={setShowSection} />
    </div>
  );
}
