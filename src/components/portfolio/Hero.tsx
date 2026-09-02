import { useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { ProfileCard } from "./ProfileCard";
import { Lightbox, type LightboxSlide } from "./Lightbox";
import hobbySunset from "@/assets/hobby-sunset.jpg.asset.json";
import hobbyChess from "@/assets/hobby-chess.jpg.asset.json";
import hobbySwim from "@/assets/hobby-swim.jpg.asset.json";

const stats = [
  { value: "1st", label: ["COHORT FULL RIDE", "RECIPIENT AT UCSC"] },
  { value: "5", label: ["ENGINEERS LED", "ON VERIFI"] },
  { value: "First-gen", label: ["COLLEGE SCHOLAR", "IN SHPE"] },
  { value: "3rd", label: ["YEAR AT UCSC", "CS + APPLIED MATH"] },
];

const gallery: LightboxSlide[] = [
  {
    image: hobbySunset.url,
    alt: "Three people sitting on a rock ledge watching the sunset over the hills",
    caption: "Fujifilm X-T2, 18–55mm",
  },
  {
    image: hobbyChess.url,
    alt: "Playing a timed chess game at an outdoor cafe table",
    caption: "Blitz downtown",
  },
  {
    image: hobbySwim.url,
    alt: "Outdoor lap pool with swimmers resting at the wall",
    caption: "Morning laps",
  },
];

export function Hero() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const imageButtonRef = useRef<HTMLButtonElement>(null);

  const goTo = (next: number) =>
    setIndex(((next % gallery.length) + gallery.length) % gallery.length);

  const slide = gallery[index]!;

  return (
    <header id="top" className="portfolio-section scroll-mt-36 pb-8 pt-28 lg:pb-10 lg:pt-32">
      <Reveal className="mb-12 lg:hidden"><ProfileCard /></Reveal>

      <Reveal delay={80}>
        <h1 className="font-display text-[clamp(2.75rem,9vw,7rem)] font-extrabold uppercase leading-[0.85] tracking-tight">
          Computer<br /><span className="text-ghost">Science</span>
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl lg:text-[1.35rem] lg:leading-relaxed">
          I&apos;m Christopher Zarraga — a CS major and Applied Math minor at UC Santa Cruz, here on the Sabatte Family full-ride scholarship, the first ever awarded by the university. I spend most of my time turning half-formed ideas into systems that actually run.
        </p>
      </Reveal>

      <div className="mt-7 border-t border-border py-5 lg:mt-8">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={stat.value + stat.label[0]} className={`flex min-w-0 flex-col items-center justify-center px-3 text-center ${i > 0 ? "border-l border-hairline" : ""}`}>
              <dt className="whitespace-nowrap font-display text-xl font-bold leading-none tracking-tight sm:text-3xl">{stat.value}</dt>
              <dd className="mt-2 font-mono text-[9px] uppercase leading-tight tracking-[0.12em] text-muted-foreground sm:text-[10px]">{stat.label[0]}<br />{stat.label[1]}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Reveal delay={120}>
        <div className="mt-6 flex flex-col items-center">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-center text-[15px] leading-relaxed" style={{ color: "#B4B4BC" }}>
            <span>Off the keyboard I play chess (1900 bullet), trade actively, swim, do calisthenics, and shoot 19 - 55mm.</span>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="hero-hobby-gallery"
              aria-label="Toggle hobby photo gallery"
              className="flex size-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 hover:bg-white/5"
              style={{ borderColor: "rgba(255,255,255,0.2)", color: "#E4E4E7" }}
            >
              <ChevronDown className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
            </button>
          </div>

          <div
            id="hero-hobby-gallery"
            className={`grid w-full max-w-3xl transition-[grid-template-rows,opacity] duration-200 ease-out ${open ? "mt-6 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
          >
            <div className="overflow-hidden">
              <div
                tabIndex={open ? 0 : -1}
                role="region"
                aria-label="Hobby photo carousel"
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft") { e.preventDefault(); goTo(index - 1); }
                  if (e.key === "ArrowRight") { e.preventDefault(); goTo(index + 1); }
                }}
                onTouchStart={(e) => {
                  const t = e.touches[0];
                  if (t) touchStart.current = { x: t.clientX, y: t.clientY };
                }}
                onTouchEnd={(e) => {
                  const start = touchStart.current;
                  touchStart.current = null;
                  const t = e.changedTouches[0];
                  if (!start || !t) return;
                  const dx = t.clientX - start.x;
                  const dy = t.clientY - start.y;
                  if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) goTo(index + (dx < 0 ? 1 : -1));
                }}
                className="outline-none focus-visible:ring-1 focus-visible:ring-foreground/40"
              >
                <button
                  ref={imageButtonRef}
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  aria-label={`Open photo ${index + 1} of ${gallery.length} in full view`}
                  className="flex h-[320px] w-full cursor-zoom-in items-center justify-center rounded-[6px] bg-black/20 outline-none transition-opacity duration-200 focus-visible:ring-2 focus-visible:ring-foreground lg:h-[420px]"
                >
                  <img
                    key={slide.image}
                    src={slide.image}
                    alt={slide.alt}
                    loading="lazy"
                    className="max-h-full max-w-full rounded-[4px] object-contain"
                  />
                </button>

                <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {slide.caption}
                </p>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="flex gap-2">
                    {gallery.map((image, i) => (
                      <button
                        key={image.image}
                        type="button"
                        onClick={() => goTo(i)}
                        aria-label={`Go to photo ${i + 1}`}
                        aria-current={i === index}
                        className="size-2 rounded-full transition-colors duration-200"
                        style={{ background: i === index ? "#E4E4E7" : "rgba(255,255,255,0.2)" }}
                      />
                    ))}
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => goTo(index - 1)}
                      aria-label="Previous photo"
                      className="flex size-8 items-center justify-center border transition-colors duration-200 hover:bg-white/5"
                      style={{ borderColor: "rgba(255,255,255,0.2)", color: "#E4E4E7" }}
                    >
                      <ChevronLeft className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => goTo(index + 1)}
                      aria-label="Next photo"
                      className="flex size-8 items-center justify-center border transition-colors duration-200 hover:bg-white/5"
                      style={{ borderColor: "rgba(255,255,255,0.2)", color: "#E4E4E7" }}
                    >
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {lightboxOpen && (
        <Lightbox
          slides={gallery}
          index={index}
          onNavigate={(next) => goTo(next)}
          onClose={() => {
            setLightboxOpen(false);
            imageButtonRef.current?.focus();
          }}
        />
      )}
    </header>
  );
}
