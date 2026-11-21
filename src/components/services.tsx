"use client";

import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data";
import { Reveal, SectionHeader } from "./ui";

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
      <SectionHeader
        index="03"
        kicker="Personal cloud"
        title={
          <>
            Things I run
            <br />
            <span className="text-muted">on the internet.</span>
          </>
        }
        aside={
          <span className="font-mono text-xs">
            <span className="text-accent">$</span> kubectl get svc --all-namespaces
            <br />
            <span className="text-faint">cloud native playground — unstable by design</span>
          </span>
        }
      />

      <Reveal>
        <div className="overflow-hidden rounded-3xl border border-line bg-surface">
          <div className="hidden grid-cols-[56px_1fr_1.3fr_110px_40px] gap-4 border-b border-line px-6 py-3 font-mono text-[11px] uppercase tracking-wider text-faint md:grid">
            <span>#</span>
            <span>Name</span>
            <span>Host</span>
            <span>Status</span>
            <span />
          </div>
          <ul className="divide-y divide-line">
            {services.map((s, i) => {
              const host = new URL(s.url).host;
              return (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative grid grid-cols-[40px_1fr_32px] items-center gap-4 px-6 py-5 transition-colors hover:bg-white/[0.025] md:grid-cols-[56px_1fr_1.3fr_110px_40px]"
                  >
                    <span className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100" />
                    <span className="font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
                    <span className="min-w-0">
                      <span className="block text-lg font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-1 md:text-xl">
                        {s.name}
                      </span>
                      <span className="block truncate font-mono text-xs text-faint md:hidden">{host}</span>
                    </span>
                    <span className="hidden truncate font-mono text-sm text-muted md:block">{host}</span>
                    <span className="hidden items-center gap-2 font-mono text-xs text-muted md:flex">
                      <span className="size-1.5 rounded-full bg-accent" />
                      Running
                    </span>
                    <span className="grid size-8 place-items-center rounded-full border border-line text-muted transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
