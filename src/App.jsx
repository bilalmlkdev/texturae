// src/App.jsx
import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import Header from "./components/layouts/Header";
import MainLayout from "./components/layouts/MainLayout";
import About from "./components/sections/About";
import Settings from "./components/sections/Settings";
import TestAll from "./components/sections/TestAll";
import History from "./components/sections/History";
import { renderFormattedText } from "./utils/transformers";
import useLocalStorage from "./hooks/useLocalStorage";
import Toast from "./components/ui/Toast";
import { parseShareParams } from "./utils/urlParams";

export default function App() {
  // Read URL params on mount
  const { text: urlText, style: urlStyle } = parseShareParams();

  const [settings, setSettings] = useLocalStorage("texturae_settings", {
    fontSize: 54,
    mono: true,
    autoCopy: false,
    watermark: false,
    themeToggle: true,
    favorites: [],
    history: [],
    maxHistory: 5,
  });
  const [inputTxt, setInputText] = useLocalStorage(
    "texturae_draft",
    urlText || "Type Something cool.",
  );
  const [options, setOptions] = useLocalStorage(
    "texturae_last_tool",
    urlStyle || "doubleStruck",
  );
  const [showSection, setShowSection] = useLocalStorage(
    "texturae_section",
    "main",
  );
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("Copied to clipboard!");
  const [toastType, setToastType] = useState("success");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true); // new state

  // Compute whether raw input exists (trimmed)
  const hasInput = inputTxt.trim() !== "";

  // Memoize output (no combine)
  const textWithOptions = useMemo(() => {
    return renderFormattedText(options, inputTxt);
  }, [options, inputTxt]);

  // Toast helper
  const showToastMessage = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  // Loader for section transitions (existing)
  useLayoutEffect(() => {
    if (showSection === "main") {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [showSection]);

  // Initial load loader – shows for 1s on first mount
  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoad(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Update history when tool changes
  useEffect(() => {
    if (options && options !== "none") {
      setSettings((prev) => {
        const history = [
          options,
          ...prev.history.filter((h) => h !== options),
        ].slice(0, prev.maxHistory || 5);
        return { ...prev, history };
      });
    }
  }, [options, setSettings]);

  const toggleFavorite = useCallback(
    (tool) => {
      setSettings((prev) => {
        const favs = prev.favorites || [];
        if (favs.includes(tool)) {
          return { ...prev, favorites: favs.filter((f) => f !== tool) };
        } else {
          return { ...prev, favorites: [...favs, tool] };
        }
      });
    },
    [setSettings],
  );

  // Determine if loader should show
  const showLoader = isInitialLoad || isLoading;

  return (
    <div
      className={`flex flex-col items-center w-full h-screen md:pt-2 md:gap-2 overflow-auto md:overflow-auto relative transition-colors duration-500 ${
        settings.themeToggle ? "bg-zinc-800" : "bg-zinc-200"
      }`}
    >
      <Header
        inputTxt={inputTxt}
        setInputText={setInputText}
        options={options}
        setOptions={setOptions}
        setShowSection={setShowSection}
        settings={settings}
        setSettings={setSettings}
        output={textWithOptions}
        hasInput={hasInput}
        toggleFavorite={toggleFavorite}
      />

      <div
        className={`w-full h-full overflow-hidden transition-colors duration-500 ${
          settings.themeToggle ? "bg-zinc-950" : "bg-white"
        }`}
      >
        {showLoader && (
          <div className="z-50 flex items-center justify-center bg-inherit backdrop-blur-md animate-in fade-in duration-300 w-full h-full">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-600 rounded-full animate-spin"></div>
              <p
                className={`text-sm font-medium animate-pulse ${!settings.themeToggle ? "text-black" : "text-white"}`}
              >
                {isInitialLoad
                  ? "Loading Texturae..."
                  : `Initialising ${showSection}...`}
              </p>
            </div>
          </div>
        )}

        {!showLoader && (
          <div className="h-full animate-in fade-in slide-in-from-bottom-2 duration-500">
            {showSection === "main" && (
              <MainLayout
                output={textWithOptions}
                setOptions={setOptions}
                showToastMessage={showToastMessage}
                settings={settings}
              />
            )}
            {showSection === "about" && (
              <About setShowSection={setShowSection} settings={settings} />
            )}
            {showSection === "settings" && (
              <Settings
                setShowSection={setShowSection}
                settings={settings}
                setSettings={setSettings}
                setInputText={setInputText}
                setOptions={setOptions}
              />
            )}
            {showSection === "testall" && (
              <TestAll
                setShowSection={setShowSection}
                inputTxt={inputTxt}
                showToastMessage={showToastMessage}
                setOptions={setOptions}
                settings={settings}
              />
            )}
            {showSection === "history" && (
              <History
                setShowSection={setShowSection}
                settings={settings}
                setSettings={setSettings}
                setOptions={setOptions}
              />
            )}
          </div>
        )}
      </div>

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          duration={5000}
          onClose={() => setShowToast(false)}
          themeToggle={settings.themeToggle}
        />
      )}
    </div>
  );
}
