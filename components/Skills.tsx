import { skills } from "@/content/site";
import { Reveal, Section } from "./ui";

export default function Skills() {
  return (
    <Section id="skills" eyebrow="skills" title="Tech Stack">
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((s, i) => (
          <Reveal key={s.group} delay={(i % 2) * 0.06}>
            <div className="h-full rounded-xl border border-line bg-surface p-5">
              <h3 className="font-mono text-sm text-accent">{s.group}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-line px-2.5 py-1 text-sm text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
