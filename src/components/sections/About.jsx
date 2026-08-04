// src/sections/About.jsx
import React from "react";
import { Plus } from "lucide-react";
import Footer from "../layouts/Footer";

export default function About({ setShowSection, settings }) {
  return (
    <div
      className={`w-full h-screen pb-70 overflow-y-auto relative ${
        settings.themeToggle === false ? "text-black" : "text-white"
      } flex flex-col items-center py-4`}
    >
      <button
        className={`${
          settings.themeToggle === false ? "text-black" : "text-white"
        } rounded-full cursor-pointer fixed top-66 right-13`}
        onClick={() => setShowSection("main")}
      >
        <Plus className="rotate-45" size={20} />
      </button>
      <div className="flex flex-col items-center gap-2 max-w-xl mx-auto pt-10 px-4">
        {/* Banner image removed */}
        <article
          className={`leading-6 text-base ${
            settings.themeToggle === false ? "text-black" : "text-white"
          } font-outfit pb-30`}
        >
          <header className="mb-6 text-center">
            <h1 className="text-3xl font-bold font-outfit tracking-tight">
              About Texturae
            </h1>
            <p className="text-lg mt-2 text-zinc-600 font-medium">
              Understand the tool, the engine, and the vision.
            </p>
          </header>

          <p className="text-lg leading-6 mb-6">
            <strong>Texturae</strong> is a real‑time text transformation tool
            built with{" "}
            <span
              className={`${
                settings.themeToggle === false ? "text-[#9B26FF]" : "text-white"
              } font-semibold`}
            >
              React
            </span>
            . It converts plain text into a wide variety of stylised outputs –
            from ASCII block art to decorative Unicode symbols, developer‑ready
            comment wrappers, and even encoding/cipher tools – using a custom
            <em> character‑mapping engine</em>. No actual fonts are used – every
            style is a deterministic transformation of the input characters.
          </p>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">Core Features</h2>
            <ul className="pl-3 list-disc marker:text-slate-400 space-y-1">
              <li>
                <strong>Live Editor:</strong> Real‑time formatting updates on
                every keystroke.
              </li>
              <li>
                <strong>Test All Sandbox:</strong> Preview every available
                transformation style in a responsive card grid.
              </li>
              <li>
                <strong>One‑Click Copy:</strong> Clipboard copy with toast
                feedback.
              </li>
              <li>
                <strong>Image Export:</strong> Export stylised blocks as
                high‑quality PNGs using{" "}
                <code
                  className={`px-1 py-0.5 rounded ${
                    settings.themeToggle === false
                      ? "bg-black text-white"
                      : "bg-[#9B26FF] text-white"
                  }`}
                >
                  html-to-image
                </code>
                .
              </li>
              <li>
                <strong>Native Sharing:</strong> Mobile‑friendly sharing via the
                Web Share API.
              </li>
              <li>
                <strong>Favorites & History:</strong> Star your go‑to styles and
                quickly access recent ones.
              </li>
            </ul>
          </section>

          <section className="mb-6 space-y-4">
            <h2 className="text-2xl font-semibold">The Transformer Engine</h2>
            <p className="leading-5">
              Powered by{" "}
              <code
                className={`px-1 py-0.5 rounded ${
                  settings.themeToggle === false
                    ? "bg-black text-white"
                    : "bg-[#9B26FF] text-white"
                }`}
              >
                transformers.js
              </code>
              , the engine uses character‑substitution rules, Unicode glyphs,
              decorative wrappers, and encoding algorithms to generate unique
              visual outputs. The engine is extensible – new styles can be added
              easily by adding a function to the tool registry.
            </p>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                Categories of Transformations
              </h3>
              <ul className="space-y-1 pl-6 list-disc">
                <li>
                  <strong>Stylised Text:</strong> Bold, italic, script, gothic,
                  small caps, superscript, subscript, and more.
                </li>
                <li>
                  <strong>ASCII Art:</strong> Big, blocky, slant, shadow,
                  bubble, digital, and other block‑based styles.
                </li>
                <li>
                  <strong>Encoding/Decoding:</strong> Base64, URL, Hex, Binary,
                  ROT13, Caesar cipher, Morse code, and more.
                </li>
                <li>
                  <strong>Developer Case:</strong> camelCase, PascalCase,
                  snake_case, kebab-case, CONSTANT_CASE.
                </li>
                <li>
                  <strong>Novelty:</strong> Zalgo, sPoNgEbOb, NATO phonetic,
                  upside‑down text, and more.
                </li>
                <li>
                  <strong>Text Manipulation:</strong> Reverse, shuffle, remove
                  vowels, duplicate letters, sort words, etc.
                </li>
                <li>
                  <strong>Ciphers & Codes:</strong> Atbash, ROT47, A1Z26, Bacon,
                  Tap code, run‑length encoding.
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-1">
            <h2 className="text-2xl font-semibold">Tech Stack</h2>
            <ul className="space-y-1 pl-6 list-disc">
              <li>
                <strong>Frontend:</strong> React with{" "}
                <code
                  className={`px-1 py-0.5 rounded ${
                    settings.themeToggle === false
                      ? "bg-black text-white"
                      : "bg-[#9B26FF] text-white"
                  }`}
                >
                  useState
                </code>{" "}
                and{" "}
                <code
                  className={`px-1 py-0.5 rounded ${
                    settings.themeToggle === false
                      ? "bg-black text-white"
                      : "bg-[#9B26FF] text-white"
                  }`}
                >
                  useRef
                </code>
              </li>
              <li>
                <strong>Styling:</strong> Tailwind CSS v4 with modern{" "}
                <code
                  className={`px-1 py-0.5 rounded ${
                    settings.themeToggle === false
                      ? "bg-black text-white"
                      : "bg-[#9B26FF] text-white"
                  }`}
                >
                  @theme
                </code>
              </li>
              <li>
                <strong>Icons:</strong> lucide-react
              </li>
              <li>
                <strong>Utilities:</strong> html-to-image
              </li>
            </ul>
          </section>

          <section className="pt-4 border-t border-slate-700/50 mt-6">
            <h2 className="text-xl font-semibold mb-2">Roadmap & Updates</h2>
            <p className="leading-6">
              Texturae is continuously evolving. I push updates regularly,
              focusing on expanding the library of character transformations,
              adding wilder stylistic effects, and optimising the mobile
              experience. If you have an idea for a new style or spot a bug,
              reach out!
            </p>
          </section>
          <Footer settings={settings} setShowSection={setShowSection} />
        </article>
      </div>
    </div>
  );
}
