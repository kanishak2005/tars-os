import { useEffect, useState } from "react";

export function useGitHub() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [pinnedRepositories, setPinnedRepositories] =
     useState<any[]>([]);

  const [recentRepositories, setRecentRepositories] =
     useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/api/github/dashboard");

        if (!response.ok) {
          throw new Error("Failed to fetch GitHub data");
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

  return {
    loading,
    error,
    user,
    pinnedRepositories,
    recentRepositories,
  };
}