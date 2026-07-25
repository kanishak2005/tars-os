"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useNavigation } from "@/context/NavigationContext";
import { moduleTitles } from "@/constants/moduleTitles";

import WorkspaceLoader from "./WorkspaceLoader";

import CommanderPanel from "./panels/CommanderPanel";
import MissionPanel from "./panels/MissionPanel";
import ActiveMissionsPanel from "./panels/ActiveMissionsPanel";
import ArchivedMissionsPanel from "./panels/ArchivedMissionsPanel";
import GitHubPanel from "./panels/GitHubPanel";
import ProjectsPanel from "./panels/ProjectsPanel";
import OpenSourcePanel from "./panels/OpenSourcePanel";
import SystemHealthPanel from "./panels/SystemHealthPanel";

import Terminal from "@/components/terminal/Terminal";

export default function Workspace() {
  const { activePage } = useNavigation();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [activePage]);

  function renderPage() {
    switch (activePage) {
      case "missions":
        return <MissionPanel />;

      case "active-missions":
        return <ActiveMissionsPanel />;

      case "archived-missions":
        return <ArchivedMissionsPanel />;

      case "github":
        return <GitHubPanel />;

      case "projects":
        return <ProjectsPanel />;

      case "opensource":
        return <OpenSourcePanel />;

      case "terminal":
        return <Terminal />;

      case "settings":
        return <SystemHealthPanel />;

      default:
        return <CommanderPanel />;
    }
  }

  return (
    <main className="flex-1 overflow-hidden p-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={activePage}
          initial={{
            opacity: 0,
            y: 18,
            filter: "blur(6px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
            y: -18,
            filter: "blur(6px)",
          }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-full"
        >
          {loading ? (
            <WorkspaceLoader title={moduleTitles[activePage]} />
          ) : (
            renderPage()
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}