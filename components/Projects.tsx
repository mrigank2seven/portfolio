import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { projects, type Project } from "@/content/site";
import Highlight from "./Highlight";
import { Reveal, Section } from "./ui";

const CARD_CLASS =
  "flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-accent";

function CardBody({ p }: { p: Project }) {
  return (
    <>
      {p.highlight && (
        <p className="mb-3 w-fit rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-xs text-accent">
          {p.highlight}
        </p>
      )}
      <h3 className="font-semibold">{p.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        <Highlight text={p.blurb} />
      </p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {p.tags.map((t) => (
          <li key={t} className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
            {t}
          </li>
        ))}
      </ul>
      {p.slug && (
        <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
          Read case study
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </p>
      )}
    </>
  );
}

export default function Projects() {
  return (
    <Section id="projects" eyebrow="projects" title="Things I've Built">
      <p className="-mt-4 mb-8 max-w-2xl text-muted">
        Selected work: what I built, why it mattered, and the outcome. Open a case study for the full story.
      </p>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <li key={p.title}>
            <Reveal delay={(i % 3) * 0.06} className="h-full">
              {p.slug ? (
                <Link href={`/projects/${p.slug}`} className={`group ${CARD_CLASS}`}>
                  <CardBody p={p} />
                </Link>
              ) : (
                <article className={CARD_CLASS}>
                  <CardBody p={p} />
                </article>
              )}
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
