import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getCaseStudy, getCaseStudySlugs } from "@/lib/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return { title: `${study.title} | Mrigank Gupta`, description: study.summary };
}

export default async function CaseStudyPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link href="/#projects" className="text-sm text-muted hover:text-fg">
        ← All projects
      </Link>
      <p className="mt-8 font-mono text-xs text-accent">{"// case study"}</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">{study.title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{study.summary}</p>
      {study.stack.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {study.stack.map((t) => (
            <li key={t} className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
              {t}
            </li>
          ))}
        </ul>
      )}
      <div className="post mt-6">
        <MDXRemote source={study.body} />
      </div>
    </article>
  );
}
