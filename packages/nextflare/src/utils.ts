import path from "path";

/**
 * Get the real version of next from the node_modules.
 */
export const getRealNextjsVersion = () => {
  const nextPkg =
    require(path.join(process.cwd(), "node_modules/next/package.json")) ?? {};
  return nextPkg.version ?? null;
};
