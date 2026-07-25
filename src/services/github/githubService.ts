import {
  getGitHubUser,
  getRepositories,
} from "./githubApi";

export async function getDashboardData() {
  const [user, repositories] = await Promise.all([
    getGitHubUser(),
    getRepositories(),
  ]);

  return {
    user,
    repositories,
  };
}

export async function getPinnedRepositories() {
  const repositories = await getRepositories();

  return repositories
    .filter((repo) => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);
}

export async function getRecentRepositories() {
  const repositories = await getRepositories();

  return repositories
    .sort(
      (a, b) =>
        new Date(b.updated_at).getTime() -
        new Date(a.updated_at).getTime()
    )
    .slice(0, 8);
}
export async function getGitHubDashboard() {
  const [user, pinned, recent] =
    await Promise.all([
      getGitHubUser(),
      getPinnedRepositories(),
      getRecentRepositories(),
    ]);

  return {
    user,
    pinned,
    recent,
  };
}