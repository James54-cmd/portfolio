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
  github: string;
  live: string;
};

export const projects: Project[] = [
  {
    path: "/projects/devflow",
    desc:
      "A real-time collaborative code editor with live preview, syntax highlighting, and WebSocket sync.",
    tech: ["React", "Node.js", "WebSocket", "Monaco"],
    github: "#",
    live: "#",
  },
  {
    path: "/projects/neuralstack",
    desc: "ML pipeline orchestrator with drag-and-drop DAG builder, job scheduling, and metrics dashboard.",
    tech: ["Next.js", "Python", "PostgreSQL", "Docker"],
    github: "#",
    live: "#",
  },
  {
    path: "/projects/vaultapi",
    desc: "Zero-trust secrets management API with AES-256 encryption, RBAC, and audit logging.",
    tech: ["NestJS", "Redis", "JWT", "AWS KMS"],
    github: "#",
    live: "#",
  },
  {
    path: "/projects/gridlauncher",
    desc: "E-commerce platform with headless CMS, Stripe integration, and edge-cached storefronts.",
    tech: ["Next.js", "Stripe", "MongoDB", "Vercel"],
    github: "#",
    live: "#",
  },
];

export const timeline = [
  {
    hash: "a3f1c9b",
    date: "2024-03",
    msg: "feat: joined TechCorp as Senior Fullstack Engineer",
    detail: "Led a team of 6, shipped 3 major product features.",
  },
  {
    hash: "d8e2f4a",
    date: "2023-06",
    msg: "feat: launched NeuralStack v1.0 to production",
    detail: "10k users in first month. Zero downtime.",
  },
  {
    hash: "f7b1e3d",
    date: "2022-09",
    msg: "chore: graduated B.Sc. Computer Science — UP Cebu",
    detail: "Thesis: Distributed ML inference at the edge.",
  },
  {
    hash: "c2a9b5f",
    date: "2021-03",
    msg: "init: first open source contribution merged",
    detail: "PR to React ecosystem library. 200+ ⭐ on own repo.",
  },
  {
    hash: "9e4d2c1",
    date: "2020-06",
    msg: "init: wrote first Hello World in JavaScript",
    detail: "The beginning of everything.",
  },
] as const;
