import type { GetStaticProps } from "next";
import React from "react";

export const StaticPage = (props: any) => {
    return (
        <div className="container px-4 self-center w-full mt-4">
        <div className="prose dark:prose-invert max-w-none">
          <h1>About</h1>
          {/** Subtitle */}
            <p className="text-gray-600">
              This website is running Next.js on Cloudflare Pages, with support for edge functions. Both the new experimental Edge Runtime, and Cloudflare&apos;s Edge Runtime, are based on Web APIs, which allows us to run, with a lot of workarounds and hacks, Next.js on Cloudflare Pages.
            </p>
            <p className="text-gray-600">
              The current Next.js server implementation of Edge Runtime, with its build export, are not optimial (yet) to be bundled together into an Worker to use with Cloudflare Pages. There is some code-duplication, and the router might not work idempotently. This is because the Next.js router is not designed to be run in a Worker, and the Next.js router is not designed to be run in a Worker.
            </p>
          <pre>
            <code>{JSON.stringify(props, null, 4)}</code>
          </pre>
        </div>
      </div>
    )
};

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            isServer: false,
            runtime: "edge",
            generatedAt: Date.now(),
        },
    };
}

export default StaticPage;