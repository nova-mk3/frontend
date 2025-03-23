import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  output: "standalone",
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  // 평소 개발할때는 바꿔둬야할듯!
  async rewrites() {
    return [
      {
        source: "/nova/:path*",
        destination: "https://www.jinybook.site/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
