import { useState } from "react";
import resumeImage from "@/assets/christopher-zarraga-resume.png";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";

export function Contact() {
  const [showResume, setShowResume] = useState(false);

  return (
    <footer
      id="contact"
      className="portfolio-section snap-start scroll-mt-[120px] -mx-5 border-t border-border bg-ink-soft/40 px-5 py-14 sm:-mx-8 sm:px-8 lg:py-20"
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
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
            Internships, side projects, or a question about anything above — my
            inbox is genuinely open.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="mailto:christopherzarraga31@gmail.com"
              className="rounded-full border border-border bg-foreground px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-background transition-colors duration-200 hover:bg-muted-foreground"
            >
              christopherzarraga31@gmail.com
            </a>
            <Button
              type="button"
              onClick={() => setShowResume((v) => !v)}
              aria-expanded={showResume}
              aria-controls="inline-resume"
              variant="outline"
              className="h-auto rounded-full border-border bg-transparent px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-foreground shadow-none transition-colors duration-200 hover:border-foreground hover:bg-foreground/10 hover:text-foreground"
            >
              {showResume ? "Hide resume" : "View resume"}
            </Button>
            <a
              href="https://github.com/Kurisuo"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-foreground transition-colors duration-200 hover:border-foreground hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/christopher-zarraga/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-foreground transition-colors duration-200 hover:border-foreground hover:text-foreground"
            >
              LinkedIn
            </a>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>Christopher Zarraga Jimenez</span>
          <span>Santa Cruz, CA</span>
        </div>
      </div>

      {showResume && (
        <div
          id="inline-resume"
          className="mt-10 flex flex-col overflow-hidden rounded-lg border border-border bg-ink-soft"
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              Christopher Zarraga — Resume
            </span>
            <Button
              type="button"
              onClick={() => setShowResume(false)}
              aria-label="Close resume"
              variant="outline"
              size="sm"
              className="rounded-full border-border bg-transparent font-mono text-[11px] uppercase tracking-[0.15em] text-foreground shadow-none hover:border-foreground hover:bg-foreground/10 hover:text-foreground"
            >
              Close
            </Button>
          </div>
          <img
            src={resumeImage}
            alt="Christopher Zarraga Jimenez resume"
            className="block h-auto w-full bg-background object-contain"
          />
        </div>
      )}
    </footer>
  );
}
