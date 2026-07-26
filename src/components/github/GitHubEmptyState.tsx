"use client";

import { motion } from "framer-motion";
import { SearchX } from "lucide-react";

interface Props {
  onReset: () => void;
}

export default function GitHubEmptyState({
  onReset,
}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-cyan-500/20
        bg-black/30
        p-10
        text-center
      "
    >
      <SearchX
        size={60}
        className="mb-5 text-cyan-400"
      />

      <h2 className="text-xl font-semibold text-cyan-300">
        No repositories found
      </h2>

      <p className="mt-2 max-w-md text-sm text-gray-400">
        Try changing your search, language filter,
        or sorting options.
      </p>

      <button
        onClick={onReset}
        className="
          mt-6
          rounded-xl
          border
          border-cyan-500/20
          px-5
          py-2.5
          text-cyan-300
          transition
          hover:bg-cyan-500/10
        "
      >
        Reset Filters
      </button>
    </motion.div>
  );
}