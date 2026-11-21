"use client";

import { ArrowUpRight, Lock } from "lucide-react";
import { services } from "@/lib/data";
import type { ServiceStatus } from "@/lib/status";
import { Reveal, SectionHeader } from "./ui";

const checkedFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export function Services({ statuses, checkedAt }: { statuses: Record<string, ServiceStatus>; checkedAt: string }) {
  const upCount = services.filter((s) => statuses[s.url]?.up).length;

  return (
    <section id="services" className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
      <SectionHeader
        title={
          <>
            Things I run
            <br />
            <span className="text-muted">on the internet.</span>
          </>
        }
        aside={
          <>
            A personal cloud of labs, notes and side projects — unstable by design.
            <span className="mt-3 flex items-center gap-2 text-fg">
              <span className={`size-2 rounded-full ${upCount === services.length ? "bg-live" : "bg-[#ffd60a]"}`} />
              {upCount} of {services.length} responding
            </span>
          </>
        }
      />

      <Reveal>
        <div className="overflow-hidden rounded-3xl border border-line bg-surface">
          <div className="hidden grid-cols-[1fr_1.3fr_110px_40px] gap-4 border-b border-line px-6 py-3 text-xs text-faint md:grid">
            <span>Name</span>
            <span>Host</span>
            <span>Response</span>
            <span />
          </div>
          <ul className="divide-y divide-line">
            {services.map((s) => {
              const host = new URL(s.url).host;
              const status = statuses[s.url];
              return (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative grid grid-cols-[1fr_32px] items-center gap-4 px-6 py-5 transition-colors hover:bg-white/[0.03] md:grid-cols-[1fr_1.3fr_110px_40px]"
                  >
                    <span className="min-w-0">
                      <span className="block text-lg font-medium tracking-tight md:text-xl">
                        {s.name}
                      </span>
                      <span className="block truncate text-sm text-faint md:hidden">{host}</span>
                    </span>
                    <span className="hidden truncate text-[15px] text-muted md:block">{host}</span>
                    <span className="hidden items-center gap-2 text-sm text-muted md:flex">
                      <span className={`size-1.5 rounded-full ${status?.up ? "bg-live" : "bg-[#ff453a]"}`} />
                      {status?.up ? `${status.ms} ms` : "Down"}
                      {status?.auth && <Lock className="size-3 text-faint" aria-label="Sign-in required" />}
                    </span>
                    <span className="grid size-8 place-items-center rounded-full border border-line text-muted transition-all duration-300 group-hover:border-fg group-hover:bg-fg group-hover:text-bg">
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px" />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <p className="mt-4 text-xs text-faint">
          Checked at build time · {checkedFmt.format(new Date(checkedAt))} KST · rebuilt daily
        </p>
      </Reveal>
    </section>
  );
}
