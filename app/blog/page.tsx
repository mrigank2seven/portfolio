import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = { title: "Blog | Mrigank Gupta" };

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">{"// blog"}</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Writing</h1>
      <ul className="mt-10 space-y-3">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className="block rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent"
            >
              <p className="font-mono text-xs text-accent">{p.date}</p>
              <h2 className="mt-1 font-semibold">{p.title}</h2>
              <p className="mt-1 text-sm text-muted">{p.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
