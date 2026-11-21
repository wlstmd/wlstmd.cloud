import { profile } from "./data";
import { getOk } from "./http";

// Tistory has no CORS-enabled API, so blog data is read at build time.
// The deploy workflow rebuilds daily to keep it fresh.

export async function getBlogPostCount(): Promise<number | null> {
  try {
    const m = (await getOk(profile.blog)).match(/분류 전체보기\s*<span[^>]*>\((\d+)\)/);
    if (m) return Number(m[1]);
  } catch {}

  try {
    const posts = (await getOk(`${profile.blog}/sitemap.xml`)).match(/<loc>https:\/\/blog\.wlstmd\.cloud\/\d+<\/loc>/g);
    if (posts?.length) return posts.length;
  } catch {}

  console.warn("[blog] could not read post count, falling back");
  return null;
}

export function formatPostCount(count: number | null) {
  return count === null ? "40+" : String(count);
}

export type Post = { title: string; url: string; date: string; category: string | null };

const decode = (s: string) =>
  s
    .replace(/^<!\[CDATA\[|\]\]>$/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();

export async function getLatestPosts(limit = 4): Promise<Post[]> {
  try {
    const xml = await getOk(`${profile.blog}/rss`);
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, limit).flatMap(([, item]) => {
      const pick = (tag: string) => item.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`))?.[1];
      const title = pick("title");
      const url = pick("link");
      const date = pick("pubDate");
      if (!title || !url || !date) return [];
      return [{ title: decode(title), url: decode(url), date: new Date(date).toISOString(), category: pick("category") ? decode(pick("category")!) : null }];
    });
  } catch {
    console.warn("[blog] could not read RSS feed");
    return [];
  }
}
