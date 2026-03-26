"use client";

import { skills, type SkillItem } from "@/data/portfolio";
import { getSkillIcon } from "@/data/skillIcons";
import { useReveal } from "@/hooks/useReveal";
import { useMemo } from "react";

const CATEGORIES = ["frontend", "backend", "tools", "soft"] as const;

function staggerIndex(cat: (typeof CATEGORIES)[number], itemIndex: number): number {
  let offset = 0;
  for (const c of CATEGORIES) {
    if (c === cat) return offset + itemIndex;
    offset += skills[c].length;
  }
  return 0;
}

function SkillTag({
  item,
  delay,
  visible,
}: {
  item: SkillItem;
  delay: number;
  visible: boolean;
}) {
  const Icon = getSkillIcon(item.icon);

  return (
    <span
      className="group/tag relative m-1 inline-flex cursor-default items-center gap-2 overflow-hidden border border-[var(--color-border-accent)] bg-[color-mix(in_oklab,var(--color-accent)_6%,transparent)] px-3 py-1.5 font-mono text-xs text-[var(--color-accent-bright)] shadow-[inset_0_1px_0_color-mix(in_oklab,var(--color-accent)_12%,transparent)] transition-[opacity,transform,box-shadow,background-color,border-color] duration-500 ease-out focus-within:outline-none focus-within:ring-1 focus-within:ring-[color-mix(in_oklab,var(--color-accent)_55%,transparent)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--color-bg-elevated)]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Hover wash — phosphor sweep */}
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[color-mix(in_oklab,var(--color-accent)_18%,transparent)] to-transparent opacity-0 transition-[transform,opacity] duration-500 ease-out group-hover/tag:translate-x-full group-hover/tag:opacity-100"
        aria-hidden
      />
      <span
        className="relative flex size-7 shrink-0 items-center justify-center rounded-sm border border-[color-mix(in_oklab,var(--color-accent)_20%,transparent)] bg-[color-mix(in_oklab,var(--color-accent)_8%,transparent)] transition-[border-color,box-shadow,transform] duration-300 ease-out group-hover/tag:border-[color-mix(in_oklab,var(--color-accent)_45%,transparent)] group-hover/tag:shadow-[0_0_14px_color-mix(in_oklab,var(--color-accent)_25%,transparent)] group-hover/tag:[transform:translateY(-1px)]"
        aria-hidden
      >
        <Icon
          className="size-3.5 text-[var(--color-accent-bright)] opacity-90 transition-transform duration-300 ease-out group-hover/tag:scale-110"
          strokeWidth={1.75}
        />
      </span>
      <span className="relative tracking-tight">{item.name}</span>
    </span>
  );
}

