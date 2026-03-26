"use client";

import { timeline } from "@/data/portfolio";
import { useReveal } from "@/hooks/useReveal";

function TimelineEntry({ entry, delay }: { entry: (typeof timeline)[number]; delay: number }) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className="mb-8 flex gap-6 transition-all duration-500 last:mb-0"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateX(-20px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="flex flex-col items-center">
        <div className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-accent)] shadow-[0_0_8px_color-mix(in_oklab,var(--color-accent)_42%,transparent)]" />
        <div className="mt-1.5 w-px flex-1 bg-[var(--color-border-subtle)]" />
      </div>
      <div className="pb-6">
        <div className="mb-1 font-mono text-xs text-[var(--color-text-dim)]">
          <span className="text-[#ffcc00]">{entry.hash}</span>
          <span className="text-[var(--color-text-dim)]"> · {entry.date}</span>
        </div>
        <div className="mb-1 font-mono text-[13px] text-[var(--color-accent-bright)]">{entry.msg}</div>
        <div className="font-mono text-xs text-[var(--color-text-muted)]">
          <span className="text-[var(--color-text-dim)]"># </span>
          {entry.detail}
        </div>
      </div>
    </div>
  );
}

export function Timeline() {
  const [ref, visible] = useReveal();

  return (
    <section id="timeline" className="px-8 py-24">
      <div className="mx-auto max-w-[900px]">
        <p className="mb-2 font-mono text-xs text-[var(--color-text-dim)]">{"// section_04"}</p>
        <h2
          ref={ref}
          className="mb-2 font-[family-name:var(--font-display)] text-[clamp(2rem,6vw,4rem)] font-black text-[var(--color-text-primary)] transition-all duration-[600ms]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateX(-20px)",
          }}
        >
          TIME<span className="text-[var(--color-accent)]">LINE</span>
        </h2>
        <p className="mb-12 font-mono text-xs text-[var(--color-text-dim)]">
          $ git log --oneline --author=&quot;James Fanuel Damaso&quot;
        </p>
        <div>
          {timeline.map((e, i) => (
            <TimelineEntry key={e.hash} entry={e} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
