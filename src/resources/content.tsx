import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Christopher",
  lastName: "Zarraga",
  name: `Christopher Zarraga`,
  role: "Computer Science Student",
  avatar: "/images/christobal.jpg",
  email: "christopherzarraga31@gmail.com",
  location: "America/Los_Angeles",
  languages: ["English"],
  locale: "en",
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Kurisuo",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/christopher-zarraga/",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role.toLowerCase()}`,
  headline: <>Building systems at the intersection of AI and performance</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">NVPilot</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured project
        </Text>
      </Row>
    ),
    href: "/work/nvpilot",
  },
  subline: (
    <>
      I'm {person.firstName}, a {person.role.toLowerCase()} at{" "}
      <Text as="span" size="xl" weight="strong">UC Santa Cruz</Text>, researching AI safety and
      building systems software — from concurrent servers to GPU performance agents.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role.toLowerCase()} from Santa Cruz, CA`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        {person.firstName} is a Santa Cruz–based computer science student at the University of
        California, Santa Cruz, pursuing a B.S. in Computer Science with an Applied Mathematics
        minor (expected June 2028). He researches autonomous-vehicle safety at the AIEA Lab,
        builds full-stack tools at Tech4Good, and ships systems projects spanning concurrent
        servers, vector search, trading engines, and GPU performance tooling.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "AIEA Lab",
        timeframe: "May 2026 – Present",
        role: "Undergraduate AI Researcher",
        achievements: [
          <>
            Deployed CARLA, an Unreal Engine–based autonomous-driving simulator, headless on the
            Nautilus Kubernetes GPU cluster with PVC-backed storage, GPU-scheduled jobs, and custom
            YAML specs — and documented the process for the lab.
          </>,
          <>
            Validated the environment end-to-end by training a CNN classifier (PyTorch, CIFAR-10) on
            CUDA-scheduled jobs and running CARLA's Python API and Gym interface against the headless
            deployment.
          </>,
        ],
        images: [],
      },
      {
        company: "Tech4Good Lab",
        timeframe: "June 2026 – Present",
        role: "Undergraduate Full-Stack Researcher",
        achievements: [
          <>
            Built a standalone Angular component (OnPush change detection, Signals-driven inline
            editing, Angular CDK autosizing) in the lab's TypeScript / Angular Material codebase.
          </>,
        ],
        images: [],
      },
      {
        company: "Perspective Paint",
        timeframe: "June 2025 – May 2026",
        role: "Web Developer",
        achievements: [
          <>
            Grew a freelance client's organic search traffic 45% over ~3 months (Google Analytics)
            by building and deploying a responsive vanilla HTML/CSS/JS site with caching, asset
            compression, and optimized metadata — won via cold outreach and shipped solo.
          </>,
        ],
        images: [],
      },
      {
        company: "Lando Interactive",
        timeframe: "October 2025 – March 2026",
        role: "Coding Instructor",
        achievements: [
          <>
            Solo lead instructor for K–5 coding classes of 25 students across 10 elementary campuses;
            contributed curriculum critiques and applied a metacognitive, peer problem-solving
            teaching approach.
          </>,
        ],
        images: [],
      },
      {
        company: "Independent Card Trading (Pokémon)",
        timeframe: "2024 – 2025",
        role: "Self-Directed",
        achievements: [
          <>
            Generated ~$15K profit (~$5K cost of goods) reselling collectible cards and brokering
            buyer–seller deals against live market demand.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "University of California, Santa Cruz",
        description: (
          <>
            B.S. Computer Science with an Applied Mathematics minor (expected June 2028). Sabatte
            Family Full Ride Scholarship — first cohort recipient. Relevant coursework includes
            XAI for Healthcare, Parallel Programming, Software Engineering, Systems Design,
            Artificial Intelligence, and Databases.
          </>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "Languages",
        description: (
          <>Core languages for systems programming, application development, and data work.</>
        ),
        tags: [
          { name: "C" },
          { name: "C++" },
          { name: "Python" },
          { name: "TypeScript", icon: "javascript" },
          { name: "SQL" },
        ],
        images: [],
      },
      {
        title: "Systems & Infrastructure",
        description: (
          <>
            Tools and concepts for building performant, concurrent, and production-ready systems.
          </>
        ),
        tags: [
          { name: "Linux" },
          { name: "Kubernetes" },
          { name: "Docker" },
          { name: "POSIX" },
          { name: "CMake" },
          { name: "Git" },
          { name: "Bash" },
        ],
        images: [],
      },
      {
        title: "AI / ML",
        description: (
          <>
            Frameworks and libraries for machine learning research, inference pipelines, and GPU
            telemetry.
          </>
        ),
        tags: [
          { name: "PyTorch" },
          { name: "NumPy" },
          { name: "Pandas" },
          { name: "Scikit-Learn" },
          { name: "NVML" },
          { name: "Gymnasium" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about systems, AI, and engineering",
  description: `Read what ${person.name} has been up to recently`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Systems, AI, and software projects by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
