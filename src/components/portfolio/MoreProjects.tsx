import { useState } from "react";
import { Reveal } from "./Reveal";
import { BuildLogCard } from "./BuildLogCard";

const projects = [
  {
    tag: "Research",
    name: "AIEA Lab",
    blurb: "Autonomous vehicles research with reinforcement learning.",
    detail: "SAC agents, Gymnasium CarRacing, CARLA, and Kubernetes GPU workloads.",
    code: (
      <>
        <span className="text-muted-foreground"># autonomous driving research</span>{"\n"}
        <span className="text-foreground">agent</span> = <span className="text-muted-foreground">SAC</span>(policy=<span className="text-muted-foreground">&quot;MlpPolicy&quot;</span>){"\n"}
        <span className="text-foreground">agent</span>.<span className="text-muted-foreground">learn</span>(total_timesteps=<span className="text-foreground">250_000</span>)
      </>
    ),
  },
  {
    tag: "Tech4Good",
    name: "Tech4Good Lab",
    blurb: "A full-stack learning curriculum app built for social impact.",
    detail: "Milestone components and batch data pipelines for multi-record transactions.",
    code: (
      <>
        <span className="text-muted-foreground">// ship learning milestones</span>{"\n"}
        <span className="text-foreground">await</span> <span className="text-muted-foreground">batchWrite</span>(milestones, {"{"}{"\n"}
        {"  "}atomic: <span className="text-foreground">true</span>{"\n"}
        {"}"})
      </>
    ),
  },
  {
    tag: "Academics",
    name: "Current Studies",
    blurb: "Third-year Computer Science major with an Applied Math minor at UC Santa Cruz.",
    detail: "Data structures, algorithms, systems, linear algebra, and probability.",
    code: (
      <>
        <span className="text-muted-foreground">// current course load</span>{"\n"}
        <span className="text-foreground">focus</span> = [<span className="text-muted-foreground">&quot;systems&quot;</span>, <span className="text-muted-foreground">&quot;algorithms&quot;</span>, <span className="text-muted-foreground">&quot;linear algebra&quot;</span>]
      </>
    ),
  },
  {
    tag: "C++ / RAG",
    name: "VeriFi",
    blurb: "A RAG pipeline that answers queries from verified, sourced company policy documents.",
    detail: "Led 5 engineers; 0.36ms p50 at 250k vectors and 33k chunks/sec ingestion.",
    code: (
      <>
        <span className="text-muted-foreground">// cosine-similarity top-k</span>{"\n"}
        <span className="text-foreground">auto</span> results = index.<span className="text-muted-foreground">search</span>(query, k);{"\n"}
        <span className="text-foreground">return</span> results.<span className="text-muted-foreground">verifiedOnly</span>();
      </>
    ),
  },
  {
    tag: "TypeScript / NVML",
    name: "NVPilot",
    blurb: "An autonomous agent that watches live GPU telemetry and tunes the machine itself.",
    detail: "~550ms perception, sub-millisecond planning, and reversible system mutations.",
    code: (
      <>
        <span className="text-violet-muted">import</span> {"{ perceive, reflect }"} <span className="text-violet-muted">from</span> <span className="text-muted-foreground">&quot;./core/agent&quot;</span>;{"\n\n"}
        <span className="text-violet-muted">const</span> snapshot = <span className="text-foreground">perceive</span>();{"\n"}
        <span className="text-violet-muted">const</span> plan = <span className="text-foreground">reflect</span>(snapshot);{"\n"}
        <span className="text-violet-muted">await</span> <span className="text-foreground">runDaemon</span>(plan);
      </>
    ),
  },
  {
    tag: "C / POSIX",
    name: "HTTP Server",
    blurb: "A multi-threaded HTTP server over raw POSIX syscalls.",
    detail: "~8,400 req/s with 99% of requests under ~13ms across 64 connections.",
    code: (
      <>
        <span className="text-muted-foreground">/* bounded queue + thread pool */</span>{"\n"}
        <span className="text-violet-muted">while</span> (running) {"{"}{"\n"}
        {"  "}<span className="text-foreground">request</span> = queue.<span className="text-muted-foreground">pop</span>();{"\n"}
        {"  "}<span className="text-foreground">serve</span>(request);{"\n"}
        {"}"}
      </>
    ),
  },
];

export function MoreProjects() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="work" className="portfolio-section snap-start py-14 lg:py-20">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-violet-muted">03 — Everything else</p>
        <h2 className="mt-4 font-display text-[clamp(2rem,6vw,4.5rem)] font-extrabold uppercase leading-[0.9] tracking-tight">
          The rest of
          <br />
          <span className="text-ghost">the build log</span>
        </h2>
      </Reveal>

      <div
        className="mt-8 grid gap-4 transition-[grid-template-columns] duration-[350ms] ease-[cubic-bezier(0.4,0.2,0.2,1)] lg:grid-cols-[repeat(3,minmax(0,1fr))]"
        style={{
          gridTemplateColumns: active
            ? `repeat(3, minmax(0, 1fr))`
            : undefined,
        }}
      >
        {projects.map((project, index) => (
          <Reveal key={project.name} delay={60 * index} className={`min-w-0 transition-opacity duration-200 ${active && active !== project.name ? "opacity-60" : "opacity-100"}`}>
            <BuildLogCard
              {...project}
              open={active === project.name}
              onOpen={() => setActive(project.name)}
              onClose={() => setActive(null)}
              onToggle={() => setActive((value) => (value === project.name ? null : project.name))}
            />
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="mt-8 grid gap-6 border border-border bg-ink-soft p-7 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-violet-muted">Right now</p>
          <p className="max-w-4xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
            I&apos;m going deeper on autonomous-driving RL at the AIEA Lab and shipping Causeway with the Tech4Good Lab — while digging further into the GPU-adjacent systems work NVPilot opened up for me. Alongside that I&apos;m looking for an internship where I can ship something real and be the least experienced person in the room for a while.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
