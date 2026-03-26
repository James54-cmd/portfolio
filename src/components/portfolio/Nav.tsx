"use client";

const links = ["hero", "skills", "projects", "timeline", "contact"] as const;

export function Nav() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b border-white/[0.06] bg-[color-mix(in_oklab,var(--color-bg-deep)_88%,transparent)] px-6 py-4 backdrop-blur-md"
      aria-label="Primary"
    >
      <a
        href="#hero"
        className="font-mono text-sm font-bold text-[var(--color-accent)] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
        onClick={(e) => {
          e.preventDefault();
          scrollTo("hero");
        }}
      >
        &lt;JFD /&gt;
      </a>
      <ul className="flex gap-[clamp(12px,3vw,32px)]">
        {links.map((l) => (
          <li key={l}>
            <button
              type="button"
              onClick={() => scrollTo(l)}
              className="cursor-pointer border-none bg-transparent font-mono text-xs uppercase tracking-widest text-[var(--color-text-muted)] transition-colors duration-200 hover:text-[var(--color-accent)] focus-visible:rounded-sm focus-visible:text-[var(--color-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              {l}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
