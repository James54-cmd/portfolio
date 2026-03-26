"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const social = [
  { id: "github", href: "#" },
  { id: "linkedin", href: "#" },
  { id: "twitter", href: "#" },
] as const;

export function Contact() {
  const [ref, visible] = useReveal();
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!fields.name || !fields.email || !fields.message) return;
    setSent(true);
  };

  const inputClass =
    "w-full border-0 border-b border-[var(--color-border-subtle)] bg-transparent py-2 font-mono text-[13px] text-[var(--color-accent)] outline-none transition-[border-color] duration-200 focus:border-[var(--color-accent)]";

  return (
    <section id="contact" className="px-8 pt-24 pb-32">
      <div className="mx-auto max-w-[640px]">
        <p className="mb-2 font-mono text-xs text-[var(--color-text-dim)]">{"// section_05"}</p>
        <h2
          ref={ref}
          className="mb-12 font-[family-name:var(--font-display)] text-[clamp(2rem,6vw,4rem)] font-black text-[var(--color-text-primary)] transition-all duration-[600ms]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateX(-20px)",
          }}
        >
          LET&apos;S <span className="text-[var(--color-accent)]">BUILD.</span>
        </h2>

        {sent ? (
          <div className="border border-[var(--color-border-accent)] bg-[color-mix(in_oklab,var(--color-accent)_6%,transparent)] p-8 font-mono text-sm text-[var(--color-accent)]">
            <p>&gt; Message received. Transmission successful.</p>
            <p className="mt-2 text-[var(--color-text-muted)]"># I&apos;ll get back to you within 24hrs.</p>
          </div>
        ) : (
          <div className="font-mono text-[13px]">
            {(
              [
                { label: "name", key: "name" as const, type: "text" },
                { label: "email", key: "email" as const, type: "email" },
              ] as const
            ).map((f) => (
              <div key={f.key} className="mb-6">
                <div className="mb-1 text-[var(--color-text-muted)]">
                  <span className="text-[var(--color-accent)]">&gt;</span> {f.label}:
                </div>
                <input
                  type={f.type}
                  autoComplete={f.key === "email" ? "email" : "name"}
                  value={fields[f.key]}
                  onChange={(e) => setFields((p) => ({ ...p, [f.key]: e.target.value }))}
                  className={inputClass}
                />
              </div>
            ))}
            <div className="mb-8">
              <div className="mb-1 text-[var(--color-text-muted)]">
                <span className="text-[var(--color-accent)]">&gt;</span> message:
              </div>
              <textarea
                rows={4}
                value={fields.message}
                onChange={(e) => setFields((p) => ({ ...p, message: e.target.value }))}
                className={`${inputClass} resize-none`}
              />
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="cursor-pointer border-none bg-[var(--color-accent)] px-9 py-3.5 font-mono text-[13px] font-bold uppercase tracking-[0.15em] text-[var(--color-bg-deep)] transition-colors hover:bg-[var(--color-accent-dim)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              $ send_message
            </button>
          </div>
        )}

        <div className="mt-12 flex flex-wrap gap-6">
          {social.map((s) => (
            <a
              key={s.id}
              href={s.href}
              className="font-mono text-xs tracking-widest text-[var(--color-text-muted)] no-underline transition-colors hover:text-[var(--color-accent)] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              [{s.id}]
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
