"use client";

import { motion } from "framer-motion";

export default function ScanLines() {
  return (
    <>
      <div
        className="
        absolute inset-0
        opacity-[0.03]
        bg-[linear-gradient(to_bottom,transparent_50%,white_51%,transparent_52%)]
        bg-[length:100%_6px]
      "
      />

      <motion.div
        className="
          absolute left-0 h-px w-full
          bg-cyan-300/30 blur-sm
        "
        animate={{
          top: ["-10%", "110%"],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </>
  );
}