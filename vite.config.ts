// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

/**
 * TanStack Start's prerender preview server derives the expected server
 * entry filename from the configured input name ("server" -> "server.js"),
 * but Nitro emits the server bundle as "index.mjs". This Nitro hook copies
 * the emitted entry to the name the preview server looks for so prerendering
 * can run; the file is harmless in the final static output.
 */
function copyServerEntryForPrerender(nitro: any) {
  const indexPath = join(nitro.options.output.serverDir, "index.mjs");
  const serverPath = join(nitro.options.output.serverDir, "server.js");
  if (existsSync(indexPath) && !existsSync(serverPath)) {
    copyFileSync(indexPath, serverPath);
  }
}

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Static prerender for GitHub Pages (no server runtime).
    prerender: {
      enabled: true,
      crawlLinks: true,
      autoSubfolderIndex: true,
      failOnError: true,
    },
  },
  nitro: ({
    hooks: {
      compiled: copyServerEntryForPrerender,
    },
  } as any),
  vite: {
    base: process.env['VITE_BASE_PATH'] || "/",
    resolve: {
      dedupe: ["react", "react-dom", "three", "@react-three/fiber", "@react-three/drei"],
    },
    optimizeDeps: {
      include: ["three", "@react-three/fiber", "@react-three/drei"],
    },
  },
});
