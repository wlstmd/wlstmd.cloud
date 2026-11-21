"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, CornerDownLeft, Hash, Search } from "lucide-react";
import { featuredRepos, nav, services, socials } from "@/lib/data";

const OPEN_EVENT = "palette:open";

export function openPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

type Item = { group: string; label: string; hint: string; href: string; external: boolean };

const items: Item[] = [
  ...nav.map((n) => ({ group: "Sections", label: n.label, hint: `#${n.id}`, href: `#${n.id}`, external: false })),
  ...services.map((s) => ({
    group: "Services",
    label: s.name,
    hint: new URL(s.url).host,
    href: s.url,
    external: true,
  })),
  ...featuredRepos.map((name) => ({
    group: "Work",
    label: name,
    hint: "github.com",
    href: `https://github.com/wlstmd/${name}`,
    external: true,
  })),
  ...socials.map((s) => ({ group: "Elsewhere", label: s.name, hint: s.handle, href: s.url, external: true })),
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.hint} ${i.group}`.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setCursor(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${cursor}"]`)?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  const run = (item: Item | undefined) => {
    if (!item) return;
    setOpen(false);
    if (item.external) window.open(item.href, "_blank", "noopener,noreferrer");
    else document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[cursor]);
    }
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 px-4 pt-[14vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-2xl shadow-black/60"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="size-4 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCursor(0);
                }}
                onKeyDown={onInputKey}
                placeholder="Jump to a section or service…"
                className="h-14 flex-1 bg-transparent text-[15px] outline-none placeholder:text-faint"
              />
              <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">ESC</kbd>
            </div>
            <ul ref={listRef} className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 && <li className="px-3 py-8 text-center text-sm text-muted">No results.</li>}
              {results.map((item, i) => {
                const header = item.group !== lastGroup ? item.group : null;
                lastGroup = item.group;
                return (
                  <li key={`${item.group}-${item.label}`}>
                    {header && (
                      <p className="px-3 pb-1.5 pt-3 text-xs text-faint">
                        {header}
                      </p>
                    )}
                    <button
                      data-index={i}
                      onMouseMove={() => setCursor(i)}
                      onClick={() => run(item)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                        cursor === i ? "bg-white/[0.07] text-fg" : "text-muted"
                      }`}
                    >
                      {item.external ? <ArrowUpRight className="size-4" /> : <Hash className="size-4" />}
                      <span className="flex-1">{item.label}</span>
                      <span className="text-xs text-faint">{item.hint}</span>
                      {cursor === i && <CornerDownLeft className="size-3.5 text-muted" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
