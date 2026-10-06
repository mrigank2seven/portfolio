import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  body: string;
};

function parseCaseStudy(slug: string): CaseStudy {
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  const title = typeof data.title === "string" ? data.title : "";
  if (!title) throw new Error(`content/projects/${slug}.mdx: frontmatter "title" is required`);
  const stack = Array.isArray(data.stack) ? data.stack.map(String) : [];
  return { slug, title, summary: String(data.summary ?? ""), stack, body: content };
}

export function getCaseStudySlugs(): string[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getCaseStudy(slug: string): CaseStudy | null {
  if (!getCaseStudySlugs().includes(slug)) return null;
  return parseCaseStudy(slug);
}
