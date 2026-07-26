"use client";

import { motion } from "framer-motion";
import { LucideIcon, ExternalLink } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  value: string;
  subtitle: string;
  iconColor: string;

  onClick?: () => void;
}

export default function GitHubInsightCard({
  icon: Icon,
  title,
  value,
  subtitle,
  iconColor,
  onClick,
}: Props) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration: 0.25,
      }}
      onClick={onClick}
      className="
        group
        cursor-pointer
        rounded-2xl
        border
        border-cyan-500/20
        bg-black/40
        backdrop-blur-xl
        p-6
        transition-all
        hover:border-cyan-400/60
        hover:bg-cyan-500/10
        hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]
      "
    >
      <div className="flex items-start justify-between">
        <div
          className="
            rounded-xl
            bg-cyan-500/10
            p-3
          "
        >
          <Icon
            size={22}
            className={iconColor}
          />
        </div>

        <ExternalLink
          size={18}
          className="
            text-gray-500
            opacity-0
            transition
            group-hover:opacity-100
          "
        />
      </div>

      <h3
        className="
          mt-6
          text-sm
          uppercase
          tracking-widest
          text-gray-500
        "
      >
        {title}
      </h3>

      <h2
        className="
          mt-2
          text-xl
          font-bold
          text-white
          break-words
        "
      >
        {value}
      </h2>

      <p className="mt-3 text-sm text-cyan-300">
        {subtitle}
      </p>
    </motion.div>
  );
}