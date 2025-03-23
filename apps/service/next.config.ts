import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === "production";
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
        destination: isProd
          ? "https://www.jinybook.site/api/v1/:path*" // 배포용
          : "http://localhost:8080/api/v1/:path*", // 개발용
      },
    ];
  },
};

export default nextConfig;
