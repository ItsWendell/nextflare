#!/usr/bin/env npx tsx
import chalk from "chalk";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { build } from "./build/build";

yargs(hideBin(process.argv))
  .command(
    ["build", "$0"],
    "",
    () => {},
    async (argv) => {
      console.log(chalk.green("Starting build for Cloudflare Pages..."));
      await build();
    }
  )
  .options({
    dist: { type: "string", default: "./dist" },
    vercelFolder: { type: "string", default: "./vercel" },
    nextFolder: { type: "string", default: "./next" },
  })
  .demandCommand(1)
  .parse();
