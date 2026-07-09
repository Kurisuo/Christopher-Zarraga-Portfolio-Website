import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages. basePath is set by the deploy workflow
  // because the site is served from /<repo-name>/ instead of the domain root.
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  images: {
    loader: "custom",
    loaderFile: "./image-loader.js",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "**",
      },
    ],
  },
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default withMDX(nextConfig);
