import { education } from "@/content/site";
import { Reveal, Section } from "./ui";

export default function Education() {
  return (
    <Section id="education" eyebrow="education" title="Education">
      <Reveal>
        <div className="rounded-xl border border-line bg-surface p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-semibold">{education.school}</h3>
            <p className="font-mono text-sm text-accent">{education.period}</p>
          </div>
          <p className="mt-1 text-sm text-muted">{education.degree}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {education.courses.map((c) => (
              <li
                key={c}
                className="rounded-md border border-line px-2.5 py-1 text-xs text-muted"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
