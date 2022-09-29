import type { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";

export interface PageProps {
  isServer?: boolean;
  isCold?: boolean;
  city?: string;
  ip?: string;
  runtime?: string;
  generatedAt: number;
  payload?: string;
  edgeAgent?: string;
}

export default function HomePage({
  generatedAt,
  city = "Amsterdam",
  ip = "127.0.0.1",
  isCold = false,
  edgeAgent,
}: PageProps) {
  return (
    <React.Fragment>
      <div className="overflow-hidden flex-1 relative flex flex-col">
        <main className="mt-20 h-full container px-4 self-center relative flex flex-col md:items-center justify-items-center flex-1 justify-end md:justify-between">
          <div>
            <h1 className="text-3xl mb-4 md:mb-10 md:text-6xl font-bold text-gray-800 dark:text-white">
              Hello from the edge!
            </h1>
          </div>

          <div className="flex content-center items-center justify-items-center left-0 bottom-32 w-full">
            <div className="flex-1 self-center flex flex-col md:flex-row md:items-center md:justify-center">
              <div className="flex mr-0 md:mr-16 mb-4">
                <div className="flex flex-col">
                  <h3 className="mb-2 block text-sm md:text-xl uppercase tracking-wide text-gray-800 dark:text-white">
                    Your city
                  </h3>
                  <div>
                    <strong
                      title={
                        city === ""
                          ? "GeoIP information could not be derived from your IP"
                          : undefined
                      }
                      className="text-3xl md:text-5xl text-gray-800 dark:text-white"
                    >
                      {city === "" ? "N/A" : city}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="flex">
                <div className="flex flex-col">
                  <h3 className="mb-2 block  text-sm md:text-xl uppercase tracking-wide text-gray-800 dark:text-white">
                    Your IP address
                  </h3>
                  <div>
                    <strong className="text-3xl md:text-5xl text-gray-800 dark:text-white">
                      {ip}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  ctx
) => {
  console.log("query", ctx.query);
  return {
    props: {
      ...ctx.query,
      isHome: true,
      isServer: true,
      runtime: "edge",
      generatedAt: Date.now(),
    },
  };
};
