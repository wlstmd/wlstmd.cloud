"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { awards, timeline } from "@/lib/data";
import { Reveal, SectionHeader } from "./ui";

function Lightbox({ index, onClose, onStep }: { index: number; onClose: () => void; onStep: (d: number) => void }) {
  const item = awards[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onStep]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex flex-col bg-black/90 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div className="flex items-center justify-between px-5 py-4 text-sm tabular-nums text-muted">
        <span>
          {String(index + 1).padStart(2, "0")} / {String(awards.length).padStart(2, "0")}
        </span>
        <button onClick={onClose} className="grid size-10 place-items-center rounded-full hover:bg-white/10" aria-label="Close">
          <X className="size-5 text-fg" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.src}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="relative h-full w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={item.src} alt={item.alt} fill sizes="100vw" className="object-contain" />
          </motion.div>
        </AnimatePresence>
        {[-1, 1].map((d) => (
          <button
            key={d}
            onClick={(e) => {
              e.stopPropagation();
              onStep(d);
            }}
            aria-label={d < 0 ? "Previous" : "Next"}
            className={`absolute top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-surface/80 hover:bg-surface-2 md:grid ${
              d < 0 ? "left-5" : "right-5"
            }`}
          >
            {d < 0 ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
          </button>
        ))}
      </div>

      <div className="px-5 py-5 text-center" onClick={(e) => e.stopPropagation()}>
        <p className="font-medium">{item.title}</p>
        <p className="text-sm text-muted">{item.caption}</p>
      </div>
    </motion.div>
  );
}

export function Awards() {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + awards.length) % awards.length)),
    [],
  );

  return (
    <section id="awards" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
        <SectionHeader
          title={
            <>
              WorldSkills Korea
              <br />
              <span className="text-muted">Cloud Computing.</span>
            </>
          }
          aside="Designing and building IT infrastructure on public cloud under time pressure — from the regional round in Gyeongbuk to the national finals in Gwangju."
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-8">
                <p className="text-sm text-muted">Best result</p>
                <p className="mt-4 text-6xl font-semibold tracking-tighter">
                  4<span className="align-top text-3xl text-muted">th</span>
                </p>
                <p className="mt-2 text-lg">National Finals · Excellence Award</p>
              </div>
            </Reveal>

            <ol className="mt-8 space-y-0">
              {timeline.map((t, i) => (
                <Reveal key={t.title} delay={0.05 * (i + 1)}>
                  <li className="relative border-l border-line-strong pb-8 pl-8 last:pb-0">
                    <span className="absolute -left-[4.5px] top-2 size-2 rounded-full bg-fg ring-4 ring-bg" />
                    <p className="text-sm tabular-nums text-muted">{t.date}</p>
                    <p className="mt-1 text-lg font-medium">{t.title}</p>
                    <p className="text-fg/80">{t.detail}</p>
                    <p className="mt-1 text-sm text-faint">{t.note}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="columns-2 gap-4 [&>*]:mb-4">
            {awards.map((a, i) => (
              <Reveal key={a.src} delay={(i % 2) * 0.08} className="break-inside-avoid">
                <button
                  onClick={() => setOpen(i)}
                  className="group relative block w-full overflow-hidden rounded-2xl border border-line bg-surface text-left"
                >
                  <Image
                    src={a.src}
                    alt={a.alt}
                    width={a.width}
                    height={a.height}
                    sizes="(min-width: 1024px) 340px, 50vw"
                    className="h-auto w-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-80 transition-opacity group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
                    <div>
                      <p className="text-sm font-medium">{a.title}</p>
                      <p className="text-xs text-white/60">{a.caption}</p>
                    </div>
                    <Maximize2 className="size-4 shrink-0 text-white/0 transition-colors group-hover:text-white/80" />
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>{open !== null && <Lightbox index={open} onClose={close} onStep={step} />}</AnimatePresence>
    </section>
  );
}
