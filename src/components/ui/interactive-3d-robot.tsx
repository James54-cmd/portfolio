"use client";

import { cn } from "@/lib/utils";
import { Suspense, lazy } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

export interface InteractiveRobotSplineProps {
  /** Spline scene URL (`.splinecode` from Spline → Export → Web). */
  scene: string;
  className?: string;
}

function SplineFallback({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full w-full min-h-[240px] items-center justify-center bg-transparent font-mono text-xs text-[var(--color-text-muted)]",
        className,
      )}
    >
      <svg
        className="mr-3 h-5 w-5 shrink-0 animate-spin text-[var(--color-accent)]"
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
      <span className="tracking-wide">&gt; loading_scene…</span>
    </div>
  );
}

export function InteractiveRobotSpline({ scene, className }: InteractiveRobotSplineProps) {
  return (
    <div className={cn("relative h-full w-full min-h-[inherit]", className)}>
      <Suspense fallback={<SplineFallback className="h-full w-full min-h-[240px]" />}>
        <Spline scene={scene} className="h-full w-full min-h-[inherit]" />
      </Suspense>
    </div>
  );
}

export default InteractiveRobotSpline;