export function Skills() {
  const [titleRef, titleVisible] = useReveal(0.12);
  const [panelRef, panelVisible] = useReveal(0.08);

  const categoryMeta = useMemo(
    () =>
      [
        { id: "frontend" as const, label: "frontend", rail: "01", accent: "var(--color-accent)" },
        { id: "backend" as const, label: "backend", rail: "02", accent: "color-mix(in oklab, var(--color-accent) 75%, #00a8ff 25%)" },
        { id: "tools" as const, label: "tools", rail: "03", accent: "var(--color-magenta)" },
        {
          id: "soft" as const,
          label: "soft",
          rail: "04",
          accent: "color-mix(in oklab, var(--color-accent) 40%, #e8a020 60%)",
        },
      ] as const,
    [],
  );

  return (
    <section id="skills" className="relative px-8 py-28" aria-labelledby="skills-heading">
      {/* Local keyframes — scan + panel breathe; respects global reduced-motion overrides */}
      <style>{`
        @keyframes skills-scanline {
          0% { transform: translateY(-100%); opacity: 0; }
          15% { opacity: 0.06; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>

      {/* Depth: soft phosphor pools + grid scratch */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute -left-[20%] top-[10%] h-[min(420px,50vh)] w-[min(420px,55vw)] rounded-full blur-[100px]"
          style={{
            background: "radial-gradient(ellipse at center, color-mix(in oklab, var(--color-accent) 14%, transparent) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -right-[15%] bottom-[20%] h-[min(320px,40vh)] w-[min(380px,45vw)] rounded-full blur-[90px]"
          style={{
            background: "radial-gradient(ellipse at center, color-mix(in oklab, var(--color-magenta) 10%, transparent) 0%, transparent 72%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[min(920px,100%)]">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.35em] text-[var(--color-text-dim)]">
          {"// section_02 — capability_matrix"}
        </p>
        <h2
          id="skills-heading"
          ref={titleRef}
          className="mb-14 font-[family-name:var(--font-display)] text-[clamp(2rem,6vw,4rem)] font-black leading-[0.95] tracking-tight text-[var(--color-text-primary)] transition-all duration-700 ease-out"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "none" : "translateX(-28px)",
          }}
        >
          SKILL<span className="text-[var(--color-accent)]">_SET</span>
          <span className="ml-2 inline-block font-mono text-[clamp(0.65rem,1.8vw,0.85rem)] font-normal tracking-normal text-[var(--color-text-dim)]">
            <span className="text-[var(--color-accent-dim)]">{"//"}</span> stack snapshot
          </span>
        </h2>

        <div
          ref={panelRef}
          className="relative overflow-hidden rounded-sm border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-accent)_6%,transparent),0_24px_64px_-24px_rgba(0,0,0,0.85)] transition-[opacity,transform] duration-[850ms] ease-out motion-reduce:transition-none"
          style={{
            opacity: panelVisible ? 1 : 0,
            transform: panelVisible ? "translateY(0) skewY(0deg)" : "translateY(14px) skewY(-0.35deg)",
          }}
        >
          {/* Film grain texture — section-local */}
          <div
            className="pointer-events-none absolute inset-0 z-[1] opacity-[0.035] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
            aria-hidden
          />
          {/* Technical grid */}
          <div
            className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(color-mix(in oklab, var(--color-accent) 22%, transparent) 1px, transparent 1px),
                linear-gradient(90deg, color-mix(in oklab, var(--color-accent) 22%, transparent) 1px, transparent 1px)
              `,
              backgroundSize: "24px 24px",
            }}
            aria-hidden
          />
          {/* Slow scanline */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[120%] w-full"
            style={{
              background: "linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--color-accent) 8%, transparent) 50%, transparent 100%)",
              animation: panelVisible ? "skills-scanline 9s linear infinite" : "none",
            }}
            aria-hidden
          />

          {/* HUD corners */}
          <div className="pointer-events-none absolute inset-0 z-[3]" aria-hidden>
            <div className="absolute left-0 top-0 h-5 w-5 border-l border-t border-[color-mix(in_oklab,var(--color-accent)_45%,transparent)]" />
            <div className="absolute right-0 top-0 h-5 w-5 border-r border-t border-[color-mix(in_oklab,var(--color-accent)_45%,transparent)]" />
            <div className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-[color-mix(in_oklab,var(--color-accent)_35%,transparent)]" />
            <div className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-[color-mix(in_oklab,var(--color-accent)_35%,transparent)]" />
          </div>

          <div className="relative z-10 p-8 pb-10 font-mono sm:p-10">
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3 border-b border-[color-mix(in_oklab,var(--color-accent)_12%,transparent)] pb-5 text-[13px]">
              <div className="text-[var(--color-text-dim)]">
                <span className="text-[#ff7b72]">const </span>
                <span className="text-[#79c0ff]">skills </span>
                <span className="text-[var(--color-text-primary)]">= {"{"}</span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-dim)]">
                read-only <span className="text-[var(--color-accent-dim)]">·</span> v1
              </span>
            </div>

            <div className="space-y-10">
              {categoryMeta.map((meta) => {
                const items = skills[meta.id];
                return (
                  <div key={meta.id} className="relative pl-0 sm:pl-2">
                    <div className="mb-3 flex flex-wrap items-center gap-3 sm:gap-4">
                      <span
                        className="inline-flex min-w-[2rem] items-center justify-center font-mono text-[10px] tabular-nums text-[var(--color-text-dim)]"
                        aria-hidden
                      >
                        {meta.rail}
                      </span>
                      <div
                        className="hidden h-px w-6 shrink-0 sm:block"
                        style={{ background: meta.accent, opacity: 0.45 }}
                        aria-hidden
                      />
                      <span className="text-[13px]" style={{ color: meta.accent }}>
                        {meta.label}
                      </span>
                      <span className="text-[13px] text-[var(--color-text-primary)]">: [</span>
                    </div>
                    <div
                      className="mt-1 border-l border-[color-mix(in_oklab,var(--color-accent)_14%,transparent)] pl-4 sm:pl-7"
                      style={{
                        boxShadow: "-1px 0 0 0 color-mix(in oklab, var(--color-accent) 6%, transparent)",
                      }}
                    >
                      <div className="flex flex-wrap pl-1">
                        {items.map((s, i) => (
                          <SkillTag
                            key={`${meta.id}-${s.name}-${i}`}
                            item={s}
                            delay={staggerIndex(meta.id, i) * 52}
                            visible={panelVisible}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="mt-2 inline-block pl-4 text-[13px] text-[var(--color-text-primary)] sm:pl-[4.25rem]">
                      ],
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[color-mix(in_oklab,var(--color-accent)_10%,transparent)] pt-5 text-[13px] text-[var(--color-text-primary)]">
              <span>{"}"}</span>
              <span className="font-mono text-[10px] text-[var(--color-text-dim)]">
                <span className="text-[var(--color-accent)]">█</span>
                <span className="blink-cursor ml-0.5">▋</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
