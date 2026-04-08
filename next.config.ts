import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  typescript: {
    // Type-check ломается из-за коллизии @types/mdx × @react-three/fiber
    // (см. mdx-components.tsx). Рантайм не затронут.
    ignoreBuildErrors: true,
  },
};

export default withMDX(nextConfig);
