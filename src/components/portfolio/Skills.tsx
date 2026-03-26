"use client";

import { skills } from "@/data/portfolio";
import { useReveal } from "@/hooks/useReveal";

function SkillTag({ name, delay }: { name: string; delay: number }) {
  const [ref, visible] = useReveal();

  return (
    <span
      ref={ref}
      className="m-1 inline-block cursor-default border border-[var(--color-border-accent)] bg-[color-mix(in_oklab,var(--color-accent)_5%,transparent)] px-3 py-1 font-mono text-xs text-[var(--color-accent-bright)] transition-[opacity,transform,box-shadow,background-color,border-color] duration-[400ms]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transitionDelay: `${delay}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "color-mix(in oklab, var(--color-accent) 14%, transparent)";
        e.currentTarget.style.borderColor = "var(--color-accent)";
        e.currentTarget.style.boxShadow = "0 0 12px color-mix(in oklab, var(--color-accent) 22%, transparent)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "color-mix(in oklab, var(--color-accent) 5%, transparent)";
        e.currentTarget.style.borderColor = "var(--color-border-accent)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {name}
    </span>
  );
}

export function Skills() {
  const [ref, visible] = useReveal();

  return (
    <section id="skills" className="relative px-8 py-24">
      <div className="mx-auto max-w-[900px]">
        <p className="mb-2 font-mono text-xs text-[var(--color-text-dim)]">{"// section_02"}</p>
        <h2
          ref={ref}
          className="mb-12 font-[family-name:var(--font-display)] text-[clamp(2rem,6vw,4rem)] font-black text-[var(--color-text-primary)] transition-all duration-[600ms]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateX(-20px)",
          }}
        >
          SKILL<span className="text-[var(--color-accent)]">_SET</span>
        </h2>
        <div className="rounded border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] p-8 font-mono">
          <div className="mb-6 text-[13px] text-[var(--color-text-dim)]">
            <span className="text-[#ff7b72]">const </span>
            <span className="text-[#79c0ff]">skills </span>
            <span className="text-[var(--color-text-primary)]">= {"{"}</span>
          </div>
          {(["frontend", "backend", "tools"] as const).map((cat) => {
            const items = skills[cat];
            return (
              <div key={cat} className="mb-6 pl-6 last:mb-0">
                <span className="text-[13px] text-[#79c0ff]">{cat}</span>
                <span className="text-[13px] text-[var(--color-text-primary)]">: [</span>
                <div className="mt-2 pl-4">
                  {items.map((s, i) => (
                    <SkillTag key={s} name={s} delay={i * 60} />
                  ))}
                </div>
                <span className="text-[13px] text-[var(--color-text-primary)]">],</span>
              </div>
            );
          })}
          <div className="text-[13px] text-[var(--color-text-primary)]">{"}"}</div>
        </div>
      </div>
    </section>
  );
}
