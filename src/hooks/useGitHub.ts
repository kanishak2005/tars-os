import { useEffect, useState } from "react";

export function useGitHub() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const [pinnedRepositories, setPinnedRepositories] =
    useState<any[]>([]);

  const [recentRepositories, setRecentRepositories] =
    useState<any[]>([]);

  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] =
    useState("updated");

  const [language, setLanguage] =
    useState("All");

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(
          "/api/github/dashboard"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch GitHub data"
          );
        }

        const data = await response.json();

        setUser(data.user);
        setPinnedRepositories(data.pinned);
        setRecentRepositories(data.recent);
      } catch (err) {
        console.error(err);
        setError("Unable to load GitHub data.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // All repositories
  const repositories = [
    ...pinnedRepositories,
    ...recentRepositories,
  ];

  // Unique language list
  const languages = Array.from(
    new Set(
      repositories
        .map((repo) => repo.language)
        .filter(Boolean)
    )
  ).sort() as string[];

  // Language filter
  function filterLanguage(repo: any) {
    if (language === "All") return true;

    return repo.language === language;
  }

  // Sorting helper
  function sortRepositories(
    repositories: any[]
  ) {
    const sorted = [...repositories];

    switch (sortBy) {
      case "stars":
        return sorted.sort(
          (a, b) =>
            b.stargazers_count -
            a.stargazers_count
        );

      case "name":
        return sorted.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

      case "size":
        return sorted.sort(
          (a, b) => b.size - a.size
        );

      default:
        return sorted.sort(
          (a, b) =>
            new Date(
              b.updated_at
            ).getTime() -
            new Date(
              a.updated_at
            ).getTime()
        );
    }
  }

  // Filter + Search + Sort (Pinned)
  const filteredPinnedRepositories =
    sortRepositories(
      pinnedRepositories
        .filter(filterLanguage)
        .filter((repo) =>
          repo.name
            .toLowerCase()
            .includes(search.toLowerCase())
        )
    );

  // Filter + Search + Sort (Recent)
  const filteredRecentRepositories =
    sortRepositories(
      recentRepositories
        .filter(filterLanguage)
        .filter((repo) =>
          repo.name
            .toLowerCase()
            .includes(search.toLowerCase())
        )
    );
  function resetFilters() {
  setSearch("");
  setSortBy("updated");
  setLanguage("All");
  }
  return {
    loading,
    error,
    user,

    pinnedRepositories,
    recentRepositories,

    filteredPinnedRepositories,
    filteredRecentRepositories,

    search,
    setSearch,

    sortBy,
    setSortBy,

    language,
    setLanguage,

    languages,

    resetFilters,
  };
}