export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  company: string | null;
  location: string | null;
  blog: string | null;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;

  html_url: string;

  language: string | null;

  stargazers_count: number;
  forks_count: number;

  watchers_count: number;

  open_issues_count: number;

  updated_at: string;

  homepage: string | null;
}