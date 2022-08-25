import path from "path";
import { VercelBuildPagesOptions } from "./build";
import * as fs from "fs-extra";
import { build } from "esbuild";
// @ts-ignore
import workersTemplate from "../templates/worker.template.ts";

export const buildNextWorker = async (options?: VercelBuildPagesOptions) => {
  // Load middleware manifest
  const middlewareManifest = require(path.join(
    process.cwd(),
    ".next",
    "server",
    "middleware-manifest.json"
  ));

  if (middlewareManifest.version !== 1) {
    throw new Error("Unsupported middleware manifest version");
  }

  // Load the workers template file as a string
  // const workersTemplate = fs.readFileSync(path.join(__dirname, "./templates/next-worker.ts"), "utf8");

  // Replace the requires in the template with the generated requires
  const workersFile = workersTemplate as string;

  const requires = Object.entries(middlewareManifest.functions).reduce(
    (acc, [name, func]: [string, any]) => {
      for (const file of func.files) {
        acc.add(file);
      }
      return acc;
    },
    new Set<string>()
  );

  // Build the worker with esbuild
  const result = await build({
    outfile: path.join(process.cwd(), options?.distFolder, "_worker.js"),
    stdin: {
      contents: `
          ${Array.from(requires)
            .map((file) => `import "./${file}";`)
            .join("\n")}
          ${workersFile}
        `,
      loader: "ts",
      resolveDir: path.join(process.cwd(), ".next"),
    },
    define: {
      __MIDDLEWARE_MANIFEST__: JSON.stringify(middlewareManifest),
      _ENTRIES: JSON.stringify({}),
      // TODO: Define all env variables from the manifest
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
    minify: false,
    target: "esnext",
    bundle: true,
    format: "esm",
    sourcemap: false,
    treeShaking: true,
    conditions: ["worker", "browser"],
    absWorkingDir: path.join(process.cwd(), options.nextFolder),
    legalComments: "none",
    platform: "neutral",
  });

  if (result.errors.length) {
    console.error(result.errors);
    throw new Error("Failed to build worker");
  }

  if (result.warnings.length) {
    console.warn(result.warnings);
  }
};
