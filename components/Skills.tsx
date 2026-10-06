import { skills } from "@/content/site";
import { Reveal, Section } from "./ui";

export default function Skills() {
  return (
    <Section id="skills" eyebrow="skills" title="Tech Stack">
      <p className="-mt-4 mb-6 max-w-2xl text-muted">Grouped by what each tool is used for.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((s, i) => (
          <Reveal key={s.group} delay={(i % 2) * 0.06}>
            <div className="h-full rounded-xl border border-line bg-surface p-5">
              <h3 className="flex items-baseline justify-between font-mono text-sm text-accent">
                {s.group}
                <span className="text-xs text-muted">{s.items.length}</span>
              </h3>
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
