import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // 88 for the large photos (hero, däckhotell) so the sharper sources aren't crushed again
    qualities: [75, 88],
  },
  // CRiNTRO: the film and its phone frames are cached hard so a second visit opens in ~2 s
  async headers() {
    return [
      { source: "/video/m/:file*", headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" }] },
      { source: "/video/:file(irondack-.*)", headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }] },
    ];
  },
};

export default nextConfig;
