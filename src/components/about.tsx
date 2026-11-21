"use client";

import { GraduationCap, BadgeCheck, Layers } from "lucide-react";
import { certifications, education, profile, stack, stats } from "@/lib/data";
import { Card, Reveal, SectionHeader } from "./ui";

export function Marquee() {
  const words = [...stack.proficient, ...stack.applicable];
  const row = [...words, ...words];
  return (
    <div className="relative overflow-hidden border-y border-line py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10 text-2xl font-medium tracking-tight text-faint md:text-4xl">
            {w}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
      <SectionHeader
        index="01"
        kicker="Who I am"
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
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col justify-end bg-surface p-6">
                <p className="text-4xl font-semibold tracking-tight">{s.value}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted">{s.label}</p>
              </div>
            ))}
          </Card>
        </Reveal>

        <Reveal className="md:col-span-3" delay={0.05}>
          <Card className="h-full p-8">
            <div className="mb-8 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted">
              <GraduationCap className="size-4 text-accent" /> Education
            </div>
            <p className="text-2xl font-medium tracking-tight">{education.school}</p>
            <p className="mt-2 text-muted">{education.major}</p>
            <p className="mt-6 inline-block rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
              {education.period}
            </p>
          </Card>
        </Reveal>

        <Reveal className="md:col-span-3" delay={0.1}>
          <Card className="h-full p-8">
            <div className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted">
              <BadgeCheck className="size-4 text-accent" /> Certifications
            </div>
            <ul className="divide-y divide-line">
              {certifications.map((c) => (
                <li key={c.name} className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
                  <div>
                    <p className="font-medium">{c.name}</p>
                    <p className="text-xs text-faint">{c.en}</p>
                  </div>
                  <time className="shrink-0 font-mono text-xs text-muted">{c.date}</time>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>

        <Reveal className="md:col-span-6" delay={0.05}>
          <Card className="p-8">
            <div className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted">
              <Layers className="size-4 text-accent" /> Stack
            </div>
            <div className="grid gap-8 md:grid-cols-[140px_1fr]">
              <p className="text-sm text-muted">Proficient</p>
              <div className="flex flex-wrap gap-2">
                {stack.proficient.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-accent/30 bg-accent/[0.08] px-4 py-1.5 text-sm text-accent"
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
