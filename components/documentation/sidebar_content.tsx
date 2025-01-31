import Link from "next/link";
import { getMarkdoc } from "app/documentation/utils";

export default function SidebarContent() {
  let pages = getMarkdoc();
  return (
    <ul className="mt-4 ml-4 space-y-5">
      <li key={`documentation`}>
        <Link
          href="/documentation"
          className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
        >
          Home
        </Link>
      </li>
      {pages.map((page) => (
        <li key={`${page.slug}`}>
          <Link
            href={`/documentation/${page.slug}`}
            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
          >
            {page.metadata.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
