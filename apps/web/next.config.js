// @ts-expect-error idk why
const path = require("path");
const fs = require("fs");
const NextflareWebpackPlugin = require("nextflare/dist/webpack").default;

// Fix serialisation of BigInts
BigInt.prototype.toJSON = function() { return this.toString() }

const version = require("next/package.json").version;

console.log("version", version);

const getEntries = async (entry) => {
  const entries = await entry();
  return {
    ...entries,
    "server.js": path.join(__dirname, "server.js"),
  };
}

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  swcMinify: false,
  env: {
    // Expose Next.js version in the browser.
    NEXT_PUBLIC_NEXT_VERSION: version,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    appDir: true,
    runtime: "experimental-edge",
    legacyBrowsers: false,
    browsersListForSwc: true,
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
  webpack(config, context) {
    if (context.isServer && context.nextRuntime === "edge" && !context.dev) {
      config.optimization.splitChunks.minSize = 0;
      config.optimization.splitChunks.minChunks = 1;
      //config.plugins.push(new NextflareWebpackPlugin());
      // Disable minification
      config.optimization.minimize = false;

      // console.log("config entry", config.entry);

      // return Object.assign({}, config, { entry: function() {
      //   return config.entry().then((entry) => {
      //     /// get all pages from entries
      //     const pages = Object.keys(entry).filter((key) => key.startsWith("pages/"));
      //     // Get all pages to loader including app and document
      //     return Object.assign({}, entry, { 'cloudflare-server': path.join(__dirname, "cloudflare-server.ts") });
      //   })
      // }})
    }
    return config;
  }
}

module.exports = baseConfig;
