import Link from "next/link";
import { getMarkdoc } from "app/documentation/utils";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

export default function Sidebar() {
  let pages = getMarkdoc();
  return (
    <aside className="!self-stretch basis-full lg:basis-1/3 xl:basis-1/4 grow-0 shrink-0 p-2">
      <Popover className="h-full lg:hidden max-w-md p-2 bg-yellow-500">
        <PopoverButton className="w-full lg:w-max">
          Addon Documentation
        </PopoverButton>
        <PopoverPanel className="flex flex-col">
          <ul className="mt-4">
            <li key={`documentation`}>
              <Link
                href="/documentation"
                className="text-indigo-600 hover:text-indigo-500 dark:text-sky-500 dark:hover:text-sky-400"
              >
                Get Started
              </Link>
            </li>            
            <li key={`getting-started`}>
              <Link
                href="/documentation/getting-started"
                className="text-indigo-600 hover:text-indigo-500 dark:text-sky-500 dark:hover:text-sky-400"
              >
                Markdoc Baseline Test
              </Link>
            </li>
            {pages.map((page) => (
              <li key={`${page.slug}`}>
                <Link
                  href={`/documentation/${page.slug}`}
                  className="text-indigo-600 hover:text-indigo-500 dark:text-sky-500 dark:hover:text-sky-400"
                >
                  {page.metadata.title}
                </Link>
              </li>
            ))}
          </ul>
        </PopoverPanel>
      </Popover>
      <div className="hidden lg:flex lg:flex-col h-full max-w-md p-2 bg-yellow-500">
        <p>Addon Documentation</p>
        <ul className="mt-4">
            <li key={`documentation`}>
              <Link
                href="/documentation"
                className="text-indigo-600 hover:text-indigo-500 dark:text-sky-500 dark:hover:text-sky-400"
              >
                Get Started
              </Link>
            </li>               
          <li key={`getting-started`}>
            <Link
              href="/documentation/getting-started"
              className="text-indigo-600 hover:text-indigo-500 dark:text-sky-500 dark:hover:text-sky-400"
            >
              Markdoc Baseline Test
            </Link>
          </li>
          {pages.map((page) => (
            <li key={`${page.slug}`}>
              <Link
                href={`/documentation/${page.slug}`}
                className="text-indigo-600 hover:text-indigo-500 dark:text-sky-500 dark:hover:text-sky-400"
              >
                {page.metadata.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
