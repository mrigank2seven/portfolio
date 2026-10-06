import { projects } from "@/content/site";
import Highlight from "./Highlight";
import { Reveal, Section } from "./ui";

export default function Projects() {
  return (
    <Section id="projects" eyebrow="projects" title="Things I've Built">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <li key={p.title}>
            <Reveal delay={(i % 3) * 0.06} className="h-full">
              <article className="flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-accent">
                {p.highlight && (
                  <p className="mb-3 w-fit rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-xs text-accent">
                    {p.highlight}
                  </p>
                )}
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted"><Highlight text={p.blurb} /></p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
