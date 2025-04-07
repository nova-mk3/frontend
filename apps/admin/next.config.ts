import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const { NEXT_PUBLIC_API_BASE_URL } = process.env;

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: "standalone",
  // basePath: "/admin",   -> 이런기능이 잇었네, 폴더 옮기게해서 미안하다 범수야..
  assetPrefix: "/admin",
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nova.cbnu.ac.kr",
        port: "",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "**",
      },
    ],
  },
  compiler: isProd
    ? {
        removeConsole: {
          exclude: ["error", "warn"],
        },
      }
    : {},
  async rewrites() {
    return [
      {
        source: "/nova/:path*",
        destination: `${NEXT_PUBLIC_API_BASE_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
