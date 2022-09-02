import { VercelBuildPagesOptions } from "./build";
import fs from "fs-extra";
import path from "path";

export interface RoutesFile {
    version: number;
    include: string[];
    exclude: string[];
}

export const generateRoutesFile = async (options: VercelBuildPagesOptions) => {
    const routes: RoutesFile = {
        version: 1,
        include: ["/*"],
        exclude: ["/_next/static/*", "/*.html"],
    };

    fs.writeJSONSync(path.join(process.cwd(), options?.distFolder, "_routes.json"), routes);
}