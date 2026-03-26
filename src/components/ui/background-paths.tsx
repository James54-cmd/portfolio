"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${
      312 - i * 5 * position
    } ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg
        className="h-full w-full text-[color-mix(in_oklab,var(--color-accent)_22%,transparent)]"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.08 + path.id * 0.025}
            initial={{ pathLength: 0.35, opacity: 0.45 }}
            animate={{
              pathLength: 1,
              opacity: [0.25, 0.5, 0.25],
            }}
            transition={{
              pathLength: { duration: 14 + (path.id % 7), repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              opacity: { duration: 18 + (path.id % 5), repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
          />
        ))}
      </svg>
    </div>
  );
}

/** Animated path lines only — layer behind content with `absolute inset-0` or your own `className`. */
export function BackgroundPaths({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  );
}
