"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

const GLITCH_CHARS = "█▓▒░▄▀■□▪▫◘◙╔╗╚╝═║╬│┤╣╝┐└┴┬├─┼█▄▌▐▀αβγδ";

function GlitchText({ text, intensity = 1 }: { text: string; intensity?: number }) {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const corrupt = () => {
      const arr = text.split("");
      for (let i = 0; i < arr.length; i++) {
        if (Math.random() < 0.04 * intensity) {
          arr[i] = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        }
      }
      setDisplay(arr.join(""));
      timeoutId = setTimeout(corrupt, 50 + Math.random() * 100);
    };
    timeoutId = setTimeout(corrupt, Math.random() * 200);
    return () => clearTimeout(timeoutId);
  }, [text, intensity]);
  return <>{display}</>;
}

function StaticNoise({ opacity = 0.25, className = "" }: { opacity?: number; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      try {
        const img = ctx.createImageData(w, h);
        const data = img.data;
        for (let i = 0; i < data.length; i += 4) {
          if (Math.random() > 0.55) {
            const v = Math.floor(Math.random() * 255);
            data[i] = v;
            data[i + 1] = v;
            data[i + 2] = v;
            data[i + 3] = 220;
          }
        }
        ctx.putImageData(img, 0, 0);
      } catch (_) { return; }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={240}
      height={160}
      className={`pointer-events-none mix-blend-screen ${className}`}
      style={{ imageRendering: "pixelated", opacity }}
      aria-hidden
    />
  );
}

/** Full-screen static that covers the entire viewport behind the error panel */
function FullscreenStatic() {
  return (
    <StaticNoise
      opacity={0.55}
      className="fixed inset-0 z-[5] h-full w-full"
    />
  );
}

function HorizontalTears() {
  const [tears, setTears] = useState([
    { top: 20, height: 3, offset: 12, opacity: 0.5 },
    { top: 55, height: 2, offset: -8, opacity: 0.4 },
    { top: 80, height: 5, offset: 20, opacity: 0.6 },
  ]);
  useEffect(() => {
    const id = setInterval(() => {
      const count = 2 + Math.floor(Math.random() * 3);
      setTears(Array.from({ length: count }, () => ({
        top: Math.random() * 100,
        height: 1 + Math.random() * 7,
        offset: (Math.random() - 0.5) * 36,
        opacity: 0.3 + Math.random() * 0.5,
      })));
    }, 150);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {tears.map((t, i) => (
        <div key={i} className="absolute left-0 right-0 bg-white" style={{
          top: `${t.top}%`, height: `${t.height}px`,
          transform: `translateX(${t.offset}px)`, opacity: t.opacity, mixBlendMode: "screen",
        }} />
      ))}
    </div>
  );
}

function RgbShift({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative select-none">
      <div className="pointer-events-none absolute inset-0 text-[#ff0040] opacity-70"
        style={{ transform: "translate(-3px,0)", filter: "blur(0.5px)" }} aria-hidden>{children}</div>
      <div className="pointer-events-none absolute inset-0 text-[#00ffff] opacity-70"
        style={{ transform: "translate(3px,0)", filter: "blur(0.5px)" }} aria-hidden>{children}</div>
      <div className="relative">{children}</div>
    </div>
  );
}

const LOG_LINES = [
  "> session_terminate --requested",
  "> flushing tty buffers......... [OK]",
  "> evicting stack frame #7F3A  [EXPECTED]",
  "> ACPI: S5 stub  (not a real poweroff)",
  "> handoff → main_portfolio.exe",
];

const BOTTOM_NOISE = Array.from({ length: 110 }, () =>
  GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
).join("");

function ErrorBlock() {
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 450);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative overflow-hidden font-mono" style={{
      background: "repeating-linear-gradient(0deg, rgba(255,0,64,0.025) 0px, rgba(255,0,64,0.025) 1px, transparent 1px, transparent 4px)",
    }}>
      <StaticNoise opacity={0.35} className="absolute inset-0 h-full w-full" />
      <HorizontalTears />
      <div className="pointer-events-none absolute inset-0" aria-hidden style={{
        background: "linear-gradient(180deg, transparent 0%, rgba(255,0,64,0.07) 50%, transparent 100%)",
        animation: "errSweep 1.8s linear infinite",
      }} />
      <div className="relative z-10 p-8 pb-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#ff0040]"
            style={{ opacity: blink ? 1 : 0.25, transition: "opacity 0.1s" }}>
            ● SYSTEM FAULT
          </span>
          <span className="font-mono text-[9px] text-white/20">
            <GlitchText text="0xDEAD_BEEF" intensity={0.5} />
          </span>
        </div>
        <RgbShift>
          <p className="font-black text-white leading-none"
            style={{ fontSize: "clamp(5rem,20vw,9rem)", letterSpacing: "-0.05em", textShadow: "0 0 40px rgba(255,0,64,0.5)" }}>
            <GlitchText text="404" intensity={1.5} />
          </p>
        </RgbShift>
        <p className="mt-1 mb-6 font-mono text-xs uppercase tracking-[0.3em] text-white/30">
          <GlitchText text="NOT_FOUND :: BOOT_SHELL_TEARDOWN" intensity={0.3} />
        </p>
        <div className="mb-5 h-px w-full" style={{ background: "linear-gradient(90deg, #ff004066, #ff0040cc, transparent)" }} />
        <div className="space-y-1.5 border-l border-[#ff004033] pl-4">
          {LOG_LINES.map((line, i) => (
            <p key={i} className="font-mono text-[11px] text-white/40">
              <GlitchText text={line} intensity={0.15} />
            </p>
          ))}
        </div>
        <div className="mt-5 overflow-hidden font-mono text-[8px] leading-tight text-white/10 break-all" aria-hidden>
          <GlitchText text={BOTTOM_NOISE} intensity={2} />
        </div>
      </div>
    </div>
  );
}

