declare const __MIDDLEWARE_MANIFEST__: Record<string, any>;
declare const _ENTRIES: Record<string, any>;

export default {
  async fetch(request: Request, env: Env, context: ExecutionContext) {
    const url = new URL(request.url);

    for (const [, func] of Object.entries<any>(
      __MIDDLEWARE_MANIFEST__.functions
    )) {
      if (new RegExp(func.regexp).test(url.pathname)) {
        console.debug("[Next.js Worker] Found regex match for", url.pathname, func);
        const entry = _ENTRIES[`middleware_${func.name}`];
        const { waitUntil, response } = await entry.default({
          request: request,
          ...context,
        });

        if (waitUntil) {
          context.waitUntil(waitUntil);
        }

        return response;
      } else {
        console.log("unknown path");
      }
    }
    // Otherwise, serve the static assets.
    // Without this, the Worker will error and no assets will be served.
    return env.ASSETS.fetch(request);
  },
};
