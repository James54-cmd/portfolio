"use client";

import { useEffect, useRef, useState } from "react";
import { Cursor } from "./Cursor";

export function Typewriter({ lines, onDone }: { lines: string[]; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (lineIdx >= lines.length) {
      onDoneRef.current?.();
      return;
    }
    const line = lines[lineIdx];
    if (charIdx < line.length) {
      const t = window.setTimeout(() => {
        setDisplayed((prev) => {
          const copy = [...prev];
          copy[lineIdx] = (copy[lineIdx] ?? "") + line[charIdx];
          return copy;
        });
        setCharIdx((c) => c + 1);
      }, 26);
      return () => clearTimeout(t);
    }
    const t = window.setTimeout(() => {
      setLineIdx((l) => l + 1);
      setCharIdx(0);
    }, 200);
    return () => clearTimeout(t);
  }, [lineIdx, charIdx, lines]);

  return (
    <div className="font-mono text-[clamp(12px,1.8vw,15px)] leading-[1.85] text-[var(--color-accent)]">
      {displayed.map((l, i) => (
        <div key={i}>
          <span className="text-[var(--color-text-dim)]">{String(i + 1).padStart(2, "0")} </span>
          <span className={lineIdx > i ? "text-[var(--color-accent-bright)]" : "text-[var(--color-accent)]"}>
            {l}
          </span>
          {i === lineIdx && <Cursor />}
        </div>
      ))}
    </div>
  );
}
