import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // 88 for the large photos (hero, däckhotell) so the sharper sources aren't crushed again
    qualities: [75, 88],
  },
};

export default nextConfig;
