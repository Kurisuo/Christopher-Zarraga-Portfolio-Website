import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Vite config used by the GitHub Pages deployment workflow.
// It disables Nitro (Cloudflare Workers target) and enables static prerender
// so the build emits plain HTML/CSS/JS in dist/client.
export default defineConfig({
  tanstackStart: {
    // Keep the custom server entry for SSR error capture.
    server: { entry: "server" },
    // Static prerender for GitHub Pages (no server runtime).
    prerender: {
      enabled: true,
      crawlLinks: true,
      autoSubfolderIndex: true,
      failOnError: true,
    },
  },
  // Disable Nitro/Cloudflare Workers build so the SSR server entry can run
  // in Node during prerender and the final output is static files only.
  nitro: false,
  vite: {
    base: process.env['VITE_BASE_PATH'] || "/",
  },
});
