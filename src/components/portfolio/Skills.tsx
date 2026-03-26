"use client";

import { skills, type SkillItem } from "@/data/portfolio";
import { getSkillIcon } from "@/data/skillIcons";
import { useReveal } from "@/hooks/useReveal";
import { useMemo, useState } from "react";

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
  accent,
}: {
  item: SkillItem;
  delay: number;
  visible: boolean;
  accent: string;
}) {
  const Icon = getSkillIcon(item.icon);
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className="group/tag relative m-1 inline-flex cursor-default items-center gap-2 overflow-hidden border font-mono text-xs transition-[opacity,transform,box-shadow,border-color,background-color] duration-500 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.96)",
        transitionDelay: `${delay}ms`,
        paddingLeft: "0.45rem",
        paddingRight: "0.85rem",
        paddingTop: "0.3rem",
        paddingBottom: "0.3rem",
        borderColor: hovered
          ? `color-mix(in oklab, ${accent} 55%, transparent)`
          : `color-mix(in oklab, ${accent} 18%, transparent)`,
        background: hovered
          ? `color-mix(in oklab, ${accent} 10%, transparent)`
          : `color-mix(in oklab, ${accent} 4%, transparent)`,
        boxShadow: hovered
          ? `0 0 18px color-mix(in oklab, ${accent} 22%, transparent), inset 0 1px 0 color-mix(in oklab, ${accent} 20%, transparent)`
          : `inset 0 1px 0 color-mix(in oklab, ${accent} 8%, transparent)`,
        color: `color-mix(in oklab, ${accent} 90%, #ffffff 10%)`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* phosphor sweep shimmer */}
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent to-transparent opacity-0 transition-[transform,opacity] duration-500 ease-out group-hover/tag:translate-x-full group-hover/tag:opacity-100"
        style={{
          backgroundImage: `linear-gradient(90deg, transparent, color-mix(in oklab, ${accent} 16%, transparent), transparent)`,
        }}
        aria-hidden
      />

      {/* icon badge */}
      <span
        className="relative flex shrink-0 items-center justify-center transition-[border-color,box-shadow,transform] duration-300 ease-out group-hover/tag:[transform:translateY(-1px)_scale(1.08)]"
        style={{
          width: "1.6rem",
          height: "1.6rem",
          borderRadius: "2px",
          border: `1px solid color-mix(in oklab, ${accent} ${hovered ? "40%" : "18%"}, transparent)`,
          background: `color-mix(in oklab, ${accent} ${hovered ? "14%" : "7%"}, transparent)`,
          boxShadow: hovered ? `0 0 10px color-mix(in oklab, ${accent} 28%, transparent)` : "none",
          transition: "all 0.3s ease",
        }}
        aria-hidden
      >
        <Icon
          className="transition-transform duration-300 ease-out group-hover/tag:scale-110"
          style={{ width: "0.8rem", height: "0.8rem" }}
        />
      </span>

      <span className="relative tracking-tight">{item.name}</span>
    </span>
  );
}

