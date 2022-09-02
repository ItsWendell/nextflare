import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 z-20 h-16 p-2 w-full bg-transparent border-t border-gray-200 md:flex md:items-center md:justify-between md:p-6 dark:border-gray-600">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2022{" "}
        <a href="https://flowbite.com/" className="hover:underline">
          Flowbite™
        </a>
        . All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <Link href="/" className="mr-4 hover:underline md:mr-6 ">
            SSG
          </Link>
        </li>
        <li>
          <Link href="#" className="mr-4 hover:underline md:mr-6">
            Static Pages
          </Link>
        </li>
        <li>
          <Link href="#" className="mr-4 hover:underline md:mr-6">
            Images
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:underline">
            Catch All
          </Link>
        </li>
      </ul>
    </footer>
  );
};
