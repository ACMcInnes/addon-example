import Link from "next/link";

import { formatDate, getMarkdoc } from "app/documentation/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";

export default function Documentation() {
  let pages = getMarkdoc();
  return (
    <>
      <h1 className="mx-auto mt-6 mb-8 text-balance text-4xl font-semibold text-gray-900 dark:text-gray-100 sm:text-5xl">
        Neto Addon Example Documentation
      </h1>

      <p>The following guides outline the features and functionality of the Neto Addon Example application. If you are new here the &apos;Get Started&apos; guide is a great first step. If anything isn&apos;t super clear or you have further questions please contact us.</p>

      <p className="mt-8 text-2xl font-semibold">
        Guides
      </p>

      <div className="m-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {pages.map((page) => (
        <div
          key={page.slug}
          className="relative flex items-center space-x-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-5 shadow-sm hover:border-gray-400 dark:hover:border-slate-500"
        >
          <div className="shrink-0">
            {/* 
              https://docs.fontawesome.com/web/use-with/react/add-icons#typescript-and-custom-icons-issue 
              <FontAwesomeIcon icon={page.metadata.icon} className="size-10"/>
            */}
            <FontAwesomeIcon icon={faRocket} className="size-10"/>
          </div>
          <div className="min-w-0 flex-1">
            <Link href={`/documentation/${page.slug}`} className="focus:outline-none">
              <span aria-hidden="true" className="absolute inset-0" />
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{page.metadata.title}</p>
              <p className="truncate text-sm text-gray-500 dark:text-gray-400">{formatDate(page.metadata.published)}</p>
            </Link>
          </div>
        </div>
        ))}
      </div>
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
