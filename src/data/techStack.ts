import { Database, FileText, GitBranch, Layout, Server } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface TechItem {
  name: string;
  status: "current" | "planned";
}

export interface TechCategory {
  title: string;
  icon: LucideIcon;
  items: TechItem[];
}

export const techStack: TechCategory[] = [
  {
    title: "Frontend",
    icon: Layout,
    items: [
      { name: "React", status: "current" },
      { name: "TypeScript", status: "current" },
      { name: "Vite", status: "current" },
      { name: "React Router", status: "current" },
      { name: "Tailwind CSS", status: "current" },
      { name: "Lucide Icons", status: "current" },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    items: [
      { name: "Python", status: "current" },
      { name: "FastAPI", status: "current" },
      { name: "Uvicorn", status: "current" },
      { name: "REST API", status: "current" },
    ],
  },
  {
    title: "Document processing",
    icon: FileText,
    items: [
      { name: "LibreOffice", status: "current" },
      { name: "pypdf", status: "current" },
      { name: "Pillow", status: "current" },
      { name: "Report Lab", status: "current" },
    ],
  },
  {
    title: "Deployment & infrastructure",
    icon: Database,
    items: [
      { name: "Docker", status: "current" },
      { name: "Vercel", status: "current" },
      { name: "Render", status: "current" },
    ],
  },
  {
    title: "Development",
    icon: GitBranch,
    items: [
      { name: "Git", status: "current" },
      { name: "GitHub", status: "current" },
    ],
  },
  {
    title: "Database",
    icon: Database,
    items: [{ name: "PostgreSQL", status: "planned" }],
  },
];
