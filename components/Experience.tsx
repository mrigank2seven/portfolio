import { experience } from "@/content/site";
import { Reveal, Section } from "./ui";

export default function Experience() {
  return (
    <Section id="experience" eyebrow="experience" title="Where I've shipped">
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <h3 className="text-xl font-semibold">
              {experience.role} <span className="text-muted">@ {experience.company}</span>
            </h3>
            <p className="mt-1 text-sm text-muted">{experience.place}</p>
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
                    <span>{p}</span>
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
