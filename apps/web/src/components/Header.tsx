import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <header>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <a className="text-2xl font-bold text-gray-800 dark:text-white">
                Nextflare Demo
              </a>
            </Link>
          </div>
          <div className="flex items-center">
            <Link href="/">
              <a className="text-gray-800 dark:text-white hover:underline">
                SSG
              </a>
            </Link>
            <Link href="/static">
              <a className="ml-4 text-gray-800 dark:text-white hover:underline">
                Static Pages
              </a>
            </Link>
            <Link href="/dynamic/hello-world">
              <a className="ml-4 text-gray-800 dark:text-white hover:underline">
                Dynamic Pages
              </a>
            </Link>
            <Link href="/images">
              <a className="ml-4 text-gray-800 dark:text-white hover:underline">
                Images
              </a>
            </Link>
            <Link href="/catch-all/gotta/catch/them/all">
              <a className="ml-4 text-gray-800 dark:text-white hover:underline">
                Catch All
              </a>
            </Link>
            <Link href="/api/info">
              <a className="ml-4 text-gray-800 dark:text-white hover:underline">
                API
              </a>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

/**
 * A new version of the Header component which is fully responsive and works with the useRouter hook and works for desktop and mobile devices.
 */
export const HeaderResponsive = () => {
  return (
    <nav className="z-20 w-full flex bg-transparent border-gray-200 px-2 sm:px-4 py-2.5 rounded">
      <div className="container px-4 flex flex-wrap justify-between items-center mx-auto md:flex-column">
        <Link href="/" className="flex items-center self-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Nextflare Demo
          </span>
        </Link>
        <div className="w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col md:p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-md md:font-medium dark:border-gray-700">
            <li>
              <Link
                href="/"
                className="block py-2 pr-4 md:pl-3 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                aria-current="page"
              >
                <a>SSR</a>
              </Link>
            </li>
            <li>
              <Link
                href="/static"
                passHref
              >
                <a className="block py-2 pr-4 md:pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Static</a>
              </Link>
            </li>
            <li>
              <Link
                href="/dynamic/this-is-a-dynamic-slug"
                className="block py-2 pr-4 md:pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                passHref
              >
                <a className="block py-2 pr-4 md:pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Dynamic</a>
              </Link>
            </li>
            <li>
              <Link
                href="/catch-all/gotta/catch/them/all"
                className="block py-2 pr-4 md:pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                passHref
              >
                <a className="block py-2 pr-4 md:pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Catch-All</a>
              </Link>
            </li>
            <li>
              <Link
                href="/images"
                className="block py-2 pr-4 md:pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                passHref
              >
                <a className="block py-2 pr-4 md:pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Images</a>
              </Link>
            </li>
            <li>
              <Link
                href="/incremental"
                className="block py-2 pr-4 md:pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                passHref
              >
                <a className="block py-2 pr-4 md:pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Incremental</a>
              </Link>
            </li>
            <li>
              <Link
                href="/api/info"
                className="block py-2 pr-4 md:pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                passHref
              >
                <a className="block py-2 pr-4 md:pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Api</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
