"use client";

import { ArrowUpRight, PenLine } from "lucide-react";
import { profile, socials } from "@/lib/data";
import type { Post } from "@/lib/blog";
import { socialIcons } from "./icons";
import { Reveal, SectionHeader } from "./ui";

const dateFmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Seoul", year: "numeric", month: "short", day: "numeric" });

export function Writing({ posts, latest }: { posts: string; latest: Post[] }) {
  return (
    <section id="writing" className="mx-auto max-w-6xl px-5 pb-28 md:px-8 md:pb-40">
      <SectionHeader title="Learning in public." />
      <Reveal>
        <a
          href={profile.blog}
          target="_blank"
          rel="noreferrer"
          className="group relative block overflow-hidden rounded-3xl border border-line bg-surface p-8 md:p-14"
        >
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-8 grid size-12 place-items-center rounded-2xl border border-line-strong bg-surface-2">
                <PenLine className="size-5" />
              </div>
              <p className="text-sm text-muted">blog.wlstmd.cloud</p>
              <p className="mt-3 max-w-xl text-2xl font-medium tracking-tight text-balance md:text-4xl">
                {posts} posts on cloud infrastructure &amp; DevOps, written as I learn.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-transform group-hover:scale-105 md:self-auto">
              Read the blog
              <ArrowUpRight className="size-4" />
            </span>
          </div>
        </a>
      </Reveal>

      {latest.length > 0 && (
        <Reveal className="mt-4">
          <div className="rounded-3xl border border-line bg-surface">
            <p className="border-b border-line px-6 py-4 text-sm text-muted md:px-8">Latest posts</p>
            <ul className="divide-y divide-line">
              {latest.map((p) => (
                <li key={p.url}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col gap-1 px-6 py-5 transition-colors hover:bg-white/[0.03] md:flex-row md:items-center md:gap-6 md:px-8"
                  >
                    <time dateTime={p.date} className="shrink-0 text-sm tabular-nums text-faint md:w-28">
                      {dateFmt.format(new Date(p.date))}
                    </time>
                    <span className="flex-1 text-[17px] font-medium leading-snug">{p.title}</span>
                    {p.category && <span className="shrink-0 text-sm text-muted">{p.category}</span>}
                    <ArrowUpRight className="hidden size-4 shrink-0 text-faint transition-colors group-hover:text-fg md:block" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}
    </section>
  );
}

export function Contact() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-line">
      <div className="relative mx-auto max-w-6xl px-5 pt-28 md:px-8 md:pt-40">
        <Reveal>
          <h2 className="text-[clamp(2.6rem,6vw,4.5rem)] font-semibold leading-[1] tracking-[-0.04em]">
            Let&apos;s
            <br />
            <span className="text-muted">connect.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-3 md:grid-cols-3">
          {socials.map((s, i) => {
            const Icon = socialIcons[s.icon];
            return (
              <Reveal key={s.name} delay={i * 0.06}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-surface-2">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">{s.name}</span>
                    <span className="block truncate text-sm text-muted">{s.handle}</span>
                  </span>
                  <ArrowUpRight className="size-4 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                </a>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-28 flex flex-col gap-3 border-t border-line py-8 text-xs text-faint md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} wlstmd.cloud — All rights reserved.</span>
          <span>
            Press <kbd className="rounded border border-line px-1.5 py-0.5 text-muted">⌘K</kbd> / <kbd className="rounded border border-line px-1.5 py-0.5 text-muted">Ctrl K</kbd> to navigate
          </span>
        </div>
      </div>
    </footer>
  );
}
