"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function WorkspaceContainer({
  title,
  subtitle,
  children,
}: Props) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className="
        flex h-full flex-col
        rounded-xl
        border border-cyan-500/20
        bg-black/20
        backdrop-blur-md
        overflow-hidden
      "
    >
      {/* Header */}
      <div className="border-b border-cyan-500/20 px-8 py-6">
        <h1 className="text-3xl font-bold text-cyan-300">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 text-gray-400">
            {subtitle}
          </p>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-8">
        {children}
      </div>
    </motion.section>
  );
}