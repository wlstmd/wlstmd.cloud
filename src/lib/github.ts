import { featuredRepos } from "./data";
import { getOk } from "./http";

export type Repo = {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  topics: string[];
  pushedAt: string;
};

type ApiRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  topics?: string[];
  pushed_at: string;
};

// One request for all public repos; GITHUB_TOKEN (set in CI) lifts the
// anonymous rate limit. Falls back to bare links if GitHub is unreachable.
export async function getFeaturedRepos(user = "wlstmd"): Promise<Repo[]> {
  let all: ApiRepo[] = [];
  try {
    const token = process.env.GITHUB_TOKEN;
    const body = await getOk(`https://api.github.com/users/${user}/repos?per_page=100&type=owner`, {
      Accept: "application/vnd.github+json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    });
    all = JSON.parse(body);
  } catch (e) {
    console.warn("[github] could not load repos:", (e as Error).message);
  }

  return featuredRepos.map((name) => {
    const r = all.find((repo) => repo.name === name);
    return {
      name,
      description: r?.description ?? null,
      url: r?.html_url ?? `https://github.com/${user}/${name}`,
      homepage: r?.homepage || null,
      language: r?.language ?? null,
      stars: r?.stargazers_count ?? 0,
      topics: r?.topics ?? [],
      pushedAt: r?.pushed_at ?? "",
    };
  });
}
