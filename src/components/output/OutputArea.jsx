// src/components/output/OutputArea.jsx
import React from "react";

export default function OutputArea({ output, settings, reff }) {
  return (
    <div
      ref={reff}
      className={`${settings.themeToggle === false ? "bg-white text-black " : "bg-zinc-950 text-white "} min-h-25 relative flex items-center justify-start pb-2 pt-4 pr-5 `}
    >
      {settings.watermark && (
        <div
          className={`absolute bottom-0.5 right-1 text-[10px] ${settings.themeToggle === false ? " text-black " : "text-white"}`}
        >
          <p>Generated via Texturae</p>
        </div>
      )}
      {output ? (
        <div
          style={{ fontSize: `${settings.fontSize}px` }}
          className="relative bottom-2 left-2.5 whitespace-pre-wrap break-words"
        >
          {output}
        </div>
      ) : (
        <div
          className={`relative bottom-2 left-2.5 text-sm italic opacity-50 ${
            settings.themeToggle === false ? "text-black" : "text-white"
          }`}
        >
          Your styled text will appear here...
        </div>
      )}
    </div>
  );
}
