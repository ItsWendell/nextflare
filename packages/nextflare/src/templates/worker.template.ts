import getNextEdgeFunction from "@vercel/next/dist/edge-function-source/get-edge-function";
import { getMiddlewareRouteMatcher } from "next/dist/shared/lib/router/utils/middleware-route-matcher";
import { getRouteMatcher } from "next/dist/shared/lib/router/utils/route-matcher";
import { getNextPathnameInfo } from "next/dist/shared/lib/router/utils/get-next-pathname-info";

declare const __MIDDLEWARE_MANIFEST__: Record<string, any>;
declare const __ROUTES_MANIFEST__: Record<string, any>;
declare const _ENTRIES: Record<string, any>;

console.log("[Next.js Worker] Entries", _ENTRIES);

const getEdgeFunction = (name: string) => {
  return getNextEdgeFunction({
    name: name,
    staticRoutes: __ROUTES_MANIFEST__.staticRoutes,
    dynamicRoutes: __MIDDLEWARE_MANIFEST__.dynamicRoutes,
    nextConfig: {
      basePath: __ROUTES_MANIFEST__.basePath,
      i18n: __ROUTES_MANIFEST__.i18n,
    },
  });
};

const mergeResponses = (...responses: Response[]) => {
  const init: ResponseInit = {};
  let body: Response["body"] = null;
  for (const res of responses) {
    if (res.status) {
      init.status = res.status;
    }
    if (res.statusText) {
      init.statusText = res.statusText;
    }
    if (res.headers) {
      const headers = init?.headers ? new Headers(init.headers) : new Headers();
      for (const [key, value] of res.headers.entries()) {
        headers.set(key, value);
      }
      init.headers = headers;
    }
    if (res.body) {
      body = res.body;
    }
  }
  return new Response(body, init);
};

const handleMiddleware = async (req: any, context: ExecutionContext, url: URL) => {
  const func = __MIDDLEWARE_MANIFEST__.middleware?.["/"];

  if (func) {
    const match = getMiddlewareRouteMatcher(func.matchers);
    const matchResult = match(url.pathname, req, url.searchParams);
    if (matchResult) {
      console.debug(
        "[Next.js Worker] [Middleware] Found middleware match for",
        url.pathname
      );
      const edgeFunction = getEdgeFunction(func.name);
      return await edgeFunction(req, context);
    }
  }
  return null;
};

const handleFunction = async (req: any, context: ExecutionContext, url: URL) => {
  for (const [_name, func] of Object.entries<any>(
    __MIDDLEWARE_MANIFEST__.functions
  )) {
    const match = getRouteMatcher({
      re: new RegExp(func.matchers[0].regexp),
      groups: {},
    });

    if (match(url.pathname)) {
      console.debug(
        "[Next.js Worker] [Functions] Found match for",
        url.pathname,
        `Name: ${func.name}`
      );
      const edgeFunction = getEdgeFunction(func.name);
      return await edgeFunction(req, context);
    }
  }

  return null;
};

export const handler = async (
  request: Request,
  env: Env,
  context: ExecutionContext
) => {
  const url = new URL(request.url);
  const pathnameInfo = getNextPathnameInfo(url.pathname, {
    parseData: true,
    nextConfig: {
      basePath: __ROUTES_MANIFEST__.basePath,
      i18n: __ROUTES_MANIFEST__.i18n,
    },
  });
  url.pathname = pathnameInfo.pathname;
  if (request.url !== url.href) {
    console.debug("[Next.js Worker] Handling Parsed URL", request.url, "->", url.pathname);
  } else {
    console.debug("[Next.js Worker] Handling URL", request.url);
  }

  const reqHeaders = new Headers(request.headers);
  reqHeaders.set("x-vercel-ip-city", request?.cf?.city);
  reqHeaders.set("x-vercel-ip-country", request?.cf?.city);
  reqHeaders.set(
    "x-real-ip",
    request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip")
  );
  reqHeaders.set("x-vercel-ip-latitude", request?.cf?.latitude);
  reqHeaders.set("x-vercel-ip-longitude", request?.cf?.longitude);
  reqHeaders.set("x-vercel-ip-region", request?.cf?.region);
  reqHeaders.set("x-vercel-ip-timezone", request?.cf?.timezone);

  let req = new Request(request, { headers: reqHeaders });

  // TODO: Implement redirects handling

  const middleware = await handleMiddleware(req, context, url);

  // Temporary rewrite to get imported images working.
  if (url.pathname.startsWith("/_next/image")) {
    const imageUrl = new URL(url.searchParams.get("url"), url.href);
    console.debug(
      "[Next.js Worker] [Image] Rewriting URL",
      req?.url,
      " ->",
      imageUrl.href
    );
    
    req = new Request(imageUrl, req);
  }

  // Support for middleware rewrites
  const rewrite = middleware?.headers?.get("x-middleware-rewrite");
  if (rewrite) {
    // TODO: Support for external rewrites
    console.debug(
      "[Next.js Worker] [Middleware] Rewriting URL",
      req?.url,
      " ->",
      rewrite
    );
    req = new Request(new URL(rewrite), req);
  }

  // Support for redirects in middleware
  const location = middleware?.headers?.get("Location");
  if (location) {
    console.debug(
      "[Next.js Worker] [Middleware] Redirecting URL",
      req.url,
      " -> ",
      location
    );
    return new Response(null, {
      status: middleware?.status,
      headers: {
        Location: location,
      },
    });
  }

  const route = await handleFunction(req, context, url);

  if (middleware && route) {
    return mergeResponses(middleware, route);
  } else if (route) {
    return route;
  }

  console.log("[Next.js Worker] Forwarding to ASSETS", req.url);

  const asset = await env.ASSETS.fetch(req);
  if (middleware) {
    return mergeResponses(middleware, asset);
  }
  return asset;
};

export default {
  async fetch(request: Request, env: Env, context: ExecutionContext) {
    try {
      return await handler(request, env, context);
    } catch (e) {
      console.error(e);
      return new Response(
        JSON.stringify({
          name: e?.name,
          error: e?.message,
          stack: e?.stack,
        }),
        {
          status: 500,
        }
      );
    }
  },
};
