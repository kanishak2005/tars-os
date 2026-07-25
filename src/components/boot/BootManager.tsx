"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import BootScreen from "./BootScreen";
import CommandCenter from "../command/CommandCenter";

export default function BootManager() {
  const [bootFinished, setBootFinished] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!bootFinished ? (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <BootScreen
            onComplete={() => setBootFinished(true)}
          />
        </motion.div>
      ) : (
        <motion.div
          key="command"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <CommandCenter />
        </motion.div>
      )}
    </AnimatePresence>
  );
}