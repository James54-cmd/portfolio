"use client";

import { timeline } from "@/data/portfolio";
import { useReveal } from "@/hooks/useReveal";
import { useMemo } from "react";

const TECH_TAGS: Record<string, string[]> = {
  e1b7a2c: ["Next.js", "Supabase", "TypeScript", "VSCode", "Cursor"],
  a3f1c9b: [".NET", "C#", "Visual Studio", "MySQL"],
};

function TimelineEntry({ entry, delay }: { entry: (typeof timeline)[number]; delay: number }) {
  const [ref, visible] = useReveal();
  const tags = TECH_TAGS[entry.hash] ?? [];

  return (
    <div
      ref={ref}
      className="group/entry relative mb-3 flex gap-3 overflow-hidden rounded-sm border p-3 transition-all duration-500 last:mb-0 sm:gap-5 sm:p-4 md:gap-6 md:p-5"
      style={{
        borderColor: "color-mix(in oklab, var(--color-accent) 12%, transparent)",
        background:
          "linear-gradient(135deg, color-mix(in oklab, var(--color-accent) 4%, transparent) 0%, color-mix(in oklab, var(--color-bg-elevated) 92%, #000 8%) 40%, color-mix(in oklab, var(--color-magenta) 3%, transparent) 100%)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-22px)",
        transitionDelay: `${delay}ms`,
        boxShadow: visible
          ? "0 12px 28px -18px rgba(0,0,0,0.8), inset 0 1px 0 color-mix(in oklab, var(--color-accent) 8%, transparent)"
          : "none",
      }}
    >
      {/* Hover glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/entry:opacity-100"
        style={{
          background:
            "linear-gradient(90deg, color-mix(in oklab, var(--color-accent) 7%, transparent) 0%, transparent 30%)",
        }}
        aria-hidden
      />

      {/* Corner bracket on hover */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-4 w-4 opacity-0 transition-all duration-300 group-hover/entry:opacity-100"
        style={{
          borderTop: "1px solid color-mix(in oklab, var(--color-accent) 70%, transparent)",
          borderLeft: "1px solid color-mix(in oklab, var(--color-accent) 70%, transparent)",
        }}
        aria-hidden
      />

      {/* Status dot */}
      <div
        className="pointer-events-none absolute right-3 top-3 h-1.5 w-1.5 rounded-full"
        style={{ background: "var(--color-accent)", opacity: delay === 0 ? 0.4 : 0.15 }}
        aria-hidden
      />

      {/* Node + line */}
      <div className="flex flex-col items-center pt-0.5">
        <div
          className="relative h-3 w-3 shrink-0 rounded-full border"
          style={{
            borderColor: "color-mix(in oklab, var(--color-accent) 60%, transparent)",
            background: "var(--color-accent)",
            boxShadow: "0 0 10px color-mix(in oklab, var(--color-accent) 50%, transparent), 0 0 20px color-mix(in oklab, var(--color-accent) 20%, transparent)",
          }}
        >
          <span
            className="pointer-events-none absolute inset-[-5px] rounded-full"
            style={{
              border: "1px solid color-mix(in oklab, var(--color-accent) 28%, transparent)",
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.8)",
              transition: "transform 0.4s ease, opacity 0.4s ease",
            }}
            aria-hidden
          />
        </div>
        <div
          className="mt-1.5 w-px flex-1"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--color-accent) 30%, transparent), color-mix(in oklab, var(--color-border-subtle) 60%, transparent))",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 pb-1">
        <div className="mb-1 font-mono text-[11px] tracking-wide">
          <span style={{ color: "#ffcc00" }}>{entry.hash}</span>
          <span style={{ color: "var(--color-text-dim)" }}> · {entry.date}</span>
        </div>
        <div className="mb-1.5 font-mono text-[13px] sm:text-[13.5px]" style={{ color: "var(--color-accent-bright)" }}>
          {entry.msg}
        </div>
        <div className="font-mono text-[11px] leading-relaxed sm:text-xs" style={{ color: "var(--color-text-muted)" }}>
          <span style={{ color: "var(--color-text-dim)" }}># </span>
          {entry.detail}
        </div>

        {/* Tech tags */}
        {tags.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] tracking-wide transition-all duration-200 group-hover/entry:border-[color-mix(in_oklab,var(--color-accent)_28%,transparent)] group-hover/entry:text-[color-mix(in_oklab,var(--color-accent)_70%,transparent)]"
                style={{
                  padding: "2px 8px",
                  borderRadius: "2px",
                  border: "1px solid color-mix(in oklab, var(--color-accent) 14%, transparent)",
                  color: "color-mix(in oklab, var(--color-accent) 45%, var(--color-text-dim))",
                  background: "color-mix(in oklab, var(--color-accent) 4%, transparent)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Entry type label */}
        <span
          className="pointer-events-none absolute bottom-0 right-0 font-mono text-[9px] tracking-widest opacity-0 transition-opacity duration-300 group-hover/entry:opacity-50"
          style={{ color: "var(--color-accent)" }}
        >
          {entry.hash === "e1b7a2c" ? "[ full-time ]" : "[ internship ]"}
        </span>
      </div>
    </div>
  );
}

