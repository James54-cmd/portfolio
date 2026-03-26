"use client";

import { Download, FileText, ExternalLink } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CV_FILE = "/cv.pdf";

export function FloatingCv() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group fixed right-3 bottom-3 z-[70] inline-flex cursor-pointer items-center gap-2 border border-[var(--color-accent)] bg-[linear-gradient(140deg,color-mix(in_oklab,var(--color-bg-deep)_90%,transparent),color-mix(in_oklab,var(--color-accent)_14%,transparent))] px-3 py-2.5 font-mono text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--color-accent)] shadow-[0_16px_45px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-[var(--color-accent)] hover:shadow-[0_18px_50px_rgba(11,255,167,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] sm:right-4 sm:bottom-4 sm:gap-3 sm:px-5 sm:py-3.5 sm:text-[13px]"
        >
          <span className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="block h-full w-full bg-[radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--color-accent)_22%,transparent),transparent_55%)]" />
          </span>
          <FileText className="h-4 w-4 transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110 sm:h-[18px] sm:w-[18px]" />
          <span>View CV</span>
          <span className="animate-pulse font-bold text-[var(--color-text-muted)] transition-colors duration-300 group-hover:text-[var(--color-accent)]">
            _
          </span>
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Curriculum Vitae</DialogTitle>
          <DialogDescription>Preview and download the latest CV.</DialogDescription>
        </DialogHeader>

        <div className="h-[50vh] w-full overflow-hidden border border-white/[0.08] sm:h-[65vh]">
          <object data={CV_FILE} type="application/pdf" className="h-full w-full bg-white">
            <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
              <p className="font-mono text-xs text-[var(--color-text-muted)]">
                PDF preview is not supported in this browser.
              </p>
              <a
                href={CV_FILE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[var(--color-border-accent)] px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)] transition-colors hover:bg-[color-mix(in_oklab,var(--color-accent)_12%,transparent)]"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Open CV
              </a>
            </div>
          </object>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
          <a
            href={CV_FILE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-[var(--color-border-subtle)] px-4 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] sm:py-2"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Open in new tab
          </a>
          <a
            href={CV_FILE}
            download
            className="inline-flex items-center justify-center gap-2 border border-[var(--color-border-accent)] bg-[var(--color-accent)] px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-bg-deep)] transition-colors hover:bg-[var(--color-accent-dim)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] sm:py-2"
          >
            <Download className="h-3.5 w-3.5" />
            Download CV
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
