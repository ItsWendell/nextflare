import { getModuleBuildInfo } from "next/dist/build/webpack/loaders/get-module-build-info";
import { stringifyRequest } from "next/dist/build/webpack/stringify-request";

console.log("getModuleBuildInfo", getModuleBuildInfo)
export type EdgeSSRLoaderQuery = {
  absolute500Path: string;
  absoluteAppPath: string;
  absoluteDocumentPath: string;
  absoluteErrorPath: string;
  absolutePagePath: string;
  buildId: string;
  dev: boolean;
  isServerComponent: boolean;
  page: string;
  stringifiedConfig: string;
  appDirLoader?: string;
  pagesType?: "app" | "pages" | "root";
};

export default async function edgeSSRLoader(this: any) {
  const {
    dev,
    page,
    buildId,
    absolutePagePath,
    absoluteAppPath,
    absoluteDocumentPath,
    absolute500Path,
    absoluteErrorPath,
    isServerComponent,
    stringifiedConfig,
    appDirLoader: appDirLoaderBase64,
    pagesType,
  } = this.getOptions();

  const appDirLoader = Buffer.from(
    appDirLoaderBase64 || "",
    "base64"
  ).toString();
  const isAppDir = pagesType === "app";

  const buildInfo = getModuleBuildInfo(this._module);
  buildInfo.nextEdgeSSR = {
    isServerComponent: isServerComponent === "true",
    page: page,
    isAppDir,
  };
  buildInfo.route = {
    page,
    absolutePagePath,
  };

  const stringifiedPagePath = stringifyRequest(this, absolutePagePath);
  const stringifiedAppPath = stringifyRequest(this, absoluteAppPath);
  const stringifiedErrorPath = stringifyRequest(this, absoluteErrorPath);
  const stringifiedDocumentPath = stringifyRequest(this, absoluteDocumentPath);
  const stringified500Path = absolute500Path
    ? stringifyRequest(this, absolute500Path)
    : null;

  const pageModPath = `${appDirLoader}${stringifiedPagePath.substring(
    1,
    stringifiedPagePath.length - 1
  )}`;

  console.log("loading custom edge ssr loader", pageModPath);
  const transformed = `

  ${
    isAppDir
      ? `
    const appRenderToHTML = require('next/dist/server/app-render').renderToHTMLOrFlight
    const pagesRenderToHTML = null
    const pageMod = require(${JSON.stringify(pageModPath)})
  `
      : `
    const appRenderToHTML = null
    const pagesRenderToHTML = require('next/dist/server/render').renderToHTML
    const pageMod = require(${stringifiedPagePath})
  `
  }
    
    export const ComponentMod = pageMod;
    export const isAppDir = ${isAppDir};
    export const renderReqToHTML = ${isAppDir ? 'appRenderToHTML' : 'pagesRenderToHTML'};
    `;

  return transformed;
}
