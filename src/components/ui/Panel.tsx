"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PanelProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function Panel({
  title,
  children,
  className = "",
}: PanelProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        relative
        rounded-xl
        border
        border-cyan-400/20
        bg-black/30
        backdrop-blur-md
        p-7
        overflow-hidden
        ${className}
      `}
    >
      {/* Top glowing line */}
      <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-[0.2em] text-cyan-300 uppercase">
          {title}
        </h2>

        <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
      </div>

      {/* Content */}
      <div>{children}</div>
    </motion.section>
  );
}