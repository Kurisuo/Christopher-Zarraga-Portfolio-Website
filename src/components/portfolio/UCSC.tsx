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
            I came to UC Santa Cruz on the first full-ride scholarship the
            university had ever awarded. It changed what I could afford to be
            curious about. I declared Computer Science with Applied Math because
            I wanted both halves — the systems that run and the math that
            explains why they run the way they do. Two projects from that stretch
            matter most.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
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
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                Built at the NVIDIA x ASUS hackathon at UCSC. NVPilot is an
                autonomous agent that watches live NVML GPU telemetry and tunes
                the machine itself — it parses full system state in ~550ms,
                generates plans in under 1ms, and freed ~2GB of background
                memory across 400+ processes. Every mutation is journaled with
                a mechanical inverse, so any change can be restored
                byte-identical in ~3 seconds.
              </p>
              <CodeCard
                filename="nvpilot/core.py"
                badge="live"
                className="mt-7 bg-ink-soft"
              >
                <span className="text-muted-foreground">
                  # steer the workload before the GPU chokes
                </span>
                {"\n"}
                <span className="text-flame">async def</span>{" "}
                <span className="text-volt">pilot</span>(gpu):{"\n"}
                {"    "}
                <span className="text-flame">async for</span> frame{" "}
                <span className="text-flame">in</span> gpu.telemetry():{"\n"}
                {"        "}
                <span className="text-flame">if</span> frame.temp {">"}{" "}
                <span className="text-volt">THERMAL_LIMIT</span>:{"\n"}
                {"            "}
                <span className="text-flame">await</span> gpu.rebalance(
                frame.batch // <span className="text-volt">2</span>){"\n"}
                {"        "}
                <span className="text-flame">yield</span> frame.metrics
              </CodeCard>
            </article>
          </Reveal>

          {/* Second school project */}
          <Reveal delay={180}>
            <article className="flex h-full flex-col rounded-[2rem] bg-flame p-6 text-flame-foreground sm:p-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                C++17 · PyTorch
              </span>
              <h3 className="mt-5 font-display text-4xl font-extrabold tracking-tight">
                Inference Engine
              </h3>
              <p className="mt-4 text-base leading-relaxed text-flame-foreground/80">
                A zero-dependency C++17 neural network inference engine — GEMM,
                ReLU, Argmax, and a custom binary weight loader that bridges
                PyTorch and the C++ runtime. 100% output agreement across all
                10,000 MNIST test images.
              </p>
              <ul className="mt-auto space-y-2 pt-8 font-mono text-[11px] uppercase tracking-[0.15em] text-flame-foreground/70">
                <li>~24,000 images/sec single-threaded</li>
                <li>~41µs inference latency</li>
                <li>20x speedup via -O2 fix</li>
              </ul>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
