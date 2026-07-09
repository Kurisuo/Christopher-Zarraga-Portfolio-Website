// Static-export image loader for GitHub Pages: the site is served from a
// subpath (basePath), which next/image does not prepend on its own.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function imageLoader({ src }) {
  if (!basePath) return src;
  if (/^(https?:|data:|blob:)/.test(src)) return src;
  if (src.startsWith(`${basePath}/`)) return src;
  return `${basePath}${src}`;
}
