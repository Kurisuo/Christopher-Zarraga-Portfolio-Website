import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <footer
      id="contact"
      className="border-t border-border bg-ink-soft/40 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
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
              href="mailto:czarraga@ucsc.edu"
              className="rounded-full bg-flame px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-flame-foreground transition-colors hover:bg-volt hover:text-volt-foreground"
            >
              czarraga@ucsc.edu
            </a>
            <a
              href="/resume.pdf"
              className="rounded-full border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-foreground transition-colors hover:border-flame hover:text-flame"
            >
              Resume (PDF)
            </a>
            <a
              href="https://github.com"
              className="rounded-full border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-foreground transition-colors hover:border-flame hover:text-flame"
            >
              GitHub
            </a>
          </div>
        </Reveal>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-7 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>Christopher Zarraga Jimenez</span>
          <span>Santa Cruz, CA</span>
        </div>
      </div>
    </footer>
  );
}
