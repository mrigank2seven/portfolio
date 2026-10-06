import { impact } from "@/content/site";
import { Reveal, Section } from "./ui";

export default function Impact() {
  const stats = impact.filter((s) => !s.todo);
  if (stats.length === 0) return null;

  return (
    <Section id="impact" eyebrow="impact" title="Engineering Impact">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <li key={s.label}>
            <Reveal delay={(i % 4) * 0.06} className="h-full">
              <div className="h-full rounded-xl border border-line bg-surface p-5">
                <p className="font-mono text-3xl font-semibold text-accent">{s.value}</p>
                <p className="mt-2 text-sm text-muted">{s.label}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
