"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { Phone } from "lucide-react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";

const social = [
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/james-fanuel-n-damaso-0b71a1359/",
    icon: FaLinkedin,
  },
  {
    id: "github",
    href: "https://github.com/James54-cmd",
    icon: FaGithub,
  },
  {
    id: "facebook",
    href: "https://www.facebook.com/Damasolman/",
    icon: FaFacebook,
  },
] as const;

export function Contact() {
  const [ref, visible] = useReveal();
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!fields.name || !fields.email || !fields.message) return;
    setError(null);
    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Failed to send message.");
        return;
      }

      setSent(true);
      setFields({ name: "", email: "", message: "" });
    } catch {
      setError("Failed to send message.");
    } finally {
      setSending(false);
    }
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
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-4 cursor-pointer border border-[var(--color-border-accent)] bg-transparent px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-accent)] transition-colors hover:bg-[color-mix(in_oklab,var(--color-accent)_14%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              $ send_another
            </button>
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
              disabled={sending}
              className="cursor-pointer border-none bg-[var(--color-accent)] px-9 py-3.5 font-mono text-[13px] font-bold uppercase tracking-[0.15em] text-[var(--color-bg-deep)] transition-colors hover:bg-[var(--color-accent-dim)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              {sending ? "$ sending..." : "$ send_message"}
            </button>
            {error && (
              <p className="mt-3 font-mono text-xs text-[#ff7b72]">
                &gt; {error}
              </p>
            )}
          </div>
        )}

        <div className="mt-12 flex flex-wrap items-center gap-6">
          <a
            href="tel:+639626377843"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[var(--color-text-muted)] no-underline transition-colors hover:text-[var(--color-accent)] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>+63 962 637 7843</span>
          </a>
          {social.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[var(--color-text-muted)] no-underline transition-colors hover:text-[var(--color-accent)] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              <s.icon className="h-3.5 w-3.5" />
              <span>[{s.id}]</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
