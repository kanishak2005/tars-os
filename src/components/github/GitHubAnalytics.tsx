"use client";

import GitHubStats from "./GitHubStats";
import GitHubLanguageChart from "./GitHubLanguageChart";
import GitHubActivityChart from "./GitHubActivityChart";
import GitHubContributionHeatmap from "./GitHubContributionHeatmap";

interface Props {
  repositories: any[];
}

export default function GitHubAnalytics({
  repositories,
}: Props) {
  if (!repositories.length) return null;

  return (
    <section className="space-y-8">
      {/* Statistics */}
      <GitHubStats
        repositories={repositories}
      />

      {/* Charts */}
      <div className="grid gap-8 xl:grid-cols-2">
        <GitHubLanguageChart
          repositories={repositories}
        />

        <GitHubActivityChart
          repositories={repositories}
        />
      </div>

      {/* Contribution Heatmap */}
      <GitHubContributionHeatmap
        repositories={repositories}
      />
    </section>
  );
}