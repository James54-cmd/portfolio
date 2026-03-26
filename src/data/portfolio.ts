export const skills = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "Three.js"],
  backend: ["Node.js", "Express", "NestJS", "PostgreSQL", "MongoDB", "Redis"],
  tools: ["Docker", "Git", "CI/CD", "AWS", "Figma", "Linux"],
} as const;

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
