"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import { NavigationPage } from "@/types/navigation";

interface NavigationContextType {
  // Navigation
  activePage: string;
  setActivePage: (page: string) => void;

  // Sidebar
  expandedSections: string[];
  toggleSection: (section: string) => void;

  // Repository
  selectedRepository: any | null;
  setSelectedRepository: (repo: any | null) => void;

  // Missions
  selectedMission: string | null;
  setSelectedMission: (mission: string | null) => void;

  // UI
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;

  selectedCommand: number;
  setSelectedCommand: React.Dispatch<React.SetStateAction<number>>;
recentCommands: string[];
setRecentCommands: React.Dispatch<
  React.SetStateAction<string[]>
>;
}

const NavigationContext =
  createContext<NavigationContextType | null>(null);

export function NavigationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [activePage, setActivePage] =
    useState<NavigationPage>("commander");
  const [expandedSections, setExpandedSections] = useState<string[]>(["missions", "github"]);
  function toggleSection(section: string) {
  setExpandedSections((prev) =>
    prev.includes(section)
      ? prev.filter((item) => item !== section)
      : [...prev, section]
  );
}
  const [selectedRepository, setSelectedRepository] =
  useState<any | null>(null);

  const [selectedMission, setSelectedMission] =
  useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] =
  useState("");

  const [recentCommands, setRecentCommands] = useState<string[]>([]);

  const [commandPaletteOpen, setCommandPaletteOpen] =
  useState(false);
  const [selectedCommand, setSelectedCommand] = useState(0);
  return (
    <NavigationContext.Provider
      value={{
  activePage,
  setActivePage,

  expandedSections,
  toggleSection,

  selectedRepository,
  setSelectedRepository,

  selectedMission,
  setSelectedMission,

  commandPaletteOpen,
  setCommandPaletteOpen,

  searchQuery,
  setSearchQuery,

  selectedCommand,
  setSelectedCommand,

  recentCommands,
  setRecentCommands,

  }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);

  if (!context)
    throw new Error(
      "useNavigation must be used inside NavigationProvider"
    );

  return context;
}