import Link from "next/link";
import { auth } from "@/auth";

import { Suspense } from "react";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import getContentTypesCache from "@/components/helper/getContentTypesCache";
import getWebstore from "@/components/helper/getWebstore";
import ContentList from "@/components/dashboard/contentList";
import ContentListLoader from "@/components/dashboard/contentListLoader";

interface contentTypeObject {
  id: number;
  code: string;
  name: string;
  internal_description: string;
  sort_order: number;
  system: string;
  default: string;
}

export default async function Contents() {
  const session = await auth();

  if (session) {
    const details = await getWebstore(
      session?.webstore_api_id as string,
      session?.access_token as string
    );
    const webstore = details.result.domain;
    const contentTypes = await getContentTypesCache(
      session?.webstore_api_id as string,
      session?.access_token as string
    );

    return (
      <section className="mx-auto sm:px-6 lg:px-8">
        <h2 className="my-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          Content
        </h2>
        <p>
          <Link
            href="/dashboard"
            className="pr-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-r-2 border-indigo-600 dark:border-indigo-500"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Dashboard
          </Link>
          <Link
            href="/dashboard/contents"
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
              {contentTypes.result.map((contentType: contentTypeObject) => (
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
              {contentTypes.result.map((contentType: contentTypeObject) => (
                <Suspense
                  key={`suspense-${contentType.id}`}
                  fallback={
                    <ContentListLoader key={`fallback-${contentType.id}`} />
                  }
                >
                  <ContentList
                    hash={session?.webstore_api_id as string}
                    secret={session?.access_token as string}
                    content={contentType}
                    webstore={webstore}
                    demo={false}
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
              href="/dashboard"
              className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
            >
              Dashboard
            </Link>
          </p>
        </div>
      </section>
    );
  } else {
    return (
      <div>
        <p className="mt-6">Could not load content</p>
        <p>
          <Link
            href={`/dashboard`}
            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
          >
            Go back to the dashboard
          </Link>{" "}
          or return to{" "}
          <Link
            href="/"
            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
          >
            Home
          </Link>
        </p>
      </div>
    );
  }
}
