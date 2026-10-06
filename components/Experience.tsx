import { experience } from "@/content/site";
import Highlight from "./Highlight";
import { Reveal, Section } from "./ui";

export default function Experience() {
  return (
    <Section id="experience" eyebrow="experience" title="Where I've Shipped">
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <h3 className="text-xl font-semibold">
              {experience.role} <span className="text-muted">@ {experience.company}</span>
            </h3>
            <p className="mt-1 text-sm text-muted">{experience.place}</p>
            <p className="mt-3 max-w-2xl text-muted">
              <Highlight text={experience.summary} />
            </p>
          </div>
          <p className="font-mono text-sm text-accent">{experience.period}</p>
        </div>
      </Reveal>

      <div className="mt-8 space-y-4 border-l border-line pl-6">
        {experience.groups.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.05}>
            <article className="relative rounded-xl border border-line bg-surface p-5">
              <span
                aria-hidden
                className="absolute -left-[31px] top-6 size-2.5 rounded-full bg-accent"
              />
              <h4 className="font-mono text-sm text-accent">{g.title}</h4>
              <ul className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
                {g.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-muted" />
                    <span><Highlight text={p} /></span>
                  </li>
                ))}
              </ul>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {g.tags.map((t) => (
                  <li key={t} className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
