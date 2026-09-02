import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";
import galleryChess from "@/assets/gallery-chess.jpg";
import gallerySwim from "@/assets/gallery-swim.jpg";
import galleryCalisthenics from "@/assets/gallery-calisthenics.jpg";
import galleryPhotography from "@/assets/gallery-photography.jpg";

const interests = [
  "Chess (2000 Elo)",
  "Active trading",
  "Lap swimming",
  "Calisthenics",
  "35mm photography",
];

const gallery = [
  { src: galleryChess, alt: "Chess pieces on a board in warm light" },
  { src: gallerySwim, alt: "Swimmer doing butterfly stroke in a pool lane" },
  { src: galleryCalisthenics, alt: "Pull-ups on an outdoor bar at sunset" },
  { src: galleryPhotography, alt: "Reading a finance book beside a camera" },
];

export function OffTheKeyboard() {
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
    <section aria-label="Off the keyboard" className="portfolio-section py-16 lg:py-20">
      <Reveal>
        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Off the keyboard
          </span>
          <span className="text-[15px] leading-relaxed" style={{ color: "#B4B4BC" }}>
            {interests.join(" · ")}
          </span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="hobby-gallery"
            aria-label="Toggle hobby photo gallery"
            className="flex size-7 shrink-0 items-center justify-center self-center rounded-full border transition-colors duration-200 hover:bg-white/5"
            style={{ borderColor: "rgba(255,255,255,0.2)", color: "#E4E4E7" }}
          >
            <ChevronDown className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </button>
        </p>
      </Reveal>

      <div
        id="hobby-gallery"
        className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${open ? "mt-8 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
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
    </section>
  );
}
