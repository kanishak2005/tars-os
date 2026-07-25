"use client";

import { motion } from "framer-motion";
import { History } from "lucide-react";
import { useNavigation } from "@/context/NavigationContext";

interface Props {
  command: {
    id: string;
    title: string;
  };

  active: boolean;
  recent?: boolean;
}

export default function CommandResultItem({
  command,
  active,
  recent,
}: Props) {
  const {
    setRecentCommands,
    setActivePage,
    setCommandPaletteOpen,
  } = useNavigation();

  function executeCommand() {
    setActivePage(command.id);

    setCommandPaletteOpen(false);

    setSearchQuery("");

    setSelectedCommand(0);
  }

  return (
    <motion.button
     id={`command-${command.id}`}
  whileHover={{ x: 6 }}
  whileTap={{ scale: 0.98 }}
  animate={{
    scale: active ? 1.015 : 1,
  }}
  transition={{
    duration: 0.18,
    ease: "easeOut",
  }}
  className={`
relative flex w-full items-center rounded-lg
px-5 py-4 text-left transition-all duration-300

${
  active
    ? "border border-cyan-400/40 bg-cyan-500/20 text-cyan-200 shadow-[0_0_25px_rgba(34,211,238,0.18)]"
    : "border border-transparent text-gray-300 hover:bg-cyan-500/10"
}
`}
>
  {active && (
  <motion.div
    layoutId="commandCursor"
    className="mr-3 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]"
    transition={{
      type: "spring",
      stiffness: 350,
      damping: 28,
    }}
  />
)}
<motion.span
  animate={{
    x: active ? 4 : 0,
  }}
  transition={{
    duration: 0.2,
  }}
>
</motion.span>
  {command.title}
</motion.button>
  );
}