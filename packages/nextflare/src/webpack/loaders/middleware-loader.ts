import type { MiddlewareMatcher } from 'next/dist/build/analysis/get-page-static-info'
import { getModuleBuildInfo } from "next/dist/build/webpack/loaders/get-module-build-info";
import { stringifyRequest } from "next/dist/build/webpack/stringify-request";
import { MIDDLEWARE_LOCATION_REGEXP } from 'next/dist/lib/constants'

export type MiddlewareLoaderOptions = {
  absolutePagePath: string
  page: string
  matchers?: string
}

// matchers can have special characters that break the loader params
// parsing so we base64 encode/decode the string
export function encodeMatchers(matchers: MiddlewareMatcher[]) {
  return Buffer.from(JSON.stringify(matchers)).toString('base64')
}

export function decodeMatchers(encodedMatchers: string) {
  return JSON.parse(
    Buffer.from(encodedMatchers, 'base64').toString()
  ) as MiddlewareMatcher[]
}

export default function middlewareLoader(this: any) {
  const {
    absolutePagePath,
    page,
    matchers: encodedMatchers,
  }: MiddlewareLoaderOptions = this.getOptions()
  const matchers = encodedMatchers ? decodeMatchers(encodedMatchers) : undefined
  const stringifiedPagePath = stringifyRequest(this, absolutePagePath)
  const buildInfo = getModuleBuildInfo(this._module)
  buildInfo.nextEdgeMiddleware = {
    matchers,
    page:
      page.replace(new RegExp(`/${MIDDLEWARE_LOCATION_REGEXP}$`), '') || '/',
  }

  return `
        var mod = require(${stringifiedPagePath})
        var handler = mod.middleware || mod.default;

        export default handler;
    `
}
