"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Command, Menu, X } from "lucide-react";
import { nav } from "@/lib/data";
import { openPalette } from "./command-palette";

export function Nav() {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nav.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex w-full max-w-5xl items-center justify-between gap-4 rounded-full border px-3 py-2 transition-all duration-500 ${
          scrolled ? "border-line bg-bg/70 backdrop-blur-xl" : "border-transparent bg-transparent"
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5 pl-1 text-sm font-medium">
          <Image src="/images/logo.png" alt="" width={26} height={26} className="rounded-lg" />
          <span>wlstmd<span className="text-muted">.cloud</span></span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.id} className="relative">
              <a
                href={`#${item.id}`}
                className={`relative z-10 block rounded-full px-4 py-1.5 text-sm transition-colors ${
                  active === item.id ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {item.label}
              </a>
              {active === item.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-white/[0.07]"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={openPalette}
            className="flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-line-strong hover:text-fg"
            aria-label="Open command palette"
          >
            <Command className="size-3.5" />
            <span>K</span>
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-full border border-line bg-surface md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute inset-x-4 top-[72px] rounded-3xl border border-line bg-surface/95 p-3 backdrop-blur-xl md:hidden"
          >
            {nav.map((item, i) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-3 text-lg hover:bg-white/5"
              >
                {item.label}
                <span className="font-mono text-xs text-faint">0{i + 1}</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
