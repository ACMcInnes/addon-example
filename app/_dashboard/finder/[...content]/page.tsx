import Link from "next/link";
import { auth } from "@/auth";

import Avatar from "boring-avatars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import parse from "html-react-parser";

import getContentPage from "@/components/helper/getContentPage";
import getContentsCache from "@/components/helper/getContentsCache";

export default async function FinderContent({
  params,
}: {
  params: Promise<{ content: string[] }>;
}) {
  const { content } = await params;

  const session = await auth();

  if (session) {


  // console.log(`CONTENT:`);
  // console.log(content)

  // const currentContent = content.at(-1);
  // console.log(currentContent)

  const pageContents = await getContentPage(session?.webstore_api_id as string, session?.access_token as string, content, false);

  // console.log(getContent.Content)

  if (pageContents.Content.length) {
    const fullContentPathName = pageContents.Content.map((content: { ContentName: string }) => content.ContentName).join(" ");
    const results = pageContents.Content.at(-1);

    const contentData = await getContentsCache(session?.webstore_api_id as string, session?.access_token as string, false, results.ContentType);

    const childContents = contentData.Content.filter((page: { ParentContentID: string; }) => page.ParentContentID === results.ContentID)

    if (childContents.length) {
      return (
        <section>
          <p className="mt-2 mb-8">
            <Link
              href="/dashboard"
              className="pr-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Dashboard
            </Link>
            <Link
              href="/dashboard/finder"
              className="pl-2 mr-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-l-2 border-indigo-600 dark:border-indigo-500"
            >
              Finder
            </Link>

            {content.map((id: string, index: number) => (
              <Link
                key={id}
                href={`/dashboard/finder/${content.slice(0, index + 1).join("/")}`}
                className="pl-2 mr-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-l-2 border-indigo-600 dark:border-indigo-500"
              >
                {id}
              </Link>
            ))}
          </p>

          <h2 className="text-4xl sm:text-5xl font-semibold my-4 text-center">
            {fullContentPathName}
          </h2>
          <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-400">
            {results.Description1}
          </p>

          <div className="pb-12">
            <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
              <ul
                role="list"
                className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
              >
                {childContents.map(
                  (
                    childContent: {
                      ContentID: string;
                      ContentName: string;
                      ParentContentID: string;
                      Active: string;
                      ContentURL: string;
                    },
                    index: number
                  ) => (
                    <li key={childContent.ContentID}>
                      <Link href={`/dashboard/finder/${content.join("/")}/${childContent.ContentID}`}>
                        <Avatar
                          name={`${childContent.ContentName}`}
                          colors={["#FFBF00", "#F53BAD", "#03B6FC", "#18D256"]}
                          className="mx-auto size-24 lg:opacity-80 hover:opacity-100"
                        />
                        <h3 className="mt-6 text-base/7 font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                          {childContent.ContentName}
                        </h3>
                      </Link>
                      <Link href={`/dashboard/contents/${childContent.ContentID}/products`} className="text-sm/6 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">
                        View Products
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </section>
      );
    } else {
      return (
        <section>
          <p className="mt-2 mb-8">
            <Link
              href="/dashboard"
              className="pr-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Dashboard
            </Link>
            <Link
              href="/dashboard/finder"
              className="pl-2 mr-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-l-2 border-indigo-600 dark:border-indigo-500"
            >
              Finder
            </Link>

            {content.map((id: string, index: number) => (
              <Link
                key={id}
                href={`/dashboard/finder/${content.slice(0, index + 1).join("/")}`}
                className="pl-2 mr-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-l-2 border-indigo-600 dark:border-indigo-500"
              >
                {id}
              </Link>
            ))}
          </p>

          <Avatar
            name={`${fullContentPathName}`}
            colors={["#FFBF00", "#F53BAD", "#03B6FC", "#18D256"]}
            className="mx-auto size-56"
          />
          <h2 className="text-2xl font-semibold my-4 text-center">
            {fullContentPathName}
          </h2>
          <div className="mb-4 max-w-4xl mx-auto prose prose-slate dark:prose-invert sm:col-span-2 sm:mt-0">
            {parse(results.Description1)}
          </div>

          <div className="py-6">
            <div className="px-4 sm:px-0">
              <h3 className="text-base/7 font-semibold text-gray-900 dark:text-gray-100">
                Content Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm/6 text-gray-500 dark:text-gray-300">
                All the Data!
              </p>
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                    Name
                  </dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                    {fullContentPathName}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                    Content ID
                  </dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                    {results.ContentID}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                    Type ID
                  </dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                    {results.ContentType}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                    Has Parent Content
                  </dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                    {+results.ParentContentID > 0 ? "Yes" : "No"}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                    Active
                  </dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                    {results.Active}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                    Author
                  </dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                    {results.Author}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                    Date Created
                  </dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                    {results.DatePostedLocal}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                    Products
                  </dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                    <Link href={`/demo/contents/${results.ContentID}/products`} className="text-sm/6 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">
                      View Products
                    </Link> 
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-4">
            <p>
              <Link
                href={`/dashboard/finder`}
                className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
              >
                Go back to finder
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
        </section>
      );
    }
  } else {
    return (
      <div>
        <p className="mt-6">Could not load content</p>
        <p>
          <Link
            href={`/dashboard/finder`}
            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
          >
            Go back to finder
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

} else {
    return (
      <div>
        <p className="mt-6">Could not load Content Page</p>
        <p>
          <Link
            href={`/dashboard/finder`}
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
