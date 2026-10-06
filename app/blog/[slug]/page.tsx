import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost } from "@/lib/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: `${post.title} | Mrigank Gupta`, description: post.summary };
}

export default async function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link href="/blog" className="text-sm text-muted hover:text-fg">
        ← All posts
      </Link>
      <p className="mt-8 font-mono text-xs text-accent">{post.date}</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">{post.title}</h1>
      <div className="post mt-6">
        <MDXRemote source={post.body} />
      </div>
    </article>
  );
}
