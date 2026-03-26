"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Cursor } from "./Cursor";
import { GlitchText } from "./GlitchText";

const WHOBEE_SCENE = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

const InteractiveRobotSpline = dynamic(
  () =>
    import("@/components/ui/interactive-3d-robot").then((mod) => ({
      default: mod.InteractiveRobotSpline,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[240px] w-full flex-col items-center justify-center gap-3 bg-[color-mix(in_oklab,var(--color-bg-panel)_40%,transparent)] font-mono text-xs text-[var(--color-text-muted)]">
        <svg
          className="h-6 w-6 animate-spin text-[var(--color-accent)]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"
          />
        </svg>
        <span className="tracking-wide">&gt; initializing_3d_scene…</span>
      </div>
    ),
  },
);

export function Hero() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-4 pt-20 pb-12 sm:px-6 sm:pt-28 sm:pb-16 md:px-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,color-mix(in_oklab,var(--color-accent)_12%,transparent),transparent_55%)]"
      />
      <div className="relative mx-auto grid w-full max-w-[1280px] gap-8 sm:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(300px,46%)] lg:items-center lg:gap-8 xl:gap-14">
        <div className="min-w-0">
          <p className="mb-4 font-mono text-[13px] tracking-[0.2em] text-[var(--color-accent)] [text-shadow:0_0_20px_rgba(0,0,0,0.6)]">
            &gt; HELLO, WORLD.
          </p>
          <h1 className="mb-4 font-[family-name:var(--font-display)] text-[clamp(2.25rem,8vw,5rem)] leading-[1.05] font-black tracking-[-0.02em] text-[var(--color-text-primary)] [text-shadow:0_2px_28px_rgba(0,0,0,0.65)]">
            <GlitchText text="JAMES" />{" "}
            <span className="text-[var(--color-accent)]">FANUEL DAMASO</span>
          </h1>
          <div className="mb-8 font-mono text-[clamp(14px,2.5vw,20px)] text-[#c8c8c8] [text-shadow:0_1px_12px_rgba(0,0,0,0.75)]">
            <span className="text-[var(--color-text-dim)]">role: </span>
            <span className="text-[var(--color-text-primary)]">Fullstack Developer</span>
            <Cursor />
          </div>
          <p className="mb-10 max-w-[560px] border-l-2 border-[color-mix(in_oklab,var(--color-accent)_35%,transparent)] bg-[color-mix(in_oklab,var(--color-bg-deep)_40%,transparent)] pl-4 font-mono text-[clamp(12px,1.8vw,15px)] leading-[1.85] text-[var(--color-text-primary)] backdrop-blur-[2px]">
            {"// I build things for the web. From pixel-perfect UIs to scalable backends."}
            <br />
            {"// Clean code. Bold ideas. Ship fast."}
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="cursor-pointer border-none bg-[var(--color-accent)] px-5 py-3 font-mono text-[12px] font-bold uppercase tracking-[0.15em] text-[var(--color-bg-deep)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[var(--color-accent-dim)] hover:shadow-[4px_4px_0_color-mix(in_oklab,var(--color-accent)_28%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] sm:px-8 sm:py-3.5 sm:text-[13px]"
            >
              ./view_projects
            </button>
            <button
              type="button"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="cursor-pointer border border-[color-mix(in_oklab,var(--color-accent)_35%,transparent)] bg-[color-mix(in_oklab,var(--color-bg-deep)_55%,transparent)] px-5 py-3 font-mono text-[12px] font-bold uppercase tracking-[0.15em] text-[var(--color-accent)] backdrop-blur-sm transition-all duration-200 hover:border-[var(--color-accent)] hover:bg-[color-mix(in_oklab,var(--color-accent)_10%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] sm:px-8 sm:py-3.5 sm:text-[13px]"
            >
              ./contact_me
            </button>
          </div>
        </div>

        {/* Robot: viewport + bottom chrome (Spline badge reads as part of the bar) */}
        <div className="relative hidden w-full justify-center lg:flex lg:min-h-[min(72vh,640px)] lg:justify-end">
          <div className="flex h-[min(70vh,620px)] w-full flex-col overflow-hidden rounded-xl bg-[color-mix(in_oklab,var(--color-bg-panel)_40%,transparent)] shadow-[0_28px_80px_rgba(0,0,0,0.55),0_0_48px_color-mix(in_oklab,var(--color-accent)_8%,transparent)] backdrop-blur-[2px]">
            {reduceMotion ? (
              <div className="flex min-h-[280px] flex-1 flex-col items-center justify-center gap-2 px-4 text-center font-mono text-xs text-[var(--color-text-muted)]">
                <span className="text-[var(--color-accent)]">&gt;</span>
                <span>3D preview disabled for reduced motion.</span>
              </div>
            ) : (
              <>
                {/* Clip bottom of viewport: shift scene down + slight zoom so the robot sits lower and Spline watermark is clipped */}
                <div className="hero-spline-root relative min-h-0 flex-1 overflow-hidden">
                  <div className="pointer-events-auto absolute inset-0 overflow-hidden">
                    <div className="hero-spline-shift-inner">
                      <InteractiveRobotSpline
                        scene={WHOBEE_SCENE}
                        className="absolute inset-0 z-0 h-full w-full [&_canvas]:!h-full [&_canvas]:!w-full"
                      />
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-20 bg-gradient-to-r from-[var(--color-bg-deep)] to-transparent" aria-hidden />
                  <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-12 bg-gradient-to-l from-[var(--color-bg-deep)] to-transparent" aria-hidden />
                  <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-16 bg-gradient-to-b from-[var(--color-bg-deep)] to-transparent" aria-hidden />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-20 bg-gradient-to-t from-[var(--color-bg-deep)] via-[var(--color-bg-deep)]/70 to-transparent" aria-hidden />
                </div>
                <div className="relative z-10 flex min-h-[2.75rem] shrink-0 items-center border-t border-[color-mix(in_oklab,var(--color-accent)_18%,transparent)] bg-[var(--color-bg-deep)] px-3 py-2">
                  <p className="font-mono text-[10px] leading-tight tracking-wide text-[var(--color-text-dim)]">
                    <span className="text-[var(--color-accent)]">&gt;</span> spline_view · drag to orbit
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
