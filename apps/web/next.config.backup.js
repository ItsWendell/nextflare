const withTM = require("next-transpile-modules")(["ui"]);
const path = require("path");
const fs = require("fs");

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: false,
  experimental: {
    runtime: "experimental-edge",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, context) => {
    if (context.isServer) {
      config.optimization.splitChunks.minSize = 0;
      config.optimization.splitChunks.minChunks = 1;
    }
    return config;
  }
}

module.exports = withTM(baseConfig);
