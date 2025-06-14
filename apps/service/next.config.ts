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
        pathname: "**",
        port: "",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "**",
      },
    ],
    deviceSizes: [360, 414, 768, 1024, 1280, 1440, 1920],
  },
  compiler: isProd
    ? {
        removeConsole: {
          exclude: ["error", "warn"],
        },
      }
    : {},
};

export default nextConfig;
