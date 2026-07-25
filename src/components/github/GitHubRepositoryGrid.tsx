"use client";

import GitHubRepositoryCard from "./GitHubRepositoryCard";
import { motion } from "framer-motion";

interface Props {
  repositories: any[];
  title?: string;
}

export default function GitHubRepositoryGrid({
  repositories,
  title = "Repositories",
}: Props) {
  return (
    <section className="space-y-5">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <motion.h2
  initial={{
    opacity: 0,
    x: -15,
  }}
  animate={{
    opacity: 1,
    x: 0,
  }}
  transition={{
    duration: 0.4,
  }}
  className="text-lg font-semibold uppercase tracking-[0.25em] text-cyan-300"
>
  {title}
</motion.h2>

        <span className="text-sm text-gray-500">
          {repositories.length} repositories
        </span>
      </div>

      {/* Repository Grid */}
      <div
        className="
        grid
        gap-5
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
      "
      >
        {repositories.map((repository, index) => (
  <motion.div
    key={repository.id}
    initial={{
      opacity: 0,
      y: 25,
    }}
    animate={{
      opacity: 1,
      y: 0,
    }}
    transition={{
      duration: 0.35,
      delay: index * 0.08,
    }}
  >
    <GitHubRepositoryCard
      repository={repository}
    />
  </motion.div>
))}
      </div>
    </section>
  );
}