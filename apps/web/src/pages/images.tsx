import type { GetStaticProps } from "next";
import React from "react";
import Image from "next/image";
import DemoImage from "~/public/image.jpg";

export const ImagePage = (props: any) => {
  return (
    <div className="container px-4  self-center w-full mt-4">
      <div className="prose dark:prose-invert max-w-none">
        <h1>Images</h1>
        <figure>
          <Image alt="demo-image" src={DemoImage} />
          <figcaption>This image is imported the page</figcaption>
        </figure>
        <figure>
          <Image
            width="200px"
            height="200px"
            alt="demo-image-2"
            src="/image-2.jpg"
          />
          <figcaption>This is an image src as string from the public folder</figcaption>
        </figure>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      isServer: false,
      runtime: "edge",
      generatedAt: Date.now(),
    },
  };
};

export default ImagePage;
