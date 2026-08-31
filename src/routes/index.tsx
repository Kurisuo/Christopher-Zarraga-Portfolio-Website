import { createFileRoute } from "@tanstack/react-router";
import { PillNav } from "@/components/portfolio/PillNav";
import { Hero } from "@/components/portfolio/Hero";
import { FirstProject } from "@/components/portfolio/FirstProject";
import { UCSC } from "@/components/portfolio/UCSC";
import { MoreProjects } from "@/components/portfolio/MoreProjects";
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
    <main className="min-h-screen bg-background text-foreground">
      <PillNav />
      <Hero />
      <FirstProject />
      <UCSC />
      <MoreProjects />
      <Contact />
    </main>
  );
}
