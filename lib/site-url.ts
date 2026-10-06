const DEV_FALLBACK = "http://localhost:3000";

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  if (url) {
    if (!/^https?:\/\//.test(url)) {
      throw new Error(`NEXT_PUBLIC_SITE_URL must start with http:// or https://, got "${url}".`);
    }
    return url.replace(/\/+$/, "");
  }
  if (process.env.NODE_ENV === "production") {
    throw new Error("NEXT_PUBLIC_SITE_URL must be set for production builds (see .env.example).");
  }
  return DEV_FALLBACK;
}
