import {
  Activity,
  Boxes,
  Bot,
  Brain,
  Database,
  DatabaseZap,
  Infinity as InfinityIcon,
  Network,
  PencilRuler,
  ScanText,
  ScrollText,
  Warehouse,
  Webhook,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  siCelery,
  siDjango,
  siDocker,
  siFastapi,
  siGit,
  siGo,
  siJira,
  siLangchain,
  siMysql,
  siN8n,
  siPostgresql,
  siPostman,
  siPython,
  siRedis,
  type SimpleIcon,
} from "simple-icons";
import { INLINE_LOGOS } from "./inline-logos";

type Brand = { icon: SimpleIcon; color?: string };

// Brand colors that vanish on the dark theme get a lighter variant.
const BRANDS: Record<string, Brand> = {
  Python: { icon: siPython },
  Go: { icon: siGo },
  Django: { icon: siDjango, color: "#44B78B" },
  "Django REST Framework": { icon: siDjango, color: "#44B78B" },
  FastAPI: { icon: siFastapi },
  Celery: { icon: siCelery },
  PostgreSQL: { icon: siPostgresql },
  MySQL: { icon: siMysql },
  Redis: { icon: siRedis },
  Docker: { icon: siDocker },
  Git: { icon: siGit },
  Jira: { icon: siJira, color: "#2684FF" },
  Postman: { icon: siPostman },
  LangChain: { icon: siLangchain },
  n8n: { icon: siN8n },
};

// Practices with no brand logo.
const CONCEPT_ICONS: Record<string, LucideIcon> = {
  "CI/CD": InfinityIcon,
  Logging: ScrollText,
  Monitoring: Activity,
  OCR: ScanText,
  LLMs: Brain,
  "AI Agents": Bot,
  "Async Processing": Workflow,
  SQL: Database,
  "Data Warehousing": Warehouse,
  Microservices: Boxes,
  "Event-Driven Architecture": Zap,
  "Distributed Systems": Network,
  "System Design": PencilRuler,
  "REST API Design": Webhook,
  "Database Optimization": DatabaseZap,
};

export default function TechIcon({ name }: { name: string }) {
  const brand = BRANDS[name];
  if (brand) {
    return (
      <svg
        viewBox="0 0 24 24"
        className="size-4 shrink-0"
        fill={brand.color ?? `#${brand.icon.hex}`}
        aria-hidden="true"
      >
        <path d={brand.icon.path} />
      </svg>
    );
  }
  const Concept = CONCEPT_ICONS[name];
  if (Concept) return <Concept className="size-4 shrink-0 text-accent" aria-hidden="true" />;
  const logo = INLINE_LOGOS[name];
  if (logo) {
    return (
      <svg
        viewBox={`0 0 ${logo.width} ${logo.height}`}
        className="size-4 shrink-0 text-fg"
        fill="currentColor"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: logo.body }}
      />
    );
  }
  return <span className="size-1.5 shrink-0 rounded-full bg-accent/60" aria-hidden="true" />;
}
