import { useState } from "react";
import { Reveal } from "./Reveal";
import resume from "@/assets/resume.pdf.asset.json";

export function Contact() {
  const [showResume, setShowResume] = useState(false);

  return (
    <footer
      id="contact"
      className="-mx-5 border-t border-border bg-ink-soft/40 px-5 py-20 sm:-mx-8 sm:px-8 lg:py-28"
    >
      <div>
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">
            04 — Say hello
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.25rem,7vw,5.5rem)] font-extrabold uppercase leading-[0.88] tracking-tight">
            Let&apos;s build
            <br />
            <span className="text-ghost">something</span>
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Internships, side projects, or a question about anything above — my
            inbox is genuinely open.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="mailto:christopherzarraga31@gmail.com"
              className="rounded-full bg-flame px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-flame-foreground transition-colors hover:bg-volt hover:text-volt-foreground"
            >
              christopherzarraga31@gmail.com
            </a>
            <button
              type="button"
              onClick={() => setShowResume(true)}
              className="rounded-full border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-foreground transition-colors hover:border-flame hover:text-flame"
            >
              Resume (PDF)
            </button>
            <a
              href="https://github.com/Kurisuo"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-foreground transition-colors hover:border-flame hover:text-flame"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/christopher-zarraga/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-foreground transition-colors hover:border-flame hover:text-flame"
            >
              LinkedIn
            </a>
          </div>
        </Reveal>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-7 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>Christopher Zarraga Jimenez</span>
          <span>Santa Cruz, CA</span>
        </div>
      </div>

      {showResume && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Resume"
          onClick={() => setShowResume(false)}
        >
          <div
            className="relative flex h-full max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-border bg-ink-soft shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                Christopher Zarraga — Resume
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={resume.url}
                  download
                  className="rounded-full border border-border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground transition-colors hover:border-flame hover:text-flame"
                >
                  Download
                </a>
                <button
                  type="button"
                  onClick={() => setShowResume(false)}
                  aria-label="Close resume"
                  className="rounded-full border border-border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground transition-colors hover:border-flame hover:text-flame"
                >
                  Close
                </button>
              </div>
            </div>
            <iframe
              src={resume.url}
              title="Christopher Zarraga Resume"
              className="h-full w-full flex-1"
            />
          </div>
        </div>
      )}
    </footer>
  );
}
