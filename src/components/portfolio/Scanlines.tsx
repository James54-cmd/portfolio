"use client";

export function Scanlines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{
        background: `repeating-linear-gradient(
          to bottom,
          transparent 0px,
          transparent 3px,
          rgba(0,0,0,0.07) 3px,
          rgba(0,0,0,0.07) 4px
        )`,
      }}
    />
  );
}
