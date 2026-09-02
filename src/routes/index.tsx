import { createFileRoute } from "@tanstack/react-router";
import { PillNav } from "@/components/portfolio/PillNav";
import { ProfileCard } from "@/components/portfolio/ProfileCard";
import { Hero } from "@/components/portfolio/Hero";
import { FirstProject } from "@/components/portfolio/FirstProject";
import { UCSC } from "@/components/portfolio/UCSC";
import { MoreProjects } from "@/components/portfolio/MoreProjects";
import { OffTheKeyboard } from "@/components/portfolio/OffTheKeyboard";
import { Contact } from "@/components/portfolio/Contact";

const title = "Christopher Zarraga Jimenez — CS Student & Builder";
const description =
  "Computer Science and Applied Math at UC Santa Cruz. From a first Replit project to NVPilot at the NVIDIA campus hackathon — projects, code, and contact.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="portfolio-scroll min-h-screen bg-background text-foreground">
      <PillNav />
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:grid lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[minmax(0,360px)_minmax(0,1fr)] xl:gap-16 2xl:gap-20">
        <aside className="hidden lg:block">
          <div className="sticky top-0 flex h-screen items-center py-24">
            <ProfileCard />
          </div>
        </aside>

        <div className="min-w-0">
          <Hero />
          <FirstProject />
          <UCSC />
          <MoreProjects />
          <Contact />
        </div>
      </div>
    </main>
  );
}
