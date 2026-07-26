"use client";

import { useMemo } from "react";
import {
  Star,
  FolderGit2,
  Clock3,
  Code2,
} from "lucide-react";

import GitHubInsightCard from "./GitHubInsightCard";
import { useNavigation } from "@/context/NavigationContext";

interface Props {
  repositories: any[];
}

export default function GitHubInsights({
  repositories,
}: Props) {
  const { setSelectedRepository } =
    useNavigation();

  const insights = useMemo(() => {
    if (!repositories.length) return null;

    const topRepository = [...repositories].sort(
      (a, b) =>
        b.stargazers_count -
        a.stargazers_count
    )[0];

    const largestRepository = [...repositories].sort(
      (a, b) => b.size - a.size
    )[0];

    const recentRepository = [...repositories].sort(
      (a, b) =>
        new Date(b.updated_at).getTime() -
        new Date(a.updated_at).getTime()
    )[0];

    const languageCounts: Record<
      string,
      number
    > = {};

    repositories.forEach((repo) => {
      if (!repo.language) return;

      languageCounts[repo.language] =
        (languageCounts[repo.language] ??
          0) + 1;
    });

    const favouriteLanguage =
      Object.entries(languageCounts).sort(
        (a, b) => b[1] - a[1]
      )[0];

    return {
      topRepository,
      largestRepository,
      recentRepository,
      favouriteLanguage,
    };
  }, [repositories]);

  if (!insights) return null;

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-cyan-300">
        Repository Insights
      </h2>

      <div className="grid gap-6 sm:grid-cols-2">
        <GitHubInsightCard
          icon={Star}
          title="Top Repository"
          value={insights.topRepository.name}
          subtitle={`${insights.topRepository.stargazers_count} Stars`}
          iconColor="text-yellow-400"
          onClick={() =>
            setSelectedRepository(
              insights.topRepository
            )
          }
        />

        <GitHubInsightCard
          icon={FolderGit2}
          title="Largest Repository"
          value={
            insights.largestRepository.name
          }
          subtitle={`${(
            insights.largestRepository
              .size / 1024
          ).toFixed(2)} MB`}
          iconColor="text-cyan-400"
          onClick={() =>
            setSelectedRepository(
              insights.largestRepository
            )
          }
        />

        <GitHubInsightCard
          icon={Clock3}
          title="Recently Updated"
          value={
            insights.recentRepository.name
          }
          subtitle={new Date(
            insights.recentRepository.updated_at
          ).toLocaleDateString()}
          iconColor="text-green-400"
          onClick={() =>
            setSelectedRepository(
              insights.recentRepository
            )
          }
        />

        <GitHubInsightCard
          icon={Code2}
          title="Favourite Language"
          value={
            insights.favouriteLanguage?.[0] ??
            "Unknown"
          }
          subtitle={`${
            insights.favouriteLanguage?.[1] ??
            0
          } repositories`}
          iconColor="text-purple-400"
        />
      </div>
    </section>
  );
}