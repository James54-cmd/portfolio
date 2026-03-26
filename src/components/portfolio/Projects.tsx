"use client";

import { projects } from "@/data/portfolio";
import { useReveal } from "@/hooks/useReveal";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const IMAGE_LABELS = ["Login", "Home", "Chat", "Bible", "Favorites", "Verses"];

function useAutoSlide(length: number, interval = 4200) {
  const [index, setIndex] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    if (length <= 1) return;
    const id = setInterval(() => {
      if (!paused.current) setIndex((i) => (i + 1) % length);
    }, interval);
    return () => clearInterval(id);
  }, [length, interval]);

  const pause = useCallback(() => { paused.current = true; }, []);
  const resume = useCallback(() => { paused.current = false; }, []);
  const go = useCallback((i: number) => { setIndex(i); paused.current = true; }, []);

  return { index, pause, resume, go } as const;
}

function ProjectCard({ project, delay }: { project: (typeof projects)[number]; delay: number }) {
  const [ref, visible] = useReveal(0.08);
  const images = useMemo(() => project.images ?? [], [project.images]);
  const { index: activeImage, pause, resume, go } = useAutoSlide(images.length);
  const [hovered, setHovered] = useState(false);

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
      onMouseEnter={() => { setHovered(true); pause(); }}
      onMouseLeave={() => { setHovered(false); resume(); }}
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
            {images.length > 0 && `${activeImage + 1}/${images.length}`}
          </span>
        </div>

        {/* Screenshot gallery */}
        {images.length > 0 && (
          <div className="relative">
            {/* Main image with crossfade */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#060606]">
              {images.map((src, idx) => (
                <Image
                  key={src}
                  src={src}
                  alt={`${IMAGE_LABELS[idx] ?? `Screen ${idx + 1}`} — ${project.path.split("/").pop()}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top transition-[opacity,transform] duration-700 ease-out"
                  style={{
                    opacity: idx === activeImage ? 1 : 0,
                    transform: idx === activeImage ? "scale(1)" : "scale(1.04)",
                    zIndex: idx === activeImage ? 2 : 1,
                    position: "absolute",
                    inset: 0,
                  }}
                  loading={idx === 0 ? "eager" : "lazy"}
                  priority={idx === 0}
                />
              ))}

              {/* Gradient vignette over image */}
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

            {/* Thumbnail rail */}
            {images.length > 1 && (
              <div
                className="flex items-center gap-1 border-t px-3 py-2"
                style={{
                  borderColor: "color-mix(in oklab, var(--color-accent) 6%, transparent)",
                  background: "color-mix(in oklab, var(--color-bg-deep) 95%, var(--color-accent) 5%)",
                }}
              >
                {images.map((src, idx) => {
                  const isActive = idx === activeImage;
                  return (
                    <button
                      key={src}
                      type="button"
                      onClick={() => go(idx)}
                      className="group/thumb relative shrink-0 overflow-hidden transition-all duration-300"
                      style={{
                        width: isActive ? "3.8rem" : "2.8rem",
                        height: "2rem",
                        borderRadius: "2px",
                        outline: isActive
                          ? "1.5px solid color-mix(in oklab, var(--color-accent) 55%, transparent)"
                          : "1px solid color-mix(in oklab, var(--color-accent) 12%, transparent)",
                        outlineOffset: "1px",
                      }}
                      aria-label={`View ${IMAGE_LABELS[idx] ?? `screenshot ${idx + 1}`}`}
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover object-top transition-[opacity,filter] duration-300"
                        style={{
                          opacity: isActive ? 1 : 0.5,
                          filter: isActive ? "none" : "grayscale(0.6) brightness(0.7)",
                        }}
                      />
                      {isActive && (
                        <span
                          className="absolute inset-x-0 bottom-0 h-0.5"
                          style={{ background: "var(--color-accent)", opacity: 0.8 }}
                          aria-hidden
                        />
                      )}
                    </button>
                  );
                })}

                {/* progress dots (mobile fallback) */}
                <div className="ml-auto flex items-center gap-1 sm:hidden" aria-hidden>
                  {images.map((_, idx) => (
                    <span
                      key={idx}
                      className="block h-1 rounded-full transition-all duration-300"
                      style={{
                        width: idx === activeImage ? "1rem" : "0.25rem",
                        background: idx === activeImage ? "var(--color-accent)" : "var(--color-text-dim)",
                        opacity: idx === activeImage ? 1 : 0.5,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

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
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] no-underline transition-colors duration-200 hover:text-[var(--color-accent)] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              <span className="inline-block h-px w-3 bg-current transition-[width] duration-200 group-hover/link:w-5" />
              live demo
            </a>
            <span className="ml-auto font-mono text-[9px] text-[var(--color-text-dim)] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
              {project.path.split("/").pop()}
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
            <ProjectCard key={p.path} project={p} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
