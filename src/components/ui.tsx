"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ComponentProps, PointerEvent, ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({
  index,
  kicker,
  title,
  aside,
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <Reveal className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <span className="text-accent">{index}</span>
          <span className="h-px w-8 bg-line-strong" />
          {kicker}
        </p>
        <h2 className="text-4xl font-semibold tracking-tight text-balance md:text-6xl">{title}</h2>
      </div>
      {aside && <div className="max-w-sm text-sm leading-relaxed text-muted">{aside}</div>}
    </Reveal>
  );
}

export function trackSpotlight(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--x", `${e.clientX - r.left}px`);
  el.style.setProperty("--y", `${e.clientY - r.top}px`);
}

export function Card({ className = "", children, ...rest }: ComponentProps<"div">) {
  return (
    <div
      onPointerMove={trackSpotlight}
      className={`spotlight rounded-3xl border border-line bg-surface ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
