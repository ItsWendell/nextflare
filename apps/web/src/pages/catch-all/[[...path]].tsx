import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";

export const DynamicPage = (props: any) => {
  const router = useRouter();
  return (
    <div className="container px-4 mt-4 self-center w-full">
      <div className="prose max-w-none">
        <h1>Catch-All</h1>
        <p>Catch all dynamic routes are also supported, this file name is <code>[[...path]].tsx</code></p>
        <pre>
          <code>{JSON.stringify(router.query, null, 4)}</code>
        </pre>
      </div>
    </div>
  );
};

export const config = {
  runtime: "experimental-edge",
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      generatedAt: new Date().toISOString(),
    },
  };
};

export default DynamicPage;
