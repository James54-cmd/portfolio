"use client";

import { projects } from "@/data/portfolio";
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import { useReveal } from "@/hooks/useReveal";
import Image from "next/image";
import { useEffect, useState } from "react";

function ProjectCard({
  project,
  delay,
  onOpenVideo,
}: {
  project: (typeof projects)[number];
  delay: number;
  onOpenVideo: (project: (typeof projects)[number]) => void;
}) {
  const [ref, visible] = useReveal(0.08);
  const [hovered, setHovered] = useState(false);
  const projectSlug = project.path.split("/").pop();
  const mediaAvailable = Boolean(project.video || project.image);

  return (
    <article
      ref={ref}
      className="group/card relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) rotate(0deg)" : "translateY(32px) rotate(0.3deg)",
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
        transitionDelay: `${delay}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Outer glow on hover */}
      <div
        className="pointer-events-none absolute -inset-px z-0 rounded-sm transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          background: "linear-gradient(135deg, color-mix(in oklab, var(--color-accent) 20%, transparent), transparent 60%, color-mix(in oklab, var(--color-magenta) 12%, transparent))",
          filter: "blur(1px)",
        }}
        aria-hidden
      />

      <div
        className="relative z-10 overflow-hidden rounded-sm border transition-[border-color,box-shadow] duration-500"
        style={{
          borderColor: hovered
            ? "color-mix(in oklab, var(--color-accent) 38%, transparent)"
            : "var(--color-border-subtle)",
          background: "linear-gradient(168deg, var(--color-bg-elevated) 0%, color-mix(in oklab, var(--color-bg-panel) 92%, var(--color-accent) 8%) 100%)",
          boxShadow: hovered
            ? "0 0 0 1px color-mix(in oklab, var(--color-accent) 8%, transparent), 0 32px 80px -24px rgba(0,0,0,0.9), 0 0 60px -12px color-mix(in oklab, var(--color-accent) 8%, transparent)"
            : "0 0 0 1px transparent, 0 20px 60px -24px rgba(0,0,0,0.7)",
        }}
      >
        {/* Terminal chrome */}
        <div
          className="flex items-center gap-1.5 border-b px-4 py-2.5"
          style={{
            borderColor: "color-mix(in oklab, var(--color-accent) 8%, transparent)",
            background: "color-mix(in oklab, var(--color-accent) 2.5%, var(--color-bg-deep))",
          }}
        >
          <span className="inline-block h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="inline-block h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="inline-block h-2 w-2 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-[10px] tracking-wide text-[var(--color-accent-dim)]">
            {project.path}
          </span>
          <span className="ml-auto font-mono text-[9px] text-[var(--color-text-dim)]">
            {project.video ? "video" : project.image ? "image" : "no media"}
          </span>
        </div>

        {/* Video gallery */}
        <div className="relative">
          <div className="relative aspect-[16/10] overflow-hidden bg-[#060606]">
            {project.video ? (
              <video
                key={project.video}
                src={project.video}
                className="h-full w-full object-cover object-top"
                muted
                playsInline
                preload="metadata"
                aria-label={`${projectSlug} demo video`}
              />
            ) : project.image ? (
              <Image
                src={project.image}
                alt={`${projectSlug} preview`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
                priority={false}
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-4 text-center">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-accent-dim)]">
                  media placeholder
                </span>
                <span className="font-mono text-[10px] text-[var(--color-text-dim)]">
                  Add media at /public/images/projects/{projectSlug}/
                </span>
              </div>
            )}

            {mediaAvailable && (
              <button
                type="button"
                onClick={() => onOpenVideo(project)}
                className="absolute inset-0 z-[5] flex items-center justify-center transition-opacity duration-300 focus-visible:outline-none"
                style={{
                  opacity: hovered ? 1 : 0,
                  background: "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.5) 100%)",
                }}
                aria-label={`Open ${projectSlug} media preview`}
              >
                <span
                  className="inline-flex items-center gap-2 border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-200"
                  style={{
                    borderColor: "color-mix(in oklab, var(--color-accent) 35%, transparent)",
                    background: "color-mix(in oklab, var(--color-bg-panel) 82%, var(--color-accent) 18%)",
                    color: "var(--color-text-primary)",
                    borderRadius: "2px",
                  }}
                >
                  <span
                    className="inline-block h-0 w-0"
                    style={{
                      borderTop: "5px solid transparent",
                      borderBottom: "5px solid transparent",
                      borderLeft: "8px solid var(--color-accent)",
                    }}
                    aria-hidden
                  />
                  open preview
                </span>
              </button>
            )}

            {/* Gradient vignette over video */}
            <div
              className="pointer-events-none absolute inset-0 z-[3]"
              style={{
                background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, transparent 30%, transparent 65%, rgba(3,3,3,0.6) 100%), linear-gradient(90deg, rgba(3,3,3,0.25) 0%, transparent 15%, transparent 85%, rgba(3,3,3,0.25) 100%)",
              }}
              aria-hidden
            />

            {/* Scanline micro-texture */}
            <div
              className="pointer-events-none absolute inset-0 z-[4] opacity-[0.04]"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.06) 2px, rgba(255,255,255,0.06) 4px)",
              }}
              aria-hidden
            />
          </div>
        </div>

        {/* Content area */}
        <div className="relative px-4 py-4 sm:px-6 sm:py-5">
          {/* Subtle grid behind content */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: "linear-gradient(color-mix(in oklab, var(--color-accent) 40%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--color-accent) 40%, transparent) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
            aria-hidden
          />

          <p className="relative mb-4 font-mono text-[12px] leading-relaxed text-[var(--color-text-muted)]">
            <span className="mr-1.5 text-[var(--color-accent-dim)]">#</span>
            {project.desc}
          </p>

          {/* Tech tags */}
          <div className="relative mb-5 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 font-mono text-[10px] tracking-wide transition-colors duration-200"
                style={{
                  padding: "0.2rem 0.55rem",
                  borderRadius: "1px",
                  border: "1px solid color-mix(in oklab, var(--color-accent) 16%, transparent)",
                  background: "color-mix(in oklab, var(--color-accent) 5%, transparent)",
                  color: "color-mix(in oklab, var(--color-accent) 85%, #ffffff 15%)",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Action links */}
          <div className="relative flex items-center gap-5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] no-underline transition-colors duration-200 hover:text-[var(--color-accent)] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              >
                <span className="inline-block h-px w-3 bg-current transition-[width] duration-200 group-hover/link:w-5" />
                github
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] no-underline transition-colors duration-200 hover:text-[var(--color-accent)] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              >
                <span className="inline-block h-px w-3 bg-current transition-[width] duration-200 group-hover/link:w-5" />
                live demo
              </a>
            )}
            <span className="ml-auto font-mono text-[9px] text-[var(--color-text-dim)] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
              {projectSlug}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const [titleRef, titleVisible] = useReveal(0.12);
  const hasMultipleProjects = projects.length > 1;
  const [activeMediaProject, setActiveMediaProject] = useState<(typeof projects)[number] | null>(null);

  useEffect(() => {
    if (!activeMediaProject) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMediaProject(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeMediaProject]);

  return (
    <section
      id="projects"
      className="relative px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-28"
      style={{
        background: "radial-gradient(110% 70% at 70% 0%, color-mix(in oklab, var(--color-accent) 4%, transparent) 0%, transparent 55%)",
      }}
      aria-labelledby="projects-heading"
    >
      <div className="relative mx-auto max-w-[min(1320px,100%)]">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.35em] text-[var(--color-text-dim)]">
          {"// section_03 — shipped_work"}
        </p>
        <h2
          id="projects-heading"
          ref={titleRef}
          className="mb-8 font-[family-name:var(--font-display)] font-black leading-[0.95] tracking-tight text-[var(--color-text-primary)] transition-all duration-700 ease-out sm:mb-14"
          style={{
            fontSize: "clamp(2rem, 6vw, 4rem)",
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "none" : "translateX(-28px)",
          }}
        >
          PRO<span className="text-[var(--color-accent)]">JECTS</span>
          <span
            className="ml-3 inline-block font-mono font-normal tracking-normal text-[var(--color-text-dim)]"
            style={{ fontSize: "clamp(0.65rem, 1.8vw, 0.85rem)" }}
          >
            <span className="text-[var(--color-accent-dim)]">{"//"}</span> deployed
          </span>
        </h2>

        <div
          className={`grid grid-cols-1 gap-5 sm:gap-8 ${
            hasMultipleProjects ? "md:grid-cols-2 3xl:grid-cols-3" : ""
          }`}
        >
          {projects.map((p, i) => (
            <ProjectCard
              key={p.path}
              project={p}
              delay={i * 120}
              onOpenVideo={(selectedProject) => setActiveMediaProject(selectedProject)}
            />
          ))}
        </div>
      </div>

      <Dialog
        open={Boolean(activeMediaProject?.video || activeMediaProject?.image)}
        onOpenChange={(open) => !open && setActiveMediaProject(null)}
      >
        <DialogOverlay
          className="z-[90]"
          style={{ background: "rgba(2,2,2,0.82)" }}
        />
        <DialogContent
          hideClose
          className="z-[91] flex h-[min(92vh,980px)] w-[min(96vw,1400px)] max-w-none flex-col overflow-hidden rounded-sm border p-0"
          style={{
            borderColor: "color-mix(in oklab, var(--color-accent) 28%, transparent)",
            background: "linear-gradient(168deg, var(--color-bg-elevated) 0%, color-mix(in oklab, var(--color-bg-panel) 92%, var(--color-accent) 8%) 100%)",
            boxShadow: "0 0 0 1px color-mix(in oklab, var(--color-accent) 8%, transparent), 0 36px 100px -24px rgba(0,0,0,0.9)",
          }}
        >
          <DialogTitle className="sr-only">
            {activeMediaProject?.path ? `${activeMediaProject.path} media preview` : "Project media preview"}
          </DialogTitle>

          <div
            className="flex items-center gap-1.5 border-b px-4 py-2.5"
            style={{
              borderColor: "color-mix(in oklab, var(--color-accent) 8%, transparent)",
              background: "color-mix(in oklab, var(--color-accent) 2.5%, var(--color-bg-deep))",
            }}
          >
            <span className="inline-block h-2 w-2 rounded-full bg-[#ff5f57]" />
            <span className="inline-block h-2 w-2 rounded-full bg-[#febc2e]" />
            <span className="inline-block h-2 w-2 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-[10px] tracking-wide text-[var(--color-accent-dim)]">
              {activeMediaProject?.path ? `${activeMediaProject.path}/preview` : "/projects/preview"}
            </span>
            <button
              type="button"
              onClick={() => setActiveMediaProject(null)}
              className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] transition-colors duration-200 hover:text-[var(--color-accent)]"
            >
              close
            </button>
          </div>

          <div className="relative min-h-0 flex-1 bg-[#050505]">
            {activeMediaProject?.video && (
              <video
                key={`${activeMediaProject.video}-modal`}
                src={activeMediaProject.video}
                className="h-full w-full object-contain"
                controls
                playsInline
                preload="metadata"
                aria-label={`${activeMediaProject.path} full video`}
              />
            )}
            {activeMediaProject?.image && !activeMediaProject.video && (
              <Image
                src={activeMediaProject.image}
                alt={`${activeMediaProject.path} full preview`}
                fill
                sizes="96vw"
                className="object-contain"
                priority
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
