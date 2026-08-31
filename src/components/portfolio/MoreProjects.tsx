import { Reveal } from "./Reveal";

const projects = [
  {
    tag: "Web",
    name: "Shelf",
    blurb: "A local-first tracker for everything I'm reading.",
    detail:
      "Offline-first storage with a small sync engine, built to survive a laptop closing mid-thought.",
  },
  {
    tag: "CLI",
    name: "Replay",
    blurb: "Fuzzy search across my whole shell history.",
    detail:
      "Zero dependencies, written to stay fast on a decade of terminal commands.",
  },
  {
    tag: "Data",
    name: "Pulse",
    blurb: "A live heatmap of campus events at UCSC.",
    detail:
      "Scrapes and aggregates public RSVPs into a grid that shows where the night is actually happening.",
  },
  {
    tag: "ML",
    name: "Grain",
    blurb: "Small image models trained on my own photos.",
    detail:
      "An excuse to get comfortable with training loops, augmentation, and honest evaluation.",
  },
  {
    tag: "Tooling",
    name: "Scaffold",
    blurb: "My personal project generator.",
    detail:
      "Because the first twenty minutes of every project were the same twenty minutes.",
  },
  {
    tag: "Math",
    name: "Proofs",
    blurb: "Explorable write-ups of results I like.",
    detail:
      "Interactive diagrams for the theorems that took me the longest to actually feel.",
  },
];

export function MoreProjects() {
  return (
    <section id="work" className="py-20 lg:py-28">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">
          03 — Everything else
        </p>
        <h2 className="mt-4 font-display text-[clamp(2rem,6vw,4.5rem)] font-extrabold uppercase leading-[0.9] tracking-tight">
          The rest of
          <br />
          <span className="text-ghost">the build log</span>
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={60 * i}>
            <article className="group h-full rounded-3xl border border-border bg-ink-soft p-6 transition-colors hover:border-flame">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {p.tag}
              </span>
              <h3 className="mt-3 font-display text-3xl font-bold tracking-tight transition-colors group-hover:text-flame">
                {p.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p.blurb}
              </p>
              <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-muted-foreground opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100">
                {p.detail}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="mt-10 grid gap-6 rounded-[2rem] border border-border bg-ink-soft p-7 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-volt">
            Right now
          </p>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            I&apos;m going deeper on GPU-adjacent systems work and applied
            machine learning — the seam NVPilot opened up for me. Alongside that
            I&apos;m looking for an internship where I can ship something real
            and be the least experienced person in the room for a while.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
