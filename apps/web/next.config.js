const withTM = require("next-transpile-modules")(["ui"]);
const path = require("path");
const fs = require("fs");

const version = require("next/package.json").version;

console.log("version", version);

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  env: {
    // Expose Next.js version in the browser.
    NEXT_PUBLIC_NEXT_VERSION: version,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    runtime: "experimental-edge",
  },
  async redirects() {
    return [
      {
        source: '/ssr',
        destination: '/',
        permanent: true,
      },
    ]
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  webpack: (config, context) => {
    if (context.isServer && context.nextRuntime === "edge" && !context.dev) {
      config.optimization.splitChunks.minSize = 0;
      config.optimization.splitChunks.minChunks = 1;
    }
    
    return config;
  }
}

module.exports = withTM(baseConfig);
