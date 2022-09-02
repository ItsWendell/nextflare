import { VercelBuildPagesOptions } from "./build";
import * as fs from "fs-extra";
import * as path from "path";
import { getBuildId } from "./getBuildId";

/**
 * Copy static build files recursively from the .next folder to the dist folder
 */
export const copyStaticBuildFiles = async (
  options: VercelBuildPagesOptions,
  buildId: string,
  folder?: string
) => {
  if (!folder) {
    folder = path.resolve(
      process.cwd(),
      options?.nextFolder || ".next",
      "server",
      "pages"
    );
  }
  for (const file of fs.readdirSync(folder)) {
    const src = path.join(folder, file);
    if (fs.lstatSync(src).isDirectory()) {
      console.debug("copyStaticBuildFiles: isDirectory", src);
      await copyStaticBuildFiles(options, buildId, src);
    }

    if (file.endsWith(".json") && !file.endsWith(".nft.json")) {
      console.debug("copyStaticBuildFiles: json", src);
      await fs.copy(
        src,
        path.resolve(
          process.cwd(),
          options?.distFolder,
          "_next/data",
          await getBuildId(options),
          path.relative(
            path.resolve(process.cwd(), options?.nextFolder, "server", "pages"),
            path.dirname(src)
          ),
          path.basename(src)
        )
      );
    }

    if (file.endsWith(".html")) {
      const dest = path.resolve(
        process.cwd(),
        options?.distFolder,
        path.relative(
          path.resolve(process.cwd(), options?.nextFolder, "server", "pages"),
          path.dirname(src)
        ),
        path.basename(src)
      );
      console.debug("copyStaticBuildFiles: html", src, dest);
      await fs.copy(src, dest);
    }
  }
};

export const generateStaticFiles = async (options: VercelBuildPagesOptions) => {
  // Copy static folder into dist folder
  await fs.ensureDir(
    path.join(process.cwd(), options?.distFolder, "_next", "static")
  );
  await fs.copy(
    path.join(process.cwd(), options?.nextFolder, "static"),
    path.join(process.cwd(), options?.distFolder, "_next", "static")
  );

  const buildId = await getBuildId(options);
  await copyStaticBuildFiles(options, buildId);

  // Copy public folder to dist folder
  await fs.copy(
    path.join(process.cwd(), "public"),
    path.join(process.cwd(), options?.distFolder),
    {
      overwrite: false,
      errorOnExist: true, 
    },
  );
};
