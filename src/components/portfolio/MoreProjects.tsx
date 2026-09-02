import { useState } from "react";
import { Reveal } from "./Reveal";
import { BuildLogCard } from "./BuildLogCard";

const projects = [
  {
    tag: "Python / Stable-Baselines3 / CARLA",
    name: "AIEA Lab",
    blurb: "Autonomous-vehicle research with reinforcement learning.",
    description:
      "I learned Kubernetes and the Nautilus cluster from scratch just to get access to CARLA and run the lab's experiments — GPU-scheduled jobs, PVC-backed storage, pod specs written by hand. Most of the early work was infrastructure rather than research. Currently I'm studying the RL methods themselves, mostly SAC and DDPG, and learning to develop my own! The part I find interesting isn't implementing them but rather understanding why one algorithm or policy gets chosen over another for a given problem.",
    metric: "SAC on CarRacing · Kubernetes GPU cluster",
  },
  {
    tag: "Angular / Firebase / RxJS",
    name: "Tech4Good Lab",
    blurb: "A full-stack learning curriculum app built for social impact.",
    description:
      "I helped build and complete four goal-tracking components for Compass, the lab's goal-setting and reflection app — owning the data and event layer, which meant keeping state consistent from a user's action all the way through NgRx Signal Store to Firestore. The lab is also studying how to use AI agents properly in development rather than just faster: we work inside Google Antigravity with a shared set of in-house agent skills, where the Angular feature pipeline splits every stage into a plan skill and an implement skill, and the implement stage refuses to run until a plan is finalized. Watching a codebase enforce that separation changed how I think about my own workflow.",
    metric: "Four goal-tracking components · NgRx Signal Store to Firestore",
  },
  {
    tag: "C++17 / PyTorch",
    name: "Neural Inference Engine",
    blurb: "An MNIST inference engine with zero ML libraries at runtime.",
    description:
      "I wanted to know exactly what a framework does when it runs a forward pass instead of trusting it, so I wrote the matrix multiply, ReLU, and argmax myself and built a binary weight format to carry a trained PyTorch model into C++. The bar wasn't whether it ran — it was whether it was provably the same model. Along the way I found my own test suite was passing against a stale baseline, which was a more useful lesson than the engine itself.",
    metric: "100% output agreement across 10,000 MNIST test images · ~24,000 images/sec",
    href: "https://github.com/Kurisuo/neural-inference-engine",
  },
  {
    tag: "C++17 / RAG",
    name: "VeriFi",
    blurb: "A vector store that grounds LLM answers in sourced documents.",
    description:
      "I founded this and led a five-person team, which meant most of my time went to defining interface contracts — chunk format, search API, response schema — so five people could build in parallel instead of blocking on each other. I own the retrieval engine itself: exact cosine-similarity k-NN, written as a correctness baseline before any optimization. Partial-sort selection and SIMD are the obvious next steps and I deliberately didn't take them yet.",
    metric: "0.36ms p50 at 1k vectors · 96ms at 250k · 33k chunks/sec ingestion",
    href: "https://github.com/Kurisuo/VeriFi",
  },
  {
    tag: "TypeScript / NVML",
    name: "NVPilot",
    blurb: "An autonomous agent that reads GPU telemetry and tunes the machine.",
    description:
      "Built at the NVIDIA × ASUS hackathon and finished on my own after the team moved on. The interesting part isn't the tuning — it's the safety model. An LLM proposes changes, but my code validates every one against legal ranges and overwrites state fields from live telemetry, so the model can't misreport what it's changing. Every mutation is journaled with its inverse. If the LLM is offline, a deterministic rule engine takes over.",
    metric: "~550ms perception · <1ms planning · ~3s byte-identical rollback",
    href: "https://github.com/Kurisuo/NVPilot",
  },
  {
    tag: "C / POSIX",
    name: "Multi-Threaded HTTP Server",
    blurb: "A concurrent web server built on hand-rolled primitives.",
    description:
      "The constraint that made this worth doing was writing the concurrency myself — a bounded producer-consumer queue and per-URI reader-writer locks over raw syscalls, no library concurrency. Getting honest numbers took two passes: my first benchmark silently linked the reference library instead of my code, so I verified symbol provenance with nm and reran everything.",
    metric: "~8,400 req/s · 99% of requests under ~13ms · 2.2× single-threaded",
    href: "https://github.com/Kurisuo/multithreaded-http-server",
  },
];

const rows = [projects.slice(0, 3), projects.slice(3, 6)];

export function MoreProjects() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="work" className="portfolio-section snap-start py-14 lg:py-20">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">03 — Everything else</p>
        <h2 className="mt-4 font-display text-[clamp(2rem,6vw,4.5rem)] font-extrabold uppercase leading-[0.9] tracking-tight">
          The rest of
          <br />
          <span className="text-ghost">the build log</span>
        </h2>
      </Reveal>

      <div className="mt-8 flex flex-col gap-4">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-col gap-4 lg:flex-row">
            {row.map((project, columnIndex) => (
              <Reveal
                key={project.name}
                delay={60 * (rowIndex * 3 + columnIndex)}
                className={`min-w-0 basis-0 transition-[flex-grow,opacity] duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${active && active !== project.name ? "opacity-60" : "opacity-100"}`}
                style={{ flexGrow: active === project.name ? 2 : 1 }}
              >
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
        ))}
      </div>

      <Reveal delay={120}>
        <div className="mt-8 grid gap-6 border border-border bg-ink-soft p-7 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">Right now</p>
          <p className="max-w-4xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
            I&apos;m going deeper on autonomous-driving RL at the AIEA Lab and shipping Causeway with the Tech4Good Lab — while digging further into the GPU-adjacent systems work NVPilot opened up for me. Alongside that I&apos;m looking for an internship where I can ship something real and be the least experienced person in the room for a while.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
