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

  return (
    <div
      onMouseMove={spawnGlow}
      className={cn(
        "relative overflow-hidden rounded-xl bg-surface p-6 text-surface-foreground",
        className,
      )}
    >
      {/* Purple glow trail */}
      {trail.map((d) => (
        <span
          key={d.id}
          aria-hidden
          className="glow-dot"
          style={{ left: d.x, top: d.y }}
        />
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
      <p className="mt-4 text-center text-sm leading-relaxed text-surface-foreground/60">
        A Computer Science student building things that are equal parts math and
        stubbornness.
      </p>
      <div className="mt-7 flex justify-center gap-3 pb-1">
        <a
          href="https://github.com"
          className="flex size-10 items-center justify-center rounded-full bg-surface-foreground/5 text-flame transition-colors hover:bg-flame hover:text-flame-foreground"
          aria-label="GitHub"
        >
          <Github className="size-[18px]" />
        </a>
        <a
          href="https://linkedin.com"
          className="flex size-10 items-center justify-center rounded-full bg-surface-foreground/5 text-flame transition-colors hover:bg-flame hover:text-flame-foreground"
          aria-label="LinkedIn"
        >
          <Linkedin className="size-[18px]" />
        </a>
        <a
          href="#contact"
          className="flex size-10 items-center justify-center rounded-full bg-surface-foreground/5 text-flame transition-colors hover:bg-flame hover:text-flame-foreground"
          aria-label="Email"
        >
          <Mail className="size-[18px]" />
        </a>
      </div>
    </div>
  );
}
