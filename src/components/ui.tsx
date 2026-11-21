"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ComponentProps, ReactNode } from "react";

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

export function SectionHeader({ title, aside }: { title: ReactNode; aside?: ReactNode }) {
  return (
    <Reveal className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
      <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-[2.6rem] md:leading-[1.15]">{title}</h2>
      {aside && <div className="max-w-sm text-[15px] leading-relaxed text-muted">{aside}</div>}
    </Reveal>
  );
}

export function Card({ className = "", children, ...rest }: ComponentProps<"div">) {
  return (
    <div
      className={`rounded-3xl border border-line bg-surface ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