// ── TV OFF: collapses to a bright horizontal line then vanishes ──────────────
function TvOff({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState<"collapse" | "line" | "gone">("collapse");

  useEffect(() => {
    // collapse → show just the line
    const t1 = setTimeout(() => setStage("line"), 180);
    // line → gone
    const t2 = setTimeout(() => setStage("gone"), 420);
    // fire callback after fully gone
    const t3 = setTimeout(() => onDone(), 500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[110] flex items-center justify-center"
      style={{
        background: "#000",
        opacity: stage === "gone" ? 0 : 1,
        transition: stage === "gone" ? "opacity 0.12s ease-in" : "none",
      }}
    >
      {/* the bright white shrink line */}
      <div
        style={{
          width: "100%",
          height: stage === "collapse" ? "100vh" : stage === "line" ? "3px" : "3px",
          background: stage === "line"
            ? "radial-gradient(ellipse 60% 100% at 50% 50%, #ffffff, #aaffee 30%, transparent)"
            : "#000",
          transition: stage === "line"
            ? "height 0.18s cubic-bezier(0.4,0,1,1), background 0.05s"
            : "height 0.18s cubic-bezier(0.4,0,1,1)",
          boxShadow: stage === "line" ? "0 0 40px 8px #ffffff88, 0 0 80px 20px #00ffcc33" : "none",
        }}
      />
    </div>
  );
}

// ── 200 OK typed then fade ────────────────────────────────────────────────────
const OK_FULL = "200 OK";
const OK_SUB  = "handoff successful";

function OkFlash({ onDone }: { onDone: () => void }) {
  const [typed, setTyped]       = useState("");
  const [subTyped, setSubTyped] = useState("");
  const [cursor, setCursor]     = useState(true);
  const [fadeOut, setFadeOut]   = useState(false);

  // type headline char by char — 130 ms per char
  useEffect(() => {
    let i = 0;
    const tick = () => {
      i++;
      setTyped(OK_FULL.slice(0, i));
      if (i < OK_FULL.length) setTimeout(tick, 130);
    };
    const t = setTimeout(tick, 300);
    return () => clearTimeout(t);
  }, []);

  // once headline done, type subtitle — 48 ms per char
  useEffect(() => {
    if (typed !== OK_FULL) return;
    let j = 0;
    const tick = () => {
      j++;
      setSubTyped(OK_SUB.slice(0, j));
      if (j < OK_SUB.length) setTimeout(tick, 48);
    };
    const t = setTimeout(tick, 200);
    return () => clearTimeout(t);
  }, [typed]);

  // cursor blink
  useEffect(() => {
    const id = setInterval(() => setCursor((c) => !c), 530);
    return () => clearInterval(id);
  }, []);

  // hold 1 s after subtitle done, then fade and exit
  useEffect(() => {
    if (subTyped !== OK_SUB) return;
    const t1 = setTimeout(() => setFadeOut(true), 1000);
    const t2 = setTimeout(() => onDone(), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [subTyped, onDone]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[110] flex flex-col items-center justify-center"
      style={{
        background: "#000",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.5s ease-out",
      }}
    >
      <p
        className="font-mono font-black tracking-tighter text-[#00ff88]"
        style={{
          fontSize: "clamp(3rem,14vw,7rem)",
          textShadow: "0 0 60px #00ff8888, 0 0 120px #00ff4444",
          letterSpacing: "-0.03em",
          minWidth: "6ch",
        }}
      >
        {typed}
        {typed.length < OK_FULL.length && (
          <span style={{ opacity: cursor ? 1 : 0 }}>▋</span>
        )}
      </p>
      <p
        className="mt-3 font-mono text-[11px] tracking-[0.4em] text-[#00ff8866] uppercase"
        style={{ minHeight: "1.4em" }}
      >
        {subTyped}
        {subTyped.length > 0 && subTyped.length < OK_SUB.length && (
          <span style={{ opacity: cursor ? 1 : 0 }}>▋</span>
        )}
      </p>
    </div>
  );
}

type Phase = "welcome" | "error" | "tvoff" | "ok" | "done";

export function WelcomeScreen({ onEnter }: { onEnter: () => void }) {
  const [done, setDone] = useState(false);
  const [phase, setPhase] = useState<Phase>("welcome");
  const [fadeOut, setFadeOut] = useState(false);

  const finish = useCallback(() => onEnter(), [onEnter]);

  // welcome → error: user clicks button
  const handleEnter = () => setPhase("error");
  const handleSkip = () => setPhase("done");

  // error auto-advances after a beat
  useEffect(() => {
    if (phase !== "error") return;
    const t = setTimeout(() => setPhase("tvoff"), 1800);
    return () => clearTimeout(t);
  }, [phase]);

  // after tvoff fires onDone → okflash
  // after okflash fires onDone → fade out welcome screen → call finish
  useEffect(() => {
    if (phase !== "done") return;
    setFadeOut(true);
    const t = setTimeout(() => finish(), 600);
    return () => clearTimeout(t);
  }, [phase, finish]);

  return (
    <>
      <style>{`
        @keyframes errSweep {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>

      {/* main welcome/error panel */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--color-bg-deep)] p-8 transition-opacity duration-500 ease-out ${
          fadeOut ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        {phase !== "done" && (
          <button
            type="button"
            onClick={handleSkip}
            className="absolute top-5 right-5 z-[120] cursor-pointer border border-[var(--color-border-subtle)] bg-[color-mix(in_oklab,var(--color-bg-deep)_88%,transparent)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          >
            Skip
          </button>
        )}

        <DotGrid />
        <Scanlines />
        <Grain />

        {/* Full-screen TV static — only visible during error/shutdown */}
        {(phase === "error" || phase === "tvoff") && <FullscreenStatic />}

        {phase === "welcome" && (
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
        )}

        {(phase === "error" || phase === "tvoff") && (
          <div className="relative z-[6] w-full max-w-[600px] overflow-hidden border border-[#ff004033] bg-black shadow-[0_0_60px_rgba(255,0,64,0.2),inset_0_0_80px_rgba(0,0,0,0.8)]">
            <ErrorBlock />
          </div>
        )}
      </div>

      {/* TV-off overlay — renders on top of everything */}
      {phase === "tvoff" && (
        <TvOff onDone={() => setPhase("ok")} />
      )}

      {/* 200 OK flash */}
      {phase === "ok" && (
        <OkFlash onDone={() => setPhase("done")} />
      )}
    </>
  );
}