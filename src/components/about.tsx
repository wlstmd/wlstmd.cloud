"use client";

import { GraduationCap, BadgeCheck, Layers } from "lucide-react";
import { activities, certifications, education, profile, stack, stats } from "@/lib/data";
import { Card, Reveal, SectionHeader } from "./ui";

export function About({ posts }: { posts: string }) {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
      <SectionHeader
        title={
          <>
            Infra that runs itself,
            <br />
            <span className="text-muted">so people don&apos;t have to.</span>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-6">
        <Reveal className="md:col-span-4">
          <Card className="h-full p-8 md:p-10">
            <p className="text-xl leading-relaxed text-pretty md:text-2xl">
              {profile.bio}
            </p>
          </Card>
        </Reveal>

        <Reveal className="md:col-span-2" delay={0.05}>
          <Card className="grid h-full grid-cols-2 gap-px overflow-hidden bg-line p-0">
            {[{ value: posts, label: "Blog posts" }, ...stats].map((s) => (
              <div key={s.label} className="flex flex-col justify-end bg-surface p-6">
                <p className="text-4xl font-semibold tracking-tight">{s.value}</p>
                <p className="mt-1 text-sm text-muted">{s.label}</p>
              </div>
            ))}
          </Card>
        </Reveal>

        <Reveal className="md:col-span-3" delay={0.05}>
          <Card className="h-full p-8">
            <div className="mb-8 flex items-center gap-2 text-sm text-muted">
              <GraduationCap className="size-4 text-muted" /> Education
            </div>
            <ul className="space-y-6">
              {education.map((e) => (
                <li key={e.school}>
                  <p className="text-xl font-medium tracking-tight">{e.school}</p>
                  <p className="mt-1 text-muted">{e.major}</p>
                  <p className="mt-2 flex flex-wrap gap-x-3 text-sm text-faint">
                    <span className="tabular-nums">{e.period}</span>
                    {e.note && <span className="text-fg/80">{e.note}</span>}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-line pt-6">
              <p className="mb-3 text-sm text-muted">Activities</p>
              {activities.map((a) => (
                <div key={a.name} className="flex items-baseline justify-between gap-4">
                  <div>
                    <p className="font-medium">
                      {a.name} <span className="text-muted">{a.nameKo}</span>
                    </p>
                    <p className="text-sm text-faint">{a.role}</p>
                  </div>
                  <span className="shrink-0 text-sm tabular-nums text-muted">{a.period}</span>
                </div>
              ))}
            </div>
          </Card>
        </Reveal>

        <Reveal className="md:col-span-3" delay={0.1}>
          <Card className="h-full p-8">
            <div className="mb-6 flex items-center gap-2 text-sm text-muted">
              <BadgeCheck className="size-4 text-muted" /> Certifications
            </div>
            <ul className="divide-y divide-line">
              {certifications.map((c) => (
                <li key={c.name} className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
                  <div>
                    <p className="font-medium">{c.name}</p>
                    <p className="text-xs text-faint">{c.en}</p>
                  </div>
                  <time className="shrink-0 text-sm tabular-nums text-muted">{c.date}</time>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>

        <Reveal className="md:col-span-6" delay={0.05}>
          <Card className="p-8">
            <div className="mb-6 flex items-center gap-2 text-sm text-muted">
              <Layers className="size-4 text-muted" /> Stack
            </div>
            <div className="grid gap-8 md:grid-cols-[140px_1fr]">
              <p className="text-sm text-muted">Proficient</p>
              <div className="flex flex-wrap gap-2">
                {stack.proficient.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-fg px-4 py-1.5 text-sm font-medium text-bg"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <p className="text-sm text-muted">Applicable</p>
              <div className="flex flex-wrap gap-2">
                {stack.applicable.map((s) => (
                  <span key={s} className="rounded-full border border-line-strong px-4 py-1.5 text-sm text-muted">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
