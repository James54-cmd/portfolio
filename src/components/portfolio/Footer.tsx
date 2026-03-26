"use client";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-[#0f0f0f] px-8 py-6">
      <span className="font-mono text-[11px] text-[#333]">
        &lt;JamesFanuelDamaso /&gt; © {year}
      </span>
      <span className="font-mono text-[11px] text-[#1f1f1f]">built with Next.js + ☕</span>
    </footer>
  );
}
