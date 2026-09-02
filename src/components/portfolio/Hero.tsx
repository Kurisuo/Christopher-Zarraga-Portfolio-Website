import { useEffect, useRef, useState } from "react";
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

const gallery = [
  { src: galleryChess, alt: "Chess pieces on a board in warm light" },
  { src: gallerySwim, alt: "Swimmer doing butterfly stroke in a pool lane" },
  { src: galleryCalisthenics, alt: "Pull-ups on an outdoor bar at sunset" },
  { src: galleryPhotography, alt: "Reading a finance book beside a camera" },
];

export function Hero() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const goTo = (next: number) => {
    const track = trackRef.current;
    if (!track) return;
    const target = ((next % gallery.length) + gallery.length) % gallery.length;
    const slide = track.children[target] as HTMLElement | undefined;
    if (slide) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const left = track.scrollLeft + slide.getBoundingClientRect().left - track.getBoundingClientRect().left;
      track.scrollTo({ left, behavior: reduced ? "auto" : "smooth" });
    }
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !open) return;
    const onScroll = () => {
      const slides = Array.from(track.children) as HTMLElement[];
      const trackLeft = track.getBoundingClientRect().left;
      let best = 0;
      let bestDist = Infinity;
      slides.forEach((slide, i) => {
        const dist = Math.abs(slide.getBoundingClientRect().left - trackLeft);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setIndex(best);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [open]);

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
          {stats.map((stat, index) => (
            <div key={stat.value + stat.label[0]} className={`flex min-w-0 flex-col items-center justify-center px-3 text-center ${index > 0 ? "border-l border-hairline" : ""}`}>
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
                className="outline-none focus-visible:ring-1 focus-visible:ring-foreground/40"
              >
                <div
                  ref={trackRef}
                  className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-1 motion-reduce:scroll-auto"
                >
                  {gallery.map((image) => (
                    <img
                      key={image.src}
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      width={1024}
                      height={1024}
                      className="aspect-square w-[70%] shrink-0 snap-start rounded-lg object-cover sm:w-[45%] lg:w-[30%]"
                    />
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="flex gap-2">
                    {gallery.map((image, i) => (
                      <button
                        key={image.src}
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
    </header>
  );
}
