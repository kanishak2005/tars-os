"use client";

import { useGitHub } from "@/hooks/useGitHub";
import GitHubProfileCard from "@/components/github/GitHubProfileCard";
import GitHubRepositoryGrid from "@/components/github/GitHubRepositoryGrid";
import GitHubRepositoryDetails from "@/components/github/GitHubRepositoryDetails";

export default function GitHubPanel() {
  const {
    loading,
    error,
    user,
    pinnedRepositories,
    recentRepositories,
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
  return (
  <div className="space-y-8">
  <GitHubProfileCard user={user} />

  <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

    <div className="xl:col-span-2 space-y-8">
      <GitHubRepositoryGrid
        repositories={pinnedRepositories}
        title="⭐ Pinned Repositories"
      />

      <GitHubRepositoryGrid
        repositories={recentRepositories}
        title="🕒 Recent Repositories"
      />
    </div>

    <div className="xl:col-span-1">
      <GitHubRepositoryDetails />
    </div>

  </div>
</div>
);
}