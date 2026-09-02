/**
 * Resolve a file in `public/media/` to a URL that respects the deployment
 * base path (`/` on Lovable hosting, `/<repo>/` on GitHub Pages).
 */
export function media(name: string): string {
  const base = import.meta.env.BASE_URL || "/";
  return `${base.endsWith("/") ? base : `${base}/`}media/${name}`;
}
