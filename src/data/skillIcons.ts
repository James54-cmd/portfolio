import {
  Activity,
  Bot,
  Brain,
  Clock,
  Flame,
  HeartHandshake,
  Lightbulb,
  MessageCircle,
  MousePointer2,
  RefreshCw,
  Sparkles,
  UserRound,
  UsersRound,
} from "lucide-react";
import type { ComponentType } from "react";
import type { IconType } from "react-icons";
import {
  SiCss,
  SiFigma,
  SiGit,
  SiHtml5,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPhp,
  SiPostgresql,
  SiReact,
  SiShadcnui,
  SiSupabase,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
} from "react-icons/si";

/** Lucide icons keyed for the skills section (pairs with `skills` in portfolio.ts). */
export const SKILL_ICONS = {
  layers: SiReact,
  appWindow: SiNextdotjs,
  fileType: SiTypescript,
  wind: SiTailwindcss,
  fileCode2: SiHtml5,
  paintbrush: SiCss,
  box: SiThreedotjs,
  blocks: SiShadcnui,
  sparkles: Sparkles,
  server: SiNodedotjs,
  hexagon: SiNestjs,
  database: SiPostgresql,
  table2: SiMysql,
  layers2: UserRound,
  zap: SiSupabase,
  fileCode: SiPhp,
  gitBranch: SiGit,
  penTool: SiFigma,
  mousePointer2: MousePointer2,
  messageSquare: SiOpenai,
  bot: Bot,
  leadership: UserRound,
  hardworking: Flame,
  communication: MessageCircle,
  collaboration: UsersRound,
  problemSolving: Lightbulb,
  adaptability: RefreshCw,
  timeManagement: Clock,
  empathy: HeartHandshake,
  criticalThinking: Brain,
  accountability: Activity,
} as const;

export type SkillIconKey = keyof typeof SKILL_ICONS;

type SkillIconComponent = IconType | ComponentType<{ className?: string }>;

export function getSkillIcon(key: SkillIconKey): SkillIconComponent {
  return SKILL_ICONS[key];
}
