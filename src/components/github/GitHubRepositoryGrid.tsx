"use client";

import { motion } from "framer-motion";

import GitHubRepositoryCard from "./GitHubRepositoryCard";

interface Props {
  repositories: any[];
  title?: string;
}

const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export default function GitHubRepositoryGrid({
  repositories,
  title = "Repositories",
}: Props) {
  return (
    <section className="space-y-5">
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

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-5 md:grid-cols-2"
      >
        {repositories.map((repository) => (
          <motion.div
            key={repository.id}
            variants={itemVariants}
          >
            <GitHubRepositoryCard
              repository={repository}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}