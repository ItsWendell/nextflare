const withTM = require("next-transpile-modules")(["ui"]);
const path = require("path");
const fs = require("fs");
const NextflareWebpackPlugin = require("nextflare/dist/webpack").default;

console.log("NextflareWebpackPlugin", NextflareWebpackPlugin)

// Fix serialisation of BigInts
BigInt.prototype.toJSON = function() { return this.toString() }

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
    ignoreBuildErrors: true,
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
    ignoreDuringBuilds: true,
  },
  webpack: (config, context) => {
    if (context.isServer && context.nextRuntime === "edge" && !context.dev) {
      config.optimization.splitChunks.minSize = 0;
      config.optimization.splitChunks.minChunks = 1;
      config.plugins.push(new NextflareWebpackPlugin());
      //console.log("[next.config.js] Edge context", JSON.stringify(context, null, 2));
      // console.log("[next.config.js] Edge config", JSON.stringify(config, null, 2));
    }
    
    return config;
  }
}

module.exports = withTM(baseConfig);
