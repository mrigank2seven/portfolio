import { ArrowUpRight, Download, Mail } from "lucide-react";
import { profile } from "@/content/site";
import { Reveal, Section } from "./ui";

const linkClass =
  "inline-flex items-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent";

export default function Contact() {
  return (
    <Section id="contact" eyebrow="contact" title="Let's Talk">
      <Reveal>
        <p className="max-w-xl text-lg leading-relaxed text-muted">
          Have a lending, payments or document-automation problem? I&apos;d like to hear about it.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
          >
            <Mail className="size-4" />
            {profile.email}
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
            LinkedIn
            <ArrowUpRight className="size-4" />
          </a>
          <a href={profile.resume} download className={linkClass}>
            <Download className="size-4" />
            Resume
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
