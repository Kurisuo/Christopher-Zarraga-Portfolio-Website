import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CodeCard } from "./CodeCard";
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
    tag: "Leadership",
    name: "Sabatte & Regents",
    blurb: "Co-founded the association for UCSC's scholarship cohort.",
    detail:
      "Building community for the Sabatte Family and Regents scholars alongside SHPE, connecting first-gen and underrepresented engineers.",
  },
];

function NVPilotCard() {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={180}>
      <article className="group h-full rounded-3xl border border-border bg-ink-soft p-6 transition-colors hover:border-flame">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="w-full text-left"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              TypeScript / NVML
            </span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>
          <h3 className="mt-3 font-display text-3xl font-bold tracking-tight transition-colors group-hover:text-flame">
            NVPilot
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            An autonomous agent that watches live NVML GPU telemetry and tunes
            the machine itself.
          </p>
          <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-muted-foreground opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100">
            Built at the NVIDIA x ASUS hackathon at UCSC — parses full system
            state in ~550ms, plans in under 1ms, and freed ~2GB across 400+
            processes. Every mutation is journaled with a mechanical inverse,
            restored byte-identical in ~3s. Click to see the code.
          </p>
        </button>

        <div
          className={`grid transition-all duration-500 ease-in-out ${
            open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <CodeCard
              filename="nvpilot/main.ts"
              badge="live"
              className="bg-ink"
            >
              <span className="text-flame">import</span>{" "}
              <span className="text-foreground/85">{"{ perceive, reflect }"}</span>{" "}
              <span className="text-flame">from</span>{" "}
              <span className="text-volt">&quot;./core/agent&quot;</span>;{"\n"}
              <span className="text-flame">import</span>{" "}
              <span className="text-foreground/85">{"{ runDaemon }"}</span>{" "}
              <span className="text-flame">from</span>{" "}
              <span className="text-volt">&quot;./core/daemon&quot;</span>;{"\n"}
              <span className="text-flame">import</span>{" "}
              <span className="text-foreground/85">{"{ Journal }"}</span>{" "}
              <span className="text-flame">from</span>{" "}
              <span className="text-volt">&quot;./core/journal&quot;</span>;{"\n"}
              <span className="text-flame">import</span>{" "}
              <span className="text-foreground/85">{"{ Plan, SystemSnapshot }"}</span>{" "}
              <span className="text-flame">from</span>{" "}
              <span className="text-volt">&quot;./core/types&quot;</span>;{"\n"}
              <span className="text-flame">import</span>{" "}
              <span className="text-foreground/85">{"{ OllamaPlanner }"}</span>{" "}
              <span className="text-flame">from</span>{" "}
              <span className="text-volt">&quot;./planners/ollama-planner&quot;</span>;{"\n"}
              <span className="text-flame">import</span>{" "}
              <span className="text-foreground/85">{"{ HELP_TEXT, parseArgs }"}</span>{" "}
              <span className="text-flame">from</span>{" "}
              <span className="text-volt">&quot;./cli&quot;</span>;{"\n"}
              <span className="text-flame">import</span>{" "}
              <span className="text-foreground/85">{"{ TOOL_DEFINITIONS }"}</span>{" "}
              <span className="text-flame">from</span>{" "}
              <span className="text-volt">&quot;./tools/definitions&quot;</span>;{"\n\n"}
              <span className="text-flame">function</span>{" "}
              <span className="text-volt">banner</span>():{" "}
              <span className="text-flame">void</span>{" "}{"{"}{"\n"}
              {"  "}console.<span className="text-volt">log</span>(
              <span className="text-volt">&quot;╔══════════════════════════════════════════════════════════╗&quot;</span>);{"\n"}
              {"  "}console.<span className="text-volt">log</span>(
              <span className="text-volt">&quot;║   NVPilot — Adaptive Performance Agent                     ║&quot;</span>);{"\n"}
              {"  "}console.<span className="text-volt">log</span>(
              <span className="text-volt">&quot;╚══════════════════════════════════════════════════════════╝&quot;</span>);{"\n"}
              {"}"}{"\n\n"}
              <span className="text-flame">function</span>{" "}
              <span className="text-volt">printSnapshot</span>(s: SystemSnapshot):{" "}
              <span className="text-flame">void</span>{" "}{"{"}{"\n"}
              {"  "}console.<span className="text-volt">log</span>(
              <span className="text-volt">&quot;\n&gt;&gt;&gt; PERCEIVE — system state\n&quot;</span>);{"\n"}
              {"  "}<span className="text-flame">if</span> (s.gpu) {"{"}{"\n"}
              {"    "}<span className="text-flame">const</span> memPct = Math.
              <span className="text-volt">round</span>((s.gpu.memoryUsedMiB / s.gpu.memoryTotalMiB) *{" "}
              <span className="text-volt">100</span>);{"\n"}
              {"    "}console.<span className="text-volt">log</span>(
              <span className="text-volt">&quot;  GPU:      &quot;</span> + s.gpu.name +{" "}
              <span className="text-volt">&quot; (driver &quot;</span> + s.gpu.driverVersion +{" "}
              <span className="text-volt">&quot;)&quot;</span>);{"\n"}
              {"    "}console.<span className="text-volt">log</span>(
              <span className="text-volt">&quot;  VRAM:     &quot;</span> + s.gpu.memoryUsedMiB +{" "}
              <span className="text-volt">&quot;/&quot;</span> + s.gpu.memoryTotalMiB +{" "}
              <span className="text-volt">&quot; MiB (&quot;</span> + memPct +{" "}
              <span className="text-volt">&quot;% used)&quot;</span>);{"\n"}
              {"    "}console.<span className="text-volt">log</span>(
              <span className="text-volt">&quot;  Temp:     &quot;</span> + s.gpu.temperatureC +{" "}
              <span className="text-volt">&quot;°C   Power: &quot;</span> + s.gpu.powerUsageW +{" "}
              <span className="text-volt">&quot;W / &quot;</span> + s.gpu.powerCapW +{" "}
              <span className="text-volt">&quot;W   Load: &quot;</span> + s.gpu.gpuUtilizationPercent +{" "}
              <span className="text-volt">&quot;%&quot;</span>);{"\n"}
              {"  "}{"}"} <span className="text-flame">else</span> {"{"}{"\n"}
              {"    "}console.<span className="text-volt">log</span>(
              <span className="text-volt">&quot;  GPU:      no NVIDIA telemetry available (nvidia-smi missing or failed)&quot;</span>);{"\n"}
              {"  "}{"}"}{"\n"}
              {"  "}console.<span className="text-volt">log</span>(
              <span className="text-volt">&quot;  Tier:     &quot;</span> + s.gpuTier.
              <span className="text-volt">toUpperCase</span>());{"\n"}
              {"}"}
            </CodeCard>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function MoreProjects() {
  return (
    <section id="work" className="py-14 lg:py-20">
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

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
        <NVPilotCard />
      </div>

      <Reveal delay={120}>
        <div className="mt-8 grid gap-6 rounded-[2rem] border border-border bg-ink-soft p-7 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-12">
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
