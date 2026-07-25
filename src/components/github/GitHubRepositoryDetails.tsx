"use client";

import { useNavigation } from "@/context/NavigationContext";
import {
  Star,
  GitFork,
  Eye,
  Calendar,
  Database,
  Globe,
  FileText,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { languageColors } from "@/lib/githubLanguageColors";

export default function GitHubRepositoryDetails() {
  const { selectedRepository } = useNavigation();

  if (!selectedRepository) {
    return (
      <div
        className="
          sticky
          top-6
          rounded-2xl
          border border-cyan-500/20
          bg-black/40
          backdrop-blur-xl
          p-6
          min-h-[600px]
        "
      >
        <h2 className="mb-6 text-xl font-semibold text-cyan-300">
          Repository Explorer
        </h2>

        <div className="flex h-[420px] items-center justify-center text-gray-500">
          Select a repository from the left panel.
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedRepository.id}
        initial={{
          opacity: 0,
          x: 20,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        exit={{
          opacity: 0,
          x: -20,
        }}
        transition={{
          duration: 0.25,
        }}
        className="
          sticky
          top-6
          rounded-2xl
          border border-cyan-500/20
          bg-black/40
          backdrop-blur-xl
          p-6
          min-h-[600px]
        "
      >
        <h2 className="text-2xl font-bold text-cyan-300">
          {selectedRepository.name}
        </h2>

        <p className="mt-4 text-gray-400">
          {selectedRepository.description ??
            "No description provided."}
        </p>

        {/* Repository Information */}
        <div className="mt-8 space-y-4 text-sm">

          {/* Language */}
          <div className="flex items-center justify-between">
            <span className="text-gray-500">
              Language
            </span>

            <div className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor:
                    languageColors[
                      selectedRepository.language
                    ] ?? "#06b6d4",
                }}
              />

              <span>
                {selectedRepository.language ?? "Unknown"}
              </span>
            </div>
          </div>

          {/* Stars */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500">
              <Star size={15} />
              Stars
            </div>

            <span>{selectedRepository.stargazers_count}</span>
          </div>

          {/* Forks */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500">
              <GitFork size={15} />
              Forks
            </div>

            <span>{selectedRepository.forks_count}</span>
          </div>

          {/* Watchers */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500">
              <Eye size={15} />
              Watchers
            </div>

            <span>{selectedRepository.watchers_count}</span>
          </div>

          {/* Created */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar size={15} />
              Created
            </div>

            <span>
              {format(
                new Date(selectedRepository.created_at),
                "dd MMM yyyy"
              )}
            </span>
          </div>

          {/* Updated */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar size={15} />
              Updated
            </div>

            <span>
              {formatDistanceToNow(
                new Date(selectedRepository.updated_at),
                {
                  addSuffix: true,
                }
              )}
            </span>
          </div>

          {/* Size */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500">
              <Database size={15} />
              Size
            </div>

            <span>
              {(selectedRepository.size / 1024).toFixed(2)} MB
            </span>
          </div>

          {/* License */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500">
              <FileText size={15} />
              License
            </div>

            <span>
              {selectedRepository.license?.spdx_id ??
                "None"}
            </span>
          </div>
        </div>

        {/* Homepage */}
        {selectedRepository.homepage && (
          <div className="mt-8">
            <div className="mb-2 flex items-center gap-2 text-gray-500">
              <Globe size={15} />
              Homepage
            </div>

            <a
              href={selectedRepository.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 hover:underline break-all"
            >
              {selectedRepository.homepage}
            </a>
          </div>
        )}

        {/* Topics */}
        {selectedRepository.topics?.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-3 text-sm uppercase tracking-wider text-gray-500">
              Topics
            </h3>

            <div className="flex flex-wrap gap-2">
              {selectedRepository.topics.map(
                (topic: string) => (
                  <span
                    key={topic}
                    className="
                      rounded-full
                      border border-cyan-500/20
                      bg-cyan-500/10
                      px-3
                      py-1
                      text-xs
                      text-cyan-300
                    "
                  >
                    {topic}
                  </span>
                )
              )}
            </div>
          </div>
        )}

        {/* Open Repository */}
        <a
          href={selectedRepository.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-8
            inline-flex
            w-full
            justify-center
            rounded-xl
            border
            border-cyan-500/20
            px-5
            py-3
            text-cyan-300
            transition
            hover:bg-cyan-500/10
          "
        >
          Open Repository on GitHub →
        </a>
      </motion.div>
    </AnimatePresence>
  );
}