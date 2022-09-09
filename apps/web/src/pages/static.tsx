import type { GetStaticProps } from "next";
import React from "react";

export const StaticPage = (props: any) => {
    return (
        <div className="container px-4 self-center w-full mt-4">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Static Pages</h1>
          {/** Subtitle */}
            <p className="text-gray-600">This page is static and uploaded as .html to Cloudflare Pages.</p>
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