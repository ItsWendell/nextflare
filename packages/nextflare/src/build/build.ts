import chalk from "chalk";
import * as fs from "fs-extra";
import * as path from "path";
import { getRealNextjsVersion } from "../utils";
import { buildNextWorker } from "./buildNextWorker";
import { generateStaticFiles } from "./generateStaticFiles";
import tsconfig from "../templates/tsconfig.json";
import { generateRoutesFile } from "./generateRoutesFile";

export interface VercelBuildPagesOptions {
  distFolder?: string;
  nextFolder?: string;
}

export const build = async (options: VercelBuildPagesOptions = {}) => {
  if (!options.nextFolder) {
    options.nextFolder = "./.next";
  }

  if (!options.distFolder) {
    options.distFolder = "./dist";
  }

  const nextVersion = getRealNextjsVersion();

  console.log(
    chalk.green(
      `Building Next.js ${nextVersion} for Cloudflare Pages in ${options.distFolder}`
    )
  );

  // Detect if this is a Next.js project
  if (nextVersion === null) {
    throw new Error("Next.js not detected.");
  }

  // Verify that the vercel build output folder exists
  if (!fs.existsSync(path.join(process.cwd(), options?.nextFolder))) {
    throw new Error("Next output folder does not exist, run next build first");
  }

  // Create our custom dist folder
  if (!fs.existsSync(path.join(process.cwd(), options?.distFolder))) {
    fs.mkdirSync(path.join(process.cwd(), options?.distFolder));
  } else {
    fs.emptyDirSync(path.join(process.cwd(), options?.distFolder));
  }

  await buildNextWorker(options);

  await generateStaticFiles(options);

  await generateRoutesFile(options);

  // Copy tsconfig.json to dist folder
  await fs.createFile(path.join(process.cwd(), options?.distFolder, "tsconfig.json"));
  fs.writeJSON(
    path.join(process.cwd(), options?.distFolder, "tsconfig.json"),
    tsconfig,
  );

  console.log("Build complete");
};
