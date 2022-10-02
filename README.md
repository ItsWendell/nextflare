# Nextflare - Run Next.js Edge Runtime on Cloudflare Pages (Workers)

**NOTE:** *We're still actively updating this repository, docs, and preparing a potential release on NPM, this package is highly experimental and might break at any time, and we might even introduce a rename soon.*

This (experimental) tool allows you to run Next.js with Edge Runtime on Cloudflare Pages! 

## Current approach

Currently, Next.js outputs by default an individual Edge Function for each Page or API Route, including a full `NextWebServer` for each function. This is not ideal since that requires us to write a custom router, since for Cloudflare Workers / Pages, we can only upload one worker (or multiple functions but those get bundled anyways).

So, for now we're using esbuild and the `middleware-manifest.json` outputted by `next build` to bundle those functions together, and output a `_worker.js` file based on the `worker.template.ts` file, compatible for Cloudflare Pages with a custom router that forwards requests to the right functions.

We put all truely static files in the `_routes.json` file so we can skip executing this worker.

## Possible future approach

I'm experimenting with hooking into the webpack configuration of Next.js to be able to include a custom entrypoint for a custom `CloudflareWebServer` based on `BaseServer` optimized for Cloudflare Pages. This would allow us to build a LOT more features like incremental static generation and have overall greater feature parity.

## Supported Features
 - [Edge Server-Side Rending](https://nextjs.org/docs/basic-features/pages#server-side-rendering) 
 - [Dynamic Routes](https://nextjs.org/docs/routing/dynamic-routes) - 
 - [Edge API Routes](https://nextjs.org/docs/api-routes/edge-api-routes)
 - [Edge Middleware](https://nextjs.org/docs/advanced-features/middleware)
 - [Geo Information](https://nextjs.org/docs/api-reference/next/server#nextrequest)
   - Using Cloudflare's [IncomingRequestCfProperties](https://developers.cloudflare.com/workers/runtime-apis/request/#incomingrequestcfproperties) for this.
 - [next/image](https://nextjs.org/docs/api-reference/next/image) - Image component with static imports and src paths.

## Unsupported Features
 - [Static Generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)
    - Next.js doesn't support this yet for the Edge Runtime, will be outputted as a SSR page.
 - [Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
    - Possible with custom image loaders, the built-in loader is currently just a simple passthrough to the static image.
 - [Incremental Static Generation](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)
   - This might be possible in the future using a custom Cloudflare KV store for example, but will require us to use the possible future approach.
 - [App Dir / Layouts RFC](https://nextjs.org/blog/layouts-rfc)
   - In the current state it changes the build output in ways that are not optimal, e.g. edge chunking is lost, would be able to support at a later stage.

### Interesting resources and points within the Next.js codebase:
 - [packages/next/server/web-server.ts](https://github.com/vercel/next.js/blob/canary/packages/next/server/web-server.ts)
   - The `NextWebServer` used for each edge runtime page / api route.
 - [packages/next/server/base-server.ts](https://github.com/vercel/next.js/blob/canary/packages/next/server/base-server.ts)
   - The `BaseServer` used by `NextServer` and `NextWebServer` that I'm attempting to extend to build a better version for Cloudflare Pages.
 - [packages/next/build/webpack/loaders/next-edge-function-loader.ts](https://github.com/vercel/next.js/blob/canary/packages/next/build/webpack/loaders/next-edge-function-loader.ts)
   - Webpack loader used to create edge functions
 - [packages/next/build/webpack/loaders/next-middleware-loader.ts](https://github.com/vercel/next.js/blob/canary/packages/next/build/webpack/loaders/next-middleware-loader.ts)
   - Webpack loader used to create middleware functions
 - [packages/next/build/webpack/loaders/next-edge-ssr-loader/index.ts](https://github.com/vercel/next.js/blob/canary/packages/next/build/webpack/loaders/next-edge-ssr-loader/index.ts)
   - Webpack loader used to create the edge ssr functions


## How to get started.

We haven't bundled this into NPM yet, so cloning this repository will be needed, you'd need to use [PNPM](https://pnpm.io/). You'd need to make sure your project is using Edge Runtime.

1. Use the [Global Runtime Option](https://nextjs.org/docs/advanced-features/react-18/switchable-runtime#global-runtime-option) to make sure your project is using Next.js Edge Runtime and works fully with that runtime in `next dev`.
2. Once verified everything works as you expect, run `next build` to generate a build.
3. Next run `nextflare build` in the root of your next.js project, where your package.json / next.config.js file is located.
4. An folder called `dist` will be generated, this folder you can directly upload to Cloudflare Pages.

### Configuration on Cloudflare. 

In order for SSR to work, you'd need to enable some compatibility flags on Cloudflare Pages, this is currently only possible using the API, this curl call will set the compatibility date to `2022-08-16` and add the following flags to your Cloudflare Pages project:

 - transformstream_enable_standard_constructor
 - streams_enable_constructors

```sh

curl https://api.cloudflare.com/client/v4/accounts/ACCOUNT_ID/pages/projects/PROJECT_SLUG -H 'X-Auth-Email: YOUR_EMAIL' -H 'X-Auth-Key: YOUR_AUTH_KEY' -X PATCH -d '{"deployment_configs":{"production":{"compatibility_date": "2022-08-16", "compatibility_flags": ["transformstream_enable_standard_constructor","streams_enable_constructors"]},"preview":{"compatibility_date": "2022-08-16", "compatibility_flags": ["transformstream_enable_standard_constructor","streams_enable_constructors"]}}}'

```

 - Replace ACCOUNT_ID with your Cloudflare Account ID.
 - Replace PROJECT_SLUG with your project slug on cloudflare for cloudflare pages
 - Replace YOUR_EMAIL with your email address
 - Replace YOUR_AUTH_KEY with your auth key


