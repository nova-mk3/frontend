import path from "path";
import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: "standalone",
  webpack: (config) => {
    // SVG loader 추가
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nova.cbnu.ac.kr",
        pathname: "/files/public/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "**",
      },
    ],
    deviceSizes: [320, 420, 700, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  compiler: isProd
    ? {
        removeConsole: {
          exclude: ["error", "warn"],
        },
      }
    : {},

  async rewrites() {
    if (!isProd) return [];

    return [
      {
        source: "/files/public/:path*",
        destination: "http://localhost:4001/files/public/:path*",
      },
    ];
  },
};

export default nextConfig;
