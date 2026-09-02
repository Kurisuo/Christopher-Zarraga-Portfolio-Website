import { Github, Linkedin, Mail } from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import { cn } from "@/lib/utils";

export function ProfileCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border p-6",
        className,
      )}
      style={{
        background: "linear-gradient(180deg, #16141A 0%, #0E0D11 100%)",
        borderColor: "rgba(255,255,255,0.08)",
        color: "#E4E4E7",
      }}
    >
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
      <p className="mt-4 text-center text-sm leading-relaxed" style={{ color: "#A1A1AA" }}>
        CS + Applied Math at UC Santa Cruz — Sabatte Family full-ride
        scholar, systems builder, 1900-bullet chess player.
      </p>
      <div className="mt-7 flex justify-center gap-3 pb-1">
        <a
          href="https://github.com/Kurisuo"
          target="_blank"
          rel="noreferrer"
          className="flex size-10 items-center justify-center rounded-full border transition-colors duration-200 hover:bg-white/10"
          style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(228,228,231,0.8)" }}
          aria-label="GitHub"
        >
          <Github className="size-[18px]" />
        </a>
        <a
          href="https://www.linkedin.com/in/christopher-zarraga/"
          target="_blank"
          rel="noreferrer"
          className="flex size-10 items-center justify-center rounded-full border transition-colors duration-200 hover:bg-white/10"
          style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(228,228,231,0.8)" }}
          aria-label="LinkedIn"
        >
          <Linkedin className="size-[18px]" />
        </a>
        <a
          href="mailto:christopherzarraga31@gmail.com"
          className="flex size-10 items-center justify-center rounded-full border transition-colors duration-200 hover:bg-white/10"
          style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(228,228,231,0.8)" }}
          aria-label="Email"
        >
          <Mail className="size-[18px]" />
        </a>
      </div>
    </div>
  );
}
