"use client";

import { useEffect } from "react";
import { useNavigation } from "@/context/NavigationContext";
import { navigation } from "@/data/navigation";

export default function useKeyboardNavigation() {
  const {
  activePage,
  setActivePage,
  setCommandPaletteOpen,
} = useNavigation();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
  const target = event.target as HTMLElement;

  if (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA"
  ) {
    return;
  }

  const pages = navigation.flatMap((item) => [
    item.id,
    ...(item.children?.map((child) => child.id) ?? []),
  ]);

  const currentIndex = pages.indexOf(activePage);

  // ---------------------------
  // Arrow Navigation
  // ---------------------------

  if (event.key === "ArrowDown") {
    event.preventDefault();

    const next =
      pages[(currentIndex + 1) % pages.length];

    setActivePage(next as any);
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();

    const previous =
      pages[
        (currentIndex - 1 + pages.length) %
          pages.length
      ];

    setActivePage(previous as any);
  }

  // ---------------------------
  // Desktop Shortcuts
  // ---------------------------

  if (event.ctrlKey && event.key.toLowerCase() === "h") {
    event.preventDefault();
    setActivePage("commander");
  }

  if (event.ctrlKey && event.key.toLowerCase() === "g") {
    event.preventDefault();
    setActivePage("github");
  }

  if (event.ctrlKey && event.key.toLowerCase() === "m") {
    event.preventDefault();
    setActivePage("missions");
  }

  if (event.ctrlKey && event.key.toLowerCase() === "k") {
  event.preventDefault();
  setCommandPaletteOpen(true);
}

if (event.key === "Escape") {
  event.preventDefault();
  setCommandPaletteOpen(false);
}

  if (event.ctrlKey && event.key === "`") {
    event.preventDefault();
    setActivePage("terminal");
  }
}

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [
  activePage,
  setActivePage,
  setCommandPaletteOpen,
]);
}