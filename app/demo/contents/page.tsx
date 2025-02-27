import Link from "next/link";

import { Suspense } from "react";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ContentList from "@/components/dashboard/contentList";
import ContentListLoader from "@/components/dashboard/contentListLoader";

const WEBSTORE = "https://keylime.neto.com.au";

const contentTypes = [
  {
    id: 1,
    code: "category",
    name: "Categories",
    internal_description:
      "The primary content type for most webstores, helps customers find like products",
    sort_order: 0,
    system: "True",
    default: "True",
  },
  {
    id: 2,
    code: "page",
    name: "Pages",
    internal_description:
      "Information is king, get it to your customers with a good old fashioned web page",
    sort_order: 0,
    system: "True",
    default: "False",
  },
  {
    id: 3,
    code: "blog",
    name: "Blogs",
    internal_description:
      "Wordpress is so 2001, why not keep customers updated via your Neto Blog instead",
    sort_order: 0,
    system: "True",
    default: "False",
  },
  {
    id: 4,
    code: "brand",
    name: "Brands",
    internal_description:
      "Make sure your customers are brand loyal, with some brands",
    sort_order: 0,
    system: "True",
    default: "False",
  },
];

export default async function DemoContent() {
  return (
    <section className="mx-auto sm:px-6 lg:px-8">
      <h2 className="my-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
        Content
      </h2>
      <p>
        <Link
          href="/demo"
          className="pr-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-r-2 border-indigo-600 dark:border-indigo-500"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Demo Dashboard
        </Link>
        <Link
          href="/demo/contents"
          className="ml-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
        >
          Content
        </Link>
      </p>

      <div className="mx-auto max-w-(--breakpoint-lg) py-12">
        <div>
          <div className="w-full text-center">
            <p className="mt-6 text-lg/8 text-balance text-gray-700 dark:text-gray-200">
              All the content!
            </p>
            <p className="mt-6 text-lg/8 text-balance text-gray-700 dark:text-gray-200">
              What&apos;s a webstore without content? Make sure your customers
              have a clear idea of what you are selling, your story, useful
              info, etc etc. It&apos;s all content!
            </p>
          </div>

          <p className="text-center text-sm mt-4 mb-2 text-gray-500 dark:text-gray-400">
            Jump to contents:
          </p>

          <div className="flex flex-wrap items-center justify-center space-x-4">
            {contentTypes.map((contentType) => (
              <Link
                key={contentType.code}
                href={`#${contentType.code}`}
                className="mt-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-md px-3 py-2 text-sm text-nowrap font-medium"
              >
                {contentType.name}
              </Link>
            ))}
          </div>

          <div className="mt-8 mb-16">
            {contentTypes.map((contentType) => (
              <Suspense
                key={`suspense-${contentType.id}`}
                fallback={
                  <ContentListLoader key={`fallback-${contentType.id}`} />
                }
              >
                <ContentList
                  hash={""}
                  secret={""}
                  content={contentType}
                  webstore={WEBSTORE}
                  demo={true}
                />
              </Suspense>
            ))}
          </div>
        </div>
      </div>

      <div className="my-8">
        <p>
          Return to{" "}
          <Link
            href="/demo"
            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
          >
            Demo Dashboard
          </Link>
        </p>
      </div>
    </section>
  );
}
