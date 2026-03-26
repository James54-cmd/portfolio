import type { SkillIconKey } from "./skillIcons";

export type SkillItem = {
  readonly name: string;
  readonly icon: SkillIconKey;
};

export const skills: {
  frontend: readonly SkillItem[];
  backend: readonly SkillItem[];
  tools: readonly SkillItem[];
  soft: readonly SkillItem[];
} = {
  frontend: [
    { name: "React", icon: "layers" },
    { name: "Next.js", icon: "appWindow" },
    { name: "TypeScript", icon: "fileType" },
    { name: "Tailwind CSS", icon: "wind" },
    { name: "HTML", icon: "fileCode2" },
    { name: "CSS", icon: "paintbrush" },
    { name: "Three.js", icon: "box" },
    { name: "Shadcn UI", icon: "blocks" },
    { name: "Lucide", icon: "sparkles" },
  ],
  backend: [
    { name: "Node.js", icon: "server" },
    { name: "Next.js", icon: "appWindow" },
    { name: "NestJS", icon: "hexagon" },
    { name: "PostgreSQL", icon: "database" },
    { name: "MySQL", icon: "table2" },
    { name: "NoSQL", icon: "layers2" },
    { name: "Supabase", icon: "zap" },
    { name: "PHP", icon: "fileCode" },
  ],
  tools: [
    { name: "Git", icon: "gitBranch" },
    { name: "Figma", icon: "penTool" },
    { name: "Cursor", icon: "mousePointer2" },
    { name: "ChatGPT", icon: "messageSquare" },
    { name: "Claude", icon: "bot" },
  ],
  soft: [
    { name: "Leadership", icon: "leadership" },
    { name: "Hardworking", icon: "hardworking" },
    { name: "Communication", icon: "communication" },
    { name: "Collaboration", icon: "collaboration" },
    { name: "Problem-solving", icon: "problemSolving" },
    { name: "Adaptability", icon: "adaptability" },
    { name: "Time management", icon: "timeManagement" },
    { name: "Empathy", icon: "empathy" },
    { name: "Critical thinking", icon: "criticalThinking" },
    { name: "Accountability", icon: "accountability" },
  ],
};

export type Project = {
  path: string;
  desc: string;
  tech: string[];
  github?: string;
  live: string;
  images?: string[];
};

export const projects: Project[] = [
  {
    path: "/projects/abide",
    desc: "Faith-centered Bible app with verse highlights/notes/favorites and AI encouragement chat with history.",
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "OpenAI", "RAG"],
    github: "https://github.com/James54-cmd/abide",
    live: "https://abide-beta.vercel.app/login",
    images: [
      "/images/projects/abide/01-login.png",
      "/images/projects/abide/02-home.png",
      "/images/projects/abide/03-chat.png",
      "/images/projects/abide/04-bible.png",
      "/images/projects/abide/05-favorites.png",
      "/images/projects/abide/06-verses.png",
    ],
  },
  {
    path: "/projects/ondafit",
    desc: "Team project for booking courts and studios with operations dashboards and smart scheduling flows.",
    tech: ["Next.js", "TypeScript", "Supabase", "AI", "Figma"],
    live: "https://onda.fit/",
    images: [
      "/images/projects/ondafit/01-dashboard.png",
      "/images/projects/ondafit/02-facilities.png",
      "/images/projects/ondafit/03-schedules.png",
      "/images/projects/ondafit/04-events.png",
      "/images/projects/ondafit/05-reviews.png",
      "/images/projects/ondafit/06-transactions.png",
    ],
  },
  {
    path: "/projects/portfolio",
    desc: "Cyber-terminal portfolio workspace showcasing skills, project galleries, timeline, and contact flow with interactive UI.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Spline", "Lucide", "Framer Motion"],
    github: "https://github.com/James54-cmd/portfolio",
    live: "https://portfolio-xi-two-93.vercel.app/",
    images: ["/images/projects/portfolio/01-hero.png"],
  },
];

export const timeline = [
  {
    hash: "e1b7a2c",
    date: "2025-08 to 2026-03 (8 mos)",
    msg: "feat: joined Abstract Digital as Full-Time Web Developer",
    detail: "Built web applications using Next.js, Supabase, TypeScript, Visual Studio Code, and Cursor.",
  },
  {
    hash: "a3f1c9b",
    date: "2025-01 to 2025-04",
    msg: "feat: interned at Mandaue City Hall",
    detail: "Built a school management system for Mandaue City College using .NET web development, C#, Visual Studio, and MySQL.",
  },
] as const;
