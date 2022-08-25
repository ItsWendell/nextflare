var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// next.config.js
var require_next_config = __commonJS({
  "next.config.js"(exports2, module2) {
    "use strict";
    var withTM = require("../../home/wmisiedjan/Projects/itswendell/build-api-workers/apps/web/node_modules/next-transpile-modules/src/next-transpile-modules.js")(["ui"]);
    var path = require("path");
    var fs = require("fs");
    var baseConfig = {
      reactStrictMode: true,
      poweredByHeader: false,
      compress: false,
      experimental: {
        runtime: "experimental-edge"
      },
      webpack: (config, context) => {
        if (context.isServer) {
          config.optimization.splitChunks.minSize = 0;
          config.optimization.splitChunks.minChunks = 1;
        }
        return config;
      }
    };
    module2.exports = withTM(baseConfig);
  }
});

// next.config.2.js
var nextConfig = {};
try {
  nextConfig = require_next_config();
} catch (e) {
  nextConfig = {};
}
console.log("nextConfig", nextConfig);
module.exports = (phase, context) => {
  const baseConfig = typeof nextConfig === "function" ? nextConfig(phase, context) : nextConfig;
  const customConfig = { ...baseConfig };
  customConfig.webpack = function(config, options) {
    if (baseConfig.webpack) {
      config = baseConfig.webpack(config, options);
    }
    config.optimization.splitChunks.minSize = 0;
    config.optimization.splitChunks.minChunks = 1;
    return config;
  };
  return customConfig;
};
