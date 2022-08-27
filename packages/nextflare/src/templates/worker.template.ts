declare const __MIDDLEWARE_MANIFEST__: Record<string, any>;
declare const _ENTRIES: Record<string, any>;

console.log("Entries:", _ENTRIES);

globalThis.isWarm = false;

const toNextRequest = (request: Request, init: RequestInit) => {
  const headers = new Headers(init?.headers ?? request.headers ?? {});
  return {
    url: request.url,
    body: request.clone().body,
    headers: Object.fromEntries(headers.entries()),
    method: request.method,
    geo: {
      city: request.cf?.city,
      country: request.cf?.country,
      region: request.cf?.region,
    },
    ip: request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || request.cf?.ip,
  }
}
export default {
  async fetch(request: Request, env: Env, context: ExecutionContext) {
    const isCold = !globalThis.isWarm;
    globalThis.isWarm = true;
    const url = new URL(request.url);

    const headers = new Headers(request.headers);
    headers.append('x-edge-user-agent', globalThis.navigator?.userAgent ?? "unknown");
    headers.append('x-edge-is-cold', isCold ? 'true' : 'false');
    headers.append('x-cf-city', request.cf?.city);
    const req = toNextRequest(request, { headers });

    let res: Response = new Response();

    const waitUntils = new Set<Promise<any>>();

    for (const [_name, func] of Object.entries<any>(
      __MIDDLEWARE_MANIFEST__.middleware
    )) {
      if (new RegExp(func.regexp).test(url.pathname)) {
        console.debug(
          "[Next.js Worker] Middleware: Found regex match for",
          url.pathname,
          func
        );
        console.time("[Next.js Worker] Middleware execution time");

        const entry = _ENTRIES[`middleware_${func.name}`];
        const { waitUntil, response } = await entry.default({
          request: req,
          ...context,
        });

        waitUntils.add(waitUntil);

        res = response;
      }
    }
  

    for (const [_name, func] of Object.entries<any>(
      __MIDDLEWARE_MANIFEST__.functions
    )) {
      if (new RegExp(func.regexp).test(url.pathname)) {
        console.debug(
          "[Next.js Worker] Found regex match for",
          url.pathname,
          func
        );

        console.time("[Next.js Worker] Function execution time");

        const entry = _ENTRIES[`middleware_${func.name}`];
        const { waitUntil, response } = await entry.default({
          request: req,
          ...context,
        });
        waitUntils.add(waitUntil);
        console.timeEnd("[Next.js Worker] Function execution time");


        // Merge middleware response headers with function response headers
        const headers = new Headers(res.headers);
        for (const [key, value] of Object.entries<string>(response.headers)) {
          headers.append(key, value);
        }

        // Custom runtime headers
        headers.append('User-Agent', globalThis.navigator?.userAgent ?? "unknown");
        
        context.waitUntil(Promise.all(waitUntils));
        return new Response(response.body, {
          headers: headers,
          status: response.status,
          statusText: response.statusText,
        });
      }
    }

    console.log("[Next.js Worker] No match found for url", url.pathname);
    // Otherwise, serve the static assets.
    // Without this, the Worker will error and no assets will be served.
    return env.ASSETS.fetch(request);
  },
};
