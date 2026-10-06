import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Reveal, Section } from "./ui";

export default function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <Section id="blog" eyebrow="blog" title="Writing">
      {posts.length === 0 ? (
        <p className="text-muted">No posts yet.</p>
      ) : (
        <ul className="space-y-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <Reveal>
                <Link
                  href={`/blog/${p.slug}`}
                  className="block rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent"
                >
                  <p className="font-mono text-xs text-accent">{p.date}</p>
                  <h3 className="mt-1 font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted">{p.summary}</p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      )}
      <Link href="/blog" className="mt-6 inline-block text-sm text-accent hover:underline">
        All posts →
      </Link>
    </Section>
  );
}
