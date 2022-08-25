import { VercelBuildPagesOptions } from "./build";
import * as fs from "fs-extra";
import * as path from "path";

export const getBuildId = async (options: VercelBuildPagesOptions) => {
  const buildIdPath = path.join(process.cwd(), options?.nextFolder, "BUILD_ID");
  const buildId = await fs.readFile(buildIdPath, "utf8");
  return buildId.trim();
};
