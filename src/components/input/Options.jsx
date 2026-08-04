// src/components/input/Options.jsx
import React from "react";
import SearchableDropdown from "../ui/SearchableDropdown";
import { TEXT_TOOLS } from "../../data/tools";

export default function Options({
  options,
  setOptions,
  setShowSection,
  settings,
  hasInput,
  toggleFavorite,
}) {
  return (
    <div className="flex flex-col items-start gap-1 w-full font-outfit">
      <SearchableDropdown
        label="Transform Style:"
        value={options}
        onChange={(val) => {
          setOptions(val);
          setShowSection("main");
        }}
        groups={TEXT_TOOLS}
        disabled={!hasInput}
        themeToggle={settings.themeToggle}
        className="w-full"
        favorites={settings.favorites || []}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}
