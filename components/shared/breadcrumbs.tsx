"use client"

import Link from "next/link";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { faHouse, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = useSelectedLayoutSegments();
  return (
    <nav aria-label="Breadcrumb" className="flex ml-6 mt-4">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link href="/" className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-300">
              <FontAwesomeIcon className="!size-4 shrink-0" icon={faHouse} />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {segments.map((segment, index) => {
          const crumb = segment.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
          const crumbPath = `/${segments.slice(0, index + 1).join('/')}`;
          return (
          <li key={`crumb-${index}`}>
            <div className="flex items-center">
              <FontAwesomeIcon className="!size-3 shrink-0 text-gray-400 dark:text-gray-500" icon={faChevronRight} />
              {pathname === crumbPath ? (
                <p className="ml-4 text-sm font-medium text-gray-700 dark:text-gray-200 underline underline-offset-4 whitespace-nowrap ">
                  {crumb}
                </p>
              ) : (
                <Link
                  href={crumbPath}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:underline hover:underline-offset-4 whitespace-nowrap"
                >
                  {crumb}
                </Link>
              )}
            </div>
          </li>
          )
        })}
      </ol>
    </nav>
  );
}    