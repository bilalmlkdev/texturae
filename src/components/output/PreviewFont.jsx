// src/components/output/PreviewFont.jsx
import { Copy, Image, Check } from "lucide-react";
import { toPng } from "html-to-image";
import { useRef } from "react";
import { renderFormattedText } from "../../utils/transformers";

export default function PreviewFont({
  opt,
  inputTxt,
  showToastMessage,
  setOptions,
  setShowSection,
  settings,
}) {
  const cardRef = useRef(null);

  const textToCopy = renderFormattedText(opt, inputTxt);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        backgroundColor: settings.themeToggle ? "#09090b" : "#ffffff",
        style: { padding: "20px" },
      });
      const link = document.createElement("a");
      link.download = `texturae-${opt}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Image export failed:", err);
      showToastMessage?.("Couldn't save the image — try again.", "error");
    }
  };

  const handleCopy = async () => {
    if (!textToCopy) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      showToastMessage?.("Copied to clipboard!", "success");
    } catch (err) {
      console.error("Copy failed:", err);
      showToastMessage?.("Couldn't copy — try again.", "error");
    }
  };

  // buttons were hardcoded dark regardless of theme
  const btnClass = `flex items-center justify-center text-[14px] gap-2 border rounded-[8px] py-[5px] px-2.5 transition-all cursor-pointer ${
    settings.themeToggle
      ? "border-zinc-700 bg-zinc-950 text-zinc-200 hover:bg-zinc-900"
      : "border-zinc-300 bg-white text-black hover:bg-zinc-100"
  }`;

  return (
    <div
      className={`mx-4 p-6 transition-colors border-b ${settings.themeToggle ? "border-white/10" : "border-black/10"}`}
    >
      <span className="text-[10px] uppercase text-blue-500 font-black tracking-[0.2em]">
        {opt}
      </span>

      <div
        ref={cardRef}
        className={`my-4 p-6 transition-all ${
          settings.themeToggle
            ? "bg-zinc-950 text-white"
            : "bg-white text-black"
        }`}
      >
        <pre className="text-xl md:text-7xl md:max-w-full whitespace-pre-wrap break-words font-mono leading-tight">
          {textToCopy || "No input provided"}
        </pre>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-4">
        <button onClick={handleCopy} className={btnClass}>
          <Copy size={15} /> Copy
        </button>

        <button onClick={handleDownload} className={btnClass}>
          <Image size={15} /> Save Image
        </button>

        <button
          onClick={() => {
            setOptions(opt);
            setShowSection("main");
          }}
          className={btnClass}
        >
          <Check size={15} /> Use this style
        </button>
      </div>
    </div>
  );
}
