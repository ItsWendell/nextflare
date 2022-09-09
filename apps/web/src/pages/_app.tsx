import "~/styles/globals.css";
import "~/styles/app.css";

import type { AppProps } from "next/app";

import { Header, HeaderResponsive } from "~/components/Header";
import { Card } from "~/components/Card";

export default function MyApp({ Component, pageProps }: AppProps<any>) {
  console.log("pageProps", pageProps);
  return (
    <div className="app bg-white dark:bg-black min-h-screen w-full flex flex-col">
      <HeaderResponsive />
      <div className="z-10 flex flex-col flex-1 mb-2 md:mb-16">
        <Component {...pageProps} />
      </div>
      <footer className="container self-center fo z-20 px-4 mb-4 w-full bg-transparent flex-row md:flex md:items-center md:justify-between md:p-6 text-sm text-gray-400">
        <div>
          Built with{" "}
          <a
            className="hover:underline text-gray-500 dark:text-gray-400"
            rel="noreferrer"
            target="_blank"
            href="https://nextjs.org"
          >
            Next.js (v{process.env.NEXT_PUBLIC_NEXT_VERSION})
          </a>{" "}
          on{" "}
          <a
            className="hover:underline text-orange-500 dark:text-orange-400"
            rel="noreferrer"
            target="_blank"
            href="https://cloudflare.com/pages"
          >
            Cloudflare Pages
          </a>
        </div>
        <div>
          Generated at{" "}
          {pageProps.generatedAt
            ? new Date(pageProps.generatedAt).toISOString()
            : "unknown"}
          {typeof pageProps.isCold !== "undefined" && (
            <>
              {" "}
              {pageProps?.isCold === "1" ? (
                <span className="text-blue-500">(cold)</span>
              ) : (
                <span className="text-red-500">(hot)</span>
              )}
            </>
          )}
        </div>
      </footer>
      <Card isHome={pageProps?.isHome ?? false} />

    </div>
  );
}
