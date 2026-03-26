"use client";

const links = ["hero", "skills", "projects", "timeline", "contact"] as const;

export function Nav() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between border-b border-white/[0.06] bg-[color-mix(in_oklab,var(--color-bg-deep)_88%,transparent)] px-3 py-3 backdrop-blur-md sm:px-6 sm:py-4"
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
              className="cursor-pointer border-none bg-transparent font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] transition-colors duration-200 hover:text-[var(--color-accent)] focus-visible:rounded-sm focus-visible:text-[var(--color-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] sm:text-xs"
            >
              {l}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
