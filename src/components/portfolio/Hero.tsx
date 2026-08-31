import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "./Reveal";
import { ProfileCard } from "./ProfileCard";
import { ChessQueen } from "./ChessQueen";
import galleryChess from "@/assets/gallery-chess.jpg";
import gallerySwim from "@/assets/gallery-swim.jpg";
import galleryCalisthenics from "@/assets/gallery-calisthenics.jpg";
import galleryPhotography from "@/assets/gallery-photography.jpg";
import cppLogo from "@/assets/c-plus-plus-logo.png.asset.json";
import cLogo from "@/assets/c-logo.png.asset.json";
import cudaLogo from "@/assets/cuda-logo.png.asset.json";
import tsLogo from "@/assets/typescript-logo.png.asset.json";
import nemoclawLogo from "@/assets/nemoclaw-logo.png.asset.json";
import nvmlLogo from "@/assets/nvml-logo.png.asset.json";

const techLogos: Record<string, { src: string; alt: string }> = {
  "C++": { src: cppLogo.url, alt: "C++ logo" },
  C: { src: cLogo.url, alt: "C logo" },
  CUDA: { src: cudaLogo.url, alt: "CUDA logo" },
  TypeScript: { src: tsLogo.url, alt: "TypeScript logo" },
  NemoClaw: { src: nemoclawLogo.url, alt: "NemoClaw logo" },
  NVML: { src: nvmlLogo.url, alt: "NVML logo" },
};

const stats = [
  { value: "1st", label: ["COHORT FULL RIDE", "RECIPIENT AT UCSC"] },
  { value: "+4", label: ["UPCOMING CONVENTIONS", "& HACKATHONS"] },
  { value: "1st Gen", label: ["SCHOLAR", "IN SHPE"] },
];

const gallery = [
  { src: galleryChess, alt: "Chess pieces on a board in warm light" },
  { src: gallerySwim, alt: "Swimmer doing butterfly stroke in a pool lane" },
  { src: galleryCalisthenics, alt: "Pull-ups on an outdoor bar at sunset" },
  { src: galleryPhotography, alt: "Reading a finance book beside a camera" },
];

export function Hero() {
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <header id="top" className="pb-20 pt-28 lg:pt-36">
      {/* Profile card — mobile only; desktop shows the pinned left column */}
      <Reveal className="mb-12 lg:hidden">
        <ProfileCard />
      </Reveal>

      <Reveal delay={80}>
        <h1 className="font-display text-[clamp(2.75rem,9vw,7rem)] font-extrabold uppercase leading-[0.85] tracking-tight">
          Computer
          <br />
          <span className="text-ghost">Science</span>
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          I&apos;m Christopher Zarraga — a CS major and Applied Math minor at UC
          Santa Cruz, here on the Sabatte Family full-ride scholarship, the
          first ever awarded by the university. I spend most of my time turning
          half-formed ideas into systems that actually run.
        </p>
      </Reveal>

      <Reveal delay={160} className="mt-16">
        <dl className="flex flex-wrap justify-between gap-x-8 gap-y-6">
          {stats.map((s) => (
            <div key={s.value + s.label[0]} className="min-w-0 flex-1 text-center">
              <dt className="font-display text-5xl font-bold tracking-tight sm:text-6xl">
                {s.value}
              </dt>
              <dd className="mt-2 font-mono text-[11px] uppercase leading-relaxed tracking-wider text-muted-foreground">
                {s.label[0]}
                <br />
                {s.label[1]}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <div className="mt-16 grid gap-4 sm:grid-cols-2">
        <Reveal delay={200}>
          <div className="flex h-full flex-col rounded-3xl bg-flame p-5 text-flame-foreground">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em]">
              Selected work
            </p>
            <ul className="mt-3 space-y-3 font-display text-xl font-semibold leading-snug">
              <li>Neural inference engine</li>
              <li>Multi-threaded HTTP server</li>
              <li>VeriFi — RAG pipeline</li>
              <li>NVPilot — NVIDIA x ASUS</li>
            </ul>

            {/* Tech-stack logo grid — anchors the tile like the chess piece */}
            <div className="mt-auto flex flex-col items-center gap-3 pt-6">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-flame-foreground/70">
                Building with
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  ["C++", "C"],
                  ["CUDA", "NVML"],
                  ["TypeScript", "NemoClaw"],
                ].map((pair, colIndex) => (
                  <div key={colIndex} className="flex flex-col items-center gap-2">
                    {pair.map((name) => {
                      const logo = techLogos[name];
                      if (!logo) return null;
                      return (
                        <img
                          key={name}
                          src={logo.src}
                          alt={logo.alt}
                          width={56}
                          height={56}
                          loading="lazy"
                          className="size-14 rounded-lg bg-flame-foreground/10 p-1.5 object-contain transition-transform duration-200 hover:scale-110"
                          title={name}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <span
              className="mt-4 flex size-9 items-center justify-center self-end rounded-full border border-flame-foreground/40"
              aria-hidden="true"
            >
              <ChevronDown className="size-4" />
            </span>
          </div>
        </Reveal>
        <Reveal delay={260}>
          <div
            role="button"
            tabIndex={0}
            aria-expanded={galleryOpen}
            onClick={(e) => {
              // Don't toggle while dragging the 3D queen
              if ((e.target as HTMLElement).closest("canvas")) return;
              setGalleryOpen((v) => !v);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setGalleryOpen((v) => !v);
              }
            }}
            className="flex h-full cursor-pointer flex-col rounded-3xl bg-volt p-5 text-volt-foreground"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em]">
              Off the keyboard
            </p>
            <ul className="mt-3 space-y-1.5 font-display text-xl font-semibold leading-snug">
              <li>Chess — 2000 Elo</li>
              <li>Lap swimming — just finished my first swim class</li>
              <li>Calisthenics</li>
              <li>Reading — financial literacy</li>
              <li>Photography</li>
            </ul>
            <div className="mt-auto grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-center gap-2 pt-6">
              <ChessQueen />
              <ChessGame />
            </div>
            <span
              className="mt-4 flex size-9 items-center justify-center self-end rounded-full border border-volt-foreground/40 transition-transform hover:translate-y-0.5"
              aria-hidden="true"
            >
              <ChevronDown
                className={`size-4 transition-transform duration-300 ${galleryOpen ? "rotate-180" : ""}`}
              />
            </span>
          </div>
        </Reveal>
      </div>

      {/* Photo gallery dropdown — expands below the tiles */}
      <div
        className={`grid transition-all duration-500 ease-out ${
          galleryOpen
            ? "mt-4 grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <Reveal className="rounded-3xl border border-border bg-ink-soft/60 p-4 sm:p-5">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Off the keyboard — gallery (placeholders, swap in your shots)
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {gallery.map((img) => (
                <img
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="aspect-square w-full rounded-2xl object-cover transition-transform duration-300 hover:scale-[1.03]"
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </header>
  );
}
