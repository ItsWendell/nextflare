import { Compiler, Dependency, sources, WebpackError } from "webpack";
import path from "path";

console.log("Hello from Nextflare");

const RawSource = sources.RawSource;

export default class NextflareWebpackPlugin {
  // Define `apply` as its prototype method which is supplied with compiler as its argument
  apply(compiler: Compiler) {

    // Add a entrypoint for a specific file to webpack config and a loader for it
    compiler.hooks.entryOption.tap("NextflareWebpackPlugin", (context, entry) => {
      console.log("entryOption", context, entry);
      return entry;
    });

    // Replace next-edge-ssr-loader with a custom loader
    compiler.hooks.compilation.tap("NextflareWebpackPlugin", (compilation) => {
      compilation.hooks.normalModuleLoader.tap(
        "NextflareWebpackPlugin",
        (loaderContext, module) => {
          // Check if loader is next-edge-ssr-loader
          if (module.loaders?.[0]?.loader) {
            let loaderName = path.basename(module.loaders[0].loader, ".js");
            if (loaderName === "index") {
              loaderName = path.basename(
                path.dirname(module.loaders[0].loader),
                ".js"
              );
            }
            if (loaderName === "next-edge-ssr-loader") {
              console.log(
                "Replacing next-edge-ssr-loader with nextflare-loader v2"
              );
              // Replace loader with nextflare-loader
              const nextLoader = path.resolve(__dirname, "loaders", "ssr-loader");
              console.log("nextLoader", nextLoader);
              module.loaders[0].loader = nextLoader;
            }

            if (loaderName === "next-edge-function-loader") {
              console.log(
                "Replacing next-edge-function-loader with nextflare-loader v2"
              );
              // Replace loader with nextflare-loader
              const nextLoader = path.resolve(__dirname, "loaders", "function-loader");
              console.log("nextLoader", nextLoader);
              module.loaders[0].loader = nextLoader;
            }

            if (loaderName === "next-middleware-loader") {
              console.log(
                "Replacing next-edge-middleware-loader with nextflare-loader v2"
              );
              // Replace loader with nextflare-loader
              const nextLoader = path.resolve(__dirname, "loaders", "middleware-loader");
              console.log("nextLoader", nextLoader);
              module.loaders[0].loader = nextLoader;
            }
          }
        }
      );
    });
  }
}
