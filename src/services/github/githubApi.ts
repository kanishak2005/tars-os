import {
  GitHubRepository,
  GitHubUser,
} from "./githubTypes";

const BASE_URL = "https://api.github.com";
console.log("Username:", process.env.NEXT_PUBLIC_GITHUB_USERNAME);
console.log(
  "Token exists:",
  !!process.env.GITHUB_TOKEN
);
const username =
  process.env.NEXT_PUBLIC_GITHUB_USERNAME!;

const headers = {
  Accept: "application/vnd.github+json",
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
};

async function request<T>(url: string): Promise<T> {
    const response = await fetch(url, {
    headers,
    next: {
      revalidate: 300,
    },
  });

  if (!response.ok) {
    throw new Error(
      `GitHub API Error ${response.status}`
    );
  }

  return response.json();
}

export async function getGitHubUser() {
  return request<GitHubUser>(
    `${BASE_URL}/users/${username}`
  );
}

export async function getRepositories() {
  return request<GitHubRepository[]>(
    `${BASE_URL}/users/${username}/repos?sort=updated&per_page=100`
  );
}