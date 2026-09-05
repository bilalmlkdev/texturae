// src/components/ui/SearchableDropdown.jsx
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Star } from "lucide-react";

export default function SearchableDropdown({
  value,
  onChange,
  groups,
  label,
  disabled = false,
  themeToggle,
  className = "",
  favorites = [],
  onToggleFavorite,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [placement, setPlacement] = useState("bottom");
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reads real DOM layout (getBoundingClientRect) to decide whether the
  // menu should open upward or downward — a genuine external-system
  // read that can only happen after the DOM has painted, not derivable
  // during render.
  useEffect(() => {
    if (isOpen && buttonRef.current && menuRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const menuHeight = menuRef.current.scrollHeight || 240;
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;

      if (spaceBelow < menuHeight && spaceAbove > spaceBelow) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPlacement("top");
      } else {
        setPlacement("bottom");
      }
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      // Reset search when closed so it doesn't linger stale next open
      setSearchTerm("");
    }
  }, [isOpen]);

 
  const flatOptions = [];
  if (groups) {
    const seen = new Set();
    groups.forEach((g) => {
      g.items.forEach((item) => {
        if (!seen.has(item.value)) {
          seen.add(item.value);
          flatOptions.push(item);
        }
      });
    });
  }

  // Build groups-with-favorites, de-duplicated per group too
  let groupsWithFavorites = [];
  if (groups) {
    const dedupedGroups = (() => {
      const seen = new Set();
      return groups.map((g) => ({
        ...g,
        items: g.items.filter((item) => {
          if (seen.has(item.value)) return false;
          seen.add(item.value);
          return true;
        }),
      }));
    })();

    if (favorites.length > 0) {
      const favItems = flatOptions.filter((item) =>
        favorites.includes(item.value),
      );
      if (favItems.length > 0) {
        groupsWithFavorites.push({ group: "★ Favorites", items: favItems });
      }
    }
    groupsWithFavorites.push(...dedupedGroups);
  }

  // Filter based on search
  const filteredGroups = groupsWithFavorites
    .map((g) => ({
      ...g,
      items: g.items.filter(
        (item) =>
          item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.value.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((g) => g.items.length > 0);

  const selectedOption = flatOptions.find((opt) => opt.value === value);
  const displayLabel = selectedOption
    ? selectedOption.label
    : value || "Select...";

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
    setSearchTerm("");
  };

  const themeClasses = themeToggle
    ? "bg-zinc-900 border-zinc-700 text-white hover:border-zinc-500"
    : "bg-white border-zinc-300 text-black hover:border-zinc-500";

  const dropdownClasses = `relative w-full ${className}`;

  return (
    <div className={dropdownClasses} ref={dropdownRef}>
      {label && (
        <label className="block text-[11px] uppercase tracking-wider font-medium mb-1 text-gray-400">
          {label}
        </label>
      )}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[5px] border-2 transition-all outline-none text-[14px] ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        } ${themeClasses}`}
      >
        <span className="truncate">{displayLabel}</span>
        <ChevronDown
          size={16}
          className={`transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && !disabled && (
        <div
          ref={menuRef}
          className={`absolute z-10 w-full mt-1 max-h-64 overflow-y-auto dropdown-scroll rounded-md border shadow-lg ${
            placement === "top" ? "bottom-full mb-1" : "top-full mt-1"
          } ${themeToggle ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-300"}`}
        >
          <div className="p-2 border-b border-zinc-700 sticky top-0 z-10 bg-inherit">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 text-zinc-400" size={14} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search styles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-8 pr-2 py-2 text-sm rounded border ${
                  themeToggle
                    ? "bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500"
                    : "bg-gray-100 border-gray-300 text-black placeholder-gray-400"
                } outline-none focus:border-blue-500`}
              />
            </div>
          </div>

          {filteredGroups.length === 0 && (
            <div className="px-3 py-4 text-center text-sm text-zinc-500">
              No styles match "{searchTerm}"
            </div>
          )}

          {filteredGroups.map((group) => (
            <React.Fragment key={group.group}>
              <div
                className={`px-3 py-1 text-xs font-bold uppercase ${
                  themeToggle ? "text-zinc-500" : "text-gray-400"
                }`}
              >
                {group.group}
              </div>
              {group.items.map((item) => {
                const isFavorite = favorites.includes(item.value);
                return (
                  <button
                    key={`${group.group}-${item.value}`}
                    type="button"
                    onClick={() => handleSelect(item)}
                    className={`w-full text-left px-3 py-2 text-[14px] transition-colors flex items-center justify-between ${
                      item.value === value
                        ? themeToggle
                          ? "bg-blue-600 text-white"
                          : "bg-blue-100 text-blue-900"
                        : themeToggle
                          ? "hover:bg-zinc-800 text-white"
                          : "hover:bg-gray-100 text-black"
                    }`}
                  >
                    <span>{item.label}</span>
                    {onToggleFavorite && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(item.value);
                        }}
                        className="ml-2 p-1 hover:bg-white/10 rounded cursor-pointer"
                        aria-label={
                          isFavorite ? "Remove favorite" : "Add favorite"
                        }
                      >
                        <Star
                          size={14}
                          className={
                            isFavorite
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-zinc-500"
                          }
                        />
                      </button>
                    )}
                  </button>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
