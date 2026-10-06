import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { aboutStats, profile } from "@/content/site";
import Highlight from "./Highlight";
import { Reveal, Section } from "./ui";

export default function About() {
  const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", "profile.webp"));

  return (
    <Section id="about" eyebrow="about" title="Backend Engineer for Money-Moving Systems">
      <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-start">
        <Reveal>
          {hasPhoto ? (
            <Image
              src="/profile.webp"
              alt={profile.name}
              width={160}
              height={160}
              className="size-40 rounded-2xl border border-line object-cover"
            />
          ) : (
            <div
              aria-hidden
              className="grid size-40 place-items-center rounded-2xl border border-line bg-surface font-mono text-4xl text-accent"
            >
              {profile.initials}
            </div>
          )}
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg leading-relaxed text-muted"><Highlight text={profile.summary} /></p>
        </Reveal>
      </div>

      <dl className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {aboutStats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <div className="h-full rounded-xl border border-line bg-surface p-5">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-mono text-2xl font-semibold text-accent">{s.value}</dd>
              <p className="mt-2 text-sm text-muted" aria-hidden>
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
