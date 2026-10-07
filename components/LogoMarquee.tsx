import TechIcon from "./TechIcon";

const LOGOS = [
  "Python",
  "Django",
  "FastAPI",
  "Celery",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Git",
  "Bitbucket",
  "Go",
  "MySQL",
  "LangChain",
  "n8n",
  "Postman",
  "Jira",
  "LLMs",
  "OCR",
  "AI Agents",
  "Microservices",
] as const;

const WAVE_STEP_SECONDS = 0.45;

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 gap-4 pr-4" aria-hidden={hidden || undefined}>
      {LOGOS.map((name, i) => (
        <li
          key={name}
          title={name}
          style={{ animationDelay: `${-i * WAVE_STEP_SECONDS}s` }}
          className="animate-bob motion-reduce:animate-none grid size-16 shrink-0 place-items-center rounded-full border border-line bg-surface [&>svg]:size-7"
        >
          <TechIcon name={name} />
        </li>
      ))}
    </ul>
  );
}

export default function LogoMarquee() {
  return (
    <div
      role="group"
      aria-label="Tech stack"
      className="w-full overflow-hidden py-8 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]"
    >
      <div className="animate-marquee motion-reduce:animate-none flex w-max">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
