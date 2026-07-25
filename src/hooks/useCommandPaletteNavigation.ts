"use client";

import { useEffect } from "react";

import { commands } from "@/data/commands";
import { useNavigation } from "@/context/NavigationContext";

export default function useCommandPaletteNavigation() {
  const {
    commandPaletteOpen,
    searchQuery,

    selectedCommand,
    setSelectedCommand,

    setActivePage,
    setCommandPaletteOpen,
    setSearchQuery,

    recentCommands,
    setRecentCommands,
  } = useNavigation();

  const filtered = commands.filter((command) => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return true;

    return (
      command.title.toLowerCase().includes(query) ||
      command.keywords.some((keyword) =>
        keyword.toLowerCase().includes(query)
      )
    );
  });

  useEffect(() => {
    if (!commandPaletteOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (filtered.length === 0) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();

          setSelectedCommand((prev) =>
            prev + 1 >= filtered.length ? 0 : prev + 1
          );
          break;

        case "ArrowUp":
          event.preventDefault();

          setSelectedCommand((prev) =>
            prev === 0 ? filtered.length - 1 : prev - 1
          );
          break;

        case "Home":
          event.preventDefault();
          setSelectedCommand(0);
          break;

        case "End":
          event.preventDefault();
          setSelectedCommand(filtered.length - 1);
          break;

        case "Tab":
          event.preventDefault();

          if (event.shiftKey) {
            setSelectedCommand((prev) =>
              prev === 0 ? filtered.length - 1 : prev - 1
            );
          } else {
            setSelectedCommand((prev) =>
              prev + 1 >= filtered.length ? 0 : prev + 1
            );
          }
          break;

        case "Enter": {
          event.preventDefault();

          const selected = filtered[selectedCommand];

          if (!selected) return;

          // Navigate
          setActivePage(selected.id as any);

          // Save in recent commands
          setRecentCommands((prev) => {
            const updated = [
              selected.id,
              ...prev.filter((id) => id !== selected.id),
            ];

            return updated.slice(0, 5);
          });

          // Close palette
          setCommandPaletteOpen(false);

          // Reset state
          setSearchQuery("");
          setSelectedCommand(0);

          break;
        }

        case "Escape":
          event.preventDefault();

          setCommandPaletteOpen(false);
          setSearchQuery("");
          setSelectedCommand(0);
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [
    commandPaletteOpen,
    filtered,
    selectedCommand,
    searchQuery,

    setActivePage,
    setCommandPaletteOpen,
    setSearchQuery,
    setSelectedCommand,
    setRecentCommands,
  ]);
}