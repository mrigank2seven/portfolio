import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
};

export type Post = PostMeta & { body: string };

function parsePost(slug: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  const title = typeof data.title === "string" ? data.title : "";
  // gray-matter parses bare YYYY-MM-DD as a Date
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? "");
  if (!title) throw new Error(`content/blog/${slug}.mdx: frontmatter "title" is required`);
  if (!DATE_RE.test(date)) {
    throw new Error(`content/blog/${slug}.mdx: frontmatter "date" must be YYYY-MM-DD, got "${date}"`);
  }
  return { slug, title, date, summary: String(data.summary ?? ""), body: content };
}

function listSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPost(slug: string): Post | null {
  if (!listSlugs().includes(slug)) return null;
  return parsePost(slug);
}

export function getAllPosts(): PostMeta[] {
  return listSlugs()
    .map(parsePost)
    .map((p) => ({ slug: p.slug, title: p.title, date: p.date, summary: p.summary }))
    .sort((a, b) => b.date.localeCompare(a.date));
}