function CategoryRow({
  id,
  label,
  rail,
  accent,
  items,
  visible,
}: {
  id: (typeof CATEGORIES)[number];
  label: string;
  rail: string;
  accent: string;
  items: readonly SkillItem[];
  visible: boolean;
}) {
  return (
    <div className="relative">
      {/* Ghost watermark label */}
      <div
        className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 select-none font-mono font-black uppercase leading-none tracking-tighter opacity-[0.035] transition-opacity duration-700"
        style={{
          fontSize: "clamp(3.5rem, 8vw, 6rem)",
          color: accent,
          opacity: visible ? 0.035 : 0,
        }}
        aria-hidden
      >
        {label}
      </div>

      {/* Row header */}
      <div className="relative z-10 mb-3 flex flex-wrap items-center gap-2 sm:gap-3">
        {/* rail number pill */}
        <span
          className="inline-flex items-center justify-center font-mono text-[9px] tabular-nums"
          style={{
            width: "2.2rem",
            height: "1.4rem",
            border: `1px solid color-mix(in oklab, ${accent} 22%, transparent)`,
            color: `color-mix(in oklab, ${accent} 70%, transparent)`,
            background: `color-mix(in oklab, ${accent} 5%, transparent)`,
            letterSpacing: "0.15em",
            borderRadius: "2px",
          }}
          aria-hidden
        >
          {rail}
        </span>

        {/* accent tick */}
        <span
          className="hidden h-px w-8 shrink-0 sm:block"
          style={{ background: `linear-gradient(90deg, ${accent}, transparent)`, opacity: 0.5 }}
          aria-hidden
        />

        {/* category label */}
        <span
          className="font-mono text-[13px] tracking-wide"
          style={{ color: accent }}
        >
          {label}
        </span>

        {/* count badge */}
        <span
          className="font-mono text-[10px]"
          style={{ color: `color-mix(in oklab, ${accent} 40%, transparent)` }}
        >
          [{items.length}]
        </span>

        {/* separator */}
        <span className="font-mono text-[13px] text-[var(--color-text-primary)]">:</span>
      </div>

      {/* Tags area with left rail */}
      <div
        className="relative z-10 pl-4 sm:pl-10"
        style={{
          borderLeft: `1px solid color-mix(in oklab, ${accent} 16%, transparent)`,
        }}
      >
        {/* glowing dot at top of rail */}
        <span
          className="absolute -left-[3px] top-0 block h-1.5 w-1.5 rounded-full transition-opacity duration-700"
          style={{
            background: accent,
            opacity: visible ? 0.7 : 0,
            boxShadow: `0 0 6px ${accent}`,
          }}
          aria-hidden
        />

        <div className="flex flex-wrap -m-1">
          {items.map((s, i) => (
            <SkillTag
              key={`${id}-${s.name}-${i}`}
              item={s}
              delay={staggerIndex(id, i) * 48}
              visible={visible}
              accent={accent}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Skills() {
  const [titleRef, titleVisible] = useReveal(0.12);
  const [panelRef, panelVisible] = useReveal(0.06);

  const categoryMeta = useMemo(
    () => [
      {
        id: "frontend" as const,
        label: "frontend",
        rail: "01",
        accent: "var(--color-accent)",
        status: "stable",
      },
      {
        id: "backend" as const,
        label: "backend",
        rail: "02",
        accent: "color-mix(in oklab, var(--color-accent) 60%, #3fa9f5 40%)",
        status: "stable",
      },
      {
        id: "tools" as const,
        label: "tools",
        rail: "03",
        accent: "var(--color-magenta)",
        status: "active",
      },
      {
        id: "soft" as const,
        label: "soft",
        rail: "04",
        accent: "color-mix(in oklab, var(--color-accent) 35%, #e8a020 65%)",
        status: "loaded",
      },
    ],
    []
  );

  return (
    <section id="skills" className="relative px-8 py-28" aria-labelledby="skills-heading">
      <style>{`
        @keyframes skills-scan {
          0%   { transform: translateY(-100%); opacity: 0; }
          8%   { opacity: 0.05; }
          92%  { opacity: 0.05; }
          100% { transform: translateY(200%); opacity: 0; }
        }
        @keyframes skills-pulse {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1; }
        }
        @keyframes skills-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>

      {/* Ambient phosphor glow blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute -left-[15%] top-[5%] h-[min(500px,55vh)] w-[min(500px,60vw)] rounded-full blur-[110px]"
          style={{
            background:
              "radial-gradient(ellipse, color-mix(in oklab, var(--color-accent) 12%, transparent) 0%, transparent 68%)",
          }}
        />
        <div
          className="absolute -right-[10%] bottom-[15%] h-[min(360px,42vh)] w-[min(420px,48vw)] rounded-full blur-[95px]"
          style={{
            background:
              "radial-gradient(ellipse, color-mix(in oklab, var(--color-magenta) 9%, transparent) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[min(940px,100%)]">

        {/* Section eyebrow */}
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.35em] text-[var(--color-text-dim)]">
          {"// section_02 — capability_matrix"}
        </p>

        {/* Heading */}
        <h2
          id="skills-heading"
          ref={titleRef}
          className="mb-14 font-[family-name:var(--font-display)] font-black leading-[0.95] tracking-tight text-[var(--color-text-primary)] transition-all duration-700 ease-out"
          style={{
            fontSize: "clamp(2rem, 6vw, 4rem)",
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "none" : "translateX(-28px)",
          }}
        >
          SKILL
          <span className="text-[var(--color-accent)]">_SET</span>
          <span className="ml-3 inline-block font-mono font-normal tracking-normal text-[var(--color-text-dim)]"
            style={{ fontSize: "clamp(0.65rem, 1.8vw, 0.85rem)" }}>
            <span className="text-[var(--color-accent-dim)]">{"//"}</span> stack snapshot
          </span>
        </h2>

        {/* Main panel */}
        <div
          ref={panelRef}
          className="relative overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] transition-[opacity,transform] duration-[900ms] ease-out motion-reduce:transition-none"
          style={{
            borderRadius: "2px",
            opacity: panelVisible ? 1 : 0,
            transform: panelVisible
              ? "translateY(0) skewY(0deg)"
              : "translateY(18px) skewY(-0.4deg)",
            boxShadow:
              "0 0 0 1px color-mix(in oklab, var(--color-accent) 6%, transparent), 0 28px 72px -20px rgba(0,0,0,0.9), 0 0 80px -20px color-mix(in oklab, var(--color-accent) 5%, transparent)",
          }}
        >
          {/* Film grain */}
          <div
            className="pointer-events-none absolute inset-0 z-[1] opacity-[0.03] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
            aria-hidden
          />

          {/* Technical grid */}
          <div
            className="pointer-events-none absolute inset-0 z-[1] opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(color-mix(in oklab, var(--color-accent) 30%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--color-accent) 30%, transparent) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
            aria-hidden
          />

          {/* Slow scanline sweep */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[120%] w-full"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--color-accent) 7%, transparent) 50%, transparent 100%)",
              animation: panelVisible ? "skills-scan 10s linear infinite" : "none",
            }}
            aria-hidden
          />

          {/* HUD corners */}
          <div className="pointer-events-none absolute inset-0 z-[3]" aria-hidden>
            {[
              "top-0 left-0 border-l border-t",
              "top-0 right-0 border-r border-t",
              "bottom-0 left-0 border-b border-l",
              "bottom-0 right-0 border-b border-r",
            ].map((pos, i) => (
              <div
                key={i}
                className={`absolute h-5 w-5 ${pos}`}
                style={{ borderColor: "color-mix(in oklab, var(--color-accent) 40%, transparent)" }}
              />
            ))}
          </div>

          <div
            className="relative z-10 flex items-center justify-between gap-4 border-b px-6 py-3"
            style={{
              borderColor: "color-mix(in oklab, var(--color-accent) 10%, transparent)",
              background: "color-mix(in oklab, var(--color-accent) 3%, transparent)",
            }}
          >
            <div className="flex items-center gap-3 font-mono text-[12px]">
              <span className="text-[#ff7b72]">const </span>
              <span className="text-[#79c0ff]">skills </span>
              <span className="text-[var(--color-text-primary)]">= {"{"}</span>
            </div>

            <div className="flex items-center gap-4">
              {/* process indicators */}
              {categoryMeta.map((m) => (
                <span
                  key={m.id}
                  className="hidden items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] sm:inline-flex"
                  style={{ color: `color-mix(in oklab, ${m.accent} 55%, transparent)` }}
                >
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{
                      background: m.accent,
                      animation: "skills-pulse 2.4s ease-in-out infinite",
                      animationDelay: `${categoryMeta.indexOf(m) * 0.4}s`,
                    }}
                  />
                  {m.status}
                </span>
              ))}

              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-dim)]">
                read-only <span className="text-[var(--color-accent-dim)]">·</span> v1
              </span>
            </div>
          </div>

          <div className="relative z-10 divide-y divide-[color-mix(in_oklab,var(--color-accent)_6%,transparent)]">
            {categoryMeta.map((meta) => (
              <div key={meta.id} className="px-6 py-8 sm:px-10">
                <CategoryRow
                  id={meta.id}
                  label={meta.label}
                  rail={meta.rail}
                  accent={meta.accent}
                  items={skills[meta.id]}
                  visible={panelVisible}
                />
              </div>
            ))}
          </div>

          <div
            className="relative z-10 flex items-center justify-between border-t px-6 py-4 sm:px-10"
            style={{ borderColor: "color-mix(in oklab, var(--color-accent) 10%, transparent)" }}
          >
            <span className="font-mono text-[13px] text-[var(--color-text-primary)]">{"}"}</span>
            <span className="font-mono text-[10px] text-[var(--color-text-dim)]">
              <span className="text-[var(--color-accent)]">█</span>
              <span style={{ animation: "skills-blink 1.1s step-end infinite" }}>▋</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}