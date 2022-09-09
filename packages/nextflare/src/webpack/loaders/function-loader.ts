import { getModuleBuildInfo } from "next/dist/build/webpack/loaders/get-module-build-info";
import { stringifyRequest } from "next/dist/build/webpack/stringify-request";

export type EdgeFunctionLoaderOptions = {
  absolutePagePath: string
  page: string
}

export default function middlewareLoader(this: any) {
  const { absolutePagePath, page }: EdgeFunctionLoaderOptions =
    this.getOptions()
  const stringifiedPagePath = stringifyRequest(this, absolutePagePath)
  const buildInfo = getModuleBuildInfo(this._module)
  buildInfo.nextEdgeApiFunction = {
    page: page || '/',
  }

  return `
        var mod = require(${stringifiedPagePath})
        var handler = mod.middleware || mod.default;

        export default handler;
    `
}
