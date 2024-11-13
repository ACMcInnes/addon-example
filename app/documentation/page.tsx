import Link from "next/link";

import { formatDate, getMarkdoc } from "app/documentation/utils";

export default function Documentation() {
  let pages = getMarkdoc();
  return (
    <>
      <ul className="mt-4">
        <li key={`getting-started`}>
          <Link
            href="/documentation/getting-started"
            className="text-indigo-600 hover:text-indigo-500 dark:text-sky-500 dark:hover:text-sky-400"
          >
            Get Started
          </Link>
        </li>
        {pages.map((page) => (
          <li key={`${page.slug}`}>
            <Link
              href={`/documentation/${page.slug}`}
              className="text-indigo-600 hover:text-indigo-500 dark:text-sky-500 dark:hover:text-sky-400"
            >
              {page.metadata.title} - {formatDate(page.metadata.published)}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4">content content content</p>
      <p className="mt-4">content content content</p>
      <p className="mt-4">content content content</p>
      <p className="mt-4">content content content</p>
      <p className="mt-4">content content content</p>
      <p className="mt-4">content content content</p>
      <p className="mt-4">content content content</p>
      <p className="mt-4">content content content</p>
      <p className="mt-4">content content content</p>
      <p className="mt-4">content content content</p>
      <p className="mt-4">content content content</p>
      <p className="mt-4">content content content</p>
      <p className="mt-4">content content content</p>
      <p className="mt-4">content content content</p>
      <p className="mt-4">content content content</p>
      <p className="mt-4">content content content</p>
      <p className="mt-4">content content content</p>
    </>
  );
}
