"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useNavigation } from "@/context/NavigationContext";

import CommandSearch from "./CommandSearch";
import CommandResults from "./CommandResults";

export default function CommandPalette() {
  const {
  commandPaletteOpen,
  setCommandPaletteOpen,
  setSearchQuery,
  setSelectedCommand,
} = useNavigation();

const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  if (commandPaletteOpen) {
    inputRef.current?.focus();
  }
}, [commandPaletteOpen]);

  useEffect(() => {
  if (commandPaletteOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [commandPaletteOpen]);

useEffect(() => {
  if (!commandPaletteOpen) {
    setSearchQuery("");
    setSelectedCommand(0);
  }
}, [
  commandPaletteOpen,
  setSearchQuery,
  setSelectedCommand,
]);

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={() => setCommandPaletteOpen(false)}
          className="
            fixed inset-0 z-[200]
            flex items-start justify-center
            bg-black/55
            backdrop-blur-md
            pt-28
          "
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{
              opacity: 0,
              y: -30,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -20,
              scale: 0.98,
            }}
            transition={{
              duration: 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              w-[700px]
              overflow-hidden
              rounded-2xl
              border border-cyan-400/20
              bg-slate-950/95
              shadow-[0_0_80px_rgba(34,211,238,0.15)]
            "
          >
            <CommandSearch />
            <CommandResults />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}