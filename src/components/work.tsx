"use client";

import { ArrowUpRight, Star } from "lucide-react";
import type { Repo } from "@/lib/github";
import { GithubIcon } from "./icons";
import { Reveal, SectionHeader } from "./ui";

const languageColors: Record<string, string> = {
  Go: "#00ADD8",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HCL: "#844FBA",
  Java: "#b07219",
  Shell: "#89e051",
};

const monthFmt = new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "Asia/Seoul" });

export function Work({ repos }: { repos: Repo[] }) {
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
      <SectionHeader
        title={
          <>
            Selected work.
            <br />
            <span className="text-muted">Mostly Kubernetes and AWS.</span>
          </>
        }
        aside={
          <a
            href="https://github.com/wlstmd"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-fg transition-colors hover:text-muted"
          >
            <GithubIcon className="size-4" />
            All repositories on GitHub
            <ArrowUpRight className="size-4" />
          </a>
        }
      />

      <div className="grid gap-4 md:grid-cols-2">
        {repos.map((r, i) => (
          <Reveal key={r.name} delay={(i % 2) * 0.06}>
            <article className="group relative flex h-full flex-col rounded-3xl border border-line bg-surface p-7 transition-colors hover:border-line-strong hover:bg-surface-2">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold tracking-tight">
                  <a href={r.url} target="_blank" rel="noreferrer" className="after:absolute after:inset-0 after:rounded-3xl">
                    {r.name}
                  </a>
                </h3>
                <ArrowUpRight className="size-5 shrink-0 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
              </div>

              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">
                {r.description ?? "No description yet."}
              </p>

              {r.topics.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {r.topics.slice(0, 4).map((t) => (
                    <li key={t} className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-xs text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
                {r.language && (
                  <span className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full" style={{ background: languageColors[r.language] ?? "#8e8e96" }} />
                    {r.language}
                  </span>
                )}
                {r.stars > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Star className="size-3.5" />
                    {r.stars}
                  </span>
                )}
                {r.pushedAt && <span>Updated {monthFmt.format(new Date(r.pushedAt))}</span>}
                {r.homepage && (
                  <a
                    href={r.homepage}
                    target="_blank"
                    rel="noreferrer"
                    className="relative z-10 ml-auto inline-flex items-center gap-1 text-fg hover:underline"
                  >
                    Live
                    <ArrowUpRight className="size-3.5" />
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
