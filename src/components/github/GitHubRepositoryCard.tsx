"use client";

import { Star, GitFork } from "lucide-react";
import { languageColors } from "@/lib/githubLanguageColors";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { useNavigation } from "@/context/NavigationContext";

interface Props {
  repository: any;
}

export default function GitHubRepositoryCard({
  repository,
}: Props) {
  const { setSelectedRepository } = useNavigation();

  return (
    <motion.div
      onClick={() => {
  console.log("Clicked:", repository.name);
  setSelectedRepository(repository);
}}
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        cursor-pointer
        rounded-2xl
        border border-cyan-500/20
        bg-black/40
        backdrop-blur-xl
        p-5
        transition-all
        hover:border-cyan-400/70
        hover:bg-cyan-500/10
        hover:shadow-[0_0_25px_rgba(6,182,212,0.25)]
      "
    >
      {/* Repository Name */}
      <h3 className="text-lg font-semibold text-cyan-300">
        {repository.name}
      </h3>

      {/* Description */}
      <p className="mt-2 line-clamp-2 text-sm text-gray-400">
        {repository.description ??
          "Repository description not provided."}
      </p>

      {/* Language + Stats */}
      <div className="mt-5 flex items-center justify-between">
        {/* Language */}
        <div className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-full"
            style={{
              backgroundColor:
                languageColors[repository.language] ??
                "#06b6d4",
            }}
          />

          <span className="text-sm text-gray-300">
            {repository.language ?? "Unknown"}
          </span>
        </div>

        {/* Stars & Forks */}
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Star size={14} />
            {repository.stargazers_count}
          </div>

          <div className="flex items-center gap-1">
            <GitFork size={14} />
            {repository.forks_count}
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <p className="mt-4 text-xs text-gray-500">
        Updated{" "}
        {formatDistanceToNow(
          new Date(repository.updated_at),
          {
            addSuffix: true,
          }
        )}
      </p>

      {/* Open Repository */}
      <motion.a
        href={repository.html_url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.95,
        }}
        className="
          mt-5
          inline-flex
          items-center
          rounded-lg
          border
          border-cyan-500/20
          px-4
          py-2
          text-sm
          text-cyan-300
          transition
          hover:bg-cyan-500/10
        "
      >
        Open Repository →
      </motion.a>
    </motion.div>
  );
}