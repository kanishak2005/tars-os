"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  label: string;
  value: number;
}

export default function ProgressBar({
  label,
  value,
}: ProgressBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-cyan-300">
          {label}
        </span>

        <span className="text-white">
          {value}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded bg-white/10">
        <motion.div
          className="h-full rounded bg-cyan-400"
          animate={{ width: `${value}%` }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}