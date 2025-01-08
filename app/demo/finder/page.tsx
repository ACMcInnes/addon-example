import Link from "next/link";

import { faArrowLeft, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import getDemoContentCache from "@/components/demo/getDemoContentCache";
import Avatar from "boring-avatars";

export default async function DemoFinder() {
    const CONTENT_CODE = "part-finder";
    const PARENT_CONTENT_ID = "0";
    const demoData = await getDemoContentCache(CONTENT_CODE, PARENT_CONTENT_ID);
    const finderContentsTotal = demoData.Content.length;
    const finderContents = demoData.Content;

  if (finderContentsTotal) {
    return (
      <section className="max-w-screen-lg">
        <h2 className="my-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          Content Finder
        </h2>
        <p>
          <Link
            href="/demo"
            className="pr-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-r-2 border-indigo-600 dark:border-indigo-500"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Demo Dashboard
          </Link>
          <Link
            href="/demo/finder"
            className="ml-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
          >
            Content Finder
          </Link>
        </p>


        <div className="py-12">
          <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
            <div className="mx-auto max-w-2xl">
              <p className="mt-6 text-lg/8 text-balance text-gray-600 dark:text-gray-300">
                Top level content for your Product Finder. This would usually be the &quot;Make&quot; if you were in the automotive business, but can really be whatever you want.
              </p>
            </div>
            <ul
              role="list"
              className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
            >
              {finderContents.map(
                (
                  finderContent: {
                    ContentID: string;
                    ContentName: string;
                    ParentContentID: string;
                    Active: string;
                    ContentURL: string;
                  },
                  index: number
                ) => (
                  <li key={finderContent.ContentID}>
                  <Link
                    href={`/demo/finder/${finderContent.ContentID}`}
                  >
                    <Avatar
                      name={`${finderContent.ContentName} ${finderContent.ContentID}`}
                      variant="marble"
                      size={224}
                      colors={["#FFBF00", "#F53BAD", "#03B6FC", "#18D256"]}
                      className="mx-auto"
                    />
                    <h3 className="mt-6 text-base/7 font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                      {finderContent.ContentName}
                    </h3>
                    <p className="text-sm/6 text-gray-600">
                      Active: {finderContent.Active}
                    </p>
                    </Link>
                  </li>
                )
              )}
            </ul>
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
  } else {
    return (
      <div>
        <p className="mt-6">No parts content</p>
        <p>
          <Link
            href={`/demo`}
            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
          >
            Go back
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
