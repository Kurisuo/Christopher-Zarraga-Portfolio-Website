import { CodeCard } from "./CodeCard";
import { Reveal } from "./Reveal";

export function UCSC() {
  return (
    <section
      id="ucsc"
      className="-mx-5 border-y border-border bg-ink-soft/40 px-5 py-20 sm:-mx-8 sm:px-8 lg:py-28"
    >
      <div>
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-volt">
            02 — Santa Cruz
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,6vw,4.5rem)] font-extrabold uppercase leading-[0.9] tracking-tight">
            First full ride
            <br />
            <span className="text-ghost">in school history</span>
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            I came to UC Santa Cruz as the first-ever recipient of the Sabatte
            Family full-ride scholarship — the first full ride in the
            university&apos;s history. It changed what I could afford to be
            curious about. I declared Computer Science with an Applied Math
            minor because I wanted both halves — the systems that run and the
            math that explains why they run the way they do. Two projects from
            that stretch matter most.
          </p>
        </Reveal>

        <div className="mt-14">
          {/* NVPilot — featured */}
          <Reveal delay={120}>
            <article className="h-full rounded-[2rem] border border-border bg-ink p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-volt px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-volt-foreground">
                  NVIDIA Hackathon
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  NVIDIA x ASUS · On campus
                </span>
              </div>
              <h3 className="mt-5 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                NVPilot
              </h3>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
                Built at the NVIDIA x ASUS hackathon at UCSC. NVPilot is an
                autonomous agent that watches live NVML GPU telemetry and tunes
                the machine itself — it parses full system state in ~550ms,
                generates plans in under 1ms, and freed ~2GB of background
                memory across 400+ processes. Every mutation is journaled with
                a mechanical inverse, so any change can be restored
                byte-identical in ~3 seconds.
              </p>
              <CodeCard
                filename="nvpilot/main.ts"
                badge="live"
                className="mt-7 bg-ink-soft"
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
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
