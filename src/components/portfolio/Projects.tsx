"use client";

import { projects } from "@/data/portfolio";
import { useReveal } from "@/hooks/useReveal";

function ProjectCard({ project, delay }: { project: (typeof projects)[number]; delay: number }) {
  const [ref, visible] = useReveal();

  return (
    <article
      ref={ref}
      className="cursor-default overflow-hidden rounded border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] transition-[opacity,transform,box-shadow,border-color] duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${delay}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "color-mix(in oklab, var(--color-accent) 35%, transparent)";
        e.currentTarget.style.boxShadow = "0 0 36px color-mix(in oklab, var(--color-accent) 10%, transparent)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--color-border-subtle)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div className="flex items-center gap-1.5 border-b border-[var(--color-border-subtle)] bg-[#111] px-3.5 py-2.5">
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[11px] text-[var(--color-accent)]">{project.path}</span>
      </div>
      <div className="p-5">
        <p className="mb-4 font-mono text-[13px] leading-relaxed text-[#888]">
          <span className="text-[var(--color-text-dim)]"># </span>
          {project.desc}
        </p>
        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded border border-[color-mix(in_oklab,var(--color-accent)_15%,transparent)] bg-[color-mix(in_oklab,var(--color-accent)_8%,transparent)] px-2 py-0.5 font-mono text-[11px] text-[var(--color-accent)]"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          <a
            href={project.github}
            className="font-mono text-[11px] tracking-widest text-[var(--color-text-muted)] no-underline transition-colors hover:text-[var(--color-accent)] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          >
            [github]
          </a>
          <a
            href={project.live}
            className="font-mono text-[11px] tracking-widest text-[var(--color-text-muted)] no-underline transition-colors hover:text-[var(--color-accent)] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          >
            [live_demo]
          </a>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const [ref, visible] = useReveal();

  return (
    <section id="projects" className="px-8 py-24">
      <div className="mx-auto max-w-[900px]">
        <p className="mb-2 font-mono text-xs text-[var(--color-text-dim)]">{"// section_03"}</p>
        <h2
          ref={ref}
          className="mb-12 font-[family-name:var(--font-display)] text-[clamp(2rem,6vw,4rem)] font-black text-[var(--color-text-primary)] transition-all duration-[600ms]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateX(-20px)",
          }}
        >
          PRO<span className="text-[var(--color-accent)]">JECTS</span>
        </h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,360px),1fr))] gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.path} project={p} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
