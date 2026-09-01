import { Reveal } from "./Reveal";

const projects = [
  {
    tag: "C++ / RAG",
    name: "VeriFi",
    blurb:
      "A RAG pipeline that answers queries from verified, sourced company policy documents.",
    detail:
      "Led a 5-person team; 0.36ms query latency at 1k vectors scaling to 96ms at 250k, and 33k chunks/sec ingestion through a cosine-similarity top-k engine in C++.",
  },
  {
    tag: "C / POSIX",
    name: "HTTP Server",
    blurb: "A multi-threaded HTTP server over raw POSIX syscalls.",
    detail:
      "~8,400 req/s with 99% of requests under ~13ms across 64 connections — thread pool over a bounded queue, reader-writer locks, zero concurrency libraries.",
  },
  {
    tag: "Research",
    name: "AIEA Lab",
    blurb: "Autonomous vehicles research with reinforcement learning.",
    detail:
      "Evaluating SAC agents in Gymnasium CarRacing with Stable-Baselines3, and running CARLA workloads on the Nautilus Kubernetes GPU cluster.",
  },
  {
    tag: "Tech4Good",
    name: "Causeway",
    blurb: "A full-stack learning curriculum app built for social impact.",
    detail:
      "Built half the data/event milestone components and architected bulk data pipelines with batch write services for multi-record transactions.",
  },
  {
    tag: "TypeScript",
    name: "Reversibility Engine",
    blurb: "Journaled undo for every state mutation an agent makes.",
    detail:
      "Designed as .md skill specs for Claude Code — records a mechanical inverse per mutation, verified byte-identical config restoration in ~3s.",
  },
  {
    tag: "Leadership",
    name: "Sabatte & Regents",
    blurb: "Co-founded the association for UCSC's scholarship cohort.",
    detail:
      "Building community for the Sabatte Family and Regents scholars alongside SHPE, connecting first-gen and underrepresented engineers.",
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
          <p className="max-w-4xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
            I&apos;m going deeper on autonomous-driving RL at the AIEA Lab and
            shipping Causeway with Tech4Good — while digging further into the
            GPU-adjacent systems work NVPilot opened up for me. Alongside that
            I&apos;m looking for an internship where I can ship something real
            and be the least experienced person in the room for a while.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
