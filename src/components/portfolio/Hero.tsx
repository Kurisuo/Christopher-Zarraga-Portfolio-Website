import { useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { ProfileCard } from "./ProfileCard";
import galleryChess from "@/assets/gallery-chess.jpg";
import gallerySwim from "@/assets/gallery-swim.jpg";
import galleryCalisthenics from "@/assets/gallery-calisthenics.jpg";
import galleryPhotography from "@/assets/gallery-photography.jpg";

const stats = [
  { value: "1st", label: ["COHORT FULL RIDE", "RECIPIENT AT UCSC"] },
  { value: "5", label: ["ENGINEERS LED", "ON VERIFI"] },
  { value: "First-gen", label: ["COLLEGE SCHOLAR", "IN SHPE"] },
  { value: "3rd", label: ["YEAR AT UCSC", "CS + APPLIED MATH"] },
];

const TECH = ["C++", "C", "NVML", "TypeScript", "Linux"] as const;

type Project = {
  id: string;
  name: string;
  descriptor: string;
  metric: string;
  tech: string[];
  wip?: boolean;
};

const projects: Project[] = [
  {
    id: "inference",
    name: "Neural inference engine",
    descriptor: "MNIST MLP in C++17, zero ML libraries",
    metric: "100% PyTorch agreement · ~24,000 img/s",
    tech: ["C++"],
  },
  {
    id: "http",
    name: "Multi-threaded HTTP server",
    descriptor: "thread pool over a bounded queue, in C",
    metric: "~8,400 req/s · 2.2x speedup",
    tech: ["C", "Linux"],
  },
  {
    id: "verifi",
    name: "VeriFi",
    descriptor: "C++ vector store powering RAG retrieval",
    metric: "0.36 ms p50 · 250k vectors",
    tech: ["C++"],
  },
  {
    id: "nvpilot",
    name: "NVPilot",
    descriptor: "autonomous GPU tuning agent, NVIDIA x ASUS Hackathon",
    metric: "~550 ms perception · ~3 s rollback",
    tech: ["TS", "NVML"],
  },
  {
    id: "nes",
    name: "NES C++ Emulator",
    descriptor: "6502 CPU and PPU written from scratch",
    metric: "in progress",
    tech: ["C++"],
    wip: true,
  },
  {
    id: "avscope",
    name: "AVScope",
    descriptor: "frame-by-frame inspector for AV perception runs",
    metric: "in progress",
    tech: ["C++", "Linux"],
    wip: true,
  },
];

const hobbies = [
  { name: "Chess", descriptor: "2000 Elo" },
  { name: "Lap swimming", descriptor: "just finished my first swim class" },
  { name: "Calisthenics", descriptor: "bodyweight strength, 5 days a week" },
  { name: "Reading", descriptor: "financial literacy" },
  { name: "Photography", descriptor: "35mm and coastal landscapes" },
];

const gallery = [
  { src: galleryChess, alt: "Chess pieces on a board in warm light" },
  { src: gallerySwim, alt: "Swimmer doing butterfly stroke in a pool lane" },
  { src: galleryCalisthenics, alt: "Pull-ups on an outdoor bar at sunset" },
  { src: galleryPhotography, alt: "Reading a finance book beside a camera" },
];

function TechIcon({ name, dim }: { name: string; dim: boolean }) {
  return (
    <span
      title={name}
      className={`flex size-11 shrink-0 items-center justify-center rounded-full border border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground transition-opacity duration-180 ease-out ${dim ? "opacity-30" : "opacity-100"}`}
    >
      <svg viewBox="0 0 48 48" className="size-8" aria-hidden="true">
        <circle cx="24" cy="24" r="19" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text x="24" y="27" textAnchor="middle" fill="currentColor" fontSize={name.length > 3 ? "8" : "10"} fontFamily="monospace" fontWeight="700">
          {name}
        </text>
      </svg>
      <span className="sr-only">{name}</span>
    </span>
  );
}

export function Hero() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeProject = projects.find((p) => p.id === active) ?? null;

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <header id="top" className="scroll-mt-28 pb-14 pt-28 lg:pb-16 lg:pt-32">
      <Reveal className="mb-12 lg:hidden">
        <ProfileCard />
      </Reveal>

      <Reveal delay={80}>
        <h1 className="font-display text-[clamp(2.75rem,9vw,7rem)] font-extrabold uppercase leading-[0.85] tracking-tight">
          Computer
          <br />
          <span className="text-ghost">Science</span>
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl lg:text-[1.35rem] lg:leading-relaxed">
          I&apos;m Christopher Zarraga — a CS major and Applied Math minor at UC
          Santa Cruz, here on the Sabatte Family full-ride scholarship, the
          first ever awarded by the university. I spend most of my time turning
          half-formed ideas into systems that actually run.
        </p>
      </Reveal>

      <Reveal delay={160} className="mt-10 lg:mt-12">
        <dl className="flex flex-wrap justify-between gap-x-6 gap-y-6">
          {stats.map((s) => (
            <div key={s.value + s.label[0]} className="flex min-w-0 flex-1 flex-col items-center text-center">
              <dt className="font-display text-4xl font-bold leading-none tracking-tight sm:text-5xl">{s.value}</dt>
              <dd className="mt-1 font-mono text-[10px] uppercase leading-tight tracking-wider text-muted-foreground">
                {s.label[0]}<br />{s.label[1]}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <div className="mt-10 grid items-stretch gap-4 sm:grid-cols-2 lg:mt-12">
        <Reveal delay={200} className="flex">
          <div className="card-surface card-lift flex w-full flex-col rounded-3xl border border-primary/25 p-4 text-foreground">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-volt">Selected work</p>
            <ul className="mt-2 space-y-1">
              {projects.map((p) => {
                const isActive = active === p.id;
                return (
                  <li key={p.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(p.id)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(p.id)}
                      onBlur={() => setActive(null)}
                      onClick={() => setActive(isActive ? null : p.id)}
                      aria-expanded={isActive}
                      className="w-full rounded-lg px-1.5 py-1 text-left transition-colors duration-180 ease-out hover:bg-primary/10"
                    >
                      <span className="block font-display text-base font-semibold leading-snug">
                        {p.name}
                        {p.wip && <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">in progress</span>}
                      </span>
                      <span className="block text-[0.85em] font-normal leading-snug text-muted-foreground">{p.descriptor}</span>
                      <span className={`grid transition-all duration-180 ease-out ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                        <span className="overflow-hidden"><span className="mt-1 block font-mono text-[11px] leading-snug text-volt">{p.metric}</span></span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="mt-auto flex flex-col items-center gap-2 pt-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Building with</p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {TECH.map((name) => <TechIcon key={name} name={name} dim={Boolean(activeProject && !activeProject.tech.includes(name))} />)}
              </div>
            </div>
            <span className="mt-3 flex size-8 items-center justify-center self-end rounded-full border border-primary/30 opacity-0" aria-hidden="true"><ChevronDown className="size-4" /></span>
          </div>
        </Reveal>

        <Reveal delay={260} className="flex">
          <div className="card-surface card-lift flex w-full flex-col rounded-3xl border border-primary/25 p-4 text-foreground">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Off the keyboard</p>
            <ul className="mt-2 space-y-1">
              {hobbies.map((h) => (
                <li key={h.name} className="px-1.5 py-1">
                  <span className="block font-display text-base font-semibold leading-snug">{h.name}</span>
                  <span className="block text-[0.85em] font-normal leading-snug text-muted-foreground">{h.descriptor}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col items-center gap-2 pt-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Photo gallery</p>
              <p className="text-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">{gallery.length} shots — open below</p>
            </div>
            <button type="button" onClick={() => setGalleryOpen((v) => !v)} aria-expanded={galleryOpen} aria-label="Toggle hobby photo gallery" className="mt-3 flex size-8 items-center justify-center self-end rounded-full border border-primary/30 transition-colors duration-180 ease-out hover:bg-primary/10">
              <ChevronDown className={`size-4 transition-transform duration-180 ease-out ${galleryOpen ? "rotate-180" : ""}`} />
            </button>
          </div>
        </Reveal>
      </div>

      <div className={`grid transition-all duration-180 ease-out ${galleryOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <div className="card-surface rounded-3xl border border-primary/25 p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Off the keyboard — gallery</p>
              <div className="flex shrink-0 gap-2">
                <button type="button" onClick={() => scrollBy(-1)} aria-label="Previous photos" className="flex size-8 items-center justify-center rounded-full border border-primary/30 transition-colors duration-180 hover:bg-primary/10"><ChevronLeft className="size-4" /></button>
                <button type="button" onClick={() => scrollBy(1)} aria-label="Next photos" className="flex size-8 items-center justify-center rounded-full border border-primary/30 transition-colors duration-180 hover:bg-primary/10"><ChevronRight className="size-4" /></button>
              </div>
            </div>
            <div ref={trackRef} className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-1">
              {gallery.map((img) => <img key={img.src} src={img.src} alt={img.alt} loading="lazy" width={1024} height={1024} className="aspect-square w-[70%] shrink-0 snap-start rounded-2xl object-cover sm:w-[45%] lg:w-[30%]" />)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
