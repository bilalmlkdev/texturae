// src/layouts/MainLayout.jsx
import React, { useRef, useState, useEffect } from "react";
import OutputArea from "../output/OutputArea";
import ExportOptions from "../output/ExportOptions";
import DownloadImage from "../output/DownloadImage";
import { toPng } from "html-to-image";

export default function MainLayout({ output, showToastMessage, settings }) {
  const outputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [hitDownload, setHitDownload] = useState(false);
  const [isStale, setIsStale] = useState(false);
  const lastOutputRef = useRef(output);

  const generatePreview = async () => {
    if (!outputRef.current) return;
    const dataUrl = await toPng(outputRef.current, {
      cacheBust: true,
      backgroundColor: settings.themeToggle ? "#09090b" : "#ffffff",
    });
    setPreviewUrl(dataUrl);
    lastOutputRef.current = output;
    setIsStale(false);
  };

  const handleOpenPreview = async () => {
    try {
      await generatePreview();
      setHitDownload(true);
    } catch (err) {
      console.error("Image export failed:", err);
      showToastMessage?.("Couldn't generate the image — try again.", "error");
      throw err;
    }
  };

  const handleRefreshPreview = async () => {
    try {
      await generatePreview();
    } catch (err) {
      console.error("Image export failed:", err);
      showToastMessage?.("Couldn't refresh the preview — try again.", "error");
    }
  };

  const saveImageToDisk = () => {
    if (!previewUrl) return;
    const link = document.createElement("a");
    link.download = `texturae-${Date.now()}.png`;
    link.href = previewUrl;
    link.click();
  };

  // Mark the preview stale once the user has generated one and then
  // changed the pattern settings again — reacts to `output` changing,
  // rather than mutating state directly during render.
  useEffect(() => {
    if (hitDownload && output !== lastOutputRef.current && !isStale) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsStale(true);
    }
  }, [output, hitDownload, isStale]);

  return (
    <div className="w-full h-full py-6 px-4 md:px-7 flex flex-col items-start overflow-x-auto">
      <div className="flex justify-center mb-10 mt-5 relative right-2">
        <OutputArea output={output} settings={settings} reff={outputRef} />
      </div>

      <div className="w-full max-w-2xl">
        <ExportOptions
          output={output}
          showToastMessage={showToastMessage}
          setHitDownload={handleOpenPreview}
          settings={settings}
        />
      </div>

      {hitDownload && (
        <DownloadImage
          setHitDownload={setHitDownload}
          onDownload={saveImageToDisk}
          onRefreshPreview={handleRefreshPreview}
          imageUrl={previewUrl}
          isStale={isStale}
          showToastMessage={showToastMessage}
          settings={settings}
        />
      )}
    </div>
  );
}
