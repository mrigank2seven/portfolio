import { impact } from "@/content/site";
import { Reveal, Section } from "./ui";

export default function Impact() {
  return (
    <Section id="impact" eyebrow="impact" title="Engineering impact">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {impact.map((s, i) => (
          <li key={s.label}>
            <Reveal delay={(i % 3) * 0.06} className="h-full">
              <div
                className={`h-full rounded-xl border p-5 ${
                  s.todo ? "border-dashed border-line" : "border-line bg-surface"
                }`}
              >
                <p
                  className={`font-mono text-3xl font-semibold ${
                    s.todo ? "text-muted" : "text-accent"
                  }`}
                >
                  {s.value}
                </p>
                <p className="mt-2 text-sm text-muted">{s.label}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
