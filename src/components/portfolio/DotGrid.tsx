"use client";

export function DotGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.55]"
      style={{
        backgroundImage: "radial-gradient(circle, #1f1f1f 1px, transparent 1px)",
        backgroundSize: "36px 36px",
      }}
    />
  );
}
