// src/sections/TestAll.jsx
import React from "react";
import { Plus } from "lucide-react";
import { TEXT_TOOLS } from "../../data/tools";
import PreviewFont from "../output/PreviewFont";
import Footer from "../layouts/Footer";

export default function TestAll({
  inputTxt,
  setShowSection,
  showToastMessage,
  setOptions,
  settings,
}) {
  const totalFonts = TEXT_TOOLS.reduce(
    (acc, group) => acc + group.items.length,
    0,
  );

  return (
    <div
      className={`w-full h-screen pb-100 overflow-y-auto relative flex flex-col items-center transition-colors ${settings.themeToggle ? "bg-zinc-950" : "bg-white"}`}
    >
      <button
        className={`fixed top-66 right-13 z-50 cursor-pointer ${
          settings.themeToggle ? "text-white" : "text-black"
        }`}
        onClick={() => setShowSection("main")}
      >
        <Plus className="rotate-45" size={20} />
      </button>

      <div className="w-full max-w-2xl px-6 pt-10 text-center">
        {/* Banner image removed */}
        <div className="mb-6">
          <h2
            className={`text-3xl font-bold ${settings.themeToggle ? "text-white" : "text-black"}`}
          >
            Test All Styles
          </h2>
          <p className="text-sm text-zinc-400 mt-2">
            Preview every transformation style at once.
          </p>
        </div>
        <div className="inline-block px-4 py-1 font-outfit mb-4">
          <p className="text-blue-400 text-xs font-medium tracking-tight uppercase">
            Number of Styles:&nbsp; {totalFonts}
          </p>
        </div>
      </div>

      <div className="w-full max-w-full flex flex-col mt-6">
        {TEXT_TOOLS.map((group) => (
          <React.Fragment key={group.group}>
            <div
              className={`px-4 py-2 text-xs font-black uppercase font-outfit flex items-center gap-1 ${
                settings.themeToggle ? "text-white" : "text-black"
              } mt-8`}
            >
              Group<span className="relative bottom-[1.5px]">:</span>{" "}
              {group.group}
            </div>

            {group.items.map((font) => (
              <PreviewFont
                key={font.value}
                opt={font.value}
                inputTxt={inputTxt}
                showToastMessage={showToastMessage}
                setOptions={setOptions}
                setShowSection={setShowSection}
                settings={settings}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
      <Footer settings={settings} setShowSection={setShowSection} />
    </div>
  );
}
