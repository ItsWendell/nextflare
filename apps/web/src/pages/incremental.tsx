import type { GetStaticProps } from "next";
import React from "react";

export const StaticPage = (props: any) => {
    return (
        <div className="container px-4 self-center w-full mt-4">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Incremental Static Generation</h1>
          {/** Subtitle */}
            <p className="text-gray-600">Incremental static generation is not supported yet but might be possible in the future by using a custom KV store, for example.</p>
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
        revalidate: 60,
    };
}

export default StaticPage;