export function Timeline() {
  const [ref, visible] = useReveal(0.12);
  const [panelRef, panelVisible] = useReveal(0.06);
  const total = useMemo(() => timeline.length, []);

  return (
    <section
      id="timeline"
      className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-28"
      style={{
        background:
          "radial-gradient(120% 80% at 10% 0%, color-mix(in oklab, var(--color-accent) 5%, transparent) 0%, transparent 52%), radial-gradient(90% 70% at 100% 100%, color-mix(in oklab, var(--color-magenta) 5%, transparent) 0%, transparent 58%)",
      }}
    >
      <style>{`
        @keyframes timeline-scan {
          0% { transform: translateY(-110%); opacity: 0; }
          8% { opacity: 0.07; }
          92% { opacity: 0.07; }
          100% { transform: translateY(180%); opacity: 0; }
        }
        @keyframes grid-drift {
          from { background-position: 0 0; }
          to { background-position: 28px 28px; }
        }
        @keyframes node-glow {
          0%, 100% { box-shadow: 0 0 10px color-mix(in oklab, var(--color-accent) 50%, transparent), 0 0 20px color-mix(in oklab, var(--color-accent) 20%, transparent); }
          50% { box-shadow: 0 0 14px color-mix(in oklab, var(--color-accent) 80%, transparent), 0 0 28px color-mix(in oklab, var(--color-accent) 35%, transparent); }
        }
      `}</style>

      {/* Animated grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in oklab, var(--color-accent) 4%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--color-accent) 4%, transparent) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          animation: "grid-drift 20s linear infinite",
          opacity: 0.6,
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[min(980px,100%)]">
        <p className="mb-2 font-mono text-xs" style={{ color: "var(--color-text-dim)" }}>{"// section_04"}</p>
        <h2
          ref={ref}
          className="mb-2 font-[family-name:var(--font-display)] text-[clamp(2rem,6vw,4rem)] font-black transition-all duration-[600ms]"
          style={{
            color: "var(--color-text-primary)",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateX(-20px)",
          }}
        >
          TIME<span style={{ color: "var(--color-accent)" }}>LINE</span>
        </h2>
        <p className="mb-8 font-mono text-xs sm:mb-12" style={{ color: "var(--color-text-dim)" }}>
          $ git log --oneline <span style={{ color: "var(--color-accent)" }}>--graph</span> --author=&quot;<span style={{ color: "#ffcc00" }}>James Fanuel Damaso</span>&quot;
        </p>

        <div
          ref={panelRef}
          className="relative overflow-hidden rounded-sm border p-4 sm:p-6 md:p-8"
          style={{
            borderColor: "color-mix(in oklab, var(--color-accent) 15%, transparent)",
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--color-bg-elevated) 92%, #000 8%), color-mix(in oklab, var(--color-bg-panel) 96%, var(--color-accent) 4%))",
            opacity: panelVisible ? 1 : 0,
            transform: panelVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            boxShadow:
              "0 0 0 1px color-mix(in oklab, var(--color-accent) 6%, transparent), 0 24px 70px -24px rgba(0,0,0,0.85)",
          }}
        >
          {/* Scan line */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[130%]"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--color-accent) 8%, transparent) 50%, transparent 100%)",
              animation: panelVisible ? "timeline-scan 10s linear infinite" : "none",
            }}
            aria-hidden
          />

          {/* Noise texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
            aria-hidden
          />

          {/* Panel header */}
          <div
            className="relative z-10 mb-4 flex flex-wrap items-center justify-between gap-2 border-b pb-3 sm:mb-6 sm:pb-4"
            style={{ borderColor: "color-mix(in oklab, var(--color-accent) 10%, transparent)" }}
          >
            <div className="flex items-center gap-2.5">
              {/* Git branch icon */}
              <svg
                width="14" height="14" viewBox="0 0 16 16" fill="none"
                stroke="color-mix(in oklab, var(--color-accent) 50%, transparent)"
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <circle cx="5" cy="4" r="1.5"/>
                <circle cx="5" cy="12" r="1.5"/>
                <circle cx="11" cy="8" r="1.5"/>
                <path d="M6.5 4.5 L9.5 7.5 M6.5 11.5 L9.5 8.5"/>
              </svg>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--color-text-dim)" }}>
                commit history
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="font-mono text-[10px]"
                style={{
                  padding: "2px 8px",
                  border: "1px solid color-mix(in oklab, var(--color-accent) 18%, transparent)",
                  borderRadius: "2px",
                  color: "var(--color-accent)",
                  background: "color-mix(in oklab, var(--color-accent) 7%, transparent)",
                }}
              >
                {total} entries
              </span>
              <span className="font-mono text-[10px]" style={{ color: "var(--color-text-dim)" }}>· HEAD~1</span>
            </div>
          </div>

          {/* Entries */}
          <div className="relative z-10">
            {timeline.map((e, i) => (
              <TimelineEntry key={e.hash} entry={e} delay={i * 90} />
            ))}
          </div>

          {/* Stats bar */}
          <div
            className="relative z-10 mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-4"
            style={{ borderColor: "color-mix(in oklab, var(--color-accent) 7%, transparent)" }}
          >
            {[
              { icon: "clock", label: "~11 mos total" },
              { icon: "building", label: "2 companies", value: "2" },
              { icon: "code", label: "9 technologies", value: "9" },
            ].map(({ label }) => (
              <span key={label} className="font-mono text-[10px] tracking-[0.1em]" style={{ color: "var(--color-text-dim)" }}>
                {label}
              </span>
            ))}
            <span className="ml-auto font-mono text-[10px]" style={{ color: "var(--color-text-dim)" }}>
              branch: <span style={{ color: "#ffcc00" }}>main</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}