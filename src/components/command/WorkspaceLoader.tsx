"use client";

import { motion } from "framer-motion";

interface Props {
  title: string;
}

export default function WorkspaceLoader({
  title,
}: Props) {
  return (
    <motion.div
      className="flex h-full flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h2
        className="mb-8 text-xl tracking-[0.4em] text-cyan-300 uppercase"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        Accessing Module
      </motion.h2>

      <div className="mb-6 h-2 w-80 overflow-hidden rounded-full bg-cyan-500/10">
        <motion.div
          className="h-full bg-cyan-400"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
        />
      </div>

      <p className="text-gray-400">
        Loading {title}...
      </p>
    </motion.div>
  );
}