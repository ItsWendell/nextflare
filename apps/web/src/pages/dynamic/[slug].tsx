import type { GetServerSideProps, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";

export const DynamicPage = (props: any) => {
  const router = useRouter();
  return (
    <div className="container px-4 self-center w-full mt-4">
      <div className="prose max-w-none">
        <h1>Dynamic Routes</h1>
        <p>
          This is a dynamic route, with <code>[slug].tsx</code> as file name,
          the code blow is{" "}
        </p>
        <figure>
          <pre>
            <code>{JSON.stringify(router.query, null, 4)}</code>
          </pre>
          <figcaption>Stringified JSON of the Next.js router</figcaption>
        </figure>
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
