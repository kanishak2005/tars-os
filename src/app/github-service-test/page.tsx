import { getDashboardData } from "@/services/github/githubService";

export default async function Page() {
  const data = await getDashboardData();

  return (
    <pre>{JSON.stringify(data.user, null, 2)}</pre>
  );
}