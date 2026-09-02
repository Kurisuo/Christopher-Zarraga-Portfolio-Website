import { useRef, useState } from "react";
import type { MouseEvent } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import { cn } from "@/lib/utils";

type TrailDot = { id: number; x: number; y: number };

export function ProfileCard({ className }: { className?: string }) {
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const lastSpawn = useRef(0);

  function spawnGlow(e: MouseEvent<HTMLDivElement>) {
    const now = performance.now();
    if (now - lastSpawn.current < 45) return;
    lastSpawn.current = now;
    const rect = e.currentTarget.getBoundingClientRect();
    const dot: TrailDot = {
      id: now,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setTrail((t) => [...t.slice(-24), dot]);
    window.setTimeout(() => {
      setTrail((t) => t.filter((d) => d.id !== dot.id));
    }, 1500);
  }

  const link =
    "flex size-10 items-center justify-center rounded-full border border-border text-volt transition-colors duration-150 hover:border-primary hover:bg-primary hover:text-primary-foreground";

  return (
    <div
      onMouseMove={spawnGlow}
      className={cn(
        "card-surface relative overflow-hidden rounded-lg border border-border p-6 text-foreground",
        className,
      )}
    >
      {trail.map((d) => (
        <span key={d.id} className="glow-dot" style={{ left: d.x, top: d.y }} />
      ))}

      <img
        src={portrait}
        alt="Christopher Zarraga Jimenez"
        width={1024}
        height={1280}
        className="aspect-[3/4] w-full rounded-lg object-cover"
      />
      <h2 className="mt-7 text-center font-display text-2xl font-bold tracking-tight">
        Christopher Zarraga Jimenez
      </h2>
      <p className="mt-4 text-center text-sm leading-relaxed text-muted-foreground">
        CS + Applied Math at UC Santa Cruz — Sabatte Family full-ride scholar,
        systems builder, 2000-Elo chess player.
      </p>
      <div className="mt-7 flex justify-center gap-3 pb-1">
        <a
          href="https://github.com/Kurisuo"
          target="_blank"
          rel="noreferrer"
          className={link}
          aria-label="GitHub"
        >
          <Github className="size-[18px]" />
        </a>
        <a
          href="https://www.linkedin.com/in/christopher-zarraga/"
          target="_blank"
          rel="noreferrer"
          className={link}
          aria-label="LinkedIn"
        >
          <Linkedin className="size-[18px]" />
        </a>
        <a
          href="mailto:christopherzarraga31@gmail.com"
          className={link}
          aria-label="Email"
        >
          <Mail className="size-[18px]" />
        </a>
      </div>
    </div>
  );
}
