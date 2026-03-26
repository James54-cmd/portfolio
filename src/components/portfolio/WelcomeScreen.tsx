"use client";

import { useState } from "react";
import { DotGrid } from "./DotGrid";
import { Grain } from "./Grain";
import { Scanlines } from "./Scanlines";
import { Typewriter } from "./Typewriter";

const bootLines = [
  "> BIOS v2.4.1 :: Initializing system...",
  "> Mounting filesystem... [OK]",
  "> Loading kernel modules... [OK]",
  "> Checking dependencies... [OK]",
  "> Compiling portfolio assets... [OK]",
  "> Establishing secure connection... [OK]",
  "> All systems nominal.",
  "> Welcome, visitor. Identity verified.",
  "> Portfolio ready to deploy.",
];

export function WelcomeScreen({ onEnter }: { onEnter: () => void }) {
  const [done, setDone] = useState(false);
  const [exiting, setExiting] = useState(false);

  const handleEnter = () => {
    setExiting(true);
    window.setTimeout(() => onEnter(), 650);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--color-bg-deep)] p-8 transition-[opacity,transform] duration-500 ease-out ${exiting ? "pointer-events-none scale-[0.985] opacity-0" : "opacity-100"}`}
    >
      <DotGrid />
      <Scanlines />
      <Grain />
      <div className="relative z-[6] w-full max-w-[640px] rounded border border-[var(--color-border-accent)] bg-[var(--color-bg-panel)] p-8 shadow-[0_0_80px_color-mix(in_oklab,var(--color-accent)_8%,transparent),inset_0_0_48px_rgba(0,0,0,0.45)]">
        <div className="mb-5 flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="inline-block h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="inline-block h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-xs text-[var(--color-text-dim)]">~/portfolio — boot.sh</span>
        </div>
        <Typewriter lines={bootLines} onDone={() => setDone(true)} />
        {done && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={handleEnter}
              className="cursor-pointer border border-[var(--color-accent)] bg-transparent px-9 py-3 font-mono text-sm uppercase tracking-[0.2em] text-[var(--color-accent)] transition-all duration-200 hover:bg-[color-mix(in_oklab,var(--color-accent)_14%,transparent)] hover:shadow-[0_0_24px_color-mix(in_oklab,var(--color-accent)_28%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              [ ENTER PORTFOLIO ]
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
