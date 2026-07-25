"use client";

import { motion } from "framer-motion";

export default function Glow() {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/10 blur-3xl"
      animate={{
        opacity: [0.15, 0.25, 0.15],
        scale: [1, 1.08, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}