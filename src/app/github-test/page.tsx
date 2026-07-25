import {
  getGitHubUser,
  getRepositories,
} from "@/services/github/githubApi";

export default async function GitHubTestPage() {
  const user = await getGitHubUser();
  const repos = await getRepositories();

  return (
    <main className="p-10 text-white">
      <h1 className="text-3xl font-bold">
        GitHub API Test
      </h1>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">
          User
        </h2>

        <pre className="mt-3 overflow-auto rounded bg-slate-900 p-4">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold">
          Repositories
        </h2>

        <pre className="mt-3 overflow-auto rounded bg-slate-900 p-4">
          {JSON.stringify(repos, null, 2)}
        </pre>
      </div>
    </main>
  );
}