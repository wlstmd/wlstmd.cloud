"use client";

import { ArrowUpRight, PenLine } from "lucide-react";
import { profile, socials } from "@/lib/data";
import { socialIcons } from "./icons";
import { Reveal, SectionHeader, trackSpotlight } from "./ui";

export function Writing() {
  return (
    <section id="writing" className="mx-auto max-w-6xl px-5 pb-28 md:px-8 md:pb-40">
      <SectionHeader index="04" kicker="Writing" title="Learning in public." />
      <Reveal>
        <a
          href={profile.blog}
          target="_blank"
          rel="noreferrer"
          onPointerMove={trackSpotlight}
          className="spotlight group relative block overflow-hidden rounded-3xl border border-line bg-surface p-8 md:p-14"
        >
          <div className="pointer-events-none absolute -bottom-24 -right-24 size-80 rounded-full bg-accent/10 opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-8 grid size-12 place-items-center rounded-2xl border border-line-strong bg-surface-2">
                <PenLine className="size-5 text-accent" />
              </div>
              <p className="font-mono text-sm text-muted">blog.wlstmd.cloud</p>
              <p className="mt-3 max-w-xl text-3xl font-medium tracking-tight text-balance md:text-5xl">
                40+ posts on cloud infrastructure &amp; DevOps, written as I learn.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition-transform group-hover:scale-105 md:self-auto">
              Read the blog
              <ArrowUpRight className="size-4" />
            </span>
          </div>
        </a>
      </Reveal>
    </section>
  );
}

export function Contact() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-line">
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_80%_at_50%_100%,black,transparent)]" />
      <div className="relative mx-auto max-w-6xl px-5 pt-28 md:px-8 md:pt-40">
        <Reveal>
          <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            <span className="text-accent">05</span>
            <span className="h-px w-8 bg-line-strong" />
            Elsewhere
          </p>
          <h2 className="text-[clamp(3rem,11vw,9rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
            Let&apos;s
            <br />
            <span className="text-outline">connect.</span>
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
                  onPointerMove={trackSpotlight}
                  className="spotlight group flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-surface-2">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">{s.name}</span>
                    <span className="block truncate font-mono text-xs text-muted">{s.handle}</span>
                  </span>
                  <ArrowUpRight className="size-4 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </a>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-28 flex flex-col gap-3 border-t border-line py-8 font-mono text-xs text-faint md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} wlstmd.cloud — All rights reserved.</span>
          <span>
            Press <kbd className="rounded border border-line px-1.5 py-0.5 text-muted">⌘K</kbd> / <kbd className="rounded border border-line px-1.5 py-0.5 text-muted">Ctrl K</kbd> to navigate
          </span>
        </div>
      </div>
    </footer>
  );
}
