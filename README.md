# Portfolio

Personal portfolio for Mrigank Gupta. Next.js (App Router) exported as a fully static site (`output: "export"`): no server, no runtime.

## Develop

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL
npm run dev
```

Other scripts: `npm run lint`, `npm run build` (writes static site to `out/`).

## Environment

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | production builds | Canonical URL, Open Graph tags, `sitemap.xml`, `robots.txt`. The build fails if unset. |
| `DEV_ORIGIN` | no | Extra origin allowed to load the dev server (e.g. a phone on your LAN). |

## Content

- **Page content** lives in `content/site.ts` (profile, experience, projects, diagrams, skills, impact, education). Components are presentational.
  - Impact stats with `todo: true` are hidden until you replace the placeholder value and remove the flag.
- **Blog posts** are `content/blog/<slug>.mdx` with frontmatter. Invalid frontmatter fails the build.

  ```mdx
  ---
  title: Post title
  date: 2026-01-31   # YYYY-MM-DD
  summary: One-line summary shown in lists and link previews.
  ---
  ```

## Structure

```
app/            routes: /, /blog, /blog/[slug], opengraph-image, sitemap, robots
components/     section components + client islands (Nav, CommandPalette, ThemeToggle, FlowDiagram)
content/        site.ts and blog/*.mdx
lib/            blog loader (build-time fs), site URL helper
```

## Deploy

Build with `NEXT_PUBLIC_SITE_URL` set and publish the `out/` directory to any static host (Vercel, Netlify, Cloudflare Pages, S3 + CDN). CI (`.github/workflows/ci.yml`) runs lint and build and fails if placeholder `TODO` text reaches the output.
