"use client";

import { motion } from "framer-motion";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function GitHubSearch({
  value,
  onChange,
}: Props) {
  return (
    <motion.input
      whileFocus={{
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
      }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search repositories..."
      className="
        w-full
        rounded-xl
        border
        border-cyan-500/20
        bg-black/40
        px-4
        py-3
        text-sm
        text-cyan-100
        placeholder:text-gray-500
        outline-none
        transition
        focus:border-cyan-400
        focus:ring-2
        focus:ring-cyan-500/20
      "
    />
  );
}