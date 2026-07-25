import { NextResponse } from "next/server";
import { getGitHubDashboard } from "@/services/github/githubService";

export async function GET() {
  const data = await getGitHubDashboard();

  return NextResponse.json(data);
}