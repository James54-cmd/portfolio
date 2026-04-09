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
  live?: string;
  video?: string;
  image?: string;
};

export const projects: Project[] = [
  {
    path: "/projects/abide",
    desc: "Faith-centered Bible app with verse highlights/notes/favorites and AI encouragement chat with history.",
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "OpenAI", "RAG"],
    github: "https://github.com/James54-cmd/abide",
    live: "https://abide-beta.vercel.app/login",
    video: "/images/projects/abide/abide-demo.mp4",
  },
  {
    path: "/projects/ondafit",
    desc: "Team project for booking courts and studios with operations dashboards and smart scheduling flows.",
    tech: ["Next.js", "TypeScript", "Supabase", "AI", "Figma"],
    live: "https://onda.fit/",
    video: "/images/projects/ondafit/ondafit.mp4",
  },
  {
    path: "/projects/portfolio",
    desc: "Cyber-terminal portfolio workspace showcasing skills, project galleries, timeline, and contact flow with interactive UI.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Spline", "Lucide", "Framer Motion"],
    github: "https://github.com/James54-cmd/portfolio",
    live: "https://portfolio-xi-two-93.vercel.app/",
    video: "/images/projects/portfolio/portfolio.mp4",
  },
  {
    path: "/projects/abide-mobile",
    desc: "Mobile-first Bible reading app UI built with Expo and React Native, focused on clean scripture navigation and devotional flow.",
    tech: ["React Native", "Expo", "TypeScript", "Mobile UI"],
    image: "/images/projects/abide-mobile/abide-mobile.png",
  },
  {
    path: "/projects/salario-ph",
    desc: "Philippines-first salary benchmarking tool with localized estimates, 13th month calculations, and city-specific comparisons for 10,000+ data points.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "shadcn/ui"],
    github: "https://github.com/James54-cmd/talent-valuation",
    live: "https://talent-valuation.vercel.app/",
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
