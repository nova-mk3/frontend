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

    // ✅ @ alias 추가
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "src"),
    };

    return config;
  },
  images: {
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
