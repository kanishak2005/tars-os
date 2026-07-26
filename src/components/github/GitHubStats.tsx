"use client";

import { motion } from "framer-motion";
import {
  FolderGit2,
  Star,
  GitFork,
  Code2,
} from "lucide-react";

interface Props {
  repositories: any[];
}

export default function GitHubStats({
  repositories,
}: Props) {
  const totalRepos = repositories.length;

  const totalStars = repositories.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );

  const totalForks = repositories.reduce(
    (sum, repo) => sum + repo.forks_count,
    0
  );

  const languages = new Set(
    repositories
      .map((repo) => repo.language)
      .filter(Boolean)
  );

  const totalLanguages = languages.size;

  const cardClass =
    "rounded-2xl border border-cyan-500/20 bg-black/40 backdrop-blur-xl p-5 transition-all hover:border-cyan-400/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.25)]";

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {/* Repositories */}
      <motion.div
        whileHover={{
          y: -6,
          scale: 1.03,
        }}
        transition={{
          duration: 0.25,
        }}
        className={cardClass}
      >
        <FolderGit2
          size={28}
          className="mb-4 text-cyan-400"
        />

        <h2 className="text-3xl font-bold text-white">
          {totalRepos}
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Repositories
        </p>
      </motion.div>

      {/* Stars */}
      <motion.div
        whileHover={{
          y: -6,
          scale: 1.03,
        }}
        transition={{
          duration: 0.25,
        }}
        className={cardClass}
      >
        <Star
          size={28}
          className="mb-4 text-yellow-400"
        />

        <h2 className="text-3xl font-bold text-white">
          {totalStars}
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Stars
        </p>
      </motion.div>

      {/* Forks */}
      <motion.div
        whileHover={{
          y: -6,
          scale: 1.03,
        }}
        transition={{
          duration: 0.25,
        }}
        className={cardClass}
      >
        <GitFork
          size={28}
          className="mb-4 text-cyan-400"
        />

        <h2 className="text-3xl font-bold text-white">
          {totalForks}
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Forks
        </p>
      </motion.div>

      {/* Languages */}
      <motion.div
        whileHover={{
          y: -6,
          scale: 1.03,
        }}
        transition={{
          duration: 0.25,
        }}
        className={cardClass}
      >
        <Code2
          size={28}
          className="mb-4 text-green-400"
        />

        <h2 className="text-3xl font-bold text-white">
          {totalLanguages}
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Languages
        </p>
      </motion.div>
    </div>
  );
}