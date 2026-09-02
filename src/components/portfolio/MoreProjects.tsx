import { Reveal } from "./Reveal";

const projects = [
  {
    tag: "Python · Stable-Baselines3 · CARLA",
    name: "AIEA Lab",
    blurb: "Autonomous vehicles research with reinforcement learning.",
    metric: "SAC on CarRacing · Kubernetes GPU cluster",
    detail: "Evaluating SAC agents in Gymnasium CarRacing with Stable-Baselines3, and running CARLA workloads on the Nautilus Kubernetes GPU cluster.",
  },
  {
    tag: "Angular · Spring · PostgreSQL",
    name: "Tech4Good Lab",
    blurb: "A full-stack learning curriculum app built for social impact.",
    metric: "50% of data/event components",
    detail: "Built half the data/event milestone components and architected bulk data pipelines with batch write services for multi-record transactions.",
  },
];

function ProjectCard({ project, delay = 0 }: { project: (typeof projects)[number]; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <article className="card-surface group h-full rounded-lg border border-border p-6 transition-colors duration-180 hover:border-primary/45">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{project.tag}</span>
        <h3 className="mt-3 font-display text-3xl font-bold tracking-tight transition-colors duration-180 group-hover:text-volt">{project.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.blurb}</p>
        <p className="mt-4 font-mono text-[11px] leading-relaxed text-volt">{project.metric}</p>
        <p className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-muted-foreground opacity-0 transition-all duration-180 group-hover:max-h-40 group-hover:opacity-100">{project.detail}</p>
      </article>
    </Reveal>
  );
}

export function MoreProjects() {
  return (
    <section id="work" className="scroll-mt-32 py-14 lg:py-20">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-volt">03 — Everything else</p>
        <h2 className="mt-4 font-display text-[clamp(1.5rem,3.6vw,2.4rem)] font-extrabold uppercase leading-[0.95] tracking-tight">The rest of<br />the build log</h2>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {projects.map((project, index) => <ProjectCard key={project.name} project={project} delay={60 * index} />)}
      </div>

      <Reveal delay={120}>
        <div className="mt-8 grid gap-6 rounded-lg border border-border bg-ink-soft p-7 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-volt">Right now</p>
          <p className="max-w-4xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
            I&apos;m going deeper on autonomous-driving reinforcement learning at the AIEA Lab and shipping with the Tech4Good Lab — while looking for an internship where I can ship something real and be the least experienced person in the room for a while.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
