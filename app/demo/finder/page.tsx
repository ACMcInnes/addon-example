import Link from "next/link";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import getContentsCache from "@/components/helper/getContentsCache";
import Avatar from "boring-avatars";

export default async function DemoFinder() {
    const CONTENT_CODE = "part-finder";
    const demoData = await getContentsCache('', '', true, CONTENT_CODE);
    const topLevelContents = demoData.Content.filter((page: { ParentContentID: string; }) => page.ParentContentID === '0')

  if (topLevelContents.length) {
    return (
      <section className="max-w-(--breakpoint-lg)">
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
              {topLevelContents.map(
                (
                  content: {
                    ContentID: string;
                    ContentName: string;
                    ParentContentID: string;
                    Active: string;
                    ContentURL: string;
                  },
                  index: number
                ) => (
                  <li key={content.ContentID}>
                    <Link
                      href={`/demo/finder/${content.ContentID}`}
                    >

                      {/*
                        *
                        * Avatar component here and in [...content] page can have a duplicate React.useId() value
                        * to the User Avatar component, which breaks the Avatar size for the duplicate :(
                        * Might be a React issue: https://github.com/facebook/react/pull/31668
                        * Might just need to suck it up and use the "Beam" variant for all Avatars, which seems to help?
                        *
                        * Look to add 'Products' view to display products under a certain content page
                        * 
                        */}

                      <Avatar
                        name={`${content.ContentName}`}
                        colors={["#FFBF00", "#F53BAD", "#03B6FC", "#18D256"]}
                        className="mx-auto size-56 lg:opacity-80 hover:opacity-100"
                      />
                      <h3 className="mt-6 text-base/7 font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                        {content.ContentName}
                      </h3>
                    </Link>
                    <Link href={`/demo/contents/${content.ContentID}/products`} className="text-sm/6 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">
                      View Products
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="my-8">
          <p>
            <FontAwesomeIcon icon={faArrowLeft} /> Back to the{" "}
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
        <p className="mt-6">No parts content found</p>
        <p>
          <FontAwesomeIcon icon={faArrowLeft} /> Back to the{" "}
          <Link
            href={`/demo`}
            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
          >
            Demo Dashboard
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
