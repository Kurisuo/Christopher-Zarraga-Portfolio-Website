import { useState } from "react";
import { Reveal } from "./Reveal";
import { ProfileCard } from "./ProfileCard";

const stats = [
  { value: "1st", label: ["COHORT FULL RIDE", "RECIPIENT AT UCSC"] },
  { value: "5", label: ["ENGINEERS LED", "ON VERIFI"] },
  { value: "First-gen", label: ["COLLEGE SCHOLAR", "IN SHPE"] },
  { value: "3rd", label: ["YEAR AT UCSC", "CS + APPLIED MATH"] },
];

const TECH_LABELS = ["C++", "C", "NVML", "TypeScript", "Linux"] as const;

type Project = {
  id: string;
  name: string;
  descriptor: string;
  metric: string;
  wip?: boolean;
};

const projects: Project[] = [
  { id: "inference", name: "Neural inference engine", descriptor: "MNIST MLP in C++17, zero ML libraries", metric: "100% PyTorch agreement · ~24,000 img/s" },
  { id: "http", name: "Multi-threaded HTTP server", descriptor: "thread pool over a bounded queue, in C", metric: "~8,400 req/s · 2.2x speedup" },
  { id: "verifi", name: "VeriFi", descriptor: "C++ vector store powering RAG retrieval", metric: "0.36 ms p50 · 250k vectors" },
  { id: "nvpilot", name: "NVPilot", descriptor: "autonomous GPU tuning agent, NVIDIA x ASUS Hackathon", metric: "~550 ms perception · ~3 s rollback" },
  { id: "nes", name: "NES C++ Emulator", descriptor: "6502 CPU and PPU written from scratch", metric: "in progress", wip: true },
  { id: "avscope", name: "AVScope", descriptor: "frame-by-frame inspector for AV perception runs", metric: "in progress", wip: true },
];

export function Hero() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <header id="top" className="portfolio-section scroll-mt-28 pb-14 pt-28 lg:pb-16 lg:pt-32">
      <Reveal className="mb-12 lg:hidden"><ProfileCard /></Reveal>

      <Reveal delay={80}>
        <h1 className="font-display text-[clamp(2.75rem,9vw,7rem)] font-extrabold uppercase leading-[0.85] tracking-tight">
          Computer<br /><span className="text-ghost">Science</span>
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl lg:text-[1.35rem] lg:leading-relaxed">
          I&apos;m Christopher Zarraga — a CS major and Applied Math minor at UC Santa Cruz, here on the Sabatte Family full-ride scholarship, the first ever awarded by the university. I spend most of my time turning half-formed ideas into systems that actually run.
        </p>
      </Reveal>

      <div className="mt-10 border-y border-border py-5 lg:mt-12">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.value + stat.label[0]} className={`flex min-w-0 flex-col items-center justify-center px-3 text-center ${index > 0 ? "border-l border-hairline" : ""}`}>
              <dt className="whitespace-nowrap font-display text-xl font-bold leading-none tracking-tight sm:text-3xl">{stat.value}</dt>
              <dd className="mt-2 font-mono text-[9px] uppercase leading-tight tracking-[0.12em] text-muted-foreground sm:text-[10px]">{stat.label[0]}<br />{stat.label[1]}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-10 lg:mt-12">
        <Reveal delay={200} className="flex">
          <div
            className="flex w-full flex-col rounded-lg border p-4"
            style={{
              background: "linear-gradient(180deg, #16141A 0%, #0E0D11 100%)",
              borderColor: "rgba(255,255,255,0.08)",
            }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "#A1A1AA" }}>Selected work</p>
            <ul className="mt-2 space-y-1">
              {projects.map((project) => {
                const isActive = active === project.id;
                return (
                  <li key={project.id}>
                    <button type="button" onMouseEnter={() => setActive(project.id)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(project.id)} onBlur={() => setActive(null)} onClick={() => setActive(isActive ? null : project.id)} aria-expanded={isActive} className="w-full rounded-md px-1.5 py-1 text-left transition-colors duration-200 ease-out hover:bg-white/5">
                      <span className="block font-display text-base font-semibold leading-snug" style={{ color: "#E4E4E7" }}>{project.name}{project.wip && <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.18em]" style={{ color: "rgba(161,161,170,0.7)" }}>in progress</span>}</span>
                      <span className="block text-[0.85em] font-normal leading-snug" style={{ color: "#A1A1AA" }}>{project.descriptor}</span>
                      <span className={`grid transition-all duration-200 ease-out ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}><span className="overflow-hidden"><span className="mt-1 block font-mono text-[11px] leading-snug" style={{ color: "#E4E4E7" }}>{project.metric}</span></span></span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="mt-5 border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "rgba(161,161,170,0.7)" }}>
                {TECH_LABELS.join(" · ")}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </header>
  );
}
