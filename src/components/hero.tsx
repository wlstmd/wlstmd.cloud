"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile, stack } from "@/lib/data";
import { GithubIcon } from "./icons";

const ease = [0.16, 1, 0.3, 1] as const;

function useClock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Seoul",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

type Line = { kind: "cmd" | "out" | "table"; text: string };

const script: Line[] = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: `${profile.name.toLowerCase().replace(" ", "-")} — ${profile.role}, ${profile.tagline}` },
  { kind: "cmd", text: "kubectl get awards -n worldskills-2025" },
  { kind: "table", text: "NAME        RESULT           STATUS" },
  { kind: "out", text: "regional    silver-medal     ✔ Completed" },
  { kind: "out", text: "national    4th-excellence   ✔ Completed" },
  { kind: "cmd", text: "ls ~/stack" },
  { kind: "out", text: stack.proficient.map((s) => s.toLowerCase()).join("  ") },
];

function Terminal() {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (reduce) {
      setShown(script.length);
      return;
    }
    if (shown >= script.length) return;
    const delay = shown === 0 ? 900 : script[shown].kind === "cmd" ? 650 : 140;
    const id = setTimeout(() => setShown((s) => s + 1), delay);
    return () => clearTimeout(id);
  }, [shown, reduce]);

  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong bg-[#0c0c0f]/90 shadow-2xl shadow-black/50 backdrop-blur">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-faint">wlstmd@cloud: ~</span>
      </div>
      <div className="min-h-[248px] space-y-1 p-5 font-mono text-[12.5px] leading-relaxed">
        {script.slice(0, shown).map((line, i) => (
          <motion.p
            key={i}
            initial={reduce ? false : { opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            className={`whitespace-pre-wrap break-words ${
              line.kind === "cmd" ? "pt-2 text-fg first:pt-0" : line.kind === "table" ? "text-faint" : "text-muted"
            }`}
          >
            {line.kind === "cmd" && <span className="mr-2 text-accent">❯</span>}
            {line.text}
          </motion.p>
        ))}
        <p className="pt-2">
          <span className="mr-2 text-accent">❯</span>
          <span className="inline-block h-4 w-2 translate-y-0.5 animate-blink bg-fg" />
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  const time = useClock();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="top" className="relative flex min-h-svh flex-col overflow-hidden pt-28">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/[0.09] blur-[120px]" />

      <motion.div style={{ y, opacity }} className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="mb-10 inline-flex w-fit items-center gap-2.5 rounded-full border border-line bg-surface/80 py-1.5 pl-2 pr-4 text-xs text-muted backdrop-blur"
        >
          <span className="size-2 animate-pulse-dot rounded-full bg-accent" />
          WorldSkills Korea 2025 · Cloud Computing
        </motion.div>

        <div className="grid flex-1 items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <h1 className="text-[clamp(3.2rem,10vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.045em]">
              {["Jinseung", "Yu."].map((word, i) => (
                <span key={word} className="block overflow-hidden pb-[0.08em]">
                  <motion.span
                    className={`block ${i === 1 ? "text-outline" : ""}`}
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.1 + i * 0.1, ease }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease }}
              className="mt-8 max-w-md text-lg leading-relaxed text-muted md:text-xl"
            >
              <span className="text-fg">DevOps engineer</span> in training — automating away repetitive work and
              running a personal cloud of labs, notes and services.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg transition-transform hover:scale-[1.03]"
              >
                <GithubIcon className="size-4" />
                GitHub
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm text-fg transition-colors hover:bg-white/5"
              >
                Explore services
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease }}
            style={{ transformPerspective: 1200 }}
          >
            <Terminal />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-16 grid grid-cols-2 gap-6 border-t border-line py-6 font-mono text-xs text-muted md:grid-cols-4"
        >
          <div>
            <p className="mb-1 text-faint">BASED IN</p>
            <p className="text-fg">{profile.location}</p>
          </div>
          <div>
            <p className="mb-1 text-faint">LOCAL TIME</p>
            <p className="tabular-nums text-fg">{time ?? "--:--:--"} KST</p>
          </div>
          <div>
            <p className="mb-1 text-faint">FOCUS</p>
            <p className="text-fg">Cloud · K8s · IaC</p>
          </div>
          <a href="#about" className="group flex items-end justify-between md:justify-end md:gap-3">
            <span className="text-faint transition-colors group-hover:text-fg">SCROLL</span>
            <ArrowDown className="size-4 animate-bounce text-accent" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
