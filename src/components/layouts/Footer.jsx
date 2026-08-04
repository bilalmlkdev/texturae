// src/components/layout/Footer.jsx
import React from "react";
import { links } from "../../data/data";

export default function Footer({ settings, setShowSection }) {
  return (
    <footer className="mt-15 flex flex-col items-center gap-3">
      <div className="flex gap-6">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className={`transition-all hover:scale-110 ${
                settings.themeToggle ? "text-white" : "text-black"
              }`}
            >
              <Icon size={24} />
            </a>
          );
        })}
      </div>

      <button
        onClick={() => setShowSection("main")}
        className={`flex items-center justify-center text-[14px] gap-2 border rounded-[8px] py-[5px] px-4 transition-all relative top-10 cursor-pointer ${
          settings.themeToggle
            ? "border-zinc-800 bg-zinc-950 text-zinc-200"
            : "border-zinc-300 bg-white text-black"
        }`}
      >
        Done
      </button>
    </footer>
  );
}
