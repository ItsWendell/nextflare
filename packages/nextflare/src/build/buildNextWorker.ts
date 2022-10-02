import path from "path";
import { VercelBuildPagesOptions } from "./build";
import * as fs from "fs-extra";
import { build } from "esbuild";
import * as constants from "next/constants";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
// @ts-ignore
import workersTemplate from "../templates/worker.template.ts";

export const buildNextWorker = async (options?: VercelBuildPagesOptions) => {
  // Load middleware manifest
  const middlewareManifest = require(path.join(
    process.cwd(),
    ".next",
    "server",
    constants.MIDDLEWARE_MANIFEST
  ));

  const routesManifest = require(path.join(
    process.cwd(),
    ".next",
    constants.ROUTES_MANIFEST
  ));

  if (middlewareManifest.version !== 2) {
    throw new Error("Unsupported middleware manifest version");
  }

  // Load the workers template file as a string
  // const workersTemplate = fs.readFileSync(path.join(__dirname, "./templates/next-worker.ts"), "utf8");

  // Replace the requires in the template with the generated requires
  const workersFile = workersTemplate as string;

  const entries = [
    ...(Object.entries(middlewareManifest.middleware) ?? []),
    ...(Object.entries(middlewareManifest.functions) ?? []),
  ];

  const requires = entries.reduce((acc, [name, func]: [string, any]) => {
    for (const file of func.files) {
      acc.add(file);
    }
    return acc;
  }, new Set<string>());

  // Build the worker with esbuild

  const workerPath = path.join(
    process.cwd(),
    options?.distFolder,
    "_worker.js"
  );

  const env = {
    NEXT_RUNTIME: 'edge',
    NEXT_CLOUDFLARE: '1',
  }
  const result = await build({
    outfile: workerPath,
    stdin: {
      contents: `
          globalThis.process = globalThis.process || { env: {} };
          globalThis.process.env.NODE_ENV = "production";
          ${Array.from(requires)
            .map((file) => `import "./${file}";`)
            .join("\n")}
          ${workersFile}
        `,
      loader: "ts",
      resolveDir: path.join(process.cwd(), ".next"),
    },
    define: {
      __MIDDLEWARE_MANIFEST__: JSON.stringify(middlewareManifest ?? {}),
      __ROUTES_MANIFEST__: JSON.stringify(routesManifest ?? {}),
      _ENTRIES: JSON.stringify({}),
      global: "globalThis",
      process: "globalThis.process",
      self: "globalThis",
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env.NEXT_RUNTIME": JSON.stringify(env.NEXT_RUNTIME),
    },
    platform: "neutral",
    minify: false,
    target: "es2020",
    bundle: true,
    format: "esm",
    sourcemap: false,
    treeShaking: true,
    conditions: ["worker", "browser"],
    absWorkingDir: path.join(process.cwd(), options.nextFolder),
    legalComments: "none",
    plugins: [NodeGlobalsPolyfillPlugin({
      buffer: false,
      define: false,
      process: true,
    })]
  });

  if (result.errors.length) {
    console.error(result.errors);
    throw new Error("Failed to build worker");
  }

  if (result.warnings.length) {
    console.warn(result.warnings);
  }

  const contents = await fs.readFile(workerPath, "utf8");
  await fs.writeFile(
    workerPath,
    contents
      .replaceAll("configurable: false", "configurable: true")
      .replaceAll("configurable:!1", "configurable:1")
  );
};
