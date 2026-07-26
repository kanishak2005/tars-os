"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useGitHub } from "@/hooks/useGitHub";

import GitHubProfileCard from "@/components/github/GitHubProfileCard";
import GitHubRepositoryGrid from "@/components/github/GitHubRepositoryGrid";
import GitHubRepositoryDetails from "@/components/github/GitHubRepositoryDetails";
import GitHubSearch from "@/components/github/GitHubSearch";
import GitHubSort from "@/components/github/GitHubSort";
import GitHubLanguageFilter from "@/components/github/GitHubLanguageFilter";
import GitHubEmptyState from "@/components/github/GitHubEmptyState";
import GitHubStats from "@/components/github/GitHubStats";
import GitHubLanguageChart from "@/components/github/GitHubLanguageChart";
import GitHubAnalytics from "@/components/github/GitHubAnalytics";

export default function GitHubPanel() {
  const {
    loading,
    error,
    user,

    search,
    setSearch,

    sortBy,
    setSortBy,

    language,
    setLanguage,
    languages,

    filteredPinnedRepositories,
    filteredRecentRepositories,

    resetFilters,
  } = useGitHub();

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-cyan-400">
        Loading GitHub data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  const hasRepositories =
    filteredPinnedRepositories.length > 0 ||
    filteredRecentRepositories.length > 0;

  const totalRepositories =
    filteredPinnedRepositories.length +
    filteredRecentRepositories.length;
  
  const allRepositories = [
  ...filteredPinnedRepositories,
  ...filteredRecentRepositories,
];

  return (
    <div className="space-y-8">
      {/* Profile */}
      <GitHubProfileCard user={user} />
      {/* Search / Sort / Filter */}
      <div
        className="
          flex
          flex-col
          gap-4
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <GitHubSearch
          value={search}
          onChange={setSearch}
        />

        <div className="flex flex-wrap items-center gap-3">
          <GitHubSort
            value={sortBy}
            onChange={setSortBy}
          />

          <GitHubLanguageFilter
            value={language}
            languages={languages}
            onChange={setLanguage}
          />
        </div>
      </div>

      {/* Repository Count */}
      <p className="text-sm text-gray-500">
        Showing {totalRepositories} repositories
      </p>
      <GitHubAnalytics
  repositories={allRepositories}
/>

      {/* Main Layout */}
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        {/* LEFT PANEL */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${search}-${sortBy}-${language}`}
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -15,
            }}
            transition={{
              duration: 0.25,
            }}
            className="space-y-8 xl:col-span-2"
          >
            {hasRepositories ? (
              <>
                <GitHubRepositoryGrid
                  repositories={filteredPinnedRepositories}
                  title="⭐ Pinned Repositories"
                />

                <GitHubRepositoryGrid
                  repositories={filteredRecentRepositories}
                  title="🕒 Recent Repositories"
                />
              </>
            ) : (
              <GitHubEmptyState
                onReset={resetFilters}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* RIGHT PANEL */}
        <div className="xl:col-span-1">
          <GitHubRepositoryDetails />
        </div>
      </div>
    </div>
  );
